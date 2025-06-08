import { User, Chat, Message } from '@/types/chat';

export const currentUser: User = {
  id: 'current-user',
  name: 'Shivam Shekhawat',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  isOnline: true,
};

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
  },
  {
    id: 'user-2',
    name: 'Bob Smith',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: 'user-3',
    name: 'Carol Davis',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
  },
  {
    id: 'user-4',
    name: 'David Wilson',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 'user-5',
    name: 'Emma Brown',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    isOnline: true,
  },
];

const generateMessages = (chatId: string, participants: User[]): Message[] => {
  const messages: Message[] = [];
  const messageTexts = [
    "Hey! How are you doing?",
    "I'm good, thanks! How about you?",
    "Just finished my work for today",
    "That's great! Want to grab coffee later?",
    "Sure, what time works for you?",
    "How about 4 PM at the usual place?",
    "Perfect! See you there 😊",
    "Looking forward to it!",
    "Don't forget to bring the documents",
    "Got them right here 📄",
  ];

  for (let i = 0; i < Math.min(messageTexts.length, Math.floor(Math.random() * 8) + 3); i++) {
    const isFromCurrentUser = Math.random() > 0.6;
    const senderId = isFromCurrentUser ? currentUser.id : participants[0].id;
    
    messages.push({
      id: `${chatId}-msg-${i}`,
      text: messageTexts[i],
      senderId,
      timestamp: new Date(Date.now() - (messages.length - i) * 1000 * 60 * Math.floor(Math.random() * 30 + 1)),
      isRead: Math.random() > 0.3,
    });
  }

  return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

export const chats: Chat[] = users.map((user, index) => {
  const messages = generateMessages(`chat-${user.id}`, [user]);
  return {
    id: `chat-${user.id}`,
    participants: [currentUser, user],
    messages,
    lastMessage: messages[messages.length - 1],
    unreadCount: Math.floor(Math.random() * 5),
    isGroup: false,
  };
});

// Add a group chat
const groupMessages = generateMessages('group-chat-1', users.slice(0, 3));
chats.unshift({
  id: 'group-chat-1',
  participants: [currentUser, ...users.slice(0, 3)],
  messages: groupMessages,
  lastMessage: groupMessages[groupMessages.length - 1],
  unreadCount: 2,
  isGroup: true,
  groupName: 'Team Discussion',
});