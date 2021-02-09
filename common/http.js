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

export const http = {
	post: postRequest,
}
