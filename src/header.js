import React from "react"
import {BiSearch} from "@react-icons/all-files/bi/BiSearch"

export default function Headre (props) {

    

   
    return (
        <div className="head">
            <div className="inpt" style={props.style}>
                
                <BiSearch className="icon"
                onClick={props.click}/>
                <input style={props.style}
                type="text" 
                placeholder="Search for your country"
                name = {props.search}
                value={props.searchValue}
                onChange = {props.change}
                />
            </div>
            <select className="select"
            style={props.style}
            name = {props.name}
            value = {props.region} 
            onChange = {props.handell}>
                <option value=""> Filter by region</option>
                <option value="Europe"> Europe</option>
                <option value="Asia"> Asia</option>
                <option value="Oceania"> Oceania </option>
                <option value="Africa"> Africa </option>
                <option value="Americas"> Americas </option>
                <option value="Antarctic"> Antarctic </option>
                
            </select>
        </div>

    )


}