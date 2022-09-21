<template>
  <div class="page mt-8 justify-center">
    <div class="w-full test">
      <div v-for="(item, index) in menuList" :key="index" class="mb-4 list">
        <div class="header-style_other flex cursor-pointer" @click="gotoOrderList(item.shop.platform)">
          <div class="w-full relative tool-border">
            <div class="tool-box_other px-4 absolute">
              <div>
                <img class="tool-img" :src="item.shop.imgUrl" />
                <div class="tool-title">{{ item.shop.name }}</div>
              </div>
              <div class="flex-col">
                <div class="order-number text-center">{{ item.shop.waitCount }}</div>
                <div class="tool-title">待开票订单</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { shop } from '../api/shop'
export default {
  data() {
    return {
      menuList: []
    }
  },

  mounted() {
    document.title = '管理首页'
    this.getUserShops()
  },
  methods: {
    gotoOrderList(row) {
      localStorage.setItem('type', row.name)
      this.$router.push('/order/list')
    },
    getUserShops() {
      shop.getUserShops({}).then(res => {
        if (res.code == 1) {
          res.content.content.forEach(item => {
            if (item.shop.platform === 'youzan') {
              item.shop.imgUrl = '/img/youzan.png'
            }
            if (item.shop.platform === 'taobao') {
              item.shop.imgUrl = '/img/taobao.png'
            }
            if (item.shop.platform === 'kuaishou') {
              item.shop.imgUrl = '/img/kuaishou.png'
            }
            if (item.shop.platform === 'douyin') {
              item.shop.imgUrl = '/img/douyin.png'
            }
            if (item.shop.platform === 'jingdong') {
              item.shop.imgUrl = '/img/jingdong.png'
            }
            if (item.shop.platform === 'pingduoduo') {
              item.shop.imgUrl = '/img/pingduoduo.png'
            }
            if (item.shop.platform === 'suning') {
              item.shop.imgUrl = '/img/suning.png'
            }
            if (item.shop.platform === 'weimeng') {
              item.shop.imgUrl = '/img/weimeng.png'
            }
            if (item.shop.platform === 'ali') {
              item.shop.imgUrl = '/img/ali.png'
            }
          })
          this.menuList = res.content.content
        }
      })
    }
  }
}
</script>

<style>
.RightFixedContainer-absolute {
  @apply absolute;
}

.RightFixedContainer-fixed {
  @apply fixed top-2;
}

.test {
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 260px);
}

.header-style_other {
  padding: 0 5px;
  width: 260px;
  height: 160px;
}

.el-badge__content {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 12px;
  top: 1px !important;
  right: 16px !important;
}

.order-number {
  font-size: 40px;
  font-weight: 550;
}

.paging {
  margin-top: 20px;
  display: flex;
  justify-content: right;
}

.paging .el-pagination .el-icon {
  display: flex;
}

.tool-img {
  width: 60px;
  height: 60px;
  padding: 8px;
}
</style>
