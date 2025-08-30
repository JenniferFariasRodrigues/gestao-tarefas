INSERT INTO PROJETO (NOME) VALUES ('Site Novo'), ('App Mobile');

INSERT INTO TAREFA (TITULO, DESCRICAO, STATUS, DATA_CRIACAO, ID_PROJETO) VALUES
('Modelar entidades', 'Criar Projeto/Tarefa', 'ABERTA',        CURRENT_TIMESTAMP - 15 DAY, 1),
('Criar endpoints',   'POST/DELETE/GET',      'ABERTA',        CURRENT_TIMESTAMP - 14 DAY, 1),
('Paginação GET',     'page/size/sort',       'EM_ANDAMENTO',  CURRENT_TIMESTAMP - 13 DAY, 1),
('Filtro por projeto','idProjeto no GET',     'ABERTA',        CURRENT_TIMESTAMP - 12 DAY, 1),
('Ordenação DESC',    'dataCriacao desc',     'ABERTA',        CURRENT_TIMESTAMP - 11 DAY, 1),
('Validações POST',   'titulo/idProjeto',     'ABERTA',        CURRENT_TIMESTAMP - 10 DAY, 1),
('Excluir tarefa',    'DELETE por id',        'ABERTA',        CURRENT_TIMESTAMP -  9 DAY, 1),
('Popular lista',     'mock inicial',         'CONCLUIDA',     CURRENT_TIMESTAMP -  8 DAY, 1),
('Componentes Angular','lista+form',          'ABERTA',        CURRENT_TIMESTAMP -  7 DAY, 2),
('Angular Service',   'HTTP client',          'ABERTA',        CURRENT_TIMESTAMP -  6 DAY, 2),
('Tabela com paginação','MatPaginator',       'ABERTA',        CURRENT_TIMESTAMP -  5 DAY, 2),
('Filtro por projeto UI','select projetos',   'ABERTA',        CURRENT_TIMESTAMP -  4 DAY, 2),
('UX feedback',       'toasts',               'ABERTA',        CURRENT_TIMESTAMP -  3 DAY, 2),
('Documentar README', 'instruções',           'ABERTA',        CURRENT_TIMESTAMP -  2 DAY, 2),
('Testes básicos',    'controller/repo',      'ABERTA',        CURRENT_TIMESTAMP -  1 DAY, 2);
