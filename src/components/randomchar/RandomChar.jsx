import "./RandomChar.scss";
import mjolnir from '../../resurses/img/mjolnir.png';
import {useState, useEffect} from "react";
import  useMarvelServise from '../servise/MarvelServis';

import setContent from "../../utils/setContent";


const View = ({data})=>{
    const {name, descprition, thumbnail, homepage,wiki} = data
    
    let img = <img src={thumbnail} alt="Random character" className="randomchar__img"/>
   
   if(thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
    img = <img src={thumbnail} alt="Random character" style={{objectFit: "contain"}} className="randomchar__img"/>
   }

    return(
                    <div className="randomchar__block">
                        {img}
                        <div className="randomchar__info">
                            <p className="randomchar__name">{name}</p>
                            <p className="randomchar__descr">
                                {descprition}
                            </p>
                            <div className="randomchar__btns">
                                <a href={homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>

    )

}

function RandomChar (){


    const [char, setChar] = useState({});
  
    const {loading,error,clearError, getCharacter,process,setProcess} = useMarvelServise()

    useEffect(()=>{
        updateChar()
        
    },[]);
    

    const onCharLoaded = (char)=>{
        setChar(char);
    }
    
    const updateChar = () =>{
        const id = Math.floor(Math.random()* (1011400-1011000) + 1011000);
        getCharacter(id)
        .then(onCharLoaded)
        .then(setProcess('confirmed'))
        clearError();
        }

    
        /* const mistake = error ? <ErrorMesange/> : null; 
        const spinner = loading ? <Spinner/> : null;
        const content =!(loading || error) ? <View char={char}/> : null;
         */
        
        return( 
            <div className="randomchar">
                       {/* {mistake}
                       {spinner}
                       {content} */
                       setContent(process,View,char)
                       }
                        <div className="randomchar__static">
                            <p className="randomchar__title">
                                Random character for today!<br/>
                                Do you want to get to know him better?
                            </p>
                            <p className="randomchar__title">
                                Or choose another one
                            </p>
                            <button onClick={updateChar} className="button button__main">
                                <div className="inner">try it</div>
                            </button>
                            <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                        </div>
            </div>
        )
    }

export default RandomChar;