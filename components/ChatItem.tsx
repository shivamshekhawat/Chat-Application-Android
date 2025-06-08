import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ChatItemProps } from '@/types/chat';

export default function ChatItem({ chat, currentUserId, onPress }: ChatItemProps) {
  const otherParticipant = chat.participants.find(p => p.id !== currentUserId);
  const displayName = chat.isGroup ? chat.groupName : otherParticipant?.name;
  const displayAvatar = chat.isGroup 
    ? 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    : otherParticipant?.avatar;

  const formatTime = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const formatLastMessage = (text: string) => {
    const maxLength = 35;
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(chat.id)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: displayAvatar }} style={styles.avatar} />
        {!chat.isGroup && otherParticipant?.isOnline && (
          <View style={styles.onlineIndicator} />
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name} numberOfLines={1}>
            {displayName}
          </Text>
          {chat.lastMessage && (
            <Text style={styles.timestamp}>
              {formatTime(chat.lastMessage.timestamp)}
            </Text>
          )}
        </View>
        
        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage ? formatLastMessage(chat.lastMessage.text) : 'No messages yet'}
          </Text>
          {chat.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E9E9EB',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
  },
  timestamp: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 8,
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#8E8E93',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});