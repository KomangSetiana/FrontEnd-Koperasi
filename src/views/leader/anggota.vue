<template>
    <div class="flex">
        <Sidebar></Sidebar>

        <div class="p-8 h-screen overflow-y-auto flex-1">
            <div class="flex p-3 justify-between">
                <div>
                    <h1 class="text-2xl font-semibold p-1">
                        <fa :icon="['fas', 'user-plus']" style="color: green; " @click="toggleModalPlus()"
                            class="p-1 cursor-pointer border rounded-md hover:bg-green-500" /> ANGGOTA
                    </h1>
                </div>
                <div>
                    <input type="text" v-model="fillter.search" placeholder="cari..."
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1.5 mx-4">
                    <Button @click="handleFillter()"
                        class="text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">Cari</Button>
                </div>
            </div>

            <div class=" rounded-lg shadow hidden md:block">
                <table class="w-full m-1">
                    <thead class="border border-gray-200">
                        <tr>
                            <th class="p-1 text-sm font-semibold tracking-wide text-left w-24">No.</th>
                            <th class="p-1 text-sm font-semibold tracking-wide text-left">Nama</th>
                            <th class="p-1 text-sm font-semibold tracking-wide text-left w-24">Jenis Kelamin
                            </th>
                            <th class="p-1 text-sm font-semibold tracking-wide text-left w-24">Alamat</th>
                            <th class="p-1 text-sm font-semibold tracking-wide text-left w-24">Telepon</th>
                            <th class="p-1 text-sm font-semibold tracking-wide text-left w-24">Korwil</th>
                            <th class="p-1 text-sm font-semibold tracking-wide text-left">action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(item, index) in members" :key="index" class="hover:bg-slate-300"
                            :class="[index % 2 == 0 ? 'bg-white' : 'bg-gray-100']">
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.name }}</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.gender }}</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.address }}</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.telp }}</td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.korwil.region }}
                            </td>
                            <td class="p-1 text-sm text-gray-700 whitespace-nowrap">

                                <fa :icon="['fas', 'pencil']" style="color:dodgerblue;"
                                    class="cursor-pointer border border-gray-300 p-1 text-sm hover:bg-blue-400"
                                    @click="toggleModalUpdate(form = item)" />

                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>



            <!-- Mobile Table -->
            <div class=" grid grid-cols-1 gap-4 md:hidden">
                <div v-for="(depo, index) in data" :key="index" class="bg-white shadow p-2 rounded-lg">
                    <div class="flex space-x-2 items-center text-sm">
                        <div>{{ index + 1 }}</div>
                        <div>{{ depo.members.name }}</div>
                        <div class="text-gray-500">{{ depo.date }}</div>
                        <div class="text-green-800" :class="[depo.debet == null && 'hidden']">Masuk:
                            Rp.{{
                                depo.debet }}
                        </div>
                        <div class="text-red-800" :class="[depo.kredit == null && 'hidden']">Keluar: Rp.
                            {{ depo.kredit
                            }}
                        </div>
                    </div>
                    <div>Saldo: Rp. {{ depo.saldo }}</div>
                </div>
            </div>
        </div>

    </div>

    <!-- MODAL -->

    <Modal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="bg-white shadow-md p-4 overscroll-contain">
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-if="modalCreate">Tambah Anggota</h1>
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-if="modalUpdate">Update Anggota</h1>

            <form @submit.prevent="statusModal ? createMember() : updateMember()">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" v-model="form.name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nama" required />
                    </div>

                    <div>
                        <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih
                            Gender</label>
                        <select id="gender" v-model="form.gender"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Pilih gender</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>

                        </select>
                    </div>

                    <div>
                        <label for="alamat"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Alamat</label>
                        <input type="text" id="alamat" v-model="form.address"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Alamat" required />
                    </div>
                    <div>
                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nomor
                            Telepon</label>
                        <input type="tel" id="phone" v-model="form.telp"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="+62" required />
                    </div>
                    <div>
                        <label for="korwil" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih
                            korwil</label>
                        <select id="korwil" v-model="form.korwil_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Pilih korwil</option>
                            <option v-for="korwil in korwils" :key="korwil.id" :value="korwil.id">{{ korwil.region }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih
                            User Email</label>
                        <select id="email" v-model="form.user_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose a email</option>
                            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.email }}</option>

                        </select>
                    </div>
                </div>

                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
            </form>

        </div>
    </Modal>


    <Loader v-if="is_loading" />

</template>


<script setup>
import axios from 'axios';
import { ref } from 'vue';
import Sidebar from '../../components/leader/Sidebar.vue';
import Modal from '@/components/Modal.vue'
import getMembers from '@/composables/getMembers';
import Swal from 'sweetalert2'

import getKorwils from '@/composables/getKorwils';
import getUsers from '@/composables/getUsers';
import Loader from '@/components/Loader.vue';


const statusModal = ref(false)
const modalActive = ref(false)
const modalUpdate = ref(null)
const modalCreate = ref(null)
const error = ref(null)
const form = ref({
    id: '',
    name: '',
    gender: '',
    address: '',
    telp: '',
    korwil_id: '',
    korwils: {
        id: ''
    },
    user_id: '',
    users: {
        id: ''
    }
})
const handleFillter = () => {
    loadMember()
}
const createMember = async () => {
    await axios.post("http://127.0.0.1:8000/api/member", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        name: form.value.name,
        gender: form.value.gender,
        address: form.value.address,
        telp: form.value.telp,
        korwil_id: form.value.korwil_id,
        user_id: form.value.user_id
    }).then(() => {
        loadMember()
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
const updateMember = async () => {
    await axios.put("http://127.0.0.1:8000/api/member/" + form.value.id, {

        name: form.value.name,
        gender: form.value.gender,
        address: form.value.address,
        telp: form.value.telp,
        korwil_id: form.value.korwil_id,
        user_id: form.value.user_id
    }).then(() => {
        loadMember()
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

const toggleModal = () => {
    modalActive.value = !modalActive.value
}
const toggleModalPlus = () => {
    form.value = {}
    statusModal.value = true
    modalCreate.value = true
    modalActive.value = !modalActive.value
    modalUpdate.value = false
}
const toggleModalUpdate = (p) => {
    statusModal.value = false
    modalUpdate.value = true
    modalActive.value = !modalActive.value
    modalCreate.value = false
    form.value.korwil_id = p.korwils.id

}
const { members, fillter, is_loading, loadMember } = getMembers()
loadMember()
const { korwils, loadKorwil } = getKorwils()
loadKorwil()
const { users, loadUser } = getUsers()
loadUser()









</script>