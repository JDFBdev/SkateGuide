import React, { useState, useEffect } from 'react';
import s from './Home.module.css';
import skatepark from '../../img/backround.png';
import skater from '../../img/skater.png';
import { HiMenu } from 'react-icons/hi';
import TrickBtn from '../TrickBtn/TrickBtn';
import TrickPage from '../TrickPage/TrickPage';
import { useModal } from 'react-hooks-use-modal';
import axios from 'axios';

export default function Home(){
    const [selected, setSelected] = useState(0)
    const [tricks, setTricks] = useState([]);
    const [Modal, open] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: true
    });

    useEffect(()=>{
        async function fetchData() {
            let promise = await axios.get(`http://localhost:3001/allTricks`)
            let response = promise.data;
            setTricks(response);
        }
        fetchData();
    },[])

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <img className={s.skatepark} src={skatepark} alt='skatepark'/>
                <div className={s.blueDiv}/>
                <div className={s.smolBlueDiv} />
                <img className={s.skater} src={skater} alt='skater'/>
                <div className={s.mainTitleContainer} >
                    <h1 className={s.mainTitle} >The SB<br/>Trick Guide</h1>
                    <h4 className={s.subtitle} >Learn. Practice. Commit.</h4>
                </div>
            </div>
            <div className={s.app}>
                <div className={s.navbar} >
                    <h1 className={s.navbarTitle}>The SB Trick Guide</h1>
                    <button className={s.btnOptions} ><HiMenu/></button>
                </div>
                <div className={s.tricksDiv}>
                    <div className={s.tricksHeader}>
                        <h3 className={s.tricksTitle} >Tricks</h3>
                        <div className={s.line}/>
                    </div>
                    <div className={s.tricksGrid}>
                        {
                            tricks?.map(t =>{
                                return <TrickBtn name={t.name} score={t.rating} onClick={()=>{setSelected(t.id); open();}} />
                            })
                        }
                    </div>
                </div>
            </div>
            <Modal>
                <TrickPage id={selected}/>
            </Modal>
        </div>
    )
}
