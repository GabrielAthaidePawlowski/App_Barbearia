import {Stack} from 'expo-router'

export default function RootLayout(){
    return(
        <Stack>
            <Stack.Screen name= "index" options={{title: "Tela Incial"}}/>
            <Stack.Screen name= "produto/[id]" options={{title: "Detalhes barbeiro"}}/>
        </Stack>
    )
}