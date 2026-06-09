import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Stack } from 'expo-router';

export default function Sobre() {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen 
                options={{ 
                    title: "Sobre nós",
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerStyle: { backgroundColor: '#f1f1f1' },
                    headerTintColor: '#1a202c'
                }} 
            />

            <ScrollView contentContainerStyle={styles.body}>
                <Image 
                    source={require('../assets/images/Stylebyte.png')} 
                    style={styles.mainLogo} 
                    resizeMode="contain"
                />
                <View style={styles.caixaTexto}>
                    <Text style={styles.tituloSobre}>StyleByte Barbearia</Text>
                    <Text style={styles.descricao}>
                        A melhor barbearia da região de Belo Horizonte! Unimos a tradição do corte de navalha com a modernidade que você procura.
                    </Text>
                    <Text style={styles.descricao}>
                        Fundada em 2026, nossa missão é cuidar do seu estilo com produtos de alta qualidade e os melhores profissionais do mercado.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flexGrow: 1,
        alignItems: "center",
        backgroundColor: "#1a202c",
        paddingVertical: 30
    },
    mainLogo: { 
        width: 800, 
        height: 250,
        marginBottom: 20
    },
    caixaTexto: {
        backgroundColor: "#f1f1f1",
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 15
    },
    tituloSobre: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#1a202c",
        marginBottom: 10,
        textAlign: 'center'
    },
    descricao: {
        fontSize: 16,
        color: "#4d4949",
        lineHeight: 24,
        marginBottom: 10,
        textAlign: 'center'
    }
});