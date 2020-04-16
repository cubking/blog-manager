<template>
  <el-container class="artcle">
    <el-main>
      <el-tabs v-model="artcle_select">
        <!-- 文章管理 -->
        <el-tab-pane label="文章管理" name="first">
          <!-- 搜索框 -->
          <el-form
            class="at_search_form display_flex justify_content_start align_items_center"
            action="/search"
            method="post"
          >
            <el-input
              type="text"
              name="search"
              placeholder="请输入搜索内容"
              v-model="search_txt"
            ></el-input>
            <el-button type="primary" @click="getSearchArtcleList"
              >查询</el-button
            >
          </el-form>
          <!-- 数据表 -->
          <el-table :data="table_data" border style="width: 100%">
            <el-table-column
              prop="publicTime"
              label="日期"
              sortable
              width="155"
            ></el-table-column>

            <el-table-column prop="title" label="标题"></el-table-column>

            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="medium"
                  @click="artcleHandle('prev', scope.row)"
                  >预览</el-button
                >
                <el-button
                  type="text"
                  size="medium"
                  @click="artcleHandle('edit', scope.row)"
                  >编辑</el-button
                >

                <el-button
                  type="text"
                  size="medium"
                  @click="artcleHandle('delete', scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="artcle_num"
            :page-size="page_artcle"
            :page-count="page_num"
            :pager-count="page_btn_num"
            :current-page="page_now"
            :hide-on-single-page="true"
            @current-change="changePage"
          >
          </el-pagination>
        </el-tab-pane>

        <!-- 添加文章 -->
        <el-tab-pane label="添加文章" name="second">
          <el-row class="ipt display_flex align_items_center">
            <span>文章标题</span>
            <el-input type="text" v-model="add_artcle.title"></el-input>
          </el-row>

          <el-row class="ipt display_flex align_items_center">
            <span>文章网址</span>
            <el-input type="text" v-model="add_artcle.url"></el-input>
          </el-row>

          <el-row class="ipt editor display_flex">
            <span>文章内容</span>
            <mavon-editor v-model="add_artcle.content" @change="getAddVal" />
          </el-row>

          <el-row
            class="ipt display_flex justify_content_center align_items_center"
          >
            <el-button type="primary" @click="addArtcle">添加</el-button>
            <el-button @click="cancelHandle('add')">取消</el-button>
          </el-row>
        </el-tab-pane>

        <!-- 编辑文章 -->
        <el-tab-pane label="编辑文章" name="three">
          <div v-if="edit_artcle.title && edit_artcle.content">
            <el-row class="ipt display_flex align_items_center">
              <span>文章标题</span>
              <el-input type="text" v-model="edit_artcle.title"></el-input>
            </el-row>

            <el-row class="ipt display_flex align_items_center">
              <span>文章网址</span>
              <el-input type="text" v-model="edit_artcle.url"></el-input>
            </el-row>

            <el-row class="ipt editor display_flex">
              <span>文章内容</span>
              <mavon-editor
                v-model="edit_artcle.content"
                @change="getEditVal"
              />
            </el-row>

            <el-row
              class="ipt display_flex justify_content_center align_items_center"
            >
              <el-button type="primary" @click="editArtcle">修改</el-button>
              <el-button @click="cancelHandle('edit')">取消</el-button>
            </el-row>
          </div>

          <div v-else>
            <span class="display_flex ">暂无编辑文章</span>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!-- 预览文章 -->
      <el-drawer
        id="aT_drawer"
        class="transform_center"
        :title="drawerObj.drawer_title"
        :append-to-body="true"
        :visible.sync="drawerObj.drawer"
        :direction="drawerObj.direction"
        :destroy-on-close="true"
        :with-header="true"
        :before-close="closePrev"
      >
        <mavon-editor
          :subfield="drawerObj.subfield"
          :defaultOpen="drawerObj.defaultOpen"
          :toolbarsFlag="drawerObj.toolbarsFlag"
          :scrollStyle="drawerObj.scrollStyle"
          v-model="drawerObj.content"
        />
      </el-drawer>

      <!-- 删除对话框 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogObj.dialog"
        width="30%"
        :append-to-body="true"
        center
        :destroy-on-close="true"
      >
        <span>是否删除文章: {{ dialogObj.artcle_title }} </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelRemove">取消</el-button>
          <el-button type="danger" @click="confirmRemove">确定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
let that

