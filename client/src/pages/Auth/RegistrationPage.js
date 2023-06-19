import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

function RegistrationPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword ] = useState("")

  const register = async () => {
    try {
      await axios.post('http://localhost:7000/users/register', { 
        email, password, firstName, lastName , confirmPassword
      });
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
    <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName} value={firstName}/>
    <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName} value={lastName}/>
    <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email}/>
    <TextInput style={styles.input} placeholder="Password" onChangeText={setPassword} value={password} secureTextEntry />
    <TextInput style={styles.input} placeholder='confirmPassword' onChangeText={setConfirmPassword} value={confirmPassword} secureTextEntry />
    <Button title="Register" onPress={register} />
    <View style={styles.navigateContainer}>
      <Text>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navigateText}>Login</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  navigateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  navigateText: {
    color: 'blue',
    marginLeft: 5,
  },
});

export default RegistrationPage;
