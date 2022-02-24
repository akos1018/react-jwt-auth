import React from "react";
import "./Proba.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Col,Row} from 'react-bootstrap'


const ipcim = "localhost:8080"
export default class App extends React.Component {
   
    constructor(props) {
        super(props);
   
        this.state = {
            adatok: [],
            IsLoading: true,

        };
    }
   

    componentDidMount() {
        fetch(
        'http://'+ipcim+'/sorozat')
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    IsLoading: false,
                    adatok: json,
                    
                });
            })
    }

    kereses = () =>{
      let bemenet ={
        bevitel1:document.getElementById("szoveg").value
  
      }
      fetch('http://'+ipcim+'/kereses', {
       method: "POST",
       body: JSON.stringify({bemenet}),
       headers: {"Content-type": "application/json; charset=UTF-8"}
     }
     )
       .then((response) => response.json())
       .then((responseJson) => {
         this.setState({
           isLoading: false,
           adatok: responseJson
         }, function(){
          
  
         });
  
       })
       .catch((error) =>{
         console.error(error);
       });

       console.log(this.state.adatok)
  
   
     }

     changehandler =(e)=>{
       this.setState({[e.target.name]: e.target.value})
     }


    render() {
        const { IsLoading, adatok, szoveg } = this.state;

        if (IsLoading) return <div>
            <h1> Nem fetcheli le </h1> </div> ;
   
        return (
        <div className = "App">
          <div>

            <input type="text" id="szoveg" name="szoveg" />
            <button onClick={() => this.kereses()}>Mehet</button>

          </div>
            <h1> Fetch data from an api in react </h1>
              {adatok.map((item) => ( 
                <Container>
                  <Row>
                    <Col>
                    <span>{item.sorozat_cim}</span>
                      <img src={"http://localhost:8080/kepek/" + item.sorozat_kep} style={{width:100,height:100}} className="img-fluid"></img>
                    </Col>
                  </Row>
                </Container>
                  
                ))
            }
        </div>
    );
}
}
   