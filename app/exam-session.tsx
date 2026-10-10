import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { LoadingScreen, useAppReady } from '@/components/Loading';
import { Mascot } from '@/components/Mascot';
import { QuestionCard } from '@/components/QuestionCard';
import { Button, Card, Screen, Txt } from '@/components/ui';
import { EXAM, buildExam, emptyAnswer, isAnswered, isCorrect, scoreExam, type Answer, type ExamScore } from '@/lib/exam';
import { GOALS } from '@/lib/goals';
import { useT } from '@/lib/useT';
import { useProgress } from '@/store/ProgressProvider';
import { useSettings } from '@/store/SettingsProvider';
import { useTheme } from '@/theme/ThemeProvider';

function confirm(message: string, onYes: () => void, yes: string, no: string) {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-alert -- the only confirmation primitive on web
    if (typeof window === 'undefined' || window.confirm(message)) onYes();
    return;
  }
  Alert.alert(message, undefined, [
    { text: no, style: 'cancel' },
    { text: yes, onPress: onYes },
  ]);
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * The mock theory test. Like the real one, you can move freely between the
 * 30 questions, mark any for review, change answers, and hand in when you are
 * ready; nothing is marked until then. Scoring uses the real rules.
 */
export default function ExamSessionScreen() {
  const { colors, space, radius } = useTheme();
  const { t } = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { settings } = useSettings();
  const { gradeMany, recordExam } = useProgress();

  const [seed, setSeed] = useState(() => Date.now());
  const paper = useMemo(() => buildExam(seed), [seed]);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [index, setIndex] = useState(0);
  const [overview, setOverview] = useState(false);
  const [result, setResult] = useState<ExamScore | null>(null);
  const [review, setReview] = useState<number | null>(null);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (result) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [result]);

  const q = paper[index];
  const answered = paper.filter((x) => isAnswered(x, answers[x.id])).length;
  const secs = Math.floor((now - startedAt) / 1000);

  const submit = useCallback(() => {
    const score = scoreExam(paper, answers);
    const goalXp = GOALS[settings.goal].xp;
    gradeMany(paper.map((x) => ({ id: x.id, knewIt: isCorrect(x, answers[x.id]) })), goalXp);
    recordExam(
      {
        at: Date.now(),
        errorPoints: score.errorPoints,
        fivePointMisses: score.fivePointMisses,
        passed: score.passed,
        correct: score.correct,
        total: score.total,
        duration: Math.floor((Date.now() - startedAt) / 1000),
        missed: score.missed,
      },
      goalXp,
    );
    setResult(score);
    setOverview(false);
  }, [paper, answers, settings.goal, gradeMany, recordExam, startedAt]);

  const restart = useCallback(() => {
    setSeed(Date.now());
    setAnswers({});
    setFlags({});
    setIndex(0);
    setResult(null);
    setReview(null);
    setStartedAt(Date.now());
  }, []);

  const appReady = useAppReady();
  if (!appReady) return <LoadingScreen />;

  /* ---------------------------------------------------------- results */
  if (result) {
    if (review != null) {
      const rq = paper[review];
      return (
        <Screen>
          <Header
            title={`${t('questionOf')} ${review + 1} ${t('of')} ${paper.length}`}
            onBack={() => setReview(null)}
          />
          <ScrollView contentContainerStyle={{ padding: space.lg, maxWidth: 640, width: '100%', alignSelf: 'center' }}>
            <QuestionCard question={rq} answer={answers[rq.id] ?? emptyAnswer()} revealed />
          </ScrollView>
        </Screen>
      );
    }
    return (
      <Screen>
        <Header title={t('examTitle')} close onBack={() => router.replace('/(tabs)/exam')} />
        <ScrollView
          contentContainerStyle={{
            padding: space.lg,
            paddingBottom: space.xxxl,
            gap: space.lg,
            maxWidth: 640,
            width: '100%',
            alignSelf: 'center',
          }}
        >
          <View style={{ alignItems: 'center', gap: space.sm }}>
            <Mascot mood={result.passed ? 'celebrate' : 'sad'} size={140} />
            <Txt variant="display" tone={result.passed ? 'success' : 'danger'}>
              {result.passed ? t('resultPassed') : t('resultFailed')}
            </Txt>
          </View>

          <Card level={2} style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: space.lg }}>
            <Stat value={String(result.errorPoints)} label={t('errorPoints')} sub={t('maxTen')} tone={result.errorPoints <= EXAM.maxErrorPoints ? 'success' : 'danger'} />
            <Stat
              value={String(result.fivePointMisses)}
              label={t('fiveMisses')}
              sub="≤ 1"
              tone={result.fivePointMisses <= EXAM.maxFivePointMisses ? 'success' : 'danger'}
            />
            <Stat value={`${result.correct}/${result.total}`} label={t('correctAnswer')} sub={`${pad(Math.floor(secs / 60))}:${pad(secs % 60)}`} tone="default" />
          </Card>

          {!result.passed && result.errorPoints <= EXAM.maxErrorPoints ? (
            <Card style={{ backgroundColor: colors.dangerBg, borderColor: colors.danger }}>
              <Txt variant="small" tone="danger">
                {t('twoFivesFail')}
              </Txt>
            </Card>
          ) : null}

          <View style={{ gap: space.sm }}>
            <Txt variant="heading">{t('reviewMistakes')}</Txt>
            {result.missed.length === 0 ? (
              <Txt variant="body" tone="muted">
                {t('noMistakes')}
              </Txt>
            ) : (
              <>
                <Grid
                  paper={paper.map((x) => x.id)}
                  state={(id) => (result.missed.includes(id) ? 'wrong' : 'right')}
                  onPick={(i) => setReview(i)}
                />
                <Button
                  title={`${t('studyMistakes')} (${result.missed.length})`}
                  variant="secondary"
                  full
                  onPress={() => router.replace(`/practice?mode=ids&ids=${result.missed.join(',')}`)}
                />
              </>
            )}
          </View>

          <Button title={t('newExam')} size="lg" full onPress={restart} />
        </ScrollView>
      </Screen>
    );
  }

  /* ---------------------------------------------------------- overview */
  if (overview) {
    return (
      <Screen>
        <Header title={t('overview')} onBack={() => setOverview(false)} />
        <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.lg, maxWidth: 640, width: '100%', alignSelf: 'center' }}>
          <Txt variant="body" tone="muted">
            {answered} / {paper.length} · {paper.length - answered} {t('unanswered')}
          </Txt>
          <Grid
            paper={paper.map((x) => x.id)}
            state={(id) => (flags[id] ? 'flag' : isAnswered(paper.find((x) => x.id === id)!, answers[id]) ? 'answered' : 'open')}
            onPick={(i) => {
              setIndex(i);
              setOverview(false);
            }}
          />
          <Button
            title={t('submitExam')}
            size="lg"
            full
            onPress={() => confirm(t('submitConfirm'), submit, t('submitExam'), t('cancel'))}
          />
        </ScrollView>
      </Screen>
    );
  }

  /* ---------------------------------------------------------- question */
  const flagged = !!flags[q.id];
  return (
    <Screen>
      <Header
        title={`${t('questionOf')} ${index + 1} ${t('of')} ${paper.length}`}
        close
        onBack={() => confirm(t('leaveExam'), () => router.back(), t('close'), t('cancel'))}
        right={
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="time-outline" size={16} color={colors.textFaint} />
            <Txt variant="caption" tone="faint">
              {pad(Math.floor(secs / 60))}:{pad(secs % 60)}
            </Txt>
          </View>
        }
      />
      <ScrollView
        contentContainerStyle={{ padding: space.lg, paddingBottom: space.xxxl, maxWidth: 640, width: '100%', alignSelf: 'center' }}
        keyboardShouldPersistTaps="handled"
      >
        <QuestionCard
          question={q}
          answer={answers[q.id] ?? emptyAnswer()}
          onChange={(a) => setAnswers((prev) => ({ ...prev, [q.id]: a }))}
        />
        <Pressable
          onPress={() => setFlags((f) => ({ ...f, [q.id]: !f[q.id] }))}
          accessibilityRole="button"
          style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm, marginTop: space.lg, alignSelf: 'flex-start', padding: space.sm, borderRadius: radius.sm }}
        >
          <Ionicons name={flagged ? 'flag' : 'flag-outline'} size={18} color={flagged ? colors.streak : colors.textFaint} />
          <Txt variant="small" tone={flagged ? 'streak' : 'faint'}>
            {flagged ? t('flagged') : t('flag')}
          </Txt>
        </Pressable>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          gap: space.sm,
          paddingHorizontal: space.lg,
          paddingTop: space.sm,
          paddingBottom: insets.bottom + space.lg,
          maxWidth: 640,
          width: '100%',
          alignSelf: 'center',
        }}
      >
        <Button title={t('previous')} variant="secondary" disabled={index === 0} onPress={() => setIndex((i) => i - 1)} />
        <View style={{ flex: 1 }}>
          <Button title={t('overview')} variant="secondary" full onPress={() => setOverview(true)} />
        </View>
        {index + 1 < paper.length ? (
          <Button title={t('next')} onPress={() => setIndex((i) => i + 1)} />
        ) : (
          <Button title={t('submitExam')} onPress={() => setOverview(true)} />
        )}
      </View>
    </Screen>
  );
}

