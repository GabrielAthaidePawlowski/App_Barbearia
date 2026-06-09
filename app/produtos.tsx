import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { barbeiro } from '@/data/arrayBarbeiro';
import ProdutoCard from '@/components/BarbeiroCards';
import { Stack, useFocusEffect } from 'expo-router'; // Importado useFocusEffect

// IMPORTAÇÕES DO BANCO E REPOSITÓRIOS
import { getDB, DB } from '../src/database'; 
import { salvarItemDB, removerItemDB, listarIdsPorTipoDB } from '../src/repositories/AgendamentoRepository';
import { checarUsuarioLogadoDB } from '../src/repositories/UsuarioRepository';

export default function Produtos() {
    const [itens] = useState(barbeiro);
    const [favoritos, setFavoritos] = useState<number[]>([]); 
    const [database, setDatabase] = useState<DB | null>(null);
    const [emailLogado, setEmailLogado] = useState<string>('');

    // O useFocusEffect roda AUTOMATICAMENTE toda vez que a tela ganha foco (quando o usuário volta para ela)
    useFocusEffect(
        React.useCallback(() => {
            async function atualizarTela() {
                try {
                    const db = await getDB();
                    setDatabase(db);

                    const usuario = await checarUsuarioLogadoDB(db);
                    if (usuario) {
                        setEmailLogado(usuario.email);
                        const favoritadosNoBanco = await listarIdsPorTipoDB(db, 'favorito', usuario.email);
                        const idsFavoritos = favoritadosNoBanco.map(item => item.corte_id);
                        setFavoritos(idsFavoritos);
                    }
                } catch (error) {
                    console.error("Erro ao atualizar favoritos ao focar a tela:", error);
                }
            }
            atualizarTela();
        }, [])
    );

    const handleFavorito = async (id: number, titulo: string) => {
        if (!database || !emailLogado) return;

        try {
            if (favoritos.includes(id)) {
                await removerItemDB(database, id, 'favorito', emailLogado);
                setFavoritos(favoritos.filter(favId => favId !== id)); 
                Alert.alert("Removido", `"${titulo}" saiu dos favoritos.`);
            } else {
                const dataAtual = new Date().toLocaleString('pt-BR');
                await salvarItemDB(database, id, titulo, dataAtual, 'favorito', emailLogado);
                setFavoritos([...favoritos, id]); 
                Alert.alert("Favoritado!", `"${titulo}" está nos seus favoritos salvos!`);
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível atualizar os favoritos.");
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Produtos e Serviços' }} />
            <View style={styles.body}>
                <FlatList 
                    data={itens}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ProdutoCard 
                            produto={item} 
                            isFavorito={favoritos.includes(item.id)}
                            onFavoritar={() => handleFavorito(item.id, item.titulo)} 
                        />
                    )}
                    contentContainerStyle={styles.listPadding}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    body: { flex: 1, backgroundColor: "#1a202c" },
    listPadding: { paddingVertical: 20 }
});