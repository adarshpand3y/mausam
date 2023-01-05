import React from 'react';
import { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';

const Mainarea = (props) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const [userInput, setuserInput] = useState("");
    const [citySearch, setCitySerach] = useState("");
    const [serverResponse, setServerResponse] = useState({});
    const [citiesData, setCitiesData] = useState([]);
    const [loading, setloading] = useState(true);
    const [citiesDataloading, setCitiesDataLoading] = useState(true);
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
                setCitySerach(userInput);
                const serverResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}&units=metric`);
                const parsedData = await serverResponse.json();
                if (parsedData.cod != "404") {
                    // console.log(parsedData);
                    setServerResponse(parsedData);
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
            const serverResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=${apiKey}&units=metric`);
            const parsedData = await serverResponse.json();
            if (parsedData.cod != "404") {
                // console.log(parsedData);
                setServerResponse(parsedData);
            } else {
                setErrorOcurred(true);
            }
            const multipleCityResponse = await fetch(`https://api.openweathermap.org/data/2.5/group?id=1273294,1275004,1275339,1277333,1264527,1269843,1269515,1279233,1259229,1254163&units=metric&appid=${apiKey}`)
            const citiesParsedData = await multipleCityResponse.json();
            setCitiesData(citiesParsedData.list);
            setloading(false);
            setCitiesDataLoading(false);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return <>
        <div className="container my-4">
            <h1 className={`text-center text-${props.theme === "light" ? "dark" : "light"} mb-4`}>React Mausam</h1>
            <form className="d-flex mb-4" onSubmit={handleFetchData}>
                <input type="text" className={`form-control me-2 ${props.theme === 'dark' ? "bg-dark text-light" : "bg-white text-dark"}`} onChange={handleOnChange} value={userInput} placeholder="Enter your city here" />
                <button className={`btn btn-primary`} id="submitButton" type='submit'>Search!</button>
            </form>
            {
                loading ? <div className='d-flex justify-content-center m-4'><Spinner theme={props.theme} /></div> :
                    <>
                        {
                            errorOcurred && <ErrorMessage city={citySearch} />
                        }
                        <h4 className={`text-center text-${props.theme === "light" ? "dark" : "light"}`}>Showing Results for: {`${serverResponse.name}`}</h4>
                        <h5 className={`text-center text-${props.theme === "light" ? "dark" : "light"}`}>Latitude: {`${serverResponse.coord.lat}`} Longitude: {`${serverResponse.coord.lon}`}</h5>
                        <h5 className={`text-center text-${props.theme === "light" ? "dark" : "light"} mb-4`}>Showing data calculated on {new Date(serverResponse.dt * 1000).toLocaleString()}</h5>
                        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                            {/* // HUMIDITY CARD */}
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className={`card-header py-3 ${props.theme === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`}>
                                        <h4 className="my-0 fw-normal">Humidity</h4>
                                    </div>
                                    <div className={`card-body ${props.theme === 'light' ? "text-dark" : "text-light bg-secondary"}`}>
                                        <h1 className={`card-title pricing-card-title ${props.theme === 'light' ? "text-dark" : "text-light"}`}>{serverResponse.main.humidity}<small className={`${props.theme === "dark" ? "text-light" : "text-muted"} fw-light`}>%</small></h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>Feels like {serverResponse.main.feels_like}&#8451;</li>
                                            <li>Sunrise at {new Date(serverResponse.sys.sunrise * 1000).toLocaleTimeString()}</li>
                                            <li>Sunset at {new Date(serverResponse.sys.sunset * 1000).toLocaleTimeString()}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* // TEMPERATURE CARD */}
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm border-primary">
                                    <div className="card-header py-3 text-light bg-primary border-primary">
                                        <h4 className="my-0 fw-normal">Temperatures</h4>
                                    </div>
                                    <div className={`card-body ${props.theme === 'light' ? "text-dark" : "text-light bg-secondary"}`}>
                                        <h1 className="card-title pricing-card-title">15<small className={`${props.theme === "dark" ? "text-light" : "text-muted"} fw-light`}>&#8451;</small></h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>Temperature is {serverResponse.main.temp}&#8451;</li>
                                            <li>Max temperature is {serverResponse.main.temp_max}&#8451;</li>
                                            <li>Min temperature is {serverResponse.main.temp_min}&#8451;</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* // WIND CARD */}
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className={`card-header py-3 ${props.theme === 'light' ? "bg-light text-dark" : "bg-dark text-light"}`}>
                                        <h4 className="my-0 fw-normal">Wind</h4>
                                    </div>
                                    <div className={`card-body ${props.theme === 'light' ? "text-dark" : "text-light bg-secondary"}`}>
                                        <h1 className="card-title pricing-card-title">{serverResponse.wind.speed}<small className={`${props.theme === "dark" ? "text-light" : "text-muted"} fw-light`}>km/hr</small></h1>
                                        <ul className="list-unstyled mt-3 mb-4">
                                            <li>Wind Degree is {serverResponse.wind.deg}&#176;</li>
                                            <li>Wind speed is {serverResponse.wind.speed} km/hr</li>
                                            <li>Pressure: {serverResponse.main.pressure} millibar</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
            {
                citiesDataloading ? "" :
                    <>
                        <h2 className={`text-center mb-4 ${props.theme === "dark" ? "text-light" : "text-dark"}`}>Showing Popular Indian Cities Data</h2>
                        <table className={`table table-striped ${props.theme === "dark" ? "table-dark" : ""}`}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Weather</th>
                                    <th scope="col">Temperature</th>
                                    <th scope="col">Humidity</th>
                                    <th scope="col">Pressure</th>
                                    <th scope="col">Wind</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    citiesData.map((city, index) => {
                                        return <tr key={index+1} className={`${props.theme === "dark" ? "table-dark" : ""}`}>
                                            <th scope="row">{index + 1}</th>
                                            <td className={`${props.theme === "dark" ? "table-dark" : ""}`}>{city.name}</td>
                                            <td className={`${props.theme === "dark" ? "table-dark" : ""}`}>{city.weather[0].description}</td>
                                            <td className={`${props.theme === "dark" ? "table-dark" : ""}`}>{city.main.temp}</td>
                                            <td className={`${props.theme === "dark" ? "table-dark" : ""}`}>{city.main.humidity}</td>
                                            <td className={`${props.theme === "dark" ? "table-dark" : ""}`}>{city.main.pressure}</td>
                                            <td className={`${props.theme === "dark" ? "table-dark" : ""}`}>{city.wind.speed}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </>
            }
        </div>
        <footer className={`py-4 my-4 text-center ${props.theme === "dark" ? "text-light" : "text-muted"}`}>
            <hr className='mb-4' />
            <p className={`text-center`}>© 2022 - {new Date().getFullYear()} Adarsh Pandey</p>
        </footer>
    </>;
}

export default Mainarea;
