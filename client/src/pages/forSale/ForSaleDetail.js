import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AnimalForSaleDetails = ({ route, navigation }) => {
    const [animal, setAnimal] = useState(null);
    const { animalId } = route.params;

    useEffect(() => {
        fetchAnimalForSale();
    }, []);

    const fetchAnimalForSale = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/animals_for_sale/${animalId}`);
            setAnimal(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAnimalForSale = async () => {
        try {
            await axios.delete(`http://localhost:4000/animals_for_sale/${animalId}`);
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    if (!animal) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text>Name: {animal.name}</Text>
            <Text>Species: {animal.species}</Text>
            <Text>Birthdate: {animal.birthdate}</Text>
            <Text>Price: {animal.price}</Text>
            <Button title="Update" onPress={() => navigation.navigate('UpdateAnimalForSale', { animalId: animal.id })} />
            <Button title="Delete" onPress={deleteAnimalForSale} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default AnimalForSaleDetails;
