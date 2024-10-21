<template>
    <div class="flex">
        <Sidebar />
        <div class="p-8 flex-1 overflow-y-auto h-screen">
            <div class="border-b border-gray-500 pb-4">
                <h1 class="text-2xl font-semibold">Pinjaman</h1>
            </div>
            <div class="rounded-lg shadow hidden md:block">
                <table class="w-full">
                    <thead class="border-b-2 border-gray-200">
                        <tr>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">No.</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-20">Jumlah Pinjaman</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Tanggal</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Janggka Waktu</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Potongan Admin</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Tabungan Wajib</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Pinjaman Didapat</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(item, index) in pinjaman" :key="index"
                            :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {{ ThousandFormat(item.loans.loan_amount) }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.loans.date) }}
                            </td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ item.loans.time_period }} Bulan
                            </td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {{ ThousandFormat(item.loans.admin_deduction) }}
                            </td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {{ ThousandFormat(item.loans.mandotory_savings) }}
                            </td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                                {{ ThousandFormat(item.loans.loan_obtaneb) }}</td>
                        </tr>
                    </tbody>
                </table>
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
    </div>

    <Loader v-if="is_loading"></Loader>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import Swal from 'sweetalert2'
import ThousandFormat from "@/helpers/formatThousand";
import formatDate from "@/helpers/formatDate";
import Sidebar from '../../components/user/Sidebar.vue'
import router from "@/router";
import Loader from "@/components/Loader.vue";

const pinjaman = ref([])
const is_loading = ref(null)


const getPinjaman = async () => {
    is_loading.value = true
    await axios.get("http://127.0.0.1:8000/api/my-loan", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        }
    }).then((res) => {
        setTimeout(() => {
            pinjaman.value = res.data.data
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

getPinjaman()
</script>

<style></style>