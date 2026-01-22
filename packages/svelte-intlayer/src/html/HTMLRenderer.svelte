<script lang="ts">
import { getHTMLContext } from './context';

export let value: string;
export const components: Record<string, any> | undefined = undefined;

const context = getHTMLContext();

$: htmlContent = context.renderHTML(value, {
  components,
});
</script>

{@html htmlContent}
