<template>
  <div class="uploadImg">
    <!-- 上传图片 -->
    <el-dialog :visible.sync="dialogVisibles" class="xianshi">
      <img
          draggable="false"
          style="width: 640px; height: 400px; margin: 20px 0;"
          :src="dialogImageUrl"
          alt=""
      />
<!--      :src="dialogImageUrl ? require('' + dialogImageUrl) : ''"-->
    </el-dialog>

    <!-- 图片放大 -->
    <el-dialog
        class="uploadIMG"
        title="上传图片"
        :lock-scroll="true"
        :visible.sync="dialogVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        :show-close="false"
        center
        width="500px"
    >
      <!-- 上传图片 -->
      <el-upload
          v-if="dialogVisible"
          name="file"
          action=""
          :http-request="httpRequestUpload"
          list-type="picture-card"
          :limit="1"
          :on-preview="preview"
          :on-success="onSuccess"
          :with-credentials="true"
          :on-error="uploadError"
          :before-upload="uploads"
          :before-remove="handleRemove"
          :class="uploadShow ? 'disable' : ''"
      >
        <i class="el-icon-plus"></i>
      </el-upload>

      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消 上 传</el-button>
        <el-button type="primary" @click="uploadInformation" :disabled="disabl"
        >点 击 上 传</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'UploadImg',
  data() {
    return {
      dialogVisible: false, //弹框默认隐藏
      dialogVisibles: false, // 放大的图片
      // dialogImageUrl: require('back-end/static/img/1652941081638.jpeg'), // 上传的图片
      dialogImageUrl: '', // 上传的图片
      uploadShow: false, //是否显示上传图片
    }
  },
  created() {},
  methods: {
    httpRequestUpload(param) {
      const formData = new FormData()
      formData.append('files', param.file)
      const uploadUrl = `${window.global_config.UPLOAD_URL}/upload`
      axios.post(uploadUrl, formData).then(res => {
        if (res?.status !== 200)
          return this.$message.error('上传图片失败，请删除后重新上传')
        this.dialogImageUrl = window.global_config.UPLOAD_URL + res.data[0].url
        console.log('上传图片url', this.dialogImageUrl)
      }).catch(err => {
        console.error(err)
      })
    },
    /* 显示上传文件组件 */
    showUpload() {
      this.dialogVisible = true
    },
    /* 传递图片地址 */
    uploadInformation() {
      this.$emit('uploadInformation', this.dialogImageUrl)
      // 隐藏上传弹框
      this.dialogVisible = false
      this.uploadShow = false
      this.dialogImageUrl = ''
    },
    // 关闭弹框
    handleClose() {
      this.$confirm('点击取消后您填写的信息将丢失，您确定取消？')
          .then(() => {
            this.handleRemove()
            this.$emit('handleClose')
            // 隐藏上传文件
            this.dialogVisible = false
            this.dialogImageUrl = ''
          })
          .catch(() => {})
    },

    // 删除图片
    handleRemove() {
      this.uploadShow = false
      this.dialogImageUrl = ''
      return true
    },

    // 预览
    preview() {
      this.dialogVisibles = true
    },

    // 上传成功
    onSuccess(response) {
      // 返回错误
      // if (response.code !== 200)
      //   return this.$message.error('上传图片失败，请删除后重新上传')

      this.dialogImageUrl = window.global_config.UPLOAD_URL + response[0].url
      // this.dialogImageUrl = require('@/assets/bgImg/1652947082151.jpeg')
      console.log('上传图片url', this.dialogImageUrl)
    },

    // 上传前
    uploads(file) {
      if (!file.type.includes('image')) {
        this.$message.error('请上传图片！')
        return false
      }
      this.uploadShow = true
    },

    // 上传失败
    uploadError() {
      this.$message.error('请重新上传')
      this.uploadShow = false
    },
  },
  computed: {
    // baseurl
    baseupload() {
      // return 'http://127.0.0.1:8090/upload/img'
      return `${window.global_config.UPLOAD_URL}/upload`
    },

    // 提交按钮是否可以点击
    disabl() {
      if (!this.dialogImageUrl) return true
      return false
    },
  },
}
</script>

<style lang="less" scoped>
@import '../../../assets/css/minx.less';
.uploadImg {
  // 上传弹框内容部分
  /deep/.uploadIMG .el-dialog__body {
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
  }

  .disable {
    /deep/.el-upload {
      display: none !important;
    }
  }
}
</style>
