import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Platform, ScrollView, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { InstallGuide } from '@/components/InstallGuide';
import { LanguagePicker } from '@/components/LanguagePicker';
import { LoadingScreen, useAppReady } from '@/components/Loading';
import { ProgressRing } from '@/components/ProgressRing';
import { Button, Card, Chip, Divider, ProgressBar, Screen, Txt } from '@/components/ui';
import { uiCoverage } from '@/i18n';
import { buildBackup, downloadBackup, isStoragePersisted, pickBackup, requestDurableStorage } from '@/lib/durability';
import { forecast } from '@/lib/forecast';
import { GOALS, GOAL_ORDER } from '@/lib/goals';
import { groupStats } from '@/lib/stats';
import { meta, questionIds, topicGroups, topics } from '@/lib/study';
import type { Appearance } from '@/lib/types';
import { useT } from '@/lib/useT';
import { useProgress } from '@/store/ProgressProvider';
import { useSettings } from '@/store/SettingsProvider';
import { useTheme } from '@/theme/ThemeProvider';

function confirm(message: string, onYes: () => void, title?: string, yesLabel = 'OK', cancelLabel = 'Cancel') {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-alert -- the only confirmation primitive on web
    if (typeof window === 'undefined' || window.confirm(message)) onYes();
    return;
  }
  Alert.alert(title ?? message, title ? message : undefined, [
    { text: cancelLabel, style: 'cancel' },
    { text: yesLabel, style: 'destructive', onPress: onYes },
  ]);
}

type GoalLabel = 'goalCasual' | 'goalRegular' | 'goalSerious' | 'goalIntense';

