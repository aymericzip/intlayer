if (!self.define) {
  let e,
    a = {};
  const t = (t, s) => (
    (t = new URL(t + '.js', s).href),
    a[t] ||
      new Promise((a) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = t), (e.onload = a), document.head.appendChild(e);
        } else (e = t), importScripts(t), a();
      }).then(() => {
        let e = a[t];
        if (!e) throw new Error(`Module ${t} didn’t register its module`);
        return e;
      })
  );
  self.define = (s, i) => {
    const r =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (a[r]) return;
    let c = {};
    const n = (e) => t(e, r),
      h = { module: { uri: r }, exports: c, require: n };
    a[r] = Promise.all(s.map((e) => h[e] || n(e))).then((e) => (i(...e), c));
  };
}
define(['./workbox-01fd22c6'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '009a1f3a23081f3781776b805d285ae3',
        },
        {
          url: '/_next/static/GSPRv8revHSIqWdTSC9Dk/_buildManifest.js',
          revision: 'f0d960e6bcf136b56b17a241133f6960',
        },
        {
          url: '/_next/static/GSPRv8revHSIqWdTSC9Dk/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/1317-c1347ed256af5a01.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/27578-a74ed59ad3ee9b51.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/2910-887f1f0781d5081f.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/31385-84c4095be3b807e2.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/32706-c819268472a367f2.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/58376.1ede608ef9aa8c14.js',
          revision: '1ede608ef9aa8c14',
        },
        {
          url: '/_next/static/chunks/59987-f4d98e4550b51a26.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/76470-84ab05e68a8a6378.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/78456-3bce0d6184d3fb92.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/85443-f0557e6869e46ae4.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/88263-003969d1fbcba31c.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/89072-8188cce74615b71e.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/8ece9acb-b3dc770ec1f1eed5.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/92615-aa5e92193d0822b9.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/98480-8cc4cf95b9947f18.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(editable)/demo/layout-3d101ddc14197b77.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(editable)/demo/page-72ee7cf75d9b8c36.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/%5B...not-found%5D/layout-5d6358cf5132b07b.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/%5B...not-found%5D/page-3daed79714c4d527.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/404/layout-576dbaf704fe8eae.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/404/page-b08cfbf57bd7a57a.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/layout-6b7600684fbb1312.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/login/page-e7d6b37cf985901d.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/password/change/page-3f4fb5a26ef78f87.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/password/reset/page-9577ec66905ca496.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/register/page-daa19030256a1178.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/doc/%5B%5B...doc%5D%5D/layout-2a125356d11a71cb.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/doc/%5B%5B...doc%5D%5D/page-860aa97f80604721.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/layout-b7ca7007202ffbdb.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/page-b5f47c252293f63c.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/privacy_notice/page-01579ffb87f09407.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/terms_of_service/page-7a1d2b1f66a7b03f.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/layout-4369593a2f033a27.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ba65039e87d8d679.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/app/layout-74bc329f378eed38.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/framework-dd35c5a5815a926e.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/main-3d786e46401dbb2d.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/main-app-c15cd386a1ef49c4.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/pages/_app-231fcc092c035b18.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/pages/_error-17527fce3203a26d.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_abnf.4cf68cc4b18de2da.js',
          revision: '4cf68cc4b18de2da',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_accesslog.34c3ec5634314f62.js',
          revision: '34c3ec5634314f62',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_actionscript.26e6ae892bdfeade.js',
          revision: '26e6ae892bdfeade',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ada.5df84f08fc770054.js',
          revision: '5df84f08fc770054',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_angelscript.269124e5dd8ecbd0.js',
          revision: '269124e5dd8ecbd0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_apache.c856bbf3c1e775a5.js',
          revision: 'c856bbf3c1e775a5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_applescript.59c4c9a6d2ef0b94.js',
          revision: '59c4c9a6d2ef0b94',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_arcade.ebe280e19974d5e6.js',
          revision: 'ebe280e19974d5e6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_arduino.91ce2a1cf86d16b3.js',
          revision: '91ce2a1cf86d16b3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_armasm.f715dce8fc628924.js',
          revision: 'f715dce8fc628924',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_asciidoc.7371caf2c7778279.js',
          revision: '7371caf2c7778279',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_aspectj.5fff4c1846c968e9.js',
          revision: '5fff4c1846c968e9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_autohotkey.94ae8c6326b673d9.js',
          revision: '94ae8c6326b673d9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_autoit.4f074b9be141e944.js',
          revision: '4f074b9be141e944',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_avrasm.b5f1dad171fdf643.js',
          revision: 'b5f1dad171fdf643',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_awk.83c1f886a2b47c10.js',
          revision: '83c1f886a2b47c10',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_axapta.44219f118672da56.js',
          revision: '44219f118672da56',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_bash.87bf03ab143ad29c.js',
          revision: '87bf03ab143ad29c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_basic.e22d5b2d164531b1.js',
          revision: 'e22d5b2d164531b1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_bnf.f6d37dc2fcc0de8e.js',
          revision: 'f6d37dc2fcc0de8e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_brainfuck.cc788d3858b115b0.js',
          revision: 'cc788d3858b115b0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_c.90851e2880721180.js',
          revision: '90851e2880721180',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cLike.266d9523d907447e.js',
          revision: '266d9523d907447e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cal.b63177e4f9e37726.js',
          revision: 'b63177e4f9e37726',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_capnproto.60a56f65076faad3.js',
          revision: '60a56f65076faad3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ceylon.6d84cb16f8ba5a5d.js',
          revision: '6d84cb16f8ba5a5d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_clean.b506593587d52eb9.js',
          revision: 'b506593587d52eb9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_clojure.5628f9e980613023.js',
          revision: '5628f9e980613023',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_clojureRepl.adf8d89eb1f78f5f.js',
          revision: 'adf8d89eb1f78f5f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cmake.f2a683d1ff35b9e9.js',
          revision: 'f2a683d1ff35b9e9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_coffeescript.ad1978a13fc40391.js',
          revision: 'ad1978a13fc40391',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_coq.e21106ffb1a3398e.js',
          revision: 'e21106ffb1a3398e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cos.0397e3678a59ec28.js',
          revision: '0397e3678a59ec28',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cpp.116215e5e8444878.js',
          revision: '116215e5e8444878',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_crmsh.db73b7ad8dfe3434.js',
          revision: 'db73b7ad8dfe3434',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_crystal.170ea62b827ef0a8.js',
          revision: '170ea62b827ef0a8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_csharp.2de6bd470fcc8afd.js',
          revision: '2de6bd470fcc8afd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_csp.dfe05cdca20d6ddc.js',
          revision: 'dfe05cdca20d6ddc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_css.286b87d0fc186243.js',
          revision: '286b87d0fc186243',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_d.1e52833037978065.js',
          revision: '1e52833037978065',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dart.9c2f594b1e3eda5b.js',
          revision: '9c2f594b1e3eda5b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_delphi.d9297327304eff2f.js',
          revision: 'd9297327304eff2f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_diff.400980fbf5ec5fae.js',
          revision: '400980fbf5ec5fae',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_django.8ae5309efa4c3b51.js',
          revision: '8ae5309efa4c3b51',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dns.04525e2b52480ed0.js',
          revision: '04525e2b52480ed0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dockerfile.05c0ce9084ea0ebe.js',
          revision: '05c0ce9084ea0ebe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dos.59d95352c49ae4e0.js',
          revision: '59d95352c49ae4e0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dsconfig.268b45cd5a1ce906.js',
          revision: '268b45cd5a1ce906',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dts.6a7d51254eb304f7.js',
          revision: '6a7d51254eb304f7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dust.c4e531c529a35031.js',
          revision: 'c4e531c529a35031',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ebnf.0e216e2990a16457.js',
          revision: '0e216e2990a16457',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_elixir.4815d30634b286a1.js',
          revision: '4815d30634b286a1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_elm.c6155e5a44d27d18.js',
          revision: 'c6155e5a44d27d18',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_erb.cbb84b9d6d59a88b.js',
          revision: 'cbb84b9d6d59a88b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_erlang.f42bf35dc29a90f1.js',
          revision: 'f42bf35dc29a90f1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_erlangRepl.295fca5dba44790c.js',
          revision: '295fca5dba44790c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_excel.598d8465232d9fbd.js',
          revision: '598d8465232d9fbd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_fix.10e1ea3978f85f89.js',
          revision: '10e1ea3978f85f89',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_flix.4bca5d84813b0385.js',
          revision: '4bca5d84813b0385',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_fortran.3983605754f96343.js',
          revision: '3983605754f96343',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_fsharp.8a3b2e2624af32e3.js',
          revision: '8a3b2e2624af32e3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gams.556399ba19f75535.js',
          revision: '556399ba19f75535',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gauss.7c9503ac7a85b25c.js',
          revision: '7c9503ac7a85b25c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gcode.df9bba7e75f1db18.js',
          revision: 'df9bba7e75f1db18',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gherkin.3b3e8f467e4f9da1.js',
          revision: '3b3e8f467e4f9da1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_glsl.de0472922f05df36.js',
          revision: 'de0472922f05df36',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gml.9040e44b67245a02.js',
          revision: '9040e44b67245a02',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_go.fe6f108df397f867.js',
          revision: 'fe6f108df397f867',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_golo.c943c73c2b29e1a5.js',
          revision: 'c943c73c2b29e1a5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gradle.7fa2e702c9dea31f.js',
          revision: '7fa2e702c9dea31f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_groovy.e5f79c1196d59745.js',
          revision: 'e5f79c1196d59745',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_haml.7a7c98be2a0e9c04.js',
          revision: '7a7c98be2a0e9c04',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_handlebars.23a7a2416ae68e7f.js',
          revision: '23a7a2416ae68e7f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_haskell.5137f957e761685b.js',
          revision: '5137f957e761685b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_haxe.ef31de769d424609.js',
          revision: 'ef31de769d424609',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_hsp.3b4ebaab7b02ab48.js',
          revision: '3b4ebaab7b02ab48',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_htmlbars.5e47f82b591c6bd5.js',
          revision: '5e47f82b591c6bd5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_http.76a9ed8f373e1d80.js',
          revision: '76a9ed8f373e1d80',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_hy.9edde33d0390a311.js',
          revision: '9edde33d0390a311',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_inform7.0b4983b5e382503d.js',
          revision: '0b4983b5e382503d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ini.b0fbe60f763352e1.js',
          revision: 'b0fbe60f763352e1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_irpf90.acbab74228e378cf.js',
          revision: 'acbab74228e378cf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_isbl.90bfad0126f2a557.js',
          revision: '90bfad0126f2a557',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_java.72c4d335cd5e54c8.js',
          revision: '72c4d335cd5e54c8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_javascript.0e1e0bb6f4c66e8d.js',
          revision: '0e1e0bb6f4c66e8d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_jbossCli.fceaf168132c91ce.js',
          revision: 'fceaf168132c91ce',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_json.fab50e5520a1dc9d.js',
          revision: 'fab50e5520a1dc9d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_julia.7a52c2bd29c668cb.js',
          revision: '7a52c2bd29c668cb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_juliaRepl.46d372fe4473f375.js',
          revision: '46d372fe4473f375',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_kotlin.5ad0bbb5ff9ab66e.js',
          revision: '5ad0bbb5ff9ab66e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lasso.ccc5f874a75d8031.js',
          revision: 'ccc5f874a75d8031',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_latex.c849a66c90cc759c.js',
          revision: 'c849a66c90cc759c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ldif.139310560f1b7002.js',
          revision: '139310560f1b7002',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_leaf.667c8fa1591860b8.js',
          revision: '667c8fa1591860b8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_less.7603a44d17846c5e.js',
          revision: '7603a44d17846c5e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lisp.d4d582e5a113db3a.js',
          revision: 'd4d582e5a113db3a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_livecodeserver.63fe978821021f86.js',
          revision: '63fe978821021f86',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_livescript.d801af22557da195.js',
          revision: 'd801af22557da195',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_llvm.c759f130eb79d3b3.js',
          revision: 'c759f130eb79d3b3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lsl.fcb2f41fac63a53b.js',
          revision: 'fcb2f41fac63a53b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lua.aa1c503d5f612a0a.js',
          revision: 'aa1c503d5f612a0a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_makefile.0fa61aab85b85df8.js',
          revision: '0fa61aab85b85df8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_markdown.6025308d021c68b9.js',
          revision: '6025308d021c68b9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mathematica.8f4f9e6042866350.js',
          revision: '8f4f9e6042866350',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_matlab.9f580b4ae645293a.js',
          revision: '9f580b4ae645293a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_maxima.18aff18d5e283b89.js',
          revision: '18aff18d5e283b89',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mel.8b6251b6eea9316c.js',
          revision: '8b6251b6eea9316c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mercury.a7dadb0242e8bf04.js',
          revision: 'a7dadb0242e8bf04',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mipsasm.299669e6230b278e.js',
          revision: '299669e6230b278e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mizar.45b1f0a428f5aaaf.js',
          revision: '45b1f0a428f5aaaf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mojolicious.ef852fedaae46bb2.js',
          revision: 'ef852fedaae46bb2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_monkey.5ddeadae9ba420c6.js',
          revision: '5ddeadae9ba420c6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_moonscript.b8c6f7806439522f.js',
          revision: 'b8c6f7806439522f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_n1ql.b495a91aaef15bc4.js',
          revision: 'b495a91aaef15bc4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nginx.61c93b17490f2489.js',
          revision: '61c93b17490f2489',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nim.4bb1a11606358d2d.js',
          revision: '4bb1a11606358d2d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nix.e3a386a778f50f7c.js',
          revision: 'e3a386a778f50f7c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nodeRepl.138b433d19961746.js',
          revision: '138b433d19961746',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nsis.14615bf8b571be59.js',
          revision: '14615bf8b571be59',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_objectivec.588b8d9c3f619668.js',
          revision: '588b8d9c3f619668',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ocaml.761732c3bbbe72a9.js',
          revision: '761732c3bbbe72a9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_oneC.3159158a0a852e08.js',
          revision: '3159158a0a852e08',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_openscad.7d9c83721cc7bd62.js',
          revision: '7d9c83721cc7bd62',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_oxygene.1c36a1172f536f7f.js',
          revision: '1c36a1172f536f7f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_parser3.8aabdc1c62740b34.js',
          revision: '8aabdc1c62740b34',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_perl.d60f4ac50b5fcaa5.js',
          revision: 'd60f4ac50b5fcaa5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pf.5196dfb97dc22142.js',
          revision: '5196dfb97dc22142',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pgsql.954d578b385b609d.js',
          revision: '954d578b385b609d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_php.549b3d4df13a0f71.js',
          revision: '549b3d4df13a0f71',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_phpTemplate.cbeb7dd2849e39e0.js',
          revision: 'cbeb7dd2849e39e0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_plaintext.777e0b9ad5a7c8be.js',
          revision: '777e0b9ad5a7c8be',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pony.b8d3de34029932da.js',
          revision: 'b8d3de34029932da',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_powershell.c0daafa6e66e9931.js',
          revision: 'c0daafa6e66e9931',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_processing.214b3d8d225a32fc.js',
          revision: '214b3d8d225a32fc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_profile.4cd8e1a654cfc198.js',
          revision: '4cd8e1a654cfc198',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_prolog.f8aa2ac2d6f9d74c.js',
          revision: 'f8aa2ac2d6f9d74c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_properties.3dee63e13a84f237.js',
          revision: '3dee63e13a84f237',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_protobuf.1668ab8b4b2face8.js',
          revision: '1668ab8b4b2face8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_puppet.3a03011ae3977dfd.js',
          revision: '3a03011ae3977dfd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_purebasic.f99f995c42bd31bf.js',
          revision: 'f99f995c42bd31bf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_python.e220cd50a0eff389.js',
          revision: 'e220cd50a0eff389',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pythonRepl.f953f0f7ce150861.js',
          revision: 'f953f0f7ce150861',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_q.dbe1a3d5768d9922.js',
          revision: 'dbe1a3d5768d9922',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_qml.a2288fc36cc36068.js',
          revision: 'a2288fc36cc36068',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_r.4d9d9bc5e6d31642.js',
          revision: '4d9d9bc5e6d31642',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_reasonml.fd4387cfc9480da5.js',
          revision: 'fd4387cfc9480da5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_rib.f42756227be7a2fe.js',
          revision: 'f42756227be7a2fe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_roboconf.a3e1a2d0967ca7ce.js',
          revision: 'a3e1a2d0967ca7ce',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_routeros.6103553651e036cd.js',
          revision: '6103553651e036cd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_rsl.e0d111eb1ed881c5.js',
          revision: 'e0d111eb1ed881c5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ruby.4b56a978a05ae448.js',
          revision: '4b56a978a05ae448',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ruleslanguage.7652cfac13eb7df9.js',
          revision: '7652cfac13eb7df9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_rust.bb4b93ea4968ca12.js',
          revision: 'bb4b93ea4968ca12',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sas.aa6c95d6e79fffa1.js',
          revision: 'aa6c95d6e79fffa1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scala.561b3a64151c219b.js',
          revision: '561b3a64151c219b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scheme.e02a8a87108b9f65.js',
          revision: 'e02a8a87108b9f65',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scilab.e1fbb9223abce8a8.js',
          revision: 'e1fbb9223abce8a8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scss.f9064ac1ef2b9612.js',
          revision: 'f9064ac1ef2b9612',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_shell.13ba49bee4735309.js',
          revision: '13ba49bee4735309',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_smali.6991ce43b8bc22d7.js',
          revision: '6991ce43b8bc22d7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_smalltalk.9dabf504dc03c0b2.js',
          revision: '9dabf504dc03c0b2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sml.71b4f5f5d5d8ec43.js',
          revision: '71b4f5f5d5d8ec43',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sqf.20ebdf45f9f92aae.js',
          revision: '20ebdf45f9f92aae',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sql.4ef37bbb605f7159.js',
          revision: '4ef37bbb605f7159',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sqlMore.99fe72b5620a16e7.js',
          revision: '99fe72b5620a16e7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_stan.d79b63d50be5c545.js',
          revision: 'd79b63d50be5c545',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_stata.715309466550b3a0.js',
          revision: '715309466550b3a0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_step21.b866201169b2bde7.js',
          revision: 'b866201169b2bde7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_stylus.293945c81258e7a7.js',
          revision: '293945c81258e7a7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_subunit.ea8ebf82cb092f5c.js',
          revision: 'ea8ebf82cb092f5c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_swift.49e09c6b62fa08d7.js',
          revision: '49e09c6b62fa08d7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_taggerscript.96aceaa08ade9c46.js',
          revision: '96aceaa08ade9c46',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_tap.31b5c67ab1491482.js',
          revision: '31b5c67ab1491482',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_tcl.e370b785908564f5.js',
          revision: 'e370b785908564f5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_thrift.1f3d5438c416cd57.js',
          revision: '1f3d5438c416cd57',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_tp.9a5c957c727a6328.js',
          revision: '9a5c957c727a6328',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_twig.2e0be72eeb93b603.js',
          revision: '2e0be72eeb93b603',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_typescript.dfd829783d7e8b49.js',
          revision: 'dfd829783d7e8b49',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vala.c7f92d4b8eec9bc0.js',
          revision: 'c7f92d4b8eec9bc0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbnet.33c79f2ae6e16911.js',
          revision: '33c79f2ae6e16911',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbscript.7460753f1c83b872.js',
          revision: '7460753f1c83b872',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbscriptHtml.1fc4d6108dcff000.js',
          revision: '1fc4d6108dcff000',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_verilog.abe492f80398fb16.js',
          revision: 'abe492f80398fb16',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vhdl.3c11eb0b66cbb679.js',
          revision: '3c11eb0b66cbb679',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vim.417d65de2144c466.js',
          revision: '417d65de2144c466',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_x86asm.2272c1907a85e1a2.js',
          revision: '2272c1907a85e1a2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_xl.a28d84a39f1434c6.js',
          revision: 'a28d84a39f1434c6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_xml.0902af8c8efc959a.js',
          revision: '0902af8c8efc959a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_xquery.87247580aac4eefe.js',
          revision: '87247580aac4eefe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_yaml.e9a3d23718b40aff.js',
          revision: 'e9a3d23718b40aff',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_zephir.6b2e839472ede775.js',
          revision: '6b2e839472ede775',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_abap.cd5b62a438f7c2ef.js',
          revision: 'cd5b62a438f7c2ef',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_abnf.06a8980ca06a1cf4.js',
          revision: '06a8980ca06a1cf4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_actionscript.62ead6cbd34eedd4.js',
          revision: '62ead6cbd34eedd4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ada.64c1b0989bb1adc8.js',
          revision: '64c1b0989bb1adc8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_agda.857b54621de8bf8d.js',
          revision: '857b54621de8bf8d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_al.2499aebe7bbb4b86.js',
          revision: '2499aebe7bbb4b86',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_antlr4.2f984ffa5d3716ca.js',
          revision: '2f984ffa5d3716ca',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_apacheconf.fe74d17078dcc0c3.js',
          revision: 'fe74d17078dcc0c3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_apex.6a7951d2689cfe33.js',
          revision: '6a7951d2689cfe33',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_apl.0afbf641f134269e.js',
          revision: '0afbf641f134269e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_applescript.fa6567572b1b58b1.js',
          revision: 'fa6567572b1b58b1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_aql.945d27ea0ba15841.js',
          revision: '945d27ea0ba15841',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_arduino.26483b2503f2e0ba.js',
          revision: '26483b2503f2e0ba',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_arff.dce9192f84065716.js',
          revision: 'dce9192f84065716',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_asciidoc.048a42ef41108a77.js',
          revision: '048a42ef41108a77',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_asm6502.49689f69774c0ef2.js',
          revision: '49689f69774c0ef2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_asmatmel.7f13aeabc1017c28.js',
          revision: '7f13aeabc1017c28',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_aspnet.8840993ec769ac2b.js',
          revision: '8840993ec769ac2b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_autohotkey.abf424558b4dbdc9.js',
          revision: 'abf424558b4dbdc9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_autoit.f483b38776a20045.js',
          revision: 'f483b38776a20045',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_avisynth.1b1476d8d8883248.js',
          revision: '1b1476d8d8883248',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_avroIdl.32edb533bc76c889.js',
          revision: '32edb533bc76c889',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bash.3c9b361f1ccde354.js',
          revision: '3c9b361f1ccde354',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_basic.aa2a2e4e6d091f2e.js',
          revision: 'aa2a2e4e6d091f2e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_batch.cb19722322adafd9.js',
          revision: 'cb19722322adafd9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bbcode.7e7e9a226bf5af0d.js',
          revision: '7e7e9a226bf5af0d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bicep.9798ef6bac259aba.js',
          revision: '9798ef6bac259aba',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_birb.50ced26988c138b0.js',
          revision: '50ced26988c138b0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bison.76cfa28084ded819.js',
          revision: '76cfa28084ded819',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bnf.e4dbb7ae189d5e46.js',
          revision: 'e4dbb7ae189d5e46',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_brainfuck.e9418a6d561e10a0.js',
          revision: 'e9418a6d561e10a0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_brightscript.98f2a212fe0558b0.js',
          revision: '98f2a212fe0558b0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bro.7ec3bd01f14c68c7.js',
          revision: '7ec3bd01f14c68c7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bsl.cc9b2bbb56343df8.js',
          revision: 'cc9b2bbb56343df8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_c.570dd518f294d507.js',
          revision: '570dd518f294d507',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cfscript.87ca1133299fb1fa.js',
          revision: '87ca1133299fb1fa',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_chaiscript.3a57b8b3ed561b8e.js',
          revision: '3a57b8b3ed561b8e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cil.0487b0c67d65917d.js',
          revision: '0487b0c67d65917d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_clojure.cda30d1b8f47b854.js',
          revision: 'cda30d1b8f47b854',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cmake.0a771a3556d92e45.js',
          revision: '0a771a3556d92e45',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cobol.b9685a911b4fa6cb.js',
          revision: 'b9685a911b4fa6cb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_coffeescript.e5ca3d70dfd9a786.js',
          revision: 'e5ca3d70dfd9a786',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_concurnas.2698c894b6d54aee.js',
          revision: '2698c894b6d54aee',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_coq.fec941012e06e3a4.js',
          revision: 'fec941012e06e3a4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cpp.2dcb28b8ebff5c07.js',
          revision: '2dcb28b8ebff5c07',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_crystal.05f0ad4f6659afc1.js',
          revision: '05f0ad4f6659afc1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_csharp.1ef1dbf8caaa9545.js',
          revision: '1ef1dbf8caaa9545',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cshtml.c9dd750b7ace1146.js',
          revision: 'c9dd750b7ace1146',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_csp.bc4d320d8140eacd.js',
          revision: 'bc4d320d8140eacd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cssExtras.e60b531ceb06b153.js',
          revision: 'e60b531ceb06b153',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_csv.5d6b695bd76696ba.js',
          revision: '5d6b695bd76696ba',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cypher.8b092c3b71f67ebb.js',
          revision: '8b092c3b71f67ebb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_d.4aa316643fee5dcf.js',
          revision: '4aa316643fee5dcf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dart.7bf9c855e6b77749.js',
          revision: '7bf9c855e6b77749',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dataweave.f9090fde3c9eba7a.js',
          revision: 'f9090fde3c9eba7a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dax.6fe2c49de213f2d0.js',
          revision: '6fe2c49de213f2d0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dhall.8f1091b89bfcf766.js',
          revision: '8f1091b89bfcf766',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_diff.e49aaa10ebe12059.js',
          revision: 'e49aaa10ebe12059',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_django.38ce194adb66d858.js',
          revision: '38ce194adb66d858',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dnsZoneFile.91a84cb206e78e35.js',
          revision: '91a84cb206e78e35',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_docker.7ab925b0eeb06f09.js',
          revision: '7ab925b0eeb06f09',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dot.1e13f062390f26da.js',
          revision: '1e13f062390f26da',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ebnf.0c269b3906e4e258.js',
          revision: '0c269b3906e4e258',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_editorconfig.c19a1a4cdc7350f0.js',
          revision: 'c19a1a4cdc7350f0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_eiffel.90158cc73ed8bae1.js',
          revision: '90158cc73ed8bae1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ejs.f9c0ca0e360cbd01.js',
          revision: 'f9c0ca0e360cbd01',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_elixir.aabb4980fbff2132.js',
          revision: 'aabb4980fbff2132',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_elm.be4cf5db8d74e249.js',
          revision: 'be4cf5db8d74e249',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_erb.e0470b1a895b7d8e.js',
          revision: 'e0470b1a895b7d8e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_erlang.6fe3fec6649cd62d.js',
          revision: '6fe3fec6649cd62d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_etlua.fd00532c30f619be.js',
          revision: 'fd00532c30f619be',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_excelFormula.fefb6f7afaaa3559.js',
          revision: 'fefb6f7afaaa3559',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_factor.8360834e7d33b824.js',
          revision: '8360834e7d33b824',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_falselang.0a4065caaf353526.js',
          revision: '0a4065caaf353526',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_firestoreSecurityRules.27f51279a806c1b6.js',
          revision: '27f51279a806c1b6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_flow.e9f7a998b1ab23e6.js',
          revision: 'e9f7a998b1ab23e6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_fortran.4a1273350f448e4e.js',
          revision: '4a1273350f448e4e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_fsharp.6f2a84461aa62bc1.js',
          revision: '6f2a84461aa62bc1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ftl.35d3e1ce19818064.js',
          revision: '35d3e1ce19818064',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gap.622c24b1186e2675.js',
          revision: '622c24b1186e2675',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gcode.c9f5376e47a8be96.js',
          revision: 'c9f5376e47a8be96',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gdscript.4c97dea2a450ee8a.js',
          revision: '4c97dea2a450ee8a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gedcom.478f41b0160b7cdf.js',
          revision: '478f41b0160b7cdf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gherkin.312bdc2419bb88d5.js',
          revision: '312bdc2419bb88d5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_git.83058ba9c090b809.js',
          revision: '83058ba9c090b809',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_glsl.408bf7f815f4c0c2.js',
          revision: '408bf7f815f4c0c2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gml.860b518a57a0277e.js',
          revision: '860b518a57a0277e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gn.8012534bb7d39743.js',
          revision: '8012534bb7d39743',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_go.b89e741c61b41f36.js',
          revision: 'b89e741c61b41f36',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_goModule.53b5899646b549ef.js',
          revision: '53b5899646b549ef',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_graphql.8963349466d328c7.js',
          revision: '8963349466d328c7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_groovy.5b93d49322459cd8.js',
          revision: '5b93d49322459cd8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_haml.8aa45bb9194c90f4.js',
          revision: '8aa45bb9194c90f4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_handlebars.0cb08a86f0b1ccf2.js',
          revision: '0cb08a86f0b1ccf2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_haskell.e8aa73b36353a7c9.js',
          revision: 'e8aa73b36353a7c9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_haxe.98966ebb3c097c6f.js',
          revision: '98966ebb3c097c6f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hcl.f86a2ee2bfe447a1.js',
          revision: 'f86a2ee2bfe447a1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hlsl.2d6a03ec7a24af68.js',
          revision: '2d6a03ec7a24af68',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hoon.e0fd2c213db7877d.js',
          revision: 'e0fd2c213db7877d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hpkp.2f020c82334823dc.js',
          revision: '2f020c82334823dc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hsts.8e74ff3615ae31a0.js',
          revision: '8e74ff3615ae31a0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_http.5647f310c2c9f96a.js',
          revision: '5647f310c2c9f96a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ichigojam.b801b78fda159432.js',
          revision: 'b801b78fda159432',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_icon.57925cd371cd79c7.js',
          revision: '57925cd371cd79c7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_icuMessageFormat.d649c02b7ed69d38.js',
          revision: 'd649c02b7ed69d38',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_idris.dd8c0e86aa990e41.js',
          revision: 'dd8c0e86aa990e41',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_iecst.c83287f40167d19d.js',
          revision: 'c83287f40167d19d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ignore.f7b6204a76ebddfe.js',
          revision: 'f7b6204a76ebddfe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_inform7.cf80f35279c0f358.js',
          revision: 'cf80f35279c0f358',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ini.e878e138662f7737.js',
          revision: 'e878e138662f7737',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_io.ea271f613627d3f9.js',
          revision: 'ea271f613627d3f9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_j.d91cba3bb5f27a86.js',
          revision: 'd91cba3bb5f27a86',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_java.2ca51ce61c5a59d8.js',
          revision: '2ca51ce61c5a59d8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_javadoc.71b87323f5f3cf43.js',
          revision: '71b87323f5f3cf43',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_javadoclike.ba4e12c81615b334.js',
          revision: 'ba4e12c81615b334',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_javastacktrace.c48d7e68ded1c10b.js',
          revision: 'c48d7e68ded1c10b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jexl.e7c27093a6049bc5.js',
          revision: 'e7c27093a6049bc5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jolie.796793d965138231.js',
          revision: '796793d965138231',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jq.f27211448fbf1b3c.js',
          revision: 'f27211448fbf1b3c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsExtras.6f9e46a25b65c284.js',
          revision: '6f9e46a25b65c284',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsTemplates.f3811a4bd5e008cf.js',
          revision: 'f3811a4bd5e008cf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsdoc.99601782d30b056e.js',
          revision: '99601782d30b056e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_json.15167379b1ba677e.js',
          revision: '15167379b1ba677e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_json5.4e1de20e3ba465ba.js',
          revision: '4e1de20e3ba465ba',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsonp.d7fcaa9d30ea1e88.js',
          revision: 'd7fcaa9d30ea1e88',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsstacktrace.35be61e3345da0b9.js',
          revision: '35be61e3345da0b9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsx.5fff357266ff5fad.js',
          revision: '5fff357266ff5fad',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_julia.c13534dabbb744dd.js',
          revision: 'c13534dabbb744dd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_keepalived.1333ccb673735eb0.js',
          revision: '1333ccb673735eb0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_keyman.8da9ab31f0a0d466.js',
          revision: '8da9ab31f0a0d466',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_kotlin.c5b91436cc40a5c0.js',
          revision: 'c5b91436cc40a5c0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_kumir.fe6a2e1ddb395eda.js',
          revision: 'fe6a2e1ddb395eda',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_kusto.a07be311ee9462da.js',
          revision: 'a07be311ee9462da',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_latex.7ae7f0552b16172d.js',
          revision: '7ae7f0552b16172d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_latte.36b7c23d05791fe4.js',
          revision: '36b7c23d05791fe4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_less.08917582a08e34f0.js',
          revision: '08917582a08e34f0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lilypond.001ca63ca5b993ae.js',
          revision: '001ca63ca5b993ae',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_liquid.837185f9e5f1dd06.js',
          revision: '837185f9e5f1dd06',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lisp.13fb67dac2632b80.js',
          revision: '13fb67dac2632b80',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_livescript.9b7cd492a636eb96.js',
          revision: '9b7cd492a636eb96',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_llvm.90def8245d67a1d7.js',
          revision: '90def8245d67a1d7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_log.206e3706a19df69e.js',
          revision: '206e3706a19df69e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lolcode.06f11839e3ea9829.js',
          revision: '06f11839e3ea9829',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lua.89f00a73a6058fc2.js',
          revision: '89f00a73a6058fc2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_magma.b23d622dc01573f3.js',
          revision: 'b23d622dc01573f3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_makefile.fae9ba77856505a1.js',
          revision: 'fae9ba77856505a1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_markdown.40618917bf39f25f.js',
          revision: '40618917bf39f25f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_markupTemplating.93b3e7a25bac2cde.js',
          revision: '93b3e7a25bac2cde',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_matlab.3070839685a5ee35.js',
          revision: '3070839685a5ee35',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_maxscript.b63922fa361d6ba9.js',
          revision: 'b63922fa361d6ba9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mel.9a993062496b3e88.js',
          revision: '9a993062496b3e88',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mermaid.d31b4448d155b9e0.js',
          revision: 'd31b4448d155b9e0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mizar.dfaa5d3dfb5ea221.js',
          revision: 'dfaa5d3dfb5ea221',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mongodb.656d04f030e29d62.js',
          revision: '656d04f030e29d62',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_monkey.860a2aa877aab543.js',
          revision: '860a2aa877aab543',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_moonscript.1f68b2afd88a3034.js',
          revision: '1f68b2afd88a3034',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_n1ql.25f1eba7d6345142.js',
          revision: '25f1eba7d6345142',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_n4js.7e4622e65c1459e0.js',
          revision: '7e4622e65c1459e0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nand2tetrisHdl.909e7e0f08ab3b5c.js',
          revision: '909e7e0f08ab3b5c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_naniscript.a208a56763d96538.js',
          revision: 'a208a56763d96538',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nasm.135263cba7f4677e.js',
          revision: '135263cba7f4677e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_neon.a3345107a50372e9.js',
          revision: 'a3345107a50372e9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nevod.4065a9dd1d2075ff.js',
          revision: '4065a9dd1d2075ff',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nginx.350d1293b761316c.js',
          revision: '350d1293b761316c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nim.015aad27c2d321f8.js',
          revision: '015aad27c2d321f8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nix.028e65487d758cf5.js',
          revision: '028e65487d758cf5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nsis.5471b4b4f6c5b8d1.js',
          revision: '5471b4b4f6c5b8d1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_objectivec.93ebd8fa0f97508c.js',
          revision: '93ebd8fa0f97508c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ocaml.811eaffc1ad7741e.js',
          revision: '811eaffc1ad7741e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_opencl.2a24b4af97d42baf.js',
          revision: '2a24b4af97d42baf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_openqasm.d2fbb7dc770b8519.js',
          revision: 'd2fbb7dc770b8519',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_oz.8982475172095e4e.js',
          revision: '8982475172095e4e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_parigp.8968186f5586393a.js',
          revision: '8968186f5586393a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_parser.bf311bf0aae33f18.js',
          revision: 'bf311bf0aae33f18',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pascal.b732103ebfccfed8.js',
          revision: 'b732103ebfccfed8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pascaligo.725c9ff8360d6b13.js',
          revision: '725c9ff8360d6b13',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pcaxis.b4cb0f486390d223.js',
          revision: 'b4cb0f486390d223',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_peoplecode.e04e129ab192b5cb.js',
          revision: 'e04e129ab192b5cb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_perl.a5b4658095e863a6.js',
          revision: 'a5b4658095e863a6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_php.570aa8bc6c2d339a.js',
          revision: '570aa8bc6c2d339a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_phpExtras.95d20baf3d61ebd0.js',
          revision: '95d20baf3d61ebd0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_phpdoc.3f4eb49f73b37a8d.js',
          revision: '3f4eb49f73b37a8d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_plsql.9c5e3e5c7d4d5366.js',
          revision: '9c5e3e5c7d4d5366',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_powerquery.f384bbcd5e4493b5.js',
          revision: 'f384bbcd5e4493b5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_powershell.52cc40315972b742.js',
          revision: '52cc40315972b742',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_processing.2494b53899d254e3.js',
          revision: '2494b53899d254e3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_prolog.5c25ad7075ed86e6.js',
          revision: '5c25ad7075ed86e6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_promql.8c764bb18acd662f.js',
          revision: '8c764bb18acd662f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_properties.ed6b16b5efc67aff.js',
          revision: 'ed6b16b5efc67aff',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_protobuf.037151de9977e72d.js',
          revision: '037151de9977e72d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_psl.6ebb2a310f308fc9.js',
          revision: '6ebb2a310f308fc9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pug.5042f10207d3b587.js',
          revision: '5042f10207d3b587',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_puppet.a4c12fd9d5b32c4e.js',
          revision: 'a4c12fd9d5b32c4e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pure.a3d12365c12cce51.js',
          revision: 'a3d12365c12cce51',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_purebasic.dad6b4b67cb90faf.js',
          revision: 'dad6b4b67cb90faf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_purescript.50ce9b88b7f2176b.js',
          revision: '50ce9b88b7f2176b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_python.e20f10390902cc8d.js',
          revision: 'e20f10390902cc8d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_q.25ad28e993856270.js',
          revision: '25ad28e993856270',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_qml.1b6378a598fe34bc.js',
          revision: '1b6378a598fe34bc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_qore.4f849887d4d64afb.js',
          revision: '4f849887d4d64afb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_qsharp.29416982085772e2.js',
          revision: '29416982085772e2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_r.6d881433d1f71b21.js',
          revision: '6d881433d1f71b21',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_racket.fde3b87a4a98be01.js',
          revision: 'fde3b87a4a98be01',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_reason.c19756ba12189730.js',
          revision: 'c19756ba12189730',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_regex.6ece30266fe4637e.js',
          revision: '6ece30266fe4637e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rego.cf90d99e7893f4cc.js',
          revision: 'cf90d99e7893f4cc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_renpy.1a28b5b2b19db60d.js',
          revision: '1a28b5b2b19db60d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rest.096148e9cbc99068.js',
          revision: '096148e9cbc99068',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rip.ce3b4969d9e2f2b9.js',
          revision: 'ce3b4969d9e2f2b9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_roboconf.4d5b11770483583f.js',
          revision: '4d5b11770483583f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_robotframework.0501f76ea398ec52.js',
          revision: '0501f76ea398ec52',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ruby.6878cac10d964675.js',
          revision: '6878cac10d964675',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rust.3116a9129a7e04e4.js',
          revision: '3116a9129a7e04e4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sas.27aa1e1cf2cab098.js',
          revision: '27aa1e1cf2cab098',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sass.40d27a6a09bc076e.js',
          revision: '40d27a6a09bc076e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_scala.081834da48678842.js',
          revision: '081834da48678842',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_scheme.fa4448f319242734.js',
          revision: 'fa4448f319242734',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_scss.f88363def19c7b15.js',
          revision: 'f88363def19c7b15',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_shellSession.84e31aa2dc9857cb.js',
          revision: '84e31aa2dc9857cb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_smali.21c2e71a4be46dc0.js',
          revision: '21c2e71a4be46dc0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_smalltalk.41ed55512850ca07.js',
          revision: '41ed55512850ca07',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_smarty.9b0fb557c2e98cbb.js',
          revision: '9b0fb557c2e98cbb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sml.a84dd4a624a79257.js',
          revision: 'a84dd4a624a79257',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_solidity.06923d53a7286624.js',
          revision: '06923d53a7286624',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_solutionFile.d97b9d1a2a0800f0.js',
          revision: 'd97b9d1a2a0800f0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_soy.bf3c1551ba15a9f4.js',
          revision: 'bf3c1551ba15a9f4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sparql.b1dd6302bf7779d3.js',
          revision: 'b1dd6302bf7779d3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_splunkSpl.40dfd0b7f912ca09.js',
          revision: '40dfd0b7f912ca09',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sqf.d089c71e98def464.js',
          revision: 'd089c71e98def464',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sql.45b735cf8c63973a.js',
          revision: '45b735cf8c63973a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_squirrel.c5b664ed02ef08e5.js',
          revision: 'c5b664ed02ef08e5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_stan.8ab3fbe23fca2dc6.js',
          revision: '8ab3fbe23fca2dc6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_stylus.83b69191ac53f4ec.js',
          revision: '83b69191ac53f4ec',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_swift.713f7e17aed2f142.js',
          revision: '713f7e17aed2f142',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_systemd.1a6960f547728dbb.js',
          revision: '1a6960f547728dbb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_t4Cs.21cf13b969cf3f8f.js',
          revision: '21cf13b969cf3f8f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_t4Templating.842cc502ec12cf94.js',
          revision: '842cc502ec12cf94',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_t4Vb.a7cb4c3d16f42a62.js',
          revision: 'a7cb4c3d16f42a62',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tap.bb5a273dc7444663.js',
          revision: 'bb5a273dc7444663',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tcl.fb7143da12761690.js',
          revision: 'fb7143da12761690',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_textile.cd0f33c48cedef17.js',
          revision: 'cd0f33c48cedef17',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_toml.f821979b3e70b837.js',
          revision: 'f821979b3e70b837',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tremor.81cf69d86d5e9a87.js',
          revision: '81cf69d86d5e9a87',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tsx.f86404f52f57a626.js',
          revision: 'f86404f52f57a626',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tt2.2c46fe044de32c1e.js',
          revision: '2c46fe044de32c1e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_turtle.87dcaf59ef11b97b.js',
          revision: '87dcaf59ef11b97b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_twig.c70690c61970a120.js',
          revision: 'c70690c61970a120',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_typescript.928e9d79209f5b73.js',
          revision: '928e9d79209f5b73',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_typoscript.1ac3b47df01973e6.js',
          revision: '1ac3b47df01973e6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_unrealscript.d7c91ca123af7998.js',
          revision: 'd7c91ca123af7998',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_uorazor.4685f3806896a5e7.js',
          revision: '4685f3806896a5e7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_uri.bfee6522c8c3d91e.js',
          revision: 'bfee6522c8c3d91e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_v.ebbac62528cc517d.js',
          revision: 'ebbac62528cc517d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vala.f5595561ad5d2917.js',
          revision: 'f5595561ad5d2917',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vbnet.7a3445e3f898743d.js',
          revision: '7a3445e3f898743d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_velocity.ee6ce74e45989730.js',
          revision: 'ee6ce74e45989730',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_verilog.cc6d9047918fcf41.js',
          revision: 'cc6d9047918fcf41',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vhdl.67208f4fd5ce22aa.js',
          revision: '67208f4fd5ce22aa',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vim.773e9475d5481543.js',
          revision: '773e9475d5481543',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_visualBasic.85e0727ffd688f3f.js',
          revision: '85e0727ffd688f3f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_warpscript.e9c0215d377adf1a.js',
          revision: 'e9c0215d377adf1a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wasm.61fd52335e6b5888.js',
          revision: '61fd52335e6b5888',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_webIdl.5eec1264052c00e2.js',
          revision: '5eec1264052c00e2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wiki.93d76db61e328e01.js',
          revision: '93d76db61e328e01',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wolfram.eefcc92f0bc69889.js',
          revision: 'eefcc92f0bc69889',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wren.1e5e1a4d4199d2be.js',
          revision: '1e5e1a4d4199d2be',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xeora.1479bbacc95daad6.js',
          revision: '1479bbacc95daad6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xmlDoc.49ac88caf5e411a3.js',
          revision: '49ac88caf5e411a3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xojo.61123afd85fdbbaf.js',
          revision: '61123afd85fdbbaf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xquery.fc15f03aac0e2979.js',
          revision: 'fc15f03aac0e2979',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_yaml.88d9d099763a3d5d.js',
          revision: '88d9d099763a3d5d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_yang.aa153c545fd76b24.js',
          revision: 'aa153c545fd76b24',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_zig.c83d4c3a9eebc395.js',
          revision: 'c83d4c3a9eebc395',
        },
        {
          url: '/_next/static/chunks/webpack-54e85bc1abd5a25a.js',
          revision: 'GSPRv8revHSIqWdTSC9Dk',
        },
        {
          url: '/_next/static/css/55969e88998912c8.css',
          revision: '55969e88998912c8',
        },
        {
          url: '/_next/static/css/628765f20b848f76.css',
          revision: '628765f20b848f76',
        },
        {
          url: '/_next/static/media/26a46d62cd723877-s.woff2',
          revision: 'befd9c0fdfa3d8a645d5f95717ed6420',
        },
        {
          url: '/_next/static/media/55c55f0601d81cf3-s.woff2',
          revision: '43828e14271c77b87e3ed582dbff9f74',
        },
        {
          url: '/_next/static/media/581909926a08bbc8-s.woff2',
          revision: 'f0b86e7c24f455280b8df606b89af891',
        },
        {
          url: '/_next/static/media/6d93bde91c0c2823-s.woff2',
          revision: '621a07228c8ccbfd647918f1021b4868',
        },
        {
          url: '/_next/static/media/97e0cb1ae144a2a9-s.woff2',
          revision: 'e360c61c5bd8d90639fd4503c829c2dc',
        },
        {
          url: '/_next/static/media/a34f9d1faa5f3315-s.p.woff2',
          revision: 'd4fe31e6a2aebc06b8d6e558c9141119',
        },
        {
          url: '/_next/static/media/dark-screenshot.d29d9197.png',
          revision: '516ee60fd30b2b82165e6f7eb98d7d7f',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/media/light-screenshot.39ab6bdb.png',
          revision: '700bb42cdd1e1eaa93e9a3ad18b0fad5',
        },
        {
          url: '/assets/android-chrome-192x192.png',
          revision: 'd4a0ea8783eb3f40312ceed37f4750e2',
        },
        {
          url: '/assets/android-chrome-512x512.png',
          revision: '8c4974b507a4c6b41fbad86fe45967cd',
        },
        {
          url: '/assets/apple-touch-icon.png',
          revision: '7afc910eb2a96f8f785f2094b8ebb7da',
        },
        {
          url: '/assets/browserconfig.xml',
          revision: 'a493ba0aa0b8ec8068d786d7248bb92c',
        },
        {
          url: '/assets/cover.png',
          revision: '4495d85b7e53b2ca1b6420a0b346c365',
        },
        {
          url: '/assets/favicon-16x16.png',
          revision: 'ef1b5674b4e65a39ca6c136db3bdd836',
        },
        {
          url: '/assets/favicon-32x32.png',
          revision: '03649fd1a3ac449cff64f471fd2d1fb9',
        },
        {
          url: '/assets/favicon.ico',
          revision: '9da7b96911a8a7bacad3429b833710f7',
        },
        {
          url: '/assets/manifest-icon-192.maskable.png',
          revision: 'de5a31d8d8eb88274af652946869d0be',
        },
        {
          url: '/assets/manifest-icon-512.maskable.png',
          revision: '5e680d10c55e458ebd10420300b1311e',
        },
        {
          url: '/assets/mstile-150x150.png',
          revision: 'e597cdf5b4a4a734d9b65045be161aeb',
        },
        {
          url: '/assets/safari-pinned-tab.svg',
          revision: '43ff1f1f5f303d9f80f76236d20ee121',
        },
        {
          url: '/objects/Dice/FullDice.fbx',
          revision: '7460240f9c0c8fdb85bec9e653dda58c',
        },
        { url: '/robots.txt', revision: '1b88316955f031a9b2bc9d9ab338d854' },
        {
          url: '/service-worker.js',
          revision: '1f7d0a2d1ae1ff684074554114aeae5a',
        },
        { url: '/sitemap.xml', revision: 'ebbca34a7cd10f5467aecf3331106bcf' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: a,
              event: t,
              state: s,
            }) =>
              a && 'opaqueredirect' === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: a.headers,
                  })
                : a,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const a = e.pathname;
        return !a.startsWith('/api/auth/') && !!a.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
