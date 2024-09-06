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
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (a[c]) return;
    let r = {};
    const n = (e) => t(e, c),
      h = { module: { uri: c }, exports: r, require: n };
    a[c] = Promise.all(s.map((e) => h[e] || n(e))).then((e) => (i(...e), r));
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
          revision: '0a466537a8f6b4e564d104a0e2957ca7',
        },
        {
          url: '/_next/static/OxH9dAIUVY_CbbCmp9cHo/_buildManifest.js',
          revision: 'f0d960e6bcf136b56b17a241133f6960',
        },
        {
          url: '/_next/static/OxH9dAIUVY_CbbCmp9cHo/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/14917.5ed9e31d1dd669fe.js',
          revision: '5ed9e31d1dd669fe',
        },
        {
          url: '/_next/static/chunks/27578-a74ed59ad3ee9b51.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/32706-c819268472a367f2.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/61433-79e6c61813f6b73f.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/61977-a5018ab5b302a4db.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/65184-2fbe07ea720d9da3.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/65837-78b5072aa3180629.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/78456-3bce0d6184d3fb92.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/82379-5d1d947123f3eec0.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/88487-306207717208f641.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/8ece9acb-b3dc770ec1f1eed5.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/92615-aa5e92193d0822b9.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/98480-8cc4cf95b9947f18.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(editable)/demo/layout-5f513b54043b4d3f.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(editable)/demo/page-6ba4d7b22c4bc990.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/%5B...not-found%5D/layout-efe2e64dfb5d94ae.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/%5B...not-found%5D/page-daa5e0d6c010c845.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/404/layout-b1a578e917c56b34.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/404/page-0684b62cd2674cd9.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/(authenticated)/layout-fb032e36167f5814.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/(authenticated)/password/change/page-f4028dcc039582df.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/(not-authenticated)/layout-c52c1ef36c80923b.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/(not-authenticated)/login/page-90204d4e1736e9e6.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/(not-authenticated)/register/page-8881b51dc5aef9b0.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/auth/password/reset/page-d53ac79af1498372.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/doc/%5B%5B...doc%5D%5D/layout-2b90bb511b734ce7.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/doc/%5B%5B...doc%5D%5D/page-3980f3d46392e0d2.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/layout-fdc82afa6cb217cf.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/page-ae04d85153b4b0c0.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/privacy_notice/page-ab6e5d0686a0b0a7.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/(not-editable)/terms_of_service/page-79555fc268d546cc.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/%5Blocale%5D/layout-dd1d8e8253183e7c.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-ba65039e87d8d679.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/app/layout-334e2c9c277851c8.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/framework-dd35c5a5815a926e.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/main-app-c15cd386a1ef49c4.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/main-eb39094421afb948.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/pages/_app-231fcc092c035b18.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/pages/_error-17527fce3203a26d.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_abnf.3c925a6ba90826ca.js',
          revision: '3c925a6ba90826ca',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_accesslog.cdcfd513dc5dd781.js',
          revision: 'cdcfd513dc5dd781',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_actionscript.d9baa61049ad24c2.js',
          revision: 'd9baa61049ad24c2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ada.466dcebf83166a26.js',
          revision: '466dcebf83166a26',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_angelscript.099ae7b082264d0d.js',
          revision: '099ae7b082264d0d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_apache.cd57c6d00e15e3c8.js',
          revision: 'cd57c6d00e15e3c8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_applescript.fa3e4e789f9b30e9.js',
          revision: 'fa3e4e789f9b30e9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_arcade.def3f3891d1e35bb.js',
          revision: 'def3f3891d1e35bb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_arduino.082a397f8015a6f9.js',
          revision: '082a397f8015a6f9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_armasm.cb2130dd138df65f.js',
          revision: 'cb2130dd138df65f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_asciidoc.4c9a1fa025b854d4.js',
          revision: '4c9a1fa025b854d4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_aspectj.5cd5e87ceec4be5c.js',
          revision: '5cd5e87ceec4be5c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_autohotkey.66010c16048ea323.js',
          revision: '66010c16048ea323',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_autoit.f9dbc431cb634a2b.js',
          revision: 'f9dbc431cb634a2b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_avrasm.8f5afc0c5da13a0f.js',
          revision: '8f5afc0c5da13a0f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_awk.957f86515eae829b.js',
          revision: '957f86515eae829b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_axapta.4169701720ff8676.js',
          revision: '4169701720ff8676',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_bash.258075170d2f3eca.js',
          revision: '258075170d2f3eca',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_basic.7d71736398f9c0f8.js',
          revision: '7d71736398f9c0f8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_bnf.484af251fa77c28e.js',
          revision: '484af251fa77c28e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_brainfuck.5698df54c3597636.js',
          revision: '5698df54c3597636',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_c.7d2ec1d4b74c687a.js',
          revision: '7d2ec1d4b74c687a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cLike.ebadd067aa0073bd.js',
          revision: 'ebadd067aa0073bd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cal.fb37ed614c8bc256.js',
          revision: 'fb37ed614c8bc256',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_capnproto.c99ce1feb729a8c5.js',
          revision: 'c99ce1feb729a8c5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ceylon.885f6f9af47adb43.js',
          revision: '885f6f9af47adb43',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_clean.debf553bc896a6e2.js',
          revision: 'debf553bc896a6e2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_clojure.9d79fa928c471d8b.js',
          revision: '9d79fa928c471d8b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_clojureRepl.665010acfd5ab663.js',
          revision: '665010acfd5ab663',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cmake.9c5e4bc76961d401.js',
          revision: '9c5e4bc76961d401',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_coffeescript.f875d030bd462bbc.js',
          revision: 'f875d030bd462bbc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_coq.58b8cbd8f0334e78.js',
          revision: '58b8cbd8f0334e78',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cos.82cbdacc67734c45.js',
          revision: '82cbdacc67734c45',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_cpp.5d7d9084bb29cd78.js',
          revision: '5d7d9084bb29cd78',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_crmsh.45153a88d2d7f23e.js',
          revision: '45153a88d2d7f23e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_crystal.a3fd31f8067040ea.js',
          revision: 'a3fd31f8067040ea',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_csharp.e191d0b7e5a3d8a9.js',
          revision: 'e191d0b7e5a3d8a9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_csp.309b89c57cbdd8bd.js',
          revision: '309b89c57cbdd8bd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_css.e68190d82dda62cf.js',
          revision: 'e68190d82dda62cf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_d.a158d8b2eeb56003.js',
          revision: 'a158d8b2eeb56003',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dart.88c3d6fa0d592939.js',
          revision: '88c3d6fa0d592939',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_delphi.fd859184f4967c0f.js',
          revision: 'fd859184f4967c0f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_diff.586475cbf3a21b82.js',
          revision: '586475cbf3a21b82',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_django.f909985092c0cf5e.js',
          revision: 'f909985092c0cf5e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dns.5ebf34ea44f6d9b6.js',
          revision: '5ebf34ea44f6d9b6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dockerfile.52d193c58c371c82.js',
          revision: '52d193c58c371c82',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dos.de24aca92f443dc1.js',
          revision: 'de24aca92f443dc1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dsconfig.78ef206acf42d44d.js',
          revision: '78ef206acf42d44d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dts.5f3a0b5396bf111b.js',
          revision: '5f3a0b5396bf111b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_dust.82343991aa71a383.js',
          revision: '82343991aa71a383',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ebnf.1e853faad8c82aea.js',
          revision: '1e853faad8c82aea',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_elixir.b9d5b56189eb1fa4.js',
          revision: 'b9d5b56189eb1fa4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_elm.b5a6132a3cdcf76f.js',
          revision: 'b5a6132a3cdcf76f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_erb.ac964a92032352f5.js',
          revision: 'ac964a92032352f5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_erlang.8409449f4be520fd.js',
          revision: '8409449f4be520fd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_erlangRepl.809d9210c553167e.js',
          revision: '809d9210c553167e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_excel.c7587988e99269d1.js',
          revision: 'c7587988e99269d1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_fix.2c04fc2724bb350d.js',
          revision: '2c04fc2724bb350d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_flix.182c5cb4a6b4b1b9.js',
          revision: '182c5cb4a6b4b1b9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_fortran.dda445da532a5f02.js',
          revision: 'dda445da532a5f02',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_fsharp.7f78c8b2d2fa6c42.js',
          revision: '7f78c8b2d2fa6c42',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gams.7db3ed02ac2a6630.js',
          revision: '7db3ed02ac2a6630',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gauss.c7794ba10edf3216.js',
          revision: 'c7794ba10edf3216',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gcode.133f0ebe4d53574a.js',
          revision: '133f0ebe4d53574a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gherkin.32d010841b6c5487.js',
          revision: '32d010841b6c5487',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_glsl.173c2d6ec5f8fe8e.js',
          revision: '173c2d6ec5f8fe8e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gml.e48e2b14117580fa.js',
          revision: 'e48e2b14117580fa',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_go.cbce9edca9df0ee5.js',
          revision: 'cbce9edca9df0ee5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_golo.bc33273f317768b7.js',
          revision: 'bc33273f317768b7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_gradle.daab57a7dd805485.js',
          revision: 'daab57a7dd805485',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_groovy.e677e0edc7f19dd6.js',
          revision: 'e677e0edc7f19dd6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_haml.3ee222bffff77b3d.js',
          revision: '3ee222bffff77b3d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_handlebars.63de088b0d0f6b90.js',
          revision: '63de088b0d0f6b90',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_haskell.7d11e18232d9275d.js',
          revision: '7d11e18232d9275d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_haxe.cfeb6c3780dd5599.js',
          revision: 'cfeb6c3780dd5599',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_hsp.f9786489b173cc21.js',
          revision: 'f9786489b173cc21',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_htmlbars.86661fe2adb2adb1.js',
          revision: '86661fe2adb2adb1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_http.81047ed1f9042fb5.js',
          revision: '81047ed1f9042fb5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_hy.d22d2a46f3dd92dd.js',
          revision: 'd22d2a46f3dd92dd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_inform7.baaf8eb6d341ff0c.js',
          revision: 'baaf8eb6d341ff0c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ini.01dd0113db662cb6.js',
          revision: '01dd0113db662cb6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_irpf90.97258fdb2114f4e2.js',
          revision: '97258fdb2114f4e2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_isbl.390dbc940243b85b.js',
          revision: '390dbc940243b85b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_java.e55cbed0e6ae60b4.js',
          revision: 'e55cbed0e6ae60b4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_javascript.848eb0138ef85483.js',
          revision: '848eb0138ef85483',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_jbossCli.8b3127c8240c0c3b.js',
          revision: '8b3127c8240c0c3b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_json.715cd8d61c254da3.js',
          revision: '715cd8d61c254da3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_julia.ae80e9773e491f72.js',
          revision: 'ae80e9773e491f72',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_juliaRepl.2c243672d6027c48.js',
          revision: '2c243672d6027c48',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_kotlin.195ef21ba2148ff9.js',
          revision: '195ef21ba2148ff9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lasso.a4a268d63cb24642.js',
          revision: 'a4a268d63cb24642',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_latex.839d961828e09197.js',
          revision: '839d961828e09197',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ldif.6c17d8b715523be5.js',
          revision: '6c17d8b715523be5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_leaf.f8a5e83147dd976f.js',
          revision: 'f8a5e83147dd976f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_less.10a1ed017ba919a0.js',
          revision: '10a1ed017ba919a0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lisp.070b2b820d3877d3.js',
          revision: '070b2b820d3877d3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_livecodeserver.11ddd21e74ae1f9a.js',
          revision: '11ddd21e74ae1f9a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_livescript.645fe1e3ef7e8c64.js',
          revision: '645fe1e3ef7e8c64',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_llvm.9d0da7ba734c63ed.js',
          revision: '9d0da7ba734c63ed',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lsl.97a4bf48ee7835ad.js',
          revision: '97a4bf48ee7835ad',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_lua.9d5c7bc8fd38edcf.js',
          revision: '9d5c7bc8fd38edcf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_makefile.ad48dffdd2f24513.js',
          revision: 'ad48dffdd2f24513',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_markdown.e4847d6a0f5d3f9b.js',
          revision: 'e4847d6a0f5d3f9b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mathematica.5e2fdcaac9f725cf.js',
          revision: '5e2fdcaac9f725cf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_matlab.f8ad5c07661ce4cb.js',
          revision: 'f8ad5c07661ce4cb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_maxima.072baeadb8b9de9d.js',
          revision: '072baeadb8b9de9d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mel.680dce907abe5c1f.js',
          revision: '680dce907abe5c1f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mercury.65677cea3c2531b9.js',
          revision: '65677cea3c2531b9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mipsasm.a38261f998c6e770.js',
          revision: 'a38261f998c6e770',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mizar.395029c6da8a7762.js',
          revision: '395029c6da8a7762',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_mojolicious.7e56c332254cdd2c.js',
          revision: '7e56c332254cdd2c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_monkey.b53a00ab57a58f15.js',
          revision: 'b53a00ab57a58f15',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_moonscript.d36b8d8df66fb6a7.js',
          revision: 'd36b8d8df66fb6a7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_n1ql.aedeaf71aea5a909.js',
          revision: 'aedeaf71aea5a909',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nginx.30476b6dc9863082.js',
          revision: '30476b6dc9863082',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nim.1021151244ef7ab8.js',
          revision: '1021151244ef7ab8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nix.7022b67d2137a6ac.js',
          revision: '7022b67d2137a6ac',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nodeRepl.67c90fa4708d9883.js',
          revision: '67c90fa4708d9883',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_nsis.a661c2aeafc6cf9a.js',
          revision: 'a661c2aeafc6cf9a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_objectivec.6c1a82fed43debd3.js',
          revision: '6c1a82fed43debd3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ocaml.c95b55ce747f5b88.js',
          revision: 'c95b55ce747f5b88',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_oneC.68ab9863122b3349.js',
          revision: '68ab9863122b3349',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_openscad.5531bd354b3d08d9.js',
          revision: '5531bd354b3d08d9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_oxygene.8287effb61693943.js',
          revision: '8287effb61693943',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_parser3.a082b762444ab3f0.js',
          revision: 'a082b762444ab3f0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_perl.7861cd3d8c31b154.js',
          revision: '7861cd3d8c31b154',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pf.9c1a685589c67f6c.js',
          revision: '9c1a685589c67f6c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pgsql.d492fad251f6e7fb.js',
          revision: 'd492fad251f6e7fb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_php.0661c1245e30c3b4.js',
          revision: '0661c1245e30c3b4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_phpTemplate.a676f1b9d574f7f4.js',
          revision: 'a676f1b9d574f7f4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_plaintext.39a84575b5fb398b.js',
          revision: '39a84575b5fb398b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pony.01f9fa8e096645e3.js',
          revision: '01f9fa8e096645e3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_powershell.de1f66ff71701a1c.js',
          revision: 'de1f66ff71701a1c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_processing.6d27751521adff08.js',
          revision: '6d27751521adff08',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_profile.8242a1bacbeca736.js',
          revision: '8242a1bacbeca736',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_prolog.6266d0ec7cb51782.js',
          revision: '6266d0ec7cb51782',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_properties.24f40363617ee22e.js',
          revision: '24f40363617ee22e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_protobuf.d09c0274a56672ba.js',
          revision: 'd09c0274a56672ba',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_puppet.fa68d5ed8dd75e86.js',
          revision: 'fa68d5ed8dd75e86',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_purebasic.9608b329ede54463.js',
          revision: '9608b329ede54463',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_python.86efcc8f209a7f2d.js',
          revision: '86efcc8f209a7f2d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_pythonRepl.1b887d15c134dc2d.js',
          revision: '1b887d15c134dc2d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_q.9dcc973f6f32bed2.js',
          revision: '9dcc973f6f32bed2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_qml.7af13196728f1e85.js',
          revision: '7af13196728f1e85',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_r.8013e155dc183109.js',
          revision: '8013e155dc183109',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_reasonml.cd2fa475125b6cc3.js',
          revision: 'cd2fa475125b6cc3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_rib.56b9bb6fca67cf1f.js',
          revision: '56b9bb6fca67cf1f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_roboconf.4f23b64f35fb332d.js',
          revision: '4f23b64f35fb332d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_routeros.4011b1ea7eeda08a.js',
          revision: '4011b1ea7eeda08a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_rsl.9ab93012038e01c1.js',
          revision: '9ab93012038e01c1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ruby.fc2d8d17270adf35.js',
          revision: 'fc2d8d17270adf35',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_ruleslanguage.e918517f8a695b1a.js',
          revision: 'e918517f8a695b1a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_rust.a4104522a6e24a0e.js',
          revision: 'a4104522a6e24a0e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sas.337feb2cc173252b.js',
          revision: '337feb2cc173252b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scala.7927b29385ddd9b9.js',
          revision: '7927b29385ddd9b9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scheme.d91efb8b0a7bb7d7.js',
          revision: 'd91efb8b0a7bb7d7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scilab.477e9c1cb03e5d33.js',
          revision: '477e9c1cb03e5d33',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_scss.c2594db422c50330.js',
          revision: 'c2594db422c50330',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_shell.3d816e0a4e17049a.js',
          revision: '3d816e0a4e17049a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_smali.ee4d036fcda4bb7d.js',
          revision: 'ee4d036fcda4bb7d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_smalltalk.957ddba195146127.js',
          revision: '957ddba195146127',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sml.197a9c2d356f62d3.js',
          revision: '197a9c2d356f62d3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sqf.8d5fa22fcdd4a0c9.js',
          revision: '8d5fa22fcdd4a0c9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sql.f06a3cb935059c7e.js',
          revision: 'f06a3cb935059c7e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_sqlMore.a974a9a43dc0c8a9.js',
          revision: 'a974a9a43dc0c8a9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_stan.c33e071bdc9034d5.js',
          revision: 'c33e071bdc9034d5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_stata.936e539791c40899.js',
          revision: '936e539791c40899',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_step21.d593d96e7166b3e5.js',
          revision: 'd593d96e7166b3e5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_stylus.4ab74892badc040c.js',
          revision: '4ab74892badc040c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_subunit.eae44689cdb6b5cf.js',
          revision: 'eae44689cdb6b5cf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_swift.c5fa7a44c8c4f24c.js',
          revision: 'c5fa7a44c8c4f24c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_taggerscript.58b3f4eb8ea18530.js',
          revision: '58b3f4eb8ea18530',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_tap.8925fb8f98a8f60e.js',
          revision: '8925fb8f98a8f60e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_tcl.c53aa76df034ae45.js',
          revision: 'c53aa76df034ae45',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_thrift.5da9c9d5cfab637b.js',
          revision: '5da9c9d5cfab637b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_tp.3d158166ec45f9aa.js',
          revision: '3d158166ec45f9aa',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_twig.f98a8781c70425d1.js',
          revision: 'f98a8781c70425d1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_typescript.0ce29983018c3959.js',
          revision: '0ce29983018c3959',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vala.4438b3d16025cf94.js',
          revision: '4438b3d16025cf94',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbnet.bca79892beb2e8af.js',
          revision: 'bca79892beb2e8af',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbscript.8cb5eb1f50303814.js',
          revision: '8cb5eb1f50303814',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vbscriptHtml.c4b947185778da88.js',
          revision: 'c4b947185778da88',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_verilog.bb07840f9514a4cb.js',
          revision: 'bb07840f9514a4cb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vhdl.b36fef4c4c273939.js',
          revision: 'b36fef4c4c273939',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_vim.a44e30fd4ca7d086.js',
          revision: 'a44e30fd4ca7d086',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_x86asm.b1cb5fdd163152aa.js',
          revision: 'b1cb5fdd163152aa',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_xl.2ac9b5b7db7f05b6.js',
          revision: '2ac9b5b7db7f05b6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_xml.4f549602890fc76f.js',
          revision: '4f549602890fc76f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_xquery.eab644b03151cf50.js',
          revision: 'eab644b03151cf50',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_yaml.d378dedf0bab922b.js',
          revision: 'd378dedf0bab922b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_highlight_zephir.24101f8211ff302a.js',
          revision: '24101f8211ff302a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_abap.23eba94a849b804a.js',
          revision: '23eba94a849b804a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_abnf.a2a2bee6f6b34b99.js',
          revision: 'a2a2bee6f6b34b99',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_actionscript.a62feea56c5504cb.js',
          revision: 'a62feea56c5504cb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ada.38b769f650cd42e8.js',
          revision: '38b769f650cd42e8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_agda.1893866bf52cb629.js',
          revision: '1893866bf52cb629',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_al.c26ecc79b269c9e0.js',
          revision: 'c26ecc79b269c9e0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_antlr4.d6e0377983ed87f7.js',
          revision: 'd6e0377983ed87f7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_apacheconf.618c35fb91522828.js',
          revision: '618c35fb91522828',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_apex.e34c88b8b947d2c0.js',
          revision: 'e34c88b8b947d2c0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_apl.b893b8ad10d4de23.js',
          revision: 'b893b8ad10d4de23',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_applescript.3a52e7f074863935.js',
          revision: '3a52e7f074863935',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_aql.585ae949f74c2906.js',
          revision: '585ae949f74c2906',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_arduino.fd03c51d4413f3a2.js',
          revision: 'fd03c51d4413f3a2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_arff.eff0c0d783ef5906.js',
          revision: 'eff0c0d783ef5906',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_asciidoc.668ac31b5d3f8632.js',
          revision: '668ac31b5d3f8632',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_asm6502.cc11b2ff662084f2.js',
          revision: 'cc11b2ff662084f2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_asmatmel.23d0a9ec75b5175f.js',
          revision: '23d0a9ec75b5175f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_aspnet.39b988da683f0e7b.js',
          revision: '39b988da683f0e7b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_autohotkey.6052dc7590e998d4.js',
          revision: '6052dc7590e998d4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_autoit.9fcab412d1a188b5.js',
          revision: '9fcab412d1a188b5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_avisynth.ddb6ab4dc392a373.js',
          revision: 'ddb6ab4dc392a373',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_avroIdl.343195634746ff58.js',
          revision: '343195634746ff58',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bash.17a83d11512accba.js',
          revision: '17a83d11512accba',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_basic.db878768af05517a.js',
          revision: 'db878768af05517a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_batch.a8e0b9a4f250a032.js',
          revision: 'a8e0b9a4f250a032',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bbcode.111e43c8a071250a.js',
          revision: '111e43c8a071250a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bicep.bbc27322432ec8f1.js',
          revision: 'bbc27322432ec8f1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_birb.f2fe6467faddaa0d.js',
          revision: 'f2fe6467faddaa0d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bison.bfcac262bb5de7b5.js',
          revision: 'bfcac262bb5de7b5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bnf.9144de0835c3b527.js',
          revision: '9144de0835c3b527',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_brainfuck.adb286be09294e05.js',
          revision: 'adb286be09294e05',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_brightscript.feffc00d6d853ce6.js',
          revision: 'feffc00d6d853ce6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bro.50442b42807741e5.js',
          revision: '50442b42807741e5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_bsl.4ae3afbcf93bb08f.js',
          revision: '4ae3afbcf93bb08f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_c.3b802f98a475daa1.js',
          revision: '3b802f98a475daa1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cfscript.56a5c994d7bb247a.js',
          revision: '56a5c994d7bb247a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_chaiscript.4cb93c72c7f45b5c.js',
          revision: '4cb93c72c7f45b5c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cil.5b7c91ae22e98890.js',
          revision: '5b7c91ae22e98890',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_clojure.2235896204338987.js',
          revision: '2235896204338987',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cmake.c1e9b0a269116970.js',
          revision: 'c1e9b0a269116970',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cobol.de615e51555c9941.js',
          revision: 'de615e51555c9941',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_coffeescript.f3375d30ed76524c.js',
          revision: 'f3375d30ed76524c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_concurnas.1a9ced41fdecb05e.js',
          revision: '1a9ced41fdecb05e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_coq.939c35c921d54008.js',
          revision: '939c35c921d54008',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cpp.703fb066d56999c6.js',
          revision: '703fb066d56999c6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_crystal.a4fc1b49aadfb3ff.js',
          revision: 'a4fc1b49aadfb3ff',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_csharp.526ff7f59a469b42.js',
          revision: '526ff7f59a469b42',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cshtml.dd519d2a7cf3a23a.js',
          revision: 'dd519d2a7cf3a23a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_csp.5b05ba342ad0ee3c.js',
          revision: '5b05ba342ad0ee3c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cssExtras.28c76bec59c0bcbf.js',
          revision: '28c76bec59c0bcbf',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_csv.99fb730cbc117293.js',
          revision: '99fb730cbc117293',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_cypher.201678c19f1e332c.js',
          revision: '201678c19f1e332c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_d.3b99f95e82d208e9.js',
          revision: '3b99f95e82d208e9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dart.f4e2f9055eb049c0.js',
          revision: 'f4e2f9055eb049c0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dataweave.de8a6ecd95901572.js',
          revision: 'de8a6ecd95901572',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dax.505235bfdaee5794.js',
          revision: '505235bfdaee5794',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dhall.a758f4890ca4f0af.js',
          revision: 'a758f4890ca4f0af',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_diff.6e77276f2144cb3d.js',
          revision: '6e77276f2144cb3d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_django.d5b32718f49f0ef7.js',
          revision: 'd5b32718f49f0ef7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dnsZoneFile.259d344b571426fe.js',
          revision: '259d344b571426fe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_docker.792b4d4c6f198f58.js',
          revision: '792b4d4c6f198f58',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_dot.51e92781eb92461c.js',
          revision: '51e92781eb92461c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ebnf.56c21e04b5dc12d2.js',
          revision: '56c21e04b5dc12d2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_editorconfig.60d86f47f273783a.js',
          revision: '60d86f47f273783a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_eiffel.f7aea1332ac71d77.js',
          revision: 'f7aea1332ac71d77',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ejs.2e438beb33927fd9.js',
          revision: '2e438beb33927fd9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_elixir.3d1d13f9d0843305.js',
          revision: '3d1d13f9d0843305',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_elm.90213dc18c2023b8.js',
          revision: '90213dc18c2023b8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_erb.a3187996003f5106.js',
          revision: 'a3187996003f5106',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_erlang.2fecfe3c7856d60a.js',
          revision: '2fecfe3c7856d60a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_etlua.6906ae1127b31012.js',
          revision: '6906ae1127b31012',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_excelFormula.62f66b52986db72f.js',
          revision: '62f66b52986db72f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_factor.180c7575509201a5.js',
          revision: '180c7575509201a5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_falselang.5728e4ef162a48af.js',
          revision: '5728e4ef162a48af',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_firestoreSecurityRules.d4f137ac0f5a1d0c.js',
          revision: 'd4f137ac0f5a1d0c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_flow.427ef40bf592d1c0.js',
          revision: '427ef40bf592d1c0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_fortran.1917cb1238ac86d8.js',
          revision: '1917cb1238ac86d8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_fsharp.d184b7a2effcd87c.js',
          revision: 'd184b7a2effcd87c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ftl.23039c6f434a3b9d.js',
          revision: '23039c6f434a3b9d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gap.27f2c0e2c08fbf14.js',
          revision: '27f2c0e2c08fbf14',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gcode.68f1f21610325276.js',
          revision: '68f1f21610325276',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gdscript.794084d57b695f7d.js',
          revision: '794084d57b695f7d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gedcom.eeebae051af27f7b.js',
          revision: 'eeebae051af27f7b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gherkin.2d2f76cd5209d1f4.js',
          revision: '2d2f76cd5209d1f4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_git.8527a1a5c29b8932.js',
          revision: '8527a1a5c29b8932',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_glsl.3ec822172a8e0dd5.js',
          revision: '3ec822172a8e0dd5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gml.8b299c8926f22f95.js',
          revision: '8b299c8926f22f95',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_gn.ec1653f3f7a0788d.js',
          revision: 'ec1653f3f7a0788d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_go.1c65d10509342818.js',
          revision: '1c65d10509342818',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_goModule.9d5b504c4d5ce556.js',
          revision: '9d5b504c4d5ce556',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_graphql.2761b8da3adaa757.js',
          revision: '2761b8da3adaa757',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_groovy.26336566ac98930c.js',
          revision: '26336566ac98930c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_haml.0ea0c0a16bd8e7eb.js',
          revision: '0ea0c0a16bd8e7eb',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_handlebars.6787b99bb6f6f3c7.js',
          revision: '6787b99bb6f6f3c7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_haskell.a57f6c590028ceb8.js',
          revision: 'a57f6c590028ceb8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_haxe.12c53fd6a65d1833.js',
          revision: '12c53fd6a65d1833',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hcl.c4be88af2a0f677c.js',
          revision: 'c4be88af2a0f677c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hlsl.609fdcf8a0d9126f.js',
          revision: '609fdcf8a0d9126f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hoon.e0a5b45a43c95f67.js',
          revision: 'e0a5b45a43c95f67',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hpkp.0b549a9b789139bc.js',
          revision: '0b549a9b789139bc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_hsts.6f28ed1a09740d4f.js',
          revision: '6f28ed1a09740d4f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_http.54e3869870272ec4.js',
          revision: '54e3869870272ec4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ichigojam.190da0291a2d011b.js',
          revision: '190da0291a2d011b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_icon.04ad5ff1b6f66d19.js',
          revision: '04ad5ff1b6f66d19',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_icuMessageFormat.901aa3dd98dbd9b1.js',
          revision: '901aa3dd98dbd9b1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_idris.f19bda977183a117.js',
          revision: 'f19bda977183a117',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_iecst.0263afff7811aecc.js',
          revision: '0263afff7811aecc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ignore.f18e57bc3d157a88.js',
          revision: 'f18e57bc3d157a88',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_inform7.c40bc329a08c19a9.js',
          revision: 'c40bc329a08c19a9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ini.3c3d00be3fe6525f.js',
          revision: '3c3d00be3fe6525f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_io.19da12d65f2e3297.js',
          revision: '19da12d65f2e3297',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_j.a5931621af48408b.js',
          revision: 'a5931621af48408b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_java.2d114dce3884b037.js',
          revision: '2d114dce3884b037',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_javadoc.409947a4c2d0f53d.js',
          revision: '409947a4c2d0f53d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_javadoclike.d399d8ba7a3f4c6c.js',
          revision: 'd399d8ba7a3f4c6c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_javastacktrace.266b5e6a8300daee.js',
          revision: '266b5e6a8300daee',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jexl.3c9a4d6050f62e4e.js',
          revision: '3c9a4d6050f62e4e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jolie.5008ab6234a7039e.js',
          revision: '5008ab6234a7039e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jq.f412f0a89d5ec4a3.js',
          revision: 'f412f0a89d5ec4a3',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsExtras.cb09d1db44fc77a5.js',
          revision: 'cb09d1db44fc77a5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsTemplates.7b060bdc236d896f.js',
          revision: '7b060bdc236d896f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsdoc.fa722bdab7042548.js',
          revision: 'fa722bdab7042548',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_json.66ddc3295184be19.js',
          revision: '66ddc3295184be19',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_json5.dfc1a2b7e1cd5190.js',
          revision: 'dfc1a2b7e1cd5190',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsonp.d10a70a57016a1b5.js',
          revision: 'd10a70a57016a1b5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsstacktrace.58acde9bf6c19f59.js',
          revision: '58acde9bf6c19f59',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_jsx.0bbd74cfc1d2d19d.js',
          revision: '0bbd74cfc1d2d19d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_julia.63b773e824f52d4c.js',
          revision: '63b773e824f52d4c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_keepalived.7681a442b1a1419a.js',
          revision: '7681a442b1a1419a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_keyman.efcd66fc458930e0.js',
          revision: 'efcd66fc458930e0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_kotlin.54fcb864060d25a9.js',
          revision: '54fcb864060d25a9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_kumir.643b3cd9211e4810.js',
          revision: '643b3cd9211e4810',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_kusto.f4e67395ce65482d.js',
          revision: 'f4e67395ce65482d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_latex.104ec70dc3853ab2.js',
          revision: '104ec70dc3853ab2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_latte.fe9872743f175746.js',
          revision: 'fe9872743f175746',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_less.d7bcd760383582b4.js',
          revision: 'd7bcd760383582b4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lilypond.0edee3c31f45b7e9.js',
          revision: '0edee3c31f45b7e9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_liquid.9dd016f147cf99dc.js',
          revision: '9dd016f147cf99dc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lisp.62913065ee5822d0.js',
          revision: '62913065ee5822d0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_livescript.f4d4976f363fb860.js',
          revision: 'f4d4976f363fb860',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_llvm.f5d90a76677907df.js',
          revision: 'f5d90a76677907df',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_log.87796e7c9cade3b2.js',
          revision: '87796e7c9cade3b2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lolcode.d91a553311167b7d.js',
          revision: 'd91a553311167b7d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_lua.25453027a628ff03.js',
          revision: '25453027a628ff03',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_magma.73e4d9129fcf9f1d.js',
          revision: '73e4d9129fcf9f1d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_makefile.1163e1aa126f0ef0.js',
          revision: '1163e1aa126f0ef0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_markdown.453e2e9876574cfd.js',
          revision: '453e2e9876574cfd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_markupTemplating.c90ba23ceb52ebe8.js',
          revision: 'c90ba23ceb52ebe8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_matlab.474ea5913afd53b5.js',
          revision: '474ea5913afd53b5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_maxscript.951979cc010d6264.js',
          revision: '951979cc010d6264',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mel.ecab9609764d32e2.js',
          revision: 'ecab9609764d32e2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mermaid.3d8ce456b423ada6.js',
          revision: '3d8ce456b423ada6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mizar.8eee3cf67af669e9.js',
          revision: '8eee3cf67af669e9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_mongodb.f7f65d5587a471fa.js',
          revision: 'f7f65d5587a471fa',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_monkey.708aea9eee647665.js',
          revision: '708aea9eee647665',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_moonscript.bbed894f34a6c887.js',
          revision: 'bbed894f34a6c887',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_n1ql.3cff3e6c366b7db2.js',
          revision: '3cff3e6c366b7db2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_n4js.34e6a2987cc383b4.js',
          revision: '34e6a2987cc383b4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nand2tetrisHdl.40c8278031b613a8.js',
          revision: '40c8278031b613a8',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_naniscript.11f694567a1f6089.js',
          revision: '11f694567a1f6089',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nasm.6b90866e4beb1aa4.js',
          revision: '6b90866e4beb1aa4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_neon.613bc39434ca0858.js',
          revision: '613bc39434ca0858',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nevod.7b88c55391b583ec.js',
          revision: '7b88c55391b583ec',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nginx.a7dc5ad3d57ff41c.js',
          revision: 'a7dc5ad3d57ff41c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nim.645c125842caea96.js',
          revision: '645c125842caea96',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nix.dba478de31a8d61d.js',
          revision: 'dba478de31a8d61d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_nsis.d7172c9fec5d7293.js',
          revision: 'd7172c9fec5d7293',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_objectivec.ca5a9a1b807de40e.js',
          revision: 'ca5a9a1b807de40e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ocaml.ca5b8129571c682a.js',
          revision: 'ca5b8129571c682a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_opencl.b0dde1cb4d5879d1.js',
          revision: 'b0dde1cb4d5879d1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_openqasm.b45c30296c9ff95a.js',
          revision: 'b45c30296c9ff95a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_oz.aa0c828b1254880e.js',
          revision: 'aa0c828b1254880e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_parigp.2ef794c7afad467e.js',
          revision: '2ef794c7afad467e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_parser.5d5199e25693ecd5.js',
          revision: '5d5199e25693ecd5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pascal.f092dae286c85a9c.js',
          revision: 'f092dae286c85a9c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pascaligo.175139d098fcfd9d.js',
          revision: '175139d098fcfd9d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pcaxis.e7f5d4c94e5e4ba1.js',
          revision: 'e7f5d4c94e5e4ba1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_peoplecode.fb128e9fc1165363.js',
          revision: 'fb128e9fc1165363',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_perl.c11ea27379900f51.js',
          revision: 'c11ea27379900f51',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_php.6306ebcba1f967d2.js',
          revision: '6306ebcba1f967d2',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_phpExtras.167e521572d0646f.js',
          revision: '167e521572d0646f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_phpdoc.4d07e2e7dc8fb935.js',
          revision: '4d07e2e7dc8fb935',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_plsql.b189d6190fc45238.js',
          revision: 'b189d6190fc45238',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_powerquery.2fba50cfe6402193.js',
          revision: '2fba50cfe6402193',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_powershell.39894aa646226b9d.js',
          revision: '39894aa646226b9d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_processing.b66e4fe1e3527644.js',
          revision: 'b66e4fe1e3527644',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_prolog.e5dab88e99302bbe.js',
          revision: 'e5dab88e99302bbe',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_promql.987d17b722c2a112.js',
          revision: '987d17b722c2a112',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_properties.cd9ff4f8fc1d7075.js',
          revision: 'cd9ff4f8fc1d7075',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_protobuf.79fb055c6d4cfd7d.js',
          revision: '79fb055c6d4cfd7d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_psl.4c7cf912b8b08d4d.js',
          revision: '4c7cf912b8b08d4d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pug.e2defeab21d2101c.js',
          revision: 'e2defeab21d2101c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_puppet.50a5d36ea49eae14.js',
          revision: '50a5d36ea49eae14',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_pure.7afd7eaacd08ba41.js',
          revision: '7afd7eaacd08ba41',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_purebasic.fffc1468a3b038fa.js',
          revision: 'fffc1468a3b038fa',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_purescript.20822c4c8740029c.js',
          revision: '20822c4c8740029c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_python.134b324841c51189.js',
          revision: '134b324841c51189',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_q.817166617d2e64af.js',
          revision: '817166617d2e64af',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_qml.ca94e0e3ab898392.js',
          revision: 'ca94e0e3ab898392',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_qore.e826a001f285903b.js',
          revision: 'e826a001f285903b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_qsharp.4ad4b33b44521b41.js',
          revision: '4ad4b33b44521b41',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_r.650bb132dd2e021d.js',
          revision: '650bb132dd2e021d',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_racket.7f1de387bb4529be.js',
          revision: '7f1de387bb4529be',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_reason.da4313ca0339b568.js',
          revision: 'da4313ca0339b568',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_regex.d78d246202659aab.js',
          revision: 'd78d246202659aab',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rego.582aecfb50a55b55.js',
          revision: '582aecfb50a55b55',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_renpy.d5ba4e4c218e2294.js',
          revision: 'd5ba4e4c218e2294',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rest.f025ad850c7797ea.js',
          revision: 'f025ad850c7797ea',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rip.143f1c20921ffb51.js',
          revision: '143f1c20921ffb51',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_roboconf.9291d741cac4f9a4.js',
          revision: '9291d741cac4f9a4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_robotframework.a7190dc7482a2211.js',
          revision: 'a7190dc7482a2211',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_ruby.93b15b1d9785a386.js',
          revision: '93b15b1d9785a386',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_rust.47cdafc369b45b9c.js',
          revision: '47cdafc369b45b9c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sas.fc2bf052f0d46cd4.js',
          revision: 'fc2bf052f0d46cd4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sass.e52c041676b76a90.js',
          revision: 'e52c041676b76a90',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_scala.394d5af5ab469a0a.js',
          revision: '394d5af5ab469a0a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_scheme.63ddc7cb72c52f40.js',
          revision: '63ddc7cb72c52f40',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_scss.8ab6dfab552306fc.js',
          revision: '8ab6dfab552306fc',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_shellSession.7a05c5c36cc5a762.js',
          revision: '7a05c5c36cc5a762',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_smali.bcd59a62ee9f2185.js',
          revision: 'bcd59a62ee9f2185',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_smalltalk.19791a2094f78d7b.js',
          revision: '19791a2094f78d7b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_smarty.c012415a05d47eec.js',
          revision: 'c012415a05d47eec',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sml.d1aad88e947dcd1f.js',
          revision: 'd1aad88e947dcd1f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_solidity.874dcd7ca0b897d4.js',
          revision: '874dcd7ca0b897d4',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_solutionFile.7d1cdefb685a8805.js',
          revision: '7d1cdefb685a8805',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_soy.2c5494b80666985f.js',
          revision: '2c5494b80666985f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sparql.05cf035ffb373d64.js',
          revision: '05cf035ffb373d64',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_splunkSpl.1573735beae747b7.js',
          revision: '1573735beae747b7',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sqf.09661b9d5c902719.js',
          revision: '09661b9d5c902719',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_sql.426185c4295eb5c5.js',
          revision: '426185c4295eb5c5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_squirrel.a82d63420bbf874f.js',
          revision: 'a82d63420bbf874f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_stan.9c229a818f0c4629.js',
          revision: '9c229a818f0c4629',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_stylus.6b5e9f92c185d960.js',
          revision: '6b5e9f92c185d960',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_swift.c3cc547c704dad83.js',
          revision: 'c3cc547c704dad83',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_systemd.a1115ad35ebfe856.js',
          revision: 'a1115ad35ebfe856',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_t4Cs.6e213bcb80a5cc66.js',
          revision: '6e213bcb80a5cc66',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_t4Templating.98115e2449b05e33.js',
          revision: '98115e2449b05e33',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_t4Vb.ae26a429464d784e.js',
          revision: 'ae26a429464d784e',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tap.4e6f61a41f8bd7ec.js',
          revision: '4e6f61a41f8bd7ec',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tcl.1ad245e0340b4928.js',
          revision: '1ad245e0340b4928',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_textile.25df3f59d446c966.js',
          revision: '25df3f59d446c966',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_toml.e486b91ee672d4e0.js',
          revision: 'e486b91ee672d4e0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tremor.cdfba57059667fb1.js',
          revision: 'cdfba57059667fb1',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tsx.96e4495ce7bbdcef.js',
          revision: '96e4495ce7bbdcef',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_tt2.a117152849ca84b9.js',
          revision: 'a117152849ca84b9',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_turtle.2da360113fbec0bd.js',
          revision: '2da360113fbec0bd',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_twig.28b7bae9d6486f8a.js',
          revision: '28b7bae9d6486f8a',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_typescript.d49bd03ea0a2319c.js',
          revision: 'd49bd03ea0a2319c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_typoscript.d289efd679f36284.js',
          revision: 'd289efd679f36284',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_unrealscript.34e3518f3dffd741.js',
          revision: '34e3518f3dffd741',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_uorazor.99f6e050578bda07.js',
          revision: '99f6e050578bda07',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_uri.f1abb896447a8e6c.js',
          revision: 'f1abb896447a8e6c',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_v.b78c980f498d3f78.js',
          revision: 'b78c980f498d3f78',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vala.c2d4015da8fda323.js',
          revision: 'c2d4015da8fda323',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vbnet.247bbab478c06ab6.js',
          revision: '247bbab478c06ab6',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_velocity.0dc839a3fce58f7b.js',
          revision: '0dc839a3fce58f7b',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_verilog.4bb5f4364f4c0aee.js',
          revision: '4bb5f4364f4c0aee',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vhdl.26d20d80fc5cbb81.js',
          revision: '26d20d80fc5cbb81',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_vim.f1bb5381be2fb734.js',
          revision: 'f1bb5381be2fb734',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_visualBasic.a79b967857dad274.js',
          revision: 'a79b967857dad274',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_warpscript.39216e7bba9da7af.js',
          revision: '39216e7bba9da7af',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wasm.17fb0e4a422ddd20.js',
          revision: '17fb0e4a422ddd20',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_webIdl.b3c9c8cbabba83e5.js',
          revision: 'b3c9c8cbabba83e5',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wiki.dbe3c37a50e52966.js',
          revision: 'dbe3c37a50e52966',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wolfram.633c94ae8be1c1b0.js',
          revision: '633c94ae8be1c1b0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_wren.c5bddb9af707dfe0.js',
          revision: 'c5bddb9af707dfe0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xeora.1410ae8d1e1ab0c0.js',
          revision: '1410ae8d1e1ab0c0',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xmlDoc.8c9e8b124adb8e95.js',
          revision: '8c9e8b124adb8e95',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xojo.bc11575aea5dd14f.js',
          revision: 'bc11575aea5dd14f',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_xquery.b333035773ad1a42.js',
          revision: 'b333035773ad1a42',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_yaml.119673f876fe71ef.js',
          revision: '119673f876fe71ef',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_yang.a8856f37571c6843.js',
          revision: 'a8856f37571c6843',
        },
        {
          url: '/_next/static/chunks/react-syntax-highlighter_languages_refractor_zig.5889bcffc4a6b340.js',
          revision: '5889bcffc4a6b340',
        },
        {
          url: '/_next/static/chunks/webpack-8749fcb38596772c.js',
          revision: 'OxH9dAIUVY_CbbCmp9cHo',
        },
        {
          url: '/_next/static/css/628765f20b848f76.css',
          revision: '628765f20b848f76',
        },
        {
          url: '/_next/static/css/e4192e476a0b17a9.css',
          revision: 'e4192e476a0b17a9',
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
