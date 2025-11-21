// ========================= Comments
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

    nameLabel.textContent = file.name //Displaying the selected file name.
    subLabel.textContent = `${Math.round(file.size / 1024)} KB` //converting from bytes to kilobyte

    // Add click-to-preview
    card.onclick = () => {
      //Adding the ability to preview the selected file onclick by calling the openPreview function
      openPreview(file, index)
    }
  })
}

// Setup both cards, Initializing bothe card1 and 2
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
  modalTitle.textContent = `Preview: ${file.name}` //Showing the file name on the modal header
  modalBody.innerHTML = '' //Closes any previous preview content

  const fileURL = URL.createObjectURL(file) //Creates a temporary browser URL so the PDF or image can be shown inside the modal.

  if (file.type === 'application/pdf') {
    //Loads if the file is a pdf
    const iframe = document.createElement('iframe')
    iframe.src = fileURL
    modalBody.appendChild(iframe)
  } else if (file.type.startsWith('image/')) {
    //If file is an image, displays the image in the modal
    const img = document.createElement('img')
    img.src = fileURL
    img.style.maxWidth = '100%'
    img.style.objectFit = 'contain'
    modalBody.appendChild(img)
  }
}

closeModal.addEventListener('click', () => {
  //Closing the modal
  modal.classList.remove('open') //Removing the open class
})

// =========================
// Form Validation
// =========================

const form = document.getElementById('studentForm')
const messageBox = document.getElementById('formMessage')

form.addEventListener('submit', function (e) {
  e.preventDefault() //Prevents the form from refreshing so we can run validation

  //Getting and cleaning the username input values e.g unwanted spaces
  const username = document.getElementById('username').value.trim()
  const password = document.getElementById('password').value.trim()

  //Getting the files
  const file1 = document.getElementById('fileInput1').files[0]
  const file2 = document.getElementById('fileInput2').files[0]

  //Displays an error if the username and password do not match.
  if (username !== password) {
    messageBox.textContent = 'Username and password must match.'
    messageBox.className = 'error' //Adding an error class to formMessage
    return
  }

  //Ensures two files are uploaded
  if (!file1 || !file2) {
    messageBox.textContent = 'Please upload two files.'
    messageBox.className = 'error'
    return
  }
  //Displays a success message if all conditions are met
  messageBox.textContent = 'Login successful. Files ready for upload.'
  messageBox.className = 'success'
})

// =========================
// Reset Button
// =========================

document.getElementById('resetBtn').addEventListener('click', () => {
  //Resetting all form inputs.
  form.reset()

  document.getElementById('pdfName1').textContent = 'No file selected'
  document.getElementById('pdfSub1').textContent = 'Click after upload to preview'

  document.getElementById('pdfName2').textContent = 'No file selected'
  document.getElementById('pdfSub2').textContent = 'Click after upload to preview'

  messageBox.textContent = ''
})
