<template>
  <div class="portalContent" style="overflow-x: hidden;color:#fff;">
    <s-layout v-for="(layout, index) in layouts" :size="layout.size" :content="layout.content" :key="index" :height="layout.height"></s-layout>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import sLayout from '@/components/grailLayout/layout'

  export default {
    components: {
      sLayout
    },
    methods: {
        initComponents() {
          for (let i = 0; i < this.components.length; i++) {
            Vue.component(
              this.components[i],
              () => import('./' + this.components[i])
            )
          }
          this.changeComponents();
        },
        changeComponents() {
          this.$children.forEach(child => {
            var name = child.$options.componentName
            if (name === 'layout') {
              child.changeComponents()
            }
          })
        }
    },
    created () {
      let _self = this;
      this.$store.dispatch('getPortlets').then(() => {
        _self.initComponents();
      })
    },
    computed: mapGetters({
      layouts: 'allLayout',
      components: 'allComponents'
    })
  }
</script>
