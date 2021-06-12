const API_KEY = '2f8d6050c74d5f454a522d74a8cedbb8';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class fetchApiFilms {
  constructor() {
    this.searchQuery = ''; //Ключевое слово для поиска фильма
    this.page = 1; //Текущая страница запроса на пагинаторе
    this.maxPage = 1; // Shu
  }

  fetchPopularMoviesMaxPage() {
    return fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`).then(response =>
      response.json(),
    );
  } // Shu

  // fetchPopularMovies() {
  //   const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`;
  //   return fetch(url)
  //     .then(response => response.json())
  //     .then(({ results }) => {
  //       return results;
  //     });
  // }
// =======================from pagination================
fetchPopularMovies() {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`;
  return fetch(url)
    .then(response => response.json())
    .then(({ results }) => {
      const movieWithGenre = results.map(result => {
        let genresNames = [];
        this.fetchFilmGenre().then(genres => {
          genres.forEach(genre => {
            if (result.genre_ids.includes(genre.id)) {
              genresNames.push(genre.name);
              // console.log(genresNames);
            }
          });
        });

        return {
          ...result,
          release_date: result.release_date.split('-')[0],
          genre_ids: genresNames,
        };
      });
      return movieWithGenre;
      // console.log(movieWithGenre);
    });
}
// =======================new from pagin=================
  // fetchPopularMovies() {
  //   const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`;
  //   return fetch(url)
  //     .then(response => response.json())
  //     .then(({ results }) => {
  //       const movieWithGenre = results.map(result => {
  //         let genresNames = [];
  //         this.fetchFilmGenre().then(genres => {
  //           genres.forEach(genre => {
  //             if (result.genre_ids.includes(genre.id)) {
  //               genresNames.push(genre.name);
  //               // console.log(genresNames);
  //             }
  //           });
  //         });

  //         return {
  //           ...result,
  //           release_date: result.release_date.split('-')[0],
  //           genre_ids: genresNames,
  //         };
  //       });
  //       return movieWithGenre;
  //       // console.log(movieWithGenre);
  //     });
  // }

  fetchSearchMovies() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        return results;
      });
  }

  fetchFilmByID(filmId) {
    const url = `${BASE_URL}/movie/${filmId}?api_key=${API_KEY}&language=en-US`;
    return fetch(url).then(response => response.json());
  }

  fetchFilmGenre() {
    const url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(({ genres }) => {
        return genres;
      });
  }

  fetchPopularMoviesPages() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.page}`;
    return fetch(url).then(response => response.json());
  }

  fetchSearchMoviesPages() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url).then(response => response.json());
  }

  get pageNum() {
    return this.page;
  }

  set pageNum(newPage) {
    this.page = newPage;
  }

  resetPageNum() {
    return (this.page = 1);
  }
  
  get maxPageNum() {
    return this.maxPage;
  }
  
  set maxPageNum(newPageNum) {
    this.maxPage = newPageNum;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