export default {
  name: 'Artcle',
  data () {
    return {
      // 抽屉配置对象
      drawerObj: {
        // 抽屉标题
        drawer_title: '',
        // 抽屉是否显示
        drawer: false,
        // 显示过程，从上往下
        direction: 'ttb',
        // 抽屉的内容
        content: '',
        // 双栏显示，true为双栏，false为单栏
        subfield: false,
        // 默认展示区域
        defaultOpen: 'preview',
        // 工具栏是否显示
        toolbarsFlag: false,
        // 开启滚动条样式
        scrollStyle: true
      },
      // 对话框配置对象
      dialogObj: {
        // 是否显示对话框
        dialog: false,
        // 文章id
        artcle_id: '',
        // 文章标题
        artcle_title: ''
      },
      // 文章选中项
      artcle_select: 'first',
      // 搜索内容
      search_txt: '',
      // 文章列表数据
      table_data: [],
      // 当前页数
      page_now: 1,
      // 文章总数
      artcle_num: 0,
      // 每页显示文章数
      page_artcle: 5,
      // 总页数
      page_num: 0,
      // 显示多少个按钮
      page_btn_num: 5,
      // 添加文章的数据
      add_artcle: {
        // 标题
        title: '',
        // 网址
        url: '',
        // markdown 内容
        content: '',
        // html 内容
        html_content: ''
      },
      // 编辑文章的数据
      edit_artcle: {
        // 文章 id
        id: '',
        // 标题
        title: '',
        // 网址
        url: '',
        // markdown 内容
        content: '',
        // html 内容
        html_content: ''
      }
    }
  },
  mounted () {
    that = this

    // 获取文章列表
    that.getArtcleList()
  },
  methods: {
    // 获取搜索的文章列表
    getSearchArtcleList () {
      that.getArtcleList(1, that.search_txt)
    },

    // 切换分页
    // -nowPage：当前页数
    changePage (nowPage) {
      that.getArtcleList(nowPage, that.search_txt)
    },

    // 当前文章操作
    // -type：文章操作类型；prev 预览、edit 编辑、delete 删除
    // -artcleObj：当前文章对象
    artcleHandle (type, artcleObj) {
      console.log(artcleObj)
      switch (type) {
        // 预览当前文章
        case 'prev':
          that.$vue.set(that.drawerObj, 'drawer', true)
          that.$vue.set(that.drawerObj, 'drawer_title', artcleObj.title)
          that.$vue.set(that.drawerObj, 'content', artcleObj.content)
          break
        // 编辑当前文章
        case 'edit':
          console.log(artcleObj.content)
          that.$vue.set(that.edit_artcle, 'id', artcleObj.id)
          that.$vue.set(that.edit_artcle, 'title', artcleObj.title)
          that.$vue.set(that.edit_artcle, 'url', artcleObj.url)
          that.$vue.set(that.edit_artcle, 'content', artcleObj.content)
          // that.$vue.set(that.edit_artcle, 'html_content', artcleObj.htmlContent)
          that.$vue.set(that, 'artcle_select', 'three')
          break
        // 删除当前文章
        case 'delete':
          let dialog = {
            dialog: true,
            artcle_id: artcleObj.id,
            artcle_title: artcleObj.title
          }
          that.$vue.set(that, 'dialogObj', dialog)
          break
      }
    },

    // 关闭预览窗口
    closePrev () {
      that.$vue.set(that.drawerObj, 'drawer', false)
      that.$vue.set(that.drawerObj, 'drawer_title', '')
      that.$vue.set(that.drawerObj, 'content', '')
    },

    // 取消删除文章操作
    cancelRemove () {
      let dialog = {
        dialog: false,
        artcle_id: '',
        artcle_title: ''
      }
      that.$vue.set(that, 'dialogObj', dialog)
    },

    // 确认删除文章
    confirmRemove () {
      let data = {
        token: that.$config.token,
        id: that.dialogObj.artcle_id
      }

      that.$http._post(
        that.$api.Index.remove_artcle,
        that.$qs.stringify(data),
        resData => {
          that.$vue.set(that.dialogObj, 'dialog', false)
          that.$vue.set(that.dialogObj, 'artcle_id', '')
          that.$vue.set(that.dialogObj, 'artcle_title', '')

          that.getArtcleList()
        }
      )
    },

    // 获取文章列表
    // -nowPage：当前页
    // -searchText：搜索内容
    getArtcleList (nowPage, searchText) {
      that.$http._post(
        that.$api.Index.artcle_list,
        that.$qs.stringify({
          token: that.$config.token,
          page: nowPage || 1,
          one_page_num: that.page_artcle,
          search_text: searchText || ''
        }),
        resData => {
          that.$vue.set(that, 'table_data', resData.artcle_list)
          that.$vue.set(that, 'artcle_num', resData.artcle_total)
          that.$vue.set(that, 'page_now', nowPage || 1)
          that.$vue.set(
            that,
            'page_num',
            parseInt(resData.artcle_total) / that.page_artcle
          )
        }
      )
    },

    // 获取添加的 value
    // -value：markdown 数据
    // -render：html 数据
    getAddVal (value, render) {
      that.$vue.set(that.add_artcle, 'html_content', JSON.stringify(render))
    },

    // 获取编辑的 value
    // -value：markdown 数据
    // -render：html 数据
    getEditVal (value, render) {
      that.$vue.set(that.edit_artcle, 'html_content', JSON.stringify(render))
    },

    // 添加文章
    addArtcle () {
      let artcle = {}

      Object.assign(artcle, {
        title: that.add_artcle.title,
        url: that.add_artcle.url,
        content: JSON.stringify(that.add_artcle.content),
        html_content: that.add_artcle.html_content,
        token: that.$config.token
      })

      if (!artcle.title) {
        that.$message({
          showClose: true,
          message: '请填写标题',
          type: 'error'
        })
      } else if (!artcle.content) {
        that.$message({
          showClose: true,
          message: '请填写标题',
          type: 'error'
        })
      } else if (!artcle.content) {
        that.$message({
          showClose: true,
          message: '请填写内容',
          type: 'error'
        })
      } else if (!artcle.content) {
        that.$message({
          showClose: true,
          message: '请填写标题',
          type: 'error'
        })
      } else {
        that.$http._post(
          that.$api.Index.add_artcle,
          that.$qs.stringify(artcle),
          resData => {
            let artcle = {
              title: '',
              url: '',
              content: '',
              html_content: ''
            }
            that.$vue.set(that, 'add_artcle', artcle)
            that.$vue.set(that, 'artcle_select', 'first')

            // 获取文章列表
            that.getArtcleList(1)
          }
        )
      }
    },

    // 编辑文章
    editArtcle () {
      let data = {}

      Object.assign(data, {
        token: that.$config.token,
        id: that.edit_artcle.id,
        title: that.edit_artcle.title,
        url: that.edit_artcle.url,
        content: JSON.stringify(that.edit_artcle.content),
        html_content: that.edit_artcle.html_content
      })

      that.$http._post(
        that.$api.Index.edit_artcle,
        that.$qs.stringify(data),
        resData => {
          let editArtcle = {
            id: '',
            title: '',
            url: '',
            content: '',
            html_content: ''
          }
          that.$vue.set(that, 'edit_artcle', editArtcle)
          that.$vue.set(that, 'artcle_select', 'first')

          that.getArtcleList()
        }
      )
    },

    // 取消添加
    cancelHandle (type) {
      let artcle

      if (type === 'add') {
        artcle = {
          title: '',
          url: '',
          content: '',
          html_content: ''
        }
        that.$vue.set(that, 'add_artcle', artcle)
      } else {
        artcle = {
          title: '',
          url: '',
          content: '',
          html_content: ''
        }
        that.$vue.set(that, 'edit_artcle', artcle)
      }
      that.$vue.set(that, 'artcle_select', 'first')
    }
  }
}
</script>

