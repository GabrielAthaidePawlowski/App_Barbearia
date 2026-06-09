import { DB } from '../database';

// Salva o usuário que acabou de logar
export async function realizarLoginDB(db: DB, email: string): Promise<void> {
    // Garante que nenhum outro usuário fique marcado como logado antes
    await db.runAsync('UPDATE usuarios SET logado = 0');
    // Insere ou atualiza o status do usuário atual
    await db.runAsync(
        'INSERT INTO usuarios (email, logado) VALUES (?, 1)',
        [email]
    );
}
// Adicione esta função junto com as outras que já criamos lá:
export async function buscarUsuarioPorEmailDB(db: DB, email: string): Promise<boolean> {
    const resultado = await db.getAllAsync<{ id: number }>(
        'SELECT id FROM usuarios WHERE email = ? LIMIT 1',
        [email]
    );
    // Retorna true se achou o e-mail cadastrado, ou false se não existir
    return resultado.length > 0;
}

// Checa se tem alguém logado (usado na abertura do app)
export async function checarUsuarioLogadoDB(db: DB): Promise<{ email: string } | null> {
    const resultado = await db.getAllAsync<{ email: string }>(
        'SELECT email FROM usuarios WHERE logado = 1 LIMIT 1'
    );
    return resultado.length > 0 ? resultado[0] : null;
}

// Desloga o usuário (Botão Sair)
export async function realizarLogoutDB(db: DB): Promise<void> {
    await db.runAsync('UPDATE usuarios SET logado = 0');
}