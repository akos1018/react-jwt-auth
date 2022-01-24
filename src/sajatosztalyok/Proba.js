import React,{Component} from  'react';
import "bootstrap/dist/css/bootstrap.min.css";


const ipcim = 'localhost:8080'

class Proba extends Component {
  constructor(props) {
    super(props);
    this.katt = this.katt.bind(this);
    this.state = {
      dataSource:[],
      isLoading:true
    }
    
  }

  async componentDidMount(){
    const url = 'http://'+ipcim+'/sorozat'
    const response = await fetch(url)
    const data = await response.json();
    this.setState({
      dataSource: data,
      isLoading: false
    })

    console.log(this.state.dataSource)

  }


 
  katt(szam) {
    alert(szam)
  }

  render() {
    return(
      <div>
        {this.state.isLoading || !this.state.dataSource ? (
          <div>Loading</div>
        ) : (
          <div >
            {
              this.state.dataSource.map(item =>{
                return (
                  <div key={item.sorozat_id}>
                    <div>{item.sorozat_cim}</div>
                    <div>{item.sorozat_ev}</div>
                    <img 
                    src={'http://'+ipcim+'/kepek/'+item.sorozat_kep} 
                    alt='kep' 
                    width={100} height={100}

                    />
                    <button className='btn btn-primary' onClick={()=>this.katt(item.sorozat_id)}>Katt</button>
                  </div>
                  

                )
              }
              )
            }
          </div>
        )}
      </div>
    )
  }
}

export default Proba