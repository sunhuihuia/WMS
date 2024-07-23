<template>
  <div>
    <h3>
      报表数据来自字符串变量，通过WebSocket直接将网页中的字符串数据传递给WEB报表客户端
    </h3>

    <p>
      <a href="javascript:void(0)" @click.prevent="ws_data_from_string"
        >打印预览(报表数据来自字符串)</a
      >
    </p>

    <h3>
      报表数据来自JSON对象，通过WebSocket直接将网页中的JSON对象数据传递给WEB报表客户端
    </h3>

    <p>
      <a href="javascript:void(0)" @click.prevent="ws_data_from_object">打印预览(报表数据来自JSON对象)</a>
    </p>

    <h3>报表模板与报表数据来自JSON对象</h3>
    <p>
      <a href="javascript:void(0)" @click.prevent="ws_both_from_object">打印预览(报表模板与报表数据来自JSON对象)</a>
    </p>

    <p>备注：报表模板与报表数据为JSON文本数据也一样可以</p>
  </div>
</template>

<script>
import { webapp_ws_ajax_run,webapp_urlprotocol_startup, urlAddRandomNo } from "@/utils/grwebapp";

export default {

    mounted() {
        webapp_urlprotocol_startup(); 
  },
    data() {
        return {
            text_data:"<xml>" +
                    "<row><CustomerID>HUNGC</CustomerID><CompanyName>五金机械</CompanyName><ContactName>苏先生</ContactName><ContactTitle>销售代表</ContactTitle></row>" +
                    "<row><CustomerID>CENTC</CustomerID><CompanyName>三捷实业</CompanyName><ContactName>王先生</ContactName><ContactTitle>市场经理</ContactTitle></row>" +
                    "<row><CustomerID>CACTU</CustomerID><CompanyName>威航货运</CompanyName><ContactName>刘先生</ContactName><ContactTitle>销售代理</ContactTitle></row>" +
                    "</xml>",
                    
        //实际应用中，data应该为程序中通过各种途径获取到的数据，最后要将数据转换为报表需要的XML或JSON格式的字符串数据
            json_data : { 
            "recordset": [
                {
                    "CustomerID": "ALFKI",
                    "CompanyName": "三川实业有限公司",
                    "ContactName": "刘小姐",
                    "Address": "大崇明路 50 号",
                    "City": "天津",
                    "Region": "华北",
                    "PostalCode": "343567",
                    "Phone": "(030) 30074321"
                },
                {
                    "CustomerID": "ANATR",
                    "CompanyName": "东南实业",
                    "ContactName": "王先生",
                    "Address": "承德西路 80 号",
                    "City": "天津",
                    "Region": "华北",
                    "PostalCode": "234575",
                    "Phone": "(030) 35554729"
                }
            ]
        }, 
          json_report : {
            "Version": "6.7.5.0",
            "Title": "1a.简单表格",
            "Font": {
                "Name": "宋体",
                "Size": 105000,
                "Weight": 400,
                "Charset": 134
            },
            "DetailGrid": {
                "CenterView": true,
                "PrintAdaptMethod": "ResizeToFit",
                "Recordset": {
                    "Field": [
                        {
                            "Name": "CustomerID"
                        },
                        {
                            "Name": "CompanyName"
                        },
                        {
                            "Name": "ContactName"
                        },
                        {
                            "Name": "Address"
                        },
                        {
                            "Name": "City"
                        }
                    ]
                },
                "Column": [
                    {
                        "Name": "CustomerID",
                        "Width": 2.38125
                    },
                    {
                        "Name": "CompanyName",
                        "Width": 4.18042
                    },
                    {
                        "Name": "ContactName",
                        "Width": 2.01083
                    },
                    {
                        "Name": "Address",
                        "Width": 4.39208
                    },
                    {
                        "Name": "Phone",
                        "Width": 2.98979
                    }
                ],
                "ColumnContent": {
                    "Height": 0.79375,
                    "ColumnContentCell": [
                        {
                            "Column": "CustomerID",
                            "DataField": "CustomerID"
                        },
                        {
                            "Column": "CompanyName",
                            "DataField": "CompanyName"
                        },
                        {
                            "Column": "ContactName",
                            "DataField": "ContactName"
                        },
                        {
                            "Column": "Address",
                            "DataField": "Address"
                        },
                        {
                            "Column": "Phone"
                        }
                    ]
                },
                "ColumnTitle": {
                    "Height": 0.79375,
                    "Font": {
                        "Name": "宋体",
                        "Size": 105000,
                        "Bold": true,
                        "Charset": 134
                    },
                    "ColumnTitleCell": [
                        {
                            "GroupTitle": false,
                            "Column": "CustomerID",
                            "Text": "客户编号"
                        },
                        {
                            "GroupTitle": false,
                            "Column": "CompanyName",
                            "Text": "公司名称"
                        },
                        {
                            "GroupTitle": false,
                            "Column": "ContactName",
                            "Text": "联系人"
                        },
                        {
                            "GroupTitle": false,
                            "Column": "Address",
                            "Text": "地址"
                        },
                        {
                            "GroupTitle": false,
                            "Column": "Phone",
                            "Text": "电话"
                        }
                    ]
                }
            },
            "PageFooter": {
                "Height": 1.32292,
                "Control": [
                    {
                        "Type": "MemoBox",
                        "Name": "MemoBox2",
                        "Anchor": "[Top|Right]",
                        "Left": 12.8058,
                        "Top": 0.211667,
                        "Width": 3.20146,
                        "Height": 0.79375,
                        "TextAlign": "MiddleRight",
                        "Text": "第[#SystemVar(PageNumber)#]页 共[#SystemVar(PageCount)#]页"
                    }
                ]
            },
            "ReportHeader": [
                {
                    "Height": 1.00542,
                    "Control": [
                        {
                            "Type": "StaticBox",
                            "Name": "StaticBox1",
                            "Center": "Horizontal",
                            "Left": 6.29708,
                            "Width": 3.41313,
                            "Height": 1.00542,
                            "Font": {
                                "Name": "宋体",
                                "Size": 150000,
                                "Bold": true,
                                "Charset": 134
                            },
                            "Text": "客户基本信息"
                        }
                    ]
                }
            ]
        }
        }
    },


  methods: {
    ws_data_from_string() {
      //参数具体说明请参考帮助文档中的“WEB报表(B/S报表)->WEB报表客户端->启动参数说明”部分
           var args = {
                type: "preview", //设置不同的属性可以执行不同的任务，如：preview print pdf xls csv txt rtf img grd
                 report: urlAddRandomNo("src/views/ttest/grf/simple.grf"),
                data: this.text_data
            };
      webapp_ws_ajax_run(args);
    },
    ws_data_from_object() {
      //参数具体说明请参考帮助文档中的“WEB报表(B/S报表)->WEB报表客户端->启动参数说明”部分
            var args = {
                type: "preview", //设置不同的属性可以执行不同的任务，如：preview print pdf xls csv txt rtf img grd
              report: urlAddRandomNo("src/views/ttest/grf/simple.grf"),
                data: this.json_data
            };
      webapp_ws_ajax_run(args);
    }, 
     ws_both_from_object() {
         console.log(this.json_report);

      //参数具体说明请参考帮助文档中的“WEB报表(B/S报表)->WEB报表客户端->启动参数说明”部分
            var args = {
                type: "preview", //设置不同的属性可以执行不同的任务，如：preview print pdf xls csv txt rtf img grd
                report: this.json_report, //report: JSON.stringify(json_report),
                data: this.json_data //data: JSON.stringify(json_data)
            };

      webapp_ws_ajax_run(args);
    }
  },
};
</script>

<style>
</style>