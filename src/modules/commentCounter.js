const commentCounter = (content) => {
  let counter = 0;

  if (content) {
    for (let i = 1; i <= content.length; i += 1) {
      counter += 1;
    }
  }
  const displayCounter = document.querySelector('.displayCounter');
  displayCounter.innerHTML = `Comments: (${counter})`;
  return true;
};

export default commentCounter;