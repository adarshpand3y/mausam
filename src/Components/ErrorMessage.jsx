import React from 'react';

function ErrorMessage() {
    return (
        <>
            <div className="alert alert-danger" role="alert">
                <b>Error 404: </b> City Not Found!
            </div>
        </>
    );
}

export default ErrorMessage;
