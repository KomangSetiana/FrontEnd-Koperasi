<template>

    <button @click="toggleMenu()" class="toggle z-50" :class="[toggleMenu ? 'active' : '']"></button>


    <aside class=" transition-all duration-300 bg-indigo-900 max-h-screen h-screen overflow-y-auto min-h-full fixed
        sm:relative z-50" :class="[sideBarStyle]">

        <div class="overlay" :class="[!toggleMenu && 'hidden']" @click="toggleMenu()"></div>

        <div class="max-h-screen h-screen  fixed bg-indigo-900 flex flex-col content-between z-50"
            style="width: 280px;">
            <div class="flex flex-col items-center text center mt-8">
                <div class="border border-indogo-500 mx-auto p-2 inline-flex rounded-full overflow-hidden mb-3">
                    Logo Koperasi
                </div>
                <h6 class="text-white text-xl">
                    Nama User
                </h6>
                <span class="text-indigo-500 text-sm">
                    Profresi
                </span>
            </div>
            <ul class="main-menu mt-12">
                <li>
                    <router-link class="nav-link relative flex items-center py-3 px-5 transition-all duration-200
                        hover:text-white active:text-white focus:outline-none w-full text-left" to="/admin-anggota"
                        :class="[path == href ? 'active text-white bg-indigo-800' : 'text-indigo-500']">
                        Anggota
                    </router-link>
                    <router-link class="nav-link relative flex items-center py-3 px-5 transition-all duration-200
                        hover:text-white active:text-white focus:outline-none w-full text-left" to=" /"
                        :class="[path == href ? 'active text-white bg-indigo-800' : 'text-indigo-500']">
                        My Class
                    </router-link>
                    <router-link class="nav-link relative flex items-center py-3 px-5 transition-all duration-200
                        hover:text-white active:text-white focus:outline-none w-full text-left" to=" /"
                        :class="[path == href ? 'active text-white bg-indigo-800' : 'text-indigo-500']">
                        My Class
                    </router-link>
                    <router-link class="nav-link relative flex items-center py-3 px-5 transition-all duration-200
                        hover:text-white active:text-white focus:outline-none w-full text-left" to=" /">
                        My Class
                    </router-link>


                </li>
            </ul>

            <div class="my-auto">
                <ul class="main-menu mt-12">
                    <button
                        class="nav-link relative flex items-center py-3 px-5 transition-all duration-200 hover:text-white active:text-white focus:outline-none w-full text-left text-indigo-500"
                        @click="logout">
                        Logout
                    </button>
                </ul>
            </div>
        </div>
    </aside>

</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';

const path = router.currentRoute.value.fullPath
const href = router.currentRoute.value.href


const setToggleMenu = ref(false)

const toggleMenu = () => {
    setToggleMenu.value = !setToggleMenu.value
}

const sideBarStyle = {
    width: 280,
    left: window.innerWidth < 640 && !toggleMenu ? -280 : 0,
}




</script>
<style scoped>
aside .overlay {
    @apply bg-black opacity-25 inset-0 fixed;
    content: "";
    height: 100vh;
    width: 100vw;
}

/* .toggle {
    position: absolute;
    width: 20px;
    height: 20px;
    left: 30px;
    top: 45px;
}

.guest-page .toggle {
    position: relative;
    left: auto;
    top: auto;
}

.toggle:focus {
    outline: none;
}

.toggle::before,
.toggle::after {
    @apply right-0 absolute bg-gray-900 transition-all duration-200;
    content: "";
    height: 3px;
    transform-origin: center;
}

.toggle::before {
    top: 26%;
    width: 20px;
}

.toggle::after {
    top: 58%;
    width: 12px;
}

.toggle.active::before,
.toggle.active::after {
    width: 20px;
    top: 50%;
    @apply bg-white;
}

.toggle.active::before {
    transform: translateY(-50%);
    rotate: -45deg;
}

.toggle.active::after {
    transform: translateY(-50%);
    rotate: 45deg;
} */
</style>
