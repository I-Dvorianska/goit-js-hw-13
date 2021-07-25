import './sass/main.scss';
import { Notify } from 'notiflix';
import imageCard from './templates/image-card.hbs';
import ImagesApiService from './js/images-service';
import throttle from 'lodash.throttle';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();

searchForm.addEventListener('submit', throttle(onSearch, 500));
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  addClass();
  imagesApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (imagesApiService.searchQuery === '') {
    noMatch();
    clearMarkup();
    return;
  }

  imagesApiService.resetPage();
  clearMarkup();
  onLoad();
  removeClass();
}

function onLoadMore() {
  onLoad();
}

async function onLoad() {
  try {
    const response = await imagesApiService.fetchImages();
    const markup = cardsMarkup(response);
    imagesApiService.page += 1;
    return markup;
  } catch (error) {
    console.log(error);
  }
}

function cardsMarkup(image) {
  console.log(image);
  if (image.length === 0) {
    noMatch();
  }
  const markup = imageCard(image);
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  gallery.innerHTML = '';
}

function noMatch() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function removeClass() {
  loadMoreBtn.classList.remove('is-hidden');
}

function addClass() {
  loadMoreBtn.classList.add('is-hidden');
}
