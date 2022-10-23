/**
 * @jest-environment jsdom
 */

import commentCounter from './commentCounter.js';

document.body.innerHTML = '<div>'
       + '  <span class="displayCounter"></span>'
       + '</div>';

test('items counter check ', () => {
  const data = [
    { username: 'HY', comment: 'Test', creation_date: '2022-10-20' },
    { creation_date: '2022-10-20', comment: 'Test', username: 'HY' },
    { username: 'hY', creation_date: '2022-10-20', comment: 'test' },
  ];
  const counter = commentCounter(data);

  expect(counter).toBeTruthy();
});

test('check if number of comments = 0 ', () => {
  const data = [];

  const counter = commentCounter(data);

  expect(counter).toBeTruthy();
});