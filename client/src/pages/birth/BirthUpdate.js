import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

 function UpdateBirthScreen({ route, navigation }) {
  const [date, setDate] = useState("");
  const [number_babies, setNumberBabies] = useState(0);
  const [animalName, setAnimalName] = useState("");
  const [animals, setAnimals] = useState([]);
  const [searchText, setSearchText] = useState("");
  const id = route.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`http://localhost:8000/api/birth/${id}`, { headers: { Authorization: `Bearer ${token}`}})
      setDate(response.data.date);
      setNumberBabies(response.data.number_babies);
      setAnimalName(response.data.animalName);
      
      const animalRes = await axios.get('http://localhost:8000/api/animal', { headers: { Authorization: `Bearer ${token}`}});
      setAnimals(animalRes.data);
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem("token");
    axios.put(`http://localhost:8000/api/birth/${id}`, { date, number_babies, animalName }, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        Alert.alert("Birth updated successfully!");
        navigation.navigate('BirthListScreen');
      })
      .catch(err => console.log(err))
  };

  const filteredAnimals = animals.filter(animal => animal.name.toLowerCase().includes(searchText.toLowerCase()) && animal.inCouple);

  return (
    <View style={styles.container}>
      <TextInput
        label='Date of Birth'
        value={date}
        onChangeText={date => setDate(date)}
        style={styles.input}
      />
      <TextInput
        label='Number of Babies'
        value={number_babies.toString()}
        onChangeText={num => setNumberBabies(parseInt(num, 10))}
        style={styles.input}
      />
      <TextInput
        label='Animal Name'
        value={animalName}
        onChangeText={name => setAnimalName(name)}
        style={styles.input}
      />
      <TextInput
        label='Search Animal'
        value={searchText}
        onChangeText={text => setSearchText(text)}
        style={styles.input}
      />
      {filteredAnimals.map((animal, index) => (
        <TouchableOpacity key={index} onPress={() => setAnimalName(animal.name)}>
          <Text>{animal.name}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default UpdateBirthScreen;