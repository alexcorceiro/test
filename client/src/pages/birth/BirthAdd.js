import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Button, View, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddBirthScreen = ({ navigation }) => {
    const [date, setDate] = useState('');
    const [numberBabies, setNumberBabies] = useState('');
    const [animals, setAnimals] = useState([]);
    const [animalName, setAnimalName] = useState('');
    const [filteredAnimals, setFilteredAnimals] = useState([]);

    useEffect(() => {
      fetchPairs();
    }, []);

    useEffect(() => {
      const results = animals.filter(animal =>
        animal.toLowerCase().includes(animalName.toLowerCase())
      );
      setFilteredAnimals(results);
    }, [animalName]);

    const fetchPairs = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('http://localhost:7000/pair', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const animalNames = response.data.reduce((names, pair) => {
          return names.concat(pair.animal.map(animal => animal.name));
        }, []);
        setAnimals(animalNames);
      } catch (error) {
        console.error('Failed to fetch animals:', error);
      }
    };

    const addBirth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        await axios.post('http://localhost:7000/birth', {
          date,
          number_babies: numberBabies,
          animalName
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigation.goBack();
      } catch (err) {
        console.error('Failed to add birth:', err);
      }
    };

    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Date' onChangeText={setDate} value={date} />
        <TextInput style={styles.input} placeholder='Number of Babies' onChangeText={setNumberBabies} value={numberBabies} />
        <TextInput style={styles.input} placeholder='Animal Name' onChangeText={setAnimalName} value={animalName} />
        <Text>vouci le nom des parent actulement en couple: </Text>
        <FlatList
          data={filteredAnimals}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
        <Button title='Add Birth' onPress={addBirth} />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  }
});

export default AddBirthScreen;
