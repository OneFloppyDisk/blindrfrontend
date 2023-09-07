import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ip } from "../../../components/helpers/conf";
import { Video, ResizeMode } from "expo-av";
import Player from "../../../components/Player";
import StyledButton from "../../../components/styledbutton";
import Icon from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useIsFocused,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";

import { ActionColor } from "../../../components/helpers/StyleVars";
import { ScaleFromCenterAndroid } from "@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets";
import Videos from "../../../components/videos";
import styles from "./profileStyle";
const ProfileScreen = ({ uid }) => {
  const isFocus = useIsFocused();
  const [profileImage, setProfileImage] = useState(null);
  const [videos, setVideos] = useState<Tthumbnail[]>([]);
  const [user,setUser] = useState('')
  const nav = useNavigation() as any;
  
  useEffect(() => {
    console.log(uid);
    
    if (isFocus) {
      console.log("isFocus :>> ", isFocus);
      // Fetch profile image from the server
      fetchProfileImage();

      // Fetch videos from the server
      fetchVideos();
    }
  }, [isFocus]);

  const plus = <Icon name="add" size={40}></Icon>;

  const fetchProfileImage = async () => {
    try {
      const response = await fetch(`${ip}/getProfileData/${uid}/`);
      const data = await response.json()
      console.log(data);
      
      if (!data['success']) {
        console.log("null");
        setProfileImage(null);
      } else {
        console.log(`${ip}${data['profileImageRoute']}/`)
        setProfileImage(`${ip}${data['profileImageRoute']}/`)
        setUser(data['username'])
      }
    } catch (error) {
      console.log(error);
      console.log(profileImage);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${ip}/getThumbs/${uid}`);
      var x = await response.json();
      setVideos(x)
      }
    catch(error){
    console.log(error)
    console.log(x)
  }
};
  const renderElse = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          It seems you haven't finished your registration
        </Text>
        <StyledButton
          text={"Finish Registration"}
          onPress={() => {
            nav.navigate("Finish");
          }}
        ></StyledButton>
      </View>
    );
  };
  const renderIf = () => {
    return (
      <View style={{flex:3,alignItems:"center", flexDirection:"column"}}>
        <View>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <Text style={styles.title}>{user}</Text>
          <Text style={styles.subtitle}>Videos:</Text>
        </View>
        <View>
          
        </View>
        <Videos thumbnails={videos} ></Videos>
 
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {profileImage ? renderIf() : renderElse()}
      {profileImage?<TouchableOpacity 
          onPress={() => nav.navigate({ name: "Vid" })}
          style={[styles.button, styles.add, {}]}
        >
          <Text style={{ textAlign: "center" }}>{plus}</Text>
        </TouchableOpacity>:null}
    </View>
  );
};


export default ProfileScreen;
