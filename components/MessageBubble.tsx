import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MessageBubbleProps } from '@/types/chat';

export default function MessageBubble({ 
  message, 
  isOwn, 
  showAvatar = false, 
  senderName 
}: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={[
      styles.container,
      isOwn ? styles.ownMessage : styles.otherMessage
    ]}>
      {!isOwn && senderName && (
        <Text style={styles.senderName}>{senderName}</Text>
      )}
      <View style={[
        styles.bubble,
        isOwn ? styles.ownBubble : styles.otherBubble
      ]}>
        <Text style={[
          styles.messageText,
          isOwn ? styles.ownText : styles.otherText
        ]}>
          {message.text}
        </Text>
        <Text style={[
          styles.timestamp,
          isOwn ? styles.ownTimestamp : styles.otherTimestamp
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 16,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  senderName: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
    marginLeft: 12,
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  ownBubble: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 6,
  },
  otherBubble: {
    backgroundColor: '#E9E9EB',
    borderBottomLeftRadius: 6,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  ownText: {
    color: '#FFFFFF',
  },
  otherText: {
    color: '#000000',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
  },
  ownTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherTimestamp: {
    color: '#8E8E93',
  },
});