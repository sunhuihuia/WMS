export const Competence = [
  {
    children: [
      {
        always_show: null,
        component: () => import("/src/views/system/role/index.vue"),
        hidden: false,
        icon: "document",
        id: 7,
        igrade: 7,
        keep_alive: true,
        meta: {
          title: "角色管理",
          icon: "document",
          hidden: false,
          roles: [],
        },
        name: "角色管理",
        parent_id: 7,
        path: "role",
        title: "角色管理",
      },
      {
        always_show: null,
        component: () => import("/src/views/system/menu/index.vue"),
        hidden: false,
        icon: "document",
        id: 8,
        igrade: 8,
        keep_alive: true,
        meta: {
          title: "权限管理",
          icon: "document",
          hidden: false,
          roles: [],
        },
        name: "权限管理",
        parent_id: 8,
        path: "menu",
        title: "权限管理",
      },
    ],
    component: () => import("/src/layout/index.vue"),
    hidden: false,
    meta: {
      hidden: false,
      icon: "document",
      roles: ["ROOT", "ADMIN", "vendor"],
      title: "系统管理",
    },
    icon: "setting",
    id: 6,
    name: "系统管理",
    path: "/system",
    parent_id: 6,
    keep_alive: null,
    igrade: 2,
  },
  {
    children: [
      {
        always_show: null,
        component: () => import("/src/views/order/query.vue"),
        hidden: false,
        icon: "document",
        id: 9,
        igrade: 9,
        keep_alive: true,
        meta: {
          title: "订单查询",
          icon: "document",
          hidden: false,
          roles: [],
        },
        name: "订单查询",
        parent_id: 9,
        path: "query",
        title: "订单查询",
      },
      {
        always_show: null,
        component: () => import("/src/views/order/orderConfirm.vue"),
        hidden: false,
        icon: "document",
        id: 11,
        igrade: 11,
        keep_alive: true,
        meta: {
          title: "订单确认",
          icon: "document",
          hidden: false,
          roles: [],
        },
        name: "订单确认",
        parent_id: 11,
        path: "orderConfirm",
        title: "订单确认",
      },
    ],
    component: () => import("/src/layout/index.vue"),
    hidden: false,
    meta: {
      hidden: false,
      icon: "document",
      roles: ["ROOT", "ADMIN", "vendor"],
      title: "采购订单",
    },
    icon: "setting",
    id: 8,
    name: "采购订单",
    path: "/order",
    parent_id: 8,
    keep_alive: null,
    igrade: 3,
  },
];
