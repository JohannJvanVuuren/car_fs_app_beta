/* Import of useState hook for the state variables */
import {useState} from "react";

/* Import of axios module to handle the post request to the server */
import axios from 'axios';

/* Import the main stylesheet generated by the SCSS files and preprocessor */
import '../scss/main.css';

/* The add car component that is used to add additional cars to the array on the server */
export const AddCars = () => {

    /* Creation of the state variables to store the values received from the input field */
    const [carId, setCarId] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [seats, setSeats] = useState('');
    const [image, setImage] = useState('');
    const [posts, setPosts] = useState([]);

    /* The base URL used to access the car_api RESTful API */
    const postUrl = 'http://localhost:8080/api';

    /* Function that is called whenever the submit button is clicked and a onSubmit event is triggered. */
    const submitHandler = (event) => {
        /* Preventing page refresh when form is submitted */
        event.preventDefault();
        /* Calling the addCar function with the relevant state variables as arguments to make the axios
        * post request to the server */
        addCar(carId, make, model, seats, image);
    }

    /* This is the function responsible for making the axios post request to add a new car to the array */
    const addCar = (carId, make, model, seats, image) => {
        if (image === '') {
            image = `https://placehold.co/600x400.png?text=No+Image+Available`
        }
        axios.post(postUrl, {
            id: carId,
            make: make,
            model: model,
            seats: seats,
            image: image
        })
            .then((response) => setPosts([response.data, ...posts]));

        /* Resetting all the state variables to their initial state */
        setCarId('');
        setMake('');
        setModel('');
        setSeats('');
        setImage('');
    }

    /* The rendering of the form to take in the various fields needed to make up a new car which
    * is submitted via an axios request to the server */
    return (
        <div className={"add-cars-form-container"}>
            <form className={"form"} onSubmit={submitHandler}>
                <h1>Add a car</h1>
                <div className={"form-input"}>
                    <label htmlFor="id">Car ID</label>
                    <input
                        type="text"
                        id={"id"}
                        name={"id"}
                        value={carId}
                        placeholder={"Car ID"}
                        /* These onChange events capture the input value as they are entered and the state update
                         function of each variable is used to update the value*/
                        onChange={event => setCarId(event.target.value)}/>
                </div>
                <div className={"form-input"}>
                    <label htmlFor={"make"}>Car Make</label>
                    <input
                        type="text"
                        id={"make"}
                        name={"make"}
                        value={make}
                        placeholder={"Car Make"}
                        onChange={event => setMake(event.target.value)}/>
                </div>
                <div className={"form-input"}>
                    <label htmlFor={"model"}>Car Model</label>
                    <input
                        type="text"
                        id={"model"}
                        name={"model"}
                        value={model}
                        placeholder={"Car Model"}
                        onChange={event => setModel(event.target.value)}/>
                </div>
                <div className={"form-input"}>
                    <label htmlFor={"seats"}>Car Seats</label>
                    <input
                        type="text"
                        id={"seats"}
                        name={"seats"}
                        value={seats}
                        placeholder={"Car Seats"}
                        onChange={event => setSeats(event.target.value)}/>
                </div>
                <div className={"form-input"}>
                    <label htmlFor={"image"}>Car Image URL</label>
                    <input
                        type="text"
                        id={"image"}
                        name={"image"}
                        value={image}
                        placeholder={"Car Image URL"}
                        onChange={event => setImage(event.target.value)}/>
                </div>
            <button type="submit">Add Car</button>
            </form>
        </div>
    )
}