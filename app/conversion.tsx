import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Linking, Pressable, ScrollView, View } from 'react-native';

import { Header } from '@/components/Header';
import { LoadingScreen, useAppReady } from '@/components/Loading';
import { Card, Screen, Txt } from '@/components/ui';
import { OFFICIAL } from '@/lib/official';
import { conversion } from '@/lib/study';
import { useT } from '@/lib/useT';
import { useTheme } from '@/theme/ThemeProvider';

/** Converting a foreign licence: the six-month rule, the three cases, the paperwork. */
export default function ConversionScreen() {
  const { colors, space } = useTheme();
  const { t, p } = useT();

  const appReady = useAppReady();
  if (!appReady) return <LoadingScreen />;

  return (
    <Screen>
      <Header title={t('convertTitle')} />
      <ScrollView contentContainerStyle={{ padding: space.lg, gap: space.lg, maxWidth: 640, width: '100%', alignSelf: 'center', paddingBottom: space.xxxl }}>
        <Txt variant="title">{t('convertTitle')}</Txt>
        <Txt variant="body" tone="muted">
          {t('convertIntro')}
        </Txt>

        {conversion.map((step, i) => (
          <Card key={step.key} style={{ gap: space.sm }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
              <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' }}>
                <Txt variant="caption" style={{ color: colors.onAccent }}>
                  {i + 1}
                </Txt>
              </View>
              <Txt variant="heading" style={{ flex: 1 }}>
                {p(step.title)}
              </Txt>
            </View>
            {step.body.map((b, j) => (
              <Txt key={j} variant="prose">
                {p(b)}
              </Txt>
            ))}
          </Card>
        ))}

        <Pressable onPress={() => void Linking.openURL(OFFICIAL.anlage11)} accessibilityRole="link">
          <Card style={{ flexDirection: 'row', alignItems: 'center', gap: space.md, borderColor: colors.info }}>
            <Ionicons name="open-outline" size={22} color={colors.info} />
            <Txt variant="bodyStrong" tone="info" style={{ flex: 1 }}>
              {t('convertCheck')}
            </Txt>
          </Card>
        </Pressable>

        <Card style={{ backgroundColor: colors.infoBg, borderColor: colors.info }}>
          <Txt variant="small">{t('convertDisclaimer')}</Txt>
        </Card>
      </ScrollView>
    </Screen>
  );
}
