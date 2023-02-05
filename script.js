const peopleList = document.querySelector('#people-list');
const filmsList = document.querySelector('#films-list');
const urlPeople = 'https://swapi.dev/api/people/';
const urlFilms = 'https://swapi.dev/api/films/';
//create a helper function to fetch data
async function fetchData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function getPeople() {
  const people = await fetchData(urlPeople);
  people.results.forEach((person) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<h3>${person.name}</h3> 
      <p>Birth Year: ${person.birth_year}</p> 
      <p>Hair Color: ${person.hair_color}</p> 
      <p>Gender: ${person.gender}</p> 
      <p><a href="#films">View Films</a></p>`;

    card.addEventListener('click', async () => {
      filmsList.innerHTML = '';
      person.films.forEach(async (filmUrl) => {
        const film = await fetchData(filmUrl);
        const filmCard = document.createElement('div');
        filmCard.classList.add('card');
        filmCard.innerHTML = `<h3>${film.title}</h3>
            <p>Director: ${film.director}</p> 
            <p>Producer: ${film.producer}</p> 
            <p>Release Date: ${film.release_date}</p>`;
        filmsList.appendChild(filmCard);
      });
    });
    peopleList.appendChild(card);
  });
}

async function getFilms() {
  const films = await fetchData(urlFilms);
  films.results.forEach((film) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `<h3>${film.title}</h3>
        <p>Director: ${film.director}</p>
        <p>Producer: ${film.producer}</p>
        <p>Release Date: ${film.release_date}</p>
        <p><a href="#people">View Characters</a></p>`;
    filmsList.appendChild(card);
  });
}

getPeople();
getFilms();
