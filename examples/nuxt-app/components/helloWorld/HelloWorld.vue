<script setup lang="ts">
import { ref } from 'vue';
import { useIntlayer } from 'vue-intlayer';

defineProps({
  msg: String,
});

const content = useIntlayer('hello-world');
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

  <p class="read-the-docs">{{ content.readTheDocs }}</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
