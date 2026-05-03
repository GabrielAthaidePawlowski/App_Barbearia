import React, { useState } from 'react';
// 1. Adicionado Image na importação abaixo
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    console.log("Login realizado com sucesso!");
    router.replace('/Inicial'); 
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ headerShown: false }} /> 
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            {/* Imagem do Logo */}
            <Image 
                source={require('../assets/images/Stylebyte.png')} 
                style={styles.imagem} 
                resizeMode="contain" 
            />
            
            <Text style={styles.title}>StyleByte</Text>
            <Text style={styles.subtitle}>Acesse sua conta para agendar</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput 
                style={styles.input} 
                placeholder="seu@email.com" 
                value={email} 
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Sua senha" 
                secureTextEntry 
                value={password} 
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin}>
              <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Ainda não tem conta?</Text>
              <TouchableOpacity onPress={() => router.push('/criar_conta' as any)}>
                <Text style={styles.link}> Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1a202c' },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 24, 
    elevation: 4, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10,
    alignItems: 'center' // Centraliza a imagem e textos dentro do card
  },
  // 2. Adicionado o estilo da imagem aqui
  imagem: {
    width: 500,
    height: 500,
    borderBottomEndRadius: 20,
    marginBottom: 20,
  },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1a202c', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30, marginTop: 5 },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, alignSelf: 'flex-start' },
  inputGroup: { marginBottom: 20, width: '100%' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 10, 
    padding: 14, 
    backgroundColor: '#f9f9f9', 
    fontSize: 16 
  },
  btnPrimary: { 
    backgroundColor: '#1a202c', 
    padding: 16, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10,
    width: '100%'
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 25 },
  footerText: { color: '#666' },
  link: { color: '#1a202c', fontWeight: 'bold' }
});