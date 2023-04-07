import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';

export default function App() {

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const [pickedImage, setPickedImage] = useState(null);
  const [maskImage, setMaskImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);


  const pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImage({ uri: result.assets[0].uri });
    }
  };

  const growNails = async () => {
    if (!pickedImage) {
      alert("Please pick an image first.");
      return;
    }
  
    const apiUrl = "http://192.168.1.14:5000/grow_nails";
    const uriParts = pickedImage.uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
  
    const formData = new FormData();
    formData.append("image", {
      uri: pickedImage.uri,
      name: `photo.${fileType}`,
    });
  
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });
  
    if (response.ok) {
      const data = await response.json();
      setMaskImage({ uri: `data:image/png;base64,${data.result}` });
    } else {
      alert("An error occurred while processing the image.");
    }
  };
  

  return (
    <View style={styles.container}>
      <StatusBar />
      <Text style={styles.title}>Nail Design App</Text>
      <View style={styles.previewImageContainer}>
        {pickedImage && <Image source={pickedImage} style={styles.previewImage} />}
        {maskImage && <Image source={maskImage} style={styles.maskImage} />}
      </View>
      <Button title="Pick an Image" onPress={pickImageHandler} />
      <Button title="Grow Nails" onPress={growNails} />
    </View>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  previewImageContainer: {
    width: 300,
    height: 300,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    position: 'relative',
  },
  previewImage: {
    width: 300,
    height: 300,
    position: 'absolute',
    zIndex: 1,
  },
  maskImage: {
 
  },
  
});