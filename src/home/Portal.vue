<template>
  <div class="portalContent" style="overflow-x: hidden;color:#fff;">
    <s-layout v-for="(layout, index) in layouts" :size="layout.size" :content="layout.content" :key="index" :height="layout.height"></s-layout>
  </div>
</template>

<script type="text/babel">
  import { mapGetters } from 'vuex'
  import sLayout from '@/components/grailLayout/layout'

  export default {
    components: {
      sLayout
    },
    methods: {
    },
    created () {
      this.$store.dispatch('getPortlets');
    },
    computed: mapGetters({
      layouts: 'allLayout'
    })
  }
</script>
