/**
* Created by dgunzi on 2018/4/28.
 */
<template>
  <s-row :style="{height: height + 'px'}">
    <s-col v-for="(item,index) in size" :key="index" :span="item">
      <template v-if="content[index] !== '' && content[index].indexOf('l_') === 0">
        <c-layout :size="clayout[index].size" :content="clayout[index].content" :height="clayout[index].height" :ref="content[index]">
        </c-layout>
      </template>
      <template v-else-if="content[index] !== ''">
        <component v-bind:is="content[index]"></component>
      </template>
      <template v-else>空白</template>
    </s-col>
  </s-row>
</template>
<script type="text/babel">
  import cLayout from './clayout'
  import { mapGetters } from 'vuex'
    export default {
        data () {
          return {
            clayout: []
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
        created () {
            for (let i = 0, length = this.content.length; i < length; i++) {
              if (this.content[i].indexOf('l_') === 0) {
                this.$set(this.clayout, i, this.getAllClayout(this.content[i]));
              }
            }
        },
        computed: {
            ...mapGetters({
              clayouts: 'allCLayout'
            })
        },
        methods: {
            getAllClayout(idStr) {
              return this.clayouts.find(layout => layout.id === idStr)
            }
        }
    }
</script>
