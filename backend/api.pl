:- dynamic filme/4.

recomendar_por_genero(Genero, Filmes) :-
    findall(Filme, filme(Filme, Genero, _, _), Filmes).

recomendar_por_diretor(Diretor, Filmes) :-
    findall(Filme, filme(Filme, _, Diretor, _), Filmes).

recomendar_por_ano(Ano, Filmes) :-
    findall(Filme, filme(Filme, _, _, Ano), Filmes).