import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';

export default function Contatos() {
    const [listaContatos, setListaContatos] = useState<any[]>([]);
    const [carregando, setCarregando] = useState(true);

    async function carregarContatos() {
        try {
            // URL corrigida apontando para "Barbeiros" com a primeira letra maiúscula
            const resposta = await fetch('https://6a29fe9bf59cb8f65f1decf4.mockapi.io/Barbeiros');
            const dados = await resposta.json();
            
            console.log("Dados vindos do MockAPI:", dados);
            
            setListaContatos(dados);
        } catch (error) {
            console.error("Erro ao buscar dados do MockAPI:", error);
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarContatos();
    }, []);

    return (
        <View style={styles.principal}>
            <Stack.Screen options={{ title: 'Contatos' }} />

            <View style={styles.body}>
                {carregando ? (
                    <ActivityIndicator size="large" color="#3d95d3" style={{ marginTop: 40 }} />
                ) : (
                    <FlatList
                        data={listaContatos}
                        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemLista}>
                                <Text style={styles.itemTitulo}>
                                    {item.nome || item.Nome || "Profissional"}
                                </Text>
                                <Text style={styles.itemSub}>
                                    ✂️ {item.especialidade || item.Especialidade || "Barbeiro"}
                                </Text>
                                <Text style={[styles.itemSub, { color: '#666', marginTop: 4, fontSize: 14 }]}>
                                    📞 {item.telefone || item.Telefone || "Sem telefone"}
                                </Text>
                            </View>
                        )}
                        contentContainerStyle={{ paddingVertical: 20 }}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    principal: { flex: 1 },
    body: {
        flex: 1,
        backgroundColor: "#1a202c",
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