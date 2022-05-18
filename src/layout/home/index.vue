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
          <section
            class="phone-container"
            :style="{
              'background-color': pageSetup.bgColor,
              backgroundImage: 'url(' + pageSetup.bgImg + ')',
            }"
            @drop="drop($event)"
            @dragover="dropOver($event)"
            @dragleave="dragLeave($event)"
          >
            <div :class="pointer.show ? 'pointer-events' : ''">
              <!-- 动态组件 -->
              <component
                :is="item.component"
                v-for="(item, index) in pageComponents"
                :key="index"
                :datas="item.setStyle"
                :style="{
                  border: item.active && delShow ? '2px solid #155bd4' : '',
                }"
                @click.native="activeComponent(item, index)"
                class="componentsClass"
                :data-type="item.type"
              >
                <div
                    v-show="delShow"
                    class="deles"
                    slot="deles"
                    @click.stop="deleteObj(index)"
                >
                  <!-- 删除组件 -->
                  <span class="iconfont icon-sanjiaoxingzuo"></span>
                  {{ item.text }}
                  <i class="el-icon-delete-solid" />
                </div>
              </component>
            </div>
          </section>

          <!-- 手机高度 -->
          <div class="phone-size">iPhone 8手机高度</div>

          <!-- 底部 -->
          <PhoneBottom />
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
import utils from '@/utils/index' // 方法类
import componentProperties from '@/utils/componentProperties' // 组件数据

