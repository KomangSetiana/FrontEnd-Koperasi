<template>
    <div class="flex">
        <Sidebar />

        <div class="p-8 flex-1 h-screen overflow-y-auto">
            <div class="border-b border-gray-500 flex pb-4">
                <h1 class="text-2xl font-semibold">Simpanan</h1>
            </div>

            <div class="rounded-lg shadow hidden md:block">
                <table class="w-full">
                    <thead class="border-b-2 border-gray-200">
                        <tr>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">No.</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Tanggal</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Debet</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Kredit</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Bunga</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Saldo</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Simpanan</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <template v-for="itm, index in data" :key="index">
                            <tr v-for="(item, index) in itm.deposits" :key="index"
                                :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.date) }}
                                </td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ item.debet == null ? null :
                                    ThousandFormat(item.debet) }}
                                </td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ item.kredit }}
                                </td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ item.interest }}
                                </td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{
                                    ThousandFormat(item.saldo) }}
                                </td>
                                <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{
                                    item.deposit_types.deposit_name }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <div class="grid grid-cols-1 gap-4 md:hidden">
                <div v-for="(depo, index) in data" :key="index" class="bg-white shadow p-2 rounded-lg">
                    <div class="flex space-x-2 items-center text-sm">
                        <div>{{ index + 1 }}</div>
                        <div>{{ depo.name }}</div>
                        <div class="text-gray-500">{{ depo.deposits.date }}</div>
                        <div class="text-green-800" :class="[depo.deposits.debet == null && 'hidden']">Masuk: Rp.{{
                            depo.deposits.debet }}
                        </div>
                        <div class="text-red-800" :class="[depo.deposits.kredit == null && 'hidden']">Keluar: Rp. {{
                            depo.kredit
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

const data = ref([])
const is_loading = ref(null)

const getDeposit = async () => {
    is_loading.value = true
    await axios.get("http://127.0.0.1:8000/api/my-deposit", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        }
    }).then((res) => {
        setTimeout(() => {
            data.value = res.data.data
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

getDeposit()

</script>

<style></style>