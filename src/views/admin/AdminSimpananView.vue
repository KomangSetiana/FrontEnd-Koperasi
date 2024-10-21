<template>
    <div class="flex">
        <Sidebar />
        <div class="p-8 h-screen overflow-y-auto flex-1">
            <div class="flex p-3 justify-between">
                <div>
                    <h1 class="text-2xl font-semibold p-1">
                        <fa :icon="['fas', 'user-plus']" style="color: green; " @click="toggleModalPlus()"
                            class="p-1 cursor-pointer border rounded-md hover:bg-green-500" /> SIMPANAN
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
                        class=" text-white bg-green-600 hover:bg-green-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center">fillter</Button>
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
                        <h1>Laporan Simpanan <br /> Tanggal {{ formatDate(fillter.dateStart) }} sampai {{
                            formatDate(fillter.dateEnd)
                            }} <br />
                            Koperasi Dana Sawitra Sujati
                        </h1>
                    </div>
                    <table class="w-full">
                        <thead class="border border-gray-200">
                            <tr>
                                <th class="p-2 text-sm font-semibold  text-left w-24">No.</th>
                                <th class="p-2 text-sm font-semibold  text-left">Nama</th>
                                <th class="p-2 text-sm font-semibold  text-left w-24">Tanggal</th>
                                <th class="p-2 text-sm font-semibold  text-left w-24">Debet</th>
                                <th class="p-2 text-sm font-semibold  text-left w-24">Kredit</th>
                                <th class="p-2 text-sm font-semibold  text-left w-24">Saldo</th>
                                <th class="p-2 text-sm font-semibold  text-left w-24">Simpanan</th>
                                <th class="p-2 text-sm font-semibold  text-left w-24" v-show="print">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            <tr v-for="(item, index) in data" :key="index" class="hover:bg-slate-300"
                                :class="[index % 2 == 0 ? 'bg-slate-300' : 'bg-white']">
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ index + 1 }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.members.name }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ formatDate(item.date) }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.debet == null ? null :
                                    ThousandFormat(item.debet) }}
                                </td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ item.kredit == null ? null
                                    : ThousandFormat(item.kredit) }}
                                </td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{ ThousandFormat(item.saldo) }}
                                </td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap">{{
                                    item.deposit_types.deposit_name }}</td>
                                <td class="p-1 text-sm text-gray-700 whitespace-nowrap" v-show="print">
                                    <!-- 
                                <fa :icon="['fas', 'pencil']" style="color:dodgerblue;"
                                    class="cursor-pointer border border-gray-300 p-1 mx-1 hover:bg-blue-400"
                                    @click="toggleModalUpdate(form = item)" /> -->

                                    <router-link :to="{ name: 'show simpanan', params: { id: item.member_id } }">
                                        <fa :icon="['fas', 'circle-info']" style="color: orange;"
                                            class=" cursor-pointer border border-gray-300 p-1 mx-1 hover:bg-yellow-400"
                                            @click="showDeposit(item.member_id)" />
                                    </router-link>
                                    <fa :icon="['fas', 'trash-can']" style="color: red; "
                                        class="cursor-pointer border border-gray-300 p-1 mx-1 hover:bg-red-400"
                                        @click="deleteDeposit(item.id)" />
                                </td>
                            </tr>

                            <!-- <tr>
                                <td class="p-1 text-md text-gray-900 whitespace-nowrap">Total Tabungan :{{
                                    ThousandFormat(debet) }}</td>

                                <td class="p-1 text-md text-gray-900 whitespace-nowrap">Total Penarikan :{{
                                    ThousandFormat(kredit) }}</td>
                                <td class="p-1 text-md text-gray-900 whitespace-nowrap">Total Transaksi :{{
                                    ThousandFormat(debet + kredit) }}</td>
                            </tr> -->
                        </tbody>
                    </table>
                    <div class="mt-4">
                        <span class="p-2 text-md text-gray-900 whitespace-nowrap"> Total Simpanan Rp. {{
                            ThousandFormat(debet) }}</span>
                        <span class="p-2 text-md text-gray-900 whitespace-nowrap"> Total Penarikan Rp. {{
                            ThousandFormat(kredit) }}</span>
                        <span class="p-2 text-md text-gray-900 whitespace-nowrap"> Total Transkasi Rp. {{
                            ThousandFormat(debet - kredit) }}</span>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 gap-4 md:hidden">
                <div v-for="(depo, index) in data" :key="index" class="bg-white shadow p-2 rounded-lg">
                    <div class="flex space-x-2 items-center text-sm">
                        <div>{{ index + 1 }}</div>
                        <div>{{ depo.members.name }}</div>
                        <div class="text-gray-500">{{ depo.date }}</div>
                        <div class="text-green-800" :class="[depo.debet == null && 'hidden']">Masuk: Rp.{{
                            depo.debet }}
                        </div>
                        <div class="text-red-800" :class="[depo.kredit == null && 'hidden']">Keluar: Rp. {{
                            depo.kredit
                            }}
                        </div>
                    </div>
                    <div>Saldo: Rp. {{ depo.saldo }}</div>
                </div>
            </div>
            <!-- <div class="p-3 hidden  ">
                <pagination v-if="data.length > 0" :total_items="total_items" :per_page="per_page"
                    :currentPage="currentPage" @onClickHandler="onClickHandler">
                </pagination>
            </div> -->
        </div>


        <!-- <template>
            <AnggotaSkeleton />
        </template> -->


        <!-- loader -->
        <loader v-if="is_loading">
        </loader>

    </div>
    <!-- MODAL -->

    <Modal :modalActive="modalActive" @close-modal="toggleModal()">
        <div class="bg-white shadow-md p-4 overscroll-contain">
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-if="modalCreate">Tambah Simpanan</h1>
            <h1 class="font-semibold text-xl border-b border-gray-300 pb-2" v-if="modalUpdate">Update Simpanan</h1>

            <form @submit.prevent="statusModal ? createDeposit() : updateDeposit()">
                <div class="grid gap-6 mb-6 md:grid-cols-2">

                    <div>
                        <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih
                            Nama</label>
                        <select id="nama" v-model="form.member_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Pilih nama</option>
                            <option v-for="member in members" :key=member.id :value="member.id">{{ member.name }}
                            </option>


                        </select>
                    </div>
                    <div>
                        <label for="date"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal</label>
                        <input type="date" id="date" v-model="form.date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nama" required />
                    </div>

                    <div>
                        <label for="debet" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tabungan
                            Masuk</label>
                        <InputNumber type="number" id="debet" v-model="form.debet" inputId="integeronly" fluid
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tabungan masuk" />


                    </div>
                    <div>
                        <label for="kredit"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penarikan</label>
                        <InputNumber type="number" id="kredit" v-model="form.kredit" fluid
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Penarikan" />
                    </div>

                    <div>
                        <label for="korwil" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih
                            Jenis Tabungan</label>
                        <select id="korwil" v-model="form.deposit_type_id"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Pilih Tabungan</option>
                            <option v-for="depoType in depositTypes" :key="depoType.id" :value="depoType.id">
                                {{ depoType.deposit_name }}
                            </option>

                        </select>
                    </div>
                </div>

                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Simpan</button>
            </form>

        </div>
    </Modal>


