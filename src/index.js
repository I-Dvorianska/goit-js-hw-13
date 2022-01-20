import './sass/main.scss';
import { Notify } from 'notiflix';
import imageCard from './templates/image-card.hbs';
import ImagesApiService from './js/images-service';
import throttle from 'lodash.throttle';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();

searchForm.addEventListener('submit', throttle(onSearch, 500));
loadMoreBtn.addEventListener('click', onLoad);

function onSearch(e) {
  e.preventDefault();
  addClass();
  imagesApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  if (imagesApiService.searchQuery === '') {
    noMatch();
    clearMarkup();
    return;
  }
  imgService();
}

async function imgService() {
  imagesApiService.resetPage();
  clearMarkup();
  const feched = await onLoad();
  const showBtn = removeClass();
}

async function onLoad() {
  try {
    const response = await imagesApiService.fetchImages();
    const markup = cardsMarkup(response);
    imagesApiService.page += 1;
    largePhoto.refresh();
    return markup;
  } catch (error) {
    return error;
  }
}

function cardsMarkup(image) {
  if (image.hits.length === 0) {
    noMatch();
  }

  const markup = imageCard(image.hits);
  gallery.insertAdjacentHTML('beforeend', markup);

  if (image.totalHits === gallery.childElementCount) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    addClass();
  }
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

let largePhoto = new SimpleLightbox('.photo-card_thumb a', {});
