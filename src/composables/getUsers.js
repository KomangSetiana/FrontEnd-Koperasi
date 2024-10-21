import { ref } from 'vue'
import axios from 'axios'
import router from '@/router'
import Swal from 'sweetalert2'

const getUsers = () => {
  const users = ref([])
  const is_loading = ref(null)

  const loadUser = async () => {
    is_loading.value = true
    await axios
      .get('http://127.0.0.1:8000/api/users', {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      })
      .then((res) => {
        setTimeout(() => {})
        users.value = res.data.data
        is_loading.value = false
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
  return { users, is_loading, loadUser }
}

export default getUsers
