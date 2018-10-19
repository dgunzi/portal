<template>
  <s-index id="app">
    <div class="main_content">
      <video id=example-video width=960 height=540 class="video-js vjs-default-skin" controls>
        <source
          :src="src"
          type="application/x-mpegURL">
      </video>
    </div>
  </s-index>
</template>

<script>
    import Grail from '@/components/grailLayout/Grail'
    import videojs from 'video.js'
    import 'video.js/dist/video-js.css'
    export default {
      name: 'videoPage',
      data() {
        return {
          src: 'http://3811.liveplay.myqcloud.com/live/m3u8/3811_channel1229.m3u8?AUTH=uJ35fEKPBnilpM4wHenr9hDvIYSpGWLpP7L0ylD7/tO4Q2Gj/dUXjTdCg6uz9x29lgQveYHXx+EH7cLTYS6nig=='
        }
      },
      mounted() {
        this.src = 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8';
        this.$nextTick(function () {
          var player = videojs('example-video');
          player.play();
        });
      },
      methods: {
      },
      components: {
        's-index': Grail
      }
    }
</script>

<style scoped>

</style>
