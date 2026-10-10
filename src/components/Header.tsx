import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Txt } from '@/components/ui';
import { useT } from '@/lib/useT';
import { useTheme } from '@/theme/ThemeProvider';

/** Top bar for stack screens: back (or close) on the leading side, a title, an optional trailing slot. */
export function Header({
  title,
  onBack,
  close,
  right,
}: {
  title?: string;
  onBack?: () => void;
  close?: boolean;
  right?: React.ReactNode;
}) {
  const { colors, space } = useTheme();
  const { t, rtl } = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const back = onBack ?? (() => (router.canGoBack() ? router.back() : router.replace('/(tabs)')));
  const icon = close ? 'close' : rtl ? 'chevron-forward' : 'chevron-back';

  return (
    <View
      style={{
        paddingTop: insets.top + space.sm,
        paddingHorizontal: space.md,
        paddingBottom: space.sm,
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.sm,
      }}
    >
      <Pressable onPress={back} accessibilityRole="button" accessibilityLabel={close ? t('close') : t('back')} hitSlop={12}>
        <Ionicons name={icon} size={28} color={colors.textMuted} />
      </Pressable>
      <Txt variant="bodyStrong" numberOfLines={1} style={{ flex: 1 }}>
        {title ?? ''}
      </Txt>
      {right}
    </View>
  );
}
