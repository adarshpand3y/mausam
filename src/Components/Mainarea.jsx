import React from 'react';

const Mainarea = () => {
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
                        <p className='text-center'>Update Line 1</p>
                        <p className='text-center'>Update Line 2</p>
                        <p className='text-center'>Update Line 3</p>
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default Mainarea;
