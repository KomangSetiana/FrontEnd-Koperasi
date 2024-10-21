<template>
    <div class="flex">
        <Sidebar />
        <div class="p-8 h-screen overflow-y-auto flex-1">
            <div class="flex p-3 justify-between">
                <div>
                    <h1 class="text-2xl font-semibold p-1">
                        PINJAMAN
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
                    <thead class="border border-gray-200">
                        <tr>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">No.</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Nama</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-20">Jumlah Pinjaman</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Tanggal</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Janggka Waktu</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Potongan Admin</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Tabungan Wajib</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Pinjaman Didapat</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(item, index) in loans" :key="item.id" class="hover:bg-slate-300"
                            :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.members.name }}</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ ThousandFormat(item.loan_amount)
                                }}</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.date) }}</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ ThousandFormat(item.time_period)
                                }} Bulan</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{
                                ThousandFormat(item.admin_deduction) }}</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">
                                {{ ThousandFormat(item.mandotory_savings) }}</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ ThousandFormat(item.loan_obtaneb)
                                }}</td>
                            <td>
                                <router-link :to="{ name: 'show angsuran', params: { id: item.id } }">
                                    <fa :icon="['fas', 'circle-info']" style="color: orange;"
                                        class=" cursor-pointer border border-gray-300 p-1 mx-1 hover:bg-yellow-400" />
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
                        <div class="text-red-800" :class="[depo.kredit == null && 'hidden']">Keluar: Rp. {{ depo.kredit
                            }}
                        </div>
                    </div>
                    <div>Saldo: Rp. {{ depo.saldo }}</div>
                </div>
            </div>
        </div>
        <!-- <AnggotaSkeleton v-else /> -->
    </div>

    <!-- Modal -->

    <Loader v-if="is_loading"> </Loader>
</template>



<script setup>
import { ref } from 'vue';
import axios from 'axios'
import Sidebar from '@/components/admin/Sidebar.vue'
import AnggotaSkeleton from '@/components/AnggotaSkeleton.vue';
import getPinjaman from '@/composables/getPinjaman'
import getMembers from '@/composables/getMembers';
import Swal from 'sweetalert2'
import formatDate from '@/helpers/formatDate';
import ThousandFormat from '@/helpers/formatThousand';
import Loader from '@/components/Loader.vue';

const statusModal = ref(false)
const modalActive = ref(false)
const modalUpdate = ref(null)
const modalCreate = ref(null)
const error = ref(null)
const form = ref({
    id: '',
    member_id: '',
    members: {
        id: ''
    },
    date: '',
    loan_amount: null,
    time_period: null

})

const handleFillter = () => {
    loadPinjaman()
}


// const toggleModal = () => {
//     modalCreate.value = !modalActive.value
//     modalUpdate.value = !modalUpdate.value
//     modalActive.value = !modalActive.value
//     loadPinjaman()
// }
// const toggleModalPlus = () => {
//     form.value = {}
//     statusModal.value = true
//     modalCreate.value = true
//     modalActive.value = !modalActive.value
//     console.log(statusModal.value)

// }
// const toggleModalUpdate = (p) => {
//     statusModal.value = false
//     modalUpdate.value = true
//     modalActive.value = !modalActive.value
//     form.value.member_id = p.members.id
//     form.value.time_period = p.time_period / 12
// }


const { loans, is_loading, fillter, loadPinjaman } = getPinjaman()
loadPinjaman()
const { members, loadMember } = getMembers()
loadMember()

</script>