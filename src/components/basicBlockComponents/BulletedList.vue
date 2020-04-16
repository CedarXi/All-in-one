<template>
	<div class="BulletedList">
		<span class="left-Symbol">·</span>
		<el-input
			type="textarea"
			autosize
			v-model="mValue.text"
			placeholder="输入列表内容"
			@keydown.native="addNewTextBlock($event,BlocksIndex)"
			@keyup.native="nextFocus($event,BlocksIndex)"
		></el-input>
	</div>
</template>

<script>
export default {
	name: "BulletedList",
	props: ["value", "BlocksIndex"],
	data() {
		return {
			mValue: this.value,
			cursorStart: 0,
			isEmptyDelete:true
		};
	},
	watch: {
		mValue(val) {
			//本地值改变传给父组件
			this.$emit("input", val);
		},
		value(val) {
			this.mValue = val;
		}
	},
	methods: {
		addNewTextBlock(event, index) {
			/*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
			// 获取光标位置
			let dom = document.getElementsByTagName("textarea");
			let currInput = dom[index];
			let nextInput = dom[index + 1];
			let lastInput = dom[index - 1];
			let startPos = currInput.selectionStart;
			this.cursorStart = startPos;

			if (event.keyCode == 13) {
				event.preventDefault();

				if (this.mValue.text.length == 0) {
					// 当输入的内容为空的时候
					// 点击了回车，就会先删掉当前的内容块，然后新建一个text内容块
					let addBlockInfo = {
						index: index,
						blockItem: {
							type: "text",
							data: {
								text: ""
							}
						}
					};
					this.$store.commit(
						"mutationAddCurrentPageBlocks",
						addBlockInfo
					);
					lastInput.focus();
					this.currentPageBlocks.splice(index, 1);
				} else {
					// 输入的内容不为空的时候
					// 新建text-item到vuex里
					let addBlockInfo = {
						index: index,
						blockItem: {
							type: "BulletedList",
							data: {
								text: ""
							}
						}
					};
					// 获取光标位置，处理回车时字符串换行问题

					if (startPos != this.mValue.text.length) {
						addBlockInfo.blockItem.data.text = this.mValue.text.slice(
							startPos,
							this.mValue.text.length
						);
						this.mValue.text = this.mValue.text.slice(0, startPos);
					}

					// 提交数据到vuex
					this.$store.commit(
						"mutationAddCurrentPageBlocks",
						addBlockInfo
					);
				}
			}
		},
		nextFocus(event, index) {
			let dom = document.getElementsByTagName("textarea");
			let currInput = dom[index];
			let nextInput = dom[index + 1];
			let lastInput = dom[index - 1];
			/*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
			if (event.keyCode == 13) {
				// console.log(nextInput);
				event.preventDefault();
				nextInput.focus();
			}
			if (event.keyCode == 38) {
				lastInput.setSelectionRange(this.cursorStart, this.cursorStart);
				setTimeout(() => {
					lastInput.focus();
				}, 100);
			}
			if (event.keyCode == 40) {
				nextInput.setSelectionRange(this.cursorStart, this.cursorStart);
				setTimeout(() => {
					nextInput.focus();
				}, 100);
			}
			if (event.keyCode == 46 || event.keyCode == 8) {
				if (
					currInput.value == "" &&
					this.currentPageBlocks.length > 1 &&
					this.isEmptyDelete == true
				) {
					this.currentPageBlocks.splice(index, 1);
					setTimeout(() => {
						lastInput.focus();
					}, 300);
				}
			}
			// 设置当前输入框是否为空，主要控制如果已经输入了内容，再点击删除，会直接删除掉内容
			// 处理是否为空的时候在删除内容，直接就currInput.value 会伴随着删除按钮的而直接变化掉
			// 如果已经有内容了，再点击删除按钮会把是否为空删除设置为false，如果直接删除，则是可以的
			// 逻辑就是要先确定一步是否为空，不能同步进行
			if (currInput.value == "") {
				this.isEmptyDelete = true;
			} else {
				this.isEmptyDelete = false;
			}
		}
	},
	computed: {
		currentPageBlocks() {
			return this.$store.state.currentPageBlocks;
		}
	}
};
</script>

<style lang="less">
.BulletedList {
	display: flex;
	align-items: center;

	.left-Symbol{
		font-size: 50px;
		height: 25px;
	}

	.el-textarea__inner {
		border: none;
		outline: none;
		font-size: 16px;
		width: 100%;
		resize: none;
		padding: 5px 0;
		margin-left: 5px;
	}
	textarea::-webkit-input-placeholder {
		color: #ffffff;
	}
	textarea:focus::-webkit-input-placeholder {
		color: #999999;
	}
}
</style>