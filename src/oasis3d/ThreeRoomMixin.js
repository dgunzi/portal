/**
 * Created by dgunzi on 2018/7/31.
 */

import {Oasis3d, Mode, Utils} from './app'
import item from '@/oasis3d/item'
import attrForm from '@/oasis3d/attrForm'
import sceneItems from '@/oasis3d/sceneItems'
var threeRoomMixin = {
  data() {
    return {
      Mode: Mode,
      mode: 'edit',
      infoPanelType: 0, // 左侧面板类型
      infoPanelTitles: ['物品列表', '调整物品', '调整墙面', '调整地面', '添加物品'],
      leftPanelShow: false,
      leftPanelFlag: false,
      currentMode: 0,
      resDialog: false,
      itemsLoading: 0,   // 载入计数
      drawHintFlag: false,
      spinFlag: false,
      mode2d: 0,
      panSpeed: 30,
      directions: {
        UP: 1,
        DOWN: 2,
        LEFT: 3,
        RIGHT: 4
      },
      edgeView: false, // 正面墙是否展示
      selectedItem: null,
      roomTexturePath: 'static/3droom/rooms/',
      wallTexture: [{url: 'marbletiles.jpg', stretch: false, scale: 300}, {url: 'wallmap_yellow.png', stretch: false, scale: 300}, {url: 'light_brick.jpg', stretch: false, scale: 100}, {url: 'wallmap.png', stretch: true, scale: 0}],
      floorTexture: [{url: 'light_fine_wood.jpg', stretch: false, scale: 300}, {url: 'floor.jpg', stretch: false, scale: 100}, {url: 'hardwood.png', stretch: false, scale: 400}],
      currentTarget: null,  // 当前目标
      sceneItems: []
    }
  },
  components: {
    'r-item': item,
    'attr-form': attrForm,
    'scene-items': sceneItems
  },
  mounted() {
      var opts = {
        floorplannerElement: 'floorplanner-canvas', // 2D 绘制canvas
        threeElement: '3d-viewer', // 右侧主区域
        resourceDir: 'static/3droom/res/',
        roomTextureDir: this.roomTexturePath,
        widget: false
      };
      window.oasis3d_loading = false;
      window.oasis3d = new Oasis3d(opts);
      window.oasis3d.setCabinetOpenCallback(this.addEquments);
      window.oasis3d.setEquipmentClickCallback(this.equipmentClick);
      window.oasis3d.model.scene.itemLoadingCallbacks.add(() => {
        this.itemsLoading += 1;
        window.oasis3d_loading = true;
      });
      window.oasis3d.model.scene.itemLoadedCallbacks.add((item) => {
        this.itemsLoading -= 1;
        if (this.itemsLoading === 0) {
          window.oasis3d_loading = false;
        }
      });
      window.oasis3d.model.scene.itemRemovedCallbacks.add((item) => {
        console.log(item);
      });
      // 2D编辑器
      window.floorplanner = window.oasis3d.floorplanner;
      // mode buttons
      window.floorplanner.modeResetCallbacks.add(function(mode) {
        if (mode === Mode.MOVE) {
          this.mode2d = mode;
        }
        if (mode === Mode.DRAW) {
          this.drawHintFlag = true;
        } else {
          this.drawHintFlag = false;
        }
      });
      window.oasis3d.three.wallClicked.add((halfEdge) => {
        this.currentTarget = halfEdge;
        // 墙的纹理
        this.infoPanelType = 2;
        this.leftPanelShow = true;
      });
      window.oasis3d.three.floorClicked.add((room) => {
        this.currentTarget = room;
        this.infoPanelType = 3;
        this.leftPanelShow = true;
      });
      window.oasis3d.three.itemSelectedCallbacks.add((item) => {
        this.selectedItem = item;
        this.infoPanelType = 1;
        this.leftPanelShow = true;
      });
      window.oasis3d.three.itemUnselectedCallbacks.add(() => {
        this.selectedItem = null;
        this.infoPanelType = 0;
      });
      window.oasis3d.three.nothingClicked.add(() => {
        this.infoPanelType = 0;
      });
      window.oasis3d.model.loadSerialized('{"floorplan":{"corners":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":204.85099999999989,"y":289.052},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":672.2109999999999,"y":289.052},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":672.2109999999999,"y":-178.308},"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":204.85099999999989,"y":-178.308}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[]}');
  },
  methods: {
    setNewTexture(textureUrl, textureStretch, textureScale, event) {
      this.currentTarget.setTexture(this.roomTexturePath + textureUrl, textureStretch, textureScale);
      event.preventDefault();
    },
    equipmentClick(equipment) {
      alert('设备被点击了');
      console.log(equipment);
    },
    addEquments(cabinet) {
      let equipmentObj = {
        uuid: 'c4029436-841e-11e8-adc0-fa7ae01bbebc',
        name: 'equipment_card_11',
        objType: 'cube',
        length: 60,
        width: 66,
        height: 20,
        x: -3,
        y: 80,
        z: 0,
        style: {
          skinColor: 0x92630B,
          skin: {
            skin_up: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_down: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_fore: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_behind: {
              skinColor: 0x92630B,
              imgurl: 'server2.jpg'
            },
            skin_left: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_right: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            }
          }
        }
      };
      let equipmentObj2 = {
        uuid: 'ce1c2504-841e-11e8-adc0-fa7ae01bbebc',
        name: 'equipment_card_12',
        objType: 'cube',
        length: 60,
        width: 65,
        height: 20,
        x: -3,
        y: 60,
        z: 0,
        style: {
          skinColor: 0x92630B,
          skin: {
            skin_up: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_down: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_fore: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_behind: {
              skinColor: 0x92630B,
              imgurl: 'server2.jpg'
            },
            skin_left: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_right: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            }
          }
        }
      };
      let equipmentObj3 = {
        show: true,
        uuid: 'ce1c3fc6-841e-11e8-adc0-fa7ae01bbebc',
        name: 'equipment_card_14',
        objType: 'bladeServer',
        length: 60,
        width: 65,
        height: 20,
        x: -3,
        y: 40,
        z: 0,
        style: {
          skinColor: 0x92630B,
          skin: {
            skin_up: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_down: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_fore: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_behind: {
              skinColor: 0x92630B,
              imgurl: 'server2.jpg'
            },
            skin_left: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            },
            skin_right: {
              skinColor: 0x92630B,
              imgurl: 'rack_inside.jpg'
            }
          }
        }
      };
      let cube = Utils.createCube(equipmentObj);
      cabinet.add(cube);
      let cube2 = Utils.createCube(equipmentObj2);
      cabinet.add(cube2);
      let cube3 = Utils.createCube(equipmentObj3);
      cabinet.add(cube3);

      let uuidAry = ['ce1c3fc6-841e-11e8-adc0-fa7ae01bbebc'];
      for (let k = 0, l = cabinet.children.length; k < l; k++) {
        let index = uuidAry.findIndex(function(element) {
          return element === cabinet.children[k].uuid;
        });
        if (index !== -1) {
          Utils.setSkinColor(cabinet.children[k], 0xFF0000);
        }
      }
    },
    changeEdgeView() {
      this.edgeView = !this.edgeView;
      window.oasis3d.three.getController().updateInWallItemVisibility(this.edgeView);
      window.oasis3d.three.getFloorplan().changeEdgeView(this.edgeView);
    },
    changeModeEvent(val) {
      window.oasis3d.three.getController().changeToView();
      window.oasis3d.three.needsUpdate();
      if (val === 'view') {
        this.infoPanelType = 0;
      }
    },
    changeCurrentMode(mode) {
      if (mode === 0) {
        document.getElementById('floorplanner').style.display = 'none';
        document.getElementById('3d-viewer').style.display = 'block';
        window.oasis3d.three.updateWindowSize();
        if (this.leftPanelFlag) {
          this.leftPanelShow = !this.leftPanelShow;
          this.leftPanelFlag = false;
        }
      } else {
        document.getElementById('3d-viewer').style.display = 'none';
        document.getElementById('floorplanner').style.display = 'block';
        if (this.leftPanelShow) {
          this.leftPanelShow = !this.leftPanelShow;
          this.leftPanelFlag = true;
        }
        window.floorplanner.reset();
        window.floorplanner.resizeView();
      }
      // 当前状态为编辑2D图的界面
      if (this.currentMode === 1) {
        window.oasis3d.model.floorplan.update();
      }
      this.currentMode = mode;
      // 信息面板切换
      this.infoPanelType = 0;
    },
    setPlannerMode(setMode) {
      this.mode2d = setMode;
      window.floorplanner.setMode(setMode);
    },
    hideShowPanel() {
      this.leftPanelShow = !this.leftPanelShow;
    },
    spin() {
      if (this.spinFlag) {
        window.oasis3d.three.stopSpin();
      } else {
        window.oasis3d.three.startSpin();
      }
      this.spinFlag = !this.spinFlag;
    },
    cabinetUsage() {
      //切换控制器
      window.oasis3d.three.getController().showCabinetUsage('AD04C105-D39F-4DC4-B500-275361D08168');
    },
    cabinetSpace() {
      window.oasis3d.three.getController().showCabinetSpace();
    },
    enter: function (el, done) {
      let leftValue = -260;
      let interval = setInterval(function () {
        leftValue = leftValue + 4;
        el.style.left = leftValue + 'px';
        if (leftValue === 0) {
          clearInterval(interval);
          done();
        }
      }, 2);
    },
    leave: function (el, done) {
      let leftValue = 0;
      let interval = setInterval(function () {
        leftValue = leftValue - 4;
        el.style.left = leftValue + 'px';
        if (leftValue === -260) {
          clearInterval(interval);
          done();
        }
      }, 2);
    },
    changeFileMenu(index){
      if(index === '0'){
        this.newDesign();
      }
      if(index === '1'){
        this.saveDesign();
      }
      if(index === '2'){
        document.getElementById('loadFileInput').click();
      }
    },
    loadDesign() {
      let files = document.getElementById('loadFileInput').files;
      console.log(files);
      let reader  = new FileReader();
      reader.onload = function(event) {
        let data = event.target.result;
        window.oasis3d.model.loadSerialized(data);
      };
      reader.readAsText(files[0]);
    },
    saveDesign() {
      let data = window.oasis3d.model.exportSerialized();
      let a = window.document.createElement('a');
      let blob = new Blob([data], {type: 'text'});
      a.href = window.URL.createObjectURL(blob);
      a.download = 'design.oasis3d';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    newDesign() {
      window.oasis3d.model.loadSerialized('{"floorplan":{"corners":{"f90da5e3-9e0e-eba7-173d-eb0b071e838e":{"x":204.85099999999989,"y":289.052},"da026c08-d76a-a944-8e7b-096b752da9ed":{"x":672.2109999999999,"y":289.052},"4e3d65cb-54c0-0681-28bf-bddcc7bdb571":{"x":672.2109999999999,"y":-178.308},"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2":{"x":204.85099999999989,"y":-178.308}},"walls":[{"corner1":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","corner2":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","frontTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0}},{"corner1":"f90da5e3-9e0e-eba7-173d-eb0b071e838e","corner2":"da026c08-d76a-a944-8e7b-096b752da9ed","frontTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0}},{"corner1":"da026c08-d76a-a944-8e7b-096b752da9ed","corner2":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","frontTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0}},{"corner1":"4e3d65cb-54c0-0681-28bf-bddcc7bdb571","corner2":"71d4f128-ae80-3d58-9bd2-711c6ce6cdf2","frontTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0},"backTexture":{"url":"static/3droom/rooms/wallmap.png","stretch":true,"scale":0}}],"wallTextures":[],"floorTextures":{},"newFloorTextures":{}},"items":[]}');
    },
    zoomIn(e) {
      e.preventDefault();
      window.oasis3d.three.controls.dollyIn(1.1);
      window.oasis3d.three.controls.update();
    },
    zoomOut(e) {
      e.preventDefault();
      window.oasis3d.three.controls.dollyOut(1.1);
      window.oasis3d.three.controls.update();
    },
    resetCamera() {
      window.oasis3d.three.centerCamera();
    },
    pan(direction) {
      let orbitControls = window.oasis3d.three.controls;
      switch (direction) {
        case this.directions.UP:
          orbitControls.panXY(0, this.panSpeed);
          break;
        case this.directions.DOWN:
          orbitControls.panXY(0, -this.panSpeed);
          break;
        case this.directions.LEFT:
          orbitControls.panXY(this.panSpeed, 0);
          break;
        case this.directions.RIGHT:
          orbitControls.panXY(-this.panSpeed, 0);
          break;
      }
    },
    alarmAction() {
      window.oasis3d.three.getController().addIdentification('equipment_card_52');
      window.oasis3d.three.getController().changeAllAlarmEquipment();
    },
    addItem() {
      this.infoPanelType = 4;
      this.leftPanelShow = true;
    },
    updateGraph() {
      window.oasis3d.three.needsUpdate();
    }
  }
};

export default threeRoomMixin;
