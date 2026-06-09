import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';

// IMPORTAÇÕES DO BANCO DE DADOS
import { getDB, DB } from '../src/database';
import { realizarLoginDB, buscarUsuarioPorEmailDB } from '../src/repositories/UsuarioRepository';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState<DB | null>(null);

  // Inicializa o banco de dados assim que a tela abre
  useEffect(() => {
    async function iniciarBanco() {
      try {
        const db = await getDB();
        setDatabase(db);
      } catch (error) {
        console.error("Erro ao carregar o banco no Login:", error);
      }
    }
    iniciarBanco();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (!database) {
      Alert.alert("Erro", "Banco de dados não carregado.");
      return;
    }

    try {
      // Realiza o SELECT no SQLite procurando pelo e-mail limpo (sem espaços extras)
      const usuarioExiste = await buscarUsuarioPorEmailDB(database, email.trim());

      if (usuarioExiste) {
        // Altera o status do usuário logado para 1
        await realizarLoginDB(database, email.trim());
        router.replace('/Inicial'); 
      } else {
        // Bloqueia se o e-mail digitado não foi cadastrado na tela de Criar Conta
        Alert.alert("Acesso Negado", "Este e-mail não está registrado no StyleByte.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível validar seu acesso local.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Stack.Screen options={{ headerShown: false }} /> 
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          
          <View style={styles.headerImagem}>
            <Image 
                source={require('../assets/images/Stylebyte.png')} 
                style={styles.logo} 
                resizeMode="contain" 
            />
          </View>

          <View style={styles.card}>
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
  safe: { 
    flex: 1, 
    backgroundColor: '#1a202c' 
  },
  container: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 20 
  },
  headerImagem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 450,
    height: 300,
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 24, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 10,
    elevation: 5
  },
  subtitle: { 
    fontSize: 14, 
    color: '#666', 
    textAlign: 'center', 
    marginBottom: 30, 
    marginTop: 5 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#333', 
    marginBottom: 8 
  },
  inputGroup: { 
    marginBottom: 20, 
    width: '100%' 
  },
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
  btnText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 25 
  },
  footerText: { 
    color: '#666' 
  },
  link: { 
    color: '#1a202c', 
    fontWeight: 'bold' 
  }
});