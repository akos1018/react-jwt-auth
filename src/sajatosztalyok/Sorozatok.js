import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image,TouchableOpacity,TextInput,Dimensions,StyleSheet,Modal,Pressable,ScrollView } from 'react-native-web';
import Iframe from 'react-iframe';






const ipcim="localhost:8080";

export default class Sorozat extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      cim:'',
      modalVisible:false,
      sorozatid:0,
      dataSource4:[],
      sorozatcim:"",
      korabbi:[],
      komment:"",
      nev:"",
      starCount:0
      

      
    }
  }

  setModalVisible = (id,cim) => {
    this.setState({
      sorozatid: id,
      modalVisible:true,
      sorozatcim:cim,
    })

    let bemenet = {
      bevitel1:id
    }

    fetch('http://'+ipcim+'/sorozatlink', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource4: responseJson,
        }, function(){
 
        });
 
      })
      .catch((error) =>{
        console.error();
      });

      let bemenet1 = {
        bevitel3:id
      }
      fetch('http://'+ipcim+'/kommentek', {
        method: "POST",
        body: JSON.stringify(bemenet1),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        } )
        .then((response) => response.json())
        .then((responseJson) => {
    
          this.setState({
            isLoading: false,
            dataSource3: responseJson,
          }, function(){
    
          });
        })
        .catch((error) =>{
          console.error(error);
        });

        fetch('http://'+ipcim+'/sorozatsajatadatok', {
        method: "POST",
        body: JSON.stringify(bemenet1),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        } )
        .then((response) => response.json())
        .then((responseJson) => {
    
          this.setState({
            isLoading: false,
            dataSource5: responseJson,
          }, function(){
    
          });
        })
        .catch((error) =>{
          console.error(error);
        });


  }
  

  
  componentDidMount(){
    document.body.style.backgroundColor = "#262626"
    let bemenet1 = {
      bevitel3:this.state.sorozatid
    }
    fetch('http://'+ipcim+'/kommentek', {
      method: "POST",
      body: JSON.stringify(bemenet1),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.json())
      .then((responseJson) => {
  
        this.setState({
          isLoading: false,
          dataSource3: responseJson,
        }, function(){
  
        });
      })
      .catch((error) =>{
        console.error(error);
      });
    
  

     fetch('http://'+ipcim+'/sorozat')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });


      })
      .catch((error) =>{
        console.error(error);
      });

      fetch('http://'+ipcim+'/mufaj')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource2: responseJson,
        }, function(){

        });
        

      })

      
      .catch((error) =>{
        console.error(error);
      });
      
  }

 
  

  felvitel = ()=>{
    let bemenet={
      bevitel1:this.state.nev,
      bevitel2:this.state.komment,
      bevitel3:this.state.sorozatid

    }
    fetch('http://'+ipcim+'/kommentfelvitel', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.text())
      .then(() => {

      })
      .catch((error) =>{
        console.error(error);
      });

      this.setState({komment:""})
      this.setState({nev:""})

      let bemenet1 = {
        bevitel3:this.state.sorozatid
      }
      fetch('http://'+ipcim+'/kommentek', {
        method: "POST",
        body: JSON.stringify(bemenet1),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        } )
        .then((response) => response.json())
        .then((responseJson) => {
    
          this.setState({
            isLoading: false,
            dataSource3: responseJson,
          }, function(){
    
          });
        })
        .catch((error) =>{
          console.error(error);
        });
      

     
    }

  

  kereses=async () =>{
    //alert(this.state.cim)
    let bemenet ={
      bevitel1:this.state.cim,


    }
    fetch('http://'+ipcim+'/kereses', {
     method: "POST",
     body: JSON.stringify(bemenet),
     headers: {"Content-type": "application/json; charset=UTF-8"}
   }
   )
     .then((response) => response.json())
     .then((responseJson) => {
       this.setState({
         isLoading: false,
         dataSource: responseJson,
       }, function(){
        //alert(JSON.stringify(this.state.dataSource))

       });

     })
     .catch((error) =>{
       console.error(error);
     });

 
   }

   kivalaszt = async(szam)=>{
    //alert(szam)
    this.setState({aktmufaj:szam})
    let bemenet={
      bevitel2:szam
    }
    return fetch('http://'+ipcim+'/sorozatszures', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

        
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  osszes= async() =>
  {
    fetch('http://'+ipcim+'/sorozat')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });


  }


  
 


  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return(
      
      <View style={{flex:1,paddingTop:20,backgroundColor:"#262626",justifyContent:"center",alignItems:"center",paddingBottom:10,}}>

        <View style={{flexDirection:'row'}}>
        <TextInput
        placeholderTextColor="black"
        style={{height: 35,backgroundColor:"#DCDCDC", borderRadius:10, padding:10, width:240,margin:20,marginRight:10, textAlign:"center", }}
        placeholder="Keresés"
        onChangeText={(cim) => this.setState({cim})}
        value={this.state.cim}
        />

        <TouchableOpacity 
          onPress={async ()=>this.kereses()}>
          <View style={{width:85,height:35,backgroundColor:"#2596be", borderRadius:10,padding:5,marginTop:20, marginRight:20}}>
        
            <Text style={{textAlign:"center",paddingTop:3}}>Keresés</Text>
          </View>
        </TouchableOpacity>
        </View>
        
        <View style={{height:50, marginBottom:10,flexDirection:'row', }}>

  <TouchableOpacity
      style={{borderWidth:1,borderRadius:10,height:30,margin:5,width:100,marginTop:13, backgroundColor:"#2596be",marginLeft:16}}
      onPress={async ()=>this.osszes()}
      >
    <Text style={{textAlign:"center",fontSize:15,color:"white", paddingTop:3,}}>Összes</Text>
    </TouchableOpacity>


  <FlatList
    data={this.state.dataSource2}
    horizontal
    showsHorizontalScrollIndicator={true}
    style={{marginRight:17, marginLeft:10}} 
    renderItem={({item}) => 
    <View style={{alignItems:"center",marginTop:25,flexDirection:'row',marginBottom:19,flex:1,flexWrap:"wrap" }}>
    
      <TouchableOpacity
      style={{borderWidth:1,borderRadius:10,width:100,height:27,margin:5,backgroundColor:"#262626", borderColor:"white", }}
      onPress={async ()=>this.kivalaszt(item.mufaj_id)}
      >
      
    
    <Text style={{textAlign:"center",fontSize:15,color:"white", marginTop:1}}>{item.mufaj_nev} </Text>
    </TouchableOpacity>
    </View>

  }
    keyExtractor={({mufaj_id}, index) => mufaj_id}
  />

  </View>      

        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.dataSource}
          keyExtractor={({sorozat_id}) => sorozat_id} 
          contentContainerStyle={{flex:1,flexDirection : "row", flexWrap : "wrap", justifyContent:'center', alignItems:'center',}} 
          renderItem={({item}) =>
          <View style={{flex:1, alignItems:'center', textAlign:'center', justifyContent:'center'}} >
            <TouchableOpacity onPress={async()=>this.setModalVisible(item.sorozat_id,item.sorozat_cim)}>
            <Image 
            source={{uri:'http://'+ipcim+'/kepek/'+item.sorozat_kep}}
            style={{width:200,height:280,marginRight:10,marginTop:10,marginLeft:10,borderRadius:15}}
            />
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:16,fontWeight:"bold",width:180,height:40}}>{item.sorozat_cim}</Text>
            </TouchableOpacity>
            
            
          </View>
        }
        />
        
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
          >
            
              <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <Pressable
                  style={styles.button}
                  onPress={() => this.setState({modalVisible : false})}
                >
                  <Text style={styles.textStyle}>X</Text>
                  
                </Pressable>
                
               <View style={styles.modalView}>
                <View style={{alignItems:"center",justifyContent:"center"}}>
                <FlatList
                data={this.state.dataSource4}
                keyExtractor={({sorozat_id}) => sorozat_id}
                
                renderItem={({item}) => 

                <View>
                  {item.sorozat_link === "" ? <Text>Nincs link</Text>:
                  <Iframe
                  url ={item.sorozat_link}
                  width="850px"
                  height="450px"
                  id="MyId"
                  className="MyClassName"
                  display = "initial"
                  position = "relative"
                  />
                }
                </View>
              }
              />
              
              </View>
              
              <View style={styles.infok}>
                <Text style={{color:"white",fontSize:25,textAlign:"center"}}>{this.state.sorozatcim}</Text>
                <FlatList
                data={this.state.dataSource5}
                keyExtractor={({komment_id}) => komment_id} 
                renderItem={({item}) =>
            <View style={{margin:10}} >
              <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold"}}>Leírás:</Text>
            <Text style={{fontSize:15,color:"white",padding:2}}>{item.sorozat_leiras}</Text>
            <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold",marginTop:2}}>További infók:</Text>
            <Text>
              <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Műfaj: </Text>
              <Text style={{fontSize:16,color:"white"}}>{item.mufaj_nev}</Text>
            </Text>
            <Text>
              <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Eredeti sugárzás: </Text>
              <Text style={{fontSize:16,color:"white"}}>{item.sorozat_ev}</Text>
            </Text>
            <Text>
              <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Évadok száma: </Text>
              <Text style={{fontSize:16,color:"white"}}>{item.sorozat_evadszam}</Text>
            </Text>
            <Text>
              <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Epizódok száma: </Text>
              <Text style={{fontSize:16,color:"white"}}>{item.sorozat_epizodszam}</Text>
            </Text>
            <Text>
              <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Részenkénti idő: </Text>
              <Text style={{fontSize:16,color:"white"}}>{item.sorozat_hossz} perc</Text>
            </Text>
            <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold",marginTop:2}}>Kommentek:</Text>
              
              
            </View>
          }
          />
          <TextInput
          style={{borderWidth:1,padding:5,marginBottom:10,color:"black",backgroundColor:"lightgrey",borderRadius:15,borderColor:"transparent",width:100,marginLeft:30}}
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
          multiline={true}
          placeholder='Név'
        />

        <TextInput
          style={{borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderRadius:15,borderColor:"transparent",color:"black",width:300,height:50,marginLeft:30}}
          onChangeText={(komment) => this.setState({komment})}
          value={this.state.komment}
          multiline={true}
          placeholder='Hozzászólás irása'
        />
        
        {this.state.nev === "" || this.state.komment === "" ?
         <TouchableOpacity 
         style={{borderWidth:1,width:200,alignSelf:"center",borderColor:"transparent",borderRadius:6,padding:2,backgroundColor:"grey",marginBottom:10}}
         >
           
           <Text style={{textAlign:"center",fontSize:19,color:"white"}}>Az egyik mezőt üresen hagytad</Text>
         </TouchableOpacity>
        :
        <TouchableOpacity 
        style={{borderWidth:1,width:100,alignSelf:"center",borderColor:"transparent",borderRadius:6,padding:2,backgroundColor:"grey",marginBottom:10}}
        onPress={()=> this.felvitel()}
        >
          
          <Text style={{textAlign:"center",fontSize:19,color:"white"}}>Mehet</Text>
        </TouchableOpacity>
        }

        
        <FlatList
          data={this.state.dataSource3}
          keyExtractor={({komment_id}) => komment_id} 
          renderItem={({item}) =>
          <View style={{borderWidth:1,width:150,borderColor:"transparent",borderRadius:10,padding:8,backgroundColor:"lightgrey",margin:7,marginLeft:15}}>
            <Text style={{color:"black",fontWeight:"bold",fontSize:15}}>{item.komment_nev}</Text>
            <Text style={{fontSize:17}}>{item.komment_szoveg}</Text>
            
          </View>
        }
        />


                </View>
              </View>
              </ScrollView>
          </Modal>
        
        </View>
      
      


    );
  }
}
const styles = StyleSheet.create({
  modalView: {
    borderRadius:5,
    backgroundColor:"#181818",
    margin:20,
    width:850,
    flex:1,
    alignSelf:"center",
  },

  infok:{
    padding:30,
  },

  button: {
    padding:10,
    backgroundColor:"#2596be",
    width:40,
    height:40,
    margin:8,
    borderRadius:50
    
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    textAlign: "center",
  }
});