export default function YouScreen() {
  const { colors, space, radius } = useTheme();
  const { t, p, lang } = useT();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { settings, update } = useSettings();
  const { progress, reset, restore } = useProgress();
  const [persisted, setPersisted] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    void isStoragePersisted().then(setPersisted);
  }, []);

  const f = useMemo(() => forecast(questionIds, progress.cards, settings.goal), [progress.cards, settings.goal]);
  const stats = useMemo(() => groupStats(topicGroups(), progress.cards, topics.map((x) => x.key)), [progress.cards]);
  const partial = Math.min(meta.coverage[lang] ?? 0, uiCoverage(lang)) < 1;

  const onProtect = useCallback(async () => {
    const ok = await requestDurableStorage();
    setPersisted(ok);
    setNote(ok ? t('storageSecured') : t('storageLoss'));
  }, [t]);

  const onExport = useCallback(async () => {
    const outcome = await downloadBackup(buildBackup(progress, settings));
    setNote(outcome === 'saved' ? t('exportDone') : outcome === 'declined' ? null : t('importFailed'));
  }, [progress, settings, t]);

  const onImport = useCallback(async () => {
    const file = await pickBackup();
    if (!file) {
      setNote(t('importFailed'));
      return;
    }
    confirm(t('importConfirm'), () => {
      restore(file.progress);
      if (file.settings) update(file.settings);
      setNote(t('importDone'));
    });
  }, [restore, update, t]);

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
          maxWidth: 640,
          width: '100%',
          alignSelf: 'center',
        }}
        showsVerticalScrollIndicator={false}
      >
        <Txt variant="display">{t('yourProgress')}</Txt>

        <Card level={2} style={{ flexDirection: 'row', alignItems: 'center', gap: space.lg }}>
          <ProgressRing value={f.score} size={92} stroke={12} color={colors.info}>
            <Txt variant="heading">{Math.round(f.score * 100)}%</Txt>
          </ProgressRing>
          <View style={{ flex: 1, gap: 2 }}>
            <Txt variant="heading">
              {f.started} / {f.total}
            </Txt>
            <Txt variant="small" tone="muted">
              {t('questionsStarted')}
            </Txt>
            <Txt variant="small" tone="muted">
              🔥 {progress.streak} {t('dayStreak')} · ⚡ {progress.xp} {t('xp')}
            </Txt>
          </View>
        </Card>

        <Button
          title={t('planTitle')}
          variant="secondary"
          full
          icon={<Ionicons name="calendar" size={18} color={colors.text} />}
          onPress={() => router.push('/plan')}
        />

        <Card style={{ gap: space.md }}>
          <Txt variant="heading">{t('language')}</Txt>
          <Txt variant="small" tone="muted">
            {t('languageBody')}
          </Txt>
          <LanguagePicker value={settings.language} onChange={(l) => update({ language: l })} />
          {partial ? (
            <Txt variant="caption" tone="faint">
              {t('translationNote')}
            </Txt>
          ) : null}
          {settings.language !== 'de' ? (
            <>
              <Divider />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
                <View style={{ flex: 1 }}>
                  <Txt variant="body">{t('showGerman')}</Txt>
                  <Txt variant="caption" tone="faint">
                    {t('showGermanSub')}
                  </Txt>
                </View>
                <Switch value={settings.showGerman} onValueChange={(v) => update({ showGerman: v })} />
              </View>
            </>
          ) : null}
        </Card>

        <Card style={{ gap: space.md }}>
          <Txt variant="heading">{t('topicBreakdown')}</Txt>
          {stats.map((s) => {
            const topic = topics.find((x) => x.key === s.key);
            if (!topic) return null;
            return (
              <View key={s.key} style={{ gap: 6 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Txt variant="small">{p(topic.title)}</Txt>
                  <Txt variant="caption" tone="faint">
                    {s.mastered}/{s.total}
                  </Txt>
                </View>
                <ProgressBar value={s.progress} color={topic.color} height={10} />
              </View>
            );
          })}
        </Card>

        <Card style={{ gap: space.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
            <Ionicons name="save-outline" size={20} color={colors.info} />
            <Txt variant="heading" style={{ flex: 1 }}>
              {t('storageTitle')}
            </Txt>
          </View>
          <Txt variant="small" tone="muted">
            {t('storageBody')}
          </Txt>
          <View style={{ backgroundColor: colors.dangerBg, borderRadius: radius.md, padding: space.md }}>
            <Txt variant="small" style={{ color: colors.danger }}>
              ⚠︎ {t('storageLoss')}
            </Txt>
          </View>

          {Platform.OS === 'web' ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
                <Ionicons name={persisted ? 'shield-checkmark' : 'shield-outline'} size={18} color={persisted ? colors.success : colors.textFaint} />
                <Txt variant="small" tone={persisted ? 'success' : 'muted'} style={{ flex: 1 }}>
                  {persisted ? t('storageSecured') : t('storageInstall')}
                </Txt>
              </View>
              {!persisted ? (
                <Button
                  title={t('protectStorage')}
                  variant="secondary"
                  full
                  icon={<Ionicons name="shield-outline" size={18} color={colors.text} />}
                  onPress={() => void onProtect()}
                />
              ) : null}
              <Divider />
              <Txt variant="overline" tone="faint">
                {t('installTitle').toUpperCase()}
              </Txt>
              <InstallGuide />
            </>
          ) : null}

          <Divider />
          <Txt variant="overline" tone="faint">
            {t('backup').toUpperCase()}
          </Txt>
          <View style={{ flexDirection: 'row', gap: space.sm }}>
            <View style={{ flex: 1 }}>
              <Button
                title={t('exportBackup')}
                variant="secondary"
                full
                icon={<Ionicons name="download-outline" size={18} color={colors.text} />}
                onPress={() => void onExport()}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title={t('importBackup')}
                variant="secondary"
                full
                icon={<Ionicons name="folder-open-outline" size={18} color={colors.text} />}
                onPress={onImport}
              />
            </View>
          </View>
          {note ? (
            <Txt variant="caption" tone="info">
              {note}
            </Txt>
          ) : null}
        </Card>

        <Card style={{ gap: space.lg }}>
          <Txt variant="heading">{t('settings')}</Txt>
          <View style={{ gap: space.sm }}>
            <Txt variant="small" tone="muted">
              {t('dailyGoal')}
            </Txt>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
              {GOAL_ORDER.map((g) => (
                <Chip
                  key={g}
                  label={`${t(`goal${g[0].toUpperCase()}${g.slice(1)}` as GoalLabel)} · ${GOALS[g].cards}`}
                  active={settings.goal === g}
                  onPress={() => update({ goal: g })}
                />
              ))}
            </View>
          </View>
          <Divider />
          <View style={{ gap: space.sm }}>
            <Txt variant="small" tone="muted">
              {t('appearance')}
            </Txt>
            <View style={{ flexDirection: 'row', gap: space.sm }}>
              {(
                [
                  ['system', t('themeSystem')],
                  ['light', t('themeLight')],
                  ['dark', t('themeDark')],
                ] as [Appearance, string][]
              ).map(([value, label]) => (
                <Chip key={value} label={label} active={settings.appearance === value} onPress={() => update({ appearance: value })} />
              ))}
            </View>
          </View>
          {Platform.OS !== 'web' ? (
            <>
              <Divider />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Txt variant="body" style={{ flex: 1 }}>
                  {t('haptics')}
                </Txt>
                <Switch value={settings.haptics} onValueChange={(v) => update({ haptics: v })} />
              </View>
            </>
          ) : null}
        </Card>

        <Card style={{ gap: space.sm }}>
          <Txt variant="heading">{t('about')}</Txt>
          <Txt variant="small" tone="muted">
            {t('aboutBody')}
          </Txt>
          <Txt variant="caption" tone="faint">
            {meta.counts.questions} {t('questions')} · {meta.counts.signs} {t('tabSigns')}
          </Txt>
        </Card>

        <Button
          title={t('resetProgress')}
          variant="ghost"
          full
          icon={<Ionicons name="trash-outline" size={18} color={colors.danger} />}
          onPress={() => confirm(t('resetConfirm'), reset, t('resetProgress'), t('reset'), t('cancel'))}
        />
      </ScrollView>
    </Screen>
  );
}
