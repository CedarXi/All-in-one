import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    isShowAddMenu: false,
    addMenuContentClientXY: { x: 0, y: 0 },
    currentBlockIndex: 0,
    currentPageBlocks: [{"type":"heading1","data":{"text":"All-in-one 是什么"}},{"type":"text","data":{"text":"All-in-one 是一个开源的模块化内容构建编辑器，它不同于传统的文本编辑器，所有的内容都是以模块的概念来打造。灵感来自Notion"}},{"type":"heading2","data":{"text":"灵活的插拔"}},{"type":"text","data":{"text":"所有的模块都以VUE组件的形式编写，可以灵活插拔。你可以用All-in-one编辑器构建一个模块化的内容平台，可以在一个页面里插入任何其他模块，就像Notion一样"}},{"type":"heading3","data":{"text":"纯净的输出"}},{"type":"text","data":{"text":"所有组件保存的数据，都以Json的形式存储在Vuex里供不同组件调用"}},{"type":"text","data":{"text":""}},{"type":"hint","data":{"text":"🐞由于不是用WYSIWYG的编辑器进行二次开发，目前在文本编辑方面有一些不能解决的Bug"}},{"type":"text","data":{"text":""}},{"type":"BulletedList","data":{"text":"当输入行大于等于2行时，键盘的上下按键没有办法处理光标在同组件的文本内容里上下移动"}},{"type":"BulletedList","data":{"text":"内容无法跨模块复制"}},{"type":"BulletedList","data":{"text":"其他一些小的问题"}},{"type":"text","data":{"text":""}},{"type":"hint","data":{"text":"👏 已实现的模块"}},{"type":"text","data":{"text":""}},{"type":"todo","data":{"isChecked":true,"text":"纯文本"}},{"type":"todo","data":{"isChecked":true,"text":"待办清单"}},{"type":"todo","data":{"isChecked":true,"text":"标题1"}},{"type":"todo","data":{"isChecked":true,"text":"标题2"}},{"type":"todo","data":{"isChecked":true,"text":"标题3"}},{"type":"todo","data":{"isChecked":true,"text":"符号列表"}},{"type":"todo","data":{"isChecked":true,"text":"提示栏"}},{"type":"todo","data":{"isChecked":true,"text":"组件的拖动排序"}},{"type":"text","data":{"text":""}},{"type":"hint","data":{"text":"🧑‍💻待开发的功能清单"}},{"type":"text","data":{"text":""}},{"type":"todo","data":{"isChecked":false,"text":" 图片上传组件"}},{"type":"todo","data":{"isChecked":false,"text":"事件节点组件"}},{"type":"todo","data":{"isChecked":false,"text":"表格组件"}},{"type":"todo","data":{"isChecked":false,"text":"看板组件"}},{"type":"text","data":{"text":""}}],
}

const mutations = {
    mutationIsShowAddMenu(state, isShowAddMenu) {
        state.isShowAddMenu = isShowAddMenu
    },
    mutationCurrentBlockIndex(state, index) {
        state.currentBlockIndex = index
    },
    mutationAddMenuContentClientXY(state, addMenuContentClientXY) {
        state.addMenuContentClientXY = addMenuContentClientXY
    },
    mutationAddCurrentPageBlocks(state, addBlockInfo) {
        let index = addBlockInfo.index + 1
        state.currentPageBlocks.splice(index, 0, addBlockInfo.blockItem)
        // console.log(state.currentPageBlocks)
    }
}


const getters = {

    getterCurrentPageBlocks(state) {
        return state.currentPageBlocks
    }


}
export default new Vuex.Store({
    state, mutations, getters
})