import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'

const getPinjaman = () => {
  const loans = ref([])
  const is_loading = ref(null)
  const fillter = ref({
    search: ''
  })

  const loadPinjaman = async () => {
    is_loading.value = true
    await axios
      .get('http://127.0.0.1:8000/api/pinjaman', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        },
        params: fillter.value
      })
      .then((res) => {
        setTimeout(() => {
          loans.value = res.data.data
          is_loading.value = false
        }, 1000)
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
  return { loans, is_loading, fillter, loadPinjaman }
}

export default getPinjaman
