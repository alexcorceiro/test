import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const BirthDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [birth, setBirth] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/birth/${id}`);
      setBirth(response.data);
    } catch (error) {
      console.error("Failed to fetch birth:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!birth) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.text}>{birth.id}</Text>
      <Text style={styles.label}>Date:</Text>
      <Text style={styles.text}>{birth.date}</Text>
      <Text style={styles.label}>Number of babies:</Text>
      <Text style={styles.text}>{birth.number_babies}</Text>
      <Text style={styles.label}>Animal Name:</Text>
      <Text style={styles.text}>{birth.animalName}</Text>
      <View style={styles.buttonsContainer}>
        <Button title="Edit" onPress={() => navigation.navigate('UpdateBirth', { id: birth.id })} />
        <Button title="Delete" onPress={() => {/* Call API to delete birth here */}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8'
  },
  loading: {
    fontSize: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20
  },
  text: {
    fontSize: 16,
    color: '#333'
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  }
});

export default BirthDetailScreen;
