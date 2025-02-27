import axios from 'axios';
import React,{useState} from 'react'

function hiba(){
    alert("Hibás adatok!")
}
function FileUpload(props) {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        alert("Sikeres feltöltés!");
        try {
            const res = await axios.post(
                "http://localhost:8080/upload",
                formData
            );
            console.log(res);
            //---------------------------------------------------------------------------//
            let bemenet={
                bevitel1:props.sorozatcim,
                bevitel2:props.sorozatev,
                bevitel3:props.sorozathossz,
                bevitel4:props.sorozatmufaj,
                bevitel5:fileName,
                bevitel6:props.sorozatleiras,
                bevitel7:props.sorozatevadszam,
                bevitel8:props.sorozatepizodszam,
                bevitel15:props.sorozatlink
                
              }
              fetch('http://localhost:8080/sorozatfelvitel', {
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
          
            //---------------------------------------------------------------------------//
        } catch (ex) {
            console.log(ex);
        }
    };
    

    

        return (
                

            <div className="App">
                <input type="file" onChange={saveFile} style={{color:"white"}} />
                {props.sorozatcim=="" || props.sorozatepizodszam=="" || props.sorozatev=="" || props.sorozatevadszam=="" || props.sorozathossz=="" || props.sorozatleiras=="" || props.sorozatlink=="" || fileName=='' ? <button onClick={()=>hiba()}>Feltöltés</button>:<button onClick={uploadFile}>Feltöltés</button>}
                

                
            </div>
        );
}

export default FileUpload;