import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native-web';


const ipcim="localhost:8080";

export default class Adattorles extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

 



  componentDidMount(){
    document.body.style.backgroundColor = "#262626"

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

      fetch('http://'+ipcim+'/film')
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

  torles=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch('http://'+ipcim+'/sorozattorles', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(() =>{
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
  });
  alert("Sikeres törlés")

 
  }

  filmtorles=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch('http://'+ipcim+'/filmtorles', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(() =>{
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
      <View style={{flex: 1, padding:20, flexDirection:"row"}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View >
              <Text style={{color:"white",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.sorozat_cim} </Text>
            <Image 
            source={{uri:'http://'+ipcim+'/kepek/'+item.sorozat_kep}}
            style={{width:200,height:280,marginRight:10,marginTop:10,marginLeft:"auto", marginRight:"auto",borderRadius:15,}}
            />
          <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.torles(item.sorozat_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Törles</Text>
      </TouchableOpacity>
          </View>
        
        }

        
          keyExtractor={({sorozat_id}, index) => sorozat_id}
        />

        <FlatList
          data={this.state.dataSource2}
          renderItem={({item}) => 

          <View >
              <Text style={{color:"white",fontSize:20,textAlign:"center",marginTop:15,marginBottom:5}}   >{item.film_cim} </Text>
            <Image 
            source={{uri:'http://'+ipcim+'/kepek/'+item.film_kep}}
            style={{width:200,height:280,marginRight:10,marginTop:10,marginLeft:"auto", marginRight:"auto",borderRadius:15,}}
            />
          <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.torles(item.film_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Törles</Text>
      </TouchableOpacity>
          </View>
        
        }

        
          keyExtractor={({film_id}, index) => film_id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor:"#2596be",
    padding: 10,
    width:200,
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:10
  }
});