% Filmes do Christopher Nolan
filme('Following', 'Thriller', 'Christopher Nolan', 1998).
filme('Memento', 'Mystery', 'Christopher Nolan', 2000).
filme('Insomnia', 'Thriller', 'Christopher Nolan', 2002).
filme('Batman Begins', 'Action', 'Christopher Nolan', 2005).
filme('The Prestige', 'Mystery', 'Christopher Nolan', 2006).
filme('The Dark Knight', 'Action', 'Christopher Nolan', 2008).
filme('Inception', 'Sci-Fi', 'Christopher Nolan', 2010).
filme('The Dark Knight Rises', 'Action', 'Christopher Nolan', 2012).
filme('Interstellar', 'Sci-Fi', 'Christopher Nolan', 2014).
filme('Dunkirk', 'War', 'Christopher Nolan', 2017).

% Filmes do Quentin Tarantino
filme('Reservoir Dogs', 'Crime', 'Quentin Tarantino', 1992).
filme('Pulp Fiction', 'Crime', 'Quentin Tarantino', 1994).
filme('Jackie Brown', 'Crime', 'Quentin Tarantino', 1997).
filme('Kill Bill: Vol. 1', 'Action', 'Quentin Tarantino', 2003).
filme('Kill Bill: Vol. 2', 'Action', 'Quentin Tarantino', 2004).
filme('Death Proof', 'Action', 'Quentin Tarantino', 2007).
filme('Inglourious Basterds', 'War', 'Quentin Tarantino', 2009).
filme('Django Unchained', 'Western', 'Quentin Tarantino', 2012).
filme('The Hateful Eight', 'Western', 'Quentin Tarantino', 2015).
filme('Once Upon a Time in Hollywood', 'Comedy', 'Quentin Tarantino', 2019).

% Filmes do James Cameron
filme('Piranha II: The Spawning', 'Horror', 'James Cameron', 1982).
filme('The Terminator', 'Sci-Fi', 'James Cameron', 1984).
filme('Aliens', 'Sci-Fi', 'James Cameron', 1986).
filme('The Abyss', 'Sci-Fi', 'James Cameron', 1989).
filme('Terminator 2: Judgment Day', 'Sci-Fi', 'James Cameron', 1991).
filme('True Lies', 'Action', 'James Cameron', 1994).
filme('Titanic', 'Romance', 'James Cameron', 1997).
filme('Avatar', 'Sci-Fi', 'James Cameron', 2009).
filme('Avatar: The Way of Water', 'Sci-Fi', 'James Cameron', 2022).
filme('Alita: Battle Angel', 'Sci-Fi', 'James Cameron', 2019).

% Filmes do Steven Spielberg
filme('Jaws', 'Thriller', 'Steven Spielberg', 1975).
filme('Close Encounters of the Third Kind', 'Sci-Fi', 'Steven Spielberg', 1977).
filme('Raiders of the Lost Ark', 'Adventure', 'Steven Spielberg', 1981).
filme('E.T. the Extra-Terrestrial', 'Sci-Fi', 'Steven Spielberg', 1982).
filme('Jurassic Park', 'Sci-Fi', 'Steven Spielberg', 1993).
filme('Schindler\'s List', 'Biography', 'Steven Spielberg', 1993).
filme('Saving Private Ryan', 'War', 'Steven Spielberg', 1998).
filme('Minority Report', 'Sci-Fi', 'Steven Spielberg', 2002).
filme('War of the Worlds', 'Sci-Fi', 'Steven Spielberg', 2005).
filme('Lincoln', 'Biography', 'Steven Spielberg', 2012).

% Filmes do James Gunn
filme('Slither', 'Horror', 'James Gunn', 2006).
filme('Super', 'Comedy', 'James Gunn', 2010).
filme('Guardians of the Galaxy', 'Sci-Fi', 'James Gunn', 2014).
filme('Guardians of the Galaxy Vol. 2', 'Sci-Fi', 'James Gunn', 2017).
filme('The Suicide Squad', 'Action', 'James Gunn', 2021).
filme('Peacemaker', 'Action', 'James Gunn', 2022).
filme('Guardians of the Galaxy Vol. 3', 'Sci-Fi', 'James Gunn', 2023).
filme('Brightburn', 'Horror', 'James Gunn', 2019).
filme('Dawn of the Dead', 'Horror', 'James Gunn', 2004).
filme('The Belko Experiment', 'Thriller', 'James Gunn', 2016).

recomendar_por_genero(Genero, Filmes) :-
    findall(Filme, filme(Filme, Genero, _, _), Filmes).

recomendar_por_diretor(Diretor, Filmes) :-
    findall(Filme, filme(Filme, _, Diretor, _), Filmes).

recomendar_por_ano(Ano, Filmes) :-
    findall(Filme, filme(Filme, _, _, Ano), Filmes).

recomendar(Query, Filmes) :-
   (recomendar_por_genero(Query, Filmes);
    recomendar_por_diretor(Query, Filmes);
    recomendar_por_ano(Query, Filmes)).