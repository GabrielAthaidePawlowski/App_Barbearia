import * as SQLite from 'expo-sqlite';

export type DB = SQLite.SQLiteDatabase;

// Variável global para segurar a conexão ativa na memória do aparelho
let conexaoAtiva: DB | null = null;

export async function getDB(): Promise<DB> {
    // Se a conexão já existir e estiver aberta, reutiliza ela imediatamente
    if (conexaoAtiva) {
        return conexaoAtiva;
    }

    // Caso contrário, abre a base definitiva vinculada por usuário
    const db = await SQLite.openDatabaseAsync('stylebyte_usuarios.db');
    conexaoAtiva = db;

    try {
        // Criamos a tabela de usuários de forma isolada
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                logado INTEGER DEFAULT 0
            );
        `);

        // Criamos a tabela de agendamentos com a coluna do e-mail
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS agendamentos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                usuario_email TEXT NOT NULL,
                corte_id INTEGER NOT NULL,
                titulo TEXT NOT NULL,
                data_hora TEXT NOT NULL,
                tipo TEXT NOT NULL
            );
        `);
    } catch (error) {
        console.error("Erro ao estruturar as tabelas nativas:", error);
    }

    return db;
}