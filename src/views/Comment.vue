<template>
  <el-container class="comment">
    <el-main>
      <el-tabs v-model="comment_select">
        <!-- 文章管理 -->
        <el-tab-pane label="文章管理" name="first">
          <!-- 搜索框 -->
          <el-form
            class="cm_search_form display_flex justify_content_start align_items_center"
            action="/search"
            method="post"
          >
            <el-input
              type="text"
              name="search"
              placeholder="请输入搜索内容"
              v-model="search_txt"
            ></el-input>
            <el-button type="primary">查询</el-button>
          </el-form>
          <!-- 数据表 -->
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="日期" sortable width="155">
            </el-table-column>

            <el-table-column prop="title" label="标题">
              <template slot-scope="scope">
                <el-link :href="scope.row.url" target="_blank">{{
                  scope.row.title
                }}</el-link>
              </template>
            </el-table-column>

            <el-table-column prop="comment" label="评论"></el-table-column>

            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" size="medium">回复</el-button>
                <el-button type="text" size="medium">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </el-tab-pane>

        <!-- 回复评论 -->
        <el-tab-pane label="回复评论" name="second">
          <el-form
            class="cm_form"
            ref="form"
            :model="comment_artcle"
            label-width="80px"
          >
            <el-form-item class="ipt" label="文章标题">
              <el-link :href="comment_artcle.url" target="_blank">{{
                comment_artcle.title
              }}</el-link>
            </el-form-item>

            <el-form-item class="ipt editor_notoolbars" label="评论内容">
              <mavon-editor
                v-model="comment_artcle.comment"
                :subfield="toolbarsObj.subfield"
                :defaultOpen="toolbarsObj.defaultOpen"
                :toolbarsFlag="toolbarsObj.toolbarsFlag"
                :scrollStyle="toolbarsObj.scrollStyle"
                :ishljs="toolbarsObj.ishljs"
              />
            </el-form-item>

            <el-form-item class="editor" label="回复内容">
              <mavon-editor v-model="comment_artcle.content" />
            </el-form-item>

            <el-form-item class="ipt">
              <el-button type="primary">回复</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Comment',
  data () {
    return {
      toolbarsObj: {
        subfield: false,
        defaultOpen: 'preview',
        toolbarsFlag: false,
        scrollStyle: true,
        ishljs: true
      },
      comment_select: 'first',
      search_txt: '',
      tableData: [
        {
          date: '2016-05-02 15:16:00',
          title: '王小虎',
          url: 'http://baidu.com',
          comment: 'xxxxxxxxxxxxxxxxxxxxxxxxx'
        },
        {
          date: '2016-05-04',
          title: '王小虎',
          url: 'http://baidu.com',
          comment: ''
        },
        {
          date: '2016-05-01',
          title: '王小虎',
          url: 'http://baidu.com',
          comment: ''
        },
        {
          date: '2016-05-03',
          title: '王小虎',
          url: 'http://baidu.com',
          comment: ''
        }
      ],
      comment_artcle: {
        title: '你好啊世界',
        url: 'http://baidu.com',
        comment: '<h1>在吗</h1>',
        content: ''
      }
    }
  }
}
</script>

<style scoped>
.comment {
  width: 100%;
}

.el-main {
  padding: 30px;
}

.el-tabs {
  padding: 30px;
  background: #fff;
}

.cm_search_form {
  width: 407px;
  height: 42px;
  margin-bottom: 15px;
}
.cm_search_form >>> .el-input__inner {
  border-radius: 4px 0 0 4px;
}
.cm_search_form .el-button {
  height: 40px;
  padding: 0 20px;
  background-image: linear-gradient(90deg, #397dff 0%, #428dff 100%),
    linear-gradient(#418cff, #418cff) !important;
  border-radius: 0 4px 4px 0;
}

.el-form >>> .el-textarea__inner {
  min-height: 150px !important;
  max-height: 500px !important;
}
.ipt {
  width: 500px;
}
.editor {
  width: 100%;
}
.editor >>> .el-form-item__content,
.editor .markdown-body {
  height: 500px;
}
.editor_notoolbars >>> .el-form-item__content,
.editor_notoolbars .markdown-body {
  height: 300px;
}
.el-pagination {
  margin-top: 17px;
}
</style>
