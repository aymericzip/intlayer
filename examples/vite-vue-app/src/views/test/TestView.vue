<script setup lang="ts">
import { useDictionary, useIntlayer } from 'vue-intlayer';
import dictionaryContentLevel3 from './contentLevel3.content';

const contentLevel1 = useIntlayer('content-level-1');

const contentLevel2 = useIntlayer('content-level-2');
const { syntax21, syntax22, syntax25 } = useIntlayer('content-level-2');

const contentLevel3 = useDictionary(dictionaryContentLevel3);
const { subNode } = useDictionary(dictionaryContentLevel3);
</script>

<!-- Component to test syntax and reactivity or different way to access the content -->

<template>
  <div >
    <div>
      <p>{{contentLevel1}}</p>
      <p><contentLevel1 /></p>
    </div>
    
    <div>
      <p>{{syntax21}}</p>
      <p><syntax22 /></p>
      <p>{{contentLevel2.syntax23}}</p>
      <p><contentLevel2.syntax24 /></p>
      <p><component :is="syntax25" /></p>
      <p><component :is="contentLevel2.syntax26" /></p>
    </div>

    <div>
      <p>{{subNode.syntax31}}</p>
      <p>{{contentLevel3.subNode.syntax32}}</p>
      <p><subNode.syntax32 /></p>
      <p><contentLevel3.subNode.syntax34 /></p>
      <p><component :is="subNode.syntax35" /></p>
      <p><component :is="contentLevel3.subNode.syntax36" /></p>
    </div>
  </div>
</template>

