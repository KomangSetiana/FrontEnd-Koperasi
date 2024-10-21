<template>
    <div class="flex">
        <Sidebar />

        <div class="p-8 h-screen overflow-y-auto flex-1">
            <div class="border-b border-gray-500 flex flex-wrap pb-4">
                <fa :icon="['fas', 'user-plus']" style="color: green; "
                    class="cursor-pointer border border-gray-300 rounded-lg p-2 mx-1 hover:bg-green-400"
                    @click="toggleModalPlus()" />
                <h1 class="text-2xl font-semibold">Pengguna</h1>

            </div>

            <div class="overflow-auto rounded-lg shadow hidden md:block">
                <table class="w-full">
                    <thead class="border-b-2 border-gray-200">
                        <tr>
                            <th class="p-2 text-sm font-semibold tracking-wide text-left w-24">No.</th>
                            <th class="p-2 text-sm font-semibold tracking-wide text-left">Email</th>
                            <th class="p-2 text-sm font-semibold tracking-wide text-left">Action</th>

                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(item, index) in users" :key="index" class="hover:bg-slate-300"
                            :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.email }}</td>

                            <td class="p-2 text-sm text-gray-700 whitespace-nowrap">

                                <fa :icon="['fas', 'pencil']" style="color:dodgerblue;"
                                    class="cursor-pointer border border-gray-300 p-1 mx-1 hover:bg-blue-400"
                                    @click="toggleModalUpdate(form = item)" />
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


    <Modal :modalActive="modalActive" @close-modal="toggleModal()">
        <div class="bg-white shadow-md p-4 overscroll-contain">
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-show="modalCreate">Tambah Pengguna</h1>
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-show="modalUpdate">Update Pengguna</h1>

            <form @submit.prevent="statusModal ? createUser() : updateUser()">
                <div class="grid gap-6 mb-6 md:grid-cols-2">


                    <div>
                        <label for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="email" id="email" v-model="form.email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Email" />
                    </div>
                    <div>
                        <label for="password"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password
                        </label>
                        <input type="password" id="password" v-model="form.password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Password" />
                    </div>

                </div>

                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
            </form>

        </div>
    </Modal>

    <Loader v-if="is_loading"></Loader>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import getUsers from '@/composables/getUsers';
import Sidebar from '@/components/admin/Sidebar.vue';
import Modal from '@/components/Modal.vue';
import Loader from '@/components/Loader.vue';
import Swal from 'sweetalert2'

const statusModal = ref(false)
const modalActive = ref(false)
const modalUpdate = ref(null)
const modalCreate = ref(null)
const error = ref(null)
const form = ref({
    id: '',
    email: '',
    password: ''

})

const createUser = async () => {
    await axios.post("http://127.0.0.1:8000/api/register", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        email: form.value.email,
        password: form.value.password
    }).then(() => {
        loadUser()
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
const updateUser = async () => {
    await axios.put("http://127.0.0.1:8000/api/user/" + form.value.id, {

        email: form.value.email,
        password: form.value.password
    }).then(() => {
        loadUser()
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


const { users, is_loading, loadUser } = getUsers()
loadUser()


const toggleModal = () => {
    modalCreate.value = !modalActive.value
    modalUpdate.value = !modalUpdate.value
    modalActive.value = !modalActive.value
}
const toggleModalPlus = () => {
    form.value = {}
    statusModal.value = true
    modalCreate.value = true
    modalActive.value = !modalActive.value

}
const toggleModalUpdate = (p) => {
    statusModal.value = false
    modalUpdate.value = true
    modalActive.value = !modalActive.value
}
</script>

<style></style>