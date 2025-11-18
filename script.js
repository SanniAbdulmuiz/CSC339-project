const fileInput1 = document.getElementById('fileInput1')
const fileInput2 = document.getElementById('fileInput2')

const pdfCard1 = document.getElementById('pdfCard1')
const pdfCard2 = document.getElementById('pdfCard2')

const pdfName1 = document.getElementById('pdfName1')
const pdfName2 = document.getElementById('pdfName2')

const pdfSub1 = document.getElementById('pdfSub1')
const pdfSub2 = document.getElementById('pdfSub2')

const objUrls = { 1: null, 2: null }

// handle file selection
function handleFileSelect(input, index) {
  const file = input.files[0]
  if (!file) return

  if (file.type !== 'application/pdf') {
    alert('Please upload only PDF files.')
    input.value = ''
    return
  }

  if (objUrls[index]) URL.revokeObjectURL(objUrls[index])

  const url = URL.createObjectURL(file)
  objUrls[index] = url

  const nameEl = index === 1 ? pdfName1 : pdfName2
  const subEl = index === 1 ? pdfSub1 : pdfSub2
  const card = index === 1 ? pdfCard1 : pdfCard2

  nameEl.textContent = file.name
  subEl.textContent = Math.round(file.size / 1024) + ' KB — Click to preview'
  card.dataset.url = url
}

fileInput1.addEventListener('change', () => handleFileSelect(fileInput1, 1))
fileInput2.addEventListener('change', () => handleFileSelect(fileInput2, 2))

// open preview modal
function previewPDF(index) {
  const card = index === 1 ? pdfCard1 : pdfCard2
  const url = card.dataset.url
  if (!url) return

  const modal = document.getElementById('pdfModal')
  const modalTitle = document.getElementById('modalTitle')
  const modalBody = document.getElementById('modalBody')

  modalBody.innerHTML = ''
  const iframe = document.createElement('iframe')
  iframe.src = url

  modalTitle.textContent = index === 1 ? pdfName1.textContent : pdfName2.textContent
  modalBody.appendChild(iframe)

  modal.classList.add('open')
}

pdfCard1.addEventListener('click', () => {
  if (fileInput1.files.length > 0) previewPDF(1)
  else fileInput1.click()
})
pdfCard2.addEventListener('click', () => {
  if (fileInput2.files.length > 0) previewPDF(2)
  else fileInput2.click()
})

// close modal
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('pdfModal').classList.remove('open')
  document.getElementById('modalBody').innerHTML = ''
})

document.getElementById('pdfModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    document.getElementById('pdfModal').classList.remove('open')
    document.getElementById('modalBody').innerHTML = ''
  }
})

// form validation
document.getElementById('studentForm').addEventListener('submit', (e) => {
  e.preventDefault()

  const msg = document.getElementById('formMessage')
  msg.className = ''
  msg.textContent = ''

  const username = document.getElementById('username').value.trim()
  const password = document.getElementById('password').value.trim()

  if (!username || !password) {
    msg.textContent = 'Please fill all required fields.'
    msg.classList.add('error')
    return
  }

  if (username !== password) {
    msg.textContent = 'Username and password must match exactly.'
    msg.classList.add('error')
    return
  }

  if (!fileInput1.files.length || !fileInput2.files.length) {
    msg.textContent = 'Please upload two PDF files.'
    msg.classList.add('error')
    return
  }

  msg.textContent = 'Success — form validated!'
  msg.classList.add('success')
})

// reset
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('studentForm').reset()

  pdfName1.textContent = 'No file selected'
  pdfSub1.textContent = 'Click after upload to preview'

  pdfName2.textContent = 'No file selected'
  pdfSub2.textContent = 'Click after upload to preview'

  pdfCard1.removeAttribute('data-url')
  pdfCard2.removeAttribute('data-url')

  URL.revokeObjectURL(objUrls[1])
  URL.revokeObjectURL(objUrls[2])
})
