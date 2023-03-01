


export default function Nav (props)  {
   
    return (
        <nav  style={props.style}
        className={props.class}>
            <h2> Where in the World</h2>
            <div onClick= {props.handle} className={props.mode}>
                {props.them}
                <span>{props.theName}</span>
            </div>
        </nav>
    );


}