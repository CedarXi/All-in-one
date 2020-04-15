<template>
	<div class="textBlock">
		<el-input
			type="textarea"
			autosize
			placeholder="按'+'插入内容或直接输入"
			v-model="mValue.text"
			@keydown.native="addNewTextBlock($event,BlocksIndex)"
			@keyup.native="nextFocus($event,BlocksIndex)"
		></el-input>
	</div>
</template>

<script>
export default {
	name: "textBlock",
	props: ["value", "BlocksIndex"],
	data() {
		return {
			mValue: this.value,
			cursorStart: 0 //当前输入光标的位置
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
			// 获取光标位置，处理回车时字符串换行问题
			let dom = document.getElementsByTagName("textarea");
			let currInput = dom[index];
			let startPos = currInput.selectionStart;
			this.cursorStart = startPos;
			if (event.keyCode == 13) {
				event.preventDefault();

				// 新建text-item到vuex里
				let addBlockInfo = {
					index: index,
					blockItem: {
						type: "text",
						data: {
							text: ""
						}
					}
				};

				// console.log(startPos);
				// console.log(this.mValue.length);

				if (startPos != this.mValue.text.length) {
					// 如果光标的位置不在最末尾的时候
					// 对光标之后的内容进行截取，并传递给新建的字符串
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
				lastInput.setSelectionRange(this.cursorStart,this.cursorStart)
				setTimeout(() => {
					lastInput.focus();
				}, 100);
			}
			if (event.keyCode == 40) {
				nextInput.setSelectionRange(this.cursorStart,this.cursorStart)
				setTimeout(() => {
					nextInput.focus();
				}, 100);

			}
			if (currInput.value == "" && this.currentPageBlocks.length > 1) {
				// 当内容为空 或 当前页面模块的数量大于1的时候
				if (event.keyCode == 46 || event.keyCode == 8) {
					// 当按了backspace按钮或delete按钮
					this.currentPageBlocks.splice(index, 1);
					setTimeout(() => {
						lastInput.focus();
					}, 300);
				}
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
.textBlock {
	.el-textarea__inner {
		border: none;
		outline: none;
		font-size: 16px;
		width: 100%;
		resize: none;
		padding: 5px 0;
	}
	textarea::-webkit-input-placeholder {
		color: #ffffff;
	}
	textarea:focus::-webkit-input-placeholder {
		color: #999999;
	}
}
</style>