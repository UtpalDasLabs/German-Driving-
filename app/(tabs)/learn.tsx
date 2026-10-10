import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoadingScreen, useAppReady } from '@/components/Loading';
import { Card, Chip, ProgressBar, Screen, Txt } from '@/components/ui';
import { groupStats } from '@/lib/stats';
import { filterQuestions, topicGroups, topics } from '@/lib/study';
import { useT } from '@/lib/useT';
import { useProgress } from '@/store/ProgressProvider';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * The learning path: sixteen topics in teaching order. Right of way comes
 * first because it is where the five-point questions live.
 */
export default function LearnScreen() {
  const { colors, space, radius } = useTheme();
  const { t, p } = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { progress } = useProgress();

  const stats = useMemo(
    () => groupStats(topicGroups(), progress.cards, topics.map((x) => x.key)),
    [progress.cards],
  );
  const due = useMemo(() => filterQuestions(progress.cards, { due: true }).length, [progress.cards]);
  const tricky = useMemo(() => filterQuestions(progress.cards, { tricky: true }).length, [progress.cards]);
  const missed = progress.exams[0]?.missed ?? [];

  const appReady = useAppReady();
  if (!appReady) return <LoadingScreen />;

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + space.lg,
          paddingHorizontal: space.lg,
          paddingBottom: space.xxxl,
          gap: space.md,
          maxWidth: 640,
          width: '100%',
          alignSelf: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <Txt variant="display">{t('learnTitle')}</Txt>
        <Txt variant="body" tone="muted">
          {t('learnBody')}
        </Txt>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
          <Chip label={`${t('practiseAll')}`} onPress={() => router.push('/practice?mode=all')} />
          <Chip label={`${t('dueOnly')} · ${due}`} onPress={() => router.push('/practice?mode=due')} />
          {tricky > 0 ? (
            <Chip label={`${t('tricky')} · ${tricky}`} color={colors.danger} onPress={() => router.push('/practice?mode=tricky')} />
          ) : null}
          {missed.length > 0 ? (
            <Chip
              label={`${t('missedLast')} · ${missed.length}`}
              color={colors.streak}
              onPress={() => router.push(`/practice?mode=ids&ids=${missed.join(',')}`)}
            />
          ) : null}
        </View>

        {topics.map((topic, i) => {
          const s = stats.find((x) => x.key === topic.key);
          return (
            <Pressable
              key={topic.key}
              onPress={() => router.push(`/practice?topic=${topic.key}`)}
              accessibilityRole="button"
              accessibilityLabel={p(topic.title)}
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
            >
              <Card style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: radius.md,
                    backgroundColor: topic.color,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name={topic.icon as 'car'} size={26} color="#FFFFFF" />
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: space.sm }}>
                    <Txt variant="caption" tone="faint">
                      {i + 1}
                    </Txt>
                    <Txt variant="bodyStrong" style={{ flex: 1 }}>
                      {p(topic.title)}
                    </Txt>
                    <Txt variant="caption" tone="faint">
                      {s ? `${s.mastered}/${s.total}` : ''}
                    </Txt>
                  </View>
                  <Txt variant="caption" tone="muted" numberOfLines={1}>
                    {p(topic.blurb)}
                  </Txt>
                  <ProgressBar value={s?.progress ?? 0} color={topic.color} height={8} />
                </View>
              </Card>
            </Pressable>
          );
        })}
      </ScrollView>
    </Screen>
  );
}
