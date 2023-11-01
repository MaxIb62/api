
const apiModule = {
  fetchData: async () => {
      try {
          const response = await fetch('https://dog.ceo/api/breeds/list/all');
          const data = await response.json();
          return data.message;
      } catch (error) {
          console.error(error);
      }
  },

  fetchBreedImage: async (breed) => {
      try {
          const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
          const data = await response.json();
          return data.message;
      } catch (error) {
          console.error(error);
      }
  }
};


const domModule = {
  displayBreeds: (breeds) => {
      const breedsList = document.getElementById('breedsList');
      breedsList.innerHTML = '';

      for (const breed in breeds) {
          const breedItem = document.createElement('p');
          breedItem.textContent = breed;
          breedItem.addEventListener('click', async () => {
              const dogImage = await apiModule.fetchBreedImage(breed);
              document.getElementById('dogImage').src = dogImage;
          });
          breedsList.appendChild(breedItem);
      }
  }
};


const eventModule = {
  init: () => {
      const searchInput = document.getElementById('searchInput');
      searchInput.addEventListener('keyup', async (event) => {
          if (event.key === 'Enter') {
              const searchTerm = searchInput.value;
              const breeds = await apiModule.fetchData();
              if (breeds[searchTerm]) {
                  const dogImage = await apiModule.fetchBreedImage(searchTerm);
                  document.getElementById('dogImage').src = dogImage;
              } else {
                  alert('Raza de perro no encontrada.');
              }
          }
      });
  }
};


eventModule.init();
