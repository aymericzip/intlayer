import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useIntlayer } from 'react-intlayer';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  // 1. Pull in the dictionary for "not-found-screen"
  const { screenTitle, title, linkText } = useIntlayer('not-found-screen');

  return (
    <>
      <Stack.Screen options={{ title: screenTitle }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">{title}</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">{linkText}</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
