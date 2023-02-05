import axios from 'axios';

const API_KEY = '31949883-7c5fe764cd95888a750d50db1';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function fetchImges(query, page) {
  return await axios.get(
    `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12
`
  );
  // .then(res =>
  //   res.data.hits.map(({ id, webformatURL, largeImageURL }) => ({
  //     id,
  //     webformatURL,
  //     largeImageURL,
  //   }))
  // );
}
