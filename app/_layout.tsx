import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import Head from 'expo-router/head';
import React, { useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { ArtProvider } from '@/components/Art';
import { ConsentBanner } from '@/components/ConsentBanner';
import { useAppReady } from '@/components/Loading';
import { initAnalytics, setAnalyticsContext, track, trackPageView } from '@/lib/analytics';
import { registerServiceWorker } from '@/lib/durability';
import { isRtl, languageInfo } from '@/lib/languages';
import { hideSplash } from '@/lib/splash';
import { ProgressProvider, useProgress } from '@/store/ProgressProvider';
import { SettingsProvider, useSettings } from '@/store/SettingsProvider';
import { ThemeProvider, useTheme } from '@/theme/ThemeProvider';

// Before anything renders, so consent defaults are queued ahead of any hit.
initAnalytics();

function Navigator() {
  const { colors, dark } = useTheme();
  const ready = useAppReady();
  const { settings, update } = useSettings();
  const { progress } = useProgress();
  const router = useRouter();
  const segments = useSegments();
  const pathname = usePathname();
  const rtl = isRtl(settings.language);
  const lastLanguage = useRef<string | null>(null);

  // Hold the splash until stored settings and progress have loaded, so the
  // first frame is the user's real state rather than an empty shell.
  useEffect(() => {
    if (ready) hideSplash();
  }, [ready]);

  // Safety net: whatever happens, the full-screen splash must not outlive
  // four seconds, or a failed boot would leave the page unreachable behind it.
  useEffect(() => {
    const id = setTimeout(hideSplash, 4000);
    return () => clearTimeout(id);
  }, []);

  // Keep the document language and direction in step, for screen readers,
  // hyphenation and the browser's own right-to-left handling.
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    document.documentElement.lang = languageInfo(settings.language).locale;
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  }, [settings.language, rtl]);

  // Tag every hit with the interface language — with 13 test languages, who
  // studies in which one is the most useful thing the statistics can show.
  // A change after the first load is an event of its own.
  useEffect(() => {
    if (!ready) return;
    setAnalyticsContext({ app_language: settings.language });
    if (lastLanguage.current && lastLanguage.current !== settings.language) {
      track('language_change', { from: lastLanguage.current, to: settings.language });
    }
    lastLanguage.current = settings.language;
  }, [ready, settings.language]);

  // Client-side navigation does not reload the page, so count each screen.
  useEffect(() => {
    if (ready) trackPageView();
  }, [ready, pathname]);

  // First-time visitors go to the intro, whichever route they arrived on.
  useEffect(() => {
    if (!ready || settings.onboarded) return;
    if (progress.xp > 0 || Object.keys(progress.cards).length > 0) {
      update({ onboarded: true });
      return;
    }
    if (segments[0] === 'onboarding') return;
    router.replace('/onboarding');
  }, [ready, settings.onboarded, progress.xp, progress.cards, segments, router, update]);

  return (
    <>
      <Head>
        <title>Führerschein-Trainer</title>
        <meta
          name="description"
          content="German driving theory test practice in 13 languages, the practical test explained, and converting a foreign licence."
        />
      </Head>
      <StatusBar style={dark ? 'light' : 'dark'} />
      {/* Yoga mirrors every row under a right-to-left root, so Arabic gets a
          mirrored layout without per-screen code. */}
      <View style={{ flex: 1, direction: rtl ? 'rtl' : 'ltr' }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.bg },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
          <Stack.Screen name="practice" />
          <Stack.Screen name="exam-session" options={{ gestureEnabled: false }} />
          <Stack.Screen name="sign-trainer" />
          <Stack.Screen name="practical" />
          <Stack.Screen name="conversion" />
          <Stack.Screen name="plan" />
        </Stack>
        <ConsentBanner />
      </View>
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SettingsProvider>
          <ProgressProvider>
            <ThemeProvider>
              <ArtProvider>
                <Navigator />
              </ArtProvider>
            </ThemeProvider>
          </ProgressProvider>
        </SettingsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
