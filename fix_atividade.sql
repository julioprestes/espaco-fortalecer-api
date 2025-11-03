-- SOLUÇÃO: Criar a atividade corretamente
-- Execute este SQL no PostgreSQL

-- Deletar se existir (para recriar limpo)
DELETE FROM atividades WHERE id = 1;

-- Criar a atividade
INSERT INTO atividades (id, titulo, fase, created_at, updated_at) 
VALUES (1, 'Reconhecimento de Letras', 'Alfabetização', NOW(), NOW());

-- Verificar se foi criada
SELECT * FROM atividades WHERE id = 1;

-- Teste: inserir um progresso (troque o id_crianca pelo ID de uma criança real)
-- Se você tiver uma criança com ID 1, por exemplo:
INSERT INTO progressos (id_crianca, id_atividade, resposta_dada, foi_correto, data_hora) 
VALUES (1, 1, 'A', true, NOW());

-- Verificar se o progresso foi inserido
SELECT * FROM progressos WHERE id_atividade = 1;
