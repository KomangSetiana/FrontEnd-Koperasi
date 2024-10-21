<template>
    <div class="flex">
        <Sidebar />
        <div class="p-8 flex-1 h-screen overflow-y-auto">
            <div class="border-b border-gray-500 flex flex-wrap pb-4">
                <h1 class="text-2xl font-semibold">Angsuran</h1>

            </div>
            <div class="rounded-lg shadow hidden md:block">
                <table class="w-full">
                    <thead class="border-b-2 border-gray-200">
                        <tr>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">No.</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Tanggal Bayar</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Jumlah Bayar</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Pokok Bayar</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Bunga pinjaman</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Denda</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Sisa Hutang</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(item, index) in angsuran.installments" :key="index"
                            :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.date) }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{
                                ThousandFormat(item.amount_payment) }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{
                                ThousandFormat(item.principal_loan) }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ ThousandFormat(
                                item.bunga_pinjaman) }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ item.mulct == null ? null :
                                ThousandFormat(item.mulct) }}
                            </td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ ThousandFormat(
                                item.remaining_debt) }}</td>
                        </tr>
                    </tbody>
                </table>
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
                        <div class="text-red-800" :class="[depo.kredit == null && 'hidden']">Keluar: Rp. {{ depo.kredit
                            }}
                        </div>
                    </div>
                    <div>Saldo: Rp. {{ depo.saldo }}</div>
                </div>
            </div>
        </div>
    </div>
    <Loader v-if="is_loading"></Loader>

</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import Swal from 'sweetalert2'
import Sidebar from '../../components/user/Sidebar.vue'
import formatDate from "@/helpers/formatDate";
import ThousandFormat from "@/helpers/formatThousand";
import router from "@/router";
import Loader from "@/components/Loader.vue";

const angsuran = ref([])
const is_loading = ref(null)


const getAngsuran = async () => {
    is_loading.value = true
    await axios.get("http://127.0.0.1:8000/api/my-angsuran", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        }
    }).then((res) => {
        setTimeout(() => {
            angsuran.value = res.data.data
            is_loading.value = false
        }, 1500);
    }).catch((err) => {
        console.log(
            err.response.data.message
        )
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
getAngsuran()
</script>

<style></style>