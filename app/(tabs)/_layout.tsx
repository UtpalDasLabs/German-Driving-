import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { useT } from '@/lib/useT';
import { useTheme } from '@/theme/ThemeProvider';

export default function TabsLayout() {
  const { colors } = useTheme();
  const { t } = useT();

  const icon =
    (name: React.ComponentProps<typeof Ionicons>['name']) =>
    ({ color, size }: { color: React.ComponentProps<typeof Ionicons>["color"]; size: number }) => (
      <Ionicons name={name} size={size} color={color} />
    );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: {
          backgroundColor: colors.bgElevated,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: Platform.OS === 'web' ? 64 : undefined,
          paddingTop: Platform.OS === 'web' ? 6 : undefined,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: t('tabHome'), tabBarIcon: icon('home') }} />
      <Tabs.Screen name="learn" options={{ title: t('tabLearn'), tabBarIcon: icon('book') }} />
      <Tabs.Screen name="signs" options={{ title: t('tabSigns'), tabBarIcon: icon('warning') }} />
      <Tabs.Screen name="exam" options={{ title: t('tabExam'), tabBarIcon: icon('school') }} />
      <Tabs.Screen name="you" options={{ title: t('tabYou'), tabBarIcon: icon('person') }} />
    </Tabs>
  );
}
