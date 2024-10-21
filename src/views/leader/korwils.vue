<template>
    <div class="flex">
        <Sidebar />
        <div class="p-8">
            <div class="border-b border-gray-500 flex flex-wrap pb-4">

                <fa :icon="['fas', 'user-plus']" style="color: green; "
                    class="cursor-pointer border border-gray-300 rounded-lg p-2 mx-1 hover:bg-green-400"
                    @click="toggleModalPlus()" />
                <h1 class="text-2xl font-semibold">Kordinasi Wilayah</h1>

            </div>
            <div class="overflow-auto rounded-lg shadow hidden md:block">
                <table class="w-full">
                    <thead class="border-b-2 border-gray-200">
                        <tr>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left w-24">No.</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Wilayah</th>
                            <th class="p-3 text-sm font-semibold tracking-wide text-left">Action</th>

                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-for="(item, index) in korwils" :key="item.id"
                            :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">{{ item.region }}</td>
                            <td class="p-3 text-sm text-gray-700 whitespace-nowrap">

                                <fa :icon="['fas', 'pencil']" style="color:dodgerblue;"
                                    class="cursor-pointer border border-gray-300 p-2 mx-1 hover:bg-blue-400"
                                    @click="toggleModalUpdate(form = item)" />

                                <!-- <fa :icon="['fas', 'trash-can']" style="color: red; "
                                    class="cursor-pointer border border-gray-300 p-2 mx-1 hover:bg-red-400"
                                    @click="deleteDeposit(item.id)" /> -->
                            </td>
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
        <!-- <AnggotaSkeleton v-else /> -->
    </div>

    <!-- Modal -->
    <Modal :modalActive="modalActive" @close-modal="toggleModal()">
        <div class="bg-white shadow-md p-4 overscroll-contain">
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-show="modalCreate">Tambah Korwil</h1>
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-show="modalUpdate">Update Korwil</h1>

            <form @submit.prevent="statusModal ? createKorwil() : updateKorwil()">
                <div class="grid gap-6 mb-6 md:grid-cols-2">


                    <div>
                        <label for="korwil"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wilayah</label>
                        <input type="korwil" id="korwil" v-model="form.region"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Kordinasi wilayah" />
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
import { ref } from 'vue';
import axios from 'axios'
import Sidebar from '@/components/leader/Sidebar.vue'
import Loader from '@/components/Loader.vue';
import Swal from 'sweetalert2'
import getKorwils from '@/composables/getKorwils';
import Modal from '@/components/Modal.vue';


const statusModal = ref(false)
const modalActive = ref(false)
const modalUpdate = ref(null)
const modalCreate = ref(null)
const error = ref(null)
const form = ref({
    id: '',
    region: '',

})

const createKorwil = async () => {
    await axios.post("http://127.0.0.1:8000/api/korwil", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        region: form.value.region
    }).then(() => {
        loadKorwil()
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
const updateKorwil = async () => {
    await axios.put("http://127.0.0.1:8000/api/korwil/" + form.value.id, {

        region: form.value.region
    }).then(() => {
        loadKorwil()
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

const { korwils, is_loading, loadKorwil } = getKorwils()
loadKorwil()

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