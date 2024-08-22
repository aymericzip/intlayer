/* eslint-disable sonarjs/max-switch-cases */
import { Locales } from '@intlayer/config/client';

export const getLocaleName = (locale: Locales): string => {
  switch (locale) {
    case Locales.ENGLISH:
      return 'English';
    case Locales.FRENCH:
      return 'Français';
    case Locales.SPANISH:
      return 'Español';
    case Locales.PORTUGUESE:
      return 'Português';
    case Locales.GERMAN:
      return 'Deutsch';
    case Locales.AFRIKAANS:
      return 'Afrikaans';
    case Locales.ARABIC:
      return 'العربية';
    case Locales.AZERI_LATIN:
      return 'Azərbaycan';
    case Locales.BELARUSIAN:
      return 'Беларуская';
    case Locales.BULGARIAN:
      return 'Български';
    case Locales.BOSNIAN:
      return 'Bosanski';
    case Locales.CATALAN:
      return 'Català';
    case Locales.CZECH:
      return 'Čeština';
    case Locales.WELSH:
      return 'Cymraeg';
    case Locales.DANISH:
      return 'Dansk';
    case Locales.DIVEHI:
      return 'ދިވެހި';
    case Locales.GREEK:
      return 'Ελληνικά';
    case Locales.ESPERANTO:
      return 'Esperanto';
    case Locales.ESTONIAN:
      return 'Eesti';
    case Locales.BASQUE:
      return 'Euskara';
    case Locales.FARSI:
      return 'فارسی';
    case Locales.FINNISH:
      return 'Suomi';
    case Locales.FAROESE:
      return 'Føroyskt';
    case Locales.GALICIAN:
      return 'Galego';
    case Locales.GUJARATI:
      return 'ગુજરાતી';
    case Locales.HEBREW:
      return 'עברית';
    case Locales.HINDI:
      return 'हिन्दी';
    case Locales.CROATIAN:
      return 'Hrvatski';
    case Locales.HUNGARIAN:
      return 'Magyar';
    case Locales.ARMENIAN:
      return 'Հայերեն';
    case Locales.INDONESIAN:
      return 'Bahasa Indonesia';
    case Locales.ICELANDIC:
      return 'Íslenska';
    case Locales.ITALIAN:
      return 'Italiano';
    case Locales.JAPANESE:
      return '日本語';
    case Locales.GEORGIAN:
      return 'ქართული';
    case Locales.KAZAKH:
      return 'Қазақ';
    case Locales.KANNADA:
      return 'ಕನ್ನಡ';
    case Locales.KOREAN:
      return '한국어';
    case Locales.KONKANI:
      return 'कोंकणी';
    case Locales.KYRGYZ:
      return 'Кыргыз';
    case Locales.LITHUANIAN:
      return 'Lietuvių';
    case Locales.LATVIAN:
      return 'Latviešu';
    case Locales.MAORI:
      return 'Māori';
    case Locales.FYRO_MACEDONIAN:
      return 'Македонски';
    case Locales.MONGOLIAN:
      return 'Монгол';
    case Locales.MARATHI:
      return 'मराठी';
    case Locales.MALAY:
      return 'Bahasa Melayu';
    case Locales.MALTESE:
      return 'Malti';
    case Locales.NORWEGIAN_BOKMAL:
      return 'Norsk Bokmål';
    case Locales.DUTCH:
      return 'Nederlands';
    case Locales.NORTHERN_SOTHO:
      return 'Sesotho sa Leboa';
    case Locales.PUNJABI:
      return 'ਪੰਜਾਬੀ';
    case Locales.POLISH:
      return 'Polski';
    case Locales.PASHTO:
      return 'پښتو';
    case Locales.QUECHUA:
      return 'Runasimi';
    case Locales.ROMANIAN:
      return 'Română';
    case Locales.RUSSIAN:
      return 'Русский';
    case Locales.SANSKRIT:
      return 'संस्कृतम्';
    case Locales.SAMI_NORTHERN:
      return 'Davvisámegiella';
    case Locales.SLOVAK:
      return 'Slovenčina';
    case Locales.SLOVENIAN:
      return 'Slovenščina';
    case Locales.ALBANIAN:
      return 'Shqip';
    case Locales.SERBIAN_LATIN:
      return 'Srpski';
    case Locales.SWEDISH:
      return 'Svenska';
    case Locales.SWEDISH_FINLAND:
      return 'Svenska (Finland)';
    case Locales.SWEDISH_SWEDEN:
      return 'Svenska (Sverige)';
    case Locales.SWAHILI:
      return 'Kiswahili';
    case Locales.SYRIAC:
      return 'ܣܘܪܝܝܐ';
    case Locales.TAMIL:
      return 'தமிழ்';
    case Locales.TELUGU:
      return 'తెలుగు';
    case Locales.THAI:
      return 'ไทย';
    case Locales.TAGALOG:
      return 'Tagalog';
    case Locales.TSWANA:
      return 'Setswana';
    case Locales.TURKISH:
      return 'Türkçe';
    case Locales.TATAR:
      return 'Xitsonga';
    case Locales.UKRAINIAN:
      return 'Українська';
    case Locales.URDU:
      return 'اردو';
    case Locales.UZBEK_LATIN:
      return 'O‘zbekcha';
    case Locales.VIETNAMESE:
      return 'Tiếng Việt';
    case Locales.XHOSA:
      return 'isiXhosa';
    case Locales.CHINESE_SIMPLIFIED:
      return '简体中文';
    case Locales.CHINESE_TRADITIONAL:
      return '繁體中文';
    case Locales.ZULU:
      return 'isiZulu';
    case Locales.AFRIKAANS_SOUTH_AFRICA:
      return 'Afrikaans (Suid-Afrika)';
    case Locales.ARABIC_UNITED_ARAB_EMIRATES:
      return 'العربية (الإمارات)';
    case Locales.ARABIC_BAHRAIN:
      return 'العربية (البحرين)';
    case Locales.ARABIC_ALGERIA:
      return 'العربية (الجزائر)';
    case Locales.ARABIC_EGYPT:
      return 'العربية (مصر)';
    case Locales.ARABIC_IRAQ:
      return 'العربية (العراق)';
    case Locales.ARABIC_JORDAN:
      return 'العربية (الأردن)';
    case Locales.ARABIC_KUWAIT:
      return 'العربية (الكويت)';
    case Locales.ARABIC_LEBANON:
      return 'العربية (لبنان)';
    case Locales.ARABIC_LIBYA:
      return 'العربية (ليبيا)';
    case Locales.ARABIC_MOROCCO:
      return 'العربية (المغرب)';
    case Locales.ARABIC_OMAN:
      return 'العربية (عمان)';
    case Locales.ARABIC_QATAR:
      return 'العربية (قطر)';
    case Locales.ARABIC_SAUDI_ARABIA:
      return 'العربية (السعودية)';
    case Locales.ARABIC_SYRIA:
      return 'العربية (سوريا)';
    case Locales.ARABIC_TUNISIA:
      return 'العربية (تونس)';
    case Locales.ARABIC_YEMEN:
      return 'العربية (اليمن)';
    case Locales.AZERI_LATIN_AZERBAIJAN:
      return 'Azərbaycan (Azərbaycan)';
    case Locales.BELARUSIAN_BELARUS:
      return 'Беларуская (Беларусь)';
    case Locales.BULGARIAN_BULGARIA:
      return 'Български (България)';
    case Locales.BOSNIAN_BOSNIA_AND_HERZEGOVINA:
      return 'Bosanski (Bosna i Hercegovina)';
    case Locales.CATALAN_SPAIN:
      return 'Català (Espanya)';
    case Locales.CZECH_CZECH_REPUBLIC:
      return 'Čeština (Česká republika)';
    case Locales.WELSH_UNITED_KINGDOM:
      return 'Cymraeg (Y Deyrnas Unedig)';
    case Locales.DANISH_DENMARK:
      return 'Dansk (Danmark)';
    case Locales.GERMAN_AUSTRIA:
      return 'Deutsch (Österreich)';
    case Locales.GERMAN_SWITZERLAND:
      return 'Deutsch (Schweiz)';
    case Locales.GERMAN_GERMANY:
      return 'Deutsch (Deutschland)';
    case Locales.GERMAN_LIECHTENSTEIN:
      return 'Deutsch (Liechtenstein)';
    case Locales.GERMAN_LUXEMBOURG:
      return 'Deutsch (Luxemburg)';
    case Locales.DIVEHI_MALDIVES:
      return 'ދިވެހި (ދިވެހި ރާއްޖެ)';
    case Locales.GREEK_GREECE:
      return 'Ελληνικά (Ελλάδα)';
    case Locales.ENGLISH_AUSTRALIA:
      return 'English (Australia)';
    case Locales.ENGLISH_BELIZE:
      return 'English (Belize)';
    case Locales.ENGLISH_CANADA:
      return 'English (Canada)';
    case Locales.ENGLISH_CARIBBEAN:
      return 'English (Caribbean)';
    case Locales.ENGLISH_UNITED_KINGDOM:
      return 'English (United Kingdom)';
    case Locales.ENGLISH_IRELAND:
      return 'English (Ireland)';
    case Locales.ENGLISH_JAMAICA:
      return 'English (Jamaica)';
    case Locales.ENGLISH_NEW_ZEALAND:
      return 'English (New Zealand)';
    case Locales.ENGLISH_PHILIPPINES:
      return 'English (Philippines)';
    case Locales.ENGLISH_TRINIDAD_AND_TOBAGO:
      return 'English (Trinidad and Tobago)';
    case Locales.ENGLISH_UNITED_STATES:
      return 'English (United States)';
    case Locales.ENGLISH_SOUTH_AFRICA:
      return 'English (South Africa)';
    case Locales.ENGLISH_ZIMBABWE:
      return 'English (Zimbabwe)';
    case Locales.SPANISH_ARGENTINA:
      return 'Español (Argentina)';
    case Locales.SPANISH_BOLIVIA:
      return 'Español (Bolivia)';
    case Locales.SPANISH_CHILE:
      return 'Español (Chile)';
    case Locales.SPANISH_COLOMBIA:
      return 'Español (Colombia)';
    case Locales.SPANISH_COSTA_RICA:
      return 'Español (Costa Rica)';
    case Locales.SPANISH_DOMINICAN_REPUBLIC:
      return 'Español (República Dominicana)';
    case Locales.SPANISH_ECUADOR:
      return 'Español (Ecuador)';
    case Locales.SPANISH_SPAIN:
      return 'Español (España)';
    case Locales.SPANISH_GUATEMALA:
      return 'Español (Guatemala)';
    case Locales.SPANISH_HONDURAS:
      return 'Español (Honduras)';
    case Locales.SPANISH_MEXICO:
      return 'Español (México)';
    case Locales.SPANISH_NICARAGUA:
      return 'Español (Nicaragua)';
    case Locales.SPANISH_PANAMA:
      return 'Español (Panamá)';
    case Locales.SPANISH_PERU:
      return 'Español (Perú)';
    case Locales.SPANISH_PUERTO_RICO:
      return 'Español (Puerto Rico)';
    case Locales.SPANISH_PARAGUAY:
      return 'Español (Paraguay)';
    case Locales.SPANISH_EL_SALVADOR:
      return 'Español (El Salvador)';
    case Locales.SPANISH_URUGUAY:
      return 'Español (Uruguay)';
    case Locales.SPANISH_VENEZUELA:
      return 'Español (Venezuela)';
    case Locales.ESTONIAN_ESTONIA:
      return 'Eesti (Eesti)';
    case Locales.BASQUE_SPAIN:
      return 'Euskara (Espainia)';
    case Locales.FARSI_IRAN:
      return 'فارسی (ایران)';
    case Locales.FINNISH_FINLAND:
      return 'Suomi (Suomi)';
    case Locales.FAROESE_FAROE_ISLANDS:
      return 'Føroyskt (Føroyar)';
    case Locales.FRENCH_BELGIUM:
      return 'Français (Belgique)';
    case Locales.FRENCH_CANADA:
      return 'Français (Canada)';
    case Locales.FRENCH_SWITZERLAND:
      return 'Français (Suisse)';
    case Locales.FRENCH_FRANCE:
      return 'Français (France)';
    case Locales.FRENCH_LUXEMBOURG:
      return 'Français (Luxembourg)';
    case Locales.FRENCH_PRINCIPALITY_OF_MONACO:
      return 'Français (Monaco)';
    case Locales.GALICIAN_SPAIN:
      return 'Galego (España)';
    case Locales.GUJARATI_INDIA:
      return 'ગુજરાતી (ભારત)';
    case Locales.HEBREW_ISRAEL:
      return 'עברית (ישראל)';
    case Locales.HINDI_INDIA:
      return 'हिन्दी (भारत)';
    case Locales.CROATIAN_BOSNIA_AND_HERZEGOVINA:
      return 'Hrvatski (Bosna i Hercegovina)';
    case Locales.CROATIAN_CROATIA:
      return 'Hrvatski (Hrvatska)';
    case Locales.HUNGARIAN_HUNGARY:
      return 'Magyar (Magyarország)';
    case Locales.ARMENIAN_ARMENIA:
      return 'Հայերեն (Հայաստան)';
    case Locales.INDONESIAN_INDONESIA:
      return 'Bahasa Indonesia (Indonesia)';
    case Locales.ICELANDIC_ICELAND:
      return 'Íslenska (Ísland)';
    case Locales.ITALIAN_SWITZERLAND:
      return 'Italiano (Svizzera)';
    case Locales.ITALIAN_ITALY:
      return 'Italiano (Italia)';
    case Locales.JAPANESE_JAPAN:
      return '日本語 (日本)';
    case Locales.GEORGIAN_GEORGIA:
      return 'ქართული (საქართველო)';
    case Locales.KAZAKH_KAZAKHSTAN:
      return 'Қазақ (Қазақстан)';
    case Locales.KANNADA_INDIA:
      return 'ಕನ್ನಡ (ಭಾರತ)';
    case Locales.KOREAN_KOREA:
      return '한국어 (대한민국)';
    case Locales.KONKANI_INDIA:
      return 'कोंकणी (भारत)';
    case Locales.KYRGYZ_KYRGYZSTAN:
      return 'Кыргыз (Кыргызстан)';
    case Locales.LITHUANIAN_LITHUANIA:
      return 'Lietuvių (Lietuva)';
    case Locales.LATVIAN_LATVIA:
      return 'Latviešu (Latvija)';
    case Locales.MAORI_NEW_ZEALAND:
      return 'Māori (Aotearoa)';
    case Locales.FYRO_MACEDONIAN_MACEDONIA:
      return 'Македонски (Македонија)';
    case Locales.MONGOLIAN_MONGOLIA:
      return 'Монгол (Монгол)';
    case Locales.MARATHI_INDIA:
      return 'मराठी (भारत)';
    case Locales.MALAY_BRUNEI_DARUSSALAM:
      return 'Bahasa Melayu (Brunei)';
    case Locales.MALAY_MALAYSIA:
      return 'Bahasa Melayu (Malaysia)';
    case Locales.MALTESE_MALTA:
      return 'Malti (Malta)';
    case Locales.NORWEGIAN_BOKMAL_NORWAY:
      return 'Norsk Bokmål (Norge)';
    case Locales.DUTCH_BELGIUM:
      return 'Nederlands (België)';
    case Locales.DUTCH_NETHERLANDS:
      return 'Nederlands (Nederland)';
    case Locales.NORWEGIAN_NYNORSK_NORWAY:
      return 'Norsk Nynorsk (Norge)';
    case Locales.NORTHERN_SOTHO_SOUTH_AFRICA:
      return 'Sesotho sa Leboa (South Africa)';
    case Locales.PUNJABI_INDIA:
      return 'ਪੰਜਾਬੀ (ਭਾਰਤ)';
    case Locales.POLISH_POLAND:
      return 'Polski (Polska)';
    case Locales.PASHTO_AFGHANISTAN:
      return 'پښتو (افغانستان)';
    case Locales.PORTUGUESE_BRAZIL:
      return 'Português (Brasil)';
    case Locales.PORTUGUESE_PORTUGAL:
      return 'Português (Portugal)';
    case Locales.QUECHUA_BOLIVIA:
      return 'Runasimi (Bolivia)';
    case Locales.QUECHUA_ECUADOR:
      return 'Runasimi (Ecuador)';
    case Locales.QUECHUA_PERU:
      return 'Runasimi (Perú)';
    case Locales.ROMANIAN_ROMANIA:
      return 'Română (România)';
    case Locales.RUSSIAN_RUSSIA:
      return 'Русский (Россия)';
    case Locales.SANSKRIT_INDIA:
      return 'संस्कृतम् (भारत)';
    case Locales.SAMI_NORTHERN_FINLAND:
      return 'Davvisámegiella (Suomi)';
    case Locales.SAMI_NORTHERN_NORWAY:
      return 'Davvisámegiella (Norge)';
    case Locales.SAMI_NORTHERN_SWEDEN:
      return 'Davvisámegiella (Sverige)';
    case Locales.SLOVAK_SLOVAKIA:
      return 'Slovenčina (Slovensko)';
    case Locales.SLOVENIAN_SLOVENIA:
      return 'Slovenščina (Slovenija)';
    case Locales.ALBANIAN_ALBANIA:
      return 'Shqip (Shqipëria)';
    case Locales.SERBIAN_LATIN_BOSNIA_AND_HERZEGOVINA:
      return 'Srpski (Bosna i Hercegovina)';
    case Locales.SERBIAN_LATIN_SERBIA_AND_MONTENEGRO:
      return 'Srpski (Srbija i Crna Gora)';
    case Locales.SWAHILI_KENYA:
      return 'Kiswahili (Kenya)';
    case Locales.SYRIAC_SYRIA:
      return 'ܣܘܪܝܝܐ (ܣܘܪܝܐ)';
    case Locales.TAMIL_INDIA:
      return 'தமிழ் (இந்தியா)';
    case Locales.TELUGU_INDIA:
      return 'తెలుగు (భారతదేశం)';
    case Locales.THAI_THAILAND:
      return 'ไทย (ประเทศไทย)';
    case Locales.TAGALOG_PHILIPPINES:
      return 'Tagalog (Pilipinas)';
    case Locales.TSWANA_SOUTH_AFRICA:
      return 'Setswana (Aforika Borwa)';
    case Locales.TURKISH_TURKEY:
      return 'Türkçe (Türkiye)';
    case Locales.TATAR_RUSSIA:
      return 'Татар (Россия)';
    case Locales.TSOGA:
      return 'Xitsonga';
    case Locales.UKRAINIAN_UKRAINE:
      return 'Українська (Україна)';
    case Locales.URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN:
      return 'اردو (پاکستان)';
    case Locales.UZBEK_LATIN_UZBEKISTAN:
      return 'O‘zbekcha (O‘zbekiston)';
    case Locales.VIETNAMESE_VIET_NAM:
      return 'Tiếng Việt (Việt Nam)';
    case Locales.XHOSA_SOUTH_AFRICA:
      return 'isiXhosa (South Africa)';
    case Locales.CHINESE_HONG_KONG:
      return '中文 (香港)';
    case Locales.CHINESE_MACAU:
      return '中文 (澳門)';
    case Locales.CHINESE_SINGAPORE:
      return '中文 (新加坡)';
    case Locales.ZULU_SOUTH_AFRICA:
      return 'isiZulu (South Africa)';
    default:
      return 'Locale not found';
  }
};
