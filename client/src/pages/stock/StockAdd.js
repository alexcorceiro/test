import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
 
 function AddStock({ navigation }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchase_date, setPurchaseDate] = useState('');

  const addStock = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const response = await axios.post('http://localhost:7000/stock', {
        name,
        type,
        description,
        quantity,
        purchase_date,
      }, { headers: { Authorization: `Bearer ${token}`}});
      console.log(response.data);
      navigation.goBack()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} onChangeText={setName} value={name} />
      <Text style={styles.label}>Type</Text>
      <TextInput style={styles.input} onChangeText={setType} value={type} />
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} onChangeText={setDescription} value={description} />
      <Text style={styles.label}>Quantity</Text>
      <TextInput style={styles.input} onChangeText={setQuantity} value={quantity} />
      <Text style={styles.label}>Purchase Date</Text>
      <TextInput style={styles.input} onChangeText={setPurchaseDate} value={purchase_date} />
      <Button title="Add Stock" onPress={addStock} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default AddStock;