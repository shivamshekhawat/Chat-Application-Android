import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Send, Plus, Mic } from 'lucide-react-native';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleAttachment = () => {
    Alert.alert('Attachments', 'Feature coming soon!');
  };

  const handleVoiceMessage = () => {
    Alert.alert('Voice Message', 'Feature coming soon!');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAttachment} style={styles.attachmentButton}>
        <Plus size={24} color="#8E8E93" />
      </TouchableOpacity>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          placeholderTextColor="#8E8E93"
          multiline
          value={message}
          onChangeText={setMessage}
          maxLength={1000}
        />
        
        {message.trim() ? (
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Send size={20} color="#007AFF" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleVoiceMessage} style={styles.voiceButton}>
            <Mic size={20} color="#8E8E93" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
  },
  attachmentButton: {
    padding: 8,
    marginRight: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 40,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    maxHeight: 100,
    paddingVertical: 4,
  },
  sendButton: {
    padding: 8,
    marginLeft: 8,
  },
  voiceButton: {
    padding: 8,
    marginLeft: 8,
  },
});