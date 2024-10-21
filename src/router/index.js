import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/LoginView.vue'
import AdminDashboard from '../views/admin/AdminDashboardView.vue'
import AdminAnggotaView from '@/views/admin/AdminAnggotaView.vue'
import AdminSimpananView from '@/views/admin/AdminSimpananView.vue'
import AdminPinjamanView from '@/views/admin/AdminPinjamanView.vue'
import AdminAngsuranView from '@/views/admin/AdminAngsuranView.vue'
import AdminLaporan from '@/views/admin/Laporan.vue'
import UserAdminView from '@/views/admin/UserAdminView.vue'
import DetailLaporanSimpanan from '@/views/admin/DetailLaporanSimpanan.vue'
import DetailLaporanAngsuran from '@/views/admin/DetailLaporanAngsuran.vue'
import ShowSimpanan from '@/views/admin/showSimpananView.vue'
import ShowSimpananWajib from '@/views/admin/showSimpananWajib.vue'
import ShowAngsuran from '@/views/admin/showAngsuran.vue'
import SimpananWajib from '@/views/admin/simpananWajibAdmin.vue'
import NotFound from '@/components/NotFound.vue'
import Simpanan from '@/views/user/simpanan.vue'
import Pinjaman from '@/views/user/pinjaman.vue'
import Angsuran from '@/views/user/angsuran.vue'
import Settings from '@/views/user/settings.vue'
import Leader from '@/views/leader/index.vue'
import Simpanans from '@/views/leader/simpanan.vue'
import Pinjamans from '@/views/leader/pinjaman.vue'
import Bunga from '@/views/leader/bungaTabungan.vue'
import ProgramSimpanan from '@/views/leader/deposit_types.vue'
import Laporans from '@/views/leader/laporan.vue'
import Angsurans from '@/views/leader/angsuran.vue'
import Anggotas from '@/views/leader/anggota.vue'
import User from '@/views/leader/users.vue'
import Korwil from '@/views/leader/korwils.vue'
import DetailLaporanSimpananLeader from '@/views/leader/DetailLaporanSimpanan.vue'
import DetailLaporanAngsuranLeader from '@/views/leader/DetailLaporanAngsuran.vue'
import ShowSimpanans from '@/views/leader/showSimpananView.vue'
import ShowSimpananWajibs from '@/views/leader/showSimpananWajib.vue'
import ShowAngsurans from '@/views/leader/showAngsuran.vue'
import SimpanansWajib from '@/views/leader/simpananWajib.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboard
    },
    {
      path: '/admin-simpanan',
      name: 'admin-simpanan',
      component: AdminSimpananView
    },
    {
      path: '/admin-pinjaman',
      name: 'admin-pinjaman',
      component: AdminPinjamanView
    },
    {
      path: '/admin-anggota',
      name: 'admin-anggota',
      component: AdminAnggotaView
    },
    {
      path: '/admin-angsuran',
      name: 'admin-angsuran',
      component: AdminAngsuranView
    },
    {
      path: '/simpanan/:id',
      name: 'show simpanan',
      component: ShowSimpanan
    },
    {
      path: '/angsuran/:id',
      name: 'show angsuran',
      component: ShowAngsuran
    },
    {
      path: '/laporan',
      name: 'laporan',
      component: AdminLaporan
    },
    {
      path: '/laporan-simpanan/:id',
      name: 'laporan-simpanan',
      component: DetailLaporanSimpanan
    },
    {
      path: '/simpanan-wajib',
      name: 'simpanan-wajib',
      component: SimpananWajib
    },
    {
      path: '/simpanan-wajib/:id',
      name: 'show simpanan wajib',
      component: ShowSimpananWajib
    },
    {
      path: '/laporan-angsuran/:id',
      name: 'laporan-angsuran',
      component: DetailLaporanAngsuran
    },
    {
      path: '/users',
      name: 'users',
      component: UserAdminView
    },
    {
      path: '/simpanan',
      name: 'simpanan',
      component: Simpanan
    },
    {
      path: '/pinjaman',
      name: 'pinjaman',
      component: Pinjaman
    },
    {
      path: '/angsuran',
      name: 'angsuran',
      component: Angsuran
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/leader',
      name: 'leader',
      component: Leader
    },
    {
      path: '/anggotas',
      name: 'anggotas',
      component: Anggotas
    },
    {
      path: '/simpanans',
      name: 'simpanans',
      component: Simpanans
    },
    {
      path: '/simpanans/:id',
      name: 'show simpanans',
      component: ShowSimpanans
    },
    {
      path: '/pinjamans',
      name: 'pinjamans',
      component: Pinjamans
    },
    {
      path: '/bunga',
      name: 'bunga',
      component: Bunga
    },
    {
      path: '/program-simpanan',
      name: 'program-simpanan',
      component: ProgramSimpanan
    },
    {
      path: '/simpanans-wajib',
      name: 'simpanans-wajib',
      component: SimpanansWajib
    },
    {
      path: '/angsurans',
      name: 'angsurans',
      component: Angsurans
    },
    {
      path: '/laporans',
      name: 'laporans',
      component: Laporans
    },
    {
      path: '/create-user',
      name: 'create-user',
      component: User
    },
    {
      path: '/korwils',
      name: 'korwils',
      component: Korwil
    },
    {
      path: '/laporan-simpanans/:id',
      name: 'laporan-simpanans',
      component: DetailLaporanSimpananLeader
    },
    {
      path: '/laporan-angsurans/:id',
      name: 'laporan-angsurans',
      component: DetailLaporanAngsuranLeader
    },
    {
      path: '/angsurans/:id',
      name: 'show angsurans',
      component: ShowAngsurans
    },
    {
      path: '/simpanans-wajib/:id',
      name: 'show simpanans wajib',
      component: ShowSimpananWajibs
    },
    {
      path: '/:catchAll(.*)',
      name: 'notfound',
      component: NotFound
    }
  ]
})

export default router
