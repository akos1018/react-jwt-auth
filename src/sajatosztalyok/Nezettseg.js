import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native-web';


const ipcim="localhost:8080";

export default class Nezettseg extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
        isLoading: true,
        dataSource:[],
        dataSource2:[]
    }
  }

 



  componentDidMount(){
    fetch('http://'+ipcim+'/sorozatnezettseg')
      .then((response) => response.json())
      .then((responseJson) => {
        var elso = {
            "sorozat_cim":"Sorozat címe",
            "sorozat_kattintas":"Kattintások száma"
        }
        responseJson.unshift(elso)

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });


      })
      .catch((error) =>{
        console.error(error);
      });

      fetch('http://'+ipcim+'/filmnezettseg')
      .then((response) => response.json())
      .then((responseJson) => {
        var elso = {
            "film_cim":"Film címe",
            "film_kattintas":"Kattintások száma"
        }

        responseJson.unshift(elso)
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
            <Text style={{textAlign:"center",fontSize:25,color:"white",margin:10,marginBottom:10}}>Sorozatok és filmek nézettsége</Text>
            <View style={{flexDirection:"row"}}>
                    <FlatList 
                    data={this.state.dataSource}
                    keyExtractor={({sorozat_id}) => sorozat_id}
                    renderItem={({item}) =>
                    <View style={{flexDirection:"row",borderColor:"#2596be",flex:1,alignSelf:"center"}}>
                        <View style={{borderWidth:2,borderColor:"#2596be",width:200,padding:10,}}>
                            <Text style={{fontSize:20,color:"white"}}>{item.sorozat_cim}</Text>
                        </View>
                        <View style={{borderWidth:2,borderColor:"#2596be",width:190,padding:10}}>
                            <Text style={{fontSize:20,color:"white"}}>{item.sorozat_kattintas}</Text>

                        </View>
                    </View>
                    }
                    />
        

                    <FlatList 
                    data={this.state.dataSource2}
                    keyExtractor={({film_id}) => film_id}
                    renderItem={({item}) =>
                    <View style={{flexDirection:"row",borderColor:"#2596be",flex:1,alignSelf:"center"}}>
                        <View style={{borderWidth:2,borderColor:"#2596be",width:300,padding:10,}}>
                            <Text style={{fontSize:20,color:"white"}}>{item.film_cim}</Text>
                        </View>
                        <View style={{borderWidth:2,borderColor:"#2596be",width:190,padding:10}}>
                            <Text style={{fontSize:20,color:"white"}}>{item.film_kattintas}</Text>

                        </View>
                    </View>
                    }
                    />
                </View>

      </View>
    );
  }
}

