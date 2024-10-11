<template>
  <div style="margin: 10px;">
    <el-container>
      <el-aside width="400px">
        <el-card style="overflow: auto">
          <div>
            <div style="display: flex; width: 100px">
              <div style="margin: 12px;">
                <el-tag>仓库区域</el-tag>
              </div>

            </div>
            <div>
              <el-tree :data="data" node-key="cPosCCode" default-expand-all :expand-on-click-node="false">
                <template #default="{ data }">
                  <div style="width: 100%;display: flex;justify-content: space-between;align-items: center">
                    <span @click="handleNodeClick(data)">{{ data.cPosCname }} </span>
                    <span class="btn-container">
                      <el-button v-if="data.children" type="text" size="mini" @click="() => append(data)">
                        <el-icon>
                          <Plus />
                        </el-icon>
                      </el-button>
                      <el-button type="text" size="mini" @click="() => openedit(data)">
                        <el-icon>
                          <Edit />
                        </el-icon>
                      </el-button>
                      <el-button type="text" size="mini" @click="() => remove(data)">
                        <el-icon>
                          <Delete />
                        </el-icon>
                      </el-button>
                    </span>
                  </div>
                </template>

              </el-tree>
            </div>
          </div>
        </el-card>
        <el-card style="margin-top: 3px">
          <div style="max-height: 40vh; overflow: auto">
            <el-form :inline="true" :model="dataForm" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="dataForm.name" clearable placeholder="批号" size="mini"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="" size="mini" type="primary">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table :header-cell-style="{ padding: '0px' }" :row-style="{ height: 0 + 'px' }"
              :cell-style="{ padding: 0 + 'px' }" :data="tableData" stripe border style="width: 100%">
              <el-table-column prop="date" label="存货编码" width="100">
              </el-table-column>
              <el-table-column prop="name" label="存货名称" width="100">
              </el-table-column>
              <el-table-column prop="address" label="数量"> </el-table-column>
            </el-table>
          </div>
          <div>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="pageIndex" :page-sizes="[5, 10, 20, 50, 100]" :page-size="pageSize" :total="20"
              layout="prev,pager,next" style="margin-top: 10px"></el-pagination>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="pageIndex" :page-sizes="[5, 10, 20, 50, 100]" :page-size="pageSize" :total="20"
              layout="sizes,total,jumper"></el-pagination>
          </div>
        </el-card>
      </el-aside>
      <el-container>
        <el-card style="overflow: auto; width: 100%; max-height: 85vh; margin: 3px">
          <table style="width: 100%;">
               <tbody>
              <tr v-for="item in dataList"  style="width: 100%; height: 60px;">
                <td v-for="(val,index) in item.children" style="text-align: center; border: 1px solid black;">{{ val.cPosName }}</td>
              </tr>
            </tbody>
          </table>
        </el-card>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import type { FormProps } from 'element-plus'
import { onMounted, onUnmounted } from 'vue';
import axios from "axios"
import { getCurrentInstance } from 'vue';

import { ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'
import moment from "moment"
import { fa } from 'element-plus/es/locale';
// import AsnLoadPm from './AsnLoadPm.vue';
import Asnvoucher from './Asnvoucher.vue';

export default {
  components: {
    Asnvoucher
  },
  setup() {
    const instance = getCurrentInstance();
    const globalObject = instance?.appContext.config.globalProperties.$myGlobalObject


    const labelPosition = ref<FormProps['labelPosition']>('right')
    const labelPosition2 = ref<FormProps['labelPosition']>('right')
    const formLabelAlign = reactive({
      name: '',
      region: '',
      type: '',
    })


    interface User {
      selected: boolean
      date: string
      name: string
      address: string
    }

    const tableRowClassName = ({
      row,
      rowIndex,
    }: {
      row: User
      rowIndex: number
    }) => {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }



    interface ShortcutItem {
      text: string;
      value: () => Date[]; // 假设 getLastWeek 等方法返回 Date 数组
    }
    // 定义 Last week 的函数
    const getLastWeek = () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
    // 定义 Last month 的函数
    const getLastMonth = () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    }

    // 定义 Last 3 months 的函数
    const getLast3Months = () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    }

    const getThisMonth = () => {
      const today = new Date();
      const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      return [firstDayOfThisMonth, today];
    }
    const shortcuts: ShortcutItem[] = [
      {
        text: '前一周',
        value: getLastWeek
      },
      {
        text: '前一月',
        value: getLastMonth
      },
      {
        text: '前三个月',
        value: getLast3Months
      },
      {
        text: '本月',
        value: getThisMonth
      },


    ]


    return { // 返回组件中可使用的属性和方法
      labelPosition, labelPosition2, formLabelAlign, tableRowClassName, globalObject, shortcuts
    };

  },


  data() {
    return {
      data: [], // 初始化为空数组
      dialogVisible: false, //窗口显示
      FCAddVisible: true, //树形列表点击后显示表格信息
      form: {
        cPosCname: "",
      },
      addcodedata: {
        cPosCCode: "",
      },
      dialogFormSubmitVisible: false,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dataForm: {
        name: ""
      },
      dataList:[

      ],
      pageIndex: 1,
      pageSize: 5,
      totalPage: 0,
      SysInfo:
      {
        cUserId: 'demo',
        cVenCode: '0080',
        database: 'ufdata_002_2019',
        ApiUrl: '',
      },
    };

  },
  // async mounted(){
  //   console.log('mounted')
  //   const res = await this.SqlWork("select","select null a,2 b" );

  // },
  methods: {
    handleSizeChange(val: any) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val: any) {
      console.log(`当前页: ${val}`);
    },
    async handleNodeClick(data: any) {
      let res = await this.SqlWork("select", "select SUBSTRING(ccode,1,3) hang, SUBSTRING(ccode,4,3) lie, * from wlzh_dz_position where cPosCCode='" + data.cPosCCode + "'");
      const arr:any = []
      res.data.forEach((val: any) => {
        val.hang = Number(val.hang)
        val.lie = Number(val.lie)
        if (val.lie === 1) {
          console.log(val,13123123)
          arr.push(val)
        }
      })
      this.dataList = this.transListDataToTreeData1(res.data,arr)
    },
    transListDataToTreeData1(list: any, data:any) {
      const arr: any = [];
      data.forEach((item: any) => {
        item.children =  list.map((item2:any)=>{
          if(item2.hang === item.hang){
            return item2
          }
        }).filter((ite:any) => typeof ite !== 'undefined')
      });
      return data;
    },
    async addroot() {

    },
    append(data: any) {

    },
    openedit(data: any) {
      this.dialogVisible = true;
      this.form = data;
      console.log(this.form);
    },
    Edit() {

    },
    remove(data: any) {

    },
    async SqlWork(CommandType: string, SqlsStr: string): Promise<any> {
      try {
        console.log(SqlsStr);
        const res = await axios.post(this.globalObject.ApiUrl,
          {
            "CommandType": CommandType, "database": this.SysInfo.database,
            "SqlsStr": SqlsStr
          });
        //console.log(res); 
        //    this.tTable =res.data.dataDetail[0];
        //   console.log(this.tTable);
        return res
      } catch (error) {
        console.error(error);
      }
    },
    async getTreeList() {
      let res = await this.SqlWork("select", "select * from wlzh_dz_positionClass");
      let list = this.transListDataToTreeData(res.data, '0')
      this.data = list;

    },
    transListDataToTreeData(list: any, i: any) {
      const arr: any = [];
      // 1.遍历
      list.forEach((item: any) => {

        // 2.首次传入空字符串  判断list的pid是否为空 如果为空就是一级节点
        if (item.cParentPosCCode === i) {
          // 找到之后就要去找item下面有没有子节点  以 item.id 作为 父 id, 接着往下找
          const children = this.transListDataToTreeData(list, item.cPosCCode);
          if (children.length > 0) {
            // 如果children的长度大于0,说明找到了子节点
            item.children = children;
          }
          // 将item项, 追加到arr数组中
          arr.push(item);//向数组中push数据
        }
      });
      return arr;
    },

    getcPosCCode() {

    },
  },
  mounted() {
    const database = sessionStorage.getItem('cDatabase')
    const cUserId = sessionStorage.getItem('username')
    const cVenCode = sessionStorage.getItem('cVenCode')
    this.getTreeList();
  },


}




</script>




<style>
/* 添加表格生成器样式 */
h1,
h2,
form,
label,
input,
button {
  margin: 2px;
}

#table {
  border: 1px solid black;
  border-collapse: separate;
  width: 100%;
}

#table th {
  background-color: black;
  color: #333;
  text-align: center;

}

#table td {
  /* 设置 td 样式 */
  border: 2px solid black;
  padding: 8px;
  text-align: center;
}

#table .selected {
  background-color: lightblue;
  /* 设置选中时的背景颜色 */
  color: white;
  /* 设置选中时的文字颜色 */
}
</style>
<style lang="less" scoped>
/deep/.el-card__body {
  padding: 0;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-container {
  overflow: auto;
}

.el-tree {
  height: 28vh;
  overflow: auto;
  width: 90%;
}

.el-aside {
  height: 87vh;
  margin-top: 3px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
