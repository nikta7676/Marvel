import Skeleton from "../resurses/skeleton/Skeleton"
import Spinner from "../components/spinner/Spinner"
import ErrorMesange from "../components/errorMasange/ErrorMesange"


const setContent = (process, Component ,data)=>{

    switch(process){
        case 'waiting':
            return <Skeleton/>
        case 'loading':
            return <Spinner/>
        case 'confirmed':
            return <Component data={data}/>
        case 'error':
            return <ErrorMesange/>
        default: 
            throw new Error('Unexpected process state')
    }
}

export default setContent;