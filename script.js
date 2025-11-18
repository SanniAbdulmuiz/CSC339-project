// =========================
// File Input Handling
// =========================

function setupFileCard(index) {
  const input = document.getElementById(`fileInput${index}`)
  const nameLabel = document.getElementById(`pdfName${index}`)
  const subLabel = document.getElementById(`pdfSub${index}`)
  const card = document.getElementById(`pdfCard${index}`)

  input.addEventListener('change', function () {
    const file = this.files[0]
    if (!file) return

    nameLabel.textContent = file.name
    subLabel.textContent = `${Math.round(file.size / 1024)} KB`

    // Add click-to-preview
    card.onclick = () => {
      openPreview(file, index)
    }
  })
}

// Setup both cards
setupFileCard(1)
setupFileCard(2)

// =========================
// Modal Preview
// =========================

const modal = document.getElementById('pdfModal')
const modalTitle = document.getElementById('modalTitle')
const modalBody = document.getElementById('modalBody')
const closeModal = document.getElementById('closeModal')

function openPreview(file, index) {
  modal.classList.add('open')
  modalTitle.textContent = `Preview: ${file.name}`
  modalBody.innerHTML = ''

  const fileURL = URL.createObjectURL(file)

  if (file.type === 'application/pdf') {
    const iframe = document.createElement('iframe')
    iframe.src = fileURL
    modalBody.appendChild(iframe)
  } else if (file.type.startsWith('image/')) {
    const img = document.createElement('img')
    img.src = fileURL
    img.style.maxWidth = '100%'
    img.style.objectFit = 'contain'
    modalBody.appendChild(img)
  }
}

closeModal.addEventListener('click', () => {
  modal.classList.remove('open')
})

// =========================
// Form Validation
// =========================

const form = document.getElementById('studentForm')
const messageBox = document.getElementById('formMessage')

form.addEventListener('submit', function (e) {
  e.preventDefault()

  const username = document.getElementById('username').value.trim()
  const password = document.getElementById('password').value.trim()

  const file1 = document.getElementById('fileInput1').files[0]
  const file2 = document.getElementById('fileInput2').files[0]

  if (username !== password) {
    messageBox.textContent = 'Username and password must match.'
    messageBox.className = 'error'
    return
  }

  if (!file1 || !file2) {
    messageBox.textContent = 'Please upload two files.'
    messageBox.className = 'error'
    return
  }

  messageBox.textContent = 'Login successful. Files ready for upload.'
  messageBox.className = 'success'
})

// =========================
// Reset Button
// =========================

document.getElementById('resetBtn').addEventListener('click', () => {
  form.reset()

  document.getElementById('pdfName1').textContent = 'No file selected'
  document.getElementById('pdfSub1').textContent = 'Click after upload to preview'

  document.getElementById('pdfName2').textContent = 'No file selected'
  document.getElementById('pdfSub2').textContent = 'Click after upload to preview'

  messageBox.textContent = ''
})
