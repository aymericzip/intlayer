import { h } from 'vue';
import Wrapper from '/Users/aymericpineau/Documents/benchmark-bloom/apps-benchmark/vite-vue-static/vue-i18n-app/scripts/Wrapper.vue';
import Component from '/Users/aymericpineau/Documents/benchmark-bloom/apps-benchmark/vite-vue-static/vue-i18n-app/src/components/pages/blog/BlogList.vue';

export default {
  render() {
    return h(
      Wrapper,
      {},
      {
        default: () => h(Component),
      }
    );
  },
};
