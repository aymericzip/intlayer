<script setup lang="ts">
import { ref } from 'vue';
import { useIntlayer } from 'vue-intlayer';

defineProps({
  msg: String,
});

const content = useIntlayer('hello-world');
// const { mdTest } = content;
const countRef = ref(0);

// console.log('test1', content?.value.mdTest);
// console.log('test2', content?.mdTest.markdown);
</script>

<template>
  <div class="card">
    <button type="button" @click="countRef++">
      <content.count />
      {{ countRef }}
    </button>
    <p v-html="content.edit"></p>
  </div>

  <!-- works -->
  <!-- {{ JSON.stringify(content.mdTest) }}
  {{ JSON.stringify(mdTest) }} -->
  {{ content.mdTest }}

  <p>
    <content.checkOut />
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >,
    <content.officialStarter />
  </p>
  <p>
    <content.learnMore />
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      ><content.vueDocs /></a
    >.
  </p>
  <p class="read-the-docs"><content.readTheDocs /></p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
