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


    var Menu= await   request.post("http://shsd666.gnway.org:9999/NewWebApi/api/Values/Work2407",{"CommandType":"select","database":"wlzh_srm",
                         "SqlsStr":"select  id,parent_id,route_path as [path],component,route_name [name],[name] title,icon,cast((case when visible=0 then 1 else 0 end) as bit) as [hidden],cast(always_show as bit) always_show,cast(keep_alive as bit) keep_alive,igrade   from 	sys_menu order by tree_path" });
    console.log('Menu 获取菜单列表',Menu)
    var RoleMenu= await   request.post("http://shsd666.gnway.org:9999/NewWebApi/api/Values/Work2407",{"CommandType":"select","database":"wlzh_srm",
                         "SqlsStr":"select a.menu_id,a.role_code code from sys_role_menu a  " });
    Menu.data.forEach((element:any) => {
      var rms=[]
      rms=RoleMenu.data.filter((item:any)=> item.menu_id==element.id)
      const roles1 = rms.filter((item:any) => item.menu_id==element.id).map((item:any) => item.code)
      element.meta={
        title:element.title,
        icon:element.icon,
        hidden:element.hidden,
        roles:roles1
      }
    });
    console.log('Menu 菜单列表初步处理后',Menu)
    
    let maxIgrade = Menu.data.reduce((max:any, item:any) => {
      return Math.max(max, item.igrade);
    }, -Infinity);
    console.log('获取最大菜单级数',maxIgrade)
    for (let i = maxIgrade; i >1; i--) {
      var rms=[]
      rms=Menu.data.filter((item:any)=> item.igrade==i)
      console.log('获取级次'+ i +'的数组',rms)
      rms.forEach((element:any) => {
        var parent_menu=  Menu.data.find((item0:any)=> item0.id==element.parent_id)
        if(parent_menu){
          console.log('找到父项',parent_menu)
          if(!parent_menu.children)  parent_menu.children=[]
          parent_menu.children.push(element)
        }
        
      });
    }
    
    console.log('Menu 菜单子列表处理后',Menu)
    
    var resultMenuData=Menu.data.filter((item:any)=> item.igrade==1)
    Menu.data=resultMenuData
      // var roles=['vendor']
      // test.data=test.data[0]
      // test.data.avatar="https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif"
      // test.data.roles=roles
      // test.data.perms=[]
      //                    console.log('test',test)
    
      console.log("/api/v1/menus/routes获取路由列表",Menu)
      return Menu
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
