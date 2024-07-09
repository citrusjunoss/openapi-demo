export default {
  openApi: [
    {
      requestLibPath: "import request from '@/utils/request'", // 想怎么引入封装请求方法
      schemaPath: "https://petstore.swagger.io/v2/swagger.json", // openAPI规范地址, 按照你自己的来，一般要去swagger 文档上找配置地址
      projectName: "petstore", // 生成到哪个目录内
      serversPath: "./src/service", // 生成代码到哪个目录
    },
  ],
};
