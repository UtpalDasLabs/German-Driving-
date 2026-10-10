import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, useWindowDimensions, View } from 'react-native';

import { ManoeuvreArt, type Manoeuvre } from '@/art/manoeuvres';
import { Header } from '@/components/Header';
import { LoadingScreen, useAppReady } from '@/components/Loading';
import { Card, Screen, Txt } from '@/components/ui';
import { practical } from '@/lib/study';
import { useT } from '@/lib/useT';
import { useProgress } from '@/store/ProgressProvider';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * The practical test, section by section. Without a `section` param this is
 * the contents; with one, the section itself, with its checklist ticks saved
 * so the night before the test is a matter of going through them.
 */
export default function PracticalScreen() {
  const { section } = useLocalSearchParams<{ section?: string }>();
  const { colors, space, radius } = useTheme();
  const { t, p, lang } = useT();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { progress, toggleCheck } = useProgress();

  const appReady = useAppReady();
  if (!appReady) return <LoadingScreen />;

  const current = practical.find((s) => s.key === section);

  if (!current) {
    return (
      <Screen>
        <Header title={t('practicalTitle')} />
        <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.md, maxWidth: 640, width: '100%', alignSelf: 'center', paddingBottom: space.xxxl }}>
          <Txt variant="body" tone="muted">
            {t('practicalIntro')}
          </Txt>
          {practical.map((s) => {
            const total = s.checklist.length;
            const ticked = s.checklist.filter((_, i) => progress.checks[`${s.key}:${i}`]).length;
            return (
              <Pressable key={s.key} onPress={() => router.push(`/practical?section=${s.key}`)} accessibilityRole="button">
                <Card style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
                  <View style={{ width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.successBg, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name={s.icon as 'car'} size={22} color={colors.success} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Txt variant="bodyStrong">{p(s.title)}</Txt>
                    {total > 0 ? (
                      <Txt variant="caption" tone={ticked === total ? 'success' : 'faint'}>
                        {ticked}/{total} {t('ticked')}
                      </Txt>
                    ) : null}
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
                </Card>
              </Pressable>
            );
          })}
        </ScrollView>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title={p(current.title)} />
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.lg, maxWidth: 640, width: '100%', alignSelf: 'center', paddingBottom: space.xxxl }}>
        <Txt variant="title">{p(current.title)}</Txt>

        {current.diagram ? (
          <View style={{ alignItems: 'center', gap: 4 }}>
            <View style={{ borderRadius: radius.md, overflow: 'hidden' }}>
              <ManoeuvreArt name={current.diagram as Manoeuvre['key']} size={Math.min(width - space.lg * 2, 360)} title={p(current.title)} />
            </View>
            <Txt variant="caption" tone="faint">
              {t('diagramCaption')} · <Txt variant="caption" tone="danger">R</Txt> = ⟲
            </Txt>
          </View>
        ) : null}

        {current.body.map((b, i) => (
          <Txt key={i} variant="prose">
            {p(b)}
          </Txt>
        ))}

        {current.checklist.length ? (
          <Card style={{ gap: space.sm }}>
            <Txt variant="heading">{t('checklistTitle')}</Txt>
            {current.checklist.map((c, i) => {
              const key = `${current.key}:${i}`;
              const on = !!progress.checks[key];
              return (
                <Pressable
                  key={key}
                  onPress={() => toggleCheck(key)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: on }}
                  style={{ flexDirection: 'row', alignItems: 'flex-start', gap: space.sm, paddingVertical: 4 }}
                >
                  <Ionicons name={on ? 'checkbox' : 'square-outline'} size={24} color={on ? colors.success : colors.textFaint} />
                  <Txt variant="body" style={{ flex: 1, color: on ? colors.textMuted : colors.text }}>
                    {p(c)}
                  </Txt>
                </Pressable>
              );
            })}
          </Card>
        ) : null}

        {current.pitfalls.length ? (
          <Card style={{ gap: space.sm, backgroundColor: colors.dangerBg, borderColor: colors.danger }}>
            <Txt variant="heading" tone="danger">
              {t('pitfallsTitle')}
            </Txt>
            {current.pitfalls.map((c, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: space.sm, alignItems: 'flex-start' }}>
                <Ionicons name="close-circle" size={18} color={colors.danger} />
                <Txt variant="body" style={{ flex: 1 }}>
                  {p(c)}
                </Txt>
              </View>
            ))}
          </Card>
        ) : null}

        {current.phrases.length ? (
          <View style={{ gap: space.sm }}>
            <Txt variant="heading">{t('phrasesTitle')}</Txt>
            {current.phrases.map((ph, i) => (
              <Card key={i} style={{ gap: 2 }}>
                <Txt variant="bodyStrong">„{ph.de}“</Txt>
                {lang !== 'de' ? (
                  <Txt variant="small" tone="muted">
                    {p(ph)}
                  </Txt>
                ) : null}
              </Card>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </Screen>
  );
}
