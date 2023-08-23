import { fetchBreeds, fetchCatByBreed } from "./cat-api";

const selectForm = document.querySelector('.breed-select');
const catDescription = document.querySelector('.cat-info');
const loadString = document.querySelector('.loader');
const errorString = document.querySelector('.error');

function displayCatBreedInfo(data) {
  const { url, breeds } = data;
  const { name, description, temperament } = breeds[0];

  const catCardHTML = `
    <img src="${url}" alt="${name}" width="600" height="400"/>
    <div>
      <h2>${name}</h2>
      <p>${description}</p>
      <p>Temperament: ${temperament}</p>
    </div>
  `;
  catDescription.innerHTML = catCardHTML;

  loadString.setAttribute('hidden', 'hidden');
  catDescription.removeAttribute('hidden', 'hidden');
}
function onError() {
  errorString.removeAttribute('hidden','hidden');
  loadString.setAttribute('hidden', 'hidden');
  catDescription.setAttribute('hidden', 'hidden');
  selectForm.setAttribute('hidden', 'hidden');
}
function hiddenCatDescription() {
  catDescription.innerHTML = '';
  catDescription.setAttribute('hidden', 'hidden');
}
if (selectForm) {
  loadString.removeAttribute('hidden');
  errorString.setAttribute('hidden', 'hidden');
  selectForm.setAttribute('hidden', 'hidden');
  fetchBreeds()
    .then(breeds => {
      const interfaceOptions = breeds
        .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
        .join('');
      selectForm.innerHTML = interfaceOptions;

      selectForm.removeAttribute('hidden', 'hidden');
      loadString.setAttribute('hidden', 'hidden');

      selectForm.addEventListener('change', evt => {
        const breedId = evt.target.value;
        loadString.removeAttribute('hidden','hidden');
        errorString.setAttribute('hidden', 'hidden');

        hiddenCatDescription()

        fetchCatByBreed(breedId)
          .then(catData => {
            displayCatBreedInfo(catData);
            loadString.setAttribute('hidden', 'hidden');
            catDescription.removeAttribute('hidden', 'hidden');
          })
          .catch(error => {
            onError();
          });
      });
    })
    .catch(error => {
      onError();
    });
}