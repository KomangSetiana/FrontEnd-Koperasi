import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'

const getKorwils = () => {
  const korwils = ref([])
  const is_loading = ref(null)

  const loadKorwil = async () => {
    is_loading.value = true
    await axios
      .get('http://127.0.0.1:8000/api/korwil', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        setTimeout(() => {
          korwils.value = res.data.data
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
  return { korwils, is_loading, loadKorwil }
}

export default getKorwils
