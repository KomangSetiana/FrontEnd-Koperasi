<template>

    <div class="flex">
        <div class="bg-green-950 h-screen pt-4 relative duration-300" :class="[open ? 'w-72 p-4' : 'w-20']">
            <img class="-right-3 bg-white text-green-950 duration-500 text-3xl top-9 border border-green-950 rounded-full absolute cursor-pointer"
                src="../../assets/arrow-left-short.svg" alt="arrow" v-on:click="open = !open"
                :class="[!open && 'rotate-180']">

            <div class="flex block inline-flex rounded-full"><img src="../../assets/logo-koperasi.svg"
                    :class="[!open && 'text-4xl p-2']">
                <h1 class="text-gray-300 origin-left font-medium text-xl p-4" :class="[!open && 'hidden']">
                    <span class="text-yellow-500 font-bold">Koperasi</span> Dana
                    Sawitra <span class="text-yellow-500 font-bold">Sujati</span>
                </h1>
            </div>

            <ul class="pt-8" id="ulside">
                <Router-link to="/simpanan">
                    <li
                        class="text-gray-300 text-md flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-900 rounded-md pt-2 duration-300">
                        <fa :icon="['fas', 'money-bill-1-wave']" /> <span :class="[!open && 'scale-0']">Simpanan</span>
                    </li>
                </Router-link>
                <Router-link to="/pinjaman">
                    <li
                        class="text-gray-300 text-md flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-900 rounded-md pt-2 duration-300">
                        <fa :icon="['fas', 'money-bill-trend-up']" /> <span
                            :class="[!open && 'scale-0']">Pinjaman</span>
                    </li>
                </Router-link>
                <Router-link to="/angsuran">
                    <li
                        class="text-gray-300 text-md flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-900 rounded-md pt-2 duration-300">
                        <fa :icon="['fas', 'money-bill-transfer']" /> <span
                            :class="[!open && 'scale-0']">Angsuran</span>
                    </li>
                </Router-link>
                <Router-link to="/settings">
                    <li
                        class="text-gray-300 text-md flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-900 rounded-md pt-2 duration-300">
                        <fa :icon="['fas', 'user-gear']" /> <span :class="[!open && 'scale-0']">Settings</span>
                    </li>
                </Router-link>

            </ul>
            <a @click="deleteToken()"
                class="text-gray-300 text-md flex items-center gap-x-4 cursor-pointer p-2 hover:bg-green-900 rounded-md bottom-0 absolute mb-4 duration-300">
                <img src="../../assets/box-arrow.svg"> <span :class="[!open && 'scale-0']">Log Out</span>
            </a>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import router from '@/router';

const open = ref(true)
const deleteToken = () => {
    Swal.fire({
        title: 'Apakah Anda Yakin?',
        text: "Anda akan keluar dari halaman!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Iya, Keluar!'
    }).then((result) => {
        if (result.isConfirmed) {
            // axios
            //     .post('http://127.0.0.1:8000/api/logout', {
            //         headers: {
            //             Authorization: 'Bearer' + localStorage.getItem('token')
            //         }
            //     })
            localStorage.removeItem('token')
            router.push("/login")

            Swal.fire({
                title: 'Keluar!',
                text: 'Berasil keluar.',
                icon: 'success'
            })

        }
    })
}
</script>

<style scoped>
ul a.router-link-exact-active {
    background: red;
}
</style>
