<template>
  <div class="flex">
    <Sidebar />
    <div class="p-8 flex-1">
      <div class="border-b border-gray-500">
        <h1 class="text-2xl font-semibold pb-2">
          Dashboard
        </h1>
      </div>
      <div class="flex flex-wrap p-8">
        <div class="w-64 rounded-lg bg-red-600 m-4  ">
          <div class="rounded-lg shadow text-white p-2">Anggota</div>
          <div class="text-3xl text-white rounded-lg p-8 text-center">
            <fa :icon="['fas', 'user']" /> {{
              memberCount }}
          </div>
        </div>
        <div class="w-64 rounded-lg bg-orange-500 m-4   ">
          <div class="rounded-lg shadow text-white p-2">Transaksi simpanan bulan ini</div>
          <div class="text-3xl text-white rounded-lg p-8 text-center">
            <fa :icon="['fas', 'user']" /> {{ adminDeposit }}
          </div>
        </div>
        <div class="w-64 rounded-lg bg-yellow-500 m-4  ">
          <div class="rounded-lg shadow text-white p-2">Pinjaman</div>
          <div class="text-3xl text-white rounded-lg p-8 text-center">
            <fa :icon="['fas', 'user']" /> {{ loanCount }}
          </div>
        </div>
        <div class="w-64 rounded-lg bg-blue-500 m-4  ">
          <div class="rounded-lg shadow text-white p-2">Angsuran bulan ini</div>
          <div class="text-3xl text-white rounded-lg p-8 text-center">
            <fa :icon="['fas', 'user']" /> {{ adminAngsuran }}
          </div>
        </div>
        <div class="w-64 rounded-lg bg-blue-800 m-4  ">
          <div class="rounded-lg shadow text-white p-2">Simpanan Bulan ini</div>
          <div class="text-3xl text-white rounded-lg p-8 text-center">
            <fa :icon="['fas', 'rupiah-sign']" />. {{ ThousandFormat(saldo) }}
          </div>
        </div>
        <div class="w-64 rounded-lg bg-purple-700 m-4  ">
          <div class="rounded-lg shadow text-white p-2">Angsuran Bulan ini</div>
          <div class="text-3xl text-white rounded-lg p-8 text-center">
            <fa :icon="['fas', 'rupiah-sign']" />. {{ ThousandFormat(angsuran) }}
          </div>
        </div>
      </div>
      <!-- <router-link to="/">Babi</router-link>
      <router-link to="#">kucing</router-link> -->
    </div>



  </div>
  <Loader v-if="is_loading" />

</template>


<script setup>
import Sidebar from '../../components/admin/Sidebar.vue';
import jumlahMembers from '@/composables/jumlahMembers';
import jumlahpinjaman from '@/composables/jumlahPinjaman';
import ThousandFormat from '@/helpers/formatThousand';
import Loader from '@/components/Loader.vue';


import jumlahAngsuranAdmin from '@/composables/jumlahAngsuranAdmin';
import jumlahDepositAdmin from '@/composables/jumlahDepositAdmin';
import sumAngsuranAdmin from '@/composables/sumAngsuranAdmin';
import sumSaldoAdmin from '@/composables/sumSaldoAdmin';



const { memberCount, countMembers } = jumlahMembers()
countMembers()
const { loanCount, loanCounter } = jumlahpinjaman()
loanCounter()

const { adminAngsuran, AdminAngsuranCount } = jumlahAngsuranAdmin()
AdminAngsuranCount()
const { adminDeposit, is_loading, adminDepositCount } = jumlahDepositAdmin()
adminDepositCount()

const { angsuran, sumAngsuran } = sumAngsuranAdmin()
sumAngsuran()
const { saldo, sumSaldo } = sumSaldoAdmin()
sumSaldo()
</script>
<style scoped>
a.router-link-exact-active {
  background: red;
}
</style>