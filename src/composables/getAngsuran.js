import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '@/router'

const getAngsuran = () => {
  const angsuran = ref([])
  const is_loading = ref(null)
  const total = ref(0)
  const fillter = ref({
    search: '',
    dateStart: getDefaultFirstDate(),
    dateEnd: getDefaultLasttDate()
  })

  function getDefaultFirstDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0') // Add leading zero
    const day = '01' // First day of the month
    return `${year}-${month}-${day}`
  }
  function getDefaultLasttDate() {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = new Date(year, month, 0).getDate()
    return `${year}-${month}-${day}`
  }

  const loadAngsuran = async () => {
    is_loading.value = true
    total.value = 0
    axios
      .get('http://127.0.0.1:8000/api/angsuran', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        },
        params: fillter.value
      })
      .then((res) => {
        setTimeout(() => {
          angsuran.value = res.data.data
          angsuran.value.forEach((element) => {
            total.value += element.amount_payment
          })
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
  return { angsuran, is_loading, total, fillter, loadAngsuran }
}

export default getAngsuran
