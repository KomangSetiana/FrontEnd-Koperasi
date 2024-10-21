import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'

const sumLaba = () => {
  const laba = ref([])
  const is_loading = ref(null)

  const labaKoperasi = async () => {
    is_loading.value = true
    await axios
      .get('http://127.0.0.1:8000/api/laba', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        setTimeout(() => {
          laba.value = res.data.data
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
  return { laba, is_loading, labaKoperasi }
}

export default sumLaba
