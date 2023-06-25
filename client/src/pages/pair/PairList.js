import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Button } from 'react-native';
import { Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";


function PairList({ navigation }) {
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
    <SafeAreaView style={{ flex: 1 }}>
    <CustomHeader title="La liste des couples" isHome={true} navigation={navigation} />
    <View style={styles.container}>
      <Searchbar
        placeholder="Chercher"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
      />
      <Button
        title="Ajouter un couple"
        onPress={() => navigation.navigate('AddPair')}
      />
      {pairs.map((pair) => (
        <Card key={pair.id} style={styles.card}>
          {pair.animal.map((animal, index) => (
            <View key={index}>
              <Title>{animal.name}</Title>
            </View>
          ))}
          <Card.Content>
            <Button
              title="Details"
              onPress={() => navigation.navigate('PairDetail', { id: pair.id })}
            />
          </Card.Content>
        </Card>
      ))}
    </View>
    </SafeAreaView>
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
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "gray"
  },
  date: {
    fontSize: 14,
    color: "gray",
    marginTop: 4
  }
});

export default PairList;
