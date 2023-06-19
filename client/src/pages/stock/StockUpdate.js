import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

 function UpdateStock({ route, navigation}) {
  const { id } = route.params;
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchase_date, setPurchaseDate] = useState('');

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(`http://localhost:7000/stock/${id}`, { headers: { Authorization: `Bearer ${token}`}});
    const stock = response.data;
    setName(stock.name);
    setType(stock.type);
    setDescription(stock.description);
    setQuantity(stock.quantity);
    setPurchaseDate(stock.purchase_date);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStock = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
      const response = await axios.put(`http://localhost:7000/stock/${id}`, {
        name,
        type,
        description,
        quantity,
        purchase_date,
      }, { headers: { Authorization: `Bearer ${token}`}});
      navigation.navigate("StockList")
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
      <Button title="Update Stock" onPress={updateStock} />
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

export default UpdateStock;