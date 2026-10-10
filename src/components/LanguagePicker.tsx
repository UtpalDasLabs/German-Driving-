import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Txt } from '@/components/ui';
import { LANGUAGES } from '@/lib/languages';
import type { Lang } from '@/lib/types';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * The thirteen test languages, each named in itself - someone looking for
 * Türkçe should not have to know the English word "Turkish".
 */
export function LanguagePicker({ value, onChange }: { value: Lang; onChange: (lang: Lang) => void }) {
  const { colors, space, radius } = useTheme();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
      {LANGUAGES.map((l) => {
        const active = l.code === value;
        return (
          <Pressable
            key={l.code}
            onPress={() => onChange(l.code)}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`${l.native} (${l.english})`}
            style={({ pressed }) => ({
              flexBasis: '47%',
              flexGrow: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: space.sm,
              paddingVertical: space.sm,
              paddingHorizontal: space.md,
              borderRadius: radius.md,
              borderWidth: 2,
              borderColor: active ? colors.accent : colors.border,
              backgroundColor: active ? colors.infoBg : colors.surface,
              opacity: pressed ? 0.85 : 1,
            })}
          >
            <Ionicons name={active ? 'radio-button-on' : 'radio-button-off'} size={20} color={active ? colors.accent : colors.textFaint} />
            <View style={{ flex: 1 }}>
              <Txt variant="bodyStrong">{l.native}</Txt>
              {l.native !== l.english ? (
                <Txt variant="caption" tone="faint">
                  {l.english}
                </Txt>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
