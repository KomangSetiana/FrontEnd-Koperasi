<template>
    <div class="flex justify-between items-center ">
        <div class="w-full md:w-1/2 mt-6 md:mt-0">
            <h1 class="text-4xl text-white mb-3 font-semibold">
                <span class="text-green-500">Koperasi </span> Dana Sawitra Sujati
                <br class="" />
                Pilihan Aman
                <span class="text-green-500"> Berinvestasi </span>
            </h1>
            <p class="text-white text-md mb-32">
                Tumbuh dan berkembang bersama kami
                <br class="" />
                Dapatkan pelayanan keuangan yang aman dan nyaman
            </p>
        </div>
        <div class="hidden w-1/2 md:flex justify-end pr-16 pt-16">
            <div class="relative hero">
                <div class="border-hero absolute border-green-300 border-2 -mt-12 -mr-6 right-0">
                </div>
                <div class="absolute w-full h-full -mb-6 -ml-3">
                    <img src="../assets/hero.jpeg" alt="hero" />
                </div>
                <div class="img-hero absolute z-10 bg-white py-3 px-4 mt-20">
                    <p class="text-gray-700 mb-2">
                        Ayo cepat bergabung bersama kami!
                    </p>
                    <span class="text-gray-400 text-sm">
                        Kopdass, selalu ada
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.hero {
    height: 369px;
    width: 440px;
}

.img-hero {
    transform: translateX(-50%);
    width: 290px;
}

.border-hero {
    height: 400px;
    width: 374px;
}
</style>