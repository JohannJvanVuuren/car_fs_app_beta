/* Import of the main stylesheet generated by the SCSS files and preprocessors */
import '../scss/main.css';

/* Import of React hooks needed in this component */
import {useEffect, useState} from "react";

/* Import of axios to place a get request to display the car to be deleted and to place a delete
* request to delete the chosen car */
import axios from 'axios';

/* Import of this component to display the car to be deleted */
import {CarCard} from "./CarCard";

/* This is the main delete car component which handles the display and deletion of a car selected
 by its ID */
export const DeleteCar = () => {

    /* Declaration and initialisation of the state variables needed in this component */
    const [carId, setCarId] = useState('');
    const [dataRequest, setDataRequest] = useState([]);
    const [deleteRequest, setDeleteRequest] = useState(null);

    /* The base URL used for making requests to the car_api RESTful API */
    const baseUrl = 'http://localhost:8080/api';

    /* The get request implemented with axios through a useEffect hook. This is to display the
    * car card when an ID is entered */
    useEffect(() => {
        axios.get(baseUrl)
            .then(response => setDataRequest(response.data))
            .catch(err => console.log(err))
    })

    /* The event handler that takes the car id input from the form and stores it in the state
    * variable carId with the setCarId function */
    const onChangeHandler = (event) => {
        event.preventDefault();

        setCarId('');

        /* The for loop is just to ensure that only valid ID (matching actual cars in the array) are
        * recorded in the state variable  */
        for (const car of dataRequest) {
            if (car.id === event.target.value) {
                setCarId(event.target.value);
            }
        }
    }

    /* This event handler takes care of the deletion of the item from the array on the server as
    * well as the fetched array on the front end to make sure the two matches up */
    const deleteCarHandler = () => {

        /* The axios delete request to the server */
        axios.delete(`${baseUrl}/${carId}`)
                .then((response) => setDeleteRequest(response.data))
                .catch((err) => console.log(err));

        /* The deletion from the frontend array fetched earlier */
        dataRequest.splice(carId -1, 1)
        setCarId('');
    }

    /* The conditional rendering of the form, car cards and interactive message to the user based on
    * the status of the input field */
    return (
        <div className="delete-car-form-wrapper">

            <form onSubmit={onChangeHandler} className={'car-id'}>
                <h1>Delete Car</h1>
                <label htmlFor={'Car ID to delete'}>Car ID to delete</label>
                <input
                    type={'text'}
                    id={"carId"}
                    name={'carId'}
                    placeholder={'CarID to delete'}
                    onChange={onChangeHandler}
                />
                <button onClick={onChangeHandler}>Submit</button>
            </form>
            {carId !== '' ?
                (<div>
                    <h1>Is this the car you wish to delete?</h1>
                    <div className={'car-card-wrapper'}>
                        <CarCard
                            id={dataRequest[carId - 1].id}
                            make={dataRequest[carId - 1].make}
                            model={dataRequest[carId - 1].model}
                            seats={dataRequest[carId - 1].seats}
                            image={dataRequest[carId - 1].image}
                            className={'car-card'}
                        />
                        <button className={'button-delete'} onClick={deleteCarHandler}>Confirm Delete</button>
                    </div>
                </div>) : (
                    <div>
                        <h1>Please enter a valid Car ID</h1>
                    </div>
                )
            }
            {deleteRequest &&
                <div>
                    <h1>The car was deleted as requested</h1>
                </div>
            }
        </div>
    )
}