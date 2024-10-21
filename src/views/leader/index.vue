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
                        <fa :icon="['fas', 'user']" /> {{ depoCount }}
                    </div>
                </div>
                <div class="w-64 rounded-lg bg-yellow-500 m-4  ">
                    <div class="rounded-lg shadow text-white p-2">Laba Koperasi</div>
                    <div class="text-3xl text-white rounded-lg p-8 text-center">
                        <fa :icon="['fas', 'rupiah-sign']" />. {{ ThousandFormat(laba) }}
                    </div>
                </div>
                <div class="w-64 rounded-lg bg-blue-500 m-4  ">
                    <div class="rounded-lg shadow text-white p-2">Angsuran bulan ini</div>
                    <div class="text-3xl text-white rounded-lg p-8 text-center">
                        <fa :icon="['fas', 'user']" /> {{ angsuranCount }}
                    </div>
                </div>
                <div class="w-64 rounded-lg bg-blue-800 m-4  ">
                    <div class="rounded-lg shadow text-white p-2">Saldo Simpanan</div>
                    <div class="text-3xl text-white rounded-lg p-8 text-center">
                        <fa :icon="['fas', 'rupiah-sign']" />. {{ ThousandFormat(saldo) }}
                    </div>
                </div>
                <div class="w-64 rounded-lg bg-purple-700 m-4  ">
                    <div class="rounded-lg shadow text-white p-2">Dana dipinjamkan</div>
                    <div class="text-3xl text-white rounded-lg p-8 text-center">
                        <fa :icon="['fas', 'rupiah-sign']" />. {{ ThousandFormat(loan) }}
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
import Sidebar from '../../components/leader/Sidebar.vue';
import jumlahMembers from '@/composables/jumlahMembers';
import jumlahpinjaman from '@/composables/jumlahPinjaman';
import jumlahDeposit from '@/composables/jumlahDeposit';
import ThousandFormat from '@/helpers/formatThousand';
import Loader from '@/components/Loader.vue';


import jumlahAngsuran from '@/composables/jumlahAngsuran';
import sumLoanAll from '@/composables/sumLoanAll';
import sumSaldoAll from '@/composables/sumSaldoAll';
import sumLaba from '@/composables/labaKoperasi';



const { memberCount, countMembers } = jumlahMembers()
countMembers()
const { laba, labaKoperasi } = sumLaba()
labaKoperasi()
const { depoCount, DepositCounter } = jumlahDeposit()
DepositCounter()
const { loan, loanAll } = sumLoanAll()
loanAll()
const { saldo, is_loading, saldoAll } = sumSaldoAll()
saldoAll()
const { angsuranCount, angsuranCounter } = jumlahAngsuran()
angsuranCounter()
</script>
<style scoped>
a.router-link-exact-active {
    background: red;
}
</style>