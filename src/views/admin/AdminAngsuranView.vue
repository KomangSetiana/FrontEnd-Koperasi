<template>
    <div class="flex">
        <Sidebar />
        <div class="p-8 h-screen overflow-y-auto flex-1">

            <div class="flex p-3 justify-between">
                <div>
                    <h1 class="text-2xl font-semibold p-1">
                        <fa :icon="['fas', 'user-plus']" style="color: green; " @click="toggleModalPlus()"
                            class="p-1 cursor-pointer border rounded-md hover:bg-green-500" /> ANGSURAN
                    </h1>
                </div>
                <div>

                    <button @click="reportData()"
                        class="mx-2 text-green-900 bg-white hover:bg-green-400 font-medium rounded-lg text-sm border bg-green-600 sm:w-auto px-5 py-2.5 text-center">
                        Laporan</button>
                    <fa :icon="['fas', 'download']" @click="handleExport()"
                        class="cursor-pointer text-green-900 right-0" />

                </div>
            </div>
            <div class="flex pb-4 justify-between">
                <div>
                    <span>From :</span> <input type="date" v-model="fillter.dateStart"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1.5 mr-2">
                    <span>To :</span> <input type="date" v-model="fillter.dateEnd"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1.5 mr-2">
                    <Button @click="handleFillter()"
                        class="text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">fillter</Button>
                </div>
                <div>
                    <input type="text" v-model="fillter.search" placeholder="cari..."
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-32 p-1.5 mx-4">
                    <Button @click="handleFillter()"
                        class="text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">Cari</Button>
                </div>
            </div>

            <div class=" rounded-lg shadow hidden md:block">
                <div :class="[!print && 'px-16 py-10']" id="download-document">
                    <div class="text-center pb-4 text-xl font-semibold" v-show="!print">
                        <h1>Laporan Angsuran Pinjaman <br /> Tanggal {{ formatDate(fillter.dateStart) }} sampai {{
                            formatDate(fillter.dateEnd)
                        }} <br />
                            Koperasi Dana Sawitra Sujati
                        </h1>
                    </div>
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
                                <th class="p-2 text-sm font-semibold tracking-wide text-left w-24" v-show="print">Action
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="(item, index) in angsuran" :key="index" class="hover:bg-slate-300"
                                :class="[index % 2 == 0 ? 'bg-gray-50' : 'bg-white']">
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.loans.members.name }}
                                </td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{
                                    ThousandFormat(item.loans.loan_amount) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.date) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{
                                    ThousandFormat(item.amount_payment) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{
                                    ThousandFormat(item.principal_loan) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{
                                    ThousandFormat(item.bunga_pinjaman) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">{{ item.mulct == null ? null :
                                    ThousandFormat(item.mulct) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap">
                                    {{ ThousandFormat(item.remaining_debt) }}</td>
                                <td class="p-2 text-sm text-gray-700 whitespace-nowrap" v-show="print">

                                    <!-- <fa :icon="['fas', 'pencil']" style="color:dodgerblue;"
                                    class="cursor-pointer border border-gray-300 p-2 mx-1 hover:bg-blue-400"
                                    @click="toggleModalUpdate(form = item)" /> -->
                                    <router-link :to="{ name: 'show angsuran', params: { id: item.loans.id } }">
                                        <fa :icon="['fas', 'circle-info']" style="color: orange;"
                                            class=" cursor-pointer border border-gray-300 p-1 mx-1 hover:bg-yellow-400"
                                            @click="showDeposit(item.member_id)" />
                                    </router-link>
                                    <fa :icon="['fas', 'trash-can']" style="color: red; "
                                        class="cursor-pointer border border-gray-300 p-1 mx-1 hover:bg-red-400"
                                        @click="deleteAngsuran(item.id)" />

                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="mt-4">
                        <span class="p-2 text-md text-gray-900 whitespace-nowrap"> Total Angsuran Rp. {{
                            ThousandFormat(total) }}</span>
                    </div>
                </div>
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

    <!-- MODAL -->

    <Modal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="bg-white shadow-md p-4 overscroll-contain">
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-if="modalCreate">Tambah Angsuran</h1>
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-if="modalUpdate">Update Angsuran</h1>

            <form @submit.prevent="statusModal ? createAngsuran() : updateAngsuran()">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih
                            Nama</label>
                        <select id="nama" v-model="form.loan_id" required
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Pilih nama</option>
                            <option v-for="loan in loans" :key="loan.id" :value="loan.id">{{ loan.members.name }}
                            </option>
                        </select>
                    </div>

                    <div>
                        <label for="angsuran"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah
                            Angsuran</label>
                        <InputNumber type="number" id="angsuran" v-model="form.amount_payment" fluid
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Jumlah angsuran" required />
                    </div>

                    <div>
                        <label for="date"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal</label>
                        <input type="date" id="date" v-model="form.date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tanggal" required />
                    </div>
                </div>

                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
            </form>

        </div>
    </Modal>

    <Loader v-if="is_loading"></Loader>

</template>



<script setup>
import { ref } from 'vue';
import axios from 'axios'
import Sidebar from '@/components/admin/Sidebar.vue'
import Modal from '@/components/Modal.vue';
import AnggotaSkeleton from '@/components/AnggotaSkeleton.vue';
import getPinjaman from '@/composables/getPinjaman';
import getAngsuran from '@/composables/getAngsuran';
import Swal from 'sweetalert2'
import formatDate from '@/helpers/formatDate';
import ThousandFormat from '@/helpers/formatThousand';
import Loader from '@/components/Loader.vue';
import router from '@/router';
import html2pdf from "html2pdf.js";
import InputNumber from 'primevue/inputnumber';



const statusModal = ref(false)
const modalActive = ref(false)
const modalUpdate = ref(null)
const modalCreate = ref(null)
const print = ref(true)
const error = ref(null)
const form = ref({
    id: '',
    loan_id: '',
    members: {
        id: ''
    },
    date: '',
    amount_payment: '',


})

const currentDate = new Date().toDateString();


const handleFillter = () => {
    loadAngsuran()
}

const handleExport = () => {
    print.value = !print.value
    html2pdf(document.getElementById('download-document'))
    setTimeout(() => {

        print.value = !print.value
    }, 1000);

}


const createAngsuran = async () => {
    await axios.post("http://127.0.0.1:8000/api/angsuran", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        loan_id: form.value.loan_id,
        date: form.value.date,
        amount_payment: form.value.amount_payment,

    }).then(() => {
        loadAngsuran()
        modalActive.value = !modalActive.value
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    })

}
const updateAngsuran = async () => {
    await axios.put("http://127.0.0.1:8000/api/angsuran/" + form.value.id, {

        loan_id: form.value.loan_id,
        date: form.value.date,
        amount_payment: form.value.amount_payment
    }).then(() => {
        loadAngsuran()
        modalActive.value = !modalActive.value
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    })


}

const reportData = () => {

    Swal.fire({
        title: "Are you sure report this?",
        text: "I'm sure the data is correct!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, i am sure!"
    }).then((result) => {
        if (result.isConfirmed) {

            axios.post("http://127.0.0.1:8000/api/send-report-loan", {
                headers: {
                    Authorization: 'Bearer' + localStorage.getItem('token')
                },
                params: {
                    currentDate
                }
            }).then(() => {
                router.push("/laporan")
                Swal.fire({
                    title: "Reported!",
                    text: "Your data has been reported.",
                    icon: "success"
                });
            }).catch((err) => {
                console.log(err)
            })
        }
    });
}

function formatDatee() {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
const deleteAngsuran = (id) => {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            axios.delete("http://127.0.0.1:8000/api/angsuran/" + id).then(() => {
                loadAngsuran()
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            })
        }
    });
}
const toggleModal = () => {
    form.value = {}
    modalCreate.value = false
    modalActive.value = false
}
const toggleModalPlus = () => {
    form.value.date = formatDatee()
    statusModal.value = true
    modalCreate.value = true
    modalActive.value = !modalActive.value

}
const toggleModalUpdate = (p) => {
    statusModal.value = false
    modalUpdate.value = true
    modalActive.value = !modalActive.value

}

const { loans, loadPinjaman } = getPinjaman()
loadPinjaman()
const { angsuran, is_loading, fillter, total, loadAngsuran } = getAngsuran()
loadAngsuran()
</script>