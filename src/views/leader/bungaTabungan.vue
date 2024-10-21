<template>
    <div class="flex">
        <Sidebar />

        <div class="p-8 h-screen overflow-y-auto flex-1">
            <div class="flex pb-2 justify-between">
                <div>
                    <h1 class="text-2xl font-semibold p-1">
                        BUNGA TABUNGAN
                    </h1>
                </div>
                <div>

                    <button @click="createBunga()"
                        class="mx-2 text-green-900 bg-white hover:bg-green-400 font-medium rounded-lg text-sm border bg-green-600 sm:w-auto px-3 py-2 text-center">
                        Tambah Bunga</button>
                    <fa :icon="['fas', 'download']" @click="handleExport()"
                        class="cursor-pointer text-green-900 right-0" />

                </div>
            </div>
            <div class="flex pb-4 justify-between">
                <div>
                    <span>From :</span> <input type="date" v-model="fillter.dateStart"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1 mr-2">
                    <span>To :</span> <input type="date" v-model="fillter.dateEnd"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1 mr-2">
                    <Button @click="handleFillter()"
                        class="text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center">fillter</Button>
                </div>
                <div>
                    <input type="text" v-model="fillter.search" placeholder="cari..."
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1 mx-4">
                    <Button @click="handleFillter()"
                        class="text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center">Cari</Button>
                </div>
            </div>

            <div class="overflow-auto rounded-lg shadow hidden md:block">
                <div :class="[!print && 'px-16 py-10']" id="download-document">
                    <div class="text-center pb-4 text-xl font-semibold" v-show="!print">
                        <h1>Laporan Bunga Simpanan <br /> Tanggal {{ formatDate(fillter.dateStart) }} sampai {{
                            formatDate(fillter.dateEnd)
                            }} <br />
                            Koperasi Dana Sawitra Sujati
                        </h1>
                    </div>
                    <table class="w-full">
                        <thead class="border border-gray-200">
                            <tr>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-32">No.</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left">Nama</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-32">Tanggal</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-32">Bunga</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-32">Saldo</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-32">Simpanan</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="(item, index) in data" :key="index" class="hover:bg-slate-300"
                                :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.members.name }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.date) }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ ThousandFormat(item.interest)
                                    }}
                                </td>

                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ ThousandFormat(item.saldo) }}
                                </td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{
                                    item.deposit_types.deposit_name }}
                                </td>

                            </tr>
                        </tbody>
                    </table>
                    <div class="mt-4">
                        <span class="p-2 text-md text-gray-900 whitespace-nowrap"> Total Angsuran Rp. {{
                            ThousandFormat(total) }}</span>
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
    <!-- MODAL -->

    <Loader v-if="is_loading"></Loader>



</template>


<script setup>
import { ref } from 'vue';
import Sidebar from '../../components/leader/Sidebar.vue';
import axios from 'axios';
import Modal from '@/components/Modal.vue';
import AnggotaSkeleton from '@/components/AnggotaSkeleton.vue';
import getMembers from '@/composables/getMembers';
import getDepositTypes from '@/composables/getDepositTypes';
import NotFound from '@/components/NotFound.vue'
import Swal from 'sweetalert2'
import router from '@/router';
import ThousandFormat from '@/helpers/formatThousand';
import formatDate from '@/helpers/formatDate';
import html2pdf from "html2pdf.js";
import Loader from '@/components/Loader.vue';





const data = ref([])
const total = ref(0)
const print = ref(true)

const is_loading = ref(null)
const fillter = ref({
    search: '',
    dateStart: getDefaultFirstDate(),
    dateEnd: getDefaultLasttDate()
})

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
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0') // Add leading zero
    const day = '01' // First day of the month
    return `${year}-${month}-${day}`
}
function getDefaultLasttDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = new Date(year, month, 0).getDate()
    return `${year}-${month}-${day}`
}

const getDeposit = async () => {
    is_loading.value = true
    total.value = 0

    await axios.get("http://127.0.0.1:8000/api/bunga", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        params: fillter.value
    }).then((res) => {
        setTimeout(() => {
            data.value = res.data.data
            data.value.forEach((element) => {
                total.value += element.interest
            })
            is_loading.value = false

        }, 1500);
    }).catch((err) => {
        if (err.response.data.message == "Unauthenticated.") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your token is expired! Please login again.",
            });

            router.push("/login")
        }
    })
}

const createBunga = async () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to Add Interest!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Add!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .post('http://127.0.0.1:8000/api/bunga-tabungan', {
                    headers: {
                        Authorization: 'Bearer' + localStorage.getItem('token')
                    }
                })


            Swal.fire({
                title: 'Success!',
                text: 'Bunga Ditambahkan.',
                icon: 'success'
            })
            getDeposit()
        }
    })
}

getDeposit()





</script>