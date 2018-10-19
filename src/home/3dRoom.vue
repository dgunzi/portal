/**
* Created by dgunzi on 2018/7/26.
 */

<template>
  <s-index id="app">
    <div class="main_3droom_content">
    <s-row>
      <s-col span="18">
        <s-button class="collapse_btn" :icon="leftPanelShow ? 'left' : 'right'" :title="leftPanelShow ?  '隐藏面板' : '显示面板'" @click="hideShowPanel"></s-button>
        <s-dropdown v-show="currentMode == 0" @on-click="changeFileMenu">
          <s-button>
            文件
            <i class="iconfont icon-bottom"></i>
          </s-button>
          <s-dropdown-menu slot="list">
            <s-dropdown-item name="0">新建</s-dropdown-item>
            <s-dropdown-item name="1">保存</s-dropdown-item>
            <s-dropdown-item name="2">载入</s-dropdown-item>
          </s-dropdown-menu>
        </s-dropdown>
        <s-button v-show="currentMode == 0 && mode === 'edit'" @click="addItem">添加物品</s-button>
        <s-button v-show="currentMode == 0" @click="changeEdgeView">墙的显示</s-button>
        <s-button v-show="currentMode == 0 && mode === 'view'" @click="alarmAction">设备告警</s-button>
        <s-button v-show="currentMode == 0" @click="spin">旋转</s-button>
        <s-button v-show="currentMode == 0 && mode === 'view'" @click="cabinetUsage">机柜利用率</s-button>
        <s-button v-show="currentMode == 0 && mode === 'view'" @click="cabinetSpace">空间利用率</s-button>
        <s-button :type="(mode2d == 0) ? 'default' : 'cancel'" v-show="currentMode == 1" title="普通按钮" @click="setPlannerMode(Mode.MOVE)">移动墙体</s-button>
        <s-button :type="(mode2d == 1) ? 'default' : 'cancel'" v-show="currentMode == 1" title="绘制墙体" @click="setPlannerMode(Mode.DRAW)">绘制墙体</s-button>
        <s-button :type="(mode2d == 2) ? 'default' : 'cancel'" v-show="currentMode == 1" title="删除墙体" @click="setPlannerMode(Mode.DELETE)">删除墙体</s-button>
      </s-col>
      <s-col span="6" style="text-align: right">
        <s-radio-group v-model="mode" v-show="currentMode == 0" size="small" @change="changeModeEvent">
          <s-radio-button label="view">查看</s-radio-button>
          <s-radio-button label="edit">编辑</s-radio-button>
        </s-radio-group>
      </s-col>
    </s-row>
    <input type="file" style="display: none" id="loadFileInput" @change="loadDesign"/>
    <div class="canvas_content">
      <div id="3d-viewer" style="width: 100%;height: calc(100vh - 165px)">
      </div>
      <div id="floorplanner" style="width: 100%;height: calc(100vh - 165px)">
        <canvas id="floorplanner-canvas"></canvas>
      </div>
      <transition
        v-on:enter="enter"
        v-on:leave="leave"
        v-bind:css="false"
      >
      <div class="info_panel" v-show="leftPanelShow">
        <div class="info_panel_title s-card-header">
          {{ infoPanelTitles[infoPanelType] }}
        </div>
          <div class="bg-purple" v-show="infoPanelType == 0">
            <scene-items></scene-items>
          </div>
          <div class="bg-purple" v-show="infoPanelType == 1">
            <attr-form :selectedItem="selectedItem" :v-if="infoPanelType == 1 && selectedItem !== null" @updateGraph = "updateGraph"></attr-form>
          </div>
          <div class="bg-purple" v-show="infoPanelType == 2">
            <s-row>
              <s-col span="12" v-for="texture in wallTexture" :key="texture.url">
                <a class="texture-thumbnail" @click="setNewTexture(texture.url, texture.stretch, texture.scale, $event)"><img alt="贴图" :src="roomTexturePath + 'thumbnail_' + texture.url"></a>
              </s-col>
            </s-row>
          </div>
          <div class="bg-purple" v-show="infoPanelType == 3">
            <s-row>
              <s-col span="12" v-for="texture in floorTexture" :key="texture.url">
                <a class="texture-thumbnail" @click="setNewTexture(texture.url, texture.stretch, texture.scale, $event)"><img alt="贴图" :src="roomTexturePath + 'thumbnail_' + texture.url"></a>
              </s-col>
            </s-row>
          </div>
          <div class="bg-purple item-panel" v-show="infoPanelType == 4">
            <r-item></r-item>
          </div>
      </div>
      </transition>
    </div>
    <div id="graph-controls" v-show="mode == 'edit'" style="position: absolute;top:60px;right: 20px">
      <s-button v-show="currentMode == 0" @click="changeCurrentMode(1)" title="切换为2D编辑器">3D</s-button>
      <s-button v-show="currentMode == 1" @click="changeCurrentMode(0)" title="切换为3D编辑器">2D</s-button>
    </div>
    <div id="camera-controls" v-show="currentMode == 0">
      <div style="float: left;margin-right:4px">
        <s-button icon="reduce" @click="zoomOut" title="缩小"></s-button>
        <s-button icon="home" @click="resetCamera" title="重置"></s-button>
        <s-button icon="enlarge" @click="zoomIn" title="放大"></s-button>
      </div>
      <div style="float: left;">
        <s-button icon="arrow-left" @click="pan(directions.LEFT)" title="左移"></s-button>
      </div>
      <div style="float: left;width:40px;margin-left:4px;margin-right:4px;height:80px;margin-top: -36px;">
        <s-button icon="arrow-top" @click="pan(directions.UP)" title="上移" style="margin-bottom:4px;"></s-button>
        <s-button icon="arrow-bottom" @click="pan(directions.DOWN)" title="下移"></s-button>
      </div>
      <div style="float: left;">
        <s-button icon="arrow-right" @click="pan(directions.RIGHT)" title="右移"></s-button>
      </div>
    </div>
    </div>
    <div id="draw-walls-hint" v-show="drawHintFlag && currentMode == 1">
      按下 "Esc" 键将停止绘制
    </div>
    <s-dialog
      v-model="videoDialog"
      title="摄像头1" width="520px">
      <div class="player">
        <video id=example-video width=480 height=270 class="video-js vjs-default-skin" controls>
          <source
            :src="videoSrc"
            type="application/x-mpegURL">
        </video>
      </div>
    </s-dialog>
  </s-index>
</template>
<script type="text/babel">
  import Grail from '@/components/grailLayout/Grail'
  import mixin from '@/oasis3d/ThreeRoomMixin'
  export default {
    mixins: [mixin],
    data () {
      return {
      }
    },
    components: {
      's-index': Grail
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    mounted() {
    }
  }
</script>
