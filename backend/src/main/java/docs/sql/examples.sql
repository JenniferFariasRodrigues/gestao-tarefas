-- =========================================================
-- SQL EXAMPLES
-- Pagination | Task x Project JOIN (with project filter) | Group By
-- =========================================================

-- 1) Pagination 
SELECT
  t.ID,
  t.TITULO,
  t.STATUS,
  t.DATA_CRIACAO,
  t.ID_PROJETO
FROM TAREFA t
ORDER BY t.DATA_CRIACAO DESC
OFFSET 0 ROWS FETCH FIRST 5 ROWS ONLY;

-- 2) JOIN between TAREFA and PROJETO 
SELECT
  t.ID,
  t.TITULO,
  t.STATUS,
  t.DATA_CRIACAO,
  p.NOME AS PROJETO
FROM TAREFA t
JOIN PROJETO p ON p.ID = t.ID_PROJETO
WHERE p.ID = 2
ORDER BY t.DATA_CRIACAO DESC;

-- 3) Group by STATUS 
SELECT
  t.STATUS,
  COUNT(*) AS TOTAL
FROM TAREFA t
GROUP BY t.STATUS
ORDER BY TOTAL DESC;
