const API_KEY = '2f8d6050c74d5f454a522d74a8cedbb8';
const BASE_URL = 'https://api.themoviedb.org/3';

export default class fetchApiFilms {
  constructor() {
    this.searchQuery = ''; //Ключевое слово для поиска фильма
    this.page = 1; //Текущая страница запроса на пагинаторе
    this.maxPage = 1; // Shu
  }

  fetchPopularMoviesMaxPage() {
    return fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US`).then(r =>
      r.json(),
    );
  } // Shu

  fetchPopularMovies() {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${this.page}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        return this.fetchFilmGenre().then(genres => {
          return results.map(result => ({
            ...result,
            release_date: result.release_date // Shu
              ? result.release_date.split('-')[0]
              : result.release_date,
            genre_ids: this.filterGenres(genres, result),
          }));

          // const v;
          // console.log(v);
          // return results.map(result => ({
          //   ...result,
          //   release_date: result.release_date.split('-')[0],
          //   genre_ids: result.genre_ids.map(id =>
          //     genres
          //       .map(genre => {
          //         // console.log(genre);
          //         // if (idx >= 2) {return false}
          //         if (genre.id === id) {
          //           // console.log(genre.name, id, genre.id);
          //           return genre.name;
          //         }
          //       })
          //       .join(' '),
          //   ),
          // }));
        });
      });
  }

  filterGenres(genres, result) {
    let genreList = result.genre_ids
      .map(id =>
        genres
          .filter(genre => {
            if (genre.id === id) {
              return genre.name;
            }
          })
          .map(genre => genre.name),
      )
      .flat();
    // .filter((genreName, idx) => idx < 2);                  // Shu
    // if (genreList.length === 2) genreList.push('other');   //Shu
    if (genreList.length === 2) genreList = [`${genreList[0]}, `, genreList[1]];
    if (genreList.length > 2) genreList = [`${genreList[0]}, `, `${genreList[1]}, `, 'Other'];

    return genreList;
  }

  fetchSearchMovies() {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ results }) => {
        return this.fetchFilmGenre().then(genres => {
          return results.map(result => ({
            ...result,
            release_date: result.release_date // Shu
              ? result.release_date.split('-')[0]
              : result.release_date,
            genre_ids: this.filterGenres(genres, result),
          }));
        });
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
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${this.page}`;
    return fetch(url).then(response => response.json());
  }

  fetchSearchMoviesPages() {
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
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
  // ------------- 4 paginat. Shu-----------
  get maxPageNum() {
    return this.maxPage;
  }

  set maxPageNum(newPageNum) {
    this.maxPage = newPageNum;
  }
  // ------------- 4 paginat. end-----------
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
