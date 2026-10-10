import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import { Header } from '@/components/Header';
import { LoadingScreen, useAppReady } from '@/components/Loading';
import { MascotSays } from '@/components/Mascot';
import { Card, Chip, ProgressBar, Screen, Txt } from '@/components/ui';
import { forecast, formatDate, planFor } from '@/lib/forecast';
import { GOALS, GOAL_ORDER } from '@/lib/goals';
import { questionIds } from '@/lib/study';
import { useT } from '@/lib/useT';
import { useProgress } from '@/store/ProgressProvider';
import { useSettings } from '@/store/SettingsProvider';
import { useTheme } from '@/theme/ThemeProvider';

const DAY = 24 * 60 * 60 * 1000;

function isoAfter(now: number, days: number): string {
  const d = new Date(now + days * DAY);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

type GoalLabel = 'goalCasual' | 'goalRegular' | 'goalSerious' | 'goalIntense';

/**
 * The study plan: given the theory test date, how many questions a day it
 * takes - and an honest "too soon" when spaced repetition cannot get there.
 * Dates are offered as concrete choices rather than a picker: fewer taps, and
 * they read the same in every language.
 */
export default function PlanScreen() {
  const { colors, space, radius } = useTheme();
  const { t, locale } = useT();
  const { settings, update } = useSettings();
  const { progress } = useProgress();
  const [choices] = useState(() => [14, 28, 42, 56, 84].map((d) => isoAfter(Date.now(), d)));

  const f = useMemo(() => forecast(questionIds, progress.cards, settings.goal), [progress.cards, settings.goal]);
  const plan = useMemo(
    () => (settings.examDate ? planFor(f, settings.examDate, settings.goal) : null),
    [f, settings.examDate, settings.goal],
  );

  const appReady = useAppReady();
  if (!appReady) return <LoadingScreen />;

  const mood = plan == null ? 'thinking' : plan.impossible || !plan.onTrack ? 'sad' : 'happy';

  return (
    <Screen>
      <Header title={t('planTitle')} />
      <ScrollView
        contentContainerStyle={{ padding: space.lg, gap: space.lg, maxWidth: 640, width: '100%', alignSelf: 'center', paddingBottom: space.xxxl }}
        showsVerticalScrollIndicator={false}
      >
        <MascotSays mood={mood} size={88}>
          <Txt variant="bodyStrong">
            {plan == null
              ? t('planTitle')
              : plan.daysLeft <= 0
                ? t('examDayPassed')
                : plan.impossible
                  ? `${t('tooSoon')} ${f.minimumDays} ${t('days')}.`
                  : plan.onTrack
                    ? `${t('onTrack')} · ${plan.daysLeft} ${t('daysToGo')}`
                    : `${t('needMore')} ${plan.cardsPerDay} ${t('questionsADay')}.`}
          </Txt>
          {plan == null ? (
            <Txt variant="small" tone="muted">
              {t('planBody')}
            </Txt>
          ) : null}
        </MascotSays>

        <Card style={{ gap: space.sm }}>
          <Txt variant="heading">{t('readyLabel')}</Txt>
          <ProgressBar value={f.score} color={colors.info} />
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: space.sm }}>
            <Txt variant="title" tone="info">
              {Math.round(f.score * 100)}%
            </Txt>
            <Txt variant="small" tone="muted" style={{ flex: 1 }}>
              {f.started} / {f.total} {t('questionsStarted')} · {f.ready} {t('mastered')}
            </Txt>
          </View>
          {f.reviewsLeft > 0 ? (
            <Txt variant="small" tone="muted">
              {t('readyBy')} <Txt variant="bodyStrong">{formatDate(f.readyDate, locale)}</Txt>
            </Txt>
          ) : null}
        </Card>

        <Card style={{ gap: space.md }}>
          <Txt variant="heading">{t('examDate')}</Txt>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
            {choices.map((iso) => (
              <Chip
                key={iso}
                label={formatDate(new Date(`${iso}T00:00:00`), locale)}
                active={settings.examDate === iso}
                onPress={() => update({ examDate: settings.examDate === iso ? null : iso })}
              />
            ))}
            <Chip label={t('noDate')} active={settings.examDate == null} onPress={() => update({ examDate: null })} />
          </View>
          {settings.examDate && !choices.includes(settings.examDate) ? (
            <Txt variant="small" tone="muted">
              {formatDate(new Date(`${settings.examDate}T00:00:00`), locale)}
            </Txt>
          ) : null}
          <Txt variant="caption" tone="faint">
            {t('bookingNote')}
          </Txt>
        </Card>

        <Card style={{ gap: space.md }}>
          <Txt variant="heading">{t('paceTable')}</Txt>
          {GOAL_ORDER.map((g) => {
            const projected = forecast(questionIds, progress.cards, g);
            const active = settings.goal === g;
            return (
              <Pressable
                key={g}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
                onPress={() => update({ goal: g })}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: space.md,
                  padding: space.md,
                  borderRadius: radius.md,
                  borderWidth: 2,
                  borderColor: active ? colors.accent : colors.border,
                  backgroundColor: active ? colors.infoBg : 'transparent',
                }}
              >
                <Ionicons name={active ? 'radio-button-on' : 'radio-button-off'} size={22} color={active ? colors.accent : colors.textFaint} />
                <View style={{ flex: 1 }}>
                  <Txt variant="bodyStrong">{t(`goal${g[0].toUpperCase()}${g.slice(1)}` as GoalLabel)}</Txt>
                  <Txt variant="small" tone="muted">
                    {GOALS[g].cards} {t('questionsADay')}
                  </Txt>
                </View>
                <Txt variant="caption" tone="faint">
                  {projected.reviewsLeft === 0 ? '✓' : `${t('readyOn')} ${formatDate(projected.readyDate, locale)}`}
                </Txt>
              </Pressable>
            );
          })}
        </Card>
      </ScrollView>
    </Screen>
  );
}
