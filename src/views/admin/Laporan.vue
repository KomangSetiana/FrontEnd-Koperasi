<template>
    <div class="flex">
        <Sidebar />

        <div class="p-8 flex-1">
            <div class="flex p-3 justify-between">
                <div>
                    <h1 class="text-2xl font-semibold p-1">
                        LAPORAN
                    </h1>
                </div>
                <div>
                    <input type="text" v-model="fillter.search" placeholder="cari..."
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1.5 mx-4">
                    <Button @click="handleFillter()"
                        class="text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">Cari</Button>
                </div>
            </div>

            <div class="overflow-auto rounded-lg shadow hidden md:block">
                <table class="w-full">
                    <thead class="border-b-2 border-gray-200">
                        <tr>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">No.</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Laporan</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Bulan</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Validasi</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Action</th>

                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(item, index) in report" :key="index" class="hover:bg-slate-300"
                            :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.type }}</td>
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ formatMonth(item.date) }}</td>
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap" :class="[item.is_validasi == false
                                ? 'text-red-500' : 'text-green-500']">{{ item.is_validasi == false ?
                                    'Belum tervalidasi' : 'tervaslidasi' }}</td>
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">
                                <router-link :to="{ name: 'laporan-simpanan', params: { id: item.id } }"
                                    :class="[item.type == 'angsuran' && 'hidden']"
                                    class="ml-3 text-white bg-blue-600 hover:bg-blue-400 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center">
                                    Details
                                </router-link>
                                <router-link :to="{ name: 'laporan-angsuran', params: { id: item.id } }"
                                    :class="[item.type == 'deposit' && 'hidden']"
                                    class="ml-3 text-white bg-blue-600 hover:bg-blue-400 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center">
                                    Details
                                </router-link>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </div>

        </div>


        <!-- <template>
            <AnggotaSkeleton />
        </template> -->
    </div>
    <Loader v-if="is_loading"></Loader>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Sidebar from '@/components/admin/Sidebar.vue';
import formatMonth from '@/helpers/formatMonth';
import Loader from '@/components/Loader.vue';

const report = ref([])
const is_loading = ref(null)
const fillter = ref({
    search: ''
})

const handleFillter = () => {
    getReport()
}
const getReport = () => {
    is_loading.value = true
    axios.get("http://127.0.0.1:8000/api/admin-report", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        params: fillter.value
    }).then((res) => {

        setTimeout(() => {
            report.value = res.data.data
            is_loading.value = false
        }, 1500);
    })
}




getReport()
</script>

<style></style>