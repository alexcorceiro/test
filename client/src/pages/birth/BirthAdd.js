import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

function AddBirthScreen({ navigation }) {
  const [date, setDate] = useState("");
  const [number_babies, setNumberBabies] = useState(0);
  const [animalName, setAnimalName] = useState("");
  const [animals, setAnimals] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get('http://localhost:8000/api/animals', { headers: { Authorization: `Bearer ${token}`}});
      setAnimals(response.data);
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    const token = await AsyncStorage.getItem("token");
    axios.post('http://localhost:8000/api/births', { date, number_babies, animalName }, { headers: { Authorization: `Bearer ${token}`}})
      .then(res => {
        Alert.alert("Birth added successfully!");
        navigation.navigate('BirthListScreen');
      })
      .catch(err => Alert.alert(err.response.data.error))
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
      <Button title="Add" onPress={handleAdd} />
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


export default AddBirthScreen;