<script setup>
import { ref } from 'vue';
import { useIntlayer } from 'vue-intlayer';

defineProps({
  msg: String,
});

const content = useIntlayer('helloworld');
const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">
      {{ content.count }}{{ count }}
    </button>
    <p v-html="content.edit.value"></p>
  </div>

  <p>
    {{ content.checkOut }}
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, {{ content.officialStarter }}
  </p>
  <p>
    {{ content.learnMore }}
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >{{ content.vueDocs }}</a
    >.
  </p>
  <p class="read-the-docs">{{ content.readTheDocs }}</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
