const formatMonthYear = (date) => {
  const d = new Date(date)
  const dtf = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long'
  })
  const [{ value: Fmount }, , { value: Fyear }] = dtf.formatToParts(d)
  return ` ${Fmount}, ${Fyear}`
}
export default formatMonthYear
