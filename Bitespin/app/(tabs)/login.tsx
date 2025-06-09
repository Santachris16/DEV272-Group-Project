import { useState } from 'react';
import React = require('react');
import { Button, Text, TextInput, View } from 'react-native';

export default function AuthScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', email, password);
  };

  const handleRegister = () => {
    console.log('Registering with:', email, password, confirmPassword);
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>
        {isRegistering ? 'Register' : 'Login'}
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      {isRegistering && (
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
        />
      )}

      <Button
        title={isRegistering ? 'Register' : 'Login'}
        onPress={isRegistering ? handleRegister : handleLogin}
      />

      <View style={{ marginTop: 12 }}>
        <Button
          title={isRegistering ? 'Switch to Login' : 'Switch to Register'}
          onPress={() => setIsRegistering(!isRegistering)}
        />
      </View>
    </View>
  );
}
