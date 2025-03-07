import { Image, StyleSheet, Platform } from 'react-native';
import { useIntlayer, useLocale } from 'react-intlayer';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const { title, steps } = useIntlayer('home-screen');
  const { locale } = useLocale();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{locale}</ThemedText>
        <ThemedText type="title">{title}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{steps.step1.title}</ThemedText>
        <ThemedText>
          {steps.step1.description.edit}
          <ThemedText type="defaultSemiBold">
            {steps.step1.description.path}
          </ThemedText>{' '}
          {steps.step1.description.toSeeChanges}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          {steps.step1.description.toOpen}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{steps.step2.title}</ThemedText>
        <ThemedText>{steps.step2.description}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{steps.step3.title}</ThemedText>
        <ThemedText>
          {steps.step3.description.whenYoureReady}
          <ThemedText type="defaultSemiBold">
            {steps.step3.description.npmRunResetProject}
          </ThemedText>
          {steps.step3.description.toGetFresh}
          <ThemedText type="defaultSemiBold">
            {steps.step3.description.appDirectory}
          </ThemedText>
          {steps.step3.description.directory}
          <ThemedText type="defaultSemiBold">
            {steps.step3.description.appDirectory}
          </ThemedText>
          {steps.step3.description.to}
          <ThemedText type="defaultSemiBold">
            {steps.step3.description.appExample}
          </ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
