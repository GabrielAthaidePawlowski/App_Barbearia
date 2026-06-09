import { prodType } from '@/types/prodType';

export const barbeiro: prodType[] = [
    {
        id: 1,
        titulo: "Corte Masculino",
        descricao: "Corte tesoura ou máquina, inclui lavagem e finalização com pomada.",
        preco: "45.00",
        imagem: require("../assets/images/corteMasculino.png")
    },
    {
        id: 2, 
        titulo: "Barba Completa",
        descricao: "Design de barba com toalha quente, óleo essencial e pós-barba.",
        preco: "35.00", 
        imagem: require("../assets/images/barba.png") 
    },
    {
        id: 3, 
        titulo: "Aparagem de Bigode",
        descricao: "Aparagem técnica e alinhamento do bigode com navalha.",
        preco: "15.00", 
        imagem: require("../assets/images/bigode.png")
    },
    {
        id: 4, 
        titulo: "Combo: Cabelo + Barba",
        descricao: "Pacote completo para renovar o visual com desconto especial.",
        preco: "70.00", 
        imagem: require("../assets/images/cabeloBarba.png")
    },
    {
        id: 5, 
        titulo: "Corte Degradê / Fade",
        descricao: "Técnica de degradê moderno (Low, Mid ou High Fade).",
        preco: "50.00", 
        imagem: require("../assets/images/geral.png")
    },
    {
        id: 6, 
        titulo: "Sobrancelha na Navalha",
        descricao: "Limpeza e design de sobrancelha masculina com navalha.",
        preco: "10.00", 
        imagem: require("../assets/images/geral.png")
    },
    {
        id: 7, 
        titulo: "Pezinho / Acabamento",
        descricao: "Apenas o contorno do cabelo e nuca para manter o corte em dia.",
        preco: "20.00", 
        imagem: require("../assets/images/geral.png")
    }
];