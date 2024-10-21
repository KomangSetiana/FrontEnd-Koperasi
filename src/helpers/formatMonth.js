const formatMonth = (date) => {
  const d = new Date(date)
  const dtf = new Intl.DateTimeFormat('id-ID', {
    month: 'long'
  })
  const [{ value: Fmount }] = dtf.formatToParts(d)
  return `${Fmount}`
}
export default formatMonth
