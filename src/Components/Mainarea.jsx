import React from 'react';

const response = {
    "coord": {
        "lon": -0.13,
        "lat": 51.51
    },
    "weather": [
        {
            "id": 300,
            "main": "Drizzle",
            "description": "light intensity drizzle",
            "icon": "09d"
        }
    ],
    "base": "stations",
    "main": { // SHOW
        "temp": 280.32,
        "pressure": 1012,
        "humidity": 81,
        "temp_min": 279.15,
        "temp_max": 281.15
    },
    "visibility": 10000,
    "wind": {
        "speed": 4.1,
        "deg": 80
    },
    "clouds": {
        "all": 90
    },
    "dt": 1485789600,
    "sys": {
        "type": 1,
        "id": 5091,
        "message": 0.0103,
        "country": "GB",
        "sunrise": 1485762037,
        "sunset": 1485794875
    },
    "id": 2643743,
    "name": "London",
    "cod": 200
};

const Mainarea = () => {
    console.log(response);
    return <>
        <div className="container my-4">
            <div className="p-5 border border-secondary rounded">
                <h1 className='text-center'>React Mausam App</h1>
                <div className="my-4 p-5">
                    <div className="d-flex">
                        <input type="text" className="form-control me-2" id="cityInput" placeholder="Enter your city here" />
                        <button className="btn btn-dark">Search!</button>
                    </div>
                    <div className="my-4">
                        <h4 className='text-center'>Showing Results for: {`${response.name}`}</h4>
                        <h5 className='text-center'>Latitude: {`${response.coord.lat}`} Longitude: {`${response.coord.lon}`}</h5>
                        <h5 className='my-2'>Weather Updates:-</h5>
                        <ul>
                            <li><p>Mainly {response.weather[0].main}</p></li>
                            <li><p className='text-capitalize'>{response.weather[0].description}</p></li>
                            <li><p className='text-capitalize'>Max Temperature: {response.main.temp_max}</p></li>
                            <li><p className='text-capitalize'>Min Temperature: {response.main.temp_min}</p></li>
                            <li><p className='text-capitalize'>Average Temperature: {response.main.temp}</p></li>
                            <li><p className='text-capitalize'>Pressure: {response.main.pressure}</p></li>
                            <li><p className='text-capitalize'>Humidity: {response.main.humidity}</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default Mainarea;
