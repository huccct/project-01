<template>
  <div>
    <!-- breadcrumbs -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- card view -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="please input some contents" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"> Add User </el-button>
        </el-col>
      </el-row>

      <!-- table view -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="username" prop="username"> </el-table-column>
        <el-table-column label="email" prop="email"> </el-table-column>
        <el-table-column label="mobile" prop="mobile"> </el-table-column>
        <el-table-column label="role" prop="role_name"> </el-table-column>
        <el-table-column label="state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="operation" width="180px">
          <template slot-scope="scope">
            <!-- edit -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- delete -->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!-- assign -->
            <el-tooltip key="" effect="dark" content="Assign Roles" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- pagination -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </el-card>

    <!-- add users -->
    <el-dialog title="Add User" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item label="username" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="email" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="mobile" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- edit users -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  created () {
    this.getUserList();
  },
  data () {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+/;

      if (regEmail.test(value)) {
        return callback();
      }

      callback(new Error('请输入合法的邮箱'));
    };

    var checkMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if (regMobile.test(value)) {
        return callback();
      }
      callback(new Error('请输入合法的手机号'));
    };
    return {

      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名的长度在3~10个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '用户名的长度在6~15个字符之间', trigger: 'blur' },

        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editForm: {}

    }
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo });
      // console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败！');
      }
      // console.log(res.data);
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    async userStateChanged (userInfo) {
      // console.log(userInfo);
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error('Failed to update user status!');
      }
      this.$message.success('Update user status succeeded!');
    },
    addDialogClosed () {
      this.$refs.addFormRef.resetFields();
    },
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post('users', this.addForm);
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败');
        }

        this.$message.success('添加用户成功！');

        this.addDialogVisible = false;
        this.getUserList();
      })
    },
    async showEditDialog (id) {
      // console.log(id);
      const { data: res } = await this.$http.get(`users/${id}`);

      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！');
      }
      this.editForm = res.data;
      this.editDialogVisible = true;
    },

  },
}
</script>

<style lang="less" scoped>
</style>
