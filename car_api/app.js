/* Import of express and the fs module of node */
const fs = require('fs');
const express = require('express');
const cors = require('cors');

/* Creation of an Express instance using the express() function */
const app = express();

/* Setting up the port for the listener to be active on */
const PORT = process.env.PORT || 8080;

/* Setting up cors handling middleware */
app.use(cors());

/* Setting up the express.json() middleware for use in the API */
app.use(express.json());

/* To enable the serving of the static image files */
app.use(express.static('public'));

/* An array of cars to simulate a database for the purposes of this exercise */
const carsArray = [
    {
        id: '1',
        make: 'Mercedes-Benz',
        model: 'A-class',
        seats: '5',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/2018_Mercedes-Benz_A200_AMG_Line_Premium_Automatic_1.3_Front.jpg/1280px-2018_Mercedes-Benz_A200_AMG_Line_Premium_Automatic_1.3_Front.jpg'
    },
    {
        id: '2',
        make: 'Land Rover',
        model: 'Defender 90',
        seats: '6',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/2015_Land_Rover_Defender_%28L316_MY15%29_90_3-door_wagon_%282015-10-24%29_01.jpg/800px-2015_Land_Rover_Defender_%28L316_MY15%29_90_3-door_wagon_%282015-10-24%29_01.jpg'
    },
    {
        id: '3',
        make: 'Renault',
        model: 'Captur',
        seats: '5',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Renault_Captur_1.5_dCi_Zen_2018_%2845819908642%29.jpg/1024px-Renault_Captur_1.5_dCi_Zen_2018_%2845819908642%29.jpg'
    },
    {
        id: '4',
        make: 'Porsche',
        model: 'Cayenne',
        seats: '5',
        image: `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/2019_Porsche_Cayenne_V6_Tiptronic_3.0_Front.jpg/1024px-2019_Porsche_Cayenne_V6_Tiptronic_3.0_Front.jpg`
    }
];

/* Helper function to delete a car from the array after a delete request */
const deleteCar = (carId) => {
   carsArray.forEach((car, index) => {
       if (car.id === carId) {
           carsArray.splice(index, 1);
       }
   })
}

/* Helper function to update the model or seat number on specific cars ids */
const updateDetails = (carIdToUpdate, propertyObjectToUpdate) => {

    for (const car of carsArray) {
        if (car.id === carIdToUpdate) {
            for (const propertyName in propertyObjectToUpdate) {
                car[propertyName] = propertyObjectToUpdate[propertyName]            }
        }
    }
}

/* GET request to send back an array of the cars upon connecting to the endpoint */
app.get('/api', (req, res) => {
    res.send(carsArray);
})

/* POST request to add a car to the array from the JSON data in the body of the request */
app.post('/api', (req, res) => {
    const car = req.body
    carsArray.push(car);
    res.send('Car added to cars array');
})

/* DELETE request to delete car from array based on its id number from the url */
app.delete('/api/:id', (req, res) => {
    const idToDelete = req.params.id;
    deleteCar(idToDelete)
    res.send(`Car id ${idToDelete} was deleted.`);
})

/* PUT request to update any details on any given car identified by its id. */
app.put('/api/:id', (req, res) => {
    const carIdToUpdate = req.params.id;
    const propertyObjectToUpdate = req.body;
    updateDetails(carIdToUpdate, propertyObjectToUpdate)
    res.send(`Car id ${carIdToUpdate} was updated`)
})

/* Setting up a listener on the active port */
app.listen(PORT, () => {
    console.log(`Express listening on port ${PORT}`);
})
