import React from 'react';
import { FlatList, ActivityIndicator,View, Text, TouchableOpacity, TextInput} from 'react-native-web';
import FileUpload from "./upload"
import FileUpload2 from "./upload2"
import { Picker } from 'react-native-web';

const ipcim="localhost:8080";


export default class Felvitel extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
      isLoading: true,
      sorozatcim:'',
      sorozatev:'',
      sorozathossz:'',
      sorozatmufaj:'',
      sorozatleiras:'',
      sorozatevadszam:'',
      sorozatepizodszam:'',
      sorozatlink:'',
      filmcim:'',
      filmev:'',
      filmhossz:'',
      filmmufaj:'',
      filmleiras:'',
      filmlink:'',
      valaszt:0,
      dataSource:[],
      dataSource2:[]


    }
    
  }

  componentDidMount(){
    document.body.style.backgroundColor = "#262626"

    fetch('http://'+ipcim+'/mufaj')
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

  render(){

    return(
        <View style={{flexDirection:"row"}}>
          <View style={{flex:3, marginTop:30,alignItems:"center"}}>
          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30,}}
          onChangeText={(sorozatcim) => this.setState({sorozatcim})}
          value={this.state.sorozatcim}
          multiline={true}
          placeholder='Sorozat címe'
        />

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozatev) => this.setState({sorozatev})}
          value={this.state.sorozatev}
          multiline={true}
          placeholder='Sorozat év'
        />

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozathossz) => this.setState({sorozathossz})}
          value={this.state.sorozathossz}
          multiline={true}
          placeholder='Sorozat hossz'
        />

        <Picker
        selectedValue={this.state.valaszt}
        style={{ height: 35, width: 200,marginBottom:10}}
        onValueChange={(itemValue) => this.setState({valaszt:itemValue})}
        >
        {this.state.dataSource.map((item) => (
          <Picker.Item key={item.mufaj_id} label={item.mufaj_nev} value={item.mufaj_id} />
        ))}
       
       
      </Picker>

      

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozatleiras) => this.setState({sorozatleiras})}
          value={this.state.sorozatleiras}
          multiline={true}
          placeholder='Sorozat leírás'
        />

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozatevadszam) => this.setState({sorozatevadszam})}
          value={this.state.sorozatevadszam}
          multiline={true}
          placeholder='Sorozat évadszáma'
        />
        <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozatepizodszam) => this.setState({sorozatepizodszam})}
          value={this.state.sorozatepizodszam}
          multiline={true}
          placeholder='Sorozat epizódszám'
        />
         <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(sorozatlink) => this.setState({sorozatlink})}
          value={this.state.sorozatlink}
          multiline={true}
          placeholder='Sorozat linkje'
        />
          <FileUpload 
          sorozatcim={this.state.sorozatcim} 
          sorozatev={this.state.sorozatev} 
          sorozathossz={this.state.sorozathossz}
          sorozatmufaj={this.state.valaszt}
          sorozatleiras={this.state.sorozatleiras}
          sorozatevadszam={this.state.sorozatevadszam}
          sorozatepizodszam={this.state.sorozatepizodszam}
          sorozatlink={this.state.sorozatlink}>
            
          </FileUpload>

    </View>





    <View style={{flex:3,alignItems:"center", marginTop:30}}>
          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30,}}
          onChangeText={(filmcim) => this.setState({filmcim})}
          value={this.state.filmcim}
          multiline={true}
          placeholder='Film címe'
        />

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(filmev) => this.setState({filmev})}
          value={this.state.filmev}
          multiline={true}
          placeholder='Film év'
        />

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(filmhossz) => this.setState({filmhossz})}
          value={this.state.filmhossz}
          multiline={true}
          placeholder='Film hossz'
        />
            <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(filmmufaj) => this.setState({filmmufaj})}
          value={this.state.filmmufaj}
          multiline={true}
          placeholder='Film műfaj'
        />

      

          <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(filmleiras) => this.setState({filmleiras})}
          value={this.state.filmleiras}
          multiline={true}
          placeholder='Film leírás'
        />
        <TextInput
          style={{borderRadius:15, borderWidth:1,padding:5,marginBottom:10,color:"white",backgroundColor:"lightgrey",borderColor:"transparent",color:"black",width:200,height:35,marginLeft:30}}
          onChangeText={(filmlink) => this.setState({filmlink})}
          value={this.state.filmlink}
          multiline={true}
          placeholder='Film linkje'
        />

          <FileUpload2 
          filmcim={this.state.filmcim} 
          filmev={this.state.filmev} 
          filmhossz={this.state.filmhossz}
          filmmufaj={this.state.filmmufaj}
          filmleiras={this.state.filmleiras}
          filmlink={this.state.filmlink}>
          </FileUpload2>

    </View>

</View>

      

    );
  }
}