export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  isGroup: boolean;
  groupName?: string;
}

export interface ChatHeaderProps {
  user: User;
  isGroup?: boolean;
  groupName?: string;
  onBackPress: () => void;
}

export interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar?: boolean;
  senderName?: string;
}

export interface ChatItemProps {
  chat: Chat;
  currentUserId: string;
  onPress: (chatId: string) => void;
}