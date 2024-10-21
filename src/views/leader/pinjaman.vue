<template>
    <div class="flex">
        <Sidebar />
        <div class="p-8 h-screen overflow-y-auto flex-1">
            <div class="flex p-3 justify-between">
                <div>
                    <h1 class="text-2xl font-semibold p-1">
                        <fa :icon="['fas', 'user-plus']" style="color: green; " @click="toggleModalPlus()"
                            class="p-1 cursor-pointer border rounded-md hover:bg-green-500" /> PINJAMAN
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
                        <tr v-for="(item, index) in loans" :key="item.id"
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
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">


                                <fa :icon="['fas', 'pencil']" style="color:dodgerblue;"
                                    class="cursor-pointer border border-gray-300 p-2 mx-1 hover:bg-blue-400"
                                    @click="toggleModalUpdate(form = item)" />
                                <router-link :to="{ name: 'show angsuran', params: { id: item.id } }">
                                    <fa :icon="['fas', 'circle-info']" style="color: orange;"
                                        class=" cursor-pointer border border-gray-300 p-1 mx-1 hover:bg-yellow-400" />
                                </router-link>
                                <fa :icon="['fas', 'trash-can']" style="color: red; "
                                    class="cursor-pointer border border-gray-300 p-2 mx-1 hover:bg-red-400"
                                    @click="deletePinjaman(item.id)" />

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="grid grid-cols-1 gap-4 md:hidden">
                <div v-for="(depo, index) in loans" :key="index" class="bg-white shadow p-2 rounded-lg">
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
    <Modal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="bg-white shadow-md p-4 overscroll-contain">
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-if="modalCreate">Tambah Pinjaman</h1>
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-if="modalUpdate">Update Pinjaman</h1>

            <form @submit.prevent="statusModal ? createPinjaman() : updatePinjaman()">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih
                            Nama</label>
                        <select id="nama" v-model="form.member_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Pilih nama</option>
                            <option v-for="member in members" :key="member.id" :value="member.id">{{ member.name }}
                            </option>

                        </select>
                    </div>

                    <div>
                        <label for="debet" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah
                            Pinjaman</label>
                        <InputNumber type="number" id="debet" v-model="form.loan_amount" fluid
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Jumlah pinjaman" />
                    </div>

                    <div>
                        <label for="date"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal</label>
                        <input type="date" id="date" v-model="form.date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tanggal" required />
                    </div>

                    <div>
                        <label for="jangka-waktu"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jangka Waktu
                            *Tahun</label>
                        <input type="number" id="jangka-waktu" v-model="form.time_period"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Jangka waktu" />
                    </div>
                </div>

                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
            </form>

        </div>
    </Modal>
    <Loader v-if="is_loading"> </Loader>

</template>



<script setup>
import { ref } from 'vue';
import axios from 'axios'
import Sidebar from '@/components/leader/Sidebar.vue'
import Modal from '@/components/Modal.vue';
import getPinjaman from '@/composables/getPinjaman'
import getMembers from '@/composables/getMembers';
import Swal from 'sweetalert2'
import formatDate from '@/helpers/formatDate';
import ThousandFormat from '@/helpers/formatThousand';
import InputNumber from 'primevue/inputnumber';
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
const createPinjaman = async () => {
    await axios.post("http://127.0.0.1:8000/api/pinjaman", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        member_id: form.value.member_id,
        loan_amount: form.value.loan_amount,
        date: form.value.date,
        time_period: form.value.time_period,
    }).then(() => {
        loadPinjaman()
        modalActive.value = !modalActive.value
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    })

}
const updatePinjaman = async () => {
    await axios.put("http://127.0.0.1:8000/api/pinjaman/" + form.value.id, {

        member_id: form.value.member_id,
        loan_amount: form.value.loan_amount,
        date: form.value.date,
        time_period: form.value.time_period,
    }).then(() => {
        loadPinjaman()
        modalActive.value = !modalActive.value
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    })


}
const deletePinjaman = (id) => {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            axios.delete("http://127.0.0.1:8000/api/pinjaman/" + id).then(() => {
                loadPinjaman()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            })
        }
    });
}
const handleFillter = () => {
    loadPinjaman()
}
function formatDatee() {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const toggleModal = () => {
    form.value = {}
    loadPinjaman()
    modalCreate.value = false
    modalUpdate.value = false
    modalActive.value = !modalActive.value
}
const toggleModalPlus = () => {
    form.value.date = formatDatee()
    statusModal.value = true
    modalCreate.value = true
    modalActive.value = !modalActive.value

}
const toggleModalUpdate = (p) => {
    statusModal.value = false
    modalUpdate.value = true
    modalActive.value = !modalActive.value
    form.value.member_id = p.members.id
    form.value.time_period = p.time_period / 12
}


const { loans, is_loading, fillter, loadPinjaman } = getPinjaman()
loadPinjaman()
const { members, loadMember } = getMembers()
loadMember()

</script>