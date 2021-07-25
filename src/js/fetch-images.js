import axios from 'axios';

export default async function fetchImages(searchEl) {
  const BASE_URL = 'https://pixabay.com/api/';
  const PIXABAY_KEY = '22634549-5cdc48e9fdfcb009c2ce01724';

  const response = await axios.get(
    `${BASE_URL}?key=${PIXABAY_KEY}&q=${searchEl}&image_type=photo&orientation=horizontal&safesearch=true`,
  );

  return response.data.hits;
}
