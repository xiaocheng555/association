/*
 * File: index.vue
 * File Created: 2018-03-27 10:39:07 pm
 * Author: zhanghuancheng555 (1052745517@qq.com)
 * Copyright: 2017 - 2018 Your Company, Your Company
 * -----
 * Last Modified: 2018-05-08 5:20:48 pm
 * Modified By: zhanghuancheng555 (1052745517@qq.com>)
 */

<template>
  <div>
    <el-card class="admin-list-pannel">
      <div slot="header" class="pannel-header">
        {{ currAssociation.name || '-' }}
        <el-button
          class="pannel-header-add-bnt"
          type="primary"
          size="mini"
          plain
          @click="onAddAdminClick">添加管理员</el-button>
      </div>
      <h4 class="admin-list-title">管理员列表</h4>
      <el-table
        :data="adminList"
        :stripe="true"
        :border="true"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="name"
          width="150"
          label="名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          width="150"
          label="帐号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="password"
          width="150"
          label="密码">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editAdmin(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteAdmin(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="添加管理员"
      :visible.sync="addAssoShow"
      width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
        <el-form-item class="admin-form-item" label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item class="admin-form-item" label="帐号" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item class="admin-form-item" label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="addAssoShow = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submitAddAdminForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑管理员"
      :visible.sync="editAssoShow"
      width="50%">
      <el-form :model="ruleForm" :rules="rules" ref="editRuleForm" label-width="100px" class="ruleForm">
        <el-form-item class="admin-form-item" label="名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item class="admin-form-item" label="帐号">
          <el-input :disabled="true" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item class="admin-form-item" label="密码 " prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="medium" @click="editAssoShow = false">取 消</el-button>
        <el-button size="medium" type="primary" @click="submitEditAdminForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'admin-list',
  data () {
    return {
      currAssociation: {
        id: null,
        name: ''
      },
      adminList: [],
      editAssoShow: false,
      addAssoShow: false,
      ruleForm: {
        name: '',
        username: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      },
      currEditAdminId: null
    }
  },
  computed: {
    ...mapState([
      'pageSize'
    ])
  },
  methods: {
    // 获取列表数据
    fetchAdminList () {
      this.$store.dispatch('admin-list', {
        params: {
          associationId: this.currAssociation.id
        }
      }).then((res) => {
        if (res && res.data && res.errorCode === 0) {
          this.adminList = this.handleListData(res.data)
        }
      })
    },
    // 数据转换
    handleListData (datalist) {
      return datalist.map(item => {
        return {
          id: item.id,
          name: item.name,
          username: item.username,
          password: item.password
        }
      })
    },
    onAddAdminClick () {
      this.ruleForm.name = ''
      this.ruleForm.username = ''
      this.ruleForm.password = ''
      this.addAssoShow = true
    },
    submitAddAdminForm () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('admin-create', {
            data: {
              name: this.ruleForm.name,
              username: this.ruleForm.username,
              password: this.ruleForm.password,
              associationId: this.currAssociation.id
            }
          }).then(res => {
            if (res && res.errorCode === 0) {
              this.$message.success('管理员添加成功')
              this.addAssoShow = false
              this.fetchAdminList()
            }
          })
        }
      })
    },
    editAdmin (item) {
      this.currEditAdminId = item.id
      this.ruleForm.name = item.name
      this.ruleForm.username = item.username
      this.ruleForm.password = item.password
      this.editAssoShow = true
    },
    submitEditAdminForm () {
      this.$store.dispatch('admin-update', {
        data: {
          adminId: this.currEditAdminId,
          name: this.ruleForm.name,
          password: this.ruleForm.password
        }
      }).then(res => {
        if (res && res.errorCode === 0) {
          this.editAssoShow = false
          this.$message.success('管理员编辑成功')
          this.fetchAdminList()
        }
      })
    },
    deleteAdmin (item) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('admin-destroy', {
          data: {
            adminId: item.id
          }
        }).then(res => {
          if (res && res.errorCode === 0) {
            this.$message.success('管理员删除成功')
            this.fetchAdminList()
          }
        })
      }).catch(() => {})
    },
    toggleAdmin (id) {
      this.$router.push({
        query: {
          assoId: id
        }
      })
    }
  },
  watch: {
    '$route.query.assoId' (assoId) {
      this.currAssociation.id = assoId
      this.fetchAdminList()
    },
    '$route.query.assoName' (assoName) {
      this.currAssociation.name = assoName
    }
  },
  created () {
    let _assoId = Number(this.$route.query.assoId) || null
    let _assoName = this.$route.query.assoName
    if (_assoId) {
      this.currAssociation.id = _assoId
      this.currAssociation.name = _assoName
      this.fetchAdminList()
    }
  }
}
</script>

<style lang="less" scoped>
.admin-list-pannel {
  .pannel-header {
    position: relative;
  }

  .pannel-header-add-bnt {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .admin-list-title {
    padding-bottom: 10px;
    font-size: 13px;
  }

  .admin-list-item {
    position: relative;
    padding: 8px;
  }

  .admin-list-link {
    font-size: 14px;
    color: #444444;
  }

  .admin-list-action {
    position: absolute;
    top: 5px;
    right: 0px;
  }

  .admin-list-edit {
    padding-right: 8px;
    font-size: 12px;
    color: #409EFF;
    cursor: pointer;
  }

  .admin-list-delete {
    font-size: 12px;
    color: #F56C6C;
    cursor: pointer;
  }

  .admin-list-pagination {
    text-align: center;
  }
}

.admin-form-item {
  width: 350px;
}
</style>
