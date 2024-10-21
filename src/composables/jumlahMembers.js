import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'

const jumlahMembers = () => {
  const memberCount = ref([])

  const countMembers = async () => {
    await axios
      .get('http://127.0.0.1:8000/api/jumlah-member', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        memberCount.value = res.data.data
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
  return { memberCount, countMembers }
}

export default jumlahMembers
