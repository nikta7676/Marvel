
import PropTypes from 'prop-types';
import useMarvelServise from '../servise/MarvelServis';
import {useState, useEffect, useRef} from 'react';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import setContent from '../../utils/setContent';


function CharContent (props){
    
    const [char, setChar] = useState([]);
   /*  const [newCharListLoading, setNewCharList] = useState(true); */
    const [offset, setOffset] = useState(210);
    const [ended, setEnded] = useState(false);
    const [charEnd, setCharEnd] = useState(true)

    

    useEffect(()=>{
        onCharAdd(offset, true)
    },[])   
    
    const {error, clearError, getAllCharacters,process,setProcess} = useMarvelServise()

    const onCharAllLoaded = (newChar)=>{
        let end = false;
        if(newChar.length < 9){
            end = true;
        }
       /*  setNewCharList(false) */
        setChar(char => [...char, ...newChar])
        setOffset(offset=> offset + 9);
        setEnded(ended => end);
        setCharEnd(charEnd => false)
    }

    
    const itemsRef = useRef([])

   const onCharAdd = (offset, initial)=>{
        
        setCharEnd(charEnd => true)
        if(error){
            clearError();
        }
        /* initial ? setNewCharList(false) : setNewCharList(true) */
        getAllCharacters(offset)
           .then(onCharAllLoaded)
           .then(setProcess('confirmed'))
           .catch(()=> setCharEnd(charEnd =>false)) 
        }
    
 

    const focusOnItem = (id)=>{
        itemsRef.current.forEach(item=>item.classList.remove("char__item_selected"));
        itemsRef.current[id].classList.add("char__item_selected");
        itemsRef.current[id].focus();
    }

    const li = (char)=>{
        
        const content = char.map((item, i) =>{
    
            let imgStyle = {"objectFit": "cover"}
            if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit': 'unset'};
            }
            return(
            <CSSTransition
                key= {item.id}
                timeout={500}
                classNames='char__item'
            >
                <li className="char__item" tabIndex={1} ref={(item=>itemsRef.current[i] = item)} onClick={()=>{ 
                props.onChangeId(item.id);
                focusOnItem(i)}}
                onKeyDown ={(e) => {
                    if (e.key === ' ' || e.key === "Enter") {
                        props.onChangeId(item.id);
                        focusOnItem(i);
                    }
                }}>
               <img src={item.thumbnail} alt={item.name} style ={imgStyle}/>
               <div className="char__name">{item.name}</div>
            </li>
            </CSSTransition>)
        })
        return(
              <TransitionGroup component='ul'
                className='char__grid'
              >
                    {content} 
              </TransitionGroup>
                     
          )
        }


   
       
        return( 
        <div className="char__list">
         {  setContent(process,() => li(char))}  
            <button className="button button__main button__long"
            disabled = {charEnd}
            style={{'display': ended ? 'none' : 'block'}}
            onClick={()=>onCharAdd(offset)}>
                    <div className="inner">load more</div>
            </button>
        </div>    
           
        )
    }

CharContent.propTypes = {
    onChangeId: PropTypes.func
}

export default CharContent;