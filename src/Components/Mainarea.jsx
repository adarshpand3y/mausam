import React from 'react';
import { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

const Mainarea = () => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const [userInput, setuserInput] = useState("");
    const [serverResponse, setServerserverResponse] = useState({});
    const [loading, setloading] = useState(true);
    const [errorOcurred, setErrorOcurred] = useState(false);

    const handleOnChange = (event) => {
        setuserInput(event.target.value);
    }

    const handleFetchData = async (event) => {
        if (userInput !== "") {
            event.preventDefault();
            try {
                setloading(true);
                setErrorOcurred(false);
                const serverResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}`);
                const parsedData = await serverResponse.json();
                if (parsedData.cod != "404") {
                    setServerserverResponse(parsedData);
                } else {
                    setErrorOcurred(true);
                }
                setloading(false);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(async () => {
        try {
            const serverResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=${apiKey}`);
            const parsedData = await serverResponse.json();
            setServerserverResponse(parsedData);
            setloading(false);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            document.getElementById("submitButton").click();
        }
    }

    return <>
        <div className="container my-4">
            <div className="p-5 border border-secondary rounded">
                <h1 className='text-center'>React Mausam App</h1>
                <div className="my-4 p-5">
                    <div className="d-flex">
                        <input type="text" className="form-control me-2" onChange={handleOnChange} onKeyPress={handleKeyPress} value={userInput} id="cityInput" placeholder="Enter your city here" />
                        <button className="btn btn-dark" id="submitButton" onClick={handleFetchData} type='submit'>Search!</button>
                    </div>
                    {loading ? <div className='d-flex justify-content-center m-4'><Spinner /></div> :
                        <div className="my-4">
                            <h4 className='text-center'>Showing Results for: {`${serverResponse.name}`}</h4>
                            {errorOcurred ?
                                <ErrorMessage />
                                :
                                <>
                                    <h5 className='text-center'>Latitude: {`${serverResponse.coord.lat}`} Longitude: {`${serverResponse.coord.lon}`}</h5>
                                    <h5 className='my-2'>Weather Updates:-</h5>
                                    <ul>
                                        <li><p>Mainly {serverResponse.weather[0].main}</p></li>
                                        <li><p className='text-capitalize'>{serverResponse.weather[0].description}</p></li>
                                        <li><p className='text-capitalize'>Max Temperature: {serverResponse.main.temp_max}</p></li>
                                        <li><p className='text-capitalize'>Min Temperature: {serverResponse.main.temp_min}</p></li>
                                        <li><p className='text-capitalize'>Average Temperature: {serverResponse.main.temp}</p></li>
                                        <li><p className='text-capitalize'>Pressure: {serverResponse.main.pressure}</p></li>
                                        <li><p className='text-capitalize'>Humidity: {serverResponse.main.humidity}</p></li>
                                    </ul>
                                </>
                            }
                        </div>}
                </div>
            </div>
        </div>
    </>;
}

export default Mainarea;
