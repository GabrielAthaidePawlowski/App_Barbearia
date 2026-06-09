import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Stack, useFocusEffect } from 'expo-router';

export default function Contatos() {
    const [listaContatos] = useState([
        { id: '1', nome: 'Recepção', info: '(31) 9999-9999' },
        { id: '2', nome: 'Barbeiro Gabriel', info: '(31) 8888-8888' },
        { id: '3', nome: 'Barbeiro Athaide', info: '(31) 7777-7777' },
        { id: '4', nome: 'Gerência', info: 'contato@stylebyte.com' },
    ]);

    return (
        <View style={styles.principal}>
            <Stack.Screen options={{ title: 'Contatos' }} />
            
            

            <View style={styles.body}>
                <FlatList
                    data={listaContatos}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemLista}>
                            <Text style={styles.itemTitulo}>{item.nome}</Text>
                            <Text style={styles.itemSub}>{item.info}</Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingVertical: 20 }}
                />
            </View>

            
        </View>
    );
}

const styles = StyleSheet.create({
    principal: { flex: 1 },
    header: {
        height: 120,
        backgroundColor: "#2f81b8",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30
    },
    body: {
        flex: 1,
        backgroundColor: "#1a202c",
    },
    footer: {
        height: 50,
        backgroundColor: "#297067",
        justifyContent: "center",
        alignItems: "center"
    },
    nav: { marginTop: 10 },
    Link: {
        fontSize: 14,
        color: "#f1f1f1",
        textAlign: "left",
        textDecorationLine: 'underline'
    },
    textoHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#f1f1f1"
    },
    itemLista: {
        backgroundColor: "#f1f1f1",
        marginHorizontal: 20,
        marginVertical: 8,
        padding: 15,
        borderRadius: 10,
        elevation: 2
    },
    itemTitulo: { fontSize: 18, fontWeight: 'bold', color: "#131111" },
    itemSub: { fontSize: 16, color: "#3d95d3", fontWeight: '600' }
});