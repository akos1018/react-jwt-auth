import React from 'react';
import { FlatList, ActivityIndicator, Text, View,Image,TouchableOpacity,TextInput,Dimensions, Modal  } from 'react-native-web';

var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

const ipcim="localhost:8080";

export default class Filmek extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      cim:'',
      aktmufaj:1,
      show:false,

      
    }
  }

  
  componentDidMount(){
    document.body.style.backgroundColor = "#262626"

     fetch('http://'+ipcim+'/film')
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

      fetch('http://'+ipcim+'/filmmufaj')
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

  kereses=async () =>{
    //alert(this.state.cim)
    let bemenet ={
      bevitel1:this.state.cim,


    }
    fetch('http://'+ipcim+'/filmkereses', {
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
    return fetch('http://'+ipcim+'/filmszures', {
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
    fetch('http://'+ipcim+'/film')
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
        style={{height: 45,backgroundColor:"#DCDCDC", borderRadius:10, padding:10, width:240,margin:20,marginRight:10, textAlign:"center", }}
        placeholder="Keresés"
        onChangeText={(cim) => this.setState({cim})}
        value={this.state.cim}
        />

        <TouchableOpacity 
          onPress={async ()=>this.kereses()}>
          <View style={{width:85,height:50,backgroundColor:"#2596be", borderRadius:10,padding:5,marginTop:20, height:45,marginRight:20}}>
        
            <Text>Keresés</Text>
          </View>
        </TouchableOpacity>
        </View>
        
        <View style={{height:50, marginBottom:10,flexDirection:'row', }}>

  <TouchableOpacity
      style={{borderWidth:1,borderRadius:10,width:80,height:30,margin:5,width:100,marginTop:13, backgroundColor:"#2596be",marginLeft:16}}
      onPress={async ()=>this.osszes()}
      >
    <Text style={{textAlign:"center",fontSize:15,color:"white", paddingTop:3,}}>Összes</Text>
    </TouchableOpacity>

  <FlatList
    data={this.state.dataSource2}
    horizontal
    contentContainerStyle={{flexDirection : "row", flexWrap : "wrap", justifyContent:'center', alignItems:'center',}} 
    //showsHorizontalScrollIndicator={false}
    style={{marginRight:17, marginLeft:10}}
    renderItem={({item}) => 
    <View style={{alignItems:"center",marginTop:10,flexDirection:'row',marginBottom:19 }}>
    
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
          <View style={{flex:1, alignItems:'center', textAlign:'center', justifyContent:'center'}}>
            <TouchableOpacity onPress={()=>{this.setState({show:true})}}>
            <Image 
            source={{uri:'http://'+ipcim+'/kepek/'+item.film_kep}}
            style={{width:200,height:280,marginRight:10,marginTop:10,marginLeft:10,borderRadius:15}}
            />
            <Text style={{color:"white",marginLeft:15,marginTop:5,fontSize:16,fontWeight:"bold",width:180, height:40}}>{item.film_cim}</Text>
            </TouchableOpacity>
            <Modal
            transparent={true}
            visible={this.state.show}
            animationType={""}
            >
            <View style={{backgroundColor:"#000000aa", flex:1}}>
                <View style={{backgroundColor:"white",margin:50, padding:20, borderRadius:10}}>
                <Text style={{fontSize:20, textAlign:'center', fontWeight:"bold"}}>Készítette:</Text>

                <View style={{flexDirection:"row", alignItems:'center',marginRight:40, marginLeft:25}}>
                <Text style={{fontSize:20, textAlign:'center', marginTop:30}}>Ákos Zsombor</Text>
                </View>

                <View style={{flexDirection:"row", alignItems:'center',marginRight:40, marginLeft:25}}>
                <Text style={{fontSize:20, textAlign:'center', marginTop:10}}>Faragó Ádám</Text>
                </View>
                <View>
                <Text style={{fontSize:10, textAlign:'center', top:90,position:'absolute', left:20}}>2022</Text>

                </View>
                
                
                <TouchableOpacity onPress={()=>{this.setState({show:false})}}>
                <View style={{alignItems:"center", marginTop:70,}}>
                  <Text>bezárás </Text>
            </View>
            </TouchableOpacity>
                </View>

            </View>
            </Modal>
            
          </View>
        }
        />
      </View>


    );
  }
}