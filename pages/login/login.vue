<template>
	<view>
		<uni-forms ref="form" validate-trigger="bind" err-show-type="undertext">
			<uni-group title="请登录" top="0">
				<uni-forms-item name="name" label="手机号">
					<view style="display: flex;">
						<uni-easyinput type="text" :inputBorder="true" v-model="loginForm.mobilePhone"
						               placeholder="请输入手机号"></uni-easyinput>
					</view>
				</uni-forms-item>
				<uni-forms-item name="name" label="验证码">
					<view style="display: flex;">
						<uni-easyinput type="text" :inputBorder="true" v-model="loginForm.smsCode"
						               placeholder="请输入验证码"></uni-easyinput>
						<button :disabled="sendSms" style="padding-top: 0.2em;" size="mini" class="button"
						        @click="getSmsCodeFun">
							<template v-if="!sendSms">获取验证码</template>
							<template v-else>
								<u-count-down ref="uCountDown" font-size="26" @end="sendSms=false" :autoplay="false"
								              :timestamp="countDownTime" :show-days="false" :show-hours="false"
								              :show-minutes="false"></u-count-down>
								秒
							</template>
						</button>
					</view>
				</uni-forms-item>
				<button class="button" @click="submitForm('form')">登 录</button>
				<button class="button" @click="listBannersFun">listBannersFun</button>
			</uni-group>
			<!-- 直接使用组件自带submit、reset 方法，小程序不生效 -->
			<!-- 			<button class="button" form-type="submit">Submit</button>
				<button class="button" form-type="reset">Reset</button> -->
		</uni-forms>
	</view>
</template>

<script>
export default {
	data() {
		return {
			countDownTime: 5,
			smsText: '获取验证码',
			sendSms: false,
			loginForm: {
				mobilePhone: '',
				smsCode: '',
			},
		}
	},
	onLoad() {
		uni.showLoading()
		// this.formData 应该包含所有需要校验的表单
		// 模拟异步请求数据
		setTimeout(() => {
			this.formData = {
				name: 'DCloud',
				age: 21,
				email: '',
				sex: '0',
				hobby: [0, 2],
				remarks: '热爱学习，热爱生活',
				checked: false,
				country: 2,
				weight: 120,
				birth: ''
			}
			uni.hideLoading()
		}, 500)
	},
	onReady() {
		// this.$refs.form.setRules(this.rules)
	},
	methods: {
		listBannersFun() {
			this.$http.post('http://192.168.101.18:8081/phone/mobile/index/getBannerData?method=index', {
				aDlinkType: 'wechat_banner'
			}).then(res => {
				console.info(res)
			})
		},
		// 获取短信验证码
		getSmsCodeFun() {
			if (!this.loginForm.mobilePhone) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none',
					duration: 2000
				})
				return;
			}
			this.$http.post(" http://192.168.101.18:8081/phone/app/login", {}).then(res => {
				debugger;
				if (res.data.code == 0) {
					this.sendSms = true;
					this.$nextTick(function () {
						this.$refs.uCountDown.start();
					})
				} else {
					uni.showToast({
						title: '验证码发送失败',
						icon: 'none',
						duration: 2000
					})
				}
			})
		},
		birthChange(e) {
			console.log(e)
		},
		change(name, value) {
			this.formData.checked = value
			this.$refs.form.setValue(name, value)
		},

		/**
		 * 手动提交
		 * @param {Object} form
		 */
		submitForm(form) {
			// console.log(this.formData);
			this.$refs[form]
				.submit()
				.then(res => {
					console.log('表单的值：', res)
					uni.showToast({
						title: '验证成功'
					})
				})
				.catch(errors => {
					console.error('验证失败：', errors)
				})
		},

		/**
		 * 手动重置表单
		 */
		resetForm() {
			this.$refs.form.resetFields()
		},
		/**
		 * 部分表单校验
		 * @param {Object} form
		 */
		validateField(form) {
			this.$refs[form]
				.validateField(['name', 'email'])
				.then(res => {
					uni.showToast({
						title: '验证成功'
					})
					console.log('表单的值：', res)
				})
				.catch(errors => {
					console.error('验证失败：', errors)
				})
		},

		/**
		 * 清除表单校验
		 * @param {Object} form
		 * @param {Object} name
		 */
		clearValidate(form, name) {
			if (!name) name = []
			this.$refs[form].clearValidate(name)
		}
	}
}
</script>

<style>
@charset "UTF-8";

/* 头条小程序组件内不能引入字体 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	font-weight: normal;
	font-style: normal;
	src: url("~@/static/uni.ttf") format("truetype");
}

/* #endif */
/* #ifndef APP-NVUE */
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background-color: #efeff4;
	min-height: 100%;
	height: auto;
}

view {
	font-size: 14px;
	line-height: inherit;
}

.example {
	padding: 0 15px 15px;
}

.example-info {
	padding: 15px;
	color: #3b4144;
	background: #ffffff;
}

.example-body {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 14px;
	background-color: #ffffff;
}

/* #endif */
.example {
	padding: 0 15px;
}

.example-info {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	padding: 15px;
	color: #3b4144;
	background-color: #ffffff;
	font-size: 14px;
	line-height: 20px;
}

.example-info-text {
	font-size: 14px;
	line-height: 20px;
	color: #3b4144;
}

.example-body {
	flex-direction: column;
	padding: 15px;
	background-color: #ffffff;
}

.word-btn-white {
	font-size: 18px;
	color: #FFFFFF;
}

.word-btn {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	height: 48px;
	margin: 15px;
	background-color: #007AFF;
}

.word-btn--hover {
	background-color: #4ca2ff;
}

.example {
	padding: 0 10px 10px;
}

.uni-input-border,
.uni-textarea-border {
	width: 100%;
	font-size: 14px;
	color: #666;
	border: 1px #e5e5e5 solid;
	border-radius: 5px;
	box-sizing: border-box;
}

.uni-input-border {
	padding: 0 10px;
	height: 35px;
}

.uni-textarea-border {
	padding: 10px;
	height: 80px;
}

.label-box {
	margin-right: 10px;
}

.transform-scale {
	transform: scale(0.7);
}
</style>
