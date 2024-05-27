filme('The Matrix', 'Sci-Fi', 'Wachowski', 1999).
filme('Inception', 'Sci-Fi', 'Nolan', 2010).
filme('The Godfather', 'Crime', 'Coppola', 1972).
filme('The Dark Knight', 'Acao', 'Nolan', 2008).
filme('Pulp Fiction', 'Crime', 'Tarantino', 1994).
filme('Oppenheimer', 'Historico', 'Nolan', 2023).
filme('Interestelar', 'Ficcao', 'Nolan', 2014).
filme('Batman: O Cavaleiro das Trevas Ressurge', 'Acao', 'Nolan', 2012).

recomendar_por_genero(Genero, Filmes) :-
    findall(Filme, filme(Filme, Genero, _, _), Filmes).

recomendar_por_diretor(Diretor, Filmes) :-
    findall(Filme, filme(Filme, _, Diretor, _), Filmes).

recomendar_por_ano(Ano, Filmes) :-
    findall(Filme, filme(Filme, _, _, Ano), Filmes).