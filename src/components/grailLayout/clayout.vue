/**
* Created by dgunzi on 2018/4/28.
 */

<template>
  <s-row :style="{height: height + 'px'}">
    <s-col v-for="(item,index) in size" :key="index" :span="item">
        <component v-bind:is="portalComponents[index]" :ref="portalComponents[index]"></component>
    </s-col>
  </s-row>
</template>
<script type="text/babel">
  const EMPTY = {
    template: '<div></div>'
  };
  export default {
    data () {
      return {
        portalComponents: []
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
      EMPTY
    },
    created () {
      for (let i = 0, length = this.content.length; i < length; i++) {
          this.$set(this.portalComponents, i, 'EMPTY')
      }
    },
    methods: {
      changeComponents() {
        for (let i = 0, length = this.content.length; i < length; i++) {
          if (this.content[i].indexOf('l_') !== 0) {
            this.$set(this.portalComponents, i, this.content[i])
          }
        }
      }
    }
  }
</script>
