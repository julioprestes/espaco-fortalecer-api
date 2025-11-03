-- Script para diagnosticar o problema
-- Execute este SQL no seu banco de dados

-- 1. Verificar se a atividade existe
SELECT * FROM atividades WHERE id = 101;

-- 2. Verificar a estrutura da tabela progressos
\d progressos;

-- 3. Verificar as foreign keys
SELECT
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name='progressos';

-- 4. Tentar inserir um registro de teste
INSERT INTO progressos (id_crianca, id_atividade, resposta_dada, foi_correto) 
VALUES (1, 101, 'A', true);
