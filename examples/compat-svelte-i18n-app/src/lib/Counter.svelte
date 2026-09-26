<script lang="ts">
import { _ } from 'svelte-i18n';

let count: number = $state(0);
const increment = () => {
  count += 1;
};
</script>

<button onclick={increment}>
  {$_('home.countIs', { values: { count } })}
</button>
