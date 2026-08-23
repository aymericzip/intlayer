//! Call-site and import rewriting for the native `useIntlayer` / `getIntlayer`
//! callers.

use crate::tests::support::{get_config, TestFolder};
use swc_core::ecma::{parser::Syntax, transforms::testing::test_transform};

#[test]
fn static_import() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("static"),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
        r#"
        import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
        import { useDictionary as useIntlayer } from "react-intlayer";
        const t = useIntlayer(_FsHhNfuhm85);
        "#,
    );
}

#[test]
fn dynamic_import() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("dynamic"),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
        r#"
        import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
        import { useDictionaryDynamic as useIntlayer } from "react-intlayer";
        const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
        "#,
    );
}

#[test]
fn fetch_import() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("fetch"),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
        r#"
        import _FsHhNfuhm85_fetch from "../.intlayer/fetch_dictionaries/locale-switcher.mjs";
        import { useDictionaryDynamic as useIntlayer } from "react-intlayer";
        const t = useIntlayer(_FsHhNfuhm85_fetch, "locale-switcher");
        "#,
    );
}

#[test]
fn svelte_static_import() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("static"),
            filename: "/app/src/page.svelte".to_string(),
        },
        r#"
        import { useIntlayer } from "svelte-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
        r#"
        import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
        import { useDictionary as useIntlayer } from "svelte-intlayer";
        const t = useIntlayer(_FsHhNfuhm85);
        "#,
    );
}

#[test]
fn svelte_dynamic_import() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("dynamic"),
            filename: "/app/src/page.svelte".to_string(),
        },
        r#"
        import { useIntlayer } from "svelte-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
        r#"
        import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
        import { useDictionaryDynamic as useIntlayer } from "svelte-intlayer";
        const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
        "#,
    );
}

#[test]
fn vue_static_import() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("static"),
            filename: "/app/src/page.vue".to_string(),
        },
        r#"
        import { useIntlayer } from "vue-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
        r#"
        import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
        import { useDictionary as useIntlayer } from "vue-intlayer";
        const t = useIntlayer(_FsHhNfuhm85);
        "#,
    );
}

#[test]
fn vue_dynamic_import() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("dynamic"),
            filename: "/app/src/page.vue".to_string(),
        },
        r#"
        import { useIntlayer } from "vue-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
        r#"
        import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
        import { useDictionaryDynamic as useIntlayer } from "vue-intlayer";
        const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
        "#,
    );
}

#[test]
fn nesting_dictionary_uses_companion_module() {
    let mut cfg = get_config("static");
    cfg.nesting_dictionary_keys = vec!["dashboard".to_string()];

    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: cfg.clone(),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("dashboard");
        "#,
        r#"
        import _CmH1DEyhuop from "../.intlayer/dictionaries/nested/dashboard.mjs";
        import { useDictionary as useIntlayer } from "react-intlayer";
        const t = useIntlayer(_CmH1DEyhuop);
        "#,
    );
}

#[test]
fn dictionaries_entry_is_emptied() {
    let mut cfg = get_config("static");
    cfg.replace_dictionary_entry = Some(true);

    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: cfg.clone(),
            filename: "/app/.intlayer/dictionaries.mjs".to_string(),
        },
        r#"
        import about from "./dictionaries/about.json";
        export default { about };
        export const getDictionaries = () => ({ about });
        "#,
        r#"
        export default {};
        export const getDictionaries = () => ({});
        "#,
    );
}

#[test]
fn file_outside_files_list_is_skipped() {
    let mut cfg = get_config("static");
    cfg.files_list = vec!["/app/src/other.tsx".to_string()];

    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: cfg.clone(),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
    );
}

#[test]
fn per_dictionary_mode_overrides_global_static_mode() {
    let mut cfg = get_config("static");
    cfg.dictionary_mode_map = Some(
        [("locale-switcher".to_string(), "dynamic".to_string())]
            .into_iter()
            .collect(),
    );

    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: cfg.clone(),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
        r#"
        import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
        import { useDictionaryDynamic as useIntlayer } from "react-intlayer";
        const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
        "#,
    );
}

#[test]
fn dictionary_key_holding_a_dot_is_not_split() {
    // Native callers look the dictionary up by the exact key string, so
    // `nav.links` is one dictionary — not the `links` field of `nav`.
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("static"),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("nav.links");
        "#,
        r#"
        import _Dqs1XYu9UEF from "../.intlayer/dictionaries/nav.links.json" with { type: "json" };
        import { useDictionary as useIntlayer } from "react-intlayer";
        const t = useIntlayer(_Dqs1XYu9UEF);
        "#,
    );
}

