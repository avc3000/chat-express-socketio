import io from 'socket.io-client';
import { useState, useEffect } from 'react';

const socket = io("/");

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const date = new Date().toLocaleString();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message !== '') {
      const newMessage = { body: message, from: 'Antony' };
      setMessages([...messages, newMessage]);
      socket.emit('message', message);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('message', receiveMessage);
    return () => { socket.off('message', receiveMessage) };
  }, []);

  const receiveMessage = (message) => setMessages((state) => [...state, message]);

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-6 rounded-xl'>
        <h2 className='text-2xl font-bold mb-6 text-center text-orange-400'>CHAT PERSONAL</h2>
        <div className='flex flex-row gap-2 mb-4'>
          <input type="text" placeholder='Write message ...' onChange={(e) => setMessage(e.target.value)} value={message} className='rounded-2xl p-2 w-full text-gray-600 font-mono font-bold text-lg' />
          <button className='bg-sky-500 p-2 rounded-full'>➡️</button>
        </div>
        <ul className='mt-4'>
        {
          messages.map((message, index) => (
            <li key={index} className={`my-2 p-2 table rounded-xl ${message.from === 'Antony' ? 'bg-blue-700 ml-auto' : 'bg-green-500'}`}>
              <span className='text-md'>{message.body}</span><br />
              <span className='text-xs'>{date}</span>
            </li>
          ))
        }
      </ul>
      </form>
    </div>
  )
}

export default App;
