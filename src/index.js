import './sass/main.scss';
import fetchImages from './js/fetch-images';
import { Notify } from 'notiflix';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const searchEl = e.currentTarget.elements.searchQuery.value.trim();

  fetchImages(searchEl)
    .then(result => {
      if (result.data.hits.length === 0) {
        noMatch();
      }
      console.log(result.data.hits);
    })
    .catch(error => console.log(error));
}

function noMatch() {
  Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}
