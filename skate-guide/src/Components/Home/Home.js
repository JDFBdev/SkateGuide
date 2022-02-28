import React from 'react';
import s from './Home.module.css';
import skatepark from '../../img/noskynoskate.png';
import skater from '../../img/skater.png';
import ParticleBackground from 'react-particle-backgrounds';
import sky from '../../img/sky.jpg';

const settings = {
    particle: {
      particleCount: 300,
      color: "#FFFFFF",
      maxSize: 2
    },
    velocity: {
      directionAngle: 0,
      directionAngleVariance: 60,
      minSpeed: 0.1,
      maxSpeed: 0.2
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.4,
      opacityTransitionTime: 30000
    }
  }

export default function Home(){
    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <h2 className={s.title}>THE SB<br/>
                    TRICK GUIDE
                </h2>
                <img src={sky} className={s.sky} alt='sky' />
                {/* <div className={s.fade}/> */}
                <ParticleBackground className={s.particles} settings={settings}/>
                <img className={s.image} src={skatepark} alt='skatepark'/>
                <img className={s.skater} src={skater} alt='skater'/>
            </div>
            <div className={s.text}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer auctor lectus urna, id cursus augue lacinia sit amet. Maecenas sit amet dui vehicula, malesuada sapien a, ullamcorper ex. Proin vehicula dui ac feugiat auctor. In auctor nulla non ornare sagittis. In eu lectus sodales, laoreet leo vel, imperdiet velit. Sed in tellus leo. Nullam at ex imperdiet, euismod orci ut, volutpat nibh. Ut tempus ligula metus, in finibus nisi vulputate sed. Maecenas porttitor, sapien nec consequat semper, tellus urna convallis neque, ut facilisis arcu turpis sed felis.

Vivamus justo sem, pellentesque luctus elementum id, viverra a elit. Aenean sagittis ante eget purus pretium varius. Duis congue pharetra orci eget pretium. Cras vitae orci viverra ex maximus scelerisque ac eu nulla. Nulla facilisi. Nunc at placerat enim. Praesent sit amet dui risus. Quisque cursus mauris eget ornare cursus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque non feugiat nisl. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Maecenas eu sodales odio, et blandit dolor. Integer bibendum, neque id congue vehicula, justo leo dignissim felis, id imperdiet tellus mi et turpis. Maecenas fermentum elementum augue ac auctor. Nulla congue dui id sem aliquam viverra eget et nibh. Aenean convallis lacinia orci, in dictum libero dignissim et. Etiam massa elit, varius sit amet consectetur non, ultricies sit amet sapien. Proin quis tempus neque. Sed vitae pharetra turpis, non gravida metus. Nunc tincidunt molestie blandit. Quisque felis enim, eleifend nec dui id, aliquet facilisis magna. Quisque porta diam in libero pulvinar sagittis.</p>
            </div>
        </div>
    )
}
