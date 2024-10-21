import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'

const sumSaldoAdmin = () => {
  const saldo = ref([])

  const sumSaldo = async () => {
    await axios
      .get('http://127.0.0.1:8000/api/sum-saldo-admin', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        saldo.value = res.data.data
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
  return { saldo, sumSaldo }
}

export default sumSaldoAdmin
