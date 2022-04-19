import React from 'react';
import { useParams } from "react-router-dom";

function Purchase() {
    let { id } = useParams();

    //api call using the id to load book data
    return (
        <div>
            Purchase book with id {id}
        </div>
    );
}

export default Purchase;