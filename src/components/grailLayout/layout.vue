/**
* Created by dgunzi on 2018/4/28.
 */
<template>
  <s-row :style="{height: height + 'px'}">
    <s-col v-for="(item,index) in size" :key="index" :span="item" @>
      <template v-if="content[index].indexOf('l_') === 0">
        <c-layout :size="clayout[index].size" :content="clayout[index].content" :height="clayout[index].height" :ref="content[index]">
        </c-layout>
      </template>
      <template v-else>
        <component v-bind:is="portalComponents[index]"></component>
      </template>
    </s-col>
  </s-row>
</template>
<script type="text/babel">
  import cLayout from './clayout'
  import { mapGetters } from 'vuex'
    const EMPTY = {
      template: '<div></div>'
    };
    export default {
        data () {
          return {
            portalComponents: [],
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
          cLayout,
          EMPTY
        },
        created () {
            for (let i = 0, length = this.content.length; i < length; i++) {
              if (this.content[i].indexOf('l_') !== 0) {
                this.$set(this.portalComponents, i, 'EMPTY')
              } else {
                this.$set(this.clayout, i, this.getAllClayout(this.content[i]));
              }
            }
        },
        computed: mapGetters({
          clayouts: 'allCLayout'
        }),
        methods: {
            changeComponents() {
              for (let i = 0, length = this.content.length; i < length; i++) {
                if (this.content[i].indexOf('l_') !== 0) {
                  this.$set(this.portalComponents, i, this.content[i])
                } else {
                  this.$refs[this.content[i]][0].changeComponents();
                }
              }
            },
            getAllClayout(idStr) {
              return this.clayouts.find(layout => layout.id === idStr)
            }
        }
    }
</script>
