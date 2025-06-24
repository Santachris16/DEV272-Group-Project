import { useState } from 'react';
import React = require('react');
import { Button, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../../data/supabase';


export default function AuthScreen() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Login successful!');
      
      // Redirect to default (Home) tab
      router.replace('/');
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Registration successful! Check your email for verification.');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text className='dark:text-white' style={{ fontSize: 24, marginBottom: 16 }}>
        {isRegistering ? 'Register' : 'Login'}
      </Text>

      <TextInput
        className='bg-white'
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />

      <TextInput
        className='bg-white'
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

      {message ? (
        <Text style={{ color: 'red', marginTop: 12 }}>{message}</Text>
      ) : null}

      <View style={{ marginTop: 12 }}>
        <Button
          title={isRegistering ? 'Switch to Login' : 'Switch to Register'}
          onPress={() => {
            setMessage('');
            setIsRegistering(!isRegistering);
          }}
        />
      </View>
    </View>
  );
}

