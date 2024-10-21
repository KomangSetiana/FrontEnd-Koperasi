    <template>
        <div class="flex">
            <Sidebar />
            <div class="p-8 h-screen overflow-y-auto flex-1">
                <div class="flex p-3 justify-between">
                    <div>
                        <h1 class="text-2xl font-semibold p-1">
                            DETAIL ANGSURAN
                        </h1>
                    </div>

                </div>

                <div class="overflow-auto rounded-lg shadow hidden md:block">
                    <table class="w-full">
                        <thead class="border border-gray-200">
                            <tr>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left">No.</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left">Nama</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-20">Jumlah Pinjaman</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24">Tanggal Bayar</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24">Jumlah Bayar</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24">Pokok Bayar</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24">Bunga pinjaman</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24">Denda</th>
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24">Sisa Hutang</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="(item, index) in data" :key="index" class="hover:bg-slate-300"
                                :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.loans.members.name }}
                                </td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{
                                    ThousandFormat(item.loans.loan_amount) }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.date) }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{
                                    ThousandFormat(item.amount_payment) }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{
                                    ThousandFormat(item.principal_loan) }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{
                                    ThousandFormat(item.bunga_pinjaman) }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.mulct == null ? null :
                                    ThousandFormat(item.mulct) }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">
                                    {{ ThousandFormat(item.remaining_debt) }}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- <div class="grid grid-cols-1 gap-4 md:hidden">
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
            </div> -->
            </div>
            <!-- <AnggotaSkeleton v-else /> -->
        </div>
        <Loader v-if="is_loading"></Loader>

    </template>

<script setup>
import Sidebar from '@/components/leader/Sidebar.vue'
import axios from "axios";
import { ref } from "vue";
import Swal from 'sweetalert2'
import formatDate from "@/helpers/formatDate";
import ThousandFormat from "@/helpers/formatThousand";
import Loader from '@/components/Loader.vue';
import html2pdf from "html2pdf.js";
import router from '@/router';




const data = ref([])
const is_loading = ref(null)
// const fillter = ref({
//     search: '',
//     dateStart: getDefaultFirstDate(),
//     dateEnd: getDefaultLasttDate()
// })
const id = ref(router.currentRoute.value.params.id)



const getAngsuran = async () => {
    is_loading.value = true

    await axios.get("http://127.0.0.1:8000/api/detail-pinjaman/" + id.value, {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
    }
    ).then((res) => {
        setTimeout(() => {
            data.value = res.data.data
            is_loading.value = false

        }, 1500);
    }).catch((err) => {


        if (err.response.data.message == "Unauthenticated.") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your token is expired! Please login again.",
            });

            router.push("/login")
        }
    })
}
getAngsuran()

</script>


<style></style>