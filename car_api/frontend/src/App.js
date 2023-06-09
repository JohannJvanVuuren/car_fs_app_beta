/* Import of the React-Router modules needed to setup routing in the app to prevent re-renders of pages
* when links are clicked on */
import { Routes, Route } from 'react-router-dom';

/* Import of the components referred to in the main App component. */
import { Navigation } from "./components/Navigation";
import { LandingPage } from "./components/LandingPage";
import { CarView } from "./components/CarView";
import {AddCars} from "./components/AddCars";
import {ModifyCar} from "./components/ModifyCar";

/* Import of the main stylesheet generated by the SCSS files and preprocessor */
import './scss/main.css';
import {DeleteCar} from "./components/DeleteCar";

export const App = () => {
  return (
    <div className="App">
        <Navigation/>
        <div className="container">
            {/* Setting up of the app's routing */}
            <Routes>
                <Route path={'/'} element={<LandingPage/>}/>
                <Route path={'/carView'} element={<CarView/>}/>
                <Route path={'/addCars'} element={<AddCars/>}/>
                <Route path={'/modifyCar'} element={<ModifyCar/>}/>
                <Route path={'/deleteCar'} element={<DeleteCar/>}/>
            </Routes>
        </div>
    </div>
  );
}