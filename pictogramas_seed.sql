-- Script para popular a tabela de pictogramas com dados de exemplo
-- Execute este script no seu banco de dados PostgreSQL

INSERT INTO pictogramas (texto, imagem_path, categoria, created_at, updated_at) VALUES
('Comer', '/images/comer.png', 'necessidades', NOW(), NOW()),
('Beber', '/images/beber.png', 'necessidades', NOW(), NOW()),
('Brincar', '/images/brincar.png', 'atividades', NOW(), NOW()),
('Banheiro', '/images/banheiro.png', 'necessidades', NOW(), NOW()),
('Sim', '/images/sim.png', 'respostas', NOW(), NOW()),
('Não', '/images/nao.png', 'respostas', NOW(), NOW()),
('Ajuda', '/images/ajuda.png', 'necessidades', NOW(), NOW()),
('Dormir', '/images/dormir.png', 'atividades', NOW(), NOW()),
('Música', '/images/musica.png', 'atividades', NOW(), NOW()),
('Mais', '/images/mais.png', 'respostas', NOW(), NOW()),
('Parar', '/images/parar.png', 'respostas', NOW(), NOW()),
('Obrigado', '/images/obrigado.png', 'social', NOW(), NOW()),
('Feliz', '/images/feliz.png', 'emocoes', NOW(), NOW()),
('Triste', '/images/triste.png', 'emocoes', NOW(), NOW()),
('Zangado', '/images/zangado.png', 'emocoes', NOW(), NOW()),
('Assustado', '/images/assustado.png', 'emocoes', NOW(), NOW());

-- Verificar inserção
SELECT * FROM pictogramas ORDER BY id;
