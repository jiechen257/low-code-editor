<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  // 向子组件注入刷新功能
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  methods: {
    // 刷新页面
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
  },
}
</script>

<style lang="less">
#app {
  position: absolute;
  left: 0;
  top: 0;
}

// 页面切换动画
.fade-enter-active {
 transition: all 1.5s ease;
}
.fade-leave-active {
  transition: all 1.5s ease;
}
.fade-enter {
  transform: translateX(5px);
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(5px);
  opacity: 0;
}
.el-message-box.JSONView {
  width: 1100px;
}

// 提示样式
.Prompt{
 font-size: 12px; color: #969799; margin-bottom: 10px
}
</style>
