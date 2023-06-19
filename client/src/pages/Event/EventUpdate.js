import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

function UpdateEvent({ route, navigation }) {
  const { id } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(`http://localhost:7000/event/${id}`, { headers: { Authorization: `Bearer ${token}`}});
    const event = response.data;
    setTitle(event.title);
    setDescription(event.description);
    setAddress(event.address);
    setDate(event.date);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateEvent = async () => {
    const token = await AsyncStorage.getItem("token")
    await axios.put(`http://localhost:7000/event/${id}`, { title, description, address, date }, { headers: { Authorization: `Bearer ${token}`}});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <Button
        title="Update Event"
        onPress={updateEvent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default UpdateEvent;