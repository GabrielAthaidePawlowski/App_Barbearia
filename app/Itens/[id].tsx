import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams, Stack } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { barbeiro } from "@/data/arrayBarbeiro";
import DateTimePicker from '@react-native-community/datetimepicker';

// IMPORTAÇÕES DO BANCO E REPOSITÓRIOS
import { getDB, DB } from "../../src/database"; 
import { salvarItemDB, removerItemDB, listarIdsPorTipoDB } from "../../src/repositories/AgendamentoRepository";
import { checarUsuarioLogadoDB } from "../../src/repositories/UsuarioRepository";

export default function Id() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const produto = barbeiro.find((p) => p.id === Number(id));

  const [database, setDatabase] = useState<DB | null>(null);
  const [jaAgendado, setJaAgendado] = useState(false);
  const [emailLogado, setEmailLogado] = useState<string>('');
  
  const [dataObjeto, setDataObjeto] = useState(new Date());
  const [modoPicker, setModoPicker] = useState<'date' | 'time'>('date');
  const [mostrarPicker, setMostrarPicker] = useState(false);

  useEffect(() => {
    async function verificarAgendamento() {
      try {
        const db = await getDB();
        setDatabase(db);

        const usuario = await checarUsuarioLogadoDB(db);
        if (usuario && produto) {
          setEmailLogado(usuario.email);
          const agendados = await listarIdsPorTipoDB(db, 'agendado', usuario.email);
          const existe = agendados.some(item => item.corte_id === produto.id);
          setJaAgendado(existe);
        }
      } catch (error) {
        console.error("Erro ao verificar agendamentos:", error);
      }
    }
    verificarAgendamento();
  }, [produto]);

  if (!produto) return <Text>Corte não encontrado</Text>;

  const handleMudarDataHora = async (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setMostrarPicker(false);
      return;
    }

    if (selectedDate) {
      const novaData = new Date(dataObjeto);

      if (modoPicker === 'date') {
        novaData.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        setDataObjeto(novaData);
        setMostrarPicker(false);
        setTimeout(() => {
          setModoPicker('time');
          setMostrarPicker(true);
        }, 200); 

      } else {
        novaData.setHours(selectedDate.getHours(), selectedDate.getMinutes());
        setDataObjeto(novaData);
        setMostrarPicker(false); 

        if (!database || !emailLogado) return;

        try {
          const dataHoraFinal = novaData.toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
          });

          await salvarItemDB(database, produto.id, produto.titulo, dataHoraFinal, 'agendado', emailLogado);
          setJaAgendado(true);
          Alert.alert("Agendamento Concluído!", `"${produto.titulo}" reservado para:\n📅 ${dataHoraFinal}`);
        } catch (error) {
          Alert.alert("Erro", "Não foi possível salvar o agendamento.");
        }
      }
    }
  };

  const handleBotaoAgendar = async () => {
    if (!database || !emailLogado) return;

    if (jaAgendado) {
      await removerItemDB(database, produto.id, 'agendado', emailLogado);
      setJaAgendado(false);
      Alert.alert("Cancelado", "Agendamento removido.");
    } else {
      setModoPicker('date');
      setMostrarPicker(true);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: produto.titulo }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Image style={styles.imagem} source={produto.imagem} resizeMode="cover" />
          <View style={styles.infoContainer}>
            <Text style={styles.titulo}>{produto.titulo}</Text>
            <Text style={styles.preco}>R$ {Number(produto.preco).toFixed(2)}</Text>
            <View style={styles.divider} />
            <Text style={styles.descricao}>{produto.descricao}</Text>

            <TouchableOpacity 
              style={[styles.botaoComprar, jaAgendado && styles.botaoAgendado]} 
              onPress={handleBotaoAgendar}
            >
              <Text style={styles.textoBotao}>
                {jaAgendado ? "✓ Já Agendado" : "Escolher Data e Agendar"}
              </Text>
            </TouchableOpacity>

            {mostrarPicker && (
              <DateTimePicker
                value={dataObjeto}
                mode={modoPicker} 
                is24Hour={true}
                onChange={handleMudarDataHora}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a202c" },
  scrollContent: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  card: { backgroundColor: "#f1f1f1", borderRadius: 20, overflow: "hidden" },
  imagem: { width: "100%", height: 250 },
  infoContainer: { padding: 20 },
  titulo: { fontSize: 26, fontWeight: "bold", color: "#1a202c", textAlign: 'center' },
  preco: { fontSize: 32, color: "#3d95d3", fontWeight: "bold", textAlign: 'center', marginVertical: 10 },
  divider: { height: 1, backgroundColor: "#ddd", marginVertical: 15 },
  descricao: { fontSize: 18, color: "#4d4949", textAlign: 'center', marginBottom: 20 },
  botaoComprar: { backgroundColor: "#1a202c", paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  botaoAgendado: { backgroundColor: "#2f855a" }, 
  textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 20 },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a202c" },
  errorText: { fontSize: 20, color: "#fff", marginBottom: 20 },
  textoVoltar: { fontSize: 16, color: "#666", textDecorationLine: 'underline' },
  botaoVoltar: { padding: 15, alignItems: "center" }
});