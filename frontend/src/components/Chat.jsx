import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [searchType, setSearchType] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
      setMessages(prevMessages => [...prevMessages, `Bem-vindo de volta, ${storedName}!`]);
      setStep(1);
    } else {
      setMessages(['Olá! Qual é o seu nome?']);
    }
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    switch (step) {
      case 0:
        setName(userMessage);
        localStorage.setItem('name', userMessage);
        setMessages(prevMessages => [...prevMessages, `Prazer em conhecê-lo, ${userMessage}! Você quer pesquisar por ano, gênero ou diretor?`]);
        setStep(1);
        break;
      case 1:
        setSearchType(userMessage.toLowerCase());
        setMessages(prevMessages => [...prevMessages, `Ótimo, agora digite o ${userMessage.toLowerCase()} que você quer buscar.`]);
        setStep(2);
        break;
      case 2:
        const query = userMessage;
        try {
          const response = await axios.get(`http://localhost:3001/recommendations/${searchType}:${query}`);
          const recommendations = response.data.length > 0 ? response.data : ['Nenhuma recomendação encontrada.'];
          setMessages(prevMessages => [...prevMessages, `Aqui estão as recomendações:`, ...recommendations]);
        } catch (error) {
          setMessages(prevMessages => [...prevMessages, 'Erro ao buscar recomendações. Tente novamente mais tarde.']);
        }
        setStep(1);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInput} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
