import './sass/main.scss';
import fetchImages from './js/fetch-images';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const searchEl = e.currentTarget.elements.searchQuery.value.trim();

  fetchImages(searchEl);
}
