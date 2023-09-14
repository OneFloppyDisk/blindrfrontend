import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import UploadField from "../../../../components/uploadfield";
import Slider from "@react-native-community/slider";
import StyledButton from "../../../../components/styledbutton";
import { getValueOf } from "../../../../components/helpers/app.loginHelper";
import { ip } from "../../../../components/helpers/conf";
import {
  ActionColor,
  BackgroundColor,
  SecondaryColor,
  darkColor,
  lightGray,
  secondaryBg,
} from "../../../../components/helpers/StyleVars";
import { Card, TextInput } from "react-native-paper";
import TextArea from "../../../../components/textArea";
import { useNavigation } from "@react-navigation/native";

const Finish = () => {
  const nav = useNavigation()
  const [selectedImage, setSelectedImages] = useState(null);
  const [bio, setBio] = useState<string>("");
  const [maxDist, setMaxDist] = useState(1);
  const [UID, setuid] = useState();
  useEffect(() => {
    getValueOf("uid").then((uid) => setuid(uid));
  }, [UID]);
  const handleSelection = (selection) => {
    setSelectedImages(selection);
    console.log(selection);
  };
  const handleChange = (text) => {
    console.log(text.length);
    setBio(text);
  };
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("uid", UID);
    formData.append("bio", bio);
    formData.append("maxDist",maxDist.toString() );
    try {
      const response = await fetch(ip + "/finishSignup/", {
        method: "POST",
        body: formData,
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      
      if (data['success'] == true){
        nav.goBack()
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      console.log()
      throw new Error("Failed to upload image");
    }
  };
  return (
    <View style={style.container}>
      <UploadField handleSelection={(img) => handleSelection(img)} uid={UID} />
      <Card style={style.card}>
        <Card.Title titleStyle={{ color: "white" }} title="Bio" />
        <Card.Content>
          <TextArea
            maxLength={150}
            value={bio}
            overlayText={`${bio.length}/150`}
            onChangeText={handleChange}
          ></TextArea>
        </Card.Content>
      </Card>
      <Card style={style.card}>
        <Card.Title
          title={"how far are you willing to go?"}
          titleStyle={{ color: "white" }}
        />
        <Card.Content>
          <Slider
            minimumValue={1}
            maximumValue={110}
            step={1}
            minimumTrackTintColor={ActionColor}
            maximumTrackTintColor={ActionColor}
            thumbTintColor={darkColor}
            onValueChange={(dist) => {
              setMaxDist(dist);
            }}
            value={maxDist}
            style={{ width: "100%", height: 20 }}
          ></Slider><Text style={{color:"white"}}>{maxDist < 100 ? maxDist : "Global"}KM</Text>
        </Card.Content>
      </Card>

      <StyledButton text={"Upload Image"} onPress={uploadImage} />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BackgroundColor,
  },
  card: {
    minWidth: "80%",
    width: "80%",
    backgroundColor: secondaryBg,
    borderRadius: 10,
    elevation: 5,
    marginBottom:20,
    shadowColor: SecondaryColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
export default Finish;
