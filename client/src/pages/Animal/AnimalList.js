import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Button, Text } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimalListScreen = ({ navigation }) => {
  const [animals, setAnimals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchAnimals = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get('http://localhost:7000/animal', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAnimals(response.data);
  };

  const searchAnimals = () => {
    if(searchQuery) {
      setAnimals(animals.filter(animal => animal.name.includes(searchQuery)));
    } else {
      fetchAnimals();
    }
  }

  useEffect(() => {
    fetchAnimals();
  }, []);

  return (
    <View style={styles.container}>
    <Text style={styles.headerText}>Animal List</Text>
    <Searchbar
      placeholder="Search Animals"
      onChangeText={query => setSearchQuery(query)}
      onSubmitEditing={searchAnimals}
      value={searchQuery}
      style={styles.searchbar}
    />
    <View style={styles.buttonContainer}>
      <Button title="Back" onPress={() => navigation.goBack()} color="#841584" />
      <Button title="Add Animal" onPress={() => navigation.navigate('AddAnimal')} color="#841584" />
    </View>
    <FlatList
      data={animals}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Title title={item.name} subtitle={item.species} />
          <Card.Content>
            <Text style={styles.label}>Ring: {item.ring}</Text>
            <Text style={styles.label}>Gender: {item.gender}</Text>
          </Card.Content>
          <Card.Cover source={{ uri: item.image ? item.image : 'https://st2.depositphotos.com/1799371/7138/v/450/depositphotos_71389329-stock-illustration-vector-image-of-an-dog.jpg' }} />
          <Card.Actions style={styles.actions}>
            <Button 
            title="Details"
            onPress={() => navigation.navigate('AnimalDetail', { id: item.id })} 
            color="#841584"
            />
          </Card.Actions>
        </Card>
      )}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  searchbar: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 0,
    backgroundColor: 'white',
  },
  actions: {
    justifyContent: 'flex-end',
  },
});

export default AnimalListScreen;
