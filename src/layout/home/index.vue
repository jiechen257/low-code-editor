<template>
  <div class="home">
    <!-- 页面顶部按钮 -->
    <section style="display: flex; justify-content: right;" class="buttons">
      <div>
        <el-button @click="reloads" type="danger"
        ><i class="el-icon-delete-solid el-icon--left"></i>重置</el-button
        >
        <el-button @click="previewPage.show = true">预览</el-button>
        <el-button @click="showJSON">查看JSON </el-button>
        <el-button @click="$refs.uploadJSONFile.click()">导入JSON </el-button>
        <el-button @click="exportJSON">导出JSON </el-button>
        <input
            type="file"
            ref="uploadJSONFile"
            id="JSONFile"
            accept=".json"
            @change="importJSON"
            style="display: none"
        >
      </div>
    </section>

    <!-- 页面操作主体 -->
    <section class="operation">
      <!-- 左侧组件集合 -->
      <SideBarAssembly :pointer="pointer"/>

      <!-- 手机页面 -->
      <div class="phone">
        <section class="phoneAll" >
          <!-- 顶部状态栏 -->
          <img src="@/assets/images/phoneTop.png" alt="" class="statusBar">

          <!-- 头部导航栏 -->
          <HeaderTop :page-setup="pageSetup" @click="headerTopHandler" />

          <!-- 主体内容 -->
          <section class="phone-container"></section>

        </section>
      </div>

      <!-- 手机页面右侧的修饰按钮 -->
      <section class="decorateTab"></section>

      <!-- 右侧组件属性和工具栏 -->
      <div class="decorateAll"></div>

    </section>

    <!-- 预览页面 -->
    <PreviewPage style="display: none"/>
  </div>
</template>

<script>

export default {
  name: 'home',
  inject: ['reload'],
  data() {
    return {
      previewPage: {
        show: false, // 是否显示预览
      },
      pointer: {
        show: false // 鼠标是否穿透
      },
      pageSetup: {  // 页面属性
        name: '页面标题', //页面名称
        details: '', //页面描述
        isPerson: false, // 是否显示个人中心
        isBack: true, // 是否返回按钮
        titleHeight: 35, // 高度
        bgColor: 'rgba(249, 249, 249, 10)', //背景颜色
        bgImg: '', // 背景图片
      }
    }
  },
  methods: {
    // 页面标题栏切换
    headerTopHandler() {

    },
    // 页面刷新
    reloads() {
      this.$confirm('重置后您修改的数据将会失效，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.reload()
      }).catch((err) => {
        console.error(err)
      })
    },
    // 查看JSON数据
    showJSON() {
      console.log('查看JSON数据')
    },
    // 导入JSON数据
    importJSON() {
      console.log('导入JSON数据')
    },
    // 导出JSON数据
    exportJSON() {
      console.log('导出JSON数据')
    }
  }
}
</script>

<style lang="less" scoped>
.pointer-events {
  pointer-events: none;
}

.home {
  width: 100%;
  height: 100%;

  /* 按钮集合 */
  .buttons {
    height: 8%;
    border-bottom: 1px solid #ebedf0;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 15px;
    align-items: center;
    /* 下拉 */
    .frop {
      padding-right: 15px;
      .el-button.el-button--primary.el-dropdown-selfdefine {
        background: #fff;
        color: #000;
        border: 1px solid #dcdee0;
      }
    }
    .el-button {
      font-size: 14px;
      padding: 0 16px;
      height: 30px;
      &.el-button--primary {
        background: #155bd4;
      }
      &.el-button--danger {
        background: red;
      }
    }
  }

  /* 操作主体 */
  .operation {
    width: 100%;
    height: 92%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #f7f8fa;
  }

  /* 手机 */
  .phone {
    width: 55%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    background: #f7f8fa;
    &::-webkit-scrollbar {
      width: 1px;
    }
    // &::-webkit-scrollbar-thumb {
    //   background-color: #155bd4;
    // }

    /* 手机样式 */
    .phoneAll {
      width: 375px;
      min-height: 760px;
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
      margin: 45px 0;
      position: relative;

      /* 手机高度 */
      .phoneSize {
        position: absolute;
        left: -137px;
        top: 640px;
        font-size: 12px;
        color: #a2a2a2;
        border-bottom: 1px solid #dedede;
        width: 130px;
        height: 21px;
        line-height: 21px;
      }

      /* 状态栏 */
      .statusBar {
        width: 100%;
        display: block;
      }

      /* 主体内容 */
      .phone-container {
        min-height: 603px;
        box-sizing: border-box;
        cursor: pointer;
        width: 100%;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .componentsClass {
          border: 1px solid #fff;
          &:hover {
            border: 1px dashed #155bd4;
          }
        }
      }
    }
  }

  /* 删除组件 */
  .deles {
    position: absolute;
    min-width: 80px;
    text-align: center;
    line-height: 25px;
    background: #fff;
    height: 25px;
    font-size: 12px;
    left: 103%;
    top: 50%;
    transform: translateY(-50%);
    .icon-sanjiaoxingzuo {
      position: absolute;
      left: -11px;
      color: #fff;
      font-size: 12px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:hover {
      i {
        display: block;
        position: absolute;
        left: 0;
        font-size: 16px;
        top: 0;
        text-align: center;
        line-height: 25px;
        width: 100%;
        color: #fff;
        height: 100%;
        z-index: 10;
        background: rgba(0, 0, 0, 0.5);
      }
      .icon-sanjiaoxingzuo {
        color: rgba(0, 0, 0, 0.5);
      }
    }

    i {
      display: none;
    }
  }

  /* 右侧工具栏 */
  .decorateAll {
    width: 376px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    padding: 0 12px;
    background: #fff;
    &::-webkit-scrollbar {
      width: 1px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #155bd4;
    }
  }

  /* 页面设置tab */
  .decorateTab {
    position: fixed;
    display: flex;
    right: 380px;
    top: 115px;
    flex-direction: column;
    span {
      background-color: #fff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      width: 94px;
      height: 32px;
      display: inline-block;
      text-align: center;
      line-height: 32px;
      margin-bottom: 12px;
      transition: all 0.8s;
      cursor: pointer;
      &.active {
        background-color: #155bd4;
        color: #fff;
      }
      /* 图标 */
      i {
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }
}

/* 动画 */
.decorateAnima-enter-active {
  transition: all 1.5s ease;
}
.decorateAnima-leave-active {
  transition: all 1.5s ease;
}
.decorateAnima-enter {
  transform: translate(8px, 8px);
  opacity: 0;
}
.decorateAnima-leave-to {
  transform: translate(8px, 8px);
  opacity: 0;
}
</style>
