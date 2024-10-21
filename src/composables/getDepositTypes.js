import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const getDepositTypes = () => {
  const depositTypes = ref([])
  const is_loading = ref(null)

  const loadDepositType = async () => {
    is_loading.value = true
    await axios
      .get('http://127.0.0.1:8000/api/deposit_type', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        setTimeout(() => {
          depositTypes.value = res.data.data
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
  return { loadDepositType, is_loading, depositTypes }
}

export default getDepositTypes
