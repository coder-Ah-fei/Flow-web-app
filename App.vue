<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			let userId = uni.getStorageSync('userId');
			if (!userId) {
				uni.switchTab({
					url: '/pages/login/login'
				});
			}
			console.log(userId)
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './common/uni.css';
	@import "./uview-ui/index.scss";
</style>
