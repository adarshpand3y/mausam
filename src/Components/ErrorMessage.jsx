import React from 'react';

function ErrorMessage(props) {
    return (
        <>
            <div className="alert alert-danger" role="alert">
                <b>Error 404: </b> City "{props.city}" Not Found!
            </div>
        </>
    );
}

export default ErrorMessage;