</template>


<script setup>
import { computed, ref } from 'vue';
import Sidebar from '../../components/admin/Sidebar.vue';
import axios from 'axios';
import Modal from '@/components/Modal.vue';
import getMembers from '@/composables/getMembers';
import getDepositTypes from '@/composables/getDepositTypes';
import NotFound from '@/components/NotFound.vue'
import Swal from 'sweetalert2'
import router from '@/router';
import ThousandFormat from '@/helpers/formatThousand';
import formatDate from '@/helpers/formatDate';
import html2pdf from "html2pdf.js";
import pagination from '@/components/Pagination.vue'
import loader from '@/components/Loader.vue'
import InputNumber from 'primevue/inputnumber';


const data = ref([])

const statusModal = ref(false)
const modalActive = ref(false)
const modalUpdate = ref(null)
const modalCreate = ref(null)
const error = ref(null)
const print = ref(true)
let currentPage = 1

const is_loading = ref(null)

// const per_page = ref(0)
// const total_items = ref(0)
const kredit = ref(0)
const debet = ref(0)
const currentDate = new Date().toDateString();
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
const fillter = {
    dateStart: getDefaultFirstDate(),
    dateEnd: getDefaultLasttDate(),
    search: '',
    current_page: currentPage
}

const form = ref({
    id: '',
    member_id: '',
    members: {
        id: ''
    },
    date: '',
    debet: '',
    kredit: '',
    deposit_type_id: '',
    depositTypes: {
        id: ''
    }

})



