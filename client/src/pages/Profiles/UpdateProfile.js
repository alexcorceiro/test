import React, {useEffect, useState} from "react";
import {View, TextInput, Button, StyleSheet } from "react-native"
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

function UpdateProfile({ navigation }) {
  const [firstName, setFirstName] = useState("")
  const [lastName , setLastName ] = useState("")
  const [email, setEmail ] = useState("")
  const [address, setAddress ] = useState("")
  const [city, setCity ] = useState("")
  const [country, setCountry ] = useState("")



  const handleUpdateProfile = async () => {
      const token = AsyncStorage.getItem('token')
      try{
          await axios.put(`http://localhost:7000/users/update`, 
          {firstName, lastName, email, address, city, country}, 
          {headers : {Authorization: `Bearer ${token}`}})
          navigation.navigate("Profile")
      }catch(err){
          console.log({ message: err.message})
      }
  }
  return (
    <View style={StyleSheet.container}>
    <TextInput value={firstName} onChangeText={text => setFirstName(text)} placeholder="Prenom" style={styles.input}/>
    <TextInput value={lastName} onChangeText={ text =>setLastName(text)} placeholder="Nom" style={styles.input}/>
    <TextInput value={email} onChangeText={text => setEmail(text)} placeholder="email" style={styles.input}/>
    <TextInput value={address} onChangeText={text => setAddress(text)} placeholder="address" style={styles.input}/>
    <TextInput value={city} onChangeText={ text => setCity(text)} placeholder="Ville" style={styles.input}/>
    <TextInput value={country} onChangeText={text => setCountry(text)} placeholder="Pays" style={styles.input}/>
    <Button title="update Profile" onPress={handleUpdateProfile} />
</View>
  );
}

const styles = StyleSheet.create({
  container: {
      padding: 10, 
      flex: 1, 
      justifyContent: "center",
      marginTop: 20
  },
  input: {
      marginBottom: 20,
      marginTop:25,
      padding: 10,
      margin: 5
  }
})

export default UpdateProfile;
