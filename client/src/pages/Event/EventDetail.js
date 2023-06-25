import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button , SafeAreaView, } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";
function EventDetails({ route, navigation }) {
  const [event, setEvent] = useState(null);
  const { id } = route.params;

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get(`http://localhost:7000/event/${id}`, { headers: { Authorization: `Bearer ${token}`}});
    setEvent(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    const token = await AsyncStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:7000/event/${id}`, { headers: { Authorization: `Bearer ${token}`}});
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return event ? (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="detail de evenement"  navigation={navigation} />
    <View style={styles.container}>
      <Text style={styles.text}>Title: {event.title}</Text>
      <Text style={styles.text}>Description: {event.description}</Text>
      <Text style={styles.text}>Address: {event.address}</Text>
      <Text style={styles.text}>Date: {event.date}</Text>
      <Button
        title="Update Event"
        onPress={() => navigation.navigate('UpdateEvent', { id: event.id })}
      />
      <Button 
        title="supprimer evenement"
        onPress={handleDelete}/>
    </View>
    </SafeAreaView>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});


export default EventDetails;
