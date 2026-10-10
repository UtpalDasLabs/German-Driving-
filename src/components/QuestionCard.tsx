import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, useWindowDimensions, View } from 'react-native';

import { SceneArt } from '@/art/scene';
import { SignArt } from '@/art/signs';
import { AnswerOption, type OptionState } from '@/components/AnswerOption';
import { Card, Txt } from '@/components/ui';
import { isCorrect, type Answer } from '@/lib/exam';
import { getSign, getTopic } from '@/lib/study';
import type { Question } from '@/lib/types';
import { useT } from '@/lib/useT';
import { useTheme } from '@/theme/ThemeProvider';

/**
 * One theory question, as practice or as part of the mock exam.
 *
 * The visual comes first because that is how the real test is laid out and
 * how people read a traffic situation: picture, then question, then options.
 * In practice mode `revealed` turns the card into its own feedback - which
 * options were right, which you missed, and why.
 */
export function QuestionCard({
  question: q,
  answer,
  onChange,
  revealed = false,
}: {
  question: Question;
  answer: Answer;
  onChange?: (next: Answer) => void;
  revealed?: boolean;
}) {
  const { colors, space, radius } = useTheme();
  const { t, p, original } = useT();
  const { width } = useWindowDimensions();
  const visual = Math.min(width - space.lg * 4, 340);
  const topic = getTopic(q.topic);
  const hasYou = q.scene?.actors.some((a) => a.kind === 'you');
  const right = revealed ? isCorrect(q, answer) : null;

  const toggle = (i: number) => {
    if (!onChange || revealed) return;
    const picked = answer.picked.includes(i) ? answer.picked.filter((x) => x !== i) : [...answer.picked, i];
    onChange({ ...answer, picked });
  };

  const stateFor = (i: number): OptionState => {
    const ticked = answer.picked.includes(i);
    if (!revealed) return ticked ? 'selected' : 'idle';
    const isRight = q.correct.includes(i);
    if (isRight && ticked) return 'correct';
    if (isRight) return 'missed';
    if (ticked) return 'wrong';
    return 'muted';
  };

  return (
    <View style={{ gap: space.md }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm, flexWrap: 'wrap' }}>
        {topic ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name={topic.icon as 'car'} size={14} color={topic.color} />
            <Txt variant="caption" style={{ color: topic.color }}>
              {p(topic.title)}
            </Txt>
          </View>
        ) : null}
        <View style={{ flex: 1 }} />
        <Txt variant="caption" tone="faint">
          {q.basic ? t('basicTag') : t('classBTag')}
        </Txt>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: radius.pill,
            backgroundColor: q.points === 5 ? colors.dangerBg : colors.surfaceAlt,
          }}
        >
          <Txt variant="caption" style={{ color: q.points === 5 ? colors.danger : colors.textMuted }}>
            {q.points} {t('pointsShort')}
          </Txt>
        </View>
      </View>

      {q.scene ? (
        <View style={{ alignItems: 'center', gap: 4 }}>
          <View style={{ borderRadius: radius.md, overflow: 'hidden' }}>
            <SceneArt scene={q.scene} size={visual} title={p(q.prompt)} />
          </View>
          {hasYou ? (
            <Txt variant="caption" tone="faint">
              {t('youLegend')}
            </Txt>
          ) : null}
        </View>
      ) : null}

      {q.signs.length && !q.scene ? (
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: space.md, flexWrap: 'wrap' }}>
          {q.signs.map((id) => (
            <SignArt key={id} id={id} size={q.signs.length > 2 ? 84 : 110} title={p(getSign(id)?.name)} />
          ))}
        </View>
      ) : null}

      <View style={{ gap: 4 }}>
        <Txt variant="heading">{p(q.prompt)}</Txt>
        {original(q.prompt) ? (
          <Txt variant="small" tone="faint">
            {original(q.prompt)}
          </Txt>
        ) : null}
      </View>

      {q.kind === 'choice' ? (
        <View style={{ gap: space.sm }}>
          <Txt variant="caption" tone="faint">
            {t('pickAll')}
          </Txt>
          {q.options.map((o, i) => (
            <AnswerOption
              key={i}
              index={i}
              label={p(o)}
              original={original(o)}
              state={stateFor(i)}
              onPress={onChange && !revealed ? () => toggle(i) : undefined}
            />
          ))}
        </View>
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
          <TextInput
            value={answer.number}
            onChangeText={(text) => onChange?.({ ...answer, number: text })}
            editable={!!onChange && !revealed}
            inputMode="decimal"
            keyboardType="decimal-pad"
            placeholder={t('enterNumber')}
            placeholderTextColor={colors.textFaint}
            accessibilityLabel={t('enterNumber')}
            style={{
              flex: 1,
              maxWidth: 200,
              fontSize: 22,
              fontWeight: '800',
              color: revealed ? (right ? colors.success : colors.danger) : colors.text,
              backgroundColor: colors.surface,
              borderWidth: 2,
              borderColor: revealed ? (right ? colors.success : colors.danger) : colors.borderStrong,
              borderRadius: radius.md,
              paddingHorizontal: space.md,
              paddingVertical: space.sm,
            }}
          />
          {q.unit ? <Txt variant="heading">{q.unit}</Txt> : null}
          {revealed && !right ? (
            <Txt variant="bodyStrong" tone="success">
              = {String(q.answerNumber).replace('.', ',')} {q.unit ?? ''}
            </Txt>
          ) : null}
        </View>
      )}

      {revealed ? (
        <Card
          style={{
            gap: space.sm,
            borderColor: right ? colors.success : colors.danger,
            backgroundColor: right ? colors.successBg : colors.dangerBg,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.sm }}>
            <Ionicons
              name={right ? 'checkmark-circle' : 'information-circle'}
              size={22}
              color={right ? colors.success : colors.danger}
            />
            <Txt variant="bodyStrong" style={{ color: right ? colors.success : colors.danger }}>
              {right ? t('correctAnswer') : t('wrongAnswer')}
            </Txt>
          </View>
          {!right && q.kind === 'choice' && q.correct.length > 1 ? (
            <Txt variant="small" tone="muted">
              {t('partlyWrong')}
            </Txt>
          ) : null}
          <Txt variant="overline" tone="faint">
            {t('why').toUpperCase()}
          </Txt>
          <Txt variant="prose">{p(q.why)}</Txt>
          {q.tip ? (
            <View
              style={{
                flexDirection: 'row',
                gap: space.sm,
                alignItems: 'flex-start',
                backgroundColor: colors.surface,
                borderRadius: radius.sm,
                padding: space.sm,
              }}
            >
              <Ionicons name="bulb" size={18} color={colors.xp} />
              <Txt variant="small" style={{ flex: 1 }}>
                {p(q.tip)}
              </Txt>
            </View>
          ) : null}
        </Card>
      ) : null}
    </View>
  );
}
