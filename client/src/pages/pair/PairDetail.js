import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PairDetail = ({ route, navigation }) => {
  const { id } = route.params;
  const [pair, setPair] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`http://localhost:7000/pair/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setPair(res.data);
    };
    fetchData();
  }, [id]);

  if (!pair) {
    return <Text>Loading...</Text>;
  }

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:7000/pair/${id}`, { headers: { Authorization: `Bearer ${token}`}});
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Male: {pair.male.name}</Text>
      <Text style={styles.text}>Female: {pair.female.name}</Text>
      <Button title="modifier le couple" onPress={() => navigation.navigate('UpdatePair', { id: pair.id })} />
      <Button title="supprimer le couple" 
      onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default PairDetail;
