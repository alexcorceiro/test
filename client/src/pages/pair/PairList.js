import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const PairList = ({ navigation }) => {
  const [pairs, setPairs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get('http://localhost:7000/pair', { headers: { Authorization: `Bearer ${token}`}});
    setPairs(response.data);
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
        title="Add Pair"
        onPress={() => navigation.navigate('AddPair')}
      />
      {pairs.map((pair) => {
        const [male, female] = pair.animal;
        return (
          <Card key={pair.id} style={styles.card}>
            <Card.Title title={male?.name || 'Loading...'} subtitle={female?.name || 'Loading...'} />
            <Card.Content>
              <Button
                title="Details"
                onPress={() => navigation.navigate('PairDetail', { id: pair.id })}
              />
            </Card.Content>
          </Card>
        );
      })}
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

export default PairList;
