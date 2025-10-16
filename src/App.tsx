import { useState, useRef, useEffect } from 'react'
import './App.css'

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isError?: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hello! I'm your Copilot CLI assistant. Send me commands to execute and I'll show you the results.",
      isUser: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: input }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: Date.now() + 1,
        text: data.output || 'No output received',
        isUser: false,
        isError: data.error || false
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: `Error: ${error instanceof Error ? error.message : 'Failed to execute command'}`,
        isUser: false,
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="chat-header">
        <h1>Copilot CLI Chat</h1>
        <p className="subtitle">Execute CLI commands and see results</p>
      </div>

      <div className="chat-container">
        <div className="messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.isUser ? 'user-message' : 'bot-message'} ${message.isError ? 'error-message' : ''}`}
            >
              <div className="message-avatar">
                {message.isUser ? '👤' : '🤖'}
              </div>
              <div className="message-content">
                <pre>{message.text}</pre>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot-message">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a CLI command (e.g., ls, pwd, echo Hello)"
            disabled={isLoading}
            rows={1}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="send-button"
          >
            ▲
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
