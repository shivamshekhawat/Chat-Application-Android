import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';
import { chats, currentUser } from '@/data/mockData';
import { Message } from '@/types/chat';

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const flatListRef = useRef<FlatList>(null);
  
  const chat = chats.find(c => c.id === id);
  const [messages, setMessages] = useState<Message[]>(chat?.messages || []);

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  if (!chat) {
    router.back();
    return null;
  }

  const otherParticipant = chat.participants.find(p => p.id !== currentUser.id);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      text,
      senderId: currentUser.id,
      timestamp: new Date(),
      isRead: false,
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const renderMessage = ({ item, index }: { item: Message; index: number }) => {
    const isOwn = item.senderId === currentUser.id;
    const sender = chat.participants.find(p => p.id === item.senderId);
    const showAvatar = !isOwn && chat.isGroup;
    const senderName = chat.isGroup && !isOwn ? sender?.name : undefined;

    return (
      <MessageBubble
        message={item}
        isOwn={isOwn}
        showAvatar={showAvatar}
        senderName={senderName}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ChatHeader
          user={otherParticipant!}
          isGroup={chat.isGroup}
          groupName={chat.groupName}
          onBackPress={() => router.back()}
        />

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <ChatInput onSendMessage={handleSendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  messagesContent: {
    paddingVertical: 16,
  },
});