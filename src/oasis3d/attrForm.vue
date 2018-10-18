/**
* Created by dgunzi on 2018/8/16.
 */

<template>
  <s-form label-width="45px" :model="attrForm">
    <s-form-item label="长度">
      <s-input v-model="attrForm.depth" @change="changeValue"></s-input>
    </s-form-item>
    <s-form-item label="宽度">
      <s-input v-model="attrForm.width" @change="changeValue"></s-input>
    </s-form-item>
    <s-form-item label="高度">
      <s-input v-model="attrForm.height" @change="changeValue"></s-input>
    </s-form-item>
    <s-form-item>
      <s-checkbox label="固定位置" v-model="attrForm.fixed" @change="changeFix"></s-checkbox>
    </s-form-item>
    <s-form-item>
      <s-button icon="delete" @click="deleteItem" title="删除">删除物品</s-button>
    </s-form-item>
  </s-form>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        attrForm: {
          depth: 0,
          width: 0,
          height: 0,
          fixed: false
        }
      }
    },
    methods: {
      deleteItem() { // 删除操作
        this.selectedItem.removeSelf();
        this.$emit('updateGraph');
      },
      changeValue() {
        this.selectedItem.resize(
          this.inToCm(this.attrForm.height),
          this.inToCm(this.attrForm.width),
          this.inToCm(this.attrForm.depth)
        );
      },
      changeFix() {
        this.selectedItem.setFixed(this.attrForm.fixed);
      },
      cmToIn(cm) { // 厘米转换为英寸
        return cm / 2.54;
      },
      inToCm(inches) { // 英寸转换为厘米
        return inches * 2.54;
      }
    },
    props: {
      selectedItem: {
        required: true
      }
    },
    watch: {
      selectedItem(val, oldVal) {
        if (val !== null) {
          this.attrForm.depth = this.cmToIn(val.getDepth()).toFixed(0);
          this.attrForm.height = this.cmToIn(val.getHeight()).toFixed(0);
          this.attrForm.width = this.cmToIn(val.getWidth()).toFixed(0);
          this.attrForm.fixed = val.fixed;
        }
      }
    }
  }
</script>
