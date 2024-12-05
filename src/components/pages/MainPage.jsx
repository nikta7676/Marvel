import RandomChar from '../randomchar/RandomChar';
import CharContent from '../charContent/CharContent';
import CharInfo from '../charInfo/CharInfo';
import CharSearch from '../charSearch/charSearch';
import { useState } from 'react';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import './CharContent.scss';


const MainPage = ()=>{
    const [state, setState] = useState(null);
    const onChangeId = (id)=>{
        setState(id);
      }

    return(
        <>

                <ErrorBoundary>
                    <RandomChar/>
                  </ErrorBoundary>
                <div className='char__content'>
                  <CharContent onChangeId={onChangeId}/>
                    <div className=''>
                    <ErrorBoundary>
                      <CharInfo id={state}/>
                    </ErrorBoundary>
                      <CharSearch/>
                    </div>
                  </div>
        </>
    )
}

export default MainPage;
