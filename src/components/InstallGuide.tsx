import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, View } from 'react-native';

import { InstallMockup } from '@/components/InstallMockup';
import { Button, Txt } from '@/components/ui';
import {
  canPromptInstall,
  detectPlatform,
  isEmbeddedArtifact,
  isInstalled,
  isIosSafari,
  onInstallable,
  promptInstall,
  type InstallPlatform,
} from '@/lib/install';
import { useT, type T } from '@/lib/useT';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * How to get the app onto a home screen.
 *
 * Chromium hands us a real prompt, so Android and desktop can offer a button.
 * Safari has never implemented that API, so iOS users are shown the actual
 * taps - which is the whole point, since nothing in the UI otherwise hints
 * that Add to Home Screen exists.
 *
 * Each step carries a small drawing of the bar or menu it is talking about.
 * "Tap the Share button" only helps someone who already knows which glyph that
 * is, and the people who most need to install the app are exactly the people
 * who do not.
 */

type Step = { text: string; scene: string };

function stepsFor(platform: InstallPlatform, iosSafari: boolean, t: T): Step[] {
  if (platform === 'ios') {
    // Every iPhone browser is WebKit underneath, but only Safari can add to
    // the home screen, so anyone else gets sent there first.
    if (!iosSafari) return [{ text: t('iosOtherBrowser'), scene: 'iosShare' }];
    return [
      { text: t('iosStep1'), scene: 'iosShare' },
      { text: t('iosStep2'), scene: 'iosAddToHome' },
      { text: t('iosStep3'), scene: 'iosConfirm' },
    ];
  }
  if (platform === 'android') {
    return [
      { text: t('androidStep1'), scene: 'androidMenu' },
      { text: t('androidStep2'), scene: 'androidInstall' },
      { text: t('androidStep3'), scene: 'androidConfirm' },
    ];
  }
  return [
    { text: t('desktopStep1'), scene: 'desktopAddressBar' },
    { text: t('desktopStep2'), scene: 'desktopMenu' },
  ];
}

export function InstallGuide({ compact = false }: { compact?: boolean }) {
  const { colors, radius, space } = useTheme();
  const { t } = useT();

  const [platform, setPlatform] = useState<InstallPlatform>('unsupported');
  const [installed, setInstalled] = useState(false);
  const [promptable, setPromptable] = useState(false);
  const [iosSafari, setIosSafari] = useState(false);
  const [done, setDone] = useState(false);
  const [embedded, setEmbedded] = useState(false);

  useEffect(() => {
    setEmbedded(isEmbeddedArtifact());
    setPlatform(detectPlatform());
    setInstalled(isInstalled());
    setPromptable(canPromptInstall());
    setIosSafari(isIosSafari());
    return onInstallable(() => {
      setPromptable(canPromptInstall());
      setInstalled(isInstalled());
    });
  }, []);

  const onInstall = useCallback(async () => {
    const accepted = await promptInstall();
    setPromptable(canPromptInstall());
    if (accepted) setDone(true);
  }, []);

  if (Platform.OS !== 'web') return null;
  // Inside an embedded artifact there is no page to install.
  if (embedded) return null;

  if (installed || done) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
        <Ionicons name="checkmark-circle" size={20} color={colors.success} />
        <Txt variant="small" tone="success" style={{ flex: 1 }}>
          {t('installedBody')}
        </Txt>
      </View>
    );
  }

  const steps = stepsFor(platform, iosSafari, t);

  return (
    <View style={{ gap: space.md }}>
      {/* On the settings screen the heading is the card's; in onboarding the
          screen already shows the title and the reason above this component. */}
      {!compact ? (
        <Txt variant="small" tone="muted">
          {t('installWhy')}
        </Txt>
      ) : null}

      {/* Chromium can do it in one tap. The illustrated steps stay underneath
          anyway: the prompt can be dismissed, and then they are all you have. */}
      {promptable ? (
        <Button
          title={t('installNow')}
          size="lg"
          full
          icon={<Ionicons name="download-outline" size={18} color={colors.onAccent} />}
          onPress={() => void onInstall()}
        />
      ) : null}

      <View
        style={{
          backgroundColor: colors.bgElevated,
          borderRadius: radius.lg,
          padding: space.lg,
          gap: space.lg,
        }}
      >
        {steps.map((step, i) => (
          <View key={step.scene} style={{ gap: space.sm }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: space.sm }}>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: colors.info,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Txt variant="caption" style={{ color: '#FFFFFF' }}>
                  {i + 1}
                </Txt>
              </View>
              <Txt variant="bodyStrong" style={{ flex: 1 }}>
                {step.text}
              </Txt>
            </View>

            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: radius.md,
                borderWidth: 2,
                borderColor: colors.border,
                paddingVertical: space.sm,
                overflow: 'hidden',
              }}
            >
              <InstallMockup name={step.scene} />
            </View>
          </View>
        ))}
      </View>

      <Txt variant="caption" tone="faint">
        {t('installNoStore')}
      </Txt>
    </View>
  );
}
