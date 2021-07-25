import './sass/main.scss';
import fetchImages from './js/fetch-images';
import { Notify } from 'notiflix';
import imageCard from './templates/image-card.hbs';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const searchEl = e.currentTarget.elements.searchQuery.value.trim();

  fetchImages(searchEl)
    .then(cardsMarkup)
    .catch(error => console.log(error));
}

function noMatch() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function cardsMarkup(image) {
  console.log(image);
  if (image.length === 0) {
    noMatch();
  }
  const markup = imageCard(image);
  gallery.innerHTML = markup;
}
