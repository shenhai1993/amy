module.exports = {
  local: {
    ACCESS_TOKEN_KEY: '"ACCESS_TOKEN_LOCAL"', // access_token本地存储的key
    HTTP_BASE_URL: '"http://119.91.205.102:82/api/"', // 请求的baseUrl
    HTTP_TIMEOUT: 100000, // 请求超时时间http://119.91.205.102:82/
  },
  develop: {
    ACCESS_TOKEN_KEY: '"ACCESS_TOKEN_DEVELOP"', // access_token本地存储的key
    HTTP_BASE_URL: '"http://119.91.205.102:82/api/"', // 请求的baseUrl
    HTTP_TIMEOUT: 100000, // 请求超时时间
  },
  master: {
    ACCESS_TOKEN_KEY: '"ACCESS_TOKEN_MASTER"', // access_token本地存储的key
    HTTP_BASE_URL: '"/services/api/customer/"', // 请求的baseUrl
    HTTP_TIMEOUT: 100000, // 请求超时时间
  },
};
