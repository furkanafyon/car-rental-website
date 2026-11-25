const carousel = document.getElementById('carousel');
const buttonCtn = document.getElementById('carousel_btn_ctn');

let currentIndex = 0;
let timer;

fetch('./assets/data/cars.json')
  .then((response) => response.json())
  .then((data) => {
    const selectedCars = data.filter((car) => car.featured === true); // first we fetch from our database all cars selected to be on the carousel
    let totalCars = selectedCars.length; // the length is needed to be used in the interval function

    selectedCars.forEach((car, i) => {
      // add every car in the dom but hidden and only show the ones clicked or in the interval
      const carItem = document.createElement('div');
      carItem.classList.add('carousel_item');
      carItem.innerHTML = `<img src="./assets/images/${car.image}" alt="./assets/images/${car.imageAlt}"/> <p> ${car.name} </p>`;

      carousel.appendChild(carItem);

      const button = document.createElement('button');
      button.classList.add('carousel_btn');
      button.addEventListener('click', () => {
        currentIndex = i; // whenever someone clicks one car in the carousel, we need to refresh the currentIndex to keep the sequence correct
        showCar(i);
        startTimer(totalCars);
      });
      buttonCtn.appendChild(button);
    });
    showCar(0);
    startTimer(totalCars);
  })
  .catch((error) => console.error('Could not load the cars:', error));

//function to display the car the user clicks on the carousel
function showCar(i) {
  const cars = document.querySelectorAll('.carousel_item');
  const buttons = document.querySelectorAll('.carousel_btn');

  cars.forEach((car) => car.classList.remove('carousel_item_selected'));
  buttons.forEach((button) => button.classList.remove('carousel_btn_selected'));

  cars[i].classList.add('carousel_item_selected');
  buttons[i].classList.add('carousel_btn_selected');
}

// timer to change the cars in the carousel
function startTimer(totalCars) {
  clearInterval(timer);

  timer = setInterval(() => {
    currentIndex++;
    if (currentIndex >= totalCars) {
      currentIndex = 0;
    }
    showCar(currentIndex);
  }, 3000);
}
