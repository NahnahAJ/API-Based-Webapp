import _ from 'lodash';
import MovieApi from './api.js';
import ItemsCounter from './items-counter.js';
import commentCounter from './commentCounter.js';
import Like from './like.js';

const modal = document.getElementById('popUpModal');

export default class ShowMovie {
  static sortingFunction = (a, b) => parseFloat(a.id) - parseFloat(b.id);

  static addComment = (id) => {
    const formSubmit = document.getElementById('form');
    const commentsContainer = document.querySelector('.displayComments');

    // BhcsHKJV6Es48Aq8fpBk
    const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bm0LLMjBZr50WwAoQBN0/comments';

    formSubmit.addEventListener('submit', (event) => {
      event.preventDefault();

      const userName = document.getElementById('name').value;
      const insights = document.getElementById('insights').value;

      // Create an object
      const commentObject = {
        item_id: id,
        username: userName,
        comment: insights,
      };

      // Sending comments to the API
      const sendComment = async () => {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(commentObject),
        });
        commentsContainer.innerHTML = '';
        this.displayComment(id);
      };
      sendComment();
      formSubmit.reset();
    });
  };

  static displayComment = async (id) => {
    const url2 = `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/bm0LLMjBZr50WwAoQBN0/comments?item_id=${id}`;

    const commentsContainer = document.querySelector('.displayComments');
    const res = await fetch(url2, {
      method: 'GET',
    });
    const data = await res.json();

    commentsContainer.innerHTML = '';
    commentCounter(data);

    return data.forEach((recorded) => {
      //  create DOM elements and Append to display in the DOM
      const list = document.createElement('li');
      list.className = 'commentStyle';
      list.innerHTML = `${recorded.creation_date}: ${recorded.username} : ${recorded.comment}`;
      commentsContainer.appendChild(list);
    });
  };

  static createModal = (element) => {
    const modalContent = document.createElement('div');
    modalContent.innerHTML = `
        <div class='modalStyle container'>
            <img src="${element.image.medium}">
            <span class="name">${element.name}</span>
            <span>${element.summary}</span>
            <div class="properties">
            <span>Rating:${element.rating.average}</span>
            <span>Status:${element.status}</span>
            <span>Runtime:${element.runtime}</span>
            <span>Show Time:${element.schedule.time}</span>
            </div>
        </div>        
        <div>
        <button type="button" class="closeBtn btn btn-outline-dark">X</button>
        </div>
        <div class="container displayCounter"></div>
        <div class="container displayComments"></div>
        <form class="container form-style" id="form">
        <div class="mb-3">
          <label for="name" class="form-label"></label>
          <input type="text" class="form-control" id="name" name="username" placeholder="Your name">
        </div>
        <div class="mb-3">
          <label for="insights" class="form-label"></label>
          <textarea class="form-control" id="insights" rows="3" name="comment" placeholder="Your insights"></textarea>
        </div>
        <div>
        <button type="submit" class="btn btn-outline-success">Comment</button>
        </div>
        </form>
        `;
    modal.innerHTML = '';
    modal.appendChild(modalContent);

    const closeBtn = document.querySelector('.closeBtn');
    closeBtn.addEventListener('click', () => {
      modal.className = 'hide';
    });
    this.addComment(element.id);
    this.displayComment(element.id);
  };

  static showMovies = (movies, display, likes) => {
    const listOfMovies = movies.sort(this.sortingFunction);
    display.innerHTML = '';
    listOfMovies.forEach((element) => {
      const obj = _.find(likes, { item_id: element.id });
      const item = `
      <div>
      <img class="img" src="${element.image.medium}">
      <ul>
          <li class="name">${element.name}</li>
          <li class="lang">${element.language}</li>
      </ul>
      <div>
      <button id="${element.id}" class="btn btn-outline-dark">Comments</button> <br>
      <button id=id${element.id} class="btn btn-outline-dark">${obj ? obj.likes : 0} Like(s)</button>
      </div>
      </div>
      `;
      display.insertAdjacentHTML('beforeend', item);
      const popUpMenu = document.getElementById(`${element.id}`);
      popUpMenu.addEventListener('click', () => {
        modal.className = 'show';
        this.createModal(element);
      });
      const likeBtn = document.getElementById(`id${element.id}`);
      likeBtn.addEventListener('click', () => {
        const like = new Like(element.id);
        const result = MovieApi.addNewLikes(likeBtn, like);
        result.then((res) => {
          this.showMovies(movies, res.dispMovies, res.Likes);
        });
      });
    });
    const displayCounter = document.getElementById('counter');
    ItemsCounter.countItems(displayCounter);
  }

  static showError = (error, display) => {
    display.innerHTML = error;
  }
}
