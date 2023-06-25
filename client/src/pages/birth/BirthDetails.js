import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../components/CustomHeader";
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

function BirthDetails({ route, navigation }) {
  const [birthDetails, setBirthDetails] = useState(null);
  const { id } = route.params; // récupère l'ID de la naissance depuis les paramètres de navigation

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`http://localhost:7000/birth/${id}`, { headers: { Authorization: `Bearer ${token}`}});
    setBirthDetails(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!birthDetails) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const handleDelete = () => {
    // code pour gérer la suppression de la naissance
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader title="Détails de la naissance" isHome={false} navigation={navigation} />
      <View style={styles.container}>
        <Card style={styles.card}>
          <Title style={styles.title}>Naissance du couple {birthDetails.pair.male.name} et {birthDetails.pair.female.name}</Title>
          <Paragraph style={styles.paragraph}>{`Nombre de bébés: ${birthDetails.number_babies}`}</Paragraph>
          <Paragraph style={styles.paragraph}>{`Date de naissance: ${birthDetails.date}`}</Paragraph>
          <Paragraph style={styles.paragraph}>{`Père: ${birthDetails.pair.male.name}, espèce: ${birthDetails.pair.male.species}`}</Paragraph>
          <Paragraph style={styles.paragraph}>{`Mère: ${birthDetails.pair.female.name}, espèce: ${birthDetails.pair.female.species}`}</Paragraph>
          <Paragraph style={styles.paragraph}>{`Créé le: ${format(parseISO(birthDetails.created_at), "d MMMM yyyy", { locale: fr })}`}</Paragraph>
          <Button title="Edit" onPress={() => navigation.navigate('UpdateBirth', { id: birthDetails.id })} color="#0000ff" style={styles.button} />
          <Button title="Delete" onPress={handleDelete} color="#ff0000" style={styles.button} />
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 18,
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default BirthDetails;
