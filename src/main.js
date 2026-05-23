import './style.css';

const app = document.querySelector("#app");
let currentData = [];

let favorites =
  JSON.parse(localStorage.getItem("favorites")) || [];

let state = {
  search: "",
  filter: "all",
  sort: "none"
};

function saveFavorites() {

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
}

function toggleFavorite(character) {

  const exists = favorites.find(
    f => f.name === character.name
  );

  if (exists) {

    favorites = favorites.filter(
      f => f.name !== character.name
    );

  } else {

    favorites.push(character);
  }

  saveFavorites();

  render();
}

function renderFavorites() {

  if (favorites.length === 0) return "";

  return `
    <div class="favorites">

      <h2>Favorites</h2>

      <ul>
        ${favorites.map(f => `
          <li>${f.name}</li>
        `).join("")}
      </ul>

    </div>
  `;
}
function getProcessedData() {

  let result = [...currentData];

  if (state.search) {

    result = result.filter(c =>
      c.name.toLowerCase().includes(state.search)
    );
  }

  if (state.filter !== "all") {

    result = result.filter(
      c => c.gender === state.filter
    );
  }

  if (state.sort === "az") {

    result.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (state.sort === "za") {

    result.sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  }

  return result;
}

function render() {

  app.innerHTML = `

    <h1>Star Wars Explorer</h1>

    <p class="subtitle">
      Welcome padawan, explore characters from the Star Wars universe.
    </p>

    <div class="controls">

      <input 
        id="searchInput"
        placeholder="Search character..."
        value="${state.search}"
      />

      <select id="filterSelect">

        <option value="all">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="n/a">n/a</option>

      </select>

      <select id="sortSelect">

        <option value="none">Sort</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>

      </select>

    </div>

    ${renderFavorites()}

    <div id="list"></div>

  `;

  attachEvents();

  updateList();
}

function updateList() {

  const list =
    document.querySelector("#list");

  const characters =
    getProcessedData();

  if (characters.length === 0) {

    list.innerHTML = `
      <p class="empty">
        No characters found.
      </p>
    `;

    return;
  }

  list.innerHTML = characters.map(char => {

    const isFav = favorites.some(
      f => f.name === char.name
    );

    return `

      <div 
        class="card observe"
        onclick="openModal('${char.name}')"
      >

        <h2>${char.name}</h2>

        <p><strong>Height:</strong> ${char.height}</p>

        <p><strong>Mass:</strong> ${char.mass}</p>

        <p><strong>Gender:</strong> ${char.gender}</p>

        <p><strong>Birth:</strong> ${char.birth_year}</p>

        <p><strong>Eyes:</strong> ${char.eye_color}</p>

        <p><strong>Hair:</strong> ${char.hair_color}</p>

        <button
          onclick="event.stopPropagation(); handleFav('${char.name}')"
        >

          ${isFav ? "Remove" : "Favorite"}

        </button>

      </div>
    `;
  }).join("");

  setupObserver();
}

function attachEvents() {

  const searchInput =
    document.querySelector("#searchInput");

  const filterSelect =
    document.querySelector("#filterSelect");

  const sortSelect =
    document.querySelector("#sortSelect");

  searchInput.oninput = (e) => {

    const value =
      e.target.value.toLowerCase();

    if (value.length === 1) {

      document.querySelector(".subtitle")
        .textContent =
        "⚠ Please type at least 2 letters";

      return;
    }

    document.querySelector(".subtitle")
      .textContent =
      "Welcome padawan, explore characters from the Star Wars universe.";

    state.search = value;

    updateList();
  };

  filterSelect.onchange = (e) => {

    state.filter = e.target.value;

    updateList();
  };

  sortSelect.onchange = (e) => {

    state.sort = e.target.value;

    updateList();
  };
}

window.handleFav = function (name) {

  const character = currentData.find(
    c => c.name === name
  );

  toggleFavorite(character);
};

window.openModal = function (name) {

  const character = currentData.find(
    c => c.name === name
  );

  const modal =
    document.createElement("div");

  modal.className = "modal";

  modal.innerHTML = `

    <div class="modal-content">

      <span class="close">
        &times;
      </span>

      <h2>${character.name}</h2>

      <p><strong>Height:</strong> ${character.height}</p>

      <p><strong>Mass:</strong> ${character.mass}</p>

      <p><strong>Gender:</strong> ${character.gender}</p>

      <p><strong>Birth year:</strong> ${character.birth_year}</p>

      <p><strong>Eye color:</strong> ${character.eye_color}</p>

      <p><strong>Hair color:</strong> ${character.hair_color}</p>

      <p><strong>Skin color:</strong> ${character.skin_color}</p>

    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".close").onclick = () => {
    modal.remove();
  };

  modal.onclick = (e) => {

    if (e.target === modal) {
      modal.remove();
    }
  };
};

async function getCharacters() {

  try {

    app.innerHTML = `
      <h1 class="loading">
        Loading Jedi data...
      </h1>
    `;

    const responses = await Promise.all([

      fetch("https://swapi.py4e.com/api/people/?page=1"),
      fetch("https://swapi.py4e.com/api/people/?page=2"),
      fetch("https://swapi.py4e.com/api/people/?page=3")

    ]);

    const data = await Promise.all(
      responses.map(res => res.json())
    );

    currentData = data.flatMap(
      page => page.results
    );

    render();

  } catch (err) {

    app.innerHTML = `
      <h1>Error loading data</h1>
    `;
  }
}

function setupObserver() {

  const cards =
    document.querySelectorAll(".observe");

  const observer =
    new IntersectionObserver((entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = 1;

          entry.target.style.transform =
            "translateY(0)";
        }
      });
    });

  cards.forEach(card => {

    card.style.opacity = 0;

    card.style.transform =
      "translateY(20px)";

    card.style.transition =
      "0.5s";

    observer.observe(card);
  });
}


getCharacters();