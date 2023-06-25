import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../components/CustomHeader";
import { View, Button, StyleSheet } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


 function StockList({ navigation }) {
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token")
    const response = await axios.get('http://localhost:7000/stock', { headers: { Authorization: `Bearer ${token}`}});
    setStocks(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <CustomHeader title="Les stock list" isHome={true} navigation={navigation} />
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
      />
      <Button
        title="Add Stock"
        onPress={() => navigation.navigate('AddStock')}
      />
      {stocks.map((stock) => (
        <Card key={stock.id} style={styles.card}>
          <Card.Title title={stock.name} subtitle={stock.type} />
          <Card.Content>
            <Button
              title="Details"
              onPress={() => navigation.navigate('StockDetails', { id: stock.id })}
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
});

export default StockList;