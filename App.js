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

      <View style={styles.containerLogo}>

        <Text style={styles.submitText}>O novo Sistema de cadastramento e login
        por reconhecimento facial esta ativo
        teste ele agora</Text>
        <View style={{ flexDirection: 'column-reverse' }}>


   

          <Camera style={{ flexDirection: 'row', width: '60%', height: '60%',justifyContent:'center' }} type={type} ref={ref => {
            setCameraRef(ref);
          }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'flex-end'
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end'
                }}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ alignSelf: 'center' }} onPress={async () => {
                if (cameraRef) {
                  const photo = await cameraRef.takePictureAsync();
                  setCapturePhoto(photo.uri);
                  setOpen(true)
                  console.log('photo', photo);
                }
              }}>
                <View style={{
                  borderWidth: 2,

                  borderColor: 'white',
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

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#FFF",


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
    backgroundColor: '#080',
    width: '90%',
    height: 45,
    alignItems: 'center',
    borderRadius: 7,
    flexDirection: 'row'

  },
  submitText: {
    color: 'black',
    fontSize: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 50,
    marginLeft: 10

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