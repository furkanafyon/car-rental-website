const carousel = document.getElementById('carousel');
const buttonCtn = document.getElementById('carousel_btn_ctn');

fetch('./assets/data/cars.json')
  .then((response) => response.json())
  .then((data) => {
    const selectedCars = data.filter((car) => car.featured === true);

    selectedCars.forEach((car, i) => {
      const carItem = document.createElement('div');
      carItem.classList.add('carousel_item');
      carItem.innerHTML = `<img src="./assets/images/${car.image}" alt="./assets/images/${car.imageAlt}"/> <p> ${car.name} </p>`;

      carousel.appendChild(carItem);

      const button = document.createElement('button');
      button.classList.add('carousel_btn');
      button.addEventListener('click', () => showCar(i));
      buttonCtn.appendChild(button);
    });
    showCar(0);
  })
  .catch((error) => console.error('Could not load the cars:', error));

function showCar(index) {
  const cars = document.querySelectorAll('.carousel_item');
  const buttons = document.querySelectorAll('.carousel_btn');

  cars.forEach((car) => car.classList.remove('carousel_item_selected'));
  buttons.forEach((button) => button.classList.remove('carousel_btn_selected'));

  cars[index].classList.add('carousel_item_selected');
  buttons[index].classList.add('carousel_btn_selected');
}
