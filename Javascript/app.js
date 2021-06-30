const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = document.querySelector('#add-modal button');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = document.getElementsByTagName('input');
const startAddMovieButton = document.querySelector('header button');
const entryTextSection = document.getElementById('entry-text');
const rootList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');
// const startAddMovieButton = document.querySelector('header').lastElementChild;
// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const movies = [];

const updateUI = () => {
  //update the UI when the movie is added
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const cancelMovieDeletion = () => {
    deleteMovieModal.classList.remove('visible');
    toggleBackDrop();
  
};

const deleteMovieHandler = movieId => {
  //logic to delete the movie

  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  rootList.children[movieIndex].remove();
  //rootList.removeChild(rootList.children[movieIndex]);
  cancelMovieDeletion();
  updateUI();
};

const startDeleteMovieHandler = movieId => {
  deleteMovieModal.classList.add('visible');
  toggleBackDrop();
  const cancelbtnDeleteModal = document.querySelector('#delete-modal .btn--passive');
  cancelbtnDeleteModal.addEventListener('click', cancelMovieDeletion);
  

  let deleteBtn = document.querySelector('.btn--danger');
  deleteBtn.replaceWith(deleteBtn.cloneNode(true));
  
  deleteBtn = document.querySelector('.btn--danger');
  deleteBtn.addEventListener('click', deleteMovieHandler.bind(null, movieId));
  //deleteMovie(movieId);
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
  newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, id)
  );
  rootList.append(newMovieElement);
};
const toggleBackDrop = () => {
  //backdrop toggle when the modal is opened
  backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
  //close the movie modal
  addMovieModal.classList.remove('visible');
};

const showMovieModel = () => {
  addMovieModal.classList.add('visible');
  toggleBackDrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearUserInput();
};

const clearUserInput = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  toggleBackDrop();
  clearUserInput();
};

/*
 we are using .trim() to remove the white space but 
would work with out that because we are checking for empty string.
....................................................................................................
we can use +ratingValue < 1 || can use +ratingValue > 5 
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
  closeMovieModal();
  toggleBackDrop();
  clearUserInput();

  renderNewMovieElement(newMovie.id, titleValue, imageUrlValue, ratingValue);
  updateUI();
};

startAddMovieButton.addEventListener('click', showMovieModel);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
confirmAddMovieButton.addEventListener('click', addMovieHandler);



/*
******************************************
    startDeleteMovieHandler Important
******************************************
    When we click on cancel multiple times the event listener is initiated and listens to the event
    and then when we click on the delete it will delete all the events that is delete all the movies you 
    would have cancelled  
    ..................................................................................................
    On normal scenario we can avoid this by using deletebtn.removeEventListener('click',deleteMovieHandler)
    but in our case since we are using the .bind function => the bind() will return a new function
    and not thhe deleteMovieHandler so the addEventListener will not recognise it.
    ..................................................................................................
    To avoid this we can use clone the button with 'true'. 

  */
