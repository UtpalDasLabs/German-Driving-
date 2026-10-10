import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { LoadingScreen, useAppReady } from '@/components/Loading';
import { Mascot } from '@/components/Mascot';
import { QuestionCard } from '@/components/QuestionCard';
import { Button, ProgressBar, Screen, Txt } from '@/components/ui';
import { emptyAnswer, isAnswered, isCorrect, type Answer } from '@/lib/exam';
import { GOALS } from '@/lib/goals';
import { makeHaptics } from '@/lib/haptics';
import { filterQuestions, getTopic, orderForStudy, type Filter } from '@/lib/study';
import type { Question, TopicKey } from '@/lib/types';
import { useT } from '@/lib/useT';
import { useProgress } from '@/store/ProgressProvider';
import { useSettings } from '@/store/SettingsProvider';
import { useTheme } from '@/theme/ThemeProvider';

const SESSION = 12;

type Params = { mode?: string; topic?: string; ids?: string };

/**
 * A practice round: one question at a time, checked immediately, with the
 * explanation straight after. Every answer feeds the spaced-repetition
 * schedule, so a question you get wrong is back in the next round.
 */
export default function PracticeScreen() {
  const params = useLocalSearchParams<Params>();
  const { colors, space } = useTheme();
  const { t, p } = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { settings } = useSettings();
  const { progress, grade } = useProgress();
  const haptics = makeHaptics(settings.haptics);

  const filter: Filter = useMemo(() => {
    if (params.mode === 'ids' && params.ids) return { ids: params.ids.split(',') };
    return {
      topic: (params.topic as TopicKey) ?? 'all',
      due: params.mode === 'due',
      tricky: params.mode === 'tricky',
    };
  }, [params.mode, params.topic, params.ids]);

  // The deck is fixed when the round starts; grading mid-round must not
  // reshuffle the questions still to come.
  const [round, setRound] = useState(0);
  const deck: Question[] = useMemo(
    () => {
      const pool = filterQuestions(progress.cards, filter);
      const size = filter.ids ? pool.length : SESSION;
      return orderForStudy(pool, progress.cards).slice(0, size);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- frozen per round on purpose
    [filter, round],
  );

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<Answer>(emptyAnswer());
  const [revealed, setRevealed] = useState(false);
  const [right, setRight] = useState(0);

  const q = deck[index];
  const done = index >= deck.length;
  const title = filter.topic && filter.topic !== 'all' ? p(getTopic(filter.topic)?.title) : t('learnTitle');

  const onCheck = useCallback(() => {
    if (!q) return;
    const ok = isCorrect(q, answer);
    grade(q.id, ok, GOALS[settings.goal].xp);
    if (ok) {
      setRight((r) => r + 1);
      haptics.success();
    } else {
      haptics.error();
    }
    setRevealed(true);
  }, [q, answer, grade, settings.goal, haptics]);

  const onNext = useCallback(() => {
    setIndex((i) => i + 1);
    setAnswer(emptyAnswer());
    setRevealed(false);
  }, []);

  const again = useCallback(() => {
    setRound((r) => r + 1);
    setIndex(0);
    setRight(0);
    setAnswer(emptyAnswer());
    setRevealed(false);
  }, []);

  const appReady = useAppReady();
  if (!appReady) return <LoadingScreen />;

  if (deck.length === 0) {
    return (
      <Screen>
        <Header title={title} close />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl, gap: space.lg }}>
          <Mascot mood="sleeping" size={130} />
          <Txt variant="title" style={{ textAlign: 'center' }}>
            {t('nothingDue')}
          </Txt>
          <Txt variant="body" tone="muted" style={{ textAlign: 'center' }}>
            {t('nothingDueBody')}
          </Txt>
          <Button
            title={t('practiseWholeTopic')}
            onPress={() => router.replace(filter.topic && filter.topic !== 'all' ? `/practice?topic=${filter.topic}` : '/practice?mode=all')}
          />
        </View>
      </Screen>
    );
  }

  if (done) {
    const share = right / deck.length;
    return (
      <Screen>
        <Header title={title} close />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: space.xl, gap: space.lg }}>
          <Mascot mood={share >= 0.8 ? 'celebrate' : share >= 0.5 ? 'happy' : 'thinking'} size={150} />
          <Txt variant="title">{t('sessionDone')}</Txt>
          <Txt variant="display" tone={share >= 0.8 ? 'success' : 'default'}>
            {right} / {deck.length}
          </Txt>
          <Txt variant="body" tone="muted">
            {t('sessionScore')}
          </Txt>
          <View style={{ width: '100%', maxWidth: 360, gap: space.sm }}>
            <Button title={t('practiseAgain')} size="lg" full onPress={again} />
            <Button title={t('backHome')} variant="secondary" full onPress={() => router.replace('/(tabs)')} />
          </View>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title={title}
        close
        right={
          <Txt variant="caption" tone="faint">
            {index + 1} / {deck.length}
          </Txt>
        }
      />
      <View style={{ paddingHorizontal: space.lg }}>
        <ProgressBar value={index / deck.length} color={colors.accent} height={8} />
      </View>
      <ScrollView
        contentContainerStyle={{
          padding: space.lg,
          paddingBottom: space.xxxl,
          maxWidth: 640,
          width: '100%',
          alignSelf: 'center',
        }}
        keyboardShouldPersistTaps="handled"
      >
        <QuestionCard question={q} answer={answer} onChange={setAnswer} revealed={revealed} />
      </ScrollView>
      <View
        style={{
          paddingHorizontal: space.lg,
          paddingTop: space.sm,
          paddingBottom: insets.bottom + space.lg,
          maxWidth: 640,
          width: '100%',
          alignSelf: 'center',
        }}
      >
        {revealed ? (
          <Button
            title={index + 1 < deck.length ? t('nextQuestion') : t('finish')}
            size="lg"
            full
            icon={<Ionicons name="arrow-forward" size={20} color={colors.onAccent} />}
            onPress={onNext}
          />
        ) : (
          <Button title={t('check')} size="lg" full disabled={!isAnswered(q, answer)} onPress={onCheck} />
        )}
      </View>
    </Screen>
  );
}
