import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, SafeAreaView } from 'react-native';
import { Search } from 'lucide-react-native';
import { router } from 'expo-router';
import ChatItem from '@/components/ChatItem';
import { chats, currentUser } from '@/data/mockData';
import { Chat } from '@/types/chat';

export default function ChatsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState<Chat[]>(chats);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredChats(chats);
    } else {
      const filtered = chats.filter(chat => {
        const otherParticipant = chat.participants.find(p => p.id !== currentUser.id);
        const displayName = chat.isGroup ? chat.groupName : otherParticipant?.name;
        return displayName?.toLowerCase().includes(query.toLowerCase());
      });
      setFilteredChats(filtered);
    }
  };

  const handleChatPress = (chatId: string) => {
    router.push(`/(tabs)/chat/${chatId}`);
  };

  const renderChatItem = ({ item }: { item: Chat }) => (
    <ChatItem
      chat={item}
      currentUserId={currentUser.id}
      onPress={handleChatPress}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations"
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  chatList: {
    flex: 1,
  },
});