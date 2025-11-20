import { useEffect, useState } from "react";
import { useMessages } from "../Context/MessageContext";
import { useAuth } from "../Context/AuthContext";
import "./MessagingDock.css";
import useTranslate from "../Context/useTranslate";

export default function MessagingDock() {
  const { users, currentUser, isAuthenticated } = useAuth();
  const { 
    activeChat, 
    setActiveChat, 
    sendMessage, 
    getMessages, 
    getUnreadCount 
  } = useMessages();
  const { t } = useTranslate();

  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // 🔹 No mostrar nada si no está autenticado
  if (!isAuthenticated || !currentUser) return null;

  function handleSend() {
    if (!activeChat || !text.trim()) return;
    
    const toUser = users.find(user => user.id === activeChat);
    if (!toUser) return;

    sendMessage(currentUser, toUser, text);
    setText("");
  }

  const activeUser = users.find(user => user.id === activeChat);
  const messages = activeUser ? getMessages(currentUser, activeUser) : [];

  return (
    <>
      {/* Botón flotante */}
      <button 
        className="mt-msg-toggle"
        onClick={() => setIsOpen(true)}
      >
        💬 {t('messaging.messages')}
        {getUnreadCount(currentUser) > 0 && (
          <span className="mt-msg-toggle-badge">
            {getUnreadCount(currentUser)}
          </span>
        )}
      </button>

      {/* Dock abierto */}
      {isOpen && (
        <>
          <div 
            className="mt-msg-backdrop"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="mt-msg-dock">
            {/* Barra superior */}
            <div className="mt-msg-topbar">
              <span className="mt-msg-topbar-title">{t('messaging.messages')}</span>
              <button 
                className="mt-msg-topbar-close"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Sidebar con usuarios */}
            <div className="mt-msg-sidebar">
              <div className="mt-msg-sidebar-header">{t('messaging.conversations')}</div>
              <ul className="mt-msg-channel-list">
                {users
                  .filter(user => user.id !== currentUser.id)
                  .map(user => (
                    <li
                      key={user.id}
                      className={`mt-msg-channel ${
                        activeChat === user.id ? "active" : ""
                      }`}
                      onClick={() => setActiveChat(user.id)}
                    >
                      {user.username}
                      {getUnreadCount(user) > 0 && (
                        <span style={{float: 'right', fontSize: '10px'}}>
                          {getUnreadCount(user)}
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>

            {/* Panel de mensajes */}
            <div className="mt-msg-panel">
              {activeUser ? (
                <>
                  <div className="mt-msg-panel-header">
                    <div className="mt-msg-panel-title">{activeUser.username}</div>
                    <div className="mt-msg-panel-subtitle">{t('messaging.online')}</div>
                  </div>

                  <div className="mt-msg-thread">
                    {messages.length === 0 ? (
                      <div className="mt-msg-panel-empty">
                        {t('messaging.noMessages')}
                      </div>
                    ) : (
                      messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`mt-msg-bubble ${
                            msg.from === currentUser.id ? "mine" : "theirs"
                          }`}
                        >
                          {msg.text}
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-msg-input-row">
                    <textarea
                      className="mt-msg-input"
                      placeholder={t('messaging.writeMessage')}
                      rows="1"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                    />
                    <button 
                      className="mt-msg-send-btn"
                      onClick={handleSend}
                      disabled={!text.trim()}
                    >
                      {t('messaging.send')}
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-msg-panel-empty">
                  {t('messaging.selectConversation')}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}