import error from "../../img/404.png"
import "./CustomError.css"
function CustomError(props){
    return <div className = "customerror">
        <img src = {error} alt = "error"/>
        <p>{props.message}</p>

    </div>
   
}
export default CustomError 