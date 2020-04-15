<template>
	<div class="about">
		<h1>This is an about page</h1>
		<div class="inputs">
			<div v-for="(item,index) in inputList" :key="index">
				<input
					type="text"
					v-model="item.val"
					class="border-input"
					@keyup="nextFocus($event,index)"
					@keydown="changeValue(index)"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="less">
.about {
  text-align: center;
	.border-input {
		background: #ffffff;
		width: 60px;
		font-size: 60px;
		height: 60px;
		margin-left: 15px;
		margin-right: 15px;
		text-align: center;
		border-bottom: 1px solid #333333;
		border-top: 0px;
		border-left: 0px;
		border-right: 0px;
	}

	.inputs {
		margin-top: 31px;
		display: flex;
		justify-content: center;
	}
}
</style>
<script>
export default {
	name: "About",
	data() {
		return {
			inputList: [
				{ val: "" },
				{ val: "" },
				{ val: "" },
				{ val: "" },
				{ val: "" },
				{ val: "" }
			]
		};
	},
	methods: {
		/*对焦到下一个input框去*/
		nextFocus(el, index) {
			var dom = document.getElementsByClassName("border-input"),
				currInput = dom[index],
				nextInput = dom[index + 1],
				lastInput = dom[index - 1];
			/*这里的keyCode 根据不同的平台或许不同,安卓就是不是8*/
			if (el.keyCode != 8) {
				if (index < this.inputList.length - 1) {
					nextInput.focus();
				} else {
					currInput.blur();
				}
			} else {
				if (index != 0) {
					lastInput.focus();
				}
			}
		},
		/*当键盘按下的时候清空原有的数*/
		changeValue(index) {
			this.inputList[index].val = "";
		}
	}
};
</script>