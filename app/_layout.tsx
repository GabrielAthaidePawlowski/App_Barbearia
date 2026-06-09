import {Stack} from 'expo-router'

export default function RootLayout(){
    return(
        <Stack>
            <Stack.Screen name= "index" options={{title: "Tela Incial"}}/>
            <Stack.Screen name="Itens/[id]" options={{ title: "Detalhes corte" }} />
        </Stack>
    )
}