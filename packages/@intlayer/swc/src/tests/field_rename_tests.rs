//! Source-side content field renaming (the `build.minify` counterpart).

use crate::{
    config::FieldRenameMap,
    tests::support::{
        branch, field_rename_map_for, get_config, leaf, FieldRenameFolder, TestFolder,
    },
};
use std::collections::BTreeMap;
use swc_core::ecma::{parser::Syntax, transforms::testing::test_transform};

/// Rename table of a dictionary named `about`, shaped like one the JavaScript
/// minify pipeline produces: fields sorted alphabetically, aliases assigned in
/// that order, arrays and leaves carrying no children.
fn about_rename_map() -> BTreeMap<String, FieldRenameMap> {
    field_rename_map_for(
        "about",
        vec![
            ("list", leaf("a")),
            (
                "section",
                branch("b", vec![("subtitle", leaf("a")), ("title", leaf("b"))]),
            ),
            ("subtitle", leaf("c")),
            ("title", leaf("d")),
        ],
    )
}

/// Runs only the field-rename pass, so expectations stay free of the optimize
/// transform's injected imports.
fn test_rename(input: &str, expected: &str) {
    test_transform(
        Syntax::default(),
        None,
        |_| FieldRenameFolder {
            field_rename_map: about_rename_map(),
        },
        input,
        expected,
    );
}

#[test]
fn renames_destructured_fields() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const { title, subtitle } = useIntlayer("about");
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const { d: title, c: subtitle } = useIntlayer("about");
        "#,
    );
}

#[test]
fn renames_destructured_field_with_local_alias_and_default() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const { title: heading, subtitle = "none" } = useIntlayer("about");
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const { d: heading, c: subtitle = "none" } = useIntlayer("about");
        "#,
    );
}

#[test]
fn renames_direct_member_access_on_the_call() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const heading = useIntlayer("about").title;
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const heading = useIntlayer("about").d;
        "#,
    );
}

#[test]
fn renames_accesses_through_a_plain_variable() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content.title, content.section.subtitle);
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content.d, content.b.a);
        "#,
    );
}

#[test]
fn renames_accesses_through_a_signal_accessor() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content().title);
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content().d);
        "#,
    );
}

#[test]
fn renames_secondary_destructuring() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const { section } = useIntlayer("about");
        const { title } = section;
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const { b: section } = useIntlayer("about");
        const { b: title } = section;
        "#,
    );
}

#[test]
fn renames_nested_destructuring_pattern() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const { section: { title, subtitle } } = useIntlayer("about");
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const { b: { b: title, a: subtitle } } = useIntlayer("about");
        "#,
    );
}

#[test]
fn renames_through_an_intermediate_member_binding() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        const section = content.section;
        console.log(section.title);
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        const section = content.b;
        console.log(section.b);
        "#,
    );
}

#[test]
fn numeric_index_access_is_transparent() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content.list[0]);
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content.a[0]);
        "#,
    );
}

#[test]
fn renames_static_computed_string_access() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content["title"]);
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content["d"]);
        "#,
    );
}

#[test]
fn renames_optional_chain_access() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content?.section?.title);
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content?.b?.b);
        "#,
    );
}

#[test]
fn renames_through_an_aliased_caller_import() {
    test_rename(
        r#"
        import { useIntlayer as useContent } from "react-intlayer";
        const { title } = useContent("about");
        "#,
        r#"
        import { useIntlayer as useContent } from "react-intlayer";
        const { d: title } = useContent("about");
        "#,
    );
}

#[test]
fn renames_get_intlayer_call_sites() {
    test_rename(
        r#"
        import { getIntlayer } from "intlayer";
        const { title } = getIntlayer("about");
        "#,
        r#"
        import { getIntlayer } from "intlayer";
        const { d: title } = getIntlayer("about");
        "#,
    );
}

#[test]
fn dynamic_computed_access_stops_the_chain() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content[fieldName].title);
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content[fieldName].title);
        "#,
    );
}

#[test]
fn unknown_fields_are_left_untouched() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content.unknownField, content.title);
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content.unknownField, content.d);
        "#,
    );
}

#[test]
fn dictionary_absent_from_the_rename_map_is_left_untouched() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const { title } = useIntlayer("contact");
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const { title } = useIntlayer("contact");
        "#,
    );
}

#[test]
fn unrelated_objects_are_left_untouched() {
    test_rename(
        r#"
        import { useIntlayer } from "react-intlayer";
        const other = { title: "kept" };
        console.log(other.title);
        "#,
        r#"
        import { useIntlayer } from "react-intlayer";
        const other = { title: "kept" };
        console.log(other.title);
        "#,
    );
}

#[test]
fn field_rename_runs_before_the_optimize_transform() {
    let cfg = crate::PluginConfig {
        field_rename_map: about_rename_map(),
        ..get_config("static")
    };

    test_transform(
        Syntax::default(),
        None,
        |_| TestFolder {
            cfg: cfg.clone(),
            filename: "/app/src/page.tsx".to_string(),
        },
        r#"
        import { useIntlayer } from "react-intlayer";
        const content = useIntlayer("about");
        console.log(content.title);
        "#,
        r#"
        import _5sczV2UpZbQ from "../.intlayer/dictionaries/about.json" with { type: "json" };
        import { useDictionary as useIntlayer } from "react-intlayer";
        const content = useIntlayer(_5sczV2UpZbQ);
        console.log(content.d);
        "#,
    );
}

#[test]
fn renames_fields_read_through_an_awaited_async_getter() {
    // `getIntlayerAsync` hands its content back through an `await`, which the
    // rename walk must look through exactly like a parenthesis.
    test_rename(
        r#"
        import { getIntlayerAsync } from "intlayer";
        export const load = async (locale) => {
            const { title, subtitle } = await getIntlayerAsync("about", locale);
            return title + subtitle;
        };
        "#,
        r#"
        import { getIntlayerAsync } from "intlayer";
        export const load = async (locale) => {
            const { d: title, c: subtitle } = await getIntlayerAsync("about", locale);
            return title + subtitle;
        };
        "#,
    );
}

#[test]
fn renames_member_access_on_an_awaited_async_getter() {
    test_rename(
        r#"
        import { getIntlayerAsync } from "intlayer";
        export const load = async (locale) => (await getIntlayerAsync("about", locale)).section.title;
        "#,
        r#"
        import { getIntlayerAsync } from "intlayer";
        export const load = async (locale) => (await getIntlayerAsync("about", locale)).b.b;
        "#,
    );
}
