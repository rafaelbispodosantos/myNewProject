import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Image, KeyboardAvoidingView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { Camera } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
export default function App() {

  state = {

    nome: '',
    email: '',
    password: '',
    confimrPassword: '',
    stageNew: false,
    image: null
  }

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [capturePhoto, setCapturePhoto] = useState(null);
  const [open, setOpen] = useState(null);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (


    <KeyboardAvoidingView style={styles.background}>

      <View>
        <View  style={{ flex: 0.3,
    backgroundColor: "#e4f1ff",
    
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,}}>
        <Text style={styles.submitText}>Faça login no novo reconhencimento Facial</Text>
        </View>

        
        <View style={{ flexDirection: 'column-reverse', alignItems: 'center',justifyContent:"flex-end", flex: 0.35,
    backgroundColor: "#e4f1ff" }}>


   

          <Camera style={{ flexDirection: 'row', width: '60%', height: '60%',justifyContent:'center'}} type={type} ref={ref => {
            setCameraRef(ref);
          }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'flex-end'
              }}>
             
            
            </View>

            {capturePhoto && <Modal animated="slide"
              transparent={false}
              visible={open}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
                  <FontAwesome name="window-close" size={50} color="red" />
                </TouchableOpacity>

                <Image
                  style={{ width: '100%', height: 300, borderRadius: 20 }}
                  source={{ uri: capturePhoto }}

                />
              </View>


            </Modal>
            }
          </Camera>

        </View>
        <TouchableOpacity style={{ alignSelf: 'center' }}
         onPress={async () => {
                if (cameraRef) {
                  const photo = await cameraRef.takePictureAsync();
                  setCapturePhoto(photo.uri);
                  setOpen(true)
                  console.log('photo', photo);
                }
              }}>
                 <Text style={styles.Text}> Captura</Text>
                <View style={{
                  borderWidth: 2,

                  borderColor: 'black',
                  height: 50,
                  width: 50,
                  borderRadius: 50,

                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                  <View style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: 'white',
                    height: 40,
                    width: 40,
                    backgroundColor: 'white'
                  }} >
                  </View>
                </View>
              </TouchableOpacity>

<View style={{    flex: 0.3,
    backgroundColor: "#cdd8e5",
    alignItems: 'center',
    padding: 10,
  }}>

<TextInput style={styles.input}
          placeholder="Nome"
          autoCorrect={false}

        />

        <TextInput style={styles.input}
          placeholder="Senha"
          autoCorrect={false}

        />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.Text}> Entra</Text>
        </TouchableOpacity>



      </View>



</View>
        
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#cdd8e5",


  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',


  },
  Text: {
   
    color: '#fff',
    fontSize: 20,
    
    
  },
  cantainer: {
    backgroundColor: 'rgba(0,0,0, 0.8)',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',

    paddingBottom: 20
  },
  subtitle: {
    color: '#fff',
    fontSize: 20,
    alignItems: 'center',
    marginBottom: 10


  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },
  btnSubmit: {
    backgroundColor: '#889099',
    width: '90%',
    height: 45,
    alignItems: 'center',
    borderRadius: 7,
    
    

  },
  submitText: {
    color: '#7851a9',
    
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 100,
    marginLeft: 30,
    fontWeight: "bold",
    textAlign:'center',
    textDecorationColor: '#000',
    
  

  },
  btnRegister: {
    marginTop: 10,
  },
  registerText: {
    color: '#fff'

  },
  buttonFoto: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286f4'
  }


})