import { type Locale, Locales } from '@intlayer/types';
import type {
  ComponentType,
  FC,
  ImgHTMLAttributes,
  JSX,
  SVGProps,
} from 'react';

// import andorra from './ad.svg';
import unitedArabEmirates from './ae.svg';
import afghanistan from './af.svg';
// import antiguaAndBarbuda from './ag.svg';
// import anguilla from './ai.svg';
import albania from './al.svg';
import armenia from './am.svg';
// import angola from './ao.svg';
// import antarctica from './aq.svg';
import argentina from './ar.svg';
// import leagueOfArabStates from './arab.svg';
// import americanSamoa from './as.svg';
import austria from './at.svg';
import australia from './au.svg';
// import aruba from './aw.svg';
// import alandIslands from './ax.svg';
import azerbaijan from './az.svg';
import bosniaAndHerzegovina from './ba.svg';
// import barbados from './bb.svg';
import bangladesh from './bd.svg';
import belgium from './be.svg';
// import burkinaFaso from './bf.svg';
import bulgaria from './bg.svg';
import bahrain from './bh.svg';
// import burundi from './bi.svg';
// import benin from './bj.svg';
// import saintBarthélemy from './bl.svg';
// import bermuda from './bm.svg';
import bruneiDarussalam from './bn.svg';
import bolivia from './bo.svg';
// import bonaireSintEustatiusAndSaba from './bq.svg';
import brazil from './br.svg';
// import bahamas from './bs.svg';
// import bouvetIsland from './bv.svg';
// import botswana from './bw.svg';
import belarus from './by.svg';
import belize from './bz.svg';
import canada from './ca.svg';
// import cocosKeelingIslands from './cc.svg';
// import democraticRepublicOfTheCongo from './cd.svg';
// import centralEuropeanFreeTradeAgreement from './cefta.svg';
// import centralAfricanRepublic from './cf.svg';
// import republicOfTheCongo from './cg.svg';
import switzerland from './ch.svg';
// import côteDIvoire from './ci.svg';
// import cookIslands from './ck.svg';
import chile from './cl.svg';
// import cameroon from './cm.svg';
import china from './cn.svg';
import colombia from './co.svg';
// import clippertonIsland from './cp.svg';
import costaRica from './cr.svg';
// import cuba from './cu.svg';
// import caboVerde from './cv.svg';
// import curaçao from './cw.svg';
// import christmasIsland from './cx.svg';
// import cyprus from './cy.svg';
import czechRepublic from './cz.svg';
import germany from './de.svg';
// import diegoGarcia from './dg.svg';
// import djibouti from './dj.svg';
import denmark from './dk.svg';
// import dominica from './dm.svg';
import dominicanRepublic from './do.svg';
import algeria from './dz.svg';
// import eastAfricanCommunity from './eac.svg';
import ecuador from './ec.svg';
import estonia from './ee.svg';
import egypt from './eg.svg';
import spain from './es.svg';
// import westernSahara from './eh.svg';
// import eritrea from './er.svg';
import catalonia from './es-ct.svg';
import galicia from './es-ga.svg';
import basqueCountry from './es-pv.svg';
// import mozambique from './mz.svg';
// import ascensionIsland from './sh-ac.svg';
// import canaryIslands from './ic.svg';
// import pacificCommunity from './pc.svg';
// import saintHelena from './sh-hl.svg';
// import tristanDaCunha from './sh-ta.svg';
import ethiopia from './et.svg';
// import ethiopia from './et.svg';
// import europe from './eu.svg';
import finland from './fi.svg';
// import fiji from './fj.svg';
// import falklandIslands from './fk.svg';
// import federatedStatesOfMicronesia from './fm.svg';
import faroeIslands from './fo.svg';
import france from './fr.svg';
import unitedKingdom from './gb.svg';
// import gabon from './ga.svg';
// import england from './gb-eng.svg';
// import northernIreland from './gb-nir.svg';
// import scotland from './gb-sct.svg';
import wales from './gb-wls.svg';
// import grenada from './gd.svg';
import georgia from './ge.svg';
// import frenchGuiana from './gf.svg';
// import guernsey from './gg.svg';
// import ghana from './gh.svg';
// import gibraltar from './gi.svg';
// import greenland from './gl.svg';
// import gambia from './gm.svg';
// import guinea from './gn.svg';
// import guadeloupe from './gp.svg';
// import equatorialGuinea from './gq.svg';
import greece from './gr.svg';
import guatemala from './gt.svg';
import hongKong from './hk.svg';
import honduras from './hn.svg';
import croatia from './hr.svg';
// import britishIndianOceanTerritory from './io.svg';
import hungary from './hu.svg';
import indonesia from './id.svg';
import ireland from './ie.svg';
import israel from './il.svg';
import india from './in.svg';
import iraq from './iq.svg';
import iran from './ir.svg';
import iceland from './is.svg';
import italy from './it.svg';
import jamaica from './jm.svg';
import jordan from './jo.svg';
import japan from './jp.svg';
import kenya from './ke.svg';
import kyrgyzstan from './kg.svg';
import cambodia from './kh.svg';
import southKorea from './kr.svg';
import kuwait from './kw.svg';
// import caymanIslands from './ky.svg';
// import chad from './td.svg';
// import eswatini from './sz.svg';
// import frenchPolynesia from './pf.svg';
// import frenchSouthernTerritories from './tf.svg';
// import guam from './gu.svg';
// import guineaBissau from './gw.svg';
// import guyana from './gy.svg';
// import haiti from './ht.svg';
// import heardIslandAndMcdonaldIslands from './hm.svg';
// import togo from './tg.svg';
// import tajikistan from './tj.svg';
// import tokelau from './tk.svg';
// import timorLeste from './tl.svg';
// import turkmenistan from './tm.svg';
// import tonga from './to.svg';
// import tuvalu from './tv.svg';
// import tanzania from './tz.svg';
// import uganda from './ug.svg';
// import unitedStatesMinorOutlyingIslands from './um.svg';
// import unitedNations from './un.svg';
// import holySee from './va.svg';
// import isleOfMan from './im.svg';
// import jersey from './je.svg';
import kazakhstan from './kz.svg';
// import kiribati from './ki.svg';
import laos from './la.svg';
import lebanon from './lb.svg';
// import lesotho from './ls.svg';
// import liberia from './lr.svg';
import liechtenstein from './li.svg';
import lithuania from './lt.svg';
import luxembourg from './lu.svg';
import latvia from './lv.svg';
import libya from './ly.svg';
// import madagascar from './mg.svg';
// import malawi from './mw.svg';
// import mali from './ml.svg';
// import marshallIslands from './mh.svg';
// import martinique from './mq.svg';
// import mauritania from './mr.svg';
// import mauritius from './mu.svg';
// import saintVincentAndTheGrenadines from './vc.svg';
// import virginIslandsBritish from './vg.svg';
// import virginIslandsUS from './vi.svg';
// import vanuatu from './vu.svg';
// import wallisAndFutuna from './wf.svg';
// import samoa from './ws.svg';
// import kosovo from './xk.svg';
// import mayotte from './yt.svg';
// import moldova from './md.svg';
// import montenegro from './me.svg';
// import montserrat from './ms.svg';
import morocco from './ma.svg';
import monaco from './mc.svg';
import northMacedonia from './mk.svg';
import myanmar from './mm.svg';
import mongolia from './mn.svg';
import macau from './mo.svg';
import malta from './mt.svg';
import maldives from './mv.svg';
import mexico from './mx.svg';
import malaysia from './my.svg';
import nigeria from './ng.svg';
import nicaragua from './ni.svg';
import netherlands from './nl.svg';
import norway from './no.svg';
import nepal from './np.svg';
import newZealand from './nz.svg';
import oman from './om.svg';
import panama from './pa.svg';
import peru from './pe.svg';
import philippines from './ph.svg';
import pakistan from './pk.svg';
import poland from './pl.svg';
import puertoRico from './pr.svg';
import portugal from './pt.svg';
import paraguay from './py.svg';
import qatar from './qa.svg';
import romania from './ro.svg';
import serbia from './rs.svg';
import russia from './ru.svg';
import saudiArabia from './sa.svg';
import sweden from './se.svg';
import singapore from './sg.svg';
import slovenia from './si.svg';
import slovakia from './sk.svg';
import elSalvador from './sv.svg';
import syria from './sy.svg';
import thailand from './th.svg';
import tunisia from './tn.svg';
import türkiye from './tr.svg';
import trinidadAndTobago from './tt.svg';
import taiwan from './tw.svg';
import ukraine from './ua.svg';
import unitedStatesOfAmerica from './us.svg';
import uruguay from './uy.svg';
import uzbekistan from './uz.svg';
import venezuela from './ve.svg';
import vietnam from './vn.svg';
import unknown from './xx.svg';
import yemen from './ye.svg';
import southAfrica from './za.svg';
import zimbabwe from './zw.svg';

