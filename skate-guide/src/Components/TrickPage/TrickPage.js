import React, {useState} from "react";
import s from './TrickPage.module.css';
import { HiMenu, HiChevronLeft } from "react-icons/hi";
import skateboard from '../../img/skateboard.png';

export default function TrickPage(){
    const [skates] = useState([...Array(3).keys()])

    return(
        <div className={s.container}>
            <div className={s.navBar}>
                <button className={s.btnOptions} ><HiChevronLeft/></button>
                <h3 className={s.navBarTitle} >The SB Trick Guide</h3>
                <button className={s.btnOptions} ><HiMenu/></button>
            </div>
            <div className={s.data}>
                <div className={s.header}>
                    <h3 className={s.title} >Ollie</h3>
                    <div className={s.line}/>
                </div>
                <div className={s.emojis} >
                    {
                        skates.map(element => {
                            return <img className={s.skateboard} src={skateboard} alt='skateboard Emoji'/>
                        })
                    }
                </div>
                <div className={s.type} >Street</div>
                <p className={s.description} >
                    The board rotates 360º in the backside direction,
                    with an extra Kickflip rotation.
                </p>
                <div className={s.stances}>
                    <button className={s.stance}>Regular</button>
                    <button className={s.stance}>Fakie</button>
                    <button className={s.stance}>Nollie</button>
                    <button className={s.stance}>Switch</button>
                </div>
                <iframe className={s.video} width="560" height="315" src="https://www.youtube.com/embed/VasSLuFO4wY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>

        </div>

    )
}