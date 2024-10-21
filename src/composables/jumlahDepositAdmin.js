import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'

const jumlahDepositAdmin = () => {
  const adminDeposit = ref([])
  const is_loading = ref(null)

  const adminDepositCount = async () => {
    is_loading.value = true
    await axios
      .get('http://127.0.0.1:8000/api/jumlah-deposit-admin', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        setTimeout(() => {
          adminDeposit.value = res.data.data
          is_loading.value = false
        }, 1500)
      })
      .catch((err) => {
        if (err.response.data.message == 'Unauthenticated.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your token is expired! Please login again.'
          })

          router.push('/login')
        }
      })
  }
  return { adminDeposit, is_loading, adminDepositCount }
}

export default jumlahDepositAdmin
