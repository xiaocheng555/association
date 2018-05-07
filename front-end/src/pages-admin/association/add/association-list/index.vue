/*
 * File: index.vue
 * File Created: 2018-03-27 10:39:07 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-07 4:31:23 am
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div>
    <el-card class="association-list-pannel" :body-style="'padding: 0;'">
      <div slot="header" class="pannel-header">
        社团列表
        <el-button
          class="pannel-header-add-bnt"
          type="primary"
          size="mini"
          plain
          @click="addAssoShow = true">添加社团</el-button>
      </div>
      <ul class="association-list">
        <li
          class="association-list-item"
          :class="{ 'active':  asso.id === currAssoId }"
          v-for="asso in associationList"
          :key="asso.id">
            <a
              class="association-list-link"
              href="javascript:;"
              @click="toggleAssociation(asso)">
              {{ asso.name }}
            </a>
            <span class="association-list-action">
              <span class="association-list-edit" @click="editAssociation(asso)">编辑</span>
              <span class="association-list-delete" @click="deleteAssociation(asso)">删除</span>
            </span>
        </li>
      </ul>
      <el-pagination
        class="association-list-pagination"
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalCount">
      </el-pagination>
    </el-card>
    <el-dialog
      title="添加社团"
      :visible.sync="addAssoShow"
      width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item class="association-form-item" label="社团名称" prop="assoName">
          <el-input v-model="ruleForm.assoName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="addAssoShow = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submitAddAssoForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑社团"
      :visible.sync="editAssoShow"
      width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="editRuleForm" label-width="100px" class="ruleForm">
        <el-form-item class="association-form-item" label="社团名称" prop="assoName">
          <el-input v-model="ruleForm.assoName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="editAssoShow = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submitEditAssoForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'association-list',
  data () {
    return {
      currentPage: 1,
      totalCount: 50,
      associationList: [],
      currAssoId: null,
      editAssoShow: false,
      addAssoShow: false,
      ruleForm: {
        assoName: ''
      },
      rules: {
        assoName: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      currEditAssoId: null
    }
  },
  computed: {
    ...mapState([
      'pageSize'
    ])
  },
  methods: {
    // 跳转到第几页
    handleCurrentChange (currentPage) {
      let _query = Object.assign({}, this.$route.query, {
        currentPage
      })
      this.$router.push({
        query: _query
      })
    },
    // 获取列表数据
    fetchAssociationList () {
      return this.$store.dispatch('association-list', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage
        }
      }).then((res) => {
        if (res && res.data && res.errorCode === 0) {
          let data = res.data
          this.totalCount = data.totalCount
          this.associationList = this.handleListData(res.data.list)
        }
      })
    },
    // 数据转换
    handleListData (datalist) {
      return datalist.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
    },
    submitAddAssoForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('association-create', {
            data: {
              associationName: this.ruleForm.assoName
            }
          }).then(res => {
            if (res && res.errorCode === 0) {
              this.$message.success('社团添加成功')
              this.addAssoShow = false
              this.fetchAssociationList()
            }
          })
        }
      })
    },
    editAssociation (item) {
      this.currEditAssoId = item.id
      this.ruleForm.assoName = item.name
      this.editAssoShow = true
    },
    submitEditAssoForm () {
      this.$store.dispatch('association-save', {
        data: {
          associationId: this.currEditAssoId,
          associationName: this.ruleForm.assoName
        }
      }).then(res => {
        if (res && res.errorCode === 0) {
          this.editAssoShow = false
          this.$message.success('社团编辑成功')
          this.fetchAssociationList()
        }
      })
    },
    deleteAssociation (item) {
      this.$store.dispatch('association-destroy', {
        data: {
          associationId: item.id
        }
      }).then(res => {
        if (res && res.errorCode === 0) {
          this.$message.success('社团删除成功')
          this.fetchAssociationList()
        }
      })
    },
    toggleAssociation (item) {
      this.currAssoId = item.id
      this.$router.push({
        query: {
          assoId: item.id,
          assoName: item.name
        }
      })
    }
  },
  watch: {
    '$route.query.currentPage' () {
      this.fetchAssociationList()
    }
  },
  created () {
    this.currentPage = Number(this.$route.query.currentPage) || 1
    this.fetchAssociationList().then(() => {
      if (this.associationList.length > 0) {
        let _assoId = this.$route.query.assoId
        if (typeof _assoId !== 'undefined') {
          this.currAssoId = Number(_assoId) || null
        } else {
          this.toggleAssociation(this.associationList[0])
        }
      }
    })
  }
}
</script>

<style lang="less" scoped>
.association-list-pannel {
  .pannel-header {
    position: relative;
  }

  .pannel-header-add-bnt {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .association-list {
    padding: 10px;
    padding-bottom: 0;
  }

  .association-list-item {
    position: relative;
    margin-bottom: 4px;
    padding: 0 5px;
    border-radius: 4px;

    &:hover,
    &.active  {
      background-color: #f4f4f4;

      .association-list-link {
        color: #409EFF;
      }
    }
  }

  .association-list-link {
    display: block;
    padding: 8px;
    font-size: 14px;
    color: #444444;
  }

  .association-list-action {
    position: absolute;
    top: 5px;
    right: 15px;
  }

  .association-list-edit {
    padding-right: 8px;
    font-size: 12px;
    color: #409EFF;
    cursor: pointer;
  }

  .association-list-delete {
    font-size: 12px;
    color: #F56C6C;
    cursor: pointer;
  }

  .association-list-pagination {
    padding-bottom: 30px;
    text-align: center;
  }
}

.association-form-item {
  width: 350px;
}
</style>
