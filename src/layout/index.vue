<template>
  <div class="layout">
    <transition name="layoutFade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'layout'
}
</script>


<style lang="less" scoped>
.layout{
  height: 100%;
  width: 100%;
}

/* 页面切换动画 */
.layoutFade-enter-active {
  transition: all 1.5s ease;
}
.layoutFade-leave-active {
  transition: all 1.5s ease;
}
.layoutFade-enter {
  transform: translateY(5px);
  opacity: 0;
}
.layoutFade-leave-to {
  transform: translateY(5px);
  opacity: 0;
}
</style>
