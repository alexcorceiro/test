import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


const AddAnimalForSale = ({ navigation }) => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async () => {
        const token = await AsyncStorage.getItem("token")
        try {
            await axios.post('http://localhost:7000/animals_for_sale', { name, species, birthdate, price }, { headers: { Authorization: `Bearer ${token}`}});
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} placeholder="Name" onChangeText={text => setName(text)} value={name} />
            <TextInput style={styles.input} placeholder="Species" onChangeText={text => setSpecies(text)} value={species} />
            <TextInput style={styles.input} placeholder="Birthdate" onChangeText={text => setBirthdate(text)} value={birthdate} />
            <TextInput style={styles.input} placeholder="Price" onChangeText={text => setPrice(text)} value={price} />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
});

export default AddAnimalForSale;
