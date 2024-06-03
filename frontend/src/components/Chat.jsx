import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CiPaperplane } from "react-icons/ci";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [currentFilterType, setCurrentFilterType] = useState('');
  const [searchQuery, setSearchQuery] = useState({
    diretor: '',
    ano: '',
    genero: '',
    ator: ''
  });

  function resetSearch(){
    setSearchQuery({ diretor: '', ano: '', genero: '', ator: '' })
  }

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
      setMessages(prevMessages => [...prevMessages, { text: `Bem-vindo de volta, ${storedName}!`, isUser: false }]);
      setMessages(prevMessages => [...prevMessages, { text: `Você quer pesquisar por ano, gênero, diretor ou ator?`}]);
      setStep(1);
    } else {
      setMessages([{ text: 'Olá! Qual é o seu nome?', isUser: false }]);
    }
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages(prevMessages => [...prevMessages, { text: userMessage, isUser: true }]);
    setInput('');

    switch (step) {
      case 0:
        setName(userMessage);
        localStorage.setItem('name', userMessage);
        setMessages(prevMessages => [
          ...prevMessages,
          { text: `Prazer em conhecê-lo, ${userMessage.toString()}! Você quer pesquisar por ano, gênero, diretor ou ator?`, isUser: false }
        ]);
        setStep(1);
        break;
      case 1:
        setCurrentFilterType(userMessage.toLowerCase());
        setMessages(prevMessages => [
          ...prevMessages,
          { text: `Ótimo, agora digite o ${userMessage.toLowerCase().toString()} que você quer buscar.`, isUser: false }
        ]);
        setStep(2);
        break;
      case 2:
        setSearchQuery(prevQuery => ({
          ...prevQuery,
          [currentFilterType]: userMessage
        }));
        setMessages(prevMessages => [
          ...prevMessages,
          { text: `Você deseja adicionar mais um filtro? Se sim, digite ano, gênero, diretor ou ator. Caso contrário, digite "não".`, isUser: false }
        ]);
        setStep(3);
        break;
      case 3:
        if (userMessage.toLowerCase() === 'não') {
          try {
            const params = new URLSearchParams();
            Object.keys(searchQuery).forEach(key => {
              if (searchQuery[key]) {
                params.append(key, searchQuery[key]);
              }
            });
            const response = await axios.get(`http://localhost:3001/recommendations?${params.toString()}`);
            const recommendations = response.data.length > 0 ? response.data : ['Nenhuma recomendação encontrada.'];
            setMessages(prevMessages => [
              ...prevMessages,
              { text: `Aqui estão as recomendações:`, isUser: false },
              ...recommendations.map(rec => ({ text: rec, isUser: false })),
              { text: `Deseja buscar uma nova recomendação? Se sim, digite "sim". Caso contrário, digite "não".`, isUser: false }
            ]);
            setStep(4);
          } catch (error) {
            setMessages(prevMessages => [
              ...prevMessages,
              { text: 'Erro ao buscar recomendações. Tente novamente mais tarde.', isUser: false },
              { text: `Deseja buscar uma nova recomendação? Se sim, digite "sim". Caso contrário, digite "não".`, isUser: false }
            ]);
            setStep(4);
          }
        } else if (userMessage.toLowerCase() === 'sim') {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: `Você quer pesquisar por ano, gênero, diretor ou ator?`, isUser: false }
          ]);
          setStep(1);
          resetSearch();
        } else {
          setCurrentFilterType(userMessage.toLowerCase().toString());
          setMessages(prevMessages => [
            ...prevMessages,
            { text: `Ótimo, agora digite o ${userMessage.toLowerCase().toString()} que você quer buscar.`, isUser: false }
          ]);
          setStep(2);
        }
        break;
      case 4:
        if (userMessage.toLowerCase() === 'sim') {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: `Você quer pesquisar por ano, gênero, diretor ou ator?`, isUser: false }
          ]);
          setStep(1);
          resetSearch();
        } else {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: `Ok, obrigado por usar o RecoMovies!`, isUser: false }
          ]);
          setStep(0);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className='flex justify-center h-screen'>
      <div className='w-full max-w-2xl my-auto flex flex-col rounded p-4 h-5/6'>
        <h1 className='flex justify-center font-semibold text-6xl my-10'>RecoMovies</h1>
        <div className='flex-grow overflow-y-auto mb-4'>
          <div className='flex flex-col space-y-4'>
            {messages.map((message, index) => (
              <div key={index} className={`flex my-2 ${message.isUser ? 'justify-end' : ''}`}>
                <div className={`flex items-center ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-10 h-10 rounded-full ${message.isUser ? 'bg-violet-700' : 'bg-violet-500'}`}>
                    <h1 className='flex justify-center p-2 font-bold text-white'>{message.isUser ? 'Y' : 'RM'}</h1>
                  </div>
                  <p className={`p-2 ${message.isUser ? 'text-right' : ''}`}>{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className='flex'>
            <input value={input} onChange={handleInput} className='flex-grow border border-solid border-violet-500 rounded-s-xl p-2' />
            <button type="submit" className='bg-violet-500 text-white rounded-e-xl p-2 px-4'><CiPaperplane className='text-2xl'/></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
