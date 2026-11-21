let allCars = []; // master list of cars

// 1. Fetch the JSON data
// This is related to pages/cars.html
fetch('../assets/data/cars.json')
    .then(response => response.json())
    .then(data => {
        allCars = data;
        displayCars(allCars); // first load all the cars on the page load
    })
    .catch(error => console.error('Error loading cars: ', error));

// 2. Function to build and display the Bootstrap cars

function displayCars(carsToDisplay) {
    const container = document.getElementById('car-container');
    container.innerHTML = ''; // empty the container first

    carsToDisplay.forEach(car => {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-lg-4';

        // Inject the Bootstrap card HTML
        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0">
                <img src="../assets/images/${car.image}" class="card-img-top" alt="${car.brand} ${car.model}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-brand">${car.brand} ${car.model}</h5>
                    <p class="card-text text-muted">Daily Rate: €${car.pricePerDay}</p>
                    <div class="mt-auto d-flex gap-2">
                        <button class="btn btn-primary flex-grow-1" onclick="bookCar('${car.id}')">Book Now</button>
                        <button class="btn btn-outline-secondary" onclick="compareCar('${car.id}')">Compare</button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// 3. Filter by Brand

document.getElementById('brandFilter').addEventListener('change', function(e) {
    const selectedBrand = e.target.value;

    if (selectedBrand === 'all') {
        displayCars(allCars);
    }
    else {
        const filteredCars = allCars.filter(car => car.brand === selectedBrand);
        displayCars(filteredCars);
    }
});

// 4. Sort by Price

document.getElementById('priceSort').addEventListener('change', function(e) {
    const sortOrder = e.target.value;

    // Create a arry copy so it does not change from the original list
    let sortedCars = [...allCars];

    if (sortOrder === 'low') {
        sortedCars.sort((a,b) => a.pricePerDay - b.pricePerDay);
    }
    else if (sortOrder === 'high') {
        sortedCars.sort((a, b) => b.pricePerDay - a.pricePerDay);
    }

    // Display the newly sorted array
    displayCars(sortedCars);
});

// 5. Button actions (Placeholders) for booking page

function bookCar(carId) {
    alert("Place holder for book page " + carId);
}

function compareCar(carId) {
    alert("Added car ID: " + carId + " to comparison list.");
}
