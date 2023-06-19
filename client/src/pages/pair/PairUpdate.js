import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const UpdatePair = ({ route, navigation }) => {
  const { id } = route.params;
  const [maleName, setMaleName] = useState('');
  const [femaleName, setFemaleName] = useState('');
  const [males, setMales] = useState([]);
  const [females, setFemales] = useState([]);

  const fetchAnimals = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get('http://localhost:7000/animal', { headers: { Authorization: `Bearer ${token}`}}); // Adjust the endpoint as per your API
    setMales(response.data.filter(animal => animal.gender === 'male'));
    setFemales(response.data.filter(animal => animal.gender === 'femelle'));
  };

  useEffect(() => {
    fetchAnimals();
  }, []);

  const updatePair = async () => {
    const token = await AsyncStorage.getItem("token")
    await axios.put(`http://localhost:7000/pair/${id}`, { maleName, femaleName }, { headers: { Authorization: `Bearer ${token}`}});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for male"
        onChangeText={setMaleName}
        value={maleName}
      />
      <FlatList
        data={males.filter(male => male.name.includes(maleName))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setMaleName(item.name)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Searchbar
        placeholder="Search for female"
        onChangeText={setFemaleName}
        value={femaleName}
      />
      <FlatList
        data={females.filter(female => female.name.includes(femaleName))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setFemaleName(item.name)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Update Pair" onPress={updatePair} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default UpdatePair;
