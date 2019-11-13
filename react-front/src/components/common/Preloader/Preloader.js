import React from 'react';
import loader from './loader.gif';
import style from './Preloader.module.css';

let Preloader = () => {
    return (
        <div className={`container ${style.preloader}`}>
            <img src={loader} alt=""/>
        </div>
    )
};

export default Preloader;