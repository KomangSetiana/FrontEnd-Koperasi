import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'

const sumSaldoAll = () => {
  const saldo = ref([])
  const is_loading = ref(null)

  const saldoAll = async () => {
    is_loading.value = true
    await axios
      .get('http://127.0.0.1:8000/api/sum-saldo', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        setTimeout(() => {
          saldo.value = res.data.data
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
  return { saldo, is_loading, saldoAll }
}

export default sumSaldoAll
