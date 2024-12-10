import useMarvelServise from '../servise/MarvelServis';
import {useEffect,useState} from 'react';
import setContent from '../../utils/setContent';


function CharInfo (props){

    const [char, setChar] = useState(null);
    const {clearError, getCharacter,process,setProcess} = useMarvelServise();


    
    useEffect(()=>{
        updateAllChar();
    },[props.id]);

    const onCharAllLoaded = (char)=>{
        setChar(char);
    }

   

    const updateAllChar = () =>{
        const {id} = props
        if(!id){
            return 
        }
            clearError();
            getCharacter(id)
           .then(onCharAllLoaded)
           .then(()=>setProcess('confirmed'))

        }
    
    return(
        <>
          {setContent(process,View,char)}
        </>
    )
    }

 const View = ({data})=>{

    const {name, thumbnail, descprition, homepage, wiki, comics} = data
    let imgStyle = {"objectFit": "cover"}
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
       imgStyle = {'objectFit': 'contain'};
       }
  
 return(

    <div className="char__info">
        <div className="char__basics">
          <img src={thumbnail} alt={name} style={imgStyle}/>
           <div>
               <div className="char__info-name">{name}</div>
               <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                   </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                   </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
           {descprition}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
          
          {comics.length > 0 ? null : 'There is no comics with this character'}
          
          {
               comics.map((item,id)=>{
               if(id > 8){
                    return;
                }

                    return(
                        <li key={id} className="char__comics-item">
                            {item.name}
                        </li>
                    )
             })
            }
        </ul>
        <p className="char__select">Please select a character to see information</p>
    </div>


    )
    }


export default CharInfo;