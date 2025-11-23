<script lang="ts">
export let title: string;
export const color: string | undefined = undefined;
</script>

<div>
  <h1 style:color>{title}</h1>
  <h1>Hello World 2 (should be extracted)</h1>
  <p>This is a test 2 (should be extracted)</p>
</div>

