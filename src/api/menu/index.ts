import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { MenuQuery, MenuVO, MenuForm } from "./types";

/**
 * 获取路由列表
 */
export async function listRoutes():AxiosPromise {
  // let r= request({
  //   url: "/api/v1/menus/routes",
  //   method: "get",
  // });
  try{
    console.log("/api/v1/menus/routes获取路由列表",'r')
    const list:any = []

  
      return list
  }catch (error) {
    console.error(error);
    return request({
        url: "/api/v1/menus/routes",
        method: "get",
      });
   }
  
}

export function listRoutes00() {
  return request({
    url: "/api/v1/menus/routes",
    method: "get",
  });
}

/**
 * 获取菜单树形列表
 *
 * @param queryParams
 */
export function listMenus(queryParams: MenuQuery): AxiosPromise<MenuVO[]> {
  let r= request({
    url: "/api/v1/menus",
    method: "get",
    params: queryParams,
  });
  console.log("/api/v1/menus获取菜单树形列表",r)
  return r
}

export function listMenus00(queryParams: MenuQuery): AxiosPromise<MenuVO[]> {
  return request({
    url: "/api/v1/menus",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取菜单下拉树形列表
 */
export function getMenuOptions(): AxiosPromise<OptionType[]> {
  let r= request({
    url: "/api/v1/menus/options",
    method: "get",
  });

  console.log("/api/v1/menus/options获取菜单下拉树形列表",r)
  return r

}
export function getMenuOptions00(): AxiosPromise<OptionType[]> {
  return request({
    url: "/api/v1/menus/options",
    method: "get",
  });
 
}
/**
 * 获取菜单表单数据
 *
 * @param id
 */
export function getMenuForm(id: number): AxiosPromise<MenuForm> {
  return request({
    url: "/api/v1/menus/" + id + "/form",
    method: "get",
  });
}



export function getMenuForm00(id: number): AxiosPromise<MenuForm> {
  let r= request({
    url: "/api/v1/menus/" + id + "/form",
    method: "get",
  });

  console.log("/api/v1/menus/" + id + "/form获取菜单表单数据",r)
  return r
}



/**
 * 添加菜单
 *
 * @param data
 */
export function addMenu(data: MenuForm) {
  return request({
    url: "/api/v1/menus",
    method: "post",
    data: data,
  });
}

/**
 * 修改菜单
 *
 * @param id
 * @param data
 */
export function updateMenu(id: string, data: MenuForm) {
  return request({
    url: "/api/v1/menus/" + id,
    method: "put",
    data: data,
  });
}

/**
 * 删除菜单
 *
 * @param id 菜单ID
 */
export function deleteMenu(id: number) {
  return request({
    url: "/api/v1/menus/" + id,
    method: "delete",
  });
}
