import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image, ImageBackground, TouchableOpacity, Dimensions, ScrollView,Modal,Pressable,TextInput,StyleSheet  } from 'react-native-web';
import Iframe from 'react-iframe'

var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;
const ipcim="localhost:8080";


export default class Kezdooldal extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      legfrisebbfilm:[],
      legfrissebbsorozat:[],
      legnezettebbsorozat:[],
      legnezettebbfilm:[],
      sorozatsajatadatok:[],
      filmsajatadatok:[],
      sorozatkommentek:[],
      filmkommentek:[],
      sorozatlink:[],
      filmlink:[],
      komment:"",
      nev:"",
      sorozatid:0,
      sorozatcim:"",
      filmid:0,
      filmcim:"",
      modalVisible:false,
      modalVisible2:false,

    }
    
    
  }

  componentDidMount(){
  fetch('http://'+ipcim+'/legfrissebbfilmek')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          legfrissebbfilm: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });

      fetch('http://'+ipcim+'/legfrissebbsorozatok')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          legfrissebbsorozat: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });

    
      fetch('http://'+ipcim+'/legnezettebbsorozatok')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          legnezettebbsorozat: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });

      fetch('http://'+ipcim+'/legnezettebbfilmek')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          legnezettebbfilm: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });

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
          sorozatlink: responseJson,
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
            sorozatkommentek: responseJson,
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
            sorozatsajatadatok: responseJson,
          }, function(){
    
          });
        })
        .catch((error) =>{
          console.error(error);
        });
      }

      felvitel = ()=> {
        let bemenet={
          bevitel1:this.state.nev,
          bevitel2:this.state.komment,
          bevitel3:this.state.sorozatid
        }
    
        let bemenet1 = {
          bevitel3:this.state.sorozatid
        }
        fetch('http://'+ipcim+'/kommentfelvitel', {
          method: "POST",
          body: JSON.stringify(bemenet),
          headers: {"Content-type": "application/json; charset=UTF-8"}
          } )
          .then((response) => response.text())
          .then(() => {
            
            fetch('http://'+ipcim+'/kommentek', {
              method: "POST",
              body: JSON.stringify(bemenet1),
              headers: {"Content-type": "application/json; charset=UTF-8"}
              } )
              .then((response) => response.json())
              .then((responseJson) => {
          
                this.setState({
                  isLoading: false,
                  sorozatkommentek: responseJson,
                }, function(){
          
                });
              })
              .catch((error) =>{
                console.error(error);
              });
            
      
          })
          .catch((error) =>{
            console.error(error);
          });
    
          this.setState({komment:""})
          this.setState({nev:""})
        }

      setModalVisible2 = (id,cim) => {
        this.setState({
          filmid: id,
          modalVisible2:true,
          filmcim:cim,
        })
    
        let bemenet = {
          bevitel1:id
        }
    
        fetch('http://'+ipcim+'/filmlink', {
          method: "POST",
          body: JSON.stringify(bemenet),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              filmlink: responseJson,
            }, function(){
     
            });
     
          })
          .catch((error) =>{
            console.error();
          });
    
          let bemenet1 = {
            bevitel3:id
          }
          fetch('http://'+ipcim+'/filmkommentek', {
            method: "POST",
            body: JSON.stringify(bemenet1),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            } )
            .then((response) => response.json())
            .then((responseJson) => {
        
              this.setState({
                isLoading: false,
                filmkommentek: responseJson,
              }, function(){
        
              });
            })
            .catch((error) =>{
              console.error(error);
            });
    
            fetch('http://'+ipcim+'/filmsajatadatok', {
            method: "POST",
            body: JSON.stringify(bemenet1),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            } )
            .then((response) => response.json())
            .then((responseJson) => {
        
              this.setState({
                isLoading: false,
                filmsajatadatok: responseJson,
              }, function(){
        
              });
            })
            .catch((error) =>{
              console.error(error);
            });
      }

      felvitel2 = ()=> {
        let bemenet={
          bevitel1:this.state.nev,
          bevitel2:this.state.komment,
          bevitel3:this.state.filmid
        }
    
        let bemenet1 = {
          bevitel3:this.state.filmid
        }
        fetch('http://'+ipcim+'/filmkommentfelvitel', {
          method: "POST",
          body: JSON.stringify(bemenet),
          headers: {"Content-type": "application/json; charset=UTF-8"}
          } )
          .then((response) => response.text())
          .then(() => {
    
            fetch('http://'+ipcim+'/filmkommentek', {
              method: "POST",
              body: JSON.stringify(bemenet1),
              headers: {"Content-type": "application/json; charset=UTF-8"}
              } )
              .then((response) => response.json())
              .then((responseJson) => {
          
                this.setState({
                  isLoading: false,
                  filmkommentek: responseJson,
                }, function(){
          
                });
              })
              .catch((error) =>{
                console.error(error);
              });
            
          })
          .catch((error) =>{
            console.error(error);
          });
    
          this.setState({komment:""})
          this.setState({nev:""})
    
     
         
    
         
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

      <ScrollView style={{flex:1, paddingTop:20,backgroundColor:"#262626",flexDirection:'column'}}>
        <View style={{height:height*0.6,margin:5}}>
          <Text style={{margin:5}}>
          <Text style={{color:'white', fontSize:17, textAlign:'left', marginLeft:10, fontWeight:'bold'}}>Legújabb</Text>
          <Text style={{color:'white', fontSize:17, textAlign: 'left'}}> Sorozatok</Text>
          </Text>
          <FlatList 
            style={{height:60}}
            showsHorizontalScrollIndicator={false}
            data={this.state.legfrissebbsorozat}
            horizontal
            //numColumns={2}
            keyExtractor={({sorozat_id}, index) => sorozat_id}
            renderItem={({item}) => 
              <TouchableOpacity onPress={async()=>this.setModalVisible(item.sorozat_id,item.sorozat_cim)}>
              <Image 
              source={{uri:'http://'+ipcim+'/kepek/'+item.sorozat_kep}}
              style={{width:200,height:280,margin:5,borderRadius:15}}
              />
              <Text style={{color:"white",fontSize:16,fontWeight:"bold",textAlign:"center", width:135, }}>{item.sorozat_cim}</Text>
              </TouchableOpacity>

    
          }
          />
          </View>

          <View style={{height:height*0.6,margin:5}}>
          <Text style={{margin:5}}>
          <Text style={{color:'white', fontSize:17, textAlign:'left', marginLeft:10, fontWeight:'bold'}}>Legnézettebb</Text>
          <Text style={{color:'white', fontSize:17, textAlign: 'left'}}> Sorozatok</Text>
          </Text>
          <FlatList 
            style={{height:60}}
            showsHorizontalScrollIndicator={false}
            data={this.state.legnezettebbsorozat}
            horizontal
            //numColumns={2}
            keyExtractor={({sorozat_id}, index) => sorozat_id}
            renderItem={({item}) =>
              <TouchableOpacity onPress={async()=>this.setModalVisible(item.sorozat_id,item.sorozat_cim)} >
              <Image 
              source={{uri:'http://'+ipcim+'/kepek/'+item.sorozat_kep}}
              style={{width:200,height:280,margin:5,borderRadius:15}}
              />
              <Text style={{color:"white",fontSize:16,fontWeight:"bold",textAlign:"center", width:135, }}>{item.sorozat_cim}</Text>
              </TouchableOpacity>

    
          }
          />
          </View>

          <View style={{height:height*0.6,margin:5}}>
          <Text style={{margin:5}}>
          <Text style={{color:'white', fontSize:17, textAlign:'left', marginLeft:10, fontWeight:'bold'}}>Legnézettebb</Text>
          <Text style={{color:'white', fontSize:17, textAlign: 'left'}}> Filmek</Text>
          </Text>
          <FlatList 
            style={{height:60}}
            showsHorizontalScrollIndicator={false}
            data={this.state.legnezettebbfilm}
            horizontal
            //numColumns={2}
            keyExtractor={({film_id}, index) => film_id}
            renderItem={({item}) =>
              <TouchableOpacity onPress={async()=>this.setModalVisible2(item.film_id,item.film_cim)} >
              <Image 
              source={{uri:'http://'+ipcim+'/kepek/'+item.film_kep}}
              style={{width:200,height:280,margin:5,borderRadius:15}}
              />
              <Text style={{color:"white",fontSize:16,fontWeight:"bold",textAlign:"center", width:135, }}>{item.film_cim}</Text>
              </TouchableOpacity>

    
          }
          />
          </View>

          <View style={{height:height*0.6,margin:5}}>
          <Text style={{paddingBottom:5, marginLeft:10}}> 
          <Text style={{color:'white', fontSize:17, textAlign:'left', marginLeft:10, fontWeight:'bold',paddingBottom:5,}}>Legújabb</Text>
          <Text style={{color:'white', fontSize:17, textAlign: 'left', paddingBottom:5}}> Filmek </Text>
          </Text>
          <FlatList 
          style={{height:60}}
          showsHorizontalScrollIndicator={false}
          data={this.state.legfrissebbfilm}
          horizontal
          keyExtractor={({film_id}) => film_id}
          renderItem={({item}) =>
            <TouchableOpacity onPress={async()=>this.setModalVisible2(item.film_id,item.film_cim)}>
            <Image 
            source={{uri:'http://'+ipcim+'/kepek/'+item.film_kep}}
            style={{width:200,height:280,margin:5,borderRadius:15}}
            />        
            <Text style={{color:"white",fontSize:13,fontWeight:"bold",textAlign:"center", width:125, alignItems:'center' }}>{item.film_cim}</Text>
            </TouchableOpacity>
  
          }
          />
          </View>

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
                data={this.state.sorozatlink}
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
                data={this.state.sorozatsajatadatok}
                keyExtractor={({sorozat_id}) => sorozat_id} 
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
          style={{borderWidth:1,padding:5,marginBottom:10,color:"black",backgroundColor:"lightgrey",borderRadius:15,borderColor:"transparent",width:300,height:50,marginLeft:30}}
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

        {this.state.sorozatkommentek.length === 0 ? <Text style={{color:"white",fontSize:22,textAlign:"center"}}>Ehhez a sorozathoz még nincsenek kommentek</Text> :<FlatList
          data={this.state.sorozatkommentek}
          keyExtractor={({komment_id}) => komment_id} 
          renderItem={({item}) =>
          <View style={{borderWidth:1,width:150,borderColor:"transparent",borderRadius:10,padding:8,backgroundColor:"lightgrey",margin:7,marginLeft:15}}>
            <Text style={{color:"black",fontWeight:"bold",fontSize:15}}>{item.komment_nev}</Text>
            <Text style={{fontSize:17}}>{item.komment_szoveg}</Text>
            
          </View>
        }
        />
        }
                </View>
              </View>
              </ScrollView>
          </Modal>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible2}
          >
            
              <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <Pressable
                  style={styles.button}
                  onPress={() => this.setState({modalVisible2 : false})}
                >
                  <Text style={styles.textStyle}>X</Text>
                  
                </Pressable>
                
               <View style={styles.modalView}>
                <View style={{alignItems:"center",justifyContent:"center"}}>
                <FlatList
                data={this.state.filmlink}
                keyExtractor={({film_id}) => film_id}
                
                renderItem={({item}) => 

                <View>
                  {item.film_link === "" ? <Text>Nincs link</Text>:
                  <Iframe
                  url ={item.film_link}
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
                <Text style={{color:"white",fontSize:25,textAlign:"center"}}>{this.state.filmcim}</Text>
                <FlatList
                data={this.state.filmsajatadatok}
                keyExtractor={({film_id}) => film_id} 
                renderItem={({item}) =>
            <View style={{margin:10}} >
              <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold"}}>Leírás:</Text>
            <Text style={{fontSize:15,color:"white",padding:2}}>{item.film_leiras}</Text>
            <Text style={{fontSize:22,color:"#2596be",fontWeight:"bold",marginTop:2}}>További infók:</Text>
            <Text>
              <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Műfaj: </Text>
              <Text style={{fontSize:16,color:"white"}}>{item.mufaj_nev}</Text>
            </Text>
            <Text>
              <Text style={{fontSize:16,color:"white",fontWeight:"bold"}}>Megjelenés dátuma: </Text>
              <Text style={{fontSize:16,color:"white"}}>{item.film_ev}</Text>
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
          style={{borderWidth:1,padding:5,marginBottom:10,color:"black",backgroundColor:"lightgrey",borderRadius:15,borderColor:"transparent",width:300,height:50,marginLeft:30}}
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
        onPress={()=> this.felvitel2()}
        >
          
          <Text style={{textAlign:"center",fontSize:19,color:"white"}}>Mehet</Text>
        </TouchableOpacity>
        }

        {this.state.filmkommentek.length === 0 ? <Text style={{color:"white",fontSize:22,textAlign:"center"}}>Ehhez a filmhez még nincsenek kommentek</Text> : <FlatList
          data={this.state.filmkommentek}
          keyExtractor={({film_komment_id}) => film_komment_id} 
          renderItem={({item}) =>
          <View style={{borderWidth:1,width:150,borderColor:"transparent",borderRadius:10,padding:8,backgroundColor:"lightgrey",margin:7,marginLeft:15}}>
            <Text style={{color:"black",fontWeight:"bold",fontSize:15}}>{item.film_komment_nev}</Text>
            <Text style={{fontSize:17}}>{item.film_komment_szoveg}</Text>
            
          </View>
        }
        />
        }
                </View>
              </View>
              </ScrollView>
          </Modal>
        
      </ScrollView>
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
