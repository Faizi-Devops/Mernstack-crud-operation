type A = {
    value:string,
    color:string,
    clickHandler:()=>void
}
const Button = (props:A) =>{
    return(

        <div>
            <button type="button" className={props.color} onClick={props.clickHandler}>{props.value}</button>

        </div>
    )
}
export default Button;