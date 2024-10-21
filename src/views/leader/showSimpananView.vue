<template>


    <div class="flex">
        <Sidebar />

        <div class="p-8 h-screen overflow-y-auto flex-1">
            <div class="flex p-3 justify-between">

                <div class="border-b border-gray-600 justify-between flex pb-4">
                    <div>
                        <h1 class="text-2xl font-semibold">SIMPANAN</h1>
                    </div>
                    <div>
                        <input type="text" v-model="fillter.search" placeholder="cari..."
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1.5 mx-4">
                        <Button @click="handleFillter()"
                            class="text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">Cari</Button>
                    </div>
                    <div>

                    </div>
                </div>


            </div>

            <div class="overflow-auto rounded-lg shadow hidden md:block">
                <table class="w-full m-2" id="download-document">
                    <thead class="border border-gray-200">
                        <tr>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">No.</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Nama</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Tanggal</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Debet</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Kredit</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Saldo</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Simpanan</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(item, index) in detail" :key="index" class="hover:bg-slate-300"
                            :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.members.name }}</td>
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.date) }}</td>
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.debet == null ? null :
                                ThousandFormat(item.debet) }}
                            </td>
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.kredit == null ? null
                                : ThousandFormat(item.kredit) }}
                            </td>
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ ThousandFormat(item.saldo) }}
                            </td>
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{
                                item.deposit_types.deposit_name }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- <template>
    <AnggotaSkeleton />
</template> -->


    <!-- loader -->
    <loader v-if="is_loading">
    </loader>


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
import pagination from '@/components/Pagination.vue'
import loader from '@/components/Loader.vue'


const detail = ref([])
const is_loading = ref(null)
const id = ref(router.currentRoute.value.params.id)
const fillter = ref({
    search: ''
})

const handleFillter = () => {
    showDeposit()
}


const showDeposit = async () => {
    is_loading.value = true
    await axios.get("http://127.0.0.1:8000/api/deposit/" + id.value, {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        params: fillter.value
    }).then((res) => {

        setTimeout(() => {
            detail.value = res.data.data
            is_loading.value = false

        }, 1500)
    })
}
showDeposit()

</script>