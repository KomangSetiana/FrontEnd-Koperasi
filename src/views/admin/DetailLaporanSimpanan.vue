<template>
    <div class="flex">
        <Sidebar />

        <div class="py-4 pr-16 pl-8 flex-1">
            <div class="flex p-3 justify-between">
                <div>
                    <h1 class="text-2xl font-semibold p-1">
                        LAPORAN SIMPANAN
                    </h1>
                </div>
                <div>
                    <input type="text" v-model="fillter.search" placeholder="cari..."
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1.5 mx-4">
                    <Button @click="handleFillter()"
                        class="text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">Cari</Button>
                    <fa :icon="['fas', 'download']" @click="handleExport()"
                        class="cursor-pointer text-green-900 px-3 right-0" />

                </div>
            </div>

            <div class="overflow-auto rounded-lg shadow hidden md:block">
                <div :class="[!print && 'px-16 py-10']" id="download-document">

                    <div class="text-center pb-4 text-xl font-semibold" v-show="!print">
                        <h1>Laporan Simpanan <br />
                            {{ formatMonthYear(date) }}

                            <br />
                            Koperasi Dana Sawitra Sujati
                        </h1>
                    </div>
                    <table class="w-full" :class="[!print && 'border border-gray-200']">
                        <thead>
                            <tr>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">No.</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left"
                                    :class="[!print && 'border border-gray-200']">Nama</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">Tanggal</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">Debet</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">Kredit</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">Saldo</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">Simpanan</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="(item, index) in data" :key="index" class="hover:bg-slate-200"
                                :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{ index + 1
                                    }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{
                                        item.members.name }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{
                                        formatDate(item.date) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{ item.debet
                                        == null ? "-" :
                                        ThousandFormat(item.debet) }}
                                </td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{
                                        item.kredit == null ? '-'
                                            : ThousandFormat(item.kredit) }}
                                </td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{
                                        ThousandFormat(item.saldo) }}
                                </td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{
                                        item.deposit_types.deposit_name }}</td>

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
                <div v-for="(depo, index) in data" :key="index" class="bg-white shadow p-1 rounded-lg">
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

    </div>

    <Loader v-if="is_loading" />
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '../../components/admin/Sidebar.vue';
import axios from 'axios';
import AnggotaSkeleton from '@/components/AnggotaSkeleton.vue';
import Swal from 'sweetalert2'
import ThousandFormat from '@/helpers/formatThousand';
import formatDate from '@/helpers/formatDate';
import router from '@/router';
import html2pdf from "html2pdf.js";
import Loader from '@/components/Loader.vue';
import formatMonthYear from '@/helpers/formatMonthYear';

const data = ref([])
const is_loading = ref(null)
const print = ref(true)
const kredit = ref(0)
const debet = ref(0)
const date = ref(null)
const fillter = ref({
    search: ''
})

const handleFillter = () => {
    detailLaporan()
}
const handleExport = () => {
    print.value = !print.value
    is_loading.value = true
    html2pdf(document.getElementById('download-document'))
    setTimeout(() => {
        print.value = !print.value
        is_loading.value = false

    }, 1000);
}
const id = ref(router.currentRoute.value.params.id)
const detailLaporan = async () => {
    is_loading.value = true
    debet.value = 0
    kredit.value = 0
    await axios.get(`http://127.0.0.1:8000/api/show-report/` + id.value, {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        params: fillter.value
    }).then((res) => {
        setTimeout(() => {
            data.value = res.data.data
            data.value.forEach(element => {
                debet.value += element.debet
                kredit.value += element.kredit
                date.value = element.date

            });
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
detailLaporan()
</script>

<style></style>