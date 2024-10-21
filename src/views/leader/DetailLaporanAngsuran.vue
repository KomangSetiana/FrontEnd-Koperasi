<template>
    <div class="flex">
        <Sidebar />
        <div class="p-8 h-screen overflow-x-auto flex-1">

            <div class="flex p-3 justify-between">
                <div>
                    <h1 class="text-2xl font-semibold p-1">
                        LAPORAN ANGSURAN
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

                    <div class="text-center pb-4 text-2xl font-semibold" v-show="!print">
                        <h1>Laporan Simpanan <br />
                            {{ formatMonthYear(date) }}

                            <br />
                            Koperasi Dana Sawitra Sujati
                        </h1>
                    </div>
                    <table class="w-full" :class="[!print && 'border border-gray-200']">
                        <thead class="border-b-2 border-gray-200">
                            <tr>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left"
                                    :class="[!print && 'border border-gray-200']">No.</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left"
                                    :class="[!print && 'border border-gray-200']">Nama</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-20"
                                    :class="[!print && 'border border-gray-200']">Jumlah Pinjaman</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">Tanggal Bayar</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">Jumlah Bayar</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">Pokok Bayar</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">Bunga pinjaman</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">Denda</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24"
                                    :class="[!print && 'border border-gray-200']">Sisa Hutang</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="(item, index) in angsuran" :key="index"
                                :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{ index + 1 }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{ item.loans.members.name }}
                                </td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{
                                        ThousandFormat(item.loans.loan_amount) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{ formatDate(item.date) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{
                                        ThousandFormat(item.amount_payment) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{
                                        ThousandFormat(item.principal_loan) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{
                                        ThousandFormat(item.bunga_pinjaman) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">{{ item.mulct == null ? null :
                                        ThousandFormat(item.mulct) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap"
                                    :class="[!print && 'border border-gray-200']">
                                    {{ ThousandFormat(item.remaining_debt) }}</td>

                            </tr>
                        </tbody>
                    </table>
                    <div class="mt-4">
                        <span class="p-2 text-md text-gray-900 whitespace-nowrap"> Total Angsuran Rp. {{
                            ThousandFormat(debet) }}</span>
                    </div>
                </div>
            </div>
            <!-- <div class="grid grid-cols-1 gap-4 md:hidden">
                <div v-for="(depo, index) in data" :key="index" class="bg-white shadow p-2 rounded-lg">
                    <div class="flex space-x-2 items-center text-sm">
                        <div>{{ index + 1 }}</div>
                        <div>{{ depo.members.name }}</div>
                        <div class="text-gray-500">{{ depo.date }}</div>
                        <div class="text-green-800" :class="[depo.debet == null && 'hidden']">Masuk: Rp.{{
                            depo.debet }}
                        </div>
                        <div class="text-red-800" :class="[depo.kredit == null && 'hidden']">Keluar: Rp. {{ depo.kredit
                            }}
                        </div>
                    </div>
                    <div>Saldo: Rp. {{ depo.saldo }}</div>
                </div>
            </div> -->
        </div>
        <Loader v-if="is_loading"></Loader>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from '../../components/leader/Sidebar.vue';
import axios from 'axios';
import AnggotaSkeleton from '@/components/AnggotaSkeleton.vue';
import Swal from 'sweetalert2'
import ThousandFormat from '@/helpers/formatThousand';
import formatDate from '@/helpers/formatDate';
import router from '@/router';
import Loader from '@/components/Loader.vue';

import html2pdf from "html2pdf.js";
import formatMonthYear from '@/helpers/formatMonthYear';


const angsuran = ref([])
const id = ref(router.currentRoute.value.params.id)
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
const detailLaporan = async () => {
    is_loading.value = true
    await axios.get(`http://127.0.0.1:8000/api/show-report-loan/` + id.value, {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        params: fillter.value
    }).then((res) => {
        setTimeout(() => {
            angsuran.value = res.data.data
            angsuran.value.forEach(element => {
                debet.value += element.amount_payment
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
const handleExport = () => {
    print.value = !print.value
    is_loading.value = true
    html2pdf(document.getElementById('download-document'))
    setTimeout(() => {
        print.value = !print.value
        is_loading.value = false

    }, 1000);
}
detailLaporan()
</script>

<style></style>