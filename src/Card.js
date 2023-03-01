

export default function Card(props) {
    return (
       
        <div id={props.id} className={props.className} style={props.style}>
            <img src= {props.image} alt = ""/>
            <div className="disc">
                <h3>{props.name}</h3>
                <div>
                    <span className="key">{props.population} : </span>
                    <span className="value">{props.populationName}</span>

                </div>
                <div>
                    <span className="key">{props.region} : </span>
                    <span className="value">{props.regionName}</span>
                </div>
                <div>
                    <span className="key">{props.capital} : </span>
                    <span className="value">{props.capitalName}</span> 
                </div>
            </div>
        </div>
    );
}

