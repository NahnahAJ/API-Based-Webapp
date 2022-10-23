import ItemsCounter from './items-counter.js';

describe('test items counter', () => {
  test('displays total count of image elements found in the DOM', () => {
    document.body.innerHTML = '<button></button>';
    const display = document.querySelector('button');
    jest.spyOn(ItemsCounter, 'countItems').mockImplementation(() => {
      document.body.innerHTML += `
    <div>
      <img class="img" src="https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg">
      <img class="img" src="https://static.tvmaze.com/uploads/images/medium_portrait/163/407679.jpg">
      <img class="img" src="https://static.tvmaze.com/uploads/images/medium_portrait/213/534017.jpg">
      <img class="img" src="https://static.tvmaze.com/uploads/images/medium_portrait/178/445621.jpg">
      <img class="img" src="https://static.tvmaze.com/uploads/images/medium_portrait/0/137.jpg">
      <img class="img" src="https://static.tvmaze.com/uploads/images/medium_portrait/0/154.jpg">
    </div>`;
      const movies = document.querySelectorAll('img');
      return movies.length;
    });
    expect(ItemsCounter.countItems(display)).toBe(6);
  });

  test('tests if DOM is empty', () => {
    document.body.innerHTML = '<button></button>';
    const display = document.querySelector('button');
    jest.spyOn(ItemsCounter, 'countItems').mockImplementation(() => {
      document.body.innerHTML += `
    <div>
      
    </div>`;
      const movies = document.querySelectorAll('img');
      return movies.length;
    });
    expect(ItemsCounter.countItems(display)).toBeFalsy();
  });
});