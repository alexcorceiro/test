import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:7000/users/profile", { headers: { Authorization: `Bearer ${token}` } });
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = () => {
    navigation.navigate("UpdateProfile");
  };

  const handleDeleteAccount = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:7000/users/deleteuser`, { headers: { Authorization: `Bearer ${token}` } });
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {user && (
        <>
          <Text style={styles.header}>Profile Information</Text>
          <Text style={styles.label}>Prenom: <Text style={styles.info}>{user.firstName}</Text></Text>
          <Text style={styles.label}>Nom: <Text style={styles.info}>{user.lastName}</Text></Text>
          <Text style={styles.label}>Email: <Text style={styles.info}>{user.email}</Text></Text>
          <Text style={styles.label}>Adress: <Text style={styles.info}>{user.address}</Text></Text>
          <Text style={styles.label}>City: <Text style={styles.info}>{user.city}</Text></Text>
          <Text style={styles.label}>Pays: <Text style={styles.info}>{user.country}</Text></Text>
          <View style={styles.buttonContainer}>
            <Button title="Mettre a jour le compte" onPress={handleUpdate} color="#006400" />
            <Button title="Supprimer mon compte" onPress={handleDeleteAccount} color="#ff4500" />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3c3c3c',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#696969',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: '#808080',
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
