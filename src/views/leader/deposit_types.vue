<template>
    <div class="flex">
        <Sidebar />

        <div class="p-8">
            <div class="border-b border-gray-500 flex flex-wrap pb-4">
                <fa :icon="['fas', 'user-plus']" style="color: green; "
                    class="cursor-pointer border border-gray-300 rounded-lg p-2 mx-1 hover:bg-green-400"
                    @click="toggleModalPlus()" />
                <h1 class="text-2xl font-semibold">Program Simpanan</h1>

            </div>

            <div class="overflow-auto rounded-lg shadow hidden md:block">
                <table class="w-full">
                    <thead class="border-b-2 border-gray-200">
                        <tr>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">No.</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Nama</th>

                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(item, index) in depositTypes" :key="index"
                            :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ item.deposit_name }}</td>

                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">

                                <fa :icon="['fas', 'pencil']" style="color:dodgerblue;"
                                    class="cursor-pointer border border-gray-300 p-2 mx-1 hover:bg-blue-400"
                                    @click="toggleModalUpdate(form = item)" />

                                <fa :icon="['fas', 'trash-can']" style="color: red; "
                                    class="cursor-pointer border border-gray-300 p-2 mx-1 hover:bg-red-400"
                                    @click="deleteDeposit(item.id)" />
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
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-show="modalCreate">Tambah Jenis Simpanan
            </h1>
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-show="modalUpdate">Update Jenis Simpanan
            </h1>

            <form @submit.prevent="statusModal ? createDepoType() : updateDepoType()">
                <div class="grid gap-6 mb-6 md:grid-cols-2">


                    <div>
                        <label for="deposit_name"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama
                            Simpanan</label>
                        <input type="text" id="deposit_name" v-model="form.deposit_name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nama Simpanan" />
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
import Sidebar from '@/components/leader/Sidebar.vue'
import axios from "axios";
import { ref } from "vue";
import Swal from 'sweetalert2'

import getDepositTypes from '@/composables/getDepositTypes';
import Modal from '@/components/Modal.vue'
import Loader from '@/components/Loader.vue';
Loader

const statusModal = ref(false)
const modalActive = ref(false)
const modalUpdate = ref(null)
const modalCreate = ref(null)
const form = ref({
    id: '',
    deposit_name: ''
})



const createDepoType = async () => {
    await axios.post("http://127.0.0.1:8000/api/deposit_type", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        deposit_name: form.value.deposit_name
    }).then(() => {
        loadDepositType()
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
const updateDepoType = async () => {
    await axios.put("http://127.0.0.1:8000/api/deposit_type/" + form.value.id, {

        deposit_name: form.value.deposit_name

    }).then(() => {
        loadDepositType()
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
const deleteDeposit = (id) => {

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

            axios.delete("http://127.0.0.1:8000/api/deposit_type/" + id).then(() => {
                loadDepositType()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            })
        }
    });
}
const deleteDepoType = (id) => {

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

            axios.delete("http://127.0.0.1:8000/api/deposit-type/" + id).then(() => {
                loadDepositType()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            })
        }
    });
}
const { depositTypes, is_loading, loadDepositType } = getDepositTypes()
loadDepositType()



const toggleModal = () => {
    modalCreate.value = false
    modalUpdate.value = false
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