import './comicsContent.scss';
import Avengers from '../../resurses/img/Avengers.png';
import AvengersLogo from "../../resurses/img/Avengers_logo.png";
import { useEffect, useState} from 'react';
import useMarvelServise from '../servise/MarvelServis';
import setContent from '../../utils/setContent';
import { Link } from 'react-router-dom';

function ComicsContent ({onChangeComics}){

    const [comics, setComics] = useState([])
    const [loadComics, setLoadComics]= useState(true)
    const [offset, setOffset] = useState(0)
    const {error,getAllComics, clearError,process,setProcess} = useMarvelServise()
    const [newItemComics, setNewComics] = useState(true)
    const [comicsEnd, setComicsEnd] = useState(false)



    useEffect(()=>{
        onComicsAdd(offset, true);
        
    },[])



    function onComicsload(newData){
        let endComics = false
        if(newData.length < 8){
            endComics = true
        }
        setComics(data => [...data,...newData]);
        comics.length > 1 ? setLoadComics(false) : setLoadComics(true)
        setOffset(offset => offset + 8);
        setComicsEnd(comicsEnd => endComics);
        setNewComics(newItemComics => false);
    }

    const onComicsAdd = (offset, initial)=>{
        setNewComics(newItemComics => true);
        if(error){
            clearError()
        }
        initial ? setLoadComics(true) : setLoadComics(false)
        getAllComics(offset).then(onComicsload).then(setProcess('confirmed')).catch(()=>setNewComics( newItemComics=>false));
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
                   setContent(process,()=>ComicsList(comics))
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