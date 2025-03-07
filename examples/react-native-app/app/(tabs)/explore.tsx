import { StyleSheet, Image, Platform } from 'react-native';
import { useIntlayer } from 'react-intlayer';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  // 1. Grab all the content from intlayer for "tab-two-screen"
  const {
    title,
    description,
    collapsibles: {
      fileBasedRouting,
      androidIosWebSupport,
      images,
      customFonts,
      lightDarkMode,
      animations,
    },
  } = useIntlayer('tab-two-screen');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{title}</ThemedText>
      </ThemedView>
      <ThemedText>{description}</ThemedText>

      {/* Collapsible #1 */}
      <Collapsible title={fileBasedRouting.title.value}>
        <ThemedText>
          {fileBasedRouting.description1}
          <ThemedText type="defaultSemiBold">
            app/(tabs)/index.tsx
          </ThemedText>{' '}
          {' and '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>{fileBasedRouting.description2}</ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">{fileBasedRouting.learnMore}</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Collapsible #2 */}
      <Collapsible title={androidIosWebSupport.title.value}>
        <ThemedText>{androidIosWebSupport.description}</ThemedText>
      </Collapsible>

      {/* Collapsible #3 */}
      <Collapsible title={images.title.value}>
        <ThemedText>{images.description1}</ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">{images.learnMore}</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Collapsible #4 */}
      <Collapsible title={customFonts.title.value}>
        <ThemedText>{customFonts.description1}</ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">{customFonts.learnMore}</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Collapsible #5 */}
      <Collapsible title={lightDarkMode.title.value}>
        <ThemedText>{lightDarkMode.description}</ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">{lightDarkMode.learnMore}</ThemedText>
        </ExternalLink>
      </Collapsible>

      {/* Collapsible #6 */}
      <Collapsible title={animations.title.value}>
        <ThemedText>{animations.description1}</ThemedText>
        {Platform.select({
          ios: <ThemedText>{animations.description2}</ThemedText>,
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
