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
import nav_slider from '../Underline.js';

export default function Home({user, setUser}){
    const [selected, setSelected] = useState(0)
    const [tricks, setTricks] = useState({all:[], render: []});
    const [ModalTrick, openTrick] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalLog, openLog] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [ModalProfile, openProfile] = useModal('root', { preventScroll: true, closeOnOverlayClick: true});
    const [diff, setDiff] = useState(false);
    const [leaderboard, setLeaderboard] = useState([{name:'', score: 0}])
    let menu = document.getElementsByClassName(s.ul);
    let menu_slider_click = document.getElementById('nav_slide_click');

    useEffect(()=>{
        async function fetchData() {
            await Promise.all([axios.get(`http://localhost:3001/allTricks`), axios.get(`http://localhost:3001/leaderboard`)])
            .then(values=>{
                setTricks(prev=>({all: values[0].data, render: values[0].data}));
                setLeaderboard(values[1].data)
            })
        }
        fetchData();
    },[])

    useEffect(()=>{
        handleClick();
    })

    const handleClick = function(){
        nav_slider( menu[0], function( el, width, tempMarginLeft ) {
            el.onclick = () => {
                menu_slider_click.style.width =  width + 1.5 + '%';                    
                menu_slider_click.style.marginLeft = tempMarginLeft + -49.5 + '%';   // toca esto para ver donde inicia 
                
            }
        });
    }

    const handleFilter = function(e){
        let aux = [];
        switch (e) {
            case 'Difficulty':
                    aux = [...tricks.all];
                    diff ? 
                    aux.sort((a,b)=>{ if (a.rating < b.rating) return -1; if (a.rating > b.rating) return 1; return 0}) : 
                    aux.sort((a,b)=>{ if (a.rating < b.rating) return 1; if (a.rating > b.rating) return -1; return 0});
                    setDiff(!diff)
                    setTricks(prev=>({...prev, render: aux}));
                break;
            
            case 'Street':
                    aux = [...tricks.all];
                    aux.filter((t)=>{
                    return t.type === 'Street'
                    })
                    setTricks(prev=>({...prev, render: aux}));
                break;

            case 'Grind':
                    aux = [...tricks.all];
                    aux = aux.filter((t)=>{
                        return t.type === 'Grind'
                    })
                    setTricks(prev=>({...prev, render: aux}));
                break;

            case 'Vert':
                aux = [...tricks.all];
                aux = aux.filter((t)=>{
                    return t.type === 'Vert'
                })
                setTricks(prev=>({...prev, render: aux}));
            break;

            case 'Freestyle':
                aux = [...tricks.all];
                aux = aux.filter((t)=>{
                    return t.type === 'Freestyle'
                })
                setTricks(prev=>({...prev, render: aux}));
            break;

            default:
                break;
        }
    }

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
                <div className={s.navbar1} >
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
                        <ul className={s.ul}>
                            <li className={s.li} onClick={()=>{handleClick(); handleFilter('Difficulty');}} key='Difficulty'>Difficulty</li>
                            <li className={s.li} onClick={()=>{handleClick(); handleFilter('Street');}} key='Street'>Street</li>
                            <li className={s.li} onClick={()=>{handleClick(); handleFilter('Grind');}} key='Grind'>Grind</li>
                            <li className={s.li} onClick={()=>{handleClick(); handleFilter('Vert');}} key='Vert'>Vert</li>
                            <li className={s.li} onClick={()=>{handleClick(); handleFilter('Freestyle');}} key='Freestyle'>Freestyle</li>
                            <hr className={s.hr} id="nav_slide_click"/> 
                        </ul> 
                        <div className={s.tricksGrid}>
                            {
                                tricks.render?.map((t,i) =>{
                                    return (
                                    <Transition key={t.name} timeout={i*15}>
                                        <TrickBtn name={t.name} score={t.rating} onClick={()=>{setSelected(t.id); openTrick();}}/>
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
                                    <div key={u.name} className={s.userLeaderboard}>
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
                    <Log user={user} setUser={setUser}/>
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
