  <template>
    <main>
      <section class="header-cliping pt-8 min-h-screen md:-0">
        <div class="sunshine max-w-full"></div>
        <img src="../assets/circle-accent-2.svg" class="absolute bottom-20 md:left-0 md:bottom-30 fill-white" />
        <div class="container mx-auto px-4">
          <Header></Header>
          <Hero></Hero>
        </div>
      </section>
      <Section class="py-8 mt-16 font-semibold bg-green-800" id="pinjaman">
        <h1 class="text-4xl text-center text-white p-5">Simulasi Pinjaman</h1>
        <div class="flex w-full justify-center">
          <div class="w-full p-12">
            <form @submit.prevent="preview()">
              <div class="mb-5">
                <label for="number" class="block mb-2 text-md font-medium text-white dark:text-white">Jumlah
                  Pinjaman</label>
                <InputNumber type="number" id="number1" v-model="input.loan_amount"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="masukan jumlah pinjaman" required />
              </div>
              <div class="mb-5">
                <label for="number" class="block mb-2 text-md font-medium text-white dark:text-white">Jangka
                  Waktu*Bulan</label>
                <input type="number" id="number2" v-model="input.time_period"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                  placeholder="masukan jangka waktu" required />
              </div>

              <button type="submit" @click="setTime"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Hitung</button>
            </form>
          </div>

          <div class="w-full p-12" v-if="prev">
            <dl class=" text-white divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
              <div class="flex flex-col pb-3">
                <dt class="mb-1 text-white md:text-lg dark:text-gray-400">Jumlah Pinjaman</dt>
                <dd class="text-lg font-semibold">Rp. {{ data == null ? '' : ThousandFormat(data.besar_pinjaman) }}</dd>
              </div>
              <div class="flex flex-col py-3">
                <dt class="mb-1 text-white md:text-lg dark:text-gray-400">Jangka Waktu</dt>
                <dd class="text-lg font-semibold">{{ data == null ? '' : ThousandFormat(data.jangka_waktu) }} Bulan</dd>
              </div>
              <div class="flex flex-col pt-3">
                <dt class="mb-1 text-white md:text-lg dark:text-gray-400">Suku Bunga</dt>
                <dd class="text-lg font-semibold">{{ data == null ? '' : data.suku_bunga }}</dd>
              </div>
              <div class="flex flex-col pt-3">
                <dt class="mb-1 text-white md:text-lg dark:text-gray-400">Besar Angsuran</dt>
                <dd class="text-lg font-semibold">Rp. {{ data == null ? '' : ThousandFormat(data.besar_angsuran) }}</dd>
              </div>
              <div class="flex flex-col pt-3">
                <dt class="mb-1 text-white md:text-lg dark:text-gray-400">Biaya Admin</dt>
                <dd class="text-lg font-semibold">Rp. {{ data == null ? '' : ThousandFormat(data.biaya_admin) }}</dd>
              </div>
              <div class="flex flex-col pt-3">
                <dt class="mb-1 text-white md:text-lg dark:text-gray-400">Tabungan Wajib</dt>
                <dd class="text-lg font-semibold">Rp. {{ data == null ? '' : ThousandFormat(data.tabungan_wajib) }}</dd>
              </div>
              <div class="flex flex-col pt-3">
                <dt class="mb-1 text-white md:text-lg dark:text-gray-400">Pinjaman Didapat</dt>
                <dd class="text-lg font-semibold">Rp. {{ data == null ? '' : ThousandFormat(data.pinjaman_didapat) }}
                </dd>
              </div>

            </dl>
          </div>
        </div>
      </Section>


      <Section class="py-8 mt-16 font-semibold bg-green-800" id="office">
        <h1 class="text-4xl text-center text-white p-5">Office</h1>
        <div class="flex w-full justify-center">
          <div class="w-full p-12">
            <img src="../assets/KDSS.jpg" alt="">
          </div>

          <div class="w-full p-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.4870643900304!2d114.57082907356948!3d-8.353651984168716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd161c2c8c8eb4b%3A0xb72e6036d4390ed0!2sKOPRASI%20KONSUMEN%20DANA%20SAWITRA%20SUJATI!5e0!3m2!1sid!2sid!4v1721716823494!5m2!1sid!2sid"
              width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
            <p class="text-white"> Jln.Raya, Br. Rening, Desa Baluk Kec. Negare, Jembrana</p>
          </div>
        </div>
      </Section>


      <!-- <img src="./assets/img-hero.jpg" alt=""> -->

      <!-- <RouterView /> -->
      <section class=" bg-green-950 py-12 mt-24">
        <Footer></Footer>
      </section>
    </main>

    <Loader v-if="is_loading" />
  </template>
<script setup>

import axios from 'axios';
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue';
import Hero from '../components/Hero.vue';
import Loader from '@/components/Loader.vue';
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import InputNumber from 'primevue/inputnumber';
import ThousandFormat from '@/helpers/formatThousand';


const toggleModal = () => {
  modalActive.value = !modalActive.value
}
const prev = ref(false)
const modalActive = ref(false)
const is_loading = ref(null)
const data = ref(null)
const input = ref({
  loan_amount: '',
  time_period: ''
})
const preview = async () => {
  is_loading.value = true
  await axios.post("http://127.0.0.1:8000/api/preview", {
    loan_amount: input.value.loan_amount,
    time_period: input.value.time_period
  }).then((res) => {
    setTimeout(() => {
      data.value = res.data
      is_loading.value = false
    }, 1000);
  }).catch((err) => {
    console.log(
      err.response.data.message
    )

  })
}

const setTime = () => {
  setTimeout(() => {
    prev.value = true
  }, 1000);
}
</script>
<style></style>