const server_ip = "192.168.0.105";
// const server_port = "80";
const server_port = "80";
const server_contextPath = "/phone"


function spliceUrl(url) {
	return "http://" + server_ip + ":" + server_port + server_contextPath + url;
}



export const http = {
	post: postRequest,
	url: {
		showPic: spliceUrl("/mobile/showPic/"),
		smsCode: spliceUrl("/app/smsCode.aov"),
		login: spliceUrl("/app/login"),
		
		getBannerData: spliceUrl("/mobile/index/getBannerData?method=index"),
		listHomePageShoppingClasses: spliceUrl("/mobile/shoppingClass/listHomePageShoppingClasses?method=goAjaxList"),
	}
}

function postRequest(url, data) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			data: data || {},
			dataType: 'json',
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err);
			}
		})
	})
}
