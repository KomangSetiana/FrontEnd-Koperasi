export default {
  beforeMount(el, binding) {
    const formatNumber = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    el.textContent = formatNumber(binding.value)
  },
  updated(el, binding) {
    const formatNumber = (number) => {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    el.textContent = formatNumber(binding.value)
  }
}
