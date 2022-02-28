import React from 'react';
import s from './Home.module.css';
import skatepark from '../../img/skatepark.png'

export default function Home(){
    return (
        <div className={s.container}>
            <img src={skatepark}/>
        </div>
    )
}
