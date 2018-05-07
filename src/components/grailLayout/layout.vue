/**
* Created by dgunzi on 2018/4/28.
 */
<template>
  <s-row :style="{height: height + 'px'}" :gutter="10">
    <s-col v-for="(item,index) in size" :key="index" :span="item">
      <div class="grid-content bg-purple">
        <template v-if="typeof content[index] !== 'string'">
          <c-layout :size="content[index].size" :content="content[index].content" :height="content[index].height">
          </c-layout>
        </template>
        <template v-else-if="typeof content[index] === 'string' && content[index] !== ''">
          <component v-bind:is="content[index]"></component>
        </template>
        <template v-else>空白</template>
      </div>
    </s-col>
  </s-row>
</template>
<script type="text/babel">
  import cLayout from './clayout'
    export default {
        data () {
          return {
          }
        },
        name: 'layout',
        componentName: 'layout',
        props: {
          content: Array,
          size: Array,
          height: String
        },
        components: {
          cLayout
        },
        computed: {
        },
        methods: {
        }
    }
</script>
