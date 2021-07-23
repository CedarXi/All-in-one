# DEMO
http://all-in-one.qingzhu.co/

# 界面
![image](https://user-images.githubusercontent.com/16424854/126763700-721ecb56-4dbc-4581-b7ff-ddab7790576e.png)



# All-in-one是什么
All-in-one 是一个开源的模块化内容构建编辑器，它不同于传统的文本编辑器，所有的内容都是以模块的概念来打造。灵感来自Notion

## 灵活的插拔
所有的模块都以VUE组件的形式编写，可以灵活插拔。你可以用All-in-one编辑器构建一个模块化的内容平台，可以在一个页面里插入任何其他模块，就像Notion一样

### 纯净的输出
所有组件保存的数据，都以Json的形式存储在Vuex里供不同组件调用


#### 🐞 由于不是用WYSIWYG的编辑器进行二次开发，目前在文本编辑方面有一些不能解决的Bug

* 当输入行大于等于2行时，键盘的上下按键没有办法处理光标在同组件的文本内容里上下移动
* 内容无法跨模块复制
* 其他一些小的问题

#### 👏 已实现的模块
- [x] 纯文本
- [x] 待办清单
- [x] 标题1
- [x] 标题2
- [x] 标题3
- [x] 符号列表
- [x] 提示栏
- [x] 组件的拖拽移动


#### 🧑‍💻 待开发的模块
- [ ] 事件节点组件
- [ ] 图片上传组件
- [ ] 表格组件
- [ ] 看板组件

***

# what is All-in-one 
All-in-one is an open source modular content construction editor. It is different from traditional text editors, and all content is built with the concept of modules. Inspired by Notion

## Flexible plugging
All modules are written in the form of VUE components, which can be flexibly inserted and removed. You can use the All-in-one editor to build a modular content platform, you can insert any other module in a page, just like Notion

### Pure output
The data saved by all components is stored in Vuex in the form of Json for different components to call


#### 🐞 Since it is not a secondary development with the WYSIWYG editor, there are currently some unsolvable bugs in text editing

* When the input line is greater than or equal to 2 lines, the keyboard up and down keys can not handle the cursor to move up and down in the text content of the same component
* Content cannot be copied across modules
* Other minor issues

#### 👏 Modules has been developed 

- [x] Text
- [x] Todo
- [x] Heading1
- [x] Heading2
- [x] Heading3
- [x] BulletedList
- [x] Hint
- [x] Drag and drop of components

#### 🧑‍💻 Modules to be developed

- [ ] EventNode component
- [ ] Image upload component
- [ ] Form component
- [ ] Kanban components