#[test]
fn package_without_dynamic_helper_stays_static_in_dynamic_mode() {
    // `intlayer` exports no `useDictionaryDynamic`, so its calls keep the
    // static helper even though the sibling `react-intlayer` import goes
    // dynamic. The two decisions are taken per package, never per file.
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("dynamic"),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useIntlayer } from "react-intlayer";
        import { useIntlayer as useCoreIntlayer } from "intlayer";
        const t = useIntlayer("locale-switcher");
        const c = useCoreIntlayer("about");
        "#,
        r#"
        import _5sczV2UpZbQ from "../.intlayer/dictionaries/about.json" with { type: "json" };
        import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
        import { useDictionaryDynamic as useIntlayer } from "react-intlayer";
        import { useDictionary as useCoreIntlayer } from "intlayer";
        const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
        const c = useCoreIntlayer(_5sczV2UpZbQ);
        "#,
    );
}

#[test]
fn import_declared_after_the_call_still_drives_the_helper_choice() {
    // The helper family is resolved by the pre-pass, so a call preceding its
    // own import declaration is rewritten exactly like one following it.
    let mut cfg = get_config("static");
    cfg.dictionary_mode_map = Some(
        [("locale-switcher".to_string(), "dynamic".to_string())]
            .into_iter()
            .collect(),
    );

    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: cfg.clone(),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        export const t = useIntlayer("locale-switcher");
        import { useIntlayer } from "react-intlayer";
        "#,
        r#"
        import _FsHhNfuhm85_dyn from "../.intlayer/dynamic_dictionaries/locale-switcher.mjs";
        export const t = useIntlayer(_FsHhNfuhm85_dyn, "locale-switcher");
        import { useDictionaryDynamic as useIntlayer } from "react-intlayer";
        "#,
    );
}

#[test]
fn use_client_directive_stays_first() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("static"),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        "use client";
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
        r#"
        "use client";
        import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
        import { useDictionary as useIntlayer } from "react-intlayer";
        const t = useIntlayer(_FsHhNfuhm85);
        "#,
    );
}

#[test]
fn whole_directive_prologue_stays_first() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("static"),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        "use strict";
        "use client";
        import { useIntlayer } from "react-intlayer";
        const t = useIntlayer("locale-switcher");
        "#,
        r#"
        "use strict";
        "use client";
        import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
        import { useDictionary as useIntlayer } from "react-intlayer";
        const t = useIntlayer(_FsHhNfuhm85);
        "#,
    );
}

#[test]
fn get_intlayer_async_reads_the_per_locale_loader_in_static_mode() {
    // Loading a single locale is what the async getter exists for, so it reads
    // a dynamic loader even though the file is in static mode.
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("static"),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { getIntlayerAsync } from "intlayer";
        export const load = async (locale) => await getIntlayerAsync("about", locale);
        "#,
        r#"
        import _5sczV2UpZbQ_dyn from "../.intlayer/dynamic_dictionaries/about.mjs";
        import { getDictionaryAsync as getIntlayerAsync } from "intlayer";
        export const load = async (locale) => await getIntlayerAsync(_5sczV2UpZbQ_dyn, "about", locale);
        "#,
    );
}

#[test]
fn get_intlayer_async_reads_the_per_locale_loader_in_dynamic_mode() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("dynamic"),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { getIntlayerAsync } from "intlayer";
        export const load = async (locale) => await getIntlayerAsync("about", locale);
        "#,
        r#"
        import _5sczV2UpZbQ_dyn from "../.intlayer/dynamic_dictionaries/about.mjs";
        import { getDictionaryAsync as getIntlayerAsync } from "intlayer";
        export const load = async (locale) => await getIntlayerAsync(_5sczV2UpZbQ_dyn, "about", locale);
        "#,
    );
}

#[test]
fn get_intlayer_async_reads_the_fetch_loader_for_a_fetch_dictionary() {
    let mut cfg = get_config("static");
    cfg.dictionary_mode_map = Some(
        [("about".to_string(), "fetch".to_string())]
            .into_iter()
            .collect(),
    );

    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: cfg.clone(),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { getIntlayerAsync } from "intlayer";
        export const load = async (locale) => await getIntlayerAsync("about", locale);
        "#,
        r#"
        import _5sczV2UpZbQ_fetch from "../.intlayer/fetch_dictionaries/about.mjs";
        import { getDictionaryAsync as getIntlayerAsync } from "intlayer";
        export const load = async (locale) => await getIntlayerAsync(_5sczV2UpZbQ_fetch, "about", locale);
        "#,
    );
}

#[test]
fn get_intlayer_async_leaves_a_sibling_get_intlayer_call_static() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config("static"),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { getIntlayer, getIntlayerAsync } from "intlayer";
        const c = getIntlayer("locale-switcher");
        export const load = async (locale) => await getIntlayerAsync("about", locale);
        "#,
        r#"
        import _FsHhNfuhm85 from "../.intlayer/dictionaries/locale-switcher.json" with { type: "json" };
        import _5sczV2UpZbQ_dyn from "../.intlayer/dynamic_dictionaries/about.mjs";
        import { getDictionary as getIntlayer, getDictionaryAsync as getIntlayerAsync } from "intlayer";
        const c = getIntlayer(_FsHhNfuhm85);
        export const load = async (locale) => await getIntlayerAsync(_5sczV2UpZbQ_dyn, "about", locale);
        "#,
    );
}
