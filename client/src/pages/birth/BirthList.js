import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';

const BirthListScreen = ({ navigation }) => {
  const [births, setBirths] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:7000/birth');
      setBirths(response.data);
    } catch (error) {
      console.error("Failed to fetch births:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchResults = births.filter(birth =>
    birth.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    birth.number_babies.toLowerCase().includes(searchQuery.toLowerCase()) ||
    birth.animalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBirthItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BirthDetail', { id: item.id })}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{`Birth ID: ${item.id}`}</Title>
          <Paragraph>{`Number of babies: ${item.number_babies}`}</Paragraph>
          <Paragraph>{`Date: ${item.date}`}</Paragraph>
          <Paragraph>{`Animal Name: ${item.animalName}`}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={query => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchBar}
      />
      <Button
        mode="contained"
        style={styles.addButton}
        onPress={() => navigation.navigate('AddBirth')}
      >
        Add Birth
      </Button>
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        renderItem={renderBirthItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchBar: {
    marginBottom: 10,
  },
  addButton: {
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
});

export default BirthListScreen;
