import React, { useState } from 'react'

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = [...messages, { sender: 'Você', text: input }];
      setMessages(newMessage);
      setInput('');

      try{
        
      } catch (error){
        console.log("Error: ",error);
      }
    }
  }

  return (
    <div>

    </div>
  )
}

export default Chat