<script setup lang="ts">
import { ref } from 'vue';
import { useIntlayer } from 'vue-intlayer';

defineProps({
  msg: String,
});

const {
  count,
  mdTest,
  edit,
  checkOut,
  officialStarter,
  learnMore,
  readTheDocs,
  vueDocs,
} = useIntlayer('hello-world');
const countRef = ref(0);
</script>

<template>
  <div class="card">
    <button type="button" @click="countRef++">
      <count />
      {{ countRef }}
    </button>
    <p v-html="edit"></p>
  </div>

  <mdTest />

  <p>
    <checkOut />
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >,
    <officialStarter />
  </p>
  <p>
    <learnMore />
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      ><vueDocs /></a
    >.
  </p>
  <p class="read-the-docs"><readTheDocs /></p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
