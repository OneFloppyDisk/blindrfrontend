  import React, { useState, } from 'react';
  import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
  import * as ImagePicker from 'expo-image-picker';
  import { ip } from './helpers/conf';
  import StyledButton from './styledbutton';
  import Icon from 'react-native-vector-icons/FontAwesome';
import { BackgroundColor, lightGray } from './helpers/StyleVars';
import { getValueOf } from './helpers/app.loginHelper';
import { imageUploadProps } from './helpers/interfaces';

  const UploadField = ({handleSelection , uid}:imageUploadProps) => {
    const myIcon = <Icon name="camera" size={30} color={lightGray} />;
    const [selectedImage, setSelectedImage] = useState(null);
    const generateName = ()=>{
      let name
      getValueOf("email").then((text) =>{ name = text.split("@")[0];})
      console.log(name);
      
      return name
    }
    const handleImageUpload = async () => {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access the camera roll is required!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (pickerResult.canceled === true) {
        return;
      }

      const image = {
        uri: pickerResult.assets[0].uri,
        type: 'image/jpeg', // Change this if your image is of a different type
        name: uid+'.jpg', // Change this if you want a different name for your image file
      };

      setSelectedImage(image);
      handleSelection(image)
      console.log(image.name);
    };

   

    const renderContent = () => {
      if (selectedImage) {
        return (
          <TouchableOpacity onPress={handleImageUpload}>
            <Image style={style.image} source={selectedImage} />
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity onPress={handleImageUpload}>
            <View style={style.square} >
              <Text>{myIcon}</Text>
              </View>
          </TouchableOpacity>
        );
      }
    };

    return (
      <View style={[style.container, { marginBottom: 50 }]}>
        {renderContent()}
              </View>
    );
  };

  const style = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    image: {
      width: 150,
      height: 150,
      borderRadius: 10,
      borderColor: "red",
    },
    square:{
      justifyContent: 'center',
      alignItems: 'center',
      width:150,
      height:150,
      backgroundColor:"#d1d1d1",
      borderRadius:10
    },
    camera:{
      alignSelf:'center',
    }
  })

  export default UploadField