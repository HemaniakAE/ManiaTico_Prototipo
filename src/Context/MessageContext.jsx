import React, { createContext, useContext, useState } from "react";

const MessageContext = createContext(null);

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // 👈 nuevo estado para chat activo
  const [conversations] = useState({}); // 👈 para estructura futura

  function sendMessage(fromUser, toUser, textRaw) {
    if (!fromUser || !toUser) return;
    const text = textRaw.trim();
    if (!text) return;

    const newMsg = {
      id: crypto.randomUUID(),
      from: fromUser.id,
      to: toUser.id,
      text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMsg]);
  }

  function getMessages(userA, userB) {
    if (!userA || !userB) return [];
    return messages
      .filter(
        (m) =>
          (m.from === userA.id && m.to === userB.id) ||
          (m.from === userB.id && m.to === userA.id)
      )
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  function getUnreadCount(user) {
    if (!user) return 0;
    return messages.filter((m) => m.to === user.id).length;
  }

  // 👇 Función auxiliar para generar ID de conversación
  function getChatId(userId1, userId2) {
    return [userId1, userId2].sort().join('_');
  }

  const value = {
    messages,
    activeChat,
    setActiveChat,
    sendMessage,
    getMessages,
    getUnreadCount,
    getChatId,
    conversations,
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  const ctx = useContext(MessageContext);
  if (!ctx) {
    throw new Error("useMessages debe usarse dentro de MessageProvider");
  }
  return ctx;
}