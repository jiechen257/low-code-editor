<template>
  <div
    class="commoditysearch"
    :style="{
      background: datas.backgroundColor,
      border: `1px solid ${datas.backgroundColor}`,
    }"
  >
    <!-- 搜索框 -->
    <section

    >
      <!-- 选择类型 -->
      <el-select
          v-model="datas.selectedValue"
          placeholder="搜索商品"
          ref="my-select"
          size="mini"
          prefix="searchIcon"
          class="searchs"
          :style="{
            'justify-content': datas.textPosition === 0 ? 'left' : 'center',
            color: datas.textColor,
          }"
      >
<!--        :style="{ color: datas.textColor }"-->
        <el-option
            v-for="item in datas.hotwords"
            :key="item.value"
            :label="item.value"
            :value="item.value"
        >
        </el-option>
        <van-icon slot="prefix" name="search" size="16" :style="{ color: datas.textColor }" />
      </el-select>
<!--        <span :style="{ color: datas.textColor }">搜索商品</span>-->
      <!-- 扫一扫 -->
      <div
        class="sweep"
        v-show="datas.sweep"
        :style="{ color: datas.textColor }"
      >
        <span>扫一扫</span>
      </div>
    </section>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'commoditysearch',
  props: {
    datas: Object,
  },
  data() {
    return {
      elDomObj: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.elDomObj = this.$el.getElementsByClassName('searchs')[0].getElementsByClassName('el-input__inner')[0]
    })
  },
  watch: {
    'datas.heights' (newVal) {
      this.elDomObj.style.height = newVal + 'px'
    },
    'datas.borderRadius' (newVal) {
      this.elDomObj.style.borderRadius = newVal ? '4px' : '0'
    },
    'datas.borderColor' (newVal) {
      this.elDomObj.style.backgroundColor = newVal
    },
    'datas.textPosition' (newVal) {
      this.elDomObj.style.textAlign = newVal ? 'center' : 'left'
    },
    'datas.textColor' (newVal) {
      this.elDomObj.style.color = newVal
    }
  }
}
</script>

<style scoped lang="less">
.commoditysearch {
  position: relative;
  /* 搜索框 */
  .searchs {
    position: relative;
    width: 345px;
    min-height: 28px;
    margin: 5px auto;
    display: flex;
    align-items: center;
    font-size: 14px;
    /deep/ .el-input__prefix {
      display: flex;
      align-items: center;
    }
    .search-left {
      display: flex;
      align-items: center;
    }
    .sweep {
      position: absolute;
      right: 10px;
    }
    i {
      margin: 0 5px;
    }
  }
}
</style>
