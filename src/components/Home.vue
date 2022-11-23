<template>
  <el-container class="home-container">
    <!-- header -->
    <el-header>
      <div>
        <img src="../assets/logo.jpg" alt="" />
        <span>Content Manage System</span>
      </div>
      <el-button type="info" @click="logout">Logout</el-button>
    </el-header>
    <!-- body -->
    <el-container>
      <!-- aside -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse" v-show="!isCollapse" style="font-weight: 500; color: #fff">S</div>
        <div class="toggle-button" @click="toggleCollapse" v-show="isCollapse" style="font-weight: 500; color: #fff">E</div>
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
  padding-left: 20px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      border-radius: 20px;
    }
    span {
      margin-left: 15px;
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
  background-color: #4a5064;
  font-style: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>

