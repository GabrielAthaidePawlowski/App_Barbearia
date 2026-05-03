import { router, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {  barbeiro} from "@/data/arrayBarbeiro";
import { Unidade } from "@/data/arrayUnidade";

export default function Id() {
  const todosOsProdutos = [...barbeiro,...Unidade]
  const { id } = useLocalSearchParams<{ id: string }>();
  const produto = todosOsProdutos.find((p) => p.id === Number(id));

  if (!produto) {
    return (
      <View style = {styles.errorText}>
        <Text>Sanduíche Não Encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.imagem}  source={produto.imagem} resizeMode="cover"/>
      
      <View>
        <Text style={styles.titulo}>{produto.titulo}</Text>
        <Text style={styles.preco}>R$ {produto.preco}</Text>
        <Text style={styles.descricao}>{produto.descricao}</Text>

        <TouchableOpacity style={styles.botaoComprar}>
          <Text style={styles.textoBotao}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoVoltar} onPress={() => router.back()}>
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  imagem: { width: "100%", height: 300, resizeMode: "cover" },
  content: { padding: 20, gap: 10 },
  titulo: { fontSize: 24, fontWeight: "bold", color: "#131111" },
  preco: { fontSize: 40, color: "#f01717", fontWeight: "600" },
  descricao: { fontSize: 25, color: "#666", lineHeight: 22 },
  botaoComprar: {
    backgroundColor: "#f01717",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  textoBotao: { color: "#fff", fontWeight: "bold", fontSize: 24 },
  botaoVoltar: { padding: 12, alignItems: "center", marginTop: 8 },
  textoVoltar: { fontSize: 14 ,color: "#666" },
  errorText: {fontSize: 16, color: "#4d4949", marginBottom: 16}
});