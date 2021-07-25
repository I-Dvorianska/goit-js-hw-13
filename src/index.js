import './sass/main.scss';
// import fetchImages from './js/fetch-images';
import { Notify } from 'notiflix';
import imageCard from './templates/image-card.hbs';
import ImagesApiService from './js/images-service';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  imagesApiService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  onLoad();
}

function onLoadMore() {
  onLoad();
}

async function onLoad() {
  try {
    const response = await imagesApiService.fetchImages();
    return cardsMarkup(response);
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
  gallery.innerHTML = markup;
}

function noMatch() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}