function Stat({ value, label, sub, tone }: { value: string; label: string; sub: string; tone: 'success' | 'danger' | 'default' }) {
  return (
    <View style={{ alignItems: 'center', gap: 2, flex: 1 }}>
      <Txt variant="title" tone={tone}>
        {value}
      </Txt>
      <Txt variant="caption" style={{ textAlign: 'center' }}>
        {label}
      </Txt>
      <Txt variant="caption" tone="faint">
        {sub}
      </Txt>
    </View>
  );
}

type CellState = 'open' | 'answered' | 'flag' | 'right' | 'wrong';

function Grid({ paper, state, onPick }: { paper: string[]; state: (id: string) => CellState; onPick: (index: number) => void }) {
  const { colors, radius, space } = useTheme();
  const look: Record<CellState, { bg: string; fg: string }> = {
    open: { bg: colors.surface, fg: colors.textMuted },
    answered: { bg: colors.infoBg, fg: colors.info },
    flag: { bg: '#FFF1DC', fg: colors.streak },
    right: { bg: colors.successBg, fg: colors.success },
    wrong: { bg: colors.dangerBg, fg: colors.danger },
  };
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
      {paper.map((id, i) => {
        const s = state(id);
        return (
          <Pressable
            key={id}
            onPress={() => onPick(i)}
            accessibilityRole="button"
            accessibilityLabel={String(i + 1)}
            style={{
              width: 48,
              height: 48,
              borderRadius: radius.sm,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: look[s].bg,
              borderWidth: 2,
              borderColor: s === 'open' ? colors.border : look[s].fg,
            }}
          >
            <Txt variant="bodyStrong" style={{ color: look[s].fg }}>
              {i + 1}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}
