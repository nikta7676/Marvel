
import { Component } from "react";
import ErrorMesange from "../errorMasange/ErrorMesange";

class ErrorBoundary extends Component{


    state = {
        error:false
    }


    componentDidCatch(error, errorInfo){
        console.log(error,errorInfo);

        this.setState({
            error:true
        })
    }
        render(){

            if(this.state.error){
                return <ErrorMesange></ErrorMesange>
            }
            return this.props.children
        }
    }

    export default ErrorBoundary;
