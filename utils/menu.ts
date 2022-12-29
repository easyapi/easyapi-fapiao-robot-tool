/**
 * 左侧菜单
 */
export const menuList = [{
  name: '首页',
  path: '/',
  meta: { title: '首页', icon: '' },
  children: [],
}, {
  name: '发票服务',
  children: [{
    name: '开具发票',
    path: '/make',
    meta: { title: '开具发票', icon: '' },
  }, {
    name: '发票红冲',
    path: '/red',
    meta: { title: '发票红冲', icon: '' },
  }, {
    name: '发票作废',
    path: '/cancel',
    meta: { title: '发票作废', icon: '' },
  }, {
    name: '发票同步查询',
    path: '/query',
    meta: { title: '发票同步查询', icon: '' },
  }, {
    name: '发票打印',
    path: '/print',
    meta: { title: '发票打印', icon: '' },
  }, {
    name: '发票重试',
    path: '/retry',
    meta: { title: '发票重试', icon: '' },
  }, {
    name: '发票库存查询',
    path: '/amount',
    meta: { title: '发票库存查询', icon: '' },
  }, {
    name: '重发邮件',
    path: '/email',
    meta: { title: '重发邮件', icon: '' },
  }, {
    name: '税盘状态',
    path: '/state',
    meta: { title: '税盘状态', icon: '' },
  }],
},
{
  name: '全电服务',
  children: [{
    name: '开具全电发票',
    path: '/quandian/make',
    meta: { title: '开具全电发票', icon: '' },
  }, {
    name: '全电发票查询',
    path: '/quandian/query',
    meta: { title: '全电发票查询', icon: '' },
  }, {
    name: '全电发票打印',
    path: '/quandian/print',
    meta: { title: '全电发票打印', icon: '' },
  }, {
    name: '全电发票红冲',
    path: '/quandian/red',
    meta: { title: '全电发票红冲', icon: '' },
  }],
}, {
  name: '机器人',
  children: [{
    name: '发票机器人状态',
    path: '/robot',
    meta: { title: '发票机器人状态', icon: '' },
  }],
},
]
