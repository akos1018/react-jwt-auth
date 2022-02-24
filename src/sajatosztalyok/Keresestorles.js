import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity, TextInput, Dimensions } from 'react-native-web';
var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

const ipcim="localhost:8080";

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
        isLoading: true,
        dataSource:[],
        dataSource2:[],
        szoveg:'',
        szoveg2:''
    }
  }

  componentDidMount(){
    document.body.style.backgroundColor = "#262626" 
  }

  
  kereses= () =>{
    let bemenet ={
      bevitel1:this.state.szoveg,
    }
    fetch('http://'+ipcim+'/osszessorozatkomment', {
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
   
          });
   
        })
        .catch((error) =>{
          console.error(error);
        });
    
      }
      
    kereses2= () =>{
      let bemenet2 ={
        bevitel2:this.state.szoveg2,
      }
      fetch('http://'+ipcim+'/osszesfilmkomment', {
          method: "POST",
          body: JSON.stringify(bemenet2),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        }
        )
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
        sorozatkommenttorles=(szam)=>{
          //alert(szam)
          var bemenet={
            bevitel1:szam
          }
      
        fetch('http://'+ipcim+'/sorozatkommenttorles', {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          }
        
        )
        .then(x => x.text())
        .then(y => alert("Törölve"));
      
        }
      
        filmkommenttorles=(szam)=>{
          //alert(szam)
          var bemenet={
            bevitel1:szam
          }
      
        fetch('http://'+ipcim+'/filmkommenttorles', {
            method: "POST",
            body: JSON.stringify(bemenet),
            headers: {"Content-type": "application/json; charset=UTF-8"}
          }
        
        )
        .then(x => x.text())
        .then(y => alert(y));
      
        }


  render(){

    return(
    <View style={{alignItems:'center'}}> 
      <View style={{alignItems:'center', backgroundColor:"", borderRadius:20, width:width*0.3, justifyContent:'center'}}>

      <View style={{flex: 1, paddingTop:20}}>
        <Text style={{textAlign:'center', color:"white", fontSize:25}}>Sorozat kommentek törlése</Text>
       <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', flexDirection:"row"}}>
        <TextInput
        placeholderTextColor="black"
        style={{height: 45,backgroundColor:"#DCDCDC", borderRadius:10, padding:10, width:240,margin:20,marginRight:10, textAlign:"center",}}
        placeholder="Keresés"
        onChangeText={(szoveg) => this.setState({szoveg})}
        value={this.state.szoveg}
        />
        <TouchableOpacity 
          onPress={ ()=>this.kereses()}>
          <View style={{width:85,height:50,backgroundColor:"#2596be", borderRadius:10,height:45, alignItems:'center', justifyContent:'center'}}>
        
            <Text>Keresés</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={this.state.dataSource}
        keyExtractor={({komment_id}) => komment_id}
        renderItem={({item}) => 
        <View style={{justifyContent:'center', borderWidth:1,width:150,borderColor:"transparent",borderRadius:10,padding:8,backgroundColor:"lightgrey",margin:7,marginLeft:15}}>
            <Text style={{color:"black",fontWeight:"bold",fontSize:15}}>{item.komment_nev}</Text>
            <Text style={{fontSize:17}}>{item.komment_szoveg}</Text>
            <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.sorozatkommenttorles(item.komment_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:13}} >Törlés</Text>
      </TouchableOpacity>
        </View>
         }
        />
      </View>
      <View style={{flex: 1, paddingTop:20}}>
        <Text style={{textAlign:'center', color:"white", fontSize:25}}>Film kommentek törlése</Text>
       <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', flexDirection:"row"}}>
        <TextInput
        placeholderTextColor="black"
        style={{height: 45,backgroundColor:"#DCDCDC", borderRadius:10, padding:10, width:240,margin:20,marginRight:10, textAlign:"center", }}
        placeholder="Keresés"
        onChangeText={(szoveg2) => this.setState({szoveg2})}
        value={this.state.szoveg2}
        />
        <TouchableOpacity 
          onPress={ ()=>this.kereses2()}>
          <View style={{width:85,height:50,backgroundColor:"#2596be", borderRadius:10,height:45, alignItems:'center', justifyContent:'center'}}>
        
            <Text>Keresés</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={this.state.dataSource2}
        keyExtractor={({film_komment_id}) => film_komment_id}
        renderItem={({item}) => 
        <View style={{justifyContent:'center', borderWidth:1,width:150,borderColor:"transparent",borderRadius:10,padding:8,backgroundColor:"lightgrey",margin:7,marginLeft:15}}>
            <Text style={{color:"black",fontWeight:"bold",fontSize:15}}>{item.film_komment_nev}</Text>
            <Text style={{fontSize:17}}>{item.film_komment_szoveg}</Text>
            <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.filmkommenttorles(item.komment_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}} >Komment törlés</Text>
      </TouchableOpacity>
        </View>
         }
        />
      </View>
    </View>  

  </View>  

    );
    
  }
  
}
const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "blue",
    width:50,
    height:25,
    marginLeft:"auto",
    marginRight:"auto",
    textAlign:'center',
    justifyContent:'center'
  }
});
