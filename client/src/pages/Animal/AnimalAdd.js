// AddAnimalScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text,  Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const AddAnimalScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [ring, setRing] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      let { assets } = result;
      let selectedAsset = assets[0]; // If you only select one image or video, it will be the first item in the array.
    
      console.log(selectedAsset.duration);

      // Assuming only one image is selected, set the image state
      setImage(assets[0].uri);
    }
};

  const addAnimal = async () => {
    const token = await AsyncStorage.getItem('token');
    let formData = new FormData();
    formData.append('name', name);
    formData.append('species', species);
    formData.append('ring', ring);
    formData.append('gender', gender);
    formData.append('birthdate', birthdate);
    formData.append('image', {
      uri: image,
      type: 'image/jpeg',
      name: 'testPhoto.jpg',
    });

    await axios.post(
      'http://localhost:7000/animal',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      }
    );
    navigation.navigate('AnimalList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add New Animal</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} style={styles.input} />
        <Text style={styles.label}>Species</Text>
        <TextInput value={species} onChangeText={setSpecies} style={styles.input} />
        <Text style={styles.label}>Ring</Text>
        <TextInput value={ring} onChangeText={setRing} style={styles.input} />
       <View style={styles.inputContainer}>
        <Text>Gender</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.select}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
        <Text style={styles.label}>Birthdate</Text>
        <TextInput value={birthdate} onChangeText={setBirthdate} style={styles.input} />
        <Button title="Pick an image" onPress={pickImage} color="#841584" />
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button title="Add Animal" onPress={addAnimal} color="#841584" style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 50,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  select: {
    width: 90,
    height: 40
  },
  image: {
    width: 200, 
    height: 200, 
    alignSelf: 'center', 
    margin: 10,
    borderRadius: 10, 
  },
  button: {
    marginTop: 20,
  },
});

export default AddAnimalScreen;
