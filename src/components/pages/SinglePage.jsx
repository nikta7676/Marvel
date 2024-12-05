import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../servise/MarvelServis';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMasange/ErrorMesange';


const SinglePage = ({Component, dataType}) => {
        const {id} = useParams();
        const [data, setData] = useState(null);
        const {loading, error, getComics, getCharacter, clearError} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [id])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    getComics(id).then(onDataLoaded);
                    break;
                case 'character':
                    getCharacter(id).then(onDataLoaded);
                    
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
            console.log(data.descprition)
        }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !data) ? <Component data={data}/> : null;
        

        
        return (
            <>
                {errorMessage}
                {spinner}
                {content}
            </>
        )
}



export default SinglePage;