const onClickHandler = (page) => {
    if (page) {
        currentPage = page
        fillter.current_page = page
        getDeposit()
    }
}
function getDefaultFirstDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero
    const day = '01'; // First day of the month
    return `${year}-${month}-${day}`;
}
function getDefaultLasttDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = new Date(year, month, 0).getDate()
    return `${year}-${month}-${day}`;
}
const getDeposit = () => {
    is_loading.value = true
    debet.value = 0
    kredit.value = 0
    axios.get("http://127.0.0.1:8000/api/deposit", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        params: fillter

    }).then((res) => {
        setTimeout(() => {
            // per_page.value = res.data.per_page
            // total_items.value = res.data.total
            data.value = res.data
            // console.log(res.data)
            data.value.forEach(element => {
                debet.value += element.debet
                kredit.value += element.kredit

            });
            is_loading.value = false
        }, 1500)
    }).catch((err) => {
        is_loading = false
        console.log(
            err.response.data.message
        )
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

const login = async () => {
    await axios.post("http://127.0.0.1:8000/api/login", {
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },
        member_id: form.value.member_id,
        date: form.value.date,
        debet: form.value.debet,
        kredit: form.value.kredit,
        deposit_type_id: form.value.deposit_type_id,
    }).then((res) => {
        getDeposit()
        modalActive.value = !modalActive.value
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        })

    }).catch((err) => {
        if (err.response.data.error == "Unauthorized") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Email/Password.",
            });
        }
    })



}


const createDeposit = async () => {

    await axios.post("http://127.0.0.1:8000/api/deposit", {
        member_id: form.value.member_id,
        date: form.value.date,
        debet: form.value.debet,
        kredit: form.value.kredit,
        deposit_type_id: form.value.deposit_type_id,
        headers: {
            Authorization: 'Bearer' + localStorage.getItem('token')
        },


    }).then((res) => {
        getDeposit()
        modalActive.value = !modalActive.value
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        })
    }).catch((err) => {
        console.log(err)
        if (err.response.data.error == "Wrong Transaksi") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Tidak Bisa Melakukan Simpanan dan Penarikan Bersamaan.",
            });

        }
        if (err.response.data.error == "Saldo Kurang") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Saldo Tidak Cukup.",
            });

        }


    });


}
const updateDeposit = async () => {
    await axios.put("http://127.0.0.1:8000/api/deposit/" + form.value.id, {

        member_id: form.value.member_id,
        date: form.value.date,
        debet: form.value.debet,
        kredit: form.value.kredit,
        deposit_type_id: form.value.deposit_type_id
    }).then(() => {
        getDeposit()
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
const deleteDeposit = (id) => {

    Swal.fire({
        title: "Anda Yakin Menghapus Data ini?",
        text: "Data tidak akan bisa dikembalikan lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Hapus!"
    }).then((result) => {
        if (result.isConfirmed) {

            axios.delete("http://127.0.0.1:8000/api/deposit/" + id).then(() => {
                getDeposit()
                Swal.fire({
                    title: "Terhapus!",
                    text: "Data telah terhapus.",
                    icon: "success"
                });
            })
        }
    });
}

const reportData = () => {

    Swal.fire({
        title: "Anda Sudah Yakin Melaporakan Transkasi bulan ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya Yakin!"
    }).then((result) => {
        if (result.isConfirmed) {

            axios.post("http://127.0.0.1:8000/api/send-report", {
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
                    text: "Data terlah dilaporakan pada pimpinan",
                    icon: "success"
                });
            })
        }
    });
}
const handleFillter = () => {
    getDeposit()
}

const handleExport = () => {
    print.value = !print.value
    is_loading.value = true
    html2pdf(document.getElementById('download-document'))
    setTimeout(() => {
        print.value = !print.value
        is_loading.value = false

    }, 1000);
}

const toggleModal = () => {
    modalCreate.value = false
    modalUpdate.value = false
    modalActive.value = !modalActive.value
}
const toggleModalPlus = () => {
    form.value = {
    }
    form.value.date = formatDatee()
    statusModal.value = true
    modalCreate.value = true
    modalActive.value = !modalActive.value
    // console.log(statusModal.value)

}
const toggleModalUpdate = (p) => {
    statusModal.value = false
    modalUpdate.value = true
    modalActive.value = !modalActive.value
    form.value.member_id = p.members.id
    form.value.deposit_type_id = p.deposit_types.id
}


const { members, loadMember } = getMembers()
loadMember()
const { depositTypes, loadDepositType } = getDepositTypes()
loadDepositType()
getDeposit()


const firstName = ref('John')
const lastName = ref('Doe')


</script>
