import React from 'react';

const Photo = ({ show }) => {
    return (
        <div>
            <img src={show.img} alt="" />
        </div>
    );
};

export default Photo;