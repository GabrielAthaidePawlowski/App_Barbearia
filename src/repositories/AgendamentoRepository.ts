import { DB } from '../database';

export type AgendamentoItem = {
    id: number;
    usuario_email: string;
    corte_id: number;
    titulo: string;
    data_hora: string;
    tipo: string;
};

// 1. LISTAR IDs POR TIPO E USUÁRIO (Filtra pelo e-mail logado)
export async function listarIdsPorTipoDB(db: DB, tipo: 'favorito' | 'agendado', usuarioEmail: string): Promise<{ corte_id: number }[]> {
    return db.getAllAsync<{ corte_id: number }>(
        'SELECT corte_id FROM agendamentos WHERE tipo = ? AND usuario_email = ?', 
        [tipo, usuarioEmail]
    );
}

// 2. LISTAR AGENDAMENTOS COMPLETOS DO USUÁRIO
export async function listarCortesAgendadosCompletosDB(db: DB, usuarioEmail: string): Promise<AgendamentoItem[]> {
    return db.getAllAsync<AgendamentoItem>(
        "SELECT * FROM agendamentos WHERE tipo = 'agendado' AND usuario_email = ? ORDER BY id DESC",
        [usuarioEmail]
    );
}

// 3. SALVAR ITEM VINCULADO AO USUÁRIO
export async function salvarItemDB(db: DB, corteId: number, titulo: string, dataHora: string, tipo: 'favorito' | 'agendado', usuarioEmail: string): Promise<void> {
    await db.runAsync(
        'INSERT INTO agendamentos (usuario_email, corte_id, titulo, data_hora, tipo) VALUES (?, ?, ?, ?, ?)',
        [usuarioEmail, corteId, titulo, dataHora, tipo]
    );
}

// 4. REMOVER ITEM DO USUÁRIO ESPECÍFICO
export async function removerItemDB(db: DB, corteId: number, tipo: 'favorito' | 'agendado', usuarioEmail: string): Promise<void> {
    await db.runAsync(
        'DELETE FROM agendamentos WHERE corte_id = ? AND tipo = ? AND usuario_email = ?', 
        [corteId, tipo, usuarioEmail]
    );
}