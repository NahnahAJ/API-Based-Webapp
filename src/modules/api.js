const apikey = localStorage.getItem('apikey');
const apiUrl = 'https://api.tvmaze.com/';
const invApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/';
let likes;

export default class MovieApi {
  static getApiKey = async () => {
    await fetch(`${invApiUrl}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    })
      .then((resp) => resp.text())
      .then((result) => {
        this.apikey = result;
        localStorage.setItem('apikey', this.apikey);
      });
  };

  static getLikes = async () => {
    await fetch(`${invApiUrl}${apikey}/likes/`)
      .then((response) => response.json())
      .then((likes) => {
        this.result = {
          Likes: likes,
          movies: this.movies,
          dispMovies: this.displayMovies,
        };
      });
    return this.result;
  }

  static addNewLikes = async (likeBtnDisplay, like) => {
    const url = `${invApiUrl}${apikey}/likes/`;
    let obj;
    try {
      await fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json; charset=UTF-8',
        }),
        body: JSON.stringify(like),
      }).then((response) => {
        if (response.status === 201) {
          obj = this.getLikes(likeBtnDisplay);
        }
      });
    } catch (error) {
      return error;
    }
    return obj;
  };

  static getMovies = async (display) => {
    if (!apikey) this.getApiKey();
    this.displayMovies = display;
    let obj;
    try {
      await fetch(`${apiUrl}shows`)
        .then((response) => response.json())
        .then((movies) => {
          obj = {
            Movies: movies,
            Likes: likes,
            Display: display,
          };
        });
    } catch (error) {
      return error;
    }
    return obj;
  };
}
