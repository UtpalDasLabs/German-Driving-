import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';

import { Txt } from '@/components/ui';
import { useTheme } from '@/theme/ThemeProvider';

export type OptionState = 'idle' | 'selected' | 'correct' | 'missed' | 'wrong' | 'muted';

/**
 * One answer option, drawn as a checkbox because the theory test lets more
 * than one option be right and you must tick all of them.
 *
 * After checking: a correctly ticked option is green, a wrongly ticked one is
 * red, and a correct option you left unticked is outlined green ("missed") -
 * that last state is the one people most need to see. Icons back up colour.
 */
export function AnswerOption({
  index,
  label,
  original,
  state,
  onPress,
}: {
  index: number;
  label: string;
  /** German original under a translated option. */
  original?: string | null;
  state: OptionState;
  onPress?: () => void;
}) {
  const { colors, radius, space } = useTheme();

  const style = {
    idle: { bg: colors.surface, border: colors.border, fg: colors.text },
    selected: { bg: colors.infoBg, border: colors.accent, fg: colors.text },
    correct: { bg: colors.successBg, border: colors.success, fg: colors.success },
    missed: { bg: colors.surface, border: colors.success, fg: colors.text },
    wrong: { bg: colors.dangerBg, border: colors.danger, fg: colors.danger },
    muted: { bg: colors.surface, border: colors.border, fg: colors.textFaint },
  }[state];

  const ticked = state === 'selected' || state === 'correct' || state === 'wrong';
  const box =
    state === 'correct' || state === 'missed'
      ? 'checkbox'
      : state === 'wrong'
        ? 'close-circle'
        : ticked
          ? 'checkbox'
          : 'square-outline';
  const boxColor =
    state === 'correct' || state === 'missed'
      ? colors.success
      : state === 'wrong'
        ? colors.danger
        : ticked
          ? colors.accent
          : colors.textFaint;

  return (
    <Pressable
      onPress={onPress}
      disabled={onPress == null}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: ticked }}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.md,
        padding: space.md,
        borderRadius: radius.md,
        backgroundColor: style.bg,
        borderWidth: 2,
        borderStyle: state === 'missed' ? 'dashed' : 'solid',
        borderColor: style.border,
        opacity: pressed ? 0.85 : state === 'muted' ? 0.6 : 1,
      })}
    >
      <Ionicons name={box} size={26} color={boxColor} />
      <View style={{ flex: 1, gap: 2 }}>
        <Txt variant="body" style={{ color: style.fg }}>
          <Txt variant="bodyStrong" style={{ color: colors.textFaint }}>
            {'ABCD'[index]}{'  '}
          </Txt>
          {label}
        </Txt>
        {original ? (
          <Txt variant="caption" tone="faint">
            {original}
          </Txt>
        ) : null}
      </View>
    </Pressable>
  );
}
