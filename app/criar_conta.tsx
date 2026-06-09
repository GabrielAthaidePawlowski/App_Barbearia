import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';

// IMPORTAÇÃO DOS ÍCONES PADRÃO DO EXPO
import { Ionicons } from '@expo/vector-icons';

// IMPORTAÇÃO DO BANCO DE DADOS
import { getDB, DB } from '../src/database';

export default function CriarConta() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState(''); 
    const [database, setDatabase] = useState<DB | null>(null);

    // Inicializa o banco de dados
    useEffect(() => {
        async function iniciarBanco() {
            try {
                const db = await getDB();
                setDatabase(db);
            } catch (error) {
                console.error("Erro ao carregar o banco no Cadastro:", error);
            }
        }
        iniciarBanco();
    }, []);

    const handleCadastro = async () => {
        if (!nome || !email || !senha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        if (!database) {
            Alert.alert("Erro", "Banco de dados não carregado.");
            return;
        }

        try {
            await database.runAsync(
                'INSERT INTO usuarios (email, logado) VALUES (?, 0)', 
                [email.trim()]
            );

            Alert.alert("Sucesso", `Olá ${nome}, conta criada com sucesso!`, [
                { text: "OK", onPress: () => router.back() } 
            ]);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível cadastrar o usuário no banco local.");
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
                    
                    {/* CARD BRANCO */}
                    <View style={styles.card}>
                        
                        {/* HEADER DO CARD COM O ÍCONE NATIVO AJUSTADO */}
                        <View style={styles.cardHeader}>
                            <TouchableOpacity style={styles.btnVoltarIcone} onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={24} color="#1a202c" />
                            </TouchableOpacity>
                            <Text style={styles.title}>Criar Conta</Text>
                            {/* Espaçador para manter o título perfeitamente centralizado */}
                            <View style={{ width: 28 }} /> 
                        </View>

                        <Text style={styles.subtitle}>Preencha os dados abaixo para se cadastrar</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nome Completo</Text>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Seu nome" 
                                value={nome} 
                                onChangeText={setNome} 
                            />
                        </View>
                        
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
                                placeholder="Crie uma senha" 
                                value={senha} 
                                onChangeText={setSenha} 
                                secureTextEntry 
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity style={styles.btnPrimary} onPress={handleCadastro}>
                            <Text style={styles.btnText}>Cadastrar</Text>
                        </TouchableOpacity>
                        
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Já tem uma conta?</Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={styles.link}> Fazer Login</Text>
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
    card: { 
        backgroundColor: '#fff', 
        borderRadius: 20, 
        padding: 24, 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 10,
        elevation: 5
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 5
    },
    btnVoltarIcone: {
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#1a202c',
        textAlign: 'center',
    },
    subtitle: { 
        fontSize: 14, 
        color: '#666', 
        textAlign: 'center', 
        marginBottom: 25, 
        marginTop: 8 
    },
    label: { 
        fontSize: 14, 
        fontWeight: '600', 
        color: '#333', 
        marginBottom: 8 
    },
    inputGroup: { 
        marginBottom: 18, 
        width: '100%' 
    },
    input: { 
        borderWidth: 1, 
        borderColor: '#ddd', 
        borderRadius: 10, 
        padding: 14, 
        backgroundColor: '#f9f9f9', 
        fontSize: 16,
        color: '#000'
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