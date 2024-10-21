<template>
    <header class="flex justify-between">
        <div style="height: 54px;" class="z-50">
            <img src="../assets/logo-k.svg" alt="">
        </div>
        <ul
            class="transiton-all duration-200 items-center fixed inset-0 bg-green-900 pt-24 md:pt-0 md:bg-transparent md:relative md:flex md:opacity-100 md:visible">
            <li class=" my-4 md:my-0">
                <a href="/" class="text-green-200 hover:text-green-950 text-lg px-6 py-3 font-medium">
                    Home
                </a>
            </li>
            <li class=" my-4 md:my-0">
                <a href="#pinjaman" class="text-green-200 hover:text-green-950 text-lg px-6 py-3 font-medium">
                    Pinjaman
                </a>
            </li>
            <li class=" my-4 md:my-0">
                <a href="#office" class="text-green-200 hover:text-green-950 text-lg px-6 py-3 font-medium">
                    Office
                </a>
            </li>
            <li class=" mt-8 md:mt-0">

                <a href="/login" :class="[route == '/login' && 'hidden']"
                    class="bg-green-600 hover:bg-green-500 transition-all duration-200 text-green-200 hover:text-green-950 text-lg px-6 py-3 font-medium ml-6 inline-flex items-center">
                    Masuk
                </a>

            </li>
        </ul>
    </header>


</template>

<script setup>
import router from '@/router';

const route = router.currentRoute.value.path
</script>
