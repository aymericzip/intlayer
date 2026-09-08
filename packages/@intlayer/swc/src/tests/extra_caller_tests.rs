//! Call-site rewriting for compat-adapter callers declared through
//! `extraCallers`.

use crate::tests::support::{
    get_config_with_extra_callers, use_i18n_caller, use_lingui_caller, use_translation_caller,
    use_translations_caller, TestFolder,
};
use swc_core::ecma::{parser::Syntax, transforms::testing::test_transform};

#[test]
fn extra_caller_positional_static() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config_with_extra_callers("static", vec![use_translation_caller()]),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation("about", { keyPrefix: "counter" });
        "#,
        r#"
        import _5sczV2UpZbQ from "../.intlayer/dictionaries/about.json" with { type: "json" };
        import { useDictionary as useTranslation } from "react-i18next";
        const { t } = useTranslation(_5sczV2UpZbQ, { keyPrefix: "counter" });
        "#,
    );
}

#[test]
fn extra_caller_nested_namespace_static() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config_with_extra_callers("static", vec![use_translation_caller()]),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation("about.counter");
        "#,
        r#"
        import _5sczV2UpZbQ from "../.intlayer/dictionaries/about.json" with { type: "json" };
        import { useDictionary as useTranslation } from "react-i18next";
        const { t } = useTranslation(_5sczV2UpZbQ, "counter");
        "#,
    );
}

#[test]
fn extra_caller_positional_dynamic() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config_with_extra_callers("dynamic", vec![use_translation_caller()]),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation("about.counter");
        "#,
        r#"
        import _5sczV2UpZbQ_dyn from "../.intlayer/dynamic_dictionaries/about.mjs";
        import { useDictionaryDynamic as useTranslation } from "react-i18next";
        const { t } = useTranslation(_5sczV2UpZbQ_dyn, "about", "counter");
        "#,
    );
}

#[test]
fn extra_caller_option_namespace_static() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config_with_extra_callers("static", vec![use_i18n_caller()]),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useI18n } from "vue-i18n";
        const { t } = useI18n({ namespace: "about.counter", useScope: "global" });
        "#,
        r#"
        import _5sczV2UpZbQ from "../.intlayer/dictionaries/about.json" with { type: "json" };
        import { useDictionary as useI18n } from "vue-i18n";
        const { t } = useI18n(_5sczV2UpZbQ, { namespace: "counter", useScope: "global" });
        "#,
    );
}

#[test]
fn extra_caller_option_namespace_dropped_when_plain() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config_with_extra_callers("static", vec![use_i18n_caller()]),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useI18n } from "vue-i18n";
        const { t } = useI18n({ namespace: "about" });
        "#,
        r#"
        import _5sczV2UpZbQ from "../.intlayer/dictionaries/about.json" with { type: "json" };
        import { useDictionary as useI18n } from "vue-i18n";
        const { t } = useI18n(_5sczV2UpZbQ, {});
        "#,
    );
}

#[test]
fn extra_caller_fixed_namespace_static() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config_with_extra_callers("static", vec![use_lingui_caller()]),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useLingui } from "@lingui/react";
        const { t } = useLingui();
        "#,
        r#"
        import _7f0actFUfv4 from "../.intlayer/dictionaries/messages.json" with { type: "json" };
        import { useDictionary as useLingui } from "@lingui/react";
        const { t } = useLingui(_7f0actFUfv4);
        "#,
    );
}

#[test]
fn extra_caller_unresolvable_namespace_keeps_original() {
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config_with_extra_callers("static", vec![use_translation_caller()]),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation("about");
        const { t: tDynamic } = useTranslation(namespace);
        "#,
        r#"
        import { useTranslation } from "react-i18next";
        const { t } = useTranslation("about");
        const { t: tDynamic } = useTranslation(namespace);
        "#,
    );
}

#[test]
fn namespace_less_call_is_left_untouched() {
    // The optimize pass binds a dictionary from a namespace argument only. A
    // bare `useTranslations()` has none, so the call keeps resolving through
    // the runtime registry.
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config_with_extra_callers("static", vec![use_translations_caller()]),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useTranslations } from "next-intl";
        const Footer = () => {
            const t = useTranslations();
            return t("footer.github");
        };
        "#,
        r#"
        import { useTranslations } from "next-intl";
        const Footer = () => {
            const t = useTranslations();
            return t("footer.github");
        };
        "#,
    );
}

#[test]
fn namespace_less_call_keeps_its_scoped_sibling_unrewritten() {
    // One import specifier serves every call in the file, so a single
    // unresolvable call site has to hold back the scoped calls too — otherwise
    // the re-pointed helper would receive the raw `"about"` string.
    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: get_config_with_extra_callers("static", vec![use_translations_caller()]),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useTranslations } from "next-intl";
        const bare = useTranslations();
        const scoped = useTranslations("about");
        "#,
        r#"
        import { useTranslations } from "next-intl";
        const bare = useTranslations();
        const scoped = useTranslations("about");
        "#,
    );
}
