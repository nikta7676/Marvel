import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMassange } from 'formik';
import useMarvelServise from '../servise/MarvelServis';
import {Link} from 'react-router-dom';
import '../charSearch/charSearch.scss';
import ErrorMesange from '../errorMasange/ErrorMesange';


function CharSearch(){

    const [char, setChar] = useState(null);
    const {loading, error, getCharacterName, clearError} = useMarvelServise();

    const onCharLoaded = (char)=>{
        setChar(char); 
    }

    const updateChar = (name)=>{
        clearError();

        getCharacterName(name)
        .then(onCharLoaded)
    }

    const results = !char ? null : char.length > 0 ? 
        <div className='char__search-wrapper'>
                <div className='char__search-success'>This is! Visit {char[0].name} page?</div>
                <Link to= {`/characters/${char[0].id}`} className="button button__secondary">
                        <div className="inner">To page</div>
                </Link>
        </div> :
                <div className="char__search-error">
                    The character was not found. Check the name and try again
                </div>;
        

    return(

        <div className="char__search-form">
        <Formik
            initialValues = {{
                charName: ''
            }}
            onSubmit = { ({charName}) => {
                updateChar(charName)
            }}
        >
            <Form>
                <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                <div className="char__search-wrapper">
                    <Field 
                        id="charName" 
                        name='charName' 
                        type='text' 
                        placeholder="Enter name"/>
                    <button 
                        type='submit' 
                        className="button button__main"
                        >
                        <div className="inner">find</div>
                    </button>
                </div>
                <FormikErrorMassange component="div" className="char__search-error" name="charName" />
            </Form>
        </Formik>
        {results}
        {ErrorMesange}
        </div>
    )
}


export default CharSearch;