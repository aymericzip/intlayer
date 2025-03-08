import { type FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getLocaleName } from 'intlayer';
import { useLocale } from 'react-intlayer';

export const LocaleSwitcher: FC = () => {
  const { setLocale, availableLocales } = useLocale();

  return (
    <View style={styles.container}>
      {availableLocales.map((locale) => (
        <TouchableOpacity
          key={locale}
          style={styles.button}
          onPress={() => setLocale(locale)}
        >
          <Text style={styles.text}>{getLocaleName(locale)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8, // Spacing between buttons
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#ddd', // Light background
  },
  text: {
    fontSize: 14, // Smaller text
    fontWeight: '500',
    color: '#333',
  },
});
