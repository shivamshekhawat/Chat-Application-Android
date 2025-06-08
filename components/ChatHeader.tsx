import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft, Phone, Video, MoveVertical as MoreVertical } from 'lucide-react-native';
import { ChatHeaderProps } from '@/types/chat';

export default function ChatHeader({ 
  user, 
  isGroup = false, 
  groupName, 
  onBackPress 
}: ChatHeaderProps) {
  const displayName = isGroup ? groupName : user.name;
  const statusText = isGroup 
    ? 'Group chat' 
    : user.isOnline 
      ? 'Online' 
      : `Last seen ${user.lastSeen ? formatLastSeen(user.lastSeen) : 'recently'}`;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <ArrowLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.status}>{statusText}</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.actionButton}>
          <Phone size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Video size={20} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <MoreVertical size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function formatLastSeen(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  status: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});