import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';


const UpdateBirthScreen = ({ navigation, route }) => {
  const [date, setDate] = useState('');
  const [numberBabies, setNumberBabies] = useState('');
  const [pairId, setPairId] = useState('');

  const { id } = route.params;

  useEffect(() => {
    const fetchBirthData = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`http://localhost:7000/birth/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const birth = response.data;
      setDate(birth.date);
      setNumberBabies(birth.number_babies.toString());
      setPairId(birth.pair_id.toString());
    };

    fetchBirthData();
  }, []);

  const updateBirth = async () => {
    const token = await AsyncStorage.getItem('token');
    let formData = new FormData();
    formData.append('date', date);
    formData.append('number_babies', numberBabies);
    formData.append('pair_id', pairId);

    await axios.put(
      `http://localhost:7000/birth/${id}`,
      formData,
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
    );
    navigation.navigate('BirthList');
  };

  return (
    <View style={styles.container}>
    <Text style={styles.headerText}>Update Birth</Text>
    <View style={styles.inputContainer}>
      <Text>Date</Text>
      <TextInput value={date} onChangeText={setDate} style={styles.input} />
    </View>
    <View style={styles.inputContainer}>
      <Text>Number of Babies</Text>
      <TextInput value={numberBabies} onChangeText={setNumberBabies} style={styles.input} keyboardType="numeric" />
    </View>
    <View style={styles.inputContainer}>
      <Text>Pair ID</Text>
      <TextInput value={pairId} onChangeText={setPairId} style={styles.input} keyboardType="numeric" />
    </View>
    <Button title="Update Birth" onPress={updateBirth} color="#841584" />
    <Button title="Go Back" onPress={() => navigation.goBack()} color="#841584" />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default UpdateBirthScreen;
