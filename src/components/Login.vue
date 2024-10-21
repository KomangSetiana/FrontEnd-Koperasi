<template>
    <main>
        <div class="flex justify-center items-center pb-24">
            <div class="w-full md:w-3/12">
                <h1 class="text-4xl text-white mb-6">
                    <span class="font-bold">Login</span> Dengan<br />
                    Akun <span class="font-bold">Anda</span>
                </h1>
                <form @submit.prevent="handleLogin">
                    <div class="flex flex-col mb-4">
                        <label htmlFor="email" class="text-lg mb-2 text-white">
                            Email Address
                        </label>
                        <input name="email" type="email" v-model="email"
                            class="bg-white focus:outline-none border px-6 py-3 w-1/2 w-full border-green-600 focus:border-teal-500"
                            placeholder="Your email address" required />
                    </div>
                    <div class="flex flex-col mb-4">
                        <label htmlFor="password" class="text-lg mb-2 text-white">
                            Password
                        </label>
                        <input name="password" type="password" v-model="password"
                            class="bg-white focus:outline-none border px-6 py-3 w-1/2 w-full border-green-600 focus:border-teal-500"
                            placeholder="Your password" required />
                    </div>
                    <button type="submit"
                        class="bg-red-700 hover:bg-red-500 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 w-full mt-4">
                        Masuk
                    </button>
                </form>
            </div>
            <div class="w-1/12 hidden sm:block"></div>
            <div class="w-5/12 hidden sm:block flex justify-end pt-16 ml-40">
                <div class="relative" style="width: 369px; height: 440px; ">
                    <div class="border-login absolute border-white border-2 -mt-8 -ml-16 left-0">
                    </div>
                    <div class="absolute w-full h-full -mb-6 -ml-3">
                        <img src="../assets/image-login.png" alt="Login" />
                    </div>
                    <div class="absolute z-10 bg-white border border-gray-300 bottom-0 right-0 py-3 px-4 -mr-12"
                        style="width: 290px;">
                        <p class="text-green-950 mb-2">
                            Semua sudah dikeloda dengan teknologi
                        </p>
                        <span class="text-green-400 text-sm">Ayo login!</span>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <Loader v-if="is_loading"></Loader>
</template>

<script>

import axios from 'axios'
import Swal from 'sweetalert2'
import Loader from './Loader.vue';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            is_loading: null

        }
    },
    components: {
        Loader
    },
    methods: {
        async handleLogin() {
            this.is_loading = true
            await axios.post("http://127.0.0.1:8000/api/login", {
                email: this.email,
                password: this.password
            }).then((res) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                });
                dd(res.data)
                localStorage.setItem('token', res.data.token)
                setTimeout(() => {

                    if (res.data.user.role == 'admin') {
                        this.$router.push("/admin")
                    } else if (res.data.user.role == 'user') {
                        this.$router.push("/simpanan")
                    } else if (res.data.user.role == 'leader') {
                        this.$router.push("/leader")

                    }
                    this.is_loading = false
                }, 1500);
            }).catch((err) => {
                if (err.response.data.error == "Unauthorized") {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Invalid Email/Password.",
                    });
                    this.is_loading = false
                }
            })



        }

    }
}

</script>

<style scoped>
.border-login {
    width: 334px;
    height: 384px;
}
</style>