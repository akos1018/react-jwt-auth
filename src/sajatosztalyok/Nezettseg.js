import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native-web';


const ipcim="localhost:8080";

export default class Nezettseg extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
        isLoading: true
    }
  }

 



  componentDidMount(){
    fetch('http://'+ipcim+'/sorozatnezetsseg')
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
        <View style={{padding:20,backgroundColor:"#262626"}}>
        <Text style={{textAlign:"center",fontSize:25,color:"white"}}>Sorozat és filmek nézettsége</Text>
        <FlatList 
        data={this.state.dataSource}
        keyExtractor={({sorozat_id}) => sorozat_id}
        renderItem={({item}) =>
        <View style={{flexDirection:"row",borderColor:"red",flex:1}}>
            <View style={{borderWidth:1,borderColor:"red",width:200,padding:10,}}>
                <Text style={{fontSize:20,color:"white"}}>{item.sorozat_cim}</Text>
            </View>
            <View style={{borderWidth:1,borderColor:"",width:50,padding:10}}>
                <Text style={{fontSize:20,color:"white"}}>{item.sorozat_kattintas}</Text>

            </View>
        </View>


      }
      />
      </View>
    );
  }
}

