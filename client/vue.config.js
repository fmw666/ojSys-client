module.exports = {

    devServer: {
        host: 'localhost',
        port: 8080,
        https: false,
        proxy: {
          '/api': {
            // 测试环境
            target: 'http://127.0.0.1:8000/', // 接口域名
            //secure: false, // 如果是https接口，需要配置这个参数
            changeOrigin: true, // 是否跨域
            ws: true,
            pathRewrite: {
              '^/api': ''  // 需要rewrite重写的
            }
          }
        },
    },
}