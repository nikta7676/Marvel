import './comicsContent.scss';
import Avengers from '../../resurses/img/Avengers.png';
import AvengersLogo from "../../resurses/img/Avengers_logo.png";
import { useEffect, useState} from 'react';
import useMarvelServise from '../servise/MarvelServis';
import { Link } from 'react-router-dom';
import ErrorMesange from '../errorMasange/ErrorMesange';
import Spinner from '../spinner/Spinner';



function ComicsContent ({onChangeComics}){

    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(0)
    const [newItemComics, setNewComics] = useState(true)
    const [comicsEnd, setComicsEnd] = useState(false)

    const {error,getAllComics, clearError,process,setProcess} = useMarvelServise()

    const setContent = (process, Component ,newItemComics)=>{

        switch(process){
            case 'waiting':
                return <Spinner/>
            case 'loading':
                return newItemComics ?  <Component/> : <Spinner/>
            case 'confirmed':
                return <Component/>
            case 'error':
                return <ErrorMesange/>
            default: 
                throw new Error('Unexpected process state')
        }
    }
    


    useEffect(()=>{
        onComicsAdd(offset, true);
    },[])



    function onComicsload(newData){
        let endComics = false
        if(newData.length < 8){
            endComics = true
        }
        setComics(data => [...data,...newData]);
        setNewComics(false)
        setOffset(offset => offset + 8);
        setComicsEnd(endComics);
      
    }

    const onComicsAdd = (offset, initial)=>{
      
        initial ? setNewComics(false) : setNewComics(true)

        getAllComics(offset)
        .then(onComicsload)
        .then(()=>setContent('confirmed'))

    }
    
    const ComicsList = (comics)=>{
        
        const arr = comics.map((item,i)=>{
            let style = {"objectFit": "cover"}
            
            if(item.thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ){
                style = {"objectFit": "unset"}
            }

            return(
                <li className="comics__item"
                key={i}>
                        <Link to = {`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img" style ={style}/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                </li> 
            )
        })
        return(
            <ul className="comics__grid">
                {arr}
            </ul> 
        ) 
    }

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
            <div className="comics__list">
                   {
                   setContent(process,()=>ComicsList(comics), newItemComics)
                   }
                
                <button onClick={()=> onComicsAdd(offset)}
                disabled = {newItemComics} className="button button__main button__long"
                style = {{'display': comicsEnd ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
            </> )
}
export default ComicsContent;