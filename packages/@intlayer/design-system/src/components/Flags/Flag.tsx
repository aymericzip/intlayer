/* eslint-disable sonarjs/max-switch-cases */
/* eslint-disable import/order */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/max-switch-cases */
import { Locales } from '@intlayer/config/client';
import type { FC, ImgHTMLAttributes } from 'react';

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
// import bangladesh from './bd.svg';
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
// import bhutan from './bt.svg';
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
// import westernSahara from './eh.svg';
// import eritrea from './er.svg';
import catalonia from './es-ct.svg';
import galicia from './es-ga.svg';
import basqueCountry from './es-pv.svg';
import spain from './es.svg';
// import ethiopia from './et.svg';
// import europe from './eu.svg';
import finland from './fi.svg';
// import fiji from './fj.svg';
// import falklandIslands from './fk.svg';
// import federatedStatesOfMicronesia from './fm.svg';
import faroeIslands from './fo.svg';
import france from './fr.svg';
// import gabon from './ga.svg';
// import england from './gb-eng.svg';
// import northernIreland from './gb-nir.svg';
// import scotland from './gb-sct.svg';
import wales from './gb-wls.svg';
import unitedKingdom from './gb.svg';
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
// import cambodia from './kh.svg';
// import comoros from './km.svg';
import jordan from './jo.svg';
import japan from './jp.svg';
import kenya from './ke.svg';
import kyrgyzstan from './kg.svg';
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
// import laos from './la.svg';
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
// import mozambique from './mz.svg';
// import myanmar from './mm.svg';
// import namibia from './na.svg';
// import nauru from './nr.svg';
// import nepal from './np.svg';
// import newCaledonia from './nc.svg';
// import niger from './ne.svg';
// import nigeria from './ng.svg';
// import niue from './nu.svg';
// import norfolkIsland from './nf.svg';
// import northKorea from './kp.svg';
import northMacedonia from './mk.svg';
import mongolia from './mn.svg';
import macau from './mo.svg';
import malta from './mt.svg';
import maldives from './mv.svg';
import mexico from './mx.svg';
import malaysia from './my.svg';
import nicaragua from './ni.svg';
import netherlands from './nl.svg';
// import northernMarianaIslands from './mp.svg';
import norway from './no.svg';
import newZealand from './nz.svg';
import oman from './om.svg';
// import palau from './pw.svg';
import panama from './pa.svg';
// import papuaNewGuinea from './pg.svg';
import peru from './pe.svg';
import philippines from './ph.svg';
import pakistan from './pk.svg';
// import pitcairn from './pn.svg';
import poland from './pl.svg';
import puertoRico from './pr.svg';
import portugal from './pt.svg';
import paraguay from './py.svg';
import qatar from './qa.svg';
import romania from './ro.svg';
// import rwanda from './rw.svg';
// import réunion from './re.svg';
// import saintHelenaAscensionAndTristanDaCunha from './sh.svg';
// import saintKittsAndNevis from './kn.svg';
// import saintLucia from './lc.svg';
// import saintMartin from './mf.svg';
// import saintPierreAndMiquelon from './pm.svg';
// import sanMarino from './sm.svg';
// import saoTomeAndPrincipe from './st.svg';
// import senegal from './sn.svg';
import serbia from './rs.svg';
import russia from './ru.svg';
import saudiArabia from './sa.svg';
// import seychelles from './sc.svg';
// import sierraLeone from './sl.svg';
// import sintMaarten from './sx.svg';
// import solomonIslands from './sb.svg';
// import somalia from './so.svg';
// import southGeorgiaAndTheSouthSandwichIslands from './gs.svg';
// import southSudan from './ss.svg';
// import sriLanka from './lk.svg';
// import stateOfPalestine from './ps.svg';
// import sudan from './sd.svg';
// import suriname from './sr.svg';
// import svalbardAndJanMayen from './sj.svg';
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
// import turksAndCaicosIslands from './tc.svg';
// import zambia from './zm.svg';
import zimbabwe from './zw.svg';
// import ascensionIsland from './sh-ac.svg';
// import canaryIslands from './ic.svg';
// import pacificCommunity from './pc.svg';
// import saintHelena from './sh-hl.svg';
// import tristanDaCunha from './sh-ta.svg';