type FlagProps = ImgHTMLAttributes<HTMLImageElement> & {
  locale: Locale;
};

const flagRecord: Partial<Record<Locale, typeof unknown>> = {
  [Locales.ENGLISH]: unitedStatesOfAmerica,
  [Locales.FRENCH]: france,
  [Locales.SPANISH]: spain,
  [Locales.PORTUGUESE]: portugal,
  [Locales.GERMAN]: germany,
  [Locales.AFRIKAANS]: southAfrica,
  [Locales.ARABIC]: saudiArabia,
  [Locales.AZERI_LATIN]: azerbaijan,
  [Locales.BELARUSIAN]: belarus,
  [Locales.BULGARIAN]: bulgaria,
  [Locales.BOSNIAN]: bosniaAndHerzegovina,
  [Locales.CATALAN]: catalonia,
  [Locales.CZECH]: czechRepublic,
  [Locales.WELSH]: wales,
  [Locales.DANISH]: denmark,
  [Locales.DIVEHI]: maldives,
  [Locales.GREEK]: greece,
  [Locales.ESPERANTO]: unknown, // No specific flag
  [Locales.ESTONIAN]: estonia,
  [Locales.BASQUE]: basqueCountry,
  [Locales.FARSI]: iran,
  [Locales.FINNISH]: finland,
  [Locales.FAROESE]: faroeIslands,
  [Locales.GALICIAN]: galicia,
  [Locales.GUJARATI]: india,
  [Locales.HEBREW]: israel,
  [Locales.HINDI]: india,
  [Locales.CROATIAN]: croatia,
  [Locales.HUNGARIAN]: hungary,
  [Locales.ARMENIAN]: armenia,
  [Locales.INDONESIAN]: indonesia,
  [Locales.ICELANDIC]: iceland,
  [Locales.ITALIAN]: italy,
  [Locales.JAPANESE]: japan,
  [Locales.GEORGIAN]: georgia,
  [Locales.KAZAKH]: kazakhstan,
  [Locales.KANNADA]: india,
  [Locales.KOREAN]: southKorea,
  [Locales.KONKANI]: india,
  [Locales.KYRGYZ]: kyrgyzstan,
  [Locales.LITHUANIAN]: lithuania,
  [Locales.LATVIAN]: latvia,
  [Locales.MAORI]: newZealand,
  [Locales.FYRO_MACEDONIAN]: northMacedonia,
  [Locales.MONGOLIAN]: mongolia,
  [Locales.MARATHI]: india,
  [Locales.MALAY]: malaysia,
  [Locales.MALTESE]: malta,
  [Locales.NORWEGIAN_BOKMAL]: norway,
  [Locales.DUTCH]: netherlands,
  [Locales.NORTHERN_SOTHO]: southAfrica,
  [Locales.PUNJABI]: india,
  [Locales.POLISH]: poland,
  [Locales.PASHTO]: afghanistan,
  [Locales.QUECHUA]: peru,
  [Locales.ROMANIAN]: romania,
  [Locales.RUSSIAN]: russia,
  [Locales.SANSKRIT]: india,
  [Locales.SAMI_NORTHERN]: norway, // No specific flag, assuming Norway
  [Locales.SLOVAK]: slovakia,
  [Locales.SLOVENIAN]: slovenia,
  [Locales.ALBANIAN]: albania,
  [Locales.SERBIAN_LATIN]: serbia,
  [Locales.SWEDISH]: sweden,
  [Locales.SWEDISH_FINLAND]: finland,
  [Locales.SWEDISH_SWEDEN]: sweden,
  [Locales.SWAHILI]: kenya,
  [Locales.SYRIAC]: syria,
  [Locales.TAMIL]: india,
  [Locales.TELUGU]: india,
  [Locales.THAI]: thailand,
  [Locales.TAGALOG]: philippines,
  [Locales.TSWANA]: southAfrica,
  [Locales.TURKISH]: türkiye,
  [Locales.TATAR]: russia, // Assuming Russian Federation
  [Locales.UKRAINIAN]: ukraine,
  [Locales.URDU]: pakistan,
  [Locales.UZBEK_LATIN]: uzbekistan,
  [Locales.VIETNAMESE]: vietnam,
  [Locales.XHOSA]: southAfrica,
  [Locales.CHINESE_SIMPLIFIED]: china,
  [Locales.CHINESE_TRADITIONAL]: taiwan,
  [Locales.ZULU]: southAfrica,
  [Locales.AFRIKAANS_SOUTH_AFRICA]: southAfrica,
  [Locales.ARABIC_UNITED_ARAB_EMIRATES]: unitedArabEmirates,
  [Locales.ARABIC_BAHRAIN]: bahrain,
  [Locales.ARABIC_ALGERIA]: algeria,
  [Locales.ARABIC_EGYPT]: egypt,
  [Locales.ARABIC_IRAQ]: iraq,
  [Locales.ARABIC_JORDAN]: jordan,
  [Locales.ARABIC_KUWAIT]: kuwait,
  [Locales.ARABIC_LEBANON]: lebanon,
  [Locales.ARABIC_LIBYA]: libya,
  [Locales.ARABIC_MOROCCO]: morocco,
  [Locales.ARABIC_OMAN]: oman,
  [Locales.ARABIC_QATAR]: qatar,
  [Locales.ARABIC_SAUDI_ARABIA]: saudiArabia,
  [Locales.ARABIC_SYRIA]: syria,
  [Locales.ARABIC_TUNISIA]: tunisia,
  [Locales.ARABIC_YEMEN]: yemen,
  [Locales.AZERI_LATIN_AZERBAIJAN]: azerbaijan,
  [Locales.BELARUSIAN_BELARUS]: belarus,
  [Locales.BULGARIAN_BULGARIA]: bulgaria,
  [Locales.BOSNIAN_BOSNIA_AND_HERZEGOVINA]: bosniaAndHerzegovina,
  [Locales.CATALAN_SPAIN]: catalonia,
  [Locales.CZECH_CZECH_REPUBLIC]: czechRepublic,
  [Locales.WELSH_UNITED_KINGDOM]: wales,
  [Locales.DANISH_DENMARK]: denmark,
  [Locales.GERMAN_AUSTRIA]: austria,
  [Locales.GERMAN_SWITZERLAND]: switzerland,
  [Locales.GERMAN_GERMANY]: germany,
  [Locales.GERMAN_LIECHTENSTEIN]: liechtenstein,
  [Locales.GERMAN_LUXEMBOURG]: luxembourg,
  [Locales.DIVEHI_MALDIVES]: maldives,
  [Locales.GREEK_GREECE]: greece,
  [Locales.ENGLISH_AUSTRALIA]: australia,
  [Locales.ENGLISH_BELIZE]: belize,
  [Locales.ENGLISH_CANADA]: canada,
  [Locales.ENGLISH_CARIBBEAN]: unknown, // No specific flag
  [Locales.ENGLISH_UNITED_KINGDOM]: unitedKingdom,
  [Locales.ENGLISH_IRELAND]: ireland,
  [Locales.ENGLISH_JAMAICA]: jamaica,
  [Locales.ENGLISH_NEW_ZEALAND]: newZealand,
  [Locales.ENGLISH_PHILIPPINES]: philippines,
  [Locales.ENGLISH_TRINIDAD_AND_TOBAGO]: trinidadAndTobago,
  [Locales.ENGLISH_UNITED_STATES]: unitedStatesOfAmerica,
  [Locales.ENGLISH_SOUTH_AFRICA]: southAfrica,
  [Locales.ENGLISH_ZIMBABWE]: zimbabwe,
  [Locales.SPANISH_ARGENTINA]: argentina,
  [Locales.SPANISH_BOLIVIA]: bolivia,
  [Locales.SPANISH_CHILE]: chile,
  [Locales.SPANISH_COLOMBIA]: colombia,
  [Locales.SPANISH_COSTA_RICA]: costaRica,
  [Locales.SPANISH_DOMINICAN_REPUBLIC]: dominicanRepublic,
  [Locales.SPANISH_ECUADOR]: ecuador,
  [Locales.SPANISH_SPAIN]: spain,
  [Locales.SPANISH_GUATEMALA]: guatemala,
  [Locales.SPANISH_HONDURAS]: honduras,
  [Locales.SPANISH_MEXICO]: mexico,
  [Locales.SPANISH_NICARAGUA]: nicaragua,
  [Locales.SPANISH_PANAMA]: panama,
  [Locales.SPANISH_PERU]: peru,
  [Locales.SPANISH_PUERTO_RICO]: puertoRico,
  [Locales.SPANISH_PARAGUAY]: paraguay,
  [Locales.SPANISH_EL_SALVADOR]: elSalvador,
  [Locales.SPANISH_URUGUAY]: uruguay,
  [Locales.SPANISH_VENEZUELA]: venezuela,
  [Locales.ESTONIAN_ESTONIA]: estonia,
  [Locales.BASQUE_SPAIN]: basqueCountry,
  [Locales.FARSI_IRAN]: iran,
  [Locales.FINNISH_FINLAND]: finland,
  [Locales.FAROESE_FAROE_ISLANDS]: faroeIslands,
  [Locales.FRENCH_BELGIUM]: belgium,
  [Locales.FRENCH_CANADA]: canada,
  [Locales.FRENCH_SWITZERLAND]: switzerland,
  [Locales.FRENCH_FRANCE]: france,
  [Locales.FRENCH_LUXEMBOURG]: luxembourg,
  [Locales.FRENCH_PRINCIPALITY_OF_MONACO]: monaco,
  [Locales.GALICIAN_SPAIN]: galicia,
  [Locales.GUJARATI_INDIA]: india,
  [Locales.HEBREW_ISRAEL]: israel,
  [Locales.HINDI_INDIA]: india,
  [Locales.CROATIAN_BOSNIA_AND_HERZEGOVINA]: bosniaAndHerzegovina,
  [Locales.CROATIAN_CROATIA]: croatia,
  [Locales.HUNGARIAN_HUNGARY]: hungary,
  [Locales.ARMENIAN_ARMENIA]: armenia,
  [Locales.INDONESIAN_INDONESIA]: indonesia,
  [Locales.ICELANDIC_ICELAND]: iceland,
  [Locales.ITALIAN_SWITZERLAND]: switzerland,
  [Locales.ITALIAN_ITALY]: italy,
  [Locales.JAPANESE_JAPAN]: japan,
  [Locales.GEORGIAN_GEORGIA]: georgia,
  [Locales.KAZAKH_KAZAKHSTAN]: kazakhstan,
  [Locales.KANNADA_INDIA]: india,
  [Locales.KOREAN_KOREA]: southKorea,
  [Locales.KONKANI_INDIA]: india,
  [Locales.KYRGYZ_KYRGYZSTAN]: kyrgyzstan,
  [Locales.LITHUANIAN_LITHUANIA]: lithuania,
  [Locales.LATVIAN_LATVIA]: latvia,
  [Locales.MAORI_NEW_ZEALAND]: newZealand,
  [Locales.FYRO_MACEDONIAN_MACEDONIA]: northMacedonia,
  [Locales.MONGOLIAN_MONGOLIA]: mongolia,
  [Locales.MARATHI_INDIA]: india,
  [Locales.MALAY_BRUNEI_DARUSSALAM]: bruneiDarussalam,
  [Locales.MALAY_MALAYSIA]: malaysia,
  [Locales.MALTESE_MALTA]: malta,
  [Locales.NORWEGIAN_BOKMAL_NORWAY]: norway,
  [Locales.DUTCH_BELGIUM]: belgium,
  [Locales.DUTCH_NETHERLANDS]: netherlands,
  [Locales.NORWEGIAN_NYNORSK_NORWAY]: norway,
  [Locales.NORTHERN_SOTHO_SOUTH_AFRICA]: southAfrica,
  [Locales.PUNJABI_INDIA]: india,
  [Locales.POLISH_POLAND]: poland,
  [Locales.PASHTO_AFGHANISTAN]: afghanistan,
  [Locales.PORTUGUESE_BRAZIL]: brazil,
  [Locales.PORTUGUESE_PORTUGAL]: portugal,
  [Locales.QUECHUA_BOLIVIA]: bolivia,
  [Locales.QUECHUA_ECUADOR]: ecuador,
  [Locales.QUECHUA_PERU]: peru,
  [Locales.ROMANIAN_ROMANIA]: romania,
  [Locales.RUSSIAN_RUSSIA]: russia,
  [Locales.SANSKRIT_INDIA]: india,
  [Locales.SAMI_NORTHERN_FINLAND]: finland,
  [Locales.SAMI_NORTHERN_NORWAY]: norway,
  [Locales.SAMI_NORTHERN_SWEDEN]: sweden,
  [Locales.SLOVAK_SLOVAKIA]: slovakia,
  [Locales.SLOVENIAN_SLOVENIA]: slovenia,
  [Locales.ALBANIAN_ALBANIA]: albania,
  [Locales.SERBIAN_LATIN_BOSNIA_AND_HERZEGOVINA]: bosniaAndHerzegovina,
  [Locales.SERBIAN_LATIN_SERBIA_AND_MONTENEGRO]: serbia,
  [Locales.SWAHILI_KENYA]: kenya,
  [Locales.SYRIAC_SYRIA]: syria,
  [Locales.TAMIL_INDIA]: india,
  [Locales.TELUGU_INDIA]: india,
  [Locales.THAI_THAILAND]: thailand,
  [Locales.TAGALOG_PHILIPPINES]: philippines,
  [Locales.TSWANA_SOUTH_AFRICA]: southAfrica,
  [Locales.TURKISH_TURKEY]: türkiye,
  [Locales.TATAR_RUSSIA]: russia,
  [Locales.TSOGA]: unknown, // No specific flag
  [Locales.UKRAINIAN_UKRAINE]: ukraine,
  [Locales.URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN]: pakistan,
  [Locales.UZBEK_LATIN_UZBEKISTAN]: uzbekistan,
  [Locales.VIETNAMESE_VIET_NAM]: vietnam,
  [Locales.XHOSA_SOUTH_AFRICA]: southAfrica,
  [Locales.CHINESE]: china,
  [Locales.CHINESE_SIMPLIFIED_CHINA]: china,
  [Locales.CHINESE_HONG_KONG]: hongKong,
  [Locales.CHINESE_MACAU]: macau,
  [Locales.CHINESE_SINGAPORE]: singapore,
  [Locales.ZULU_SOUTH_AFRICA]: southAfrica,
  [Locales.BENGALI]: india,
  [Locales.BENGALI_BANGLADESH]: bangladesh,
  [Locales.BENGALI_INDIA]: india,
  [Locales.BENGALI_MYANMAR]: myanmar,
  [Locales.BURMESE]: myanmar,
  [Locales.BURMESE_MYANMAR]: myanmar,
  [Locales.KHMER]: cambodia,
  [Locales.KHMER_CAMBODIA]: cambodia,
  [Locales.LAO]: laos,
  [Locales.LAO_LAOS]: laos,
  [Locales.YORUBA]: nigeria,
  [Locales.YORUBA_NIGERIA]: nigeria,
  [Locales.AMHARIC]: ethiopia,
  [Locales.AMHARIC_ETHIOPIA]: ethiopia,
  [Locales.NEPALI]: nepal,
  [Locales.NEPALI_NEPAL]: nepal,
};

export const Flag: FC<FlagProps> = ({ locale, alt, ...props }): JSX.Element => {
  const asset = flagRecord[locale] ?? unknown;

  // Case 1: bundler returns a URL string or an object with a .src field
  if (typeof asset === 'string' || (asset as any)?.src) {
    const src =
      typeof asset === 'string' ? (asset as string) : (asset as any).src;
    return <img src={src} alt={alt ?? `${locale} flag`} {...props} />;
  }

  // Case 2: bundler returns a React component (SVGR)
  const Svg = asset as ComponentType<SVGProps<SVGSVGElement>>;
  const { width, height, className, style, onClick } = props;

  return (
    <Svg
      aria-label={alt ?? `${locale} flag`}
      width={width as any}
      height={height as any}
      className={className}
      style={style}
      onClick={onClick as any}
      role="img"
      focusable={false as any}
    />
  );
};
