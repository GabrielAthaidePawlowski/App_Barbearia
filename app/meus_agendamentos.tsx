import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getDB, DB } from '../src/database';
import { removerItemDB, listarCortesAgendadosCompletosDB, AgendamentoItem } from '../src/repositories/AgendamentoRepository';
import { checarUsuarioLogadoDB } from '../src/repositories/UsuarioRepository';
import { Stack, useFocusEffect } from 'expo-router';

export default function MeusAgendamentos() {
    const [agendamentos, setAgendamentos] = useState<AgendamentoItem[]>([]);
    const [database, setDatabase] = useState<DB | null>(null);
    const [emailLogado, setEmailLogado] = useState<string>('');

    async function carregarAgendamentos(db: DB, email: string) {
        try {
            const dados = await listarCortesAgendadosCompletosDB(db, email);
            setAgendamentos(dados);
        } catch (error) {
            console.error("Erro ao carregar agendamentos:", error);
        }
    }

    useEffect(() => {
        async function iniciar() {
            const db = await getDB();
            setDatabase(db);

            const usuario = await checarUsuarioLogadoDB(db);
            if (usuario) {
                setEmailLogado(usuario.email);
                await carregarAgendamentos(db, usuario.email);
            }
        }
        iniciar();
    }, []);

    const handleCancelar = async (corteId: number, titulo: string) => {
        if (!database || !emailLogado) return;
        
        Alert.alert("Cancelar", `Deseja desmarcar o serviço: ${titulo}?`, [
            { text: "Não" },
            { 
                text: "Sim", 
                onPress: async () => {
                    await removerItemDB(database, corteId, 'agendado', emailLogado);
                    await carregarAgendamentos(database, emailLogado); 
                } 
            }
        ]);
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Meus Agendamentos' }} />
            {agendamentos.length === 0 ? (
                <Text style={styles.textoVazio}>Nenhum agendamento marcado para a sua conta.</Text>
            ) : (
                <FlatList
                    data={agendamentos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.cardAgendamento}>
                            <View>
                                <Text style={styles.corteTitulo}>{item.titulo}</Text>
                                <Text style={styles.corteData}> {item.data_hora}</Text>
                            </View>
                            <TouchableOpacity 
                                style={styles.btnCancelar}
                                onPress={() => handleCancelar(item.corte_id, item.titulo)}
                            >
                                <Text style={styles.txtCancelar}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1a202c', padding: 20 },
    topoTitulo: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
    textoVazio: { color: '#aaa', textAlign: 'center', marginTop: 40, fontSize: 16 },
    cardAgendamento: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    corteTitulo: { fontSize: 18, fontWeight: 'bold', color: '#1a202c' },
    corteData: { fontSize: 14, color: '#555', marginTop: 4 },
    btnCancelar: { backgroundColor: '#e53e3e', padding: 8, borderRadius: 6 },
    txtCancelar: { color: '#fff', fontWeight: 'bold' }
});