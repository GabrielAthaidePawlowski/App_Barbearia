import { router } from 'expo-router'
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { prodType } from '@/types/prodType';

type Props = {
    produto: prodType;
    isFavorito: boolean;
    onFavoritar: () => void; 
}

export default function ProdutoCard({ produto, isFavorito, onFavoritar }: Props) {
    return (
        <View style={styles.card}>
            <TouchableOpacity 
                style={styles.info} 
                onPress={() => router.push(`/Itens/${produto.id}`)}
            >
                <Text style={styles.titulo}>{produto.titulo}</Text>
                <Text style={styles.preco}>R$ {produto.preco}</Text>
            </TouchableOpacity>

            <View style={styles.rightSection}>
                <TouchableOpacity onPress={onFavoritar} style={styles.starBtn}>
                    <Text style={{ fontSize: 24, color: isFavorito ? "#FFD700" : "#ccc" }}>
                        {isFavorito ? "★" : "☆"}
                    </Text>
                </TouchableOpacity>
                <Image source={produto.imagem} style={styles.imagem} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#f1f1f1",
        borderRadius: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 2,
    },
    info: { flex: 1, gap: 6 },
    rightSection: { flexDirection: 'row', alignItems: 'center' },
    starBtn: { padding: 5 },
    titulo: { fontSize: 18, color: "#131111", fontWeight: '700' },
    preco: { fontSize: 16, color: "#3d95d3", fontWeight: '600' },
    imagem: { width: 80, height: 80, borderRadius: 12, marginLeft: 12 }
});