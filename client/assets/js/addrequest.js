const submitButton = document.querySelector('#request-btn button');
const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');
const categoryInput = document.getElementById('category-input');
const messageText = document.querySelector('#messageText');
const userWelcomeText = document.querySelector('#userWelcomeText');
const fileUpload = document.getElementById('file-upload');
const requestImage = document.getElementById('image');
const navLinks = document.querySelectorAll('ul a');
const counterTexts = document.querySelectorAll('.counter');
const baseUrl = window.location.origin;
let isEditRequest = false;
let imagePath = '';

const redirect = () => {
  document.body.innerHTML = 'You are not logged in....';
  window.location.href = '/Users/signin.html';
}
navLinks[2].addEventListener('click', (event) => {
  localStorage.clear();
});
titleInput.addEventListener('keypress', () => {
  messageText.textContent = '';
});
descriptionInput.addEventListener('keypress', () => {
  messageText.textContent = '';
});
titleInput.addEventListener('input', () => {
  if (titleInput.value.length < 21) {
    counterTexts[0].textContent = `${titleInput.value.length}/20 max characters`;
  } else counterTexts[0].textContent = 'Max characters exceeded';
});
descriptionInput.addEventListener('input', () => {
  if (descriptionInput.value.length < 251) {
    counterTexts[1].textContent = `${descriptionInput.value.length}/250 max characters`;
  } else counterTexts[1].textContent = 'Max characters exceeded';
});
fileUpload.addEventListener('change', (event) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('request', fileUpload.files[0]);
  fetch(`${baseUrl}/api/v1/upload`, {
    method: 'POST',
    body: formData,
    headers: { 'x-access-token': localStorage.getItem('token') }
  })
    .then((response) => { return response.json(); })
    .then((response) => {
      if (response.message === 'File uploaded!') {
        requestImage.src = 'assets/image/request.jpg';
        imagePath = 'client/assets/image/request.jpg';
      }
      else {
        messageText.textContent = response.message;
      }
    });
});
window.addEventListener('load', (event) => {

  if (!localStorage.getItem('token')) {
    redirect();
    return;
  }
  userWelcomeText.innerHTML += ` ${localStorage.getItem('userName')}`;
  if (localStorage.getItem('editRequest') === 'started') {
    isEditRequest = true;
    const request = {
      title: localStorage.getItem('requestBufferTitle'),
      description: localStorage.getItem('requestBufferDescription'),
      category: localStorage.getItem('requestBufferCategory'),
      image: localStorage.getItem('requestBufferImage')
    }
    titleInput.value = request.title;
    descriptionInput.value = request.description;
    categoryInput.value = request.category;
    requestImage.src = request.image;
    localStorage.setItem('editRequest', 'ended');
  }
});
submitButton.addEventListener('click', (event) => {
  messageText.textContent = 'Please wait....';
  messageText.style.color = 'green';
  const inputData = {
    title: titleInput.value,
    description: descriptionInput.value,
    category: categoryInput.value || 'general',
    image: imagePath
  };
  let url = `${baseUrl}/api/v1/users/requests`;
  let httpMethod = 'POST';
  if (isEditRequest) {
    url = `${baseUrl}/api/v1/users/requests/${localStorage.getItem('requestId')}`;
    httpMethod = 'PUT';
  }
  event.preventDefault();
  fetch(url, {
    method: httpMethod,
    headers: { 'content-type': 'application/json', 'x-access-token': localStorage.getItem('token') },
    body: JSON.stringify(inputData)
  })
    .then((response) => { return response.json(); })
    .then((response) => {
      messageText.textContent = response.message;
      if (response.message === 'Request Added Successfully') {
        window.location.href = '/Requests/list.html';
      } else if (response.message === 'Request Updated Successfully') {
        window.location.href = '/Requests/detail.html';
      }
      else if (response.message === 'Authentication failed') {
        redirect();
      }
      else if (response.message === 'Image failed to upload') {
        messageText.textContent = response.message;
        requestImage.src = '/assets/image/repair2.png';
        imagePath = '';
      }
      else messageText.style.color = 'red';
      isEditRequest = false;
    });
});