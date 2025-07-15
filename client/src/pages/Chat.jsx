import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useChatStore from '../store/chatStore'
import useAuthStore from '../providers/useAuthStore'

const Chat = () => {
  const { user } = useAuthStore()
  const { userId } = useParams()
  const {
    currentChat,
    messages,
    isLoading,
    error,
    fetchOrCreateChat,
    fetchMessages,
    sendMessage
  } = useChatStore()

  const [newMessage, setNewMessage] = useState('')
  const [chatInitialized, setChatInitialized] = useState(false)

  // For demo, use a fixed listingId and participants including current user and chat partner
  const listingId = 'demo-listing-id'
  const participantIds = user ? [user._id, userId] : []

  useEffect(() => {
    if (user && userId && !chatInitialized) {
      fetchOrCreateChat(listingId, participantIds)
      setChatInitialized(true)
    }
  }, [user, userId, chatInitialized, fetchOrCreateChat, listingId, participantIds])

  useEffect(() => {
    if (currentChat) {
      fetchMessages(currentChat._id)
    }
  }, [currentChat, fetchMessages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentChat) return
    await sendMessage(currentChat._id, user._id, newMessage.trim())
    setNewMessage('')
    fetchMessages(currentChat._id)
  }

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Chat</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ border: '1px solid #ccc', padding: 10, minHeight: 300, overflowY: 'auto' }}>
        {messages.length === 0 && <p>No messages yet.</p>}
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: 10 }}>
            <strong>{msg.sender?.name || 'Unknown'}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: '80%', padding: 8 }}
        />
        <button onClick={handleSendMessage} style={{ padding: '8px 16px', marginLeft: 8 }}>
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