export default {
  name: 'home',
  inject: ['reload'],
  data() {
    return {
      pageId: null,   // 页面id
      pageSetup: {  // 页面属性
        name: '页面标题', //页面名称
        details: '', //页面描述
        isPerson: false, // 是否显示个人中心
        isBack: true, // 是否返回按钮
        titleHeight: 35, // 高度
        bgColor: 'rgba(249, 249, 249, 10)', //背景颜色
        bgImg: '', // 背景图片
      },
      pageComponents: [],  // 页面上存在的所有组件
      uniqueComponent: ['1-5', '1-16'],  // 页面中只能存在一例的组件，使用组件的type区分

      currentCompIndex: '',            // 当前选中组件的index
      currentProperties: {}, // 当前组件的属性

      curRightToolsBar: "componentStyle",
      rightToolsBarOptions: {  // 右侧工具栏选项
        componentStyle: 'componentStyle',   // 组件属性
        pageStyle: 'pageStyle',             // 页面属性
        componentsManage: 'componentsManage'  // 组件管理
      },

      delShow: true,  // 组件右侧的删除标签是否显示
      previewPage: {
        show: false, // 是否显示预览
      },
      pointer: {
        show: false // 鼠标是否穿透
      },
      offsetY: 0, //记录上一次距离父元素高度
    }
  },
  methods: {
    // 页面标题栏切换
    headerTopHandler() {

    },

    /**
     * 当将元素或文本选择拖动到有效放置目标（每几百毫秒）上时，会触发此事件
     *
     * @param {Object} event event对象
     */
    dropOver(event) {
      //阻止浏览器的默认事件
      event.preventDefault()

      console.log('111')
      /* 获取鼠标高度 */
      let eventOffset = event.offsetY

      /* 如果没有移动不触发事件减少损耗 */
      if (this.offsetY === eventOffset) return
      else this.offsetY = eventOffset

      /* 获取组件 */
      const childrenObject = event.target.children[0]

      // 一个以上的组件计算
      if (this.pageComponents.length) {
        /* 如果只有一个组件并且第一个是提示组件直接返回 */
        if (
            this.pageComponents.length === 1 &&
            this.pageComponents[0].type === 0
        )
          return

        /* 如果鼠标的高度小于第一个的一半直接放到第一个 */
        if (eventOffset < childrenObject.children[0].clientHeight / 2) {
          /* 如果第一个是提示组件直接返回 */
          if (this.pageComponents[0].type === 0) return

          /* 删除提示组件 */
          this.pageComponents = this.pageComponents.filter(
              (res) => res.component !== 'OccupancyArea'
          )

          /* 最后面添加提示组件 */
          this.pageComponents.unshift({
            component: 'OccupancyArea',
            type: 0,
          })

          return
        }

        /* 记录距离父元素高度 */
        const childOff = childrenObject.offsetTop

        /* 鼠标在所有组件下面 */
        if (
            eventOffset > childrenObject.clientHeight ||
            childrenObject.lastChild.offsetTop -
            childOff +
            childrenObject.lastChild.clientHeight / 2 <
            eventOffset
        ) {
          /* 最后一个组件是提示组件返回 */
          if (this.pageComponents[this.pageComponents.length - 1].type === 0)
            return

          /* 清除提示组件 */
          this.pageComponents = this.pageComponents.filter(
              (res) => res.component !== 'OccupancyArea'
          )

          /* 最后一个不是提示组件添加 */
          this.pageComponents.push({
            component: 'OccupancyArea',
            type: 0,
          })

          return
        }

        const childrens = childrenObject.children

        /* 在两个组件中间，插入 */
        for (let i = 0, l = childrens.length; i < l; i++) {
          const childoffset = childrens[i].offsetTop - childOff

          if (childoffset + childrens[i].clientHeight / 2 > event.offsetY) {
            /* 如果是提示组件直接返回 */
            if (this.pageComponents[i].type === 0) break

            if (this.pageComponents[i - 1].type === 0) break

            /* 清除提示组件 */
            this.pageComponents = this.pageComponents.filter(
                (res) => res.component !== 'OccupancyArea'
            )

            this.pageComponents.splice(i, 0, {
              component: 'OccupancyArea',
              type: 0,
            })
            break
          } else if (childoffset + childrens[i].clientHeight > event.offsetY) {
            if (this.pageComponents[i].type === 0) break

            if (
                !this.pageComponents[i + 1] ||
                this.pageComponents[i + 1].type === 0
            )
              break

            this.pageComponents = this.pageComponents.filter(
                (res) => res.component !== 'OccupancyArea'
            )

            this.pageComponents.splice(i, 0, {
              component: 'OccupancyArea',
              type: 0,
            })

            break
          }
        }
      } else {
        /* 一个组件都没有直接push */
        this.pageComponents.push({
          component: 'OccupancyArea',
          type: 0,
        })
      }
    },

    /**
     * 当在有效放置目标上放置元素或选择文本时触发此事件
     *
     * @param {Object} event event对象
     */
    drop(event) {
      /* 获取数据 */
      let data = utils.deepClone(
          componentProperties.get(event.dataTransfer.getData('componentName'))
      )

      console.log('222', data)

      /* 查询是否只能存在一个的组件且在第一个 */
      let someOne = this.pageComponents.some((item, index) => {
        return (
            item.component === 'OccupancyArea' &&
            index === 0 &&
            this.uniqueComponent.includes(data.type)
        )
      })
      if (someOne) {
        this.$message.info('固定位置的组件(如: 底部导航、悬浮)不能放在第一个!')
        /* 删除提示组件 */
        this.dragLeave()
        return
      }

      /* 查询是否只能存在一个的组件 */
      let someResult = this.pageComponents.some((item) => {
        return (
            this.uniqueComponent.includes(item.type) &&
            item.component === event.dataTransfer.getData('componentName')
        )
      })
      if (someResult) {
        this.$message.info('当前组件只能添加一个!')
        /* 删除提示组件 */
        this.dragLeave()
        return
      }

      /* 替换 */
      utils.forEach(this.pageComponents, (res, index) => {
        /* 修改选中 */
        if (res.active === true) res.active = false
        /* 替换提示 */
        this.index = index
        if (res.component === 'OccupancyArea')
          this.$set(this.pageComponents, index, data)
      })

      /* 切换组件 */
      this.rightToolsBarOptions = data.style
      /* 丢样式 */
      this.currentproperties = data.setStyle

      console.log(
          data,
          this.curRightToolsBar,
          this.currentproperties,
          '----------components data'
      )
    },

    /**
     * 当拖动的元素或文本选择离开有效的放置目标时，会触发此事件
     *
     * @param {Object} event event对象
     */
    dragLeave() {
      console.log('333')
      /* 删除提示组件 */
      this.pageComponents = this.pageComponents.filter(
          (res) => res.component !== 'OccupancyArea'
      )
    },

    /**
     * 选中组件
     *
     * @param {Object} res 当前组件对象
     */
    activeComponent(res, index) {
      this.index = index
      /* 切换组件 */
      this.rightcom = res.style
      /* 丢样式 */
      this.currentproperties = res.setStyle

      /* 替换 */
      utils.forEach(this.pageComponents, (res) => {
        /* 修改选中 */
        if (res.active === true) res.active = false
      })

      /* 选中样式 */
      res.active = true
    },

    /**
     * 删除组件
     * @param {Number} index 组件索引
     */
    deleteObj(index) {
      this.pageComponents.splice(index, 1)
      if (this.index === index) this.rightcom = 'decorate'
      if (index < this.index) this.index = this.index - 1
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
      .phone-size {
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
