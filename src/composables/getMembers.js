import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const getMembers = () => {
  const members = ref([])
  const is_loading = ref(null)
  let currentPage = 1

  const fillter = {
    search: '',
    current_page: currentPage
  }

  const loadMember = async () => {
    is_loading.value = true
    await axios
      .get('http://127.0.0.1:8000/api/member', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        },
        params: fillter
      })
      .then((res) => {
        setTimeout(() => {
          members.value = res.data.data
          is_loading.value = false
        })
      }, 1500)
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
  return { members, fillter, is_loading, loadMember }
}

export default getMembers
