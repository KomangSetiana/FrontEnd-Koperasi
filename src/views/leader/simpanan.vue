<template>
    <div class="flex">
        <Sidebar />

        <div class="p-8 overflow-y-auto h-screen flex-1">
            <div class="flex p-3 justify-between">
                <div>
                    <h1 class="text-2xl font-semibold p-1">
                        SIMPANAN
                    </h1>
                </div>
                <div>

                    <button @click="reportData()"
                        class="mx-2 text-green-900 bg-white hover:bg-green-400 font-medium rounded-lg text-sm border bg-green-600 sm:w-auto px-5 py-2.5 text-center">
                        Laporan</button>
                    <fa :icon="['fas', 'download']" @click="handleExport()"
                        class="cursor-pointer text-green-900 right-0" />

                </div>
            </div>
            <div class="flex pb-4 justify-between">
                <div>
                    <span>From :</span> <input type="date" v-model="fillter.dateStart"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1.5 mr-2">
                    <span>To :</span> <input type="date" v-model="fillter.dateEnd"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1.5 mr-2">
                    <Button @click="handleFillter()"
                        class="text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">fillter</Button>
                </div>
                <div>
                    <input type="text" v-model="fillter.search" placeholder="cari..."
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1.5 mx-4">
                    <Button @click="handleFillter()"
                        class="text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">Cari</Button>
                </div>
            </div>


            <div class="overflow-auto rounded-lg shadow hidden md:block">
                <div :class="[!print && 'px-16 py-10']" id="download-document">
                    <div class="text-center pb-4 text-xl font-semibold" v-show="!print">
                        <h1>Laporan Simpanan <br /> Tanggal {{ formatDate(fillter.dateStart) }} sampai {{
                            formatDate(fillter.dateEnd)
                        }} <br />
                            Koperasi Dana Sawitra Sujati
                        </h1>
                    </div>
                    <table class="w-full">
                        <thead class="border border-gray-200">
                            <tr>
                                <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">No.</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-left">Nama</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Tanggal</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Debet</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Kredit</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Saldo</th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-left w-24"> Simpanan
                                </th>
                                <th class="p-0 -pl-4 text-sm font-semibold tracking-wide text-left w-1">
                                    <select @change="handleFillter()" v-model="fillter.fillDeposit" class="w-4">
                                        <option selected :value="null"></option>
                                        <option value="1">Simpanan Sukarela</option>
                                        <option value="2">Tabungan Wajib</option>
                                        <option value="3">Simpanan Wajib</option>
                                    </select>
                                </th>
                                <th class="p-3 text-sm font-semibold tracking-wide text-left w-16" v-show="print">Action
                                </th>

                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="(item, index) in data" :key="index" class="hover:bg-slate-300"
                                :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.members.name }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.date) }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.debet == null ? null :
                                    ThousandFormat(item.debet) }}
                                </td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.kredit == null ? null
                                    : ThousandFormat(item.kredit) }}
                                </td>

                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ ThousandFormat(item.saldo) }}
                                </td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{
                                    item.deposit_types.deposit_name }}</td>
                                <td></td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap" v-show="print">
                                    <router-link :to="{ name: 'show simpanans', params: { id: item.member_id } }">
                                        <fa :icon="['fas', 'circle-info']" style="color: orange;"
                                            class="items-center cursor-pointer border border-gray-300 p-1 mx-1 hover:bg-yellow-400"
                                            @click=" showDeposit(item.member_id)" />
                                    </router-link>
                                </td>

                            </tr>

                        </tbody>
                    </table>
                    <div class="mt-4">
                        <span class="p-2 text-md text-gray-900 whitespace-nowrap"> Total Simpanan Rp. {{
                            ThousandFormat(debet) }}</span>
                        <span class="p-2 text-md text-gray-900 whitespace-nowrap"> Total Penarikan Rp. {{
                            ThousandFormat(kredit) }}</span>
                        <span class="p-2 text-md text-gray-900 whitespace-nowrap"> Total Transkasi Rp. {{
                            ThousandFormat(debet - kredit) }}</span>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 gap-4 md:hidden">
                <div v-for="(depo, index) in data" :key="index" class="bg-white shadow p-2 rounded-lg">
                    <div class="flex space-x-2 items-center text-sm">
                        <div>{{ index + 1 }}</div>
                        <div>{{ depo.members.name }}</div>
                        <div class="text-gray-500">{{ depo.date }}</div>
                        <div class="text-green-800" :class="[depo.debet == null && 'hidden']">Masuk: Rp.{{
                            depo.debet }}
                        </div>
                        <div class="text-red-800" :class="[depo.kredit == null && 'hidden']">Keluar: Rp. {{
                            depo.kredit
                            }}
                        </div>
                    </div>
                    <div>Saldo: Rp. {{ depo.saldo }}</div>
                </div>
            </div>
        </div>


        <!-- <template>
            <AnggotaSkeleton />
        </template> -->
    </div>

    <loader v-if="is_loading">
    </loader>
</template>

<script setup>
import Sidebar from '@/components/leader/Sidebar.vue'
import axios from "axios";
import { computed, ref } from "vue";
import Swal from 'sweetalert2'
import formatDate from "@/helpers/formatDate";
import ThousandFormat from "@/helpers/formatThousand";
import router from '@/router';
import loader from '@/components/Loader.vue'
import html2pdf from 'html2pdf.js';

const data = ref([])
let currentPage = 1

const is_loading = ref(null)
const kredit = ref(0)
const debet = ref(0)
const print = ref(true)



const per_page = ref(0)
const total_items = ref(0)
const fillter = {
    dateStart: getDefaultFirstDate(),
    dateEnd: getDefaultLasttDate(),
    search: '',
    fillDeposit: '',
    current_page: currentPage
}
const onClickHandler = (page) => {
    if (page) {
        currentPage = page
        fillter.current_page = page
        getDeposit()
    }
}
const handleFillter = () => {
    getDeposit()
}

const handleExport = () => {
    print.value = !print.value
    html2pdf(document.getElementById('download-document'))
    setTimeout(() => {

        print.value = !print.value
    }, 1000);

}
function getDefaultFirstDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero
    const day = '01'; // First day of the month
    return `${year}-${month}-${day}`;
}
function getDefaultLasttDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = new Date(year, month, 0).getDate()
    return `${year}-${month}-${day}`;
}


const getDeposit = async () => {
    is_loading.value = true
    debet.value = 0
    kredit.value = 0

    await axios.get("http://127.0.0.1:8000/api/deposit-leader", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        params: fillter
    }).then((res) => {
        setTimeout(() => {
            per_page.value = res.data.per_page
            total_items.value = res.data.total
            data.value = res.data.data
            data.value.forEach(element => {
                debet.value += element.debet
                kredit.value += element.kredit

            });
            is_loading.value = false
        }, 1500)
    }).catch((err) => {
        if (err.response.data.message == "Unauthenticated.") {
            router.push("/login");
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your token is expired! Please login again.",
            });

        }
    })
}





getDeposit()
</script>
