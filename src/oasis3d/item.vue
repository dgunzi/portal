/**
* Created by dgunzi on 2018/7/30.
*/

<template>
<div>
  <div class="search"><s-input
    placeholder="请输入物品名称"
    prefix-icon="magnifier"
    v-model="inputValue">
  </s-input></div>
  <s-scrollbar wrap-style="height: calc(100vh - 228px);">
  <div class="item" v-if="filterItems.length !== 0" v-for="(item, index) in filterItems" v-on:click.stop="addToScene(index, $event)">
    <img :src="item.image"></img>
    <span>{{item.name}}</span>
  </div>
  <div v-if="filterItems.length === 0">
    <div class="noData">查不到名称为<span class="noName">"{{inputValue}}"</span>的物品</div>
  </div>
  </s-scrollbar>
</div>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        inputValue: null,
        items: [
          {
            'name': '关着的门',
            'image': 'static/3droom/models/thumbnails/thumbnail_Screen_Shot_2014-10-27_at_8.04.12_PM.png',
            'model': 'static/3droom/models/js/closed-door28x80_baked.js',
            'type': '7',
            'ctype': 'closedDoor'
          },
          {
            'name': '敞开的门',
            'image': 'static/3droom/models/thumbnails/thumbnail_Screen_Shot_2014-10-27_at_8.22.46_PM.png',
            'model': 'static/3droom/models/js/open_door.js',
            'type': '7',
            'ctype': 'openDoor'
          },
          {
            'name': '空调',
            'image': 'static/3droom/models/thumbnails/thumbnail_air_condition.png',
            'model': '',
            'type': '10',
            'ctype': 'aircondition'
          },
          {
            'name': '机柜',
            'image': 'static/3droom/models/thumbnails/thumbnail_empty_cabinet.png',
            'model': '',
            'type': '15',
            'ctype': 'emptyCabinet'
          },
          {
            'name': '宣传展板',
            'image': 'static/3droom/models/thumbnails/thumbnail_message.png',
            'model': '',
            'type': '11',
            'ctype': 'messagePanel'
          },
          {
            'name': '电视',
            'image': 'static/3droom/models/thumbnails/thumbnail_television.png',
            'model': '',
            'type': '11',
            'ctype': 'television'
          },
          {
            'name': '玻璃门',
            'image': 'static/3droom/models/thumbnails/thumbnail_door.png',
            'model': '',
            'type': '12',
            'ctype': 'glassDoor'
          },
          {
            'name': '摄像头',
            'image': 'static/3droom/models/thumbnails/thumbnail_camera.png',
            'model': '',
            'type': '13',
            'ctype': 'camera'
          },
          {
            'name': '玻璃窗',
            'image': 'static/3droom/models/thumbnails/thumbnail_glasses.png',
            'model': '',
            'type': '14',
            'ctype': 'glasses'
          },
          {
            'name': '门禁',
            'image': 'static/3droom/models/thumbnails/thumbnail_doorControl.png',
            'model': '',
            'type': '16',
            'ctype': 'doorControl'
          }
        ],
        filterItems: []
      }
    },
    mounted() {
      this.inputValue = '';
    },
    watch: {
      inputValue(val, oldVal) {
        this.filterItems = this.items.filter(function (item) {
          if (item.name.indexOf(val) !== -1) {
            return true;
          } else {
            return false;
          }
        });
      }
    },

    methods: {
      addToScene: function (index, event) {
        if (!window.oasis3d_loading) {
          var item = this.items[index];
          var metadata = {
            itemName: item.name,
            resizable: true,
            modelUrl: item.model,
            itemType: item.type,
            ctype: item.ctype
          };
          window.oasis3d.model.scene.addItem(item.type, item.model, metadata);
        }
      }
    }
  }
</script>
