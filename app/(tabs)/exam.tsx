import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoadingScreen, useAppReady } from '@/components/Loading';
import { Button, Card, Divider, Screen, Txt } from '@/components/ui';
import { formatDate } from '@/lib/forecast';
import { LINKS, OFFICIAL } from '@/lib/official';
import { useT } from '@/lib/useT';
import { useProgress } from '@/store/ProgressProvider';
import { useTheme } from '@/theme/ThemeProvider';

/** The three ways to the licence: theory test, practical test, conversion. */
export default function ExamScreen() {
  const { colors, space } = useTheme();
  const { t, lang, locale } = useT();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { progress } = useProgress();

  const appReady = useAppReady();
  if (!appReady) return <LoadingScreen />;

  const rules = [t('examRule1'), t('examRule2'), t('examRule3'), t('examRule4'), t('examRule5')];

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
        <Txt variant="display">{t('examTitle')}</Txt>
        <Txt variant="body" tone="muted">
          {t('examBody')}
        </Txt>

        <Card level={2} style={{ gap: space.md }}>
          {rules.map((r, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: space.sm, alignItems: 'flex-start' }}>
              <Ionicons
                name={i === 3 ? 'alert-circle' : 'checkmark-circle'}
                size={20}
                color={i === 3 ? colors.danger : colors.success}
              />
              <Txt variant="body" style={{ flex: 1 }}>
                {r}
              </Txt>
            </View>
          ))}
          <Button
            title={t('startExam')}
            size="lg"
            full
            icon={<Ionicons name="play" size={20} color={colors.onAccent} />}
            onPress={() => router.push('/exam-session')}
          />
        </Card>

        <Card style={{ gap: space.sm }}>
          <Txt variant="heading">{t('examHistory')}</Txt>
          {progress.exams.length === 0 ? (
            <Txt variant="small" tone="muted">
              {t('noExamsYet')}
            </Txt>
          ) : (
            progress.exams.slice(0, 8).map((e) => (
              <View key={e.at} style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
                <Ionicons
                  name={e.passed ? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color={e.passed ? colors.success : colors.danger}
                />
                <Txt variant="small" style={{ flex: 1 }}>
                  {formatDate(new Date(e.at), locale)}
                </Txt>
                <Txt variant="small" tone={e.passed ? 'success' : 'danger'}>
                  {e.errorPoints} {t('errorPoints')}
                </Txt>
              </View>
            ))
          )}
        </Card>

        <Pressable onPress={() => router.push('/practical')} accessibilityRole="button">
          <Card style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
            <Ionicons name="car-sport" size={32} color={colors.success} />
            <View style={{ flex: 1, gap: 2 }}>
              <Txt variant="heading">{t('practicalTitle')}</Txt>
              <Txt variant="small" tone="muted">
                {t('practicalBody')}
              </Txt>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
          </Card>
        </Pressable>

        <Pressable onPress={() => router.push('/conversion')} accessibilityRole="button">
          <Card style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
            <Ionicons name="globe" size={32} color={colors.streak} />
            <View style={{ flex: 1, gap: 2 }}>
              <Txt variant="heading">{t('convertTitle')}</Txt>
              <Txt variant="small" tone="muted">
                {t('convertBody')}
              </Txt>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
          </Card>
        </Pressable>

        <Card style={{ gap: space.sm }}>
          <Txt variant="small" tone="muted">
            {t('catalogueNote')}
          </Txt>
          <Txt variant="small" tone="muted">
            {t('reformNote')}
          </Txt>
          <Divider />
          <Txt variant="overline" tone="faint">
            {t('officialLinks').toUpperCase()}
          </Txt>
          {LINKS.map((l) => (
            <Pressable
              key={l.key}
              onPress={() => void Linking.openURL(OFFICIAL[l.key])}
              accessibilityRole="link"
              style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm, paddingVertical: 4 }}
            >
              <Ionicons name="open-outline" size={16} color={colors.info} />
              <Txt variant="small" tone="info">
                {lang === 'de' ? l.label.de : l.label.en}
              </Txt>
            </Pressable>
          ))}
        </Card>
      </ScrollView>
    </Screen>
  );
}
