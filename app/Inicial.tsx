import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

export default function index() {
    return (
        <View style={styles.principal}>
            <View style={styles.header}>
                {/* Nome do seu novo projeto aqui! */}
                <Text style={styles.texto}>StyleByte App</Text> 
                
                <View style={styles.nav}>
                    <Link style={styles.Link} href={'/criar_conta'}>Criar Conta</Link>
                    <Link style={styles.Link} href={'/contatos'}>Contatos</Link>
                    <Link style={styles.Link} href={'/produtos'}>Produtos</Link>
                    <Link style={styles.Link} href={'/sobre'}>Sobre</Link>
                </View>
            </View>

            <View style={styles.body}>
                {/* Ajuste o caminho abaixo conforme a pasta onde salvou a foto. 
                   Se estiver em assets/images, o caminho será: 
                */}
               
          <Image 
            source={require('../assets/images/Stylebyte.png')} 
            style={styles.mainLogo} 
            resizeMode="contain"
          />
            </View>

            <View style={styles.footer}>
                <Text style={styles.texto}>copyright @2026 </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    principal: { flex: 1 },
    header: {
        height: 100, // Aumentei um pouco para caber o texto e os links melhor
        backgroundColor: "#2f81b8",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20
    },
    body: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#38c4ac",
        justifyContent: "center",
        gap: 16
    },
    footer: {
        height: 50,
        backgroundColor: "#297067",
        justifyContent: "center",
        alignItems: "center"
    },
    nav: {
        flexDirection: "row",
        gap: 20, // Diminuí um pouco o gap para não vazar da tela
        marginTop: 6,
    },
    Link: {
        fontSize: 16, // Ajustado para telas menores
        color: "#f1f1f1"
    },

    texto: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#f1f1f1"
    },
    mainLogo: { width: 140, height: 140, marginBottom: 20 },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: '#fff', opacity: 0.9, textAlign: 'center', marginTop: 12, fontSize: 16, lineHeight: 22 },
  btnGroup: { width: '100%', marginTop: 35, gap: 15 },
  buttonPrimary: { 
    backgroundColor: '#fff', padding: 16, borderRadius: 10, alignItems: 'center',
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2,
  },
});