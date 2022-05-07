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

    let menu = document.getElementsByClassName(s.ul);
    let menu_slider_click = document.getElementById('nav_slide_click');

    const handleClick = function(){
        nav_slider( menu[0], function( el, width, tempMarginLeft ) {  
            el.onclick = () => {
                menu_slider_click.style.width =  width + 1.5 + '%';                    
                menu_slider_click.style.marginLeft = tempMarginLeft + -49.5 + '%';   // toca esto para ver donde inicia 
            }
            });
    }

    function nav_slider( menu, callback ) {
        let menu_width = menu.offsetWidth;
        // We only want the <li> </li> tags
        menu = menu.getElementsByTagName( 'li' );            
        if ( menu.length > 0 ) {
            var marginLeft = [];
            // Loop through nav children i.e li
            [].forEach.call( menu, ( el, index ) => {
            // Dynamic width/margin calculation for hr              
            var width = getPercentage( el.offsetWidth, menu_width );                              
            var tempMarginLeft = 0;
            // We don't want to modify first elements positioning
            if ( index !== 0 )  {
                tempMarginLeft = getArraySum( marginLeft );
            }            
            // Set mouse event  hover/click
            callback( el, width, tempMarginLeft );      
            /* We store it in array because the later accumulated value is used for positioning */
            marginLeft.push( width + 2.6 );  // toca esto para cambiar cuanto espacio se mueve 
            } );
        }
    }

    // Might make this dynamic for px, %, pt, em 
    function getPercentage( min, max ) {
    return min / max * 100;
    }

    // Not using reduce, because IE8 doesn't supprt it
    function getArraySum( arr ) {
        let sum = 0;
        [].forEach.call( arr, ( el, index ) => {
            sum += el;
        } );
        return sum;
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
                            <li className={s.li} onClick={handleClick} key='Difficulty'>Difficulty</li>
                            <li className={s.li} onClick={handleClick} key='Street'>Street</li>
                            <li className={s.li} onClick={handleClick} key='Grind'>Grind</li>
                            <li className={s.li} onClick={handleClick} key='Vert'>Vert</li>
                            <li className={s.li} onClick={handleClick} key='Freestyle'>Freestyle</li>
                            <hr className={s.hr} id="nav_slide_click"/> 
                        </ul> 
                        <div className={s.tricksGrid}>
                            {
                                tricks?.map((t,i) =>{
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
