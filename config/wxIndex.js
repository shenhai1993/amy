const {
	NODE_ENV
} = process.env;
const wxConfig = {
	development: {
		HTTP_BASE_URL:'https://amy.lccc1991.cn/api/api', // 请求的baseUrl
		HTTP_TIMEOUT: 100000, // 请求超时时间
	},
	production: {
		HTTP_BASE_URL: "https://amy.lccc1991.cn/api/api",
	},
};

export default {
	baseUrl: wxConfig[NODE_ENV].HTTP_BASE_URL,
	timoOut: wxConfig[NODE_ENV].HTTP_TIMEOUT,
};