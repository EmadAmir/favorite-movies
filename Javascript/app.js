const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = document.querySelector('#add-modal button');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = document.getElementsByTagName('input');
const startAddMovieButton = document.querySelector('header button');
const entryTextSection = document.getElementById('entry-text');
const rootList = document.getElementById('movie-list');
// const startAddMovieButton = document.querySelector('header').lastElementChild;
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const deleteMovieHandler = movieId => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
 // rootList.children[movieIndex].remove();
  rootList.removeChild(rootList.children[movieIndex]);
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');

  newMovieElement.className = 'movie-element';
  //  newMovieElement.insertAdjacentElement('afterbegin',
  newMovieElement.innerHTML = `
     <div class="movie-element__image">
     <img src="${imageUrl}" alt ="${title}">
     </div>
     <div class="movie-element__info">
     <h2>${title}</h2>
     <p>${rating}/5</p>
     </div>
     `;
  newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
  rootList.append(newMovieElement);
};
const toggleBackDrop = () => {
  backdrop.classList.toggle('visible');
};

const toggleMovieModel = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackDrop();
};

const backdropClickHandler = () => {
  toggleMovieModel();
};

const cancelAddMovieHandler = () => {
  toggleMovieModel();
  clearUserInput();
};

const clearUserInput = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

/*
1. we are using .trim() to remove the white space but 
would work with out that because we are checking for empty string.
2. we can use +ratingValue < 1 || can use +ratingValue > 5 
by using +ratingValue which will automatically convert it 
into integer or number type  
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus)
*/

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    Number.parseInt(ratingValue) < 1 ||
    Number.parseInt(ratingValue) > 5
  ) {
    alert('Please enter valid input');
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  console.log(movies);
  toggleMovieModel();
  clearUserInput();

  updateUI();
  renderNewMovieElement(newMovie.id, titleValue, imageUrlValue, ratingValue);
};

startAddMovieButton.addEventListener('click', toggleMovieModel);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);
