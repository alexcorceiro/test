import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

function EventList({ navigation }) {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get('http://localhost:7000/event', { headers: { Authorization: `Bearer ${token}`}});
    setEvents(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
      />
      <Button
        title="Add Event"
        onPress={() => navigation.navigate('AddEvent')}
      />
      {events.map((event) => (
        <Card key={event.id} style={styles.card}>
          <Card.Title title={event.title} subtitle={event.date} />
          <Card.Content>
            <Button
              title="Details"
              onPress={() => navigation.navigate('DetailEvent', { id: event.id })}
            />
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
  },
});

export default EventList;
