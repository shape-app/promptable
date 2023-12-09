export const exportCSV = (data: string[]) => {
  const csvBlob = new Blob(data, { type: 'text/csv' })
  const hrefLink = document.createElement('a')
  hrefLink.href = window.URL.createObjectURL(csvBlob)
  hrefLink.download = 'data.csv'
  document.body.appendChild(hrefLink)
  hrefLink.click()
  document.body.removeChild(hrefLink)
}
