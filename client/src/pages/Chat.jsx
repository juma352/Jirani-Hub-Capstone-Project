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
  const listingId = null
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
    <div className="max-w-2xl mx-auto p-4 flex flex-col h-[80vh]">
      <header className="flex items-center justify-between border-b border-gray-300 pb-3 mb-3">
        <h2 className="text-xl font-semibold">
          Chat with {userId || 'Unknown'}
        </h2>
      </header>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="flex-1 overflow-y-auto border border-gray-300 rounded-md p-4 space-y-4 mb-4">
        {messages.length === 0 && <p className="text-center text-gray-500">No messages yet.</p>}
        {messages.map((msg, index) => {
          const isCurrentUser = msg.sender?._id === user._id
          return (
            <div
              key={index}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] px-4 py-2 rounded-lg ${isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs mt-1 text-gray-400">{msg.sender?.name || 'Unknown'}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={!newMessage.trim()}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
