import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

function StockDetails({ route, navigation }) {
  const { id } = route.params;
  const [stock, setStock] = useState(null);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(`http://localhost:7000/stock/${id}`, { headers: { Authorization: `Bearer ${token}`}});
    setStock(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:7000/stock/${id}`, { headers: { Authorization: `Bearer ${token}`}});
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {stock && (
        <>
          <Text>Name: {stock.name}</Text>
          <Text>Type: {stock.type}</Text>
          <Text>Description: {stock.description}</Text>
          <Text>Quantity: {stock.quantity}</Text>
          <Text>Purchase Date: {stock.purchase_date}</Text>
          <Button
            title="Edit"
            onPress={() => navigation.navigate('UpdateStock', { id: stock.id })}
          />
          <Button title='supprimer stock'
           onPress={handleDelete}/>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});


export default StockDetails