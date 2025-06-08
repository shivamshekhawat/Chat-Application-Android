import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Settings, Moon, Palette, Shield, CircleHelp as HelpCircle, LogOut, CreditCard as Edit3, Bell, MessageSquare } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
}

function SettingItem({ icon, title, subtitle, onPress, showArrow = true }: SettingItemProps) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          {icon}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {showArrow && (
        <Text style={styles.arrow}>›</Text>
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleEditProfile = () => {
    // Handle edit profile
  };

  const handleSettingPress = (setting: string) => {
    // Handle setting press
    console.log(`Pressed: ${setting}`);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/login');
            } catch (error) {
              Alert.alert('Error', 'Failed to sign out');
            }
          },
        },
      ]
    );
  };

  const displayName = user?.displayName || 'Shivam Shekhawat';
  const userAvatar = user?.photoURL || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: userAvatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Edit3 size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Text style={styles.userStatus}>Available</Text>
        </View>

        <View style={styles.settingsContainer}>
          <View style={styles.settingSection}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <SettingItem
              icon={<Bell size={20} color="#007AFF" />}
              title="Notifications"
              subtitle="Manage your notification settings"
              onPress={() => handleSettingPress('notifications')}
            />
            <SettingItem
              icon={<MessageSquare size={20} color="#007AFF" />}
              title="Chat Settings"
              subtitle="Customize your chat experience"
              onPress={() => handleSettingPress('chat')}
            />
            <SettingItem
              icon={<Moon size={20} color="#007AFF" />}
              title="Dark Mode"
              subtitle="Switch to dark theme"
              onPress={() => handleSettingPress('theme')}
            />
            <SettingItem
              icon={<Palette size={20} color="#007AFF" />}
              title="Appearance"
              subtitle="Customize app appearance"
              onPress={() => handleSettingPress('appearance')}
            />
          </View>

          <View style={styles.settingSection}>
            <Text style={styles.sectionTitle}>Privacy & Security</Text>
            <SettingItem
              icon={<Shield size={20} color="#007AFF" />}
              title="Privacy"
              subtitle="Control your privacy settings"
              onPress={() => handleSettingPress('privacy')}
            />
            <SettingItem
              icon={<Settings size={20} color="#007AFF" />}
              title="Account Settings"
              subtitle="Manage your account"
              onPress={() => handleSettingPress('account')}
            />
          </View>

          <View style={styles.settingSection}>
            <Text style={styles.sectionTitle}>Support</Text>
            <SettingItem
              icon={<HelpCircle size={20} color="#007AFF" />}
              title="Help & Support"
              subtitle="Get help and support"
              onPress={() => handleSettingPress('help')}
            />
          </View>

          <View style={styles.settingSection}>
            <SettingItem
              icon={<LogOut size={20} color="#FF3B30" />}
              title="Sign Out"
              onPress={handleLogout}
              showArrow={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000000',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E9E9EB',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 4,
  },
  userStatus: {
    fontSize: 16,
    color: '#34C759',
    fontWeight: '500',
  },
  settingsContainer: {
    flex: 1,
  },
  settingSection: {
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F2F7',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E7',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#C7C7CC',
    fontWeight: '300',
  },
});