type FlagProps = ImgHTMLAttributes<HTMLImageElement> & {
  locale: Locales;
};

export const Flag: FC<FlagProps> = ({ locale, ...props }) => {
  let logo = undefined;

  switch (locale) {
    case Locales.ENGLISH:
      logo = unitedStatesOfAmerica;
      break;
    case Locales.FRENCH:
      logo = france;
      break;
    case Locales.SPANISH:
      logo = spain;
      break;
    case Locales.PORTUGUESE:
      logo = portugal;
      break;
    case Locales.GERMAN:
      logo = germany;
      break;
    case Locales.AFRIKAANS:
      logo = southAfrica;
      break;
    case Locales.ARABIC:
      logo = saudiArabia;
      break;
    case Locales.AZERI_LATIN:
      logo = azerbaijan;
      break;
    case Locales.BELARUSIAN:
      logo = belarus;
      break;
    case Locales.BULGARIAN:
      logo = bulgaria;
      break;
    case Locales.BOSNIAN:
      logo = bosniaAndHerzegovina;
      break;
    case Locales.CATALAN:
      logo = catalonia;
      break;
    case Locales.CZECH:
      logo = czechRepublic;
      break;
    case Locales.WELSH:
      logo = wales;
      break;
    case Locales.DANISH:
      logo = denmark;
      break;
    case Locales.DIVEHI:
      logo = maldives;
      break;
    case Locales.GREEK:
      logo = greece;
      break;
    case Locales.ESPERANTO:
      logo = unknown; // No specific flag
      break;
    case Locales.ESTONIAN:
      logo = estonia;
      break;
    case Locales.BASQUE:
      logo = basqueCountry;
      break;
    case Locales.FARSI:
      logo = iran;
      break;
    case Locales.FINNISH:
      logo = finland;
      break;
    case Locales.FAROESE:
      logo = faroeIslands;
      break;
    case Locales.GALICIAN:
      logo = galicia;
      break;
    case Locales.GUJARATI:
      logo = india;
      break;
    case Locales.HEBREW:
      logo = israel;
      break;
    case Locales.HINDI:
      logo = india;
      break;
    case Locales.CROATIAN:
      logo = croatia;
      break;
    case Locales.HUNGARIAN:
      logo = hungary;
      break;
    case Locales.ARMENIAN:
      logo = armenia;
      break;
    case Locales.INDONESIAN:
      logo = indonesia;
      break;
    case Locales.ICELANDIC:
      logo = iceland;
      break;
    case Locales.ITALIAN:
      logo = italy;
      break;
    case Locales.JAPANESE:
      logo = japan;
      break;
    case Locales.GEORGIAN:
      logo = georgia;
      break;
    case Locales.KAZAKH:
      logo = kazakhstan;
      break;
    case Locales.KANNADA:
      logo = india;
      break;
    case Locales.KOREAN:
      logo = southKorea;
      break;
    case Locales.KONKANI:
      logo = india;
      break;
    case Locales.KYRGYZ:
      logo = kyrgyzstan;
      break;
    case Locales.LITHUANIAN:
      logo = lithuania;
      break;
    case Locales.LATVIAN:
      logo = latvia;
      break;
    case Locales.MAORI:
      logo = newZealand;
      break;
    case Locales.FYRO_MACEDONIAN:
      logo = northMacedonia;
      break;
    case Locales.MONGOLIAN:
      logo = mongolia;
      break;
    case Locales.MARATHI:
      logo = india;
      break;
    case Locales.MALAY:
      logo = malaysia;
      break;
    case Locales.MALTESE:
      logo = malta;
      break;
    case Locales.NORWEGIAN_BOKMAL:
      logo = norway;
      break;
    case Locales.DUTCH:
      logo = netherlands;
      break;
    case Locales.NORTHERN_SOTHO:
      logo = southAfrica;
      break;
    case Locales.PUNJABI:
      logo = india;
      break;
    case Locales.POLISH:
      logo = poland;
      break;
    case Locales.PASHTO:
      logo = afghanistan;
      break;
    case Locales.QUECHUA:
      logo = peru;
      break;
    case Locales.ROMANIAN:
      logo = romania;
      break;
    case Locales.RUSSIAN:
      logo = russia;
      break;
    case Locales.SANSKRIT:
      logo = india;
      break;
    case Locales.SAMI_NORTHERN:
      logo = norway; // No specific flag, assuming Norway
      break;
    case Locales.SLOVAK:
      logo = slovakia;
      break;
    case Locales.SLOVENIAN:
      logo = slovenia;
      break;
    case Locales.ALBANIAN:
      logo = albania;
      break;
    case Locales.SERBIAN_LATIN:
      logo = serbia;
      break;
    case Locales.SWEDISH:
      logo = sweden;
      break;
    case Locales.SWEDISH_FINLAND:
      logo = finland;
      break;
    case Locales.SWEDISH_SWEDEN:
      logo = sweden;
      break;
    case Locales.SWAHILI:
      logo = kenya;
      break;
    case Locales.SYRIAC:
      logo = syria;
      break;
    case Locales.TAMIL:
      logo = india;
      break;
    case Locales.TELUGU:
      logo = india;
      break;
    case Locales.THAI:
      logo = thailand;
      break;
    case Locales.TAGALOG:
      logo = philippines;
      break;
    case Locales.TSWANA:
      logo = southAfrica;
      break;
    case Locales.TURKISH:
      logo = türkiye;
      break;
    case Locales.TATAR:
      logo = russia; // Assuming Russian Federation
      break;
    case Locales.UKRAINIAN:
      logo = ukraine;
      break;
    case Locales.URDU:
      logo = pakistan;
      break;
    case Locales.UZBEK_LATIN:
      logo = uzbekistan;
      break;
    case Locales.VIETNAMESE:
      logo = vietnam;
      break;
    case Locales.XHOSA:
      logo = southAfrica;
      break;
    case Locales.CHINESE_SIMPLIFIED:
      logo = china;
      break;
    case Locales.CHINESE_TRADITIONAL:
      logo = taiwan;
      break;
    case Locales.ZULU:
      logo = southAfrica;
      break;
    case Locales.AFRIKAANS_SOUTH_AFRICA:
      logo = southAfrica;
      break;
    case Locales.ARABIC_UNITED_ARAB_EMIRATES:
      logo = unitedArabEmirates;
      break;
    case Locales.ARABIC_BAHRAIN:
      logo = bahrain;
      break;
    case Locales.ARABIC_ALGERIA:
      logo = algeria;
      break;
    case Locales.ARABIC_EGYPT:
      logo = egypt;
      break;
    case Locales.ARABIC_IRAQ:
      logo = iraq;
      break;
    case Locales.ARABIC_JORDAN:
      logo = jordan;
      break;
    case Locales.ARABIC_KUWAIT:
      logo = kuwait;
      break;
    case Locales.ARABIC_LEBANON:
      logo = lebanon;
      break;
    case Locales.ARABIC_LIBYA:
      logo = libya;
      break;
    case Locales.ARABIC_MOROCCO:
      logo = morocco;
      break;
    case Locales.ARABIC_OMAN:
      logo = oman;
      break;
    case Locales.ARABIC_QATAR:
      logo = qatar;
      break;
    case Locales.ARABIC_SAUDI_ARABIA:
      logo = saudiArabia;
      break;
    case Locales.ARABIC_SYRIA:
      logo = syria;
      break;
    case Locales.ARABIC_TUNISIA:
      logo = tunisia;
      break;
    case Locales.ARABIC_YEMEN:
      logo = yemen;
      break;
    case Locales.AZERI_LATIN_AZERBAIJAN:
      logo = azerbaijan;
      break;
    case Locales.BELARUSIAN_BELARUS:
      logo = belarus;
      break;
    case Locales.BULGARIAN_BULGARIA:
      logo = bulgaria;
      break;
    case Locales.BOSNIAN_BOSNIA_AND_HERZEGOVINA:
      logo = bosniaAndHerzegovina;
      break;
    case Locales.CATALAN_SPAIN:
      logo = catalonia;
      break;
    case Locales.CZECH_CZECH_REPUBLIC:
      logo = czechRepublic;
      break;
    case Locales.WELSH_UNITED_KINGDOM:
      logo = wales;
      break;
    case Locales.DANISH_DENMARK:
      logo = denmark;
      break;
    case Locales.GERMAN_AUSTRIA:
      logo = austria;
      break;
    case Locales.GERMAN_SWITZERLAND:
      logo = switzerland;
      break;
    case Locales.GERMAN_GERMANY:
      logo = germany;
      break;
    case Locales.GERMAN_LIECHTENSTEIN:
      logo = liechtenstein;
      break;
    case Locales.GERMAN_LUXEMBOURG:
      logo = luxembourg;
      break;
    case Locales.DIVEHI_MALDIVES:
      logo = maldives;
      break;
    case Locales.GREEK_GREECE:
      logo = greece;
      break;
    case Locales.ENGLISH_AUSTRALIA:
      logo = australia;
      break;
    case Locales.ENGLISH_BELIZE:
      logo = belize;
      break;
    case Locales.ENGLISH_CANADA:
      logo = canada;
      break;
    case Locales.ENGLISH_CARIBBEAN:
      logo = unknown; // No specific flag
      break;
    case Locales.ENGLISH_UNITED_KINGDOM:
      logo = unitedKingdom;
      break;
    case Locales.ENGLISH_IRELAND:
      logo = ireland;
      break;
    case Locales.ENGLISH_JAMAICA:
      logo = jamaica;
      break;
    case Locales.ENGLISH_NEW_ZEALAND:
      logo = newZealand;
      break;
    case Locales.ENGLISH_PHILIPPINES:
      logo = philippines;
      break;
    case Locales.ENGLISH_TRINIDAD_AND_TOBAGO:
      logo = trinidadAndTobago;
      break;
    case Locales.ENGLISH_UNITED_STATES:
      logo = unitedStatesOfAmerica;
      break;
    case Locales.ENGLISH_SOUTH_AFRICA:
      logo = southAfrica;
      break;
    case Locales.ENGLISH_ZIMBABWE:
      logo = zimbabwe;
      break;
    case Locales.SPANISH_ARGENTINA:
      logo = argentina;
      break;
    case Locales.SPANISH_BOLIVIA:
      logo = bolivia;
      break;
    case Locales.SPANISH_CHILE:
      logo = chile;
      break;
    case Locales.SPANISH_COLOMBIA:
      logo = colombia;
      break;
    case Locales.SPANISH_COSTA_RICA:
      logo = costaRica;
      break;
    case Locales.SPANISH_DOMINICAN_REPUBLIC:
      logo = dominicanRepublic;
      break;
    case Locales.SPANISH_ECUADOR:
      logo = ecuador;
      break;
    case Locales.SPANISH_SPAIN:
      logo = spain;
      break;
    case Locales.SPANISH_GUATEMALA:
      logo = guatemala;
      break;
    case Locales.SPANISH_HONDURAS:
      logo = honduras;
      break;
    case Locales.SPANISH_MEXICO:
      logo = mexico;
      break;
    case Locales.SPANISH_NICARAGUA:
      logo = nicaragua;
      break;
    case Locales.SPANISH_PANAMA:
      logo = panama;
      break;
    case Locales.SPANISH_PERU:
      logo = peru;
      break;
    case Locales.SPANISH_PUERTO_RICO:
      logo = puertoRico;
      break;
    case Locales.SPANISH_PARAGUAY:
      logo = paraguay;
      break;
    case Locales.SPANISH_EL_SALVADOR:
      logo = elSalvador;
      break;
    case Locales.SPANISH_URUGUAY:
      logo = uruguay;
      break;
    case Locales.SPANISH_VENEZUELA:
      logo = venezuela;
      break;
    case Locales.ESTONIAN_ESTONIA:
      logo = estonia;
      break;
    case Locales.BASQUE_SPAIN:
      logo = basqueCountry;
      break;
    case Locales.FARSI_IRAN:
      logo = iran;
      break;
    case Locales.FINNISH_FINLAND:
      logo = finland;
      break;
    case Locales.FAROESE_FAROE_ISLANDS:
      logo = faroeIslands;
      break;
    case Locales.FRENCH_BELGIUM:
      logo = belgium;
      break;
    case Locales.FRENCH_CANADA:
      logo = canada;
      break;
    case Locales.FRENCH_SWITZERLAND:
      logo = switzerland;
      break;
    case Locales.FRENCH_FRANCE:
      logo = france;
      break;
    case Locales.FRENCH_LUXEMBOURG:
      logo = luxembourg;
      break;
    case Locales.FRENCH_PRINCIPALITY_OF_MONACO:
      logo = monaco;
      break;
    case Locales.GALICIAN_SPAIN:
      logo = galicia;
      break;
    case Locales.GUJARATI_INDIA:
      logo = india;
      break;
    case Locales.HEBREW_ISRAEL:
      logo = israel;
      break;
    case Locales.HINDI_INDIA:
      logo = india;
      break;
    case Locales.CROATIAN_BOSNIA_AND_HERZEGOVINA:
      logo = bosniaAndHerzegovina;
      break;
    case Locales.CROATIAN_CROATIA:
      logo = croatia;
      break;
    case Locales.HUNGARIAN_HUNGARY:
      logo = hungary;
      break;
    case Locales.ARMENIAN_ARMENIA:
      logo = armenia;
      break;
    case Locales.INDONESIAN_INDONESIA:
      logo = indonesia;
      break;
    case Locales.ICELANDIC_ICELAND:
      logo = iceland;
      break;
    case Locales.ITALIAN_SWITZERLAND:
      logo = switzerland;
      break;
    case Locales.ITALIAN_ITALY:
      logo = italy;
      break;
    case Locales.JAPANESE_JAPAN:
      logo = japan;
      break;
    case Locales.GEORGIAN_GEORGIA:
      logo = georgia;
      break;
    case Locales.KAZAKH_KAZAKHSTAN:
      logo = kazakhstan;
      break;
    case Locales.KANNADA_INDIA:
      logo = india;
      break;
    case Locales.KOREAN_KOREA:
      logo = southKorea;
      break;
    case Locales.KONKANI_INDIA:
      logo = india;
      break;
    case Locales.KYRGYZ_KYRGYZSTAN:
      logo = kyrgyzstan;
      break;
    case Locales.LITHUANIAN_LITHUANIA:
      logo = lithuania;
      break;
    case Locales.LATVIAN_LATVIA:
      logo = latvia;
      break;
    case Locales.MAORI_NEW_ZEALAND:
      logo = newZealand;
      break;
    case Locales.FYRO_MACEDONIAN_MACEDONIA:
      logo = northMacedonia;
      break;
    case Locales.MONGOLIAN_MONGOLIA:
      logo = mongolia;
      break;
    case Locales.MARATHI_INDIA:
      logo = india;
      break;
    case Locales.MALAY_BRUNEI_DARUSSALAM:
      logo = bruneiDarussalam;
      break;
    case Locales.MALAY_MALAYSIA:
      logo = malaysia;
      break;
    case Locales.MALTESE_MALTA:
      logo = malta;
      break;
    case Locales.NORWEGIAN_BOKMAL_NORWAY:
      logo = norway;
      break;
    case Locales.DUTCH_BELGIUM:
      logo = belgium;
      break;
    case Locales.DUTCH_NETHERLANDS:
      logo = netherlands;
      break;
    case Locales.NORWEGIAN_NYNORSK_NORWAY:
      logo = norway;
      break;
    case Locales.NORTHERN_SOTHO_SOUTH_AFRICA:
      logo = southAfrica;
      break;
    case Locales.PUNJABI_INDIA:
      logo = india;
      break;
    case Locales.POLISH_POLAND:
      logo = poland;
      break;
    case Locales.PASHTO_AFGHANISTAN:
      logo = afghanistan;
      break;
    case Locales.PORTUGUESE_BRAZIL:
      logo = brazil;
      break;
    case Locales.PORTUGUESE_PORTUGAL:
      logo = portugal;
      break;
    case Locales.QUECHUA_BOLIVIA:
      logo = bolivia;
      break;
    case Locales.QUECHUA_ECUADOR:
      logo = ecuador;
      break;
    case Locales.QUECHUA_PERU:
      logo = peru;
      break;
    case Locales.ROMANIAN_ROMANIA:
      logo = romania;
      break;
    case Locales.RUSSIAN_RUSSIA:
      logo = russia;
      break;
    case Locales.SANSKRIT_INDIA:
      logo = india;
      break;
    case Locales.SAMI_NORTHERN_FINLAND:
      logo = finland;
      break;
    case Locales.SAMI_NORTHERN_NORWAY:
      logo = norway;
      break;
    case Locales.SAMI_NORTHERN_SWEDEN:
      logo = sweden;
      break;
    case Locales.SLOVAK_SLOVAKIA:
      logo = slovakia;
      break;
    case Locales.SLOVENIAN_SLOVENIA:
      logo = slovenia;
      break;
    case Locales.ALBANIAN_ALBANIA:
      logo = albania;
      break;
    case Locales.SERBIAN_LATIN_BOSNIA_AND_HERZEGOVINA:
      logo = bosniaAndHerzegovina;
      break;
    case Locales.SERBIAN_LATIN_SERBIA_AND_MONTENEGRO:
      logo = serbia;
      break;
    case Locales.SWAHILI_KENYA:
      logo = kenya;
      break;
    case Locales.SYRIAC_SYRIA:
      logo = syria;
      break;
    case Locales.TAMIL_INDIA:
      logo = india;
      break;
    case Locales.TELUGU_INDIA:
      logo = india;
      break;
    case Locales.THAI_THAILAND:
      logo = thailand;
      break;
    case Locales.TAGALOG_PHILIPPINES:
      logo = philippines;
      break;
    case Locales.TSWANA_SOUTH_AFRICA:
      logo = southAfrica;
      break;
    case Locales.TURKISH_TURKEY:
      logo = türkiye;
      break;
    case Locales.TATAR_RUSSIA:
      logo = russia;
      break;
    case Locales.TSOGA:
      logo = unknown; // No specific flag
      break;
    case Locales.UKRAINIAN_UKRAINE:
      logo = ukraine;
      break;
    case Locales.URDU_ISLAMIC_REPUBLIC_OF_PAKISTAN:
      logo = pakistan;
      break;
    case Locales.UZBEK_LATIN_UZBEKISTAN:
      logo = uzbekistan;
      break;
    case Locales.VIETNAMESE_VIET_NAM:
      logo = vietnam;
      break;
    case Locales.XHOSA_SOUTH_AFRICA:
      logo = southAfrica;
      break;
    case Locales.CHINESE_HONG_KONG:
      logo = hongKong;
      break;
    case Locales.CHINESE_MACAU:
      logo = macau;
      break;
    case Locales.CHINESE_SINGAPORE:
      logo = singapore;
      break;
    case Locales.ZULU_SOUTH_AFRICA:
      logo = southAfrica;
      break;
    default:
      logo = unknown;
  }

  return <img src={logo} alt={`${locale} flag`} {...props} />;
};
