<template>


    <div class="flex">
        <Sidebar />

        <div class="p-8 h-screen overflow-y-auto flex-1">
            <div class="flex pb-2 justify-between">
                <div>
                    <h1 class="text-2xl font-semibold p-1">
                        TABUNGAN WAJIB
                    </h1>
                </div>
                <div>

                    <button @click="createSimpananWjbBaru()"
                        class="mx-2 text-green-900 bg-white hover:bg-green-400 font-medium rounded-lg text-sm border bg-green-600 sm:w-auto px-3 py-2 text-center">
                        Buat Periode Baru</button>
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
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Status</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(item, index) in data" :key="index" class="hover:bg-slate-300"
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
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap" :class="[item.saldo == 120000
                                ? 'text-green-500' : 'text-red-500']">{{ item.saldo == 120000 ? 'lunas' :
                                    'belum lunas' }}</td>
                            <td>
                                <router-link :to="{ name: 'show simpanans wajib', params: { id: item.member_id } }">
                                    <fa :icon="['fas', 'circle-info']" style="color: orange;"
                                        class=" cursor-pointer border border-gray-300 p-1 mx-1 hover:bg-yellow-400" />
                                </router-link>
                            </td>
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


const data = ref([])
const is_loading = ref(null)
const fillter = ref({
    search: '',
    dateStart: getDefaultFirstDate(),
    dateEnd: getDefaultLasttDate()
})

const handleFillter = () => {
    showDeposit()
}

function getDefaultFirstDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = '01'; // Add leading zero
    const day = '01'; // First day of the month
    return `${year}-${month}-${day}`;
}
function getDefaultLasttDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = '12'
    const day = '31'
    return `${year}-${month}-${day}`;
}
const showDeposit = async () => {
    is_loading.value = true
    await axios.get("http://127.0.0.1:8000/api/simpanan-wajib", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        params: fillter.value
    }).then((res) => {

        setTimeout(() => {
            data.value = res.data.data
            is_loading.value = false

        }, 1500)
    })
}

const createSimpananWjbBaru = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to Add new Preriod!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Add!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios
                .post('http://127.0.0.1:8000/api/simpanan-wajib-baru', {
                    headers: {
                        Authorization: 'Bearer' + localStorage.getItem('token')
                    }
                })


            Swal.fire({
                title: 'Success!',
                text: 'Periode baru ditambahkan.',
                icon: 'success'
            })
            showDeposit()
        }
    })
}
showDeposit()

</script>