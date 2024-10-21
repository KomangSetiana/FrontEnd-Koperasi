<template>
    <div class="flex">
        <Sidebar />
        <div class="bg-white shadow-md p-4 overscroll-contain ml-10 mt-4">
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2">Settings</h1>

            <form @submit.prevent="updateUser()">
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
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
            </form>

        </div>
    </div>
    <Loader v-if="is_loading" />
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import Swal from 'sweetalert2'
import Sidebar from '../../components/user/Sidebar.vue'
import Loader from "@/components/Loader.vue";


const form = ref({
    id: '',
    email: '',
    password: ''

})
const is_loading = ref(null)


const updateUser = async () => {
    is_loading.value = true
    await axios.put("http://127.0.0.1:8000/api/user/" + form.value.id, {

        email: form.value.email,
        password: form.value.password
    }).then(() => {
        setTimeout(() => {
            loadUser()
            is_loading.value = false

        }, 1000);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    })


}

</script>

<style></style>