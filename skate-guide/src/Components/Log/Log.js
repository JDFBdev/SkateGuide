import React, {useState} from "react";
import s from './Log.module.css';
import Transition from '../Transition/Transition';

export default function Log(){
    const [log, setLog] = useState(true);

    return(
        <>
            {
                log &&
                <Transition>
                    <div className={log ?  s.container : s.container2}>
                        <div className={s.header}>
                            <h1 className={s.title}>Log In</h1>
                            <div className={s.line}/>
                        </div>
                        <input className={s.input} placeholder="User or Email..."/>
                        <div className={s.passwordDiv}>
                            <input className={s.input2} type="password" placeholder="Password..."/>
                            <p className={s.forgot}>Forgot Your Password?</p>
                        </div>
                        <div className={s.btnDiv}>
                            <button className={s.btnSubmit}>Log In</button>
                            <p className={s.signUp} onClick={()=>{setLog(false)}}>Or Sing Up</p>
                        </div>
                    </div>
                </Transition>
            }
            {
                !log &&
                <Transition>
                    <div className={log ?  s.container : s.container2}>
                        <div className={s.header}>
                            <h1 className={s.title}>Sign Up</h1>
                            <div className={s.line}/>
                        </div>
                        <input className={s.input} placeholder="Username..."/>
                        <input className={s.input} placeholder="Email..."/>
                        <input className={s.input} type="password" placeholder="Password..."/>
                        <input className={s.input} type="password" placeholder="Repeat Password..."/>
                        <div className={s.btnDiv}>
                            <button className={s.btnSubmit}>Sign Up</button>
                            <p className={s.signUp} onClick={()=>{setLog(true)}}>Or Log In</p>
                        </div>
                    </div>
                </Transition>
            }
        </>
    )

}