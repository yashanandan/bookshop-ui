import React from 'react';
import { useLocation, useParams } from "react-router-dom";

function BookDetail() {
    let { id } = useParams();

    //api call using the id to load book data
    return (
        <div>
            Book detail with id {id}
        </div>
    );
}

export default BookDetail;