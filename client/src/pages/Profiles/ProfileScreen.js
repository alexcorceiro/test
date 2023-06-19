import React,{useState, useEffect} from "react";
import { View, Text, Button , StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen({ navigation }) {
  const [user, setUser ] = useState(null)

  useEffect(() => {
    const fecthUser = async () => {
      const token = await AsyncStorage.getItem("token")
      try{
        const response = await axios.get("http://localhost:7000/users/profile", { headers: { Authorization: `Bearer ${token}`}})
        setUser(response.data)
      }catch(err){
        console.log(err)
      }
    }
    fecthUser()
  },[ ])

  const handleUpdate = () => {
    navigation.navigate("UpdateProfile")
  }

  const handleDeleteAccount = async () => {
    const token = await AsyncStorage.getItem("token")
    try{
      await axios.delete(`http://localhost:7000/users/deleteuser`, { headers: { Authorization: `Bearer ${token}`}})
      navigation.navigate('Login')
    }catch(err){
      console.log(err)
    }
  }
  return (
    <View style={styles.container}>
    {user && (
      <>
      <Text>Prenom: {user.firstName}</Text>
      <Text>Nom: {user.lastName}</Text> 
      <Text>Email: {user.email}</Text>
      <Text>Adress: {user.address}</Text>
      <Text>City: {user.city}</Text>
      <Text>Pays: {user.country}</Text>
      <Button title="Mettre a jour le compte" onPress={handleUpdate} />
      <Button title="Supprimer mon compte" onPress={handleDeleteAccount}/>
      </>
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
})

export default ProfileScreen;
