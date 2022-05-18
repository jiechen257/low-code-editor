<template>
  <div class="sideBarAssembly">这是组件集合</div>
</template>

<script>
export default {
  name: 'SideBarAssembly',
  props: {
    pointer: Object
  }

};
</script>

<style lang="less" scoped>
.sideBarAssembly {
  width: 275px;
  height: 100vh;
  overflow-y: scroll;
  border-right: 1px solid #ebedf0;
  box-sizing: border-box;
  padding: 0 12px;
  background: #fff;
}
</style>
