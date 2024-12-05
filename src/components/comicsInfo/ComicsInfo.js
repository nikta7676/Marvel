import Avengers from '../../resurses/img/Avengers.png';
import AvengersLogo from "../../resurses/img/Avengers_logo.png";
import useMarvelServise from '../servise/MarvelServis';
import { useState, useEffect } from 'react';
import './ComicsInfo.scss'


function ComicsInfo({id}){

    const [comics, setComics] = useState(null)
    const {loading, error, getComics} = useMarvelServise();

    useEffect(()=>{
        if(id){
         getComicsId(id)
        }
    },[id])


    function getComicsId(id){
       getComics(id).then(setComics)
    }

   function setComicsId(comics){
    if(!comics){
        return
    }
    
    let style = {"objectFit": "unset"}
            
    if(comics.thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ){
            style = {"objectFit": "contain"}
        }
    
    let text = 'not found';
    let language = 'not found';

    if(comics.textObjects){
        text = comics.textObjects.text;
        language = comics.textObjects.language
    }

    return(
              <div className="single-comic">
                <img src={comics.thumbnail} alt={comics.title} className="single-comic__img" style={style}/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{comics.title}</h2>
                    <p className="single-comic__descr">{text}</p>
                    <p className="single-comic__descr">144 pages</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{comics.price}</div>
                </div>
                <a href="#" className="single-comic__back">Back to all</a>
            </div>
    )
   }

   const item = setComicsId(comics)
    return(
        <>
            <div className="app__banner">
                <img src={Avengers} alt="Avengers"/>
                <div className="app__banner-text">
                    New comics every week!<br/>
                    Stay tuned!
                </div>
                <img src={AvengersLogo} alt="Avengers logo"/>
            </div>
            {item}
        </>
    )
}

export default ComicsInfo;