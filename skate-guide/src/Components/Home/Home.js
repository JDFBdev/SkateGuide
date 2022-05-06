import React, { useState, useEffect } from 'react';
import s from './Home.module.css';
import skatepark from '../../img/backround.png';
import skater from '../../img/skater.png';
import { HiOutlineUser } from 'react-icons/hi';
import TrickBtn from '../TrickBtn/TrickBtn';
import TrickPage from '../TrickPage/TrickPage';
import { useModal } from 'react-hooks-use-modal';
import axios from 'axios';
import Log from '../Log/Log';
import Transition from '../Transition/Transition';
import Profile from '../Profile/Profile';

export default function Home(){
    const [selected, setSelected] = useState(0)
    const [tricks, setTricks] = useState([]);
    const [ModalTrick, openTrick] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalLog, openLog] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalProfile, openProfile] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [user, setUser] = useState(false)
    const [leaderboard, setLeaderboard] = useState([{name:'Rodney', score: 74}, {name:'Tony', score: 58}])

    useEffect(()=>{
        async function fetchData() {
            await Promise.all([axios.get(`http://localhost:3001/allTricks`), axios.get(`http://localhost:3001/leaderboard`)])
            .then(values=>{
                setTricks(values[0].data);
                setLeaderboard(values[1].data)
            })
        }
        fetchData();

        let userStorage = sessionStorage.getItem('user') || null;
        setUser(userStorage);
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
                    <h4 className={s.subtitle} >Ayo do a kickflip!</h4>
                </div>
            </div>
            <div className={s.app}>
                <div className={s.navbar} >
                    <h1 className={s.navbarTitle}>The SB Trick Guide</h1>
                    {
                        user ? 
                        <div className={s.user} onClick={openProfile} >{user.charAt(0)}</div>:
                        <button className={s.btnOptions} onClick={openLog} ><HiOutlineUser size='2rem'/></button>
                    }
                </div>
                <div className={s.appData}>
                    <div className={s.tricksDiv}>
                        <div className={s.tricksHeader}>
                            <h3 className={s.tricksTitle} >Tricks</h3>
                            <div className={s.line}/>
                        </div>
                        <div className={s.filters}>
                            <button className={s.filter}>Difficulty</button>
                            <button className={s.filter}>Street</button>
                            <button className={s.filter}>Grind</button>
                            <button className={s.filter}>Vert</button>
                            <button className={s.filter}>Freestyle</button>
                        </div>
                        <div className={s.tricksGrid}>
                            {
                                tricks?.map((t,i) =>{
                                    return (
                                    <Transition timeout={i*15}>
                                        <TrickBtn name={t.name} score={t.rating} onClick={()=>{setSelected(t.id); openTrick();}} key={t.name}/>
                                    </Transition>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={s.leaderboard}>
                    <div className={s.leaderboardHeader}>
                            <h3 className={s.tricksTitle} >Leaderboard</h3>
                            <div className={s.line}/>
                        </div>
                        {
                            leaderboard?.map((u)=>{
                                return (
                                    <div className={s.userLeaderboard}>
                                        <p className={s.nameLeaderboard}>{u.name}</p>
                                        <p className={s.scoreLeaderboard}>{u.score}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <ModalTrick>
                <Transition>
                    <TrickPage id={selected} user={user}/>
                </Transition>
            </ModalTrick>

            <ModalLog>
                <Transition>
                    <Log/>
                </Transition>
            </ModalLog>

            <ModalProfile>
                <Transition>
                    <Profile user={user}/>
                </Transition>
            </ModalProfile>
        </div>
    )
}
