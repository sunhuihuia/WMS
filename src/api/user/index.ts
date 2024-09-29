import request from "@/utils/request";
import { AxiosPromise } from "axios";
import { UserForm, UserInfo, UserPageVO, UserQuery } from "./types";
import axios from "axios"

/**
 * 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export async function getUserInfoApi(): AxiosPromise<UserInfo> {
  // let u= request({
  //   url: "/api/v1/users/me",
  //   method: "get"
  // });
  // console.log('u',u)
  var  cuser_id= sessionStorage.getItem("username"  );
  var  cDatabase= sessionStorage.getItem("cDatabase"  );
  var test= await   request.post("http://goodgoodstudy.ufyct.com:7575/CjfWebApi/api/Values/Work2407",{"CommandType":"select","database":cDatabase,
                     "SqlsStr":"select 0 userId,u.cuser_id username,u.cuser_name nickname,'' roleId  from ufsystem..ua_user u  where u.cuser_id='"+ cuser_id +"'" });

  
  test.data=test.data[0]
  test.data.avatar="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F12%2F20180612131829_AyMHU.gif&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1722879995&t=81140e0b3f46e9c87b56d392ed081b3f"
  //"https://www.ncich.com.cn/d/file/content/2020/01/5e12d8f435613.gif"
  //"https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif"

  test.data.roles=[{}]
  test.data.perms=[]
  console.log('test',test)
  // const res01 = await axios.post("https://ycjdwocloud.gnway.org:7579/Api/values/Work",{"CommandType":"select","database":"master",
  //                   "SqlsStr":"select 'aaaa' cvencode,'中山卡卡公司' cvenname,'dddd' ddate" });

  // let u=res01.data.dataDetail[0]
  //////////////////////终于发现在这个地方可以更改人员的信息了

  
  // const res0 = await axios.post("https://ycjdwocloud.gnway.org:7579/Api/values/Work",{"CommandType":"select","database":"master",
  //                   "SqlsStr":"select 'aaaa' cvencode,'中山卡卡公司' cvenname,'dddd' ddate" });
  //   console.log('res0',res0)
  //   console.log(res0.data.dataDetail[0] )
  //  u.then(function(res){
  //   console.log('getUserInfoApi',res);
  //   res.data.roles=['vendor']
  //   res.data.username="demo1";
  //   res.data.nickname=res0.data.dataDetail[0].cvenname;
  // });
  // console.log('getUserInfoApirequest',u);
  return test;
}


export function getUserInfoApi00(): AxiosPromise<UserInfo> {
  return request({
    url: "/api/v1/users/me",
    method: "get",
  });
}

/**
 * 获取用户分页列表
 *
 * @param queryParams
 */
export function getUserPage(
  queryParams: UserQuery
): AxiosPromise<PageResult<UserPageVO[]>> {
  return request({
    url: "/api/v1/users/page",
    method: "get",
    params: queryParams,
  });
}

/**
 * 获取用户表单详情
 *
 * @param userId
 */
export function getUserForm(userId: number): AxiosPromise<UserForm> {
  return request({
    url: "/api/v1/users/" + userId + "/form",
    method: "get",
  });
}

/**
 * 添加用户
 *
 * @param data
 */
export function addUser(data: any) {
  return request({
    url: "/api/v1/users",
    method: "post",
    data: data,
  });
}

/**
 * 修改用户
 *
 * @param id
 * @param data
 */
export function updateUser(id: number, data: UserForm) {
  return request({
    url: "/api/v1/users/" + id,
    method: "put",
    data: data,
  });
}

/**
 * 修改用户密码
 *
 * @param id
 * @param password
 */
export function updateUserPassword(id: number, password: string) {
  return request({
    url: "/api/v1/users/" + id + "/password",
    method: "patch",
    params: { password: password },
  });
}

/**
 * 删除用户
 *
 * @param ids
 */
export function deleteUsers(ids: string) {
  return request({
    url: "/api/v1/users/" + ids,
    method: "delete",
  });
}

/**
 * 下载用户导入模板
 *
 * @returns
 */
export function downloadTemplateApi() {
  return request({
    url: "/api/v1/users/template",
    method: "get",
    responseType: "arraybuffer",
  });
}

/**
 * 导出用户
 *
 * @param queryParams
 * @returns
 */
export function exportUser(queryParams: UserQuery) {
  return request({
    url: "/api/v1/users/_export",
    method: "get",
    params: queryParams,
    responseType: "arraybuffer",
  });
}

/**
 * 导入用户
 *
 * @param file
 */
export function importUser(deptId: number, file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return request({
    url: "/api/v1/users/_import",
    method: "post",
    params: { deptId: deptId },
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
