import React, {useEffect, useState} from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native"
import { Card } from "react-native-paper"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AnimalForSaleList = ({ navigation }) => {
    const [animalForSale, setAnimalForSale ] = useState([])
    const [search, setSearch ] = useState("")

    useEffect(() => {
        fetchAnimalForSale();
    })

    const fetchAnimalForSale = async () => {
        try{
            const token = await AsyncStorage.getItem("token")
            const response = await axios.get("http://localhost:7000/animalforsale", { headers: { Authorization: `Bearer ${token}`}})
            setAnimalForSale(response.data)
        }catch(err){
            console.log(err)
        }
    }

    const filteredAnimalForSale = animalForSale.filter(animal => 
        animal.name.toLowerCase().includes(search.toLowerCase())
        )

    return(
        <View style={styles.container}>
        <TextInput
                style={styles.searchInput}
                placeholder="Search"
                onChangeText={text => setSearch(text)}
                value={search}
            />
            <Button title="Add Animal For Sale" onPress={() => navigation.navigate('AddAnimalForSale')} />
            <FlatList
                data={filteredAnimalForSale}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card} onPress={() => navigation.navigate('AnimalForSaleDetails', { animalId: item.id })}>
                        <Card.Title title={item.name} subtitle={item.species} />
                        <Text>Birthdate: {item.birthdate}</Text>
                        <Text>Price: {item.price}</Text>
                        <Card.Actions>
                            <Button title="Learn More" onPress={() => navigation.navigate('AnimalForSaleDetails', { animalId: item.id })} />
                        </Card.Actions>
                    </Card>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    card: {
        marginBottom: 10,
    },
});