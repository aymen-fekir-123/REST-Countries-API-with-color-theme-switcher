import React from "react"
import Nav from "./nav"
import Card from "./Card"
import Headre from "./header"

import { BiMoon} from "@react-icons/all-files/bi/BiMoon"
import { BiSun } from "@react-icons/all-files/bi/BiSun"
import "./app.css"
// import { BiSearch } from "@react-icons/all-files/bi/BiSearch"

function App() {

  const [them, setThem] = React.useState({
    on : true,
    style_white : {
      body: {
        "backgroundColor" : "hsl(0, 0%, 98%)",
        "color" : "hsl(200, 15%, 8%)"
      },
      element : {
        "backgroundColor" : "hsl(0, 0%, 100%)",
        "color" : "hsl(200, 15%, 8%)",
      },
      card : {
        "backgroundColor" : "hsl(0, 0%, 100%)",
        "boxShadow" : " 0px 3px 1px 1px   hsl(0, 0%, 60%)"
        
      }
    },

    style_dark : {
      body : {
        "backgroundColor" : "hsl(207, 26%, 17%)",
        "color" : "hsl(0, 0%, 100%)"
      },
      element : {
        "backgroundColor" : "hsl(209, 23%, 22%)"
        
      },
      card : {
        "backgroundColor" : "hsl(209, 23%, 22%)",
        "boxShadow" : " 0px 3px 1px 1px  hsl(204, 17%, 11%)"
      }
    }
    

  })


  const Name = them.on ? "White Mode" : "Dark Mode"
  function handle() {
    setThem ((privois) => {
      return (
        {
          ...privois,
          on : !privois.on
        }
      )})
  }

  const [conterie, setConterie] = React.useState([])

  const [val, setval] = React.useState({
    on : false,
    region : "", 
    load : true
  })

  const [ser, setser] = React.useState({
    search :  ""
  })

  function handelchange (event) {
    setser(priv => {
      return (
        {
          
          [event.target.name] : event.target.value
        }
      )
    })
  }

  const [sercl, setsercl] = React.useState({
    on : false,
    content : "",
    load : true

  })

  function handelclick () {
    setsercl(priv => {
      
      return(
        {
          content : (ser.search === "" || ser.search.replace(/\s/g, "") === "") ? "" : `${ser.search[0].toLocaleUpperCase()}${ser.search.substring(1,)}`,
          on : true,
          load : false
        }
      )})
  }


  function handelval (event) {
    setval((priv) => {
      return (
        {
          on : true,
          [event.target.name] : event.target.value,
          load : false
        }
      )
    })
    
    
  }



  React.useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
    .then((request) => request.json())
    .then((data) => {
      let l = [];
  
        
      
      function create_card (l, data_flte, n) {
        
        
        for (let j = 0 ; j < n; j++) {
          const slep = (val.load && sercl.load) ? data_flte[Math.floor(Math.random() * data.length)] : data_flte[j];
          const d = {
            class : "card",
            key : j,
            image : slep.flags["png"] || slep.flags["svg"],
            name : slep.translations.cym.common,
            population : "Population",
            populationName : slep.population,
            region : "Region",
            regionName : slep.region,
            capital : "Capital",
            capitalName : slep.capital,
            discption : [Object.values(slep.currencies)[0].name,Object.values(slep.languages)]
          }
         
         
          
          l.push(d);
        }

      }
      
      let n;
      
      
      if (val.load && sercl.load)  {
        n = 10
        create_card(l, data, n)
        setConterie(l);
       
        

      }
      else {
        
        let data_flte;
        if (val.on) {

          data_flte = data.filter((e) => {
            return e.region === val.region
          })
          n = val.region === "Antarctic" ? 5 : 10
          if (val.region === "Antarctic") {
            n = 5
            create_card(l, data_flte, n)
            setConterie(l);
          }else if (val.region === "") {
            n = 0
          }else {
            n = 10
            create_card(l, data_flte, n)
            setConterie(l);
          }
          val.on = false

        }else if (sercl.on){
    
          data_flte = data.filter((e) => {
            
            return e.translations.cym.common === sercl.content || (sercl.content !== "" && e.translations.cym.common.includes(sercl.content))
          })

          if (data_flte.length === 0 && sercl.content !== "") {
            const d =  {key : "1" ,
            class:"NotFound",
            title : " country Not Found !!! "}
                       
            l.push(d);
            setConterie(l);            
          }else if (data_flte.length > 0 && data_flte.length < 10) {
            n = data_flte.length
            create_card(l, data_flte, n)
            setConterie(l);
          }else if (data_flte.length > 10){
            n = 10
            create_card(l, data_flte, n)
            setConterie(l);

          }
          sercl.on = false
        }
        
        


          
      }
     
    })

  }, [val, sercl])

  document.querySelector("body").style.backgroundColor = them.on ? them.style_white.body.backgroundColor : them.style_dark.body.backgroundColor
  document.querySelector("body").style.color = them.on ? them.style_white.body.color : them.style_dark.body.color



  let list_of_country;
  if (conterie.length !== 0 && conterie[0].class === "NotFound") {
    list_of_country = <div  key = {conterie[0].key} className={conterie[0].class}>
                        <div className="">
                          <img src="" alt=""/>
                        </div>
                        <h3> {conterie[0].title} </h3>
                      </div>
  }else if(conterie.length !== 0 && conterie[0].class === "card") {
    list_of_country = conterie.map((e) => {
      return (<Card 
            
            id = {e.key}
            className = {e.class}
            style = {them.on ? them.style_white.card : them.style_dark.card}
            key = {e.key}
            image = {e.image}
            name = {e.name}
            population = {e.population}
            populationName = {e.populationName}
            region = {e.region}
            regionName = {e.region}
            capital = {e.capital}
            capitalName = {e.capitalName}

      
      />)
    })
  }

  

  


 
 

 

  return (
    <>
      <Nav 
        style={them.on ? them.style_white.card : them.style_dark.card} 
        class="navbar"
        handle={handle}
        theName = {Name} 
        mode = "mode"
        them={them.on ? <BiSun className="white"/>  :  <BiMoon className="dark"/>}
      />


      <Headre
      style = {them.on ? them.style_white.element : them.style_dark.element}
      click = {handelclick}
      search = "search"
      searchValue = {ser.search}
      change = {handelchange}
      name = "region"
      region = {val.region} 
      handell = {handelval} 
      
      />
  
    
      
      <div className="containor">
        {list_of_country}
        
      </div>
    </>
  );
}

export default App;
