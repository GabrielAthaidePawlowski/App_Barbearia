import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Link, useRouter, Stack } from 'expo-router';

// IMPORTAÇÕES DO BANCO DE DADOS
import { getDB, DB } from '../src/database';
import { realizarLogoutDB } from '../src/repositories/UsuarioRepository';

export default function Inicial() {
    const router = useRouter();
    const [database, setDatabase] = useState<DB | null>(null);

    // Inicializa o banco de dados na tela inicial
    useEffect(() => {
        async function iniciarBanco() {
            try {
                const db = await getDB();
                setDatabase(db);
            } catch (error) {
                console.error("Erro ao abrir banco na Inicial:", error);
            }
        }
        iniciarBanco();
    }, []);

    // Função sair atualizada para limpar o status de login no SQLite
    const handleSair = async () => {
        if (database) {
            try {
                await realizarLogoutDB(database);
            } catch (error) {
                console.error("Erro ao deslogar:", error);
            }
        }
        router.replace('/');
    };

    return (
        <View style={styles.principal}>
            <Stack.Screen 
                options={{ 
                    title: 'Barbearia StyleByte',
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: '#f1f1f1' },
                    headerTintColor: '#1a202c'
                }} 
            />

            <View style={styles.header}>
                <View style={styles.nav}>
                    <Link style={styles.Link} href={'/contatos'}>Contatos</Link>
                    <Link style={styles.Link} href={'/produtos'}>Produtos</Link>
                    
                    {/* NOVO LINK ADICIONADO PARA A TELA DE AGENDAMENTOS */}
                    <Link style={styles.Link} href={'/meus_agendamentos'}>Agendamentos</Link>
                    
                    <Link style={styles.Link} href={'/sobre'}>Sobre</Link>
                    
                    <TouchableOpacity onPress={handleSair}>
                        <Text style={[styles.Link, { color: '#e53e3e' }]}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.body}>
                <Image 
                    source={require('../assets/images/Stylebyte.png')} 
                    style={styles.mainLogo} 
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    principal: { flex: 1 },
    header: {
        height: 50, 
        backgroundColor: "#f1f1f1",
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#1a202c",
        justifyContent: "center",
    },
    nav: {
        flexDirection: "row",
        gap: 15, // Diminuí ligeiramente o gap para acomodar o novo link sem estourar o menu
        alignItems: 'center'
    },
    Link: {
        fontSize: 14, 
        color: "#1a202c",
        fontWeight: 'bold'
    },
    mainLogo: { 
        width: 600, // Ajustado de 600 para 300 para não vazar das bordas da maioria das telas de celular
        height: 300 
    }
});