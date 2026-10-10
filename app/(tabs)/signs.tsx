import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SignArt } from '@/art/signs';
import { LoadingScreen, useAppReady } from '@/components/Loading';
import { Button, Card, Screen, Txt } from '@/components/ui';
import { mastery } from '@/lib/srs';
import { CATEGORY_LABEL, SIGN_CATEGORIES, signCardId, signs } from '@/lib/study';
import type { SignInfo } from '@/lib/types';
import { useT } from '@/lib/useT';
import { useProgress } from '@/store/ProgressProvider';
import { useTheme } from '@/theme/ThemeProvider';

/** Every sign, grouped the way the StVO groups them, with its number and meaning. */
export default function SignsScreen() {
  const { colors, space, radius } = useTheme();
  const { t, p, original } = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { progress } = useProgress();
  const [open, setOpen] = useState<SignInfo | null>(null);

  const groups = useMemo(
    () => SIGN_CATEGORIES.map((c) => ({ category: c, items: signs.filter((s) => s.category === c) })),
    [],
  );

  const appReady = useAppReady();
  if (!appReady) return <LoadingScreen />;

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + space.lg,
          paddingHorizontal: space.lg,
          paddingBottom: space.xxxl,
          gap: space.lg,
          maxWidth: 720,
          width: '100%',
          alignSelf: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <Txt variant="display">{t('signsTitle')}</Txt>
        <Txt variant="body" tone="muted">
          {t('signsBody')}
        </Txt>
        <Button
          title={t('trainSigns')}
          size="lg"
          full
          icon={<Ionicons name="layers" size={20} color={colors.onAccent} />}
          onPress={() => router.push('/sign-trainer')}
        />

        {groups.map(({ category, items }) => (
          <View key={category} style={{ gap: space.sm }}>
            <Txt variant="heading">{t(CATEGORY_LABEL[category])}</Txt>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
              {items.map((s) => {
                const m = mastery(progress.cards[signCardId(s.id)]);
                return (
                  <Pressable
                    key={s.id}
                    onPress={() => setOpen(s)}
                    accessibilityRole="button"
                    accessibilityLabel={`${t('signNumber')} ${s.id}: ${p(s.name)}`}
                    style={({ pressed }) => ({
                      width: 96,
                      alignItems: 'center',
                      gap: 4,
                      paddingVertical: space.sm,
                      borderRadius: radius.md,
                      backgroundColor: colors.surface,
                      borderWidth: 2,
                      borderColor: m >= 0.8 ? colors.success : colors.border,
                      opacity: pressed ? 0.8 : 1,
                    })}
                  >
                    <SignArt id={s.id} size={64} title={p(s.name)} />
                    <Txt variant="caption" tone="faint">
                      {s.id}
                    </Txt>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={open != null} transparent animationType="fade" onRequestClose={() => setOpen(null)}>
        <Pressable
          onPress={() => setOpen(null)}
          style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: 'center', padding: space.lg }}
        >
          {open ? (
            <Pressable onPress={() => {}} style={{ maxWidth: 480, width: '100%', alignSelf: 'center' }}>
              <Card level={3} style={{ alignItems: 'center', gap: space.md, padding: space.xl }}>
                <SignArt id={open.id} size={150} title={p(open.name)} />
                <Txt variant="caption" tone="faint">
                  {t('signNumber')} {open.id} · {t(CATEGORY_LABEL[open.category])}
                </Txt>
                <Txt variant="heading" style={{ textAlign: 'center' }}>
                  {p(open.name)}
                </Txt>
                {original(open.name) ? (
                  <Txt variant="small" tone="faint" style={{ textAlign: 'center' }}>
                    {original(open.name)}
                  </Txt>
                ) : null}
                <Txt variant="prose" tone="muted" style={{ textAlign: 'center' }}>
                  {p(open.meaning)}
                </Txt>
                <Button title={t('close')} variant="secondary" onPress={() => setOpen(null)} />
              </Card>
            </Pressable>
          ) : null}
        </Pressable>
      </Modal>
    </Screen>
  );
}