<style scoped>
.artcle {
  width: 100%;
}

.el-main {
  padding: 30px;
}

.el-tabs {
  padding: 30px;
  background: #fff;
}

.at_search_form {
  width: 407px;
  height: 42px;
  margin-bottom: 15px;
}
.at_search_form >>> .el-input__inner {
  border-radius: 4px 0 0 4px;
}
.at_search_form .el-button {
  height: 40px;
  padding: 0 20px;
  background-image: linear-gradient(90deg, #397dff 0%, #428dff 100%),
    linear-gradient(#418cff, #418cff) !important;
  border-radius: 0 4px 4px 0;
}

.ipt {
  width: 500px;
  margin-bottom: 22px;
}
.ipt span {
  width: 80px;
  text-align: right;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
}
.editor span {
  width: 68px;
}
.editor {
  width: 100%;
}
.editor .markdown-body {
  height: 500px;
  width: 1000px;
}
.el-pagination {
  margin-top: 17px;
}

.el-drawer__wrapper {
  top: 50%;
  left: 50%;
  width: 1000px;
  height: 800px;
}
#aT_drawer >>> .el-drawer__container {
  overflow-y: scroll;
}
#aT_drawer >>> .el-drawer {
  height: auto !important;
}

#aT_drawer >>> .el-drawer__close-btn,
#aT_drawer >>> .el-drawer__header > :first-child {
  outline: none;
}
#aT_drawer >>> .el-drawer__header > :first-child {
  font-size: 20px;
}
</style>
