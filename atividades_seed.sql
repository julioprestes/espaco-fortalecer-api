-- Inserir atividades padrão do sistema
-- Execute este SQL no seu banco de dados PostgreSQL

INSERT INTO atividades (id, titulo, fase, imagem_path, resposta_correta, created_at, updated_at) 
VALUES 
  (1, 'Reconhecimento de Letras', 'Alfabetização', NULL, NULL, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Resetar a sequência para não conflitar com IDs futuros
SELECT setval('atividades_id_seq', (SELECT MAX(id) FROM atividades), true);
