import axios from "axios";
const instance = getCurrentInstance();
const globalObject =
  instance?.appContext.config.globalProperties.$myGlobalObject;
const database = sessionStorage.getItem("cDatabase");
const cUserId = sessionStorage.getItem("username");
const cVenCode = sessionStorage.getItem("cVenCode");
export const SqlWork = async (CommandType: string, SqlsStr: string) => {
  try {
    const res = await axios.post(globalObject.ApiUrl, {
      CommandType: CommandType,
      database: database,
      SqlsStr: SqlsStr,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
