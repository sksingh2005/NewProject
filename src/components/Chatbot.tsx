import { useState, useEffect, useRef } from 'react';
import { Send, Smile, Paperclip, Mic, X } from 'lucide-react';

export default function ChatbotUI({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  const messages = [
    {
      id: 1,
      text: 'Hi, How can I help you?',
      sender: 'bot',
      time: '10:30 AM'
    },
    {
      id: 2,
      text: 'Can you help in updating bulk payment transaction?\n\nI have the files ready.',
      sender: 'user',
      time: '10:32 AM'
    },
    {
      id: 3,
      text: 'Sure, please upload the file.',
      sender: 'bot',
      time: '10:32 AM'
    },
    {
      id: 4,
      type: 'file',
      fileName: 'Sample_Quote.xlsx',
      fileDate: '28 Apr 2025',
      fileSize: '12KB',
      fileType: 'xlsx',
      sender: 'user',
      time: '10:33 AM'
    },
    {
      id: 5,
      text: 'Thanks, I see 64 payment instruction files here and updated them in queue.',
      sender: 'bot',
      time: '10:34 AM'
    },
    {
      id: 6,
      text: 'Go to Queue',
      sender: 'bot',
      isLink: true,
      time: '10:34 AM'
    }
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={chatRef}
      className="fixed bottom-20 right-6 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col h-[550px] animate-fadeIn "
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Assistant</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X size={18} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {msg.type === 'file' ? (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-green-600 dark:text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                        <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {msg.fileName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {msg.fileDate} • {msg.fileSize} • {msg.fileType}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {msg.isLink ? (
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      {msg.text}
                    </a>
                  ) : (
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Enter your message..."
              className="w-full px-4 py-3 pr-24 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors">
                <Smile size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors">
                <Paperclip size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors">
                <Mic size={18} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSend}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors flex-shrink-0"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
