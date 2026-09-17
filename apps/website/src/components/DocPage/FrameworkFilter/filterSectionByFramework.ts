/** The minimal shape of a navigation node the framework filter can walk. */
export type FrameworkFilterableNode<Node> = {
  default?: unknown;
  /** Framework keys this node applies to. If absent, inherits the parent's. */
  frameworks?: string[];
  subSections?: Record<string, Node>;
};

/**
 * Recursively filters a section map, hiding nodes that don't match the active
 * framework filter. Sub-sections are also filtered.
 *
 * It uses contextual inheritance:
 * - If a node has the `frameworks` key, its visibility is determined solely by that field.
 * - If a node LACKS the `frameworks` key, it inherits the visibility state of its parent.
 * - If the parent is hidden, matching child nodes are "promoted" to the parent's level.
 *
 * @param section - Section map to filter.
 * @param filter - Selected framework ids, or `null` meaning "All".
 */
export const filterSectionByFramework = <
  Node extends FrameworkFilterableNode<Node>,
>(
  section: Record<string, Node>,
  filter: string[] | null,
  parentMatches = true,
  depth = 0,
  inheritedFrameworks?: string[]
): Record<string, Node> => {
  if (!filter) return section;

  const entries = Object.entries(section).flatMap(
    ([key, data]): [string, Node][] => {
      const sectionHasTags = !!data.frameworks;
      const matchesExplicitly =
        filter?.every((f) => data.frameworks?.includes(f)) ?? false;
      const matches = sectionHasTags ? matchesExplicitly : parentMatches;

      // Determine the framework tags to use (original or inherited)
      const currentFrameworks = sectionHasTags
        ? data.frameworks
        : inheritedFrameworks;

      // 1. Skip non-matching section, but promote its children that might match
      if (!matches) {
        return data.subSections
          ? Object.entries(
              filterSectionByFramework(
                data.subSections,
                filter,
                false,
                depth + 1,
                currentFrameworks
              )
            )
          : [];
      }

      // 2. Filter subsections
      const filteredSubSections = data.subSections
        ? filterSectionByFramework(
            data.subSections,
            filter,
            true,
            depth + 1,
            currentFrameworks
          )
        : undefined;

      const hasVisibleContent =
        Boolean(data.default) ||
        (filteredSubSections && Object.keys(filteredSubSections).length > 0);

      if (!hasVisibleContent) return [];

      const dataWithFrameworks: Node = {
        ...data,
        frameworks: currentFrameworks,
        subSections: filteredSubSections,
      };

      // 3. Apply flattening and unwrapping
      // We skip these rules for root categories (depth 0) to maintain top-level structure
      if (depth > 0) {
        // Rule A: Flatten categories with no content (promote matching children)
        // We only flatten if there is exactly ONE sub-section to avoid breaking multiple-item groups (like Releases)
        if (
          !data.default &&
          filteredSubSections &&
          Object.keys(filteredSubSections).length === 1
        ) {
          return Object.entries(filteredSubSections);
        }

        // Rule B: If this section explicitly matches the framework, unwrap its subsections as siblings
        // We do this to provide a flat list of pages for the selected framework context
        if (matchesExplicitly && filteredSubSections) {
          return [
            [key, { ...dataWithFrameworks, subSections: undefined }],
            ...Object.entries(filteredSubSections),
          ];
        }
      }

      // Default: Keep the section and its (already populated) sub-sections
      return [[key, dataWithFrameworks]];
    }
  );

  return Object.fromEntries(entries);
};
