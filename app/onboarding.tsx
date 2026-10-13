import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SceneArt } from '@/art/scene';
import { InstallGuide } from '@/components/InstallGuide';
import { LanguagePicker } from '@/components/LanguagePicker';
import { LoadingScreen, useAppReady } from '@/components/Loading';
import { Mascot, type MascotMood } from '@/components/Mascot';
import { Button, Chip, ProgressBar, Screen, Txt } from '@/components/ui';
import { track } from '@/lib/analytics';
import { GOALS, GOAL_ORDER } from '@/lib/goals';
import { isEmbeddedArtifact } from '@/lib/install';
import { getQuestion, meta } from '@/lib/study';
import { useT } from '@/lib/useT';
import { useSettings } from '@/store/SettingsProvider';
import { useTheme } from '@/theme/ThemeProvider';

type StepId = 'language' | 'welcome' | 'how' | 'exam' | 'goal' | 'install';

const BASE_STEPS: StepId[] = ['language', 'welcome', 'how', 'exam', 'goal'];

/** The install step only means something on a real web page. */
function stepsFor(): StepId[] {
  if (Platform.OS !== 'web' || isEmbeddedArtifact()) return BASE_STEPS;
  return [...BASE_STEPS, 'install'];
}

const MOODS: Record<StepId, MascotMood> = {
  language: 'happy',
  welcome: 'happy',
  how: 'thinking',
  exam: 'idle',
  goal: 'happy',
  install: 'celebrate',
};

type GoalLabel = 'goalCasual' | 'goalRegular' | 'goalSerious' | 'goalIntense';

/**
 * First run. Language comes first, because everything after it - including
 * this intro - should already be in the language the test will be in.
 */
export default function OnboardingScreen() {
  const { colors, space, radius } = useTheme();
  const { t } = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { settings, update } = useSettings();
  const [index, setIndex] = useState(0);
  const [steps] = useState(stepsFor);

  const step = steps[index];
  const isLast = index === steps.length - 1;
  const sample = getQuestion('pr03');

  const finish = useCallback(() => {
    update({ onboarded: true });
    track('onboarding_complete', { language: settings.language, goal: settings.goal });
    router.replace('/(tabs)');
  }, [update, router, settings.language, settings.goal]);

  const appReady = useAppReady();
  if (!appReady) return <LoadingScreen />;

  const title = {
    language: t('obLanguageTitle'),
    welcome: t('obWelcomeTitle'),
    how: t('obHowTitle'),
    exam: t('obExamTitle'),
    goal: t('obGoalTitle'),
    install: t('installTitle'),
  }[step];
  const body = {
    language: t('obLanguageBody'),
    welcome: t('obWelcomeBody'),
    how: t('obHowBody'),
    exam: t('obExamBody'),
    goal: t('obGoalBody'),
    install: t('installWhy'),
  }[step];

  return (
    <Screen>
      <View style={{ paddingTop: insets.top + space.md, paddingHorizontal: space.lg, flexDirection: 'row', alignItems: 'center', gap: space.md }}>
        <View style={{ flex: 1 }}>
          <ProgressBar value={(index + 1) / steps.length} color={colors.accent} height={10} />
        </View>
        <Pressable onPress={finish} accessibilityRole="button" hitSlop={10}>
          <Txt variant="small" tone="faint">
            {t('skip')}
          </Txt>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: space.lg,
          paddingTop: space.xl,
          paddingBottom: space.lg,
          gap: space.lg,
          maxWidth: 560,
          width: '100%',
          alignSelf: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center' }}>
          {step === 'how' && sample?.scene ? (
            <View style={{ borderRadius: radius.lg, overflow: 'hidden' }}>
              <SceneArt scene={sample.scene} size={220} />
            </View>
          ) : (
            <Mascot mood={MOODS[step]} size={step === 'language' ? 110 : 148} />
          )}
        </View>

        <Txt variant="title" style={{ textAlign: 'center' }}>
          {title}
        </Txt>
        <Txt variant="body" tone="muted" style={{ textAlign: 'center' }}>
          {body}
        </Txt>

        {step === 'language' ? (
          <LanguagePicker value={settings.language} onChange={(l) => update({ language: l })} />
        ) : null}

        {step === 'welcome' ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm, justifyContent: 'center' }}>
            <Chip label={`${meta.counts.questions} ${t('questions')}`} />
            <Chip label={`${meta.counts.signs} ${t('tabSigns')}`} />
            <Chip label={t('homePractical')} />
            <Chip label={t('homeConvert')} />
          </View>
        ) : null}

        {step === 'goal' ? (
          <View style={{ gap: space.sm }}>
            {GOAL_ORDER.map((g) => {
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
                </Pressable>
              );
            })}
          </View>
        ) : null}

        {step === 'install' ? <InstallGuide compact /> : null}
      </ScrollView>

      <View style={{ flexDirection: 'row', gap: space.md, paddingHorizontal: space.lg, paddingBottom: insets.bottom + space.lg, maxWidth: 560, width: '100%', alignSelf: 'center' }}>
        {index > 0 ? <Button title={t('back')} variant="secondary" onPress={() => setIndex((i) => i - 1)} /> : null}
        <View style={{ flex: 1 }}>
          <Button
            title={isLast ? t('startLearning') : t('next')}
            size="lg"
            full
            icon={<Ionicons name="arrow-forward" size={18} color={colors.onAccent} />}
            onPress={() => (isLast ? finish() : setIndex((i) => i + 1))}
          />
        </View>
      </View>
    </Screen>
  );
}
