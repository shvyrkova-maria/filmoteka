const API_KEY = '2f8d6050c74d5f454a522d74a8cedbb8';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class filmApiService {
    constructor() {
      this.searchQuery = ''; //Ключевое слово для поиска фильма
      this.page = 1; //Текущая страница запроса на пагинаторе
    }
  
    fetchPopularMovies() {
      const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`;
      return fetch(url)
        .then(response => response.json())
        .then(({ results }) => {
          return results;
        });
    }

    fetchSearchMovies() {
      const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
      return fetch(url)
        .then(response => response.json())
        .then(({ results }) => {
          return results;
        });
    }

    fetchPopularMoviesPages() {
      const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`;
      return fetch(url)
      .then(response => response.json());
    }

    fetchSearchMoviesPages() {
      const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
      return fetch(url)
      .then(response => response.json());
    }
      get pageNum() {
      return this.page;
    }
    set pageNum(newPage) {
      this.page = newPage;
    }
    get query() {
      return this.searchQuery;
    }
  
    set query(newQuery) {
      this.searchQuery = newQuery;
    }
  }
  