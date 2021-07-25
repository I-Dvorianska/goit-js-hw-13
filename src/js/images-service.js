import axios from 'axios';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    console.log(this);
    const BASE_URL = 'https://pixabay.com/api/';
    const PIXABAY_KEY = '22634549-5cdc48e9fdfcb009c2ce01724';

    const response = await axios.get(
      `${BASE_URL}?key=${PIXABAY_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`,
    );

    return response.data.hits;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}
