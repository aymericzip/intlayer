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
          revision: 'e3bef6ca4dc0f660d168b03606b55712',
        },
        {
          url: '/_next/static/1y-xjCMYDDwYuFPLjGu5j/_buildManifest.js',
          revision: 'f0d960e6bcf136b56b17a241133f6960',
        },
        {
          url: '/_next/static/1y-xjCMYDDwYuFPLjGu5j/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/27578-a74ed59ad3ee9b51.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/32706-c819268472a367f2.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/49897-d11a4db5005b58db.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/54156-02f621b0a68269e9.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/5584.094b42d6dde31836.js',
          revision: '094b42d6dde31836',
        },
        {
          url: '/_next/static/chunks/61433-79e6c61813f6b73f.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/65184-3b136c6b0f5d2591.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/70949-6fc6925464cc5b61.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/78456-3bce0d6184d3fb92.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/82379-5d1d947123f3eec0.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/8ece9acb-b3dc770ec1f1eed5.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/92615-aa5e92193d0822b9.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/98480-8cc4cf95b9947f18.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(editable)/demo/layout-3735854b5b04ca0d.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(editable)/demo/page-25eb733348710616.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/%5B...not-found%5D/layout-35dbf3eb4f20e18d.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/%5B...not-found%5D/page-78f26a401ecade2a.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/404/layout-432cb922268db8ea.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/404/page-6d2be338bdc9513f.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/(authenticated)/layout-fd61be124ba83ff5.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/(authenticated)/password/change/page-364a38c98ea57bc2.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/(not-authenticated)/layout-5c4db7a7b2574424.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/(not-authenticated)/login/page-08c69e8d9e367eb2.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/(not-authenticated)/register/page-4d9f4c39c636cc7e.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/password/reset/page-e4e3b1bc087d232f.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/doc/%5B%5B...doc%5D%5D/layout-1922dbed46a0968f.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/doc/%5B%5B...doc%5D%5D/page-9aab3aaa2743e8a1.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/layout-5bb84f6e96e8ee33.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/page-7d0ef50cbe83eead.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/privacy_notice/page-3152342bb219c063.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/terms_of_service/page-2152f7e7f4446564.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/layout-b8db151278a3c319.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ba65039e87d8d679.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/app/layout-40efb8059bb424d0.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/framework-dd35c5a5815a926e.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/main-app-c15cd386a1ef49c4.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/main-eb39094421afb948.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/pages/_app-231fcc092c035b18.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/pages/_error-17527fce3203a26d.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_abnf.2e2c26c7db6b1e26.js',
          revision: '2e2c26c7db6b1e26',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_accesslog.0a4bdcda8d41effd.js',
          revision: '0a4bdcda8d41effd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_actionscript.46d1dcf4d1111082.js',
          revision: '46d1dcf4d1111082',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ada.37ae9cfcbead52ed.js',
          revision: '37ae9cfcbead52ed',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_angelscript.6856a96dfa9d0e54.js',
          revision: '6856a96dfa9d0e54',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_apache.77593fb7e6068138.js',
          revision: '77593fb7e6068138',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_applescript.3a96c652cc3c66a7.js',
          revision: '3a96c652cc3c66a7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_arcade.d1cd4fd654b33e22.js',
          revision: 'd1cd4fd654b33e22',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_arduino.4d590c18c58bcd13.js',
          revision: '4d590c18c58bcd13',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_armasm.ac9cc1fc20a50c71.js',
          revision: 'ac9cc1fc20a50c71',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_asciidoc.4ebe9bce61131db6.js',
          revision: '4ebe9bce61131db6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_aspectj.dec79264747c88c6.js',
          revision: 'dec79264747c88c6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_autohotkey.d1e06bce2367d534.js',
          revision: 'd1e06bce2367d534',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_autoit.f1fb146610f0ee58.js',
          revision: 'f1fb146610f0ee58',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_avrasm.c9ef5306d5de770b.js',
          revision: 'c9ef5306d5de770b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_awk.15b44f70b3ba0792.js',
          revision: '15b44f70b3ba0792',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_axapta.84dcd7886df4c073.js',
          revision: '84dcd7886df4c073',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_bash.e16a303ef13307c7.js',
          revision: 'e16a303ef13307c7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_basic.7d38d67cc8df560e.js',
          revision: '7d38d67cc8df560e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_bnf.39e62d7ffd0a57f9.js',
          revision: '39e62d7ffd0a57f9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_brainfuck.5bd7bff5852886df.js',
          revision: '5bd7bff5852886df',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_c.297c825f03a307d4.js',
          revision: '297c825f03a307d4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cLike.c11d3ec8e0aee7e9.js',
          revision: 'c11d3ec8e0aee7e9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cal.31ecc8cecdb04e5a.js',
          revision: '31ecc8cecdb04e5a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_capnproto.33a917a1c92a584a.js',
          revision: '33a917a1c92a584a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ceylon.7ec04207aa5fd925.js',
          revision: '7ec04207aa5fd925',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_clean.8b4aae471d43aabc.js',
          revision: '8b4aae471d43aabc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_clojure.161187cc51d13601.js',
          revision: '161187cc51d13601',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_clojureRepl.0283bf989318e874.js',
          revision: '0283bf989318e874',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cmake.e2505630a87a215f.js',
          revision: 'e2505630a87a215f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_coffeescript.94308ac200ae45a7.js',
          revision: '94308ac200ae45a7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_coq.d8d5efee5bb973ff.js',
          revision: 'd8d5efee5bb973ff',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cos.393e2a4c65593f15.js',
          revision: '393e2a4c65593f15',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cpp.e28ff8697b73a777.js',
          revision: 'e28ff8697b73a777',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_crmsh.e2b417c799c54dde.js',
          revision: 'e2b417c799c54dde',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_crystal.d7c832f8e4a4c348.js',
          revision: 'd7c832f8e4a4c348',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_csharp.f2f2403eb07f3cbb.js',
          revision: 'f2f2403eb07f3cbb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_csp.967bdd48ba520b30.js',
          revision: '967bdd48ba520b30',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_css.057a31ca77b8db46.js',
          revision: '057a31ca77b8db46',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_d.1ad4e80510595568.js',
          revision: '1ad4e80510595568',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dart.de5be9b4e4e936c1.js',
          revision: 'de5be9b4e4e936c1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_delphi.c02f6e3e042260ff.js',
          revision: 'c02f6e3e042260ff',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_diff.742526bc12c1c1c7.js',
          revision: '742526bc12c1c1c7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_django.b8f5515e9b57dd2b.js',
          revision: 'b8f5515e9b57dd2b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dns.cda025243709d716.js',
          revision: 'cda025243709d716',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dockerfile.8c58ca5ded649c52.js',
          revision: '8c58ca5ded649c52',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dos.c2ef2089b7595d10.js',
          revision: 'c2ef2089b7595d10',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dsconfig.65257986656dce69.js',
          revision: '65257986656dce69',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dts.1ee7573c6698ae6a.js',
          revision: '1ee7573c6698ae6a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dust.f458293374875295.js',
          revision: 'f458293374875295',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ebnf.556927a8159fc753.js',
          revision: '556927a8159fc753',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_elixir.14dc673a2164b481.js',
          revision: '14dc673a2164b481',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_elm.cba14cf3eb05f85b.js',
          revision: 'cba14cf3eb05f85b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_erb.f3e334e9eeaa69a4.js',
          revision: 'f3e334e9eeaa69a4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_erlang.81a62a333f697bdb.js',
          revision: '81a62a333f697bdb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_erlangRepl.a9f2321850d6fa82.js',
          revision: 'a9f2321850d6fa82',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_excel.ec2b5d0824407fca.js',
          revision: 'ec2b5d0824407fca',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_fix.4a3aab2e1101b201.js',
          revision: '4a3aab2e1101b201',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_flix.18364fc8c81e45ea.js',
          revision: '18364fc8c81e45ea',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_fortran.4b269bcec7941ee2.js',
          revision: '4b269bcec7941ee2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_fsharp.6973ecaa53df0ceb.js',
          revision: '6973ecaa53df0ceb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gams.3ab93d69bd1a6aad.js',
          revision: '3ab93d69bd1a6aad',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gauss.263966f0caaf68ba.js',
          revision: '263966f0caaf68ba',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gcode.7b579f226722980e.js',
          revision: '7b579f226722980e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gherkin.5f0dcba2d8928974.js',
          revision: '5f0dcba2d8928974',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_glsl.58e0b079574e61f6.js',
          revision: '58e0b079574e61f6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gml.bc936e9f5b2219f0.js',
          revision: 'bc936e9f5b2219f0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_go.f863e6365b78fcd5.js',
          revision: 'f863e6365b78fcd5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_golo.5fc6b52ee347404b.js',
          revision: '5fc6b52ee347404b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gradle.ad967bc94da231da.js',
          revision: 'ad967bc94da231da',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_groovy.acd578179ff3d16d.js',
          revision: 'acd578179ff3d16d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_haml.6cd3477fd0d59e36.js',
          revision: '6cd3477fd0d59e36',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_handlebars.0a0c4fe138d1689d.js',
          revision: '0a0c4fe138d1689d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_haskell.8ae96e8f402a4b98.js',
          revision: '8ae96e8f402a4b98',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_haxe.3e3587cfa9591029.js',
          revision: '3e3587cfa9591029',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_hsp.cc418f69fdc3076e.js',
          revision: 'cc418f69fdc3076e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_htmlbars.121b2880857afdc6.js',
          revision: '121b2880857afdc6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_http.709aa73a84144166.js',
          revision: '709aa73a84144166',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_hy.a2324a5a1915c76e.js',
          revision: 'a2324a5a1915c76e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_inform7.2a37bf581ac6d94e.js',
          revision: '2a37bf581ac6d94e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ini.a9542aacb3b0dc5a.js',
          revision: 'a9542aacb3b0dc5a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_irpf90.1a26eae5cff508c2.js',
          revision: '1a26eae5cff508c2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_isbl.21eb950e5bb0bbab.js',
          revision: '21eb950e5bb0bbab',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_java.edad9aea35a996d2.js',
          revision: 'edad9aea35a996d2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_javascript.975d0b9371f6d464.js',
          revision: '975d0b9371f6d464',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_jbossCli.6b30b754ced1a895.js',
          revision: '6b30b754ced1a895',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_json.31e58b40118db3ac.js',
          revision: '31e58b40118db3ac',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_julia.08a991d0368e7c6f.js',
          revision: '08a991d0368e7c6f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_juliaRepl.78656e3fe850cfd2.js',
          revision: '78656e3fe850cfd2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_kotlin.455be9697e19925c.js',
          revision: '455be9697e19925c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lasso.5e228756e35d7b83.js',
          revision: '5e228756e35d7b83',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_latex.2affb53489c8ecba.js',
          revision: '2affb53489c8ecba',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ldif.3c04f991e021e7f3.js',
          revision: '3c04f991e021e7f3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_leaf.0d9c0b5af0af5d7d.js',
          revision: '0d9c0b5af0af5d7d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_less.3e8a1a26dbe22b23.js',
          revision: '3e8a1a26dbe22b23',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lisp.87cc7b4367abb562.js',
          revision: '87cc7b4367abb562',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_livecodeserver.667d3b76105204fa.js',
          revision: '667d3b76105204fa',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_livescript.37d16b1ff72986d2.js',
          revision: '37d16b1ff72986d2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_llvm.bce49d015f7a72e7.js',
          revision: 'bce49d015f7a72e7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lsl.d6ca89631b40ed28.js',
          revision: 'd6ca89631b40ed28',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lua.dd238c3be4ce7f28.js',
          revision: 'dd238c3be4ce7f28',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_makefile.5660a2c4b75c78da.js',
          revision: '5660a2c4b75c78da',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_markdown.4df1a0b5ce7792dd.js',
          revision: '4df1a0b5ce7792dd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mathematica.1c8decffe45664e1.js',
          revision: '1c8decffe45664e1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_matlab.6ba67c851c55d78a.js',
          revision: '6ba67c851c55d78a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_maxima.028255968b656811.js',
          revision: '028255968b656811',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mel.beb285b273e224d2.js',
          revision: 'beb285b273e224d2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mercury.4dc823805d506c22.js',
          revision: '4dc823805d506c22',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mipsasm.b42f5288b092dcdc.js',
          revision: 'b42f5288b092dcdc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mizar.4793ee3b19a6cfe1.js',
          revision: '4793ee3b19a6cfe1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mojolicious.c9870e9d6efec243.js',
          revision: 'c9870e9d6efec243',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_monkey.d008a8c2f32413e9.js',
          revision: 'd008a8c2f32413e9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_moonscript.021ccb41843a56de.js',
          revision: '021ccb41843a56de',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_n1ql.f1292321aff9319b.js',
          revision: 'f1292321aff9319b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nginx.52ee74a1ed5747de.js',
          revision: '52ee74a1ed5747de',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nim.3ec2992dd41bd37f.js',
          revision: '3ec2992dd41bd37f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nix.5696894db265a488.js',
          revision: '5696894db265a488',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nodeRepl.4403e97dac5e62cf.js',
          revision: '4403e97dac5e62cf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nsis.035a2e8c1902cf7f.js',
          revision: '035a2e8c1902cf7f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_objectivec.babcaec494cc4b7e.js',
          revision: 'babcaec494cc4b7e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ocaml.566ee236eaae7dfe.js',
          revision: '566ee236eaae7dfe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_oneC.2d46271d71d1ebad.js',
          revision: '2d46271d71d1ebad',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_openscad.58ddeeb254877e90.js',
          revision: '58ddeeb254877e90',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_oxygene.638c03ac294ce8c5.js',
          revision: '638c03ac294ce8c5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_parser3.a0828a519107ceb0.js',
          revision: 'a0828a519107ceb0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_perl.9a2e39da9766b276.js',
          revision: '9a2e39da9766b276',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pf.285765c004999fd6.js',
          revision: '285765c004999fd6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pgsql.3663effc44d2b61f.js',
          revision: '3663effc44d2b61f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_php.96e9881a2e0a541c.js',
          revision: '96e9881a2e0a541c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_phpTemplate.1b7af6ce200535dc.js',
          revision: '1b7af6ce200535dc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_plaintext.d4b3af4f42226cfe.js',
          revision: 'd4b3af4f42226cfe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pony.26a36e6b376a1111.js',
          revision: '26a36e6b376a1111',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_powershell.1be7adabcf413ef6.js',
          revision: '1be7adabcf413ef6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_processing.22fb8bf6a37c2155.js',
          revision: '22fb8bf6a37c2155',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_profile.cebf2a301def6371.js',
          revision: 'cebf2a301def6371',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_prolog.ab3a30abc87995ed.js',
          revision: 'ab3a30abc87995ed',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_properties.54ea4eb6fa5458e1.js',
          revision: '54ea4eb6fa5458e1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_protobuf.549806878fa9c581.js',
          revision: '549806878fa9c581',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_puppet.2ad0226a7d01fc52.js',
          revision: '2ad0226a7d01fc52',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_purebasic.a13e7efc3fc46a3e.js',
          revision: 'a13e7efc3fc46a3e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_python.805300d7312295c2.js',
          revision: '805300d7312295c2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pythonRepl.9f6a48701e51b8c1.js',
          revision: '9f6a48701e51b8c1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_q.f08c4fff8c531522.js',
          revision: 'f08c4fff8c531522',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_qml.44d9437e1f73cf90.js',
          revision: '44d9437e1f73cf90',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_r.0d02d9b8610a4bef.js',
          revision: '0d02d9b8610a4bef',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_reasonml.9fc7bc401b0bb845.js',
          revision: '9fc7bc401b0bb845',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_rib.95d3ee93f632e7b2.js',
          revision: '95d3ee93f632e7b2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_roboconf.10e94ab93962e531.js',
          revision: '10e94ab93962e531',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_routeros.2d50d25a739bc8de.js',
          revision: '2d50d25a739bc8de',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_rsl.11b8b3c79c60d652.js',
          revision: '11b8b3c79c60d652',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ruby.8abb76e354b1742c.js',
          revision: '8abb76e354b1742c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ruleslanguage.c3aa67199a0cf328.js',
          revision: 'c3aa67199a0cf328',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_rust.9c75663783c31c6d.js',
          revision: '9c75663783c31c6d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sas.af01eeda683b3886.js',
          revision: 'af01eeda683b3886',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scala.ba79f089c58d3488.js',
          revision: 'ba79f089c58d3488',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scheme.07a4a3db21f29284.js',
          revision: '07a4a3db21f29284',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scilab.13db1177e5a2c661.js',
          revision: '13db1177e5a2c661',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scss.6710fd3f04bea7b3.js',
          revision: '6710fd3f04bea7b3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_shell.2167854181661fee.js',
          revision: '2167854181661fee',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_smali.a08936f256177e0d.js',
          revision: 'a08936f256177e0d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_smalltalk.462a056feed4193c.js',
          revision: '462a056feed4193c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sml.050268be97faf9b1.js',
          revision: '050268be97faf9b1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sqf.3c39a12c2f800708.js',
          revision: '3c39a12c2f800708',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sql.86fa861e90c9bc88.js',
          revision: '86fa861e90c9bc88',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sqlMore.bcbb481a77b42d7e.js',
          revision: 'bcbb481a77b42d7e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_stan.ff2d32e9cbaf128a.js',
          revision: 'ff2d32e9cbaf128a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_stata.08fbeef0d75722c3.js',
          revision: '08fbeef0d75722c3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_step21.62f6d087e4aa4b44.js',
          revision: '62f6d087e4aa4b44',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_stylus.8809073102147bac.js',
          revision: '8809073102147bac',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_subunit.dfa5e7a0459ad333.js',
          revision: 'dfa5e7a0459ad333',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_swift.bff4439d7b5a1560.js',
          revision: 'bff4439d7b5a1560',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_taggerscript.e105f345192af444.js',
          revision: 'e105f345192af444',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_tap.fd59680f374d7bb2.js',
          revision: 'fd59680f374d7bb2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_tcl.161d5bb5a738dd4e.js',
          revision: '161d5bb5a738dd4e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_thrift.2fd6074fe88283cd.js',
          revision: '2fd6074fe88283cd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_tp.53a293ab0b0603c6.js',
          revision: '53a293ab0b0603c6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_twig.13e7cdc6b9e465d1.js',
          revision: '13e7cdc6b9e465d1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_typescript.767ac6242eb71e11.js',
          revision: '767ac6242eb71e11',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vala.df5ce60286e79089.js',
          revision: 'df5ce60286e79089',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbnet.8f1c696c90e44b47.js',
          revision: '8f1c696c90e44b47',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbscript.586df176ec0207f5.js',
          revision: '586df176ec0207f5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbscriptHtml.0e61b382fd6c7489.js',
          revision: '0e61b382fd6c7489',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_verilog.6be334cbba723205.js',
          revision: '6be334cbba723205',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vhdl.bc9fb957bf70428c.js',
          revision: 'bc9fb957bf70428c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vim.4c68ac60fbe680f2.js',
          revision: '4c68ac60fbe680f2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_x86asm.b7dba254f6e4cccb.js',
          revision: 'b7dba254f6e4cccb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_xl.dac3b9700014452a.js',
          revision: 'dac3b9700014452a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_xml.e5cf7cbf3dc3e397.js',
          revision: 'e5cf7cbf3dc3e397',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_xquery.bfbc6a4cee4c44ae.js',
          revision: 'bfbc6a4cee4c44ae',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_yaml.2362fe1fd64ffacd.js',
          revision: '2362fe1fd64ffacd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_zephir.a6c8a3b7a9f0762c.js',
          revision: 'a6c8a3b7a9f0762c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_abap.64d796dabf218084.js',
          revision: '64d796dabf218084',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_abnf.a923a35a60f70ab1.js',
          revision: 'a923a35a60f70ab1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_actionscript.c4a79426bea5255f.js',
          revision: 'c4a79426bea5255f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ada.79985e50c3d1eb7b.js',
          revision: '79985e50c3d1eb7b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_agda.2a5c4e0684482e58.js',
          revision: '2a5c4e0684482e58',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_al.4925424b5347b371.js',
          revision: '4925424b5347b371',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_antlr4.16328ed1f1dfd93d.js',
          revision: '16328ed1f1dfd93d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_apacheconf.e893f4bbc63ddbc8.js',
          revision: 'e893f4bbc63ddbc8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_apex.5d542b4285956bc4.js',
          revision: '5d542b4285956bc4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_apl.99f29eabe49cb8fa.js',
          revision: '99f29eabe49cb8fa',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_applescript.c48f514c054a89ed.js',
          revision: 'c48f514c054a89ed',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_aql.da3aa9666460e73c.js',
          revision: 'da3aa9666460e73c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_arduino.736e2714c59ffc32.js',
          revision: '736e2714c59ffc32',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_arff.04db04e5698e97b5.js',
          revision: '04db04e5698e97b5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_asciidoc.583a12796f5258f6.js',
          revision: '583a12796f5258f6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_asm6502.55b6b92e49295387.js',
          revision: '55b6b92e49295387',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_asmatmel.d7b927a08ed4fa7b.js',
          revision: 'd7b927a08ed4fa7b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_aspnet.1fb4ca5ecd9fbe9d.js',
          revision: '1fb4ca5ecd9fbe9d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_autohotkey.b53c9c7da5e4789d.js',
          revision: 'b53c9c7da5e4789d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_autoit.f5e705d6de407873.js',
          revision: 'f5e705d6de407873',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_avisynth.30722b960f6cf90c.js',
          revision: '30722b960f6cf90c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_avroIdl.5f474670de42abd0.js',
          revision: '5f474670de42abd0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bash.a70806d51e93e59f.js',
          revision: 'a70806d51e93e59f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_basic.c0c995e215156d56.js',
          revision: 'c0c995e215156d56',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_batch.8b64bb44aa032865.js',
          revision: '8b64bb44aa032865',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bbcode.6e7ab61b33811d33.js',
          revision: '6e7ab61b33811d33',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bicep.457b8d19f0a1efba.js',
          revision: '457b8d19f0a1efba',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_birb.9f00c33958e7a71a.js',
          revision: '9f00c33958e7a71a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bison.211d40890b62c089.js',
          revision: '211d40890b62c089',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bnf.ed19deb4d9b41dfd.js',
          revision: 'ed19deb4d9b41dfd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_brainfuck.8c0787c07f219536.js',
          revision: '8c0787c07f219536',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_brightscript.d96fe678819caed9.js',
          revision: 'd96fe678819caed9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bro.52bd8bce914f1b9e.js',
          revision: '52bd8bce914f1b9e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bsl.66886c347a1b8370.js',
          revision: '66886c347a1b8370',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_c.e14069b57b393b8d.js',
          revision: 'e14069b57b393b8d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cfscript.3e34d383726b0621.js',
          revision: '3e34d383726b0621',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_chaiscript.b250c5b6a717e225.js',
          revision: 'b250c5b6a717e225',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cil.0cb2ef344ed6688f.js',
          revision: '0cb2ef344ed6688f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_clojure.60f827ce4658dc1e.js',
          revision: '60f827ce4658dc1e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cmake.cd90308cfd2f2e15.js',
          revision: 'cd90308cfd2f2e15',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cobol.0e64c8d121932f90.js',
          revision: '0e64c8d121932f90',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_coffeescript.6ce446aa834a65e3.js',
          revision: '6ce446aa834a65e3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_concurnas.e427edfd5c6e2bd6.js',
          revision: 'e427edfd5c6e2bd6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_coq.ccfa571c97f3c84e.js',
          revision: 'ccfa571c97f3c84e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cpp.49e48bec9865a0bd.js',
          revision: '49e48bec9865a0bd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_crystal.52254686855865f2.js',
          revision: '52254686855865f2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_csharp.8225397a62b588ca.js',
          revision: '8225397a62b588ca',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cshtml.3798eb2841b61880.js',
          revision: '3798eb2841b61880',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_csp.bf468960fd27bde6.js',
          revision: 'bf468960fd27bde6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cssExtras.0a5479d1b2144411.js',
          revision: '0a5479d1b2144411',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_csv.1a7723c95888e827.js',
          revision: '1a7723c95888e827',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cypher.7dde19fbfcfac03a.js',
          revision: '7dde19fbfcfac03a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_d.de1680db91cdeba2.js',
          revision: 'de1680db91cdeba2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dart.ade86076f1dd1a30.js',
          revision: 'ade86076f1dd1a30',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dataweave.cf422e25dc5da9ee.js',
          revision: 'cf422e25dc5da9ee',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dax.f8ab426716bd2818.js',
          revision: 'f8ab426716bd2818',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dhall.f744b2a8c0d03e86.js',
          revision: 'f744b2a8c0d03e86',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_diff.247fcf53efd1b801.js',
          revision: '247fcf53efd1b801',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_django.affcd769413521d4.js',
          revision: 'affcd769413521d4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dnsZoneFile.e24d7616db5444b4.js',
          revision: 'e24d7616db5444b4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_docker.d3de0badad5e09a7.js',
          revision: 'd3de0badad5e09a7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dot.b96a6f18e68bd274.js',
          revision: 'b96a6f18e68bd274',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ebnf.773d557a18475a95.js',
          revision: '773d557a18475a95',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_editorconfig.0431da2835db330b.js',
          revision: '0431da2835db330b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_eiffel.268ba01bb4934884.js',
          revision: '268ba01bb4934884',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ejs.3386b35e3b0d2764.js',
          revision: '3386b35e3b0d2764',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_elixir.912bec1884d1ae49.js',
          revision: '912bec1884d1ae49',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_elm.59e7aab1bddf9d38.js',
          revision: '59e7aab1bddf9d38',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_erb.1aac9a590a805f52.js',
          revision: '1aac9a590a805f52',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_erlang.f4f9cbcb4fc9bafe.js',
          revision: 'f4f9cbcb4fc9bafe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_etlua.4f683f317b988a8d.js',
          revision: '4f683f317b988a8d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_excelFormula.af94aa074d2974a9.js',
          revision: 'af94aa074d2974a9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_factor.b4e92f3a5d0757b9.js',
          revision: 'b4e92f3a5d0757b9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_falselang.ff8dc8d92f0bf12e.js',
          revision: 'ff8dc8d92f0bf12e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_firestoreSecurityRules.440c6a0bfe20de69.js',
          revision: '440c6a0bfe20de69',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_flow.0f32f89b6ac64f77.js',
          revision: '0f32f89b6ac64f77',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_fortran.23b9154299c8c372.js',
          revision: '23b9154299c8c372',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_fsharp.c05491f0f4d34503.js',
          revision: 'c05491f0f4d34503',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ftl.e8f770e64d45d57b.js',
          revision: 'e8f770e64d45d57b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gap.fdcef1452b948edc.js',
          revision: 'fdcef1452b948edc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gcode.ff79b9f33515cc9a.js',
          revision: 'ff79b9f33515cc9a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gdscript.28f187a5128977d2.js',
          revision: '28f187a5128977d2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gedcom.3964182f5d4dcb6c.js',
          revision: '3964182f5d4dcb6c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gherkin.03b3e62532986bc3.js',
          revision: '03b3e62532986bc3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_git.c26a3fc92d1b0b3a.js',
          revision: 'c26a3fc92d1b0b3a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_glsl.a499f062ad849331.js',
          revision: 'a499f062ad849331',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gml.19a738fe189f03be.js',
          revision: '19a738fe189f03be',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gn.6baf47e88bdf0952.js',
          revision: '6baf47e88bdf0952',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_go.d9b8f7cdf74d4764.js',
          revision: 'd9b8f7cdf74d4764',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_goModule.3aea4d02b5d62fd6.js',
          revision: '3aea4d02b5d62fd6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_graphql.3fc46a36ac7f8511.js',
          revision: '3fc46a36ac7f8511',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_groovy.6281e569a3288e1f.js',
          revision: '6281e569a3288e1f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_haml.73cbe53bb559e44c.js',
          revision: '73cbe53bb559e44c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_handlebars.809bd0b6ecc0e874.js',
          revision: '809bd0b6ecc0e874',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_haskell.8f33006ce3e5fb52.js',
          revision: '8f33006ce3e5fb52',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_haxe.505137d6a813057b.js',
          revision: '505137d6a813057b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hcl.9a8e02912af9e922.js',
          revision: '9a8e02912af9e922',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hlsl.d59596ee7c321224.js',
          revision: 'd59596ee7c321224',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hoon.7afa23f0db2c6227.js',
          revision: '7afa23f0db2c6227',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hpkp.d4579db127949c38.js',
          revision: 'd4579db127949c38',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hsts.94d280c4a64ff09b.js',
          revision: '94d280c4a64ff09b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_http.f510eed4252523d1.js',
          revision: 'f510eed4252523d1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ichigojam.be6b0304bd6afd51.js',
          revision: 'be6b0304bd6afd51',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_icon.e7b724b477d7c110.js',
          revision: 'e7b724b477d7c110',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_icuMessageFormat.2391343a1b7b346c.js',
          revision: '2391343a1b7b346c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_idris.e626b867c7307d31.js',
          revision: 'e626b867c7307d31',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_iecst.6da891d8a801a6fc.js',
          revision: '6da891d8a801a6fc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ignore.49894d5c44472e12.js',
          revision: '49894d5c44472e12',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_inform7.da0918dba088dcda.js',
          revision: 'da0918dba088dcda',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ini.5da4b027ad28a692.js',
          revision: '5da4b027ad28a692',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_io.f227ec18d508d76a.js',
          revision: 'f227ec18d508d76a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_j.eb2c16930e7ab3ef.js',
          revision: 'eb2c16930e7ab3ef',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_java.825c63a215360023.js',
          revision: '825c63a215360023',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_javadoc.be260ab4a030c48e.js',
          revision: 'be260ab4a030c48e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_javadoclike.9a2fc4dcc9825402.js',
          revision: '9a2fc4dcc9825402',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_javastacktrace.b81fd656cc9e120f.js',
          revision: 'b81fd656cc9e120f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jexl.a09e32ebcfda7ed8.js',
          revision: 'a09e32ebcfda7ed8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jolie.7fb642175e14ce01.js',
          revision: '7fb642175e14ce01',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jq.5def017f878f6a7d.js',
          revision: '5def017f878f6a7d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsExtras.0519872619b3f8da.js',
          revision: '0519872619b3f8da',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsTemplates.ebe4d417c351058b.js',
          revision: 'ebe4d417c351058b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsdoc.47a910d53a41c493.js',
          revision: '47a910d53a41c493',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_json.dec426dd3318e82d.js',
          revision: 'dec426dd3318e82d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_json5.5bf3756b9380ea66.js',
          revision: '5bf3756b9380ea66',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsonp.0c26ee61ecfc7228.js',
          revision: '0c26ee61ecfc7228',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsstacktrace.91cd52040fec841e.js',
          revision: '91cd52040fec841e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsx.92fbda5ba3698be3.js',
          revision: '92fbda5ba3698be3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_julia.4a335fbf865649d9.js',
          revision: '4a335fbf865649d9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_keepalived.7fece9d7bc826f6e.js',
          revision: '7fece9d7bc826f6e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_keyman.0e8fdb3c29348748.js',
          revision: '0e8fdb3c29348748',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_kotlin.d0ee73bd242d1990.js',
          revision: 'd0ee73bd242d1990',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_kumir.6b8a5cc26e31e081.js',
          revision: '6b8a5cc26e31e081',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_kusto.9ca981e75192fbbe.js',
          revision: '9ca981e75192fbbe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_latex.d043e1682a6c27a9.js',
          revision: 'd043e1682a6c27a9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_latte.dfc585bffe926b51.js',
          revision: 'dfc585bffe926b51',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_less.326670234720addb.js',
          revision: '326670234720addb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lilypond.0f46785a08a8da91.js',
          revision: '0f46785a08a8da91',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_liquid.f1868edea1708ce9.js',
          revision: 'f1868edea1708ce9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lisp.d9cad65606f03fee.js',
          revision: 'd9cad65606f03fee',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_livescript.7bcfab2806f6a1e3.js',
          revision: '7bcfab2806f6a1e3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_llvm.2cf033f2e18ce607.js',
          revision: '2cf033f2e18ce607',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_log.a0c556b547dfb3d8.js',
          revision: 'a0c556b547dfb3d8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lolcode.279b08071975e42f.js',
          revision: '279b08071975e42f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lua.ec0ca23f2b8589cd.js',
          revision: 'ec0ca23f2b8589cd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_magma.e44fcfa9fe5c50b6.js',
          revision: 'e44fcfa9fe5c50b6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_makefile.f9cb2386f6345aa1.js',
          revision: 'f9cb2386f6345aa1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_markdown.7d6cec34ac3ae4b6.js',
          revision: '7d6cec34ac3ae4b6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_markupTemplating.d58630dec12ca07a.js',
          revision: 'd58630dec12ca07a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_matlab.e7b769cf8adc02b7.js',
          revision: 'e7b769cf8adc02b7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_maxscript.2ca99f6547088c2c.js',
          revision: '2ca99f6547088c2c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mel.0a86d4498e5e0e0e.js',
          revision: '0a86d4498e5e0e0e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mermaid.f931052588a20de0.js',
          revision: 'f931052588a20de0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mizar.ba3db759be2b8af3.js',
          revision: 'ba3db759be2b8af3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mongodb.29ba2bfc0c66baff.js',
          revision: '29ba2bfc0c66baff',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_monkey.27ed7d4cc2351aed.js',
          revision: '27ed7d4cc2351aed',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_moonscript.1c278c554a8ef288.js',
          revision: '1c278c554a8ef288',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_n1ql.ece389fcd7de64bd.js',
          revision: 'ece389fcd7de64bd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_n4js.9158aeecd70e047e.js',
          revision: '9158aeecd70e047e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nand2tetrisHdl.6aa75faff5f7e60e.js',
          revision: '6aa75faff5f7e60e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_naniscript.7756ba23322c350e.js',
          revision: '7756ba23322c350e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nasm.5a67048ddfd50ab5.js',
          revision: '5a67048ddfd50ab5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_neon.5a5b46b87fa26bf3.js',
          revision: '5a5b46b87fa26bf3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nevod.ea01d94c190db501.js',
          revision: 'ea01d94c190db501',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nginx.55638d15cb8103e3.js',
          revision: '55638d15cb8103e3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nim.da76cf3b0bd81570.js',
          revision: 'da76cf3b0bd81570',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nix.3b3e500e2df07477.js',
          revision: '3b3e500e2df07477',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nsis.82b8260d65d84914.js',
          revision: '82b8260d65d84914',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_objectivec.2b630dc70583a1bc.js',
          revision: '2b630dc70583a1bc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ocaml.4e472ee0d070029f.js',
          revision: '4e472ee0d070029f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_opencl.6cc01b3a43e7290a.js',
          revision: '6cc01b3a43e7290a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_openqasm.e65bf2146e2291ab.js',
          revision: 'e65bf2146e2291ab',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_oz.7ff3ce2f2621b020.js',
          revision: '7ff3ce2f2621b020',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_parigp.b788344823e01aa8.js',
          revision: 'b788344823e01aa8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_parser.79e34d304e1bf223.js',
          revision: '79e34d304e1bf223',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pascal.8e8021577c2652d0.js',
          revision: '8e8021577c2652d0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pascaligo.8839c8821b2e559d.js',
          revision: '8839c8821b2e559d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pcaxis.4c301ea1adb4e6e5.js',
          revision: '4c301ea1adb4e6e5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_peoplecode.e08e7c29432634fe.js',
          revision: 'e08e7c29432634fe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_perl.9e95178f7a18bf37.js',
          revision: '9e95178f7a18bf37',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_php.362d8d20fa3ca912.js',
          revision: '362d8d20fa3ca912',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_phpExtras.78083aa9f1e5a0f1.js',
          revision: '78083aa9f1e5a0f1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_phpdoc.0cc3c8db51f8a778.js',
          revision: '0cc3c8db51f8a778',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_plsql.f9fc9ce763c0e358.js',
          revision: 'f9fc9ce763c0e358',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_powerquery.6a08397cde947561.js',
          revision: '6a08397cde947561',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_powershell.d92e349fe31b3fce.js',
          revision: 'd92e349fe31b3fce',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_processing.f75438092cb7b7a9.js',
          revision: 'f75438092cb7b7a9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_prolog.bcdf2734950d0393.js',
          revision: 'bcdf2734950d0393',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_promql.09f29a80d0f486c5.js',
          revision: '09f29a80d0f486c5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_properties.d6706bb46fa899b6.js',
          revision: 'd6706bb46fa899b6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_protobuf.e950260892d4998c.js',
          revision: 'e950260892d4998c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_psl.0943c0db44d654f7.js',
          revision: '0943c0db44d654f7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pug.2aacf53a752d214a.js',
          revision: '2aacf53a752d214a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_puppet.4adda9799ad361b4.js',
          revision: '4adda9799ad361b4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pure.e708915fd98cd7d0.js',
          revision: 'e708915fd98cd7d0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_purebasic.dee10b8a27c2ff4c.js',
          revision: 'dee10b8a27c2ff4c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_purescript.1bfd57d2efbdcdd9.js',
          revision: '1bfd57d2efbdcdd9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_python.1e9990d0bc27744d.js',
          revision: '1e9990d0bc27744d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_q.9120d82b780c952c.js',
          revision: '9120d82b780c952c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_qml.a363a8c3b5ee7c14.js',
          revision: 'a363a8c3b5ee7c14',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_qore.1a159b142894e751.js',
          revision: '1a159b142894e751',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_qsharp.efd49617baa4c118.js',
          revision: 'efd49617baa4c118',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_r.d880fb6e18b8ea66.js',
          revision: 'd880fb6e18b8ea66',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_racket.0452e29b287ebde9.js',
          revision: '0452e29b287ebde9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_reason.8939243b1d37d3b7.js',
          revision: '8939243b1d37d3b7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_regex.d891935e47e7eca9.js',
          revision: 'd891935e47e7eca9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rego.84a45faeef098b39.js',
          revision: '84a45faeef098b39',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_renpy.04a53f663a38c1ac.js',
          revision: '04a53f663a38c1ac',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rest.53f062d8c93ee751.js',
          revision: '53f062d8c93ee751',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rip.cc3125d5892299eb.js',
          revision: 'cc3125d5892299eb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_roboconf.5422233627f44de5.js',
          revision: '5422233627f44de5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_robotframework.6ea745d4b411d850.js',
          revision: '6ea745d4b411d850',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ruby.dc23f3b2c361901e.js',
          revision: 'dc23f3b2c361901e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rust.820c89b9e3327973.js',
          revision: '820c89b9e3327973',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sas.f24ab1f10d70b3fe.js',
          revision: 'f24ab1f10d70b3fe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sass.0358ff3a5c0e71c5.js',
          revision: '0358ff3a5c0e71c5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_scala.87d0df76e0ed8dec.js',
          revision: '87d0df76e0ed8dec',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_scheme.233a9a12a1b042d8.js',
          revision: '233a9a12a1b042d8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_scss.a090562096810bd7.js',
          revision: 'a090562096810bd7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_shellSession.4b89020927a119c6.js',
          revision: '4b89020927a119c6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_smali.33115d4cff391481.js',
          revision: '33115d4cff391481',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_smalltalk.7a1562472c7d6b1d.js',
          revision: '7a1562472c7d6b1d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_smarty.c1fb4995bf5bc846.js',
          revision: 'c1fb4995bf5bc846',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sml.7b8c082f2da580be.js',
          revision: '7b8c082f2da580be',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_solidity.4d7cffed9c698f19.js',
          revision: '4d7cffed9c698f19',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_solutionFile.f5a16737670edc75.js',
          revision: 'f5a16737670edc75',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_soy.a225a2342ac1c576.js',
          revision: 'a225a2342ac1c576',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sparql.b770a3b816c2a4d0.js',
          revision: 'b770a3b816c2a4d0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_splunkSpl.c1a0c09724a00da0.js',
          revision: 'c1a0c09724a00da0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sqf.8367d76f0772a242.js',
          revision: '8367d76f0772a242',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sql.764bc04b751ddf54.js',
          revision: '764bc04b751ddf54',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_squirrel.4f05bc90834c65ea.js',
          revision: '4f05bc90834c65ea',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_stan.fd0eaf493ec96044.js',
          revision: 'fd0eaf493ec96044',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_stylus.bb4122c7604c737b.js',
          revision: 'bb4122c7604c737b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_swift.0931e6a723646f32.js',
          revision: '0931e6a723646f32',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_systemd.6c5835d302017f06.js',
          revision: '6c5835d302017f06',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_t4Cs.214b05bca0223610.js',
          revision: '214b05bca0223610',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_t4Templating.37b254adc8386372.js',
          revision: '37b254adc8386372',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_t4Vb.9d49347cfdca840b.js',
          revision: '9d49347cfdca840b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tap.1bed6991e53f5104.js',
          revision: '1bed6991e53f5104',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tcl.adfc1140bb094b4e.js',
          revision: 'adfc1140bb094b4e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_textile.3ea4a2cbe093d45c.js',
          revision: '3ea4a2cbe093d45c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_toml.023f02b46abf2b52.js',
          revision: '023f02b46abf2b52',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tremor.6b3f6fab3be09ba6.js',
          revision: '6b3f6fab3be09ba6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tsx.8e2a1df34ffc6858.js',
          revision: '8e2a1df34ffc6858',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tt2.63dfafd74fcd1a8c.js',
          revision: '63dfafd74fcd1a8c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_turtle.4f428f88ac88142c.js',
          revision: '4f428f88ac88142c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_twig.72887098b8ecabb0.js',
          revision: '72887098b8ecabb0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_typescript.14a97b6cfe30d343.js',
          revision: '14a97b6cfe30d343',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_typoscript.a8dbbc609a6a425e.js',
          revision: 'a8dbbc609a6a425e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_unrealscript.361a619570fce5bc.js',
          revision: '361a619570fce5bc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_uorazor.df3d9306f0d65b41.js',
          revision: 'df3d9306f0d65b41',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_uri.da47b4d98870e200.js',
          revision: 'da47b4d98870e200',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_v.dd5f562b356de3b9.js',
          revision: 'dd5f562b356de3b9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vala.46367c87881137ef.js',
          revision: '46367c87881137ef',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vbnet.acfbe011aa97f51f.js',
          revision: 'acfbe011aa97f51f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_velocity.cde3c0a6d9aec1c7.js',
          revision: 'cde3c0a6d9aec1c7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_verilog.dc8f3998f2f353c6.js',
          revision: 'dc8f3998f2f353c6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vhdl.37a18175e6abcc46.js',
          revision: '37a18175e6abcc46',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vim.d4c07afb91626aba.js',
          revision: 'd4c07afb91626aba',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_visualBasic.3c0426b696083f81.js',
          revision: '3c0426b696083f81',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_warpscript.eb95adb2c46fc79b.js',
          revision: 'eb95adb2c46fc79b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wasm.7e69aa59ab5e36be.js',
          revision: '7e69aa59ab5e36be',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_webIdl.2c3800f928e772fe.js',
          revision: '2c3800f928e772fe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wiki.c7c3a7e8006719b4.js',
          revision: 'c7c3a7e8006719b4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wolfram.7f466416d1aebd5d.js',
          revision: '7f466416d1aebd5d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wren.5575b2e7cbdd189b.js',
          revision: '5575b2e7cbdd189b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xeora.271fc0841c0ca1d1.js',
          revision: '271fc0841c0ca1d1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xmlDoc.6321681807170430.js',
          revision: '6321681807170430',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xojo.65f5c4f68fdb82b8.js',
          revision: '65f5c4f68fdb82b8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xquery.59213477441c3f8c.js',
          revision: '59213477441c3f8c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_yaml.611c4300b97f1a47.js',
          revision: '611c4300b97f1a47',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_yang.bdee7387c1005319.js',
          revision: 'bdee7387c1005319',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_zig.61ffa0c726649d89.js',
          revision: '61ffa0c726649d89',
        },
        {
          url: '/_next/static/chunks/webpack-882871064a1821fd.js',
          revision: '1y-xjCMYDDwYuFPLjGu5j',
        },
        {
          url: '/_next/static/css/628765f20b848f76.css',
          revision: '628765f20b848f76',
        },
        {
          url: '/_next/static/css/f761a89b2e638ec4.css',
          revision: 'f761a89b2e638ec4',
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
