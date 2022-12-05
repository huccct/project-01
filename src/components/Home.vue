<template>
  <el-container class="home-container">
    <!-- header -->
    <el-header>
      <div>
        <img src="../assets/logo.jpg" alt="" class="logo" />
        <span>Manage System</span>
        <div class="toggle-button" @click="toggleCollapse" v-show="!isCollapse">
          <img src="../assets/imgs/expand.png" alt="" />
        </div>
        <div class="toggle-button" @click="toggleCollapse" v-show="isCollapse">
          <img src="../assets/imgs/shrive.png" alt="" />
        </div>
      </div>
      <el-button type="info" @click="logout">Logout</el-button>
    </el-header>
    <!-- body -->
    <el-container class="container">
      <!-- aside -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- navmenu -->
        <el-menu background-color="#343a40" text-color="#fff" active-text-color="#409eff" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- one level menu -->
          <el-submenu :index="item.id + ''" v-for="(item, index) in menulist" :key="item.id">
            <!-- level one menu template area -->
            <template slot="title">
              <!-- icon -->
              <i :class="iconsObj[item.id]"></i>
              <!-- text -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- two level menu -->
            <el-menu-item :index="'/' + subItem.path + ''" v-for="(subItem, index) in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <!-- icon -->
              <i class="el-icon-menu"></i>
              <!-- text -->
              <span>{{ subItem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- right-body -->
      <el-main>
        <router-view></router-view>
        <el-footer>
          <div class="footer">©Power By Group Thirteen</div>
        </el-footer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menulist: [],
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList();
    this.activePath = sessionStorage.getItem('activePath');
  },
  methods: {
    logout () {
      sessionStorage.clear();
      this.$router.push('/login');
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus');
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
      // console.log(res.data);
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState (activePath) {
      sessionStorage.setItem('activePath', activePath);
      this.activePath = activePath;
    }
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 15px;
  align-items: center;
  color: #fff;
  font-size: 15px;
  > div {
    display: flex;
    align-items: center;
    .logo {
      width: 30px;
      height: 30px;
      border-radius: 20px;
    }
    span {
      margin-left: 10px;
      font-weight: 700;
    }
  }
}
.el-aside {
  background-color: #343a40;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #f4f6f9;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  cursor: pointer;
  margin-left: 30px;
  font-size: 14px;
}
.toggle-button img {
  width: 20px;
  height: 20px;
}
.footer {
  margin-top: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #909399;
}
.container {
  height: calc(100vh - 90px);
}
</style>

