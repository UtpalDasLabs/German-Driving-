import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SignArt } from '@/art/signs';
import { Header } from '@/components/Header';
import { LoadingScreen, useAppReady } from '@/components/Loading';
import { Mascot } from '@/components/Mascot';
import { SwipeDeck, SwipeStamp, type SwipeDirection } from '@/components/SwipeDeck';
import { Button, Card, ProgressBar, Screen, Txt } from '@/components/ui';
import { GOALS } from '@/lib/goals';
import { makeHaptics } from '@/lib/haptics';
import { CATEGORY_LABEL, orderForStudy, signCardId, signs } from '@/lib/study';
import type { SignInfo } from '@/lib/types';
import { useT } from '@/lib/useT';
import { useProgress } from '@/store/ProgressProvider';
import { useSettings } from '@/store/SettingsProvider';
import { useTheme } from '@/theme/ThemeProvider';

const ROUND = 15;

/**
 * Swipe flashcards for road signs: see the sign, recall what it means, flip,
 * then swipe right if you knew it and left if not. Buttons do the same, for
 * keyboards and screen readers.
 */
export default function SignTrainerScreen() {
  const { colors, space, radius } = useTheme();
  const { t, p, original } = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { settings } = useSettings();
  const { progress, grade } = useProgress();
  const haptics = makeHaptics(settings.haptics);

  const [round, setRound] = useState(0);
  const deck: SignInfo[] = useMemo(
    () => orderForStudy(signs, progress.cards, (s) => signCardId(s.id)).slice(0, ROUND),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- frozen per round on purpose
    [round],
  );
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  const card = deck[index];
  const done = index >= deck.length;

  const decide = useCallback(
    (dir: SwipeDirection) => {
      if (!card) return;
      const knewIt = dir === 'right';
      grade(signCardId(card.id), knewIt, GOALS[settings.goal].xp);
      if (knewIt) {
        setKnown((k) => k + 1);
        haptics.success();
      } else {
        haptics.tap();
      }
      setFlipped(false);
      setIndex((i) => i + 1);
    },
    [card, grade, settings.goal, haptics],
  );

  const appReady = useAppReady();
  if (!appReady) return <LoadingScreen />;

  if (done) {
    return (
      <Screen>
        <Header title={t('homeSigns')} close />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl, gap: space.lg }}>
          <Mascot mood={known / deck.length >= 0.8 ? 'celebrate' : 'happy'} size={150} />
          <Txt variant="title">{t('signsDone')}</Txt>
          <Txt variant="display">
            {known} / {deck.length}
          </Txt>
          <View style={{ width: '100%', maxWidth: 360, gap: space.sm }}>
            <Button
              title={t('practiseAgain')}
              size="lg"
              full
              onPress={() => {
                setRound((r) => r + 1);
                setIndex(0);
                setKnown(0);
              }}
            />
            <Button title={t('backHome')} variant="secondary" full onPress={() => router.replace('/(tabs)')} />
          </View>
        </View>
      </Screen>
    );
  }

  const face = (s: SignInfo, showBack: boolean) => (
    <Card
      level={3}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.md, padding: space.xl }}
    >
      <SignArt id={s.id} size={showBack ? 120 : 190} title={p(s.name)} />
      <Txt variant="caption" tone="faint">
        {t('signNumber')} {s.id} · {t(CATEGORY_LABEL[s.category])}
      </Txt>
      {showBack ? (
        <>
          <Txt variant="title" style={{ textAlign: 'center' }}>
            {p(s.name)}
          </Txt>
          {original(s.name) ? (
            <Txt variant="small" tone="faint" style={{ textAlign: 'center' }}>
              {original(s.name)}
            </Txt>
          ) : null}
          <Txt variant="prose" tone="muted" style={{ textAlign: 'center' }}>
            {p(s.meaning)}
          </Txt>
        </>
      ) : (
        <Txt variant="small" tone="faint" style={{ textAlign: 'center' }}>
          {t('tapToReveal')}
        </Txt>
      )}
    </Card>
  );

  return (
    <Screen>
      <Header
        title={t('homeSigns')}
        close
        right={
          <Txt variant="caption" tone="faint">
            {index + 1} / {deck.length}
          </Txt>
        }
      />
      <View style={{ paddingHorizontal: space.lg }}>
        <ProgressBar value={index / deck.length} color={colors.danger} height={8} />
      </View>

      <View style={{ flex: 1, padding: space.lg, maxWidth: 520, width: '100%', alignSelf: 'center' }}>
        <SwipeDeck
          cardKey={`${round}-${index}`}
          onSwipe={decide}
          behind={deck.slice(index + 1, index + 3).map((s) => (
            <View key={s.id} style={{ flex: 1, borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.border }} />
          ))}
          overlayRight={<SwipeStamp label={t('knewIt').toUpperCase()} color={colors.success} rotate={-12} />}
          overlayLeft={<SwipeStamp label={t('again').toUpperCase()} color={colors.danger} rotate={12} />}
        >
          <Pressable
            style={{ flex: 1 }}
            onPress={() => setFlipped((f) => !f)}
            accessibilityRole="button"
            accessibilityLabel={t('tapToReveal')}
          >
            {face(card, flipped)}
          </Pressable>
        </SwipeDeck>
      </View>

      <View
        style={{
          flexDirection: 'row',
          gap: space.md,
          paddingHorizontal: space.lg,
          paddingBottom: insets.bottom + space.lg,
          maxWidth: 520,
          width: '100%',
          alignSelf: 'center',
        }}
      >
        <View style={{ flex: 1 }}>
          <Button
            title={t('again')}
            variant="danger"
            full
            icon={<Ionicons name="refresh" size={18} color="#FFFFFF" />}
            onPress={() => decide('left')}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            title={t('knewIt')}
            variant="success"
            full
            icon={<Ionicons name="checkmark" size={18} color="#FFFFFF" />}
            onPress={() => decide('right')}
          />
        </View>
      </View>
      <Txt variant="caption" tone="faint" style={{ textAlign: 'center', paddingBottom: space.sm }}>
        {t('swipeHint')}
      </Txt>
    </Screen>
  );
}
