项目通过create-react-app创建

### [DEMO](https://codesandbox.io/s/github/stonehank/editableLists-react)

#### 运行
`npm install`

`npm start`

#### 使用的技术

1. react 16.2

2. react-router 4

3. react-redux

4. react-router-redux

5. immutable

#### 程序功能
1. 加载时自动判断是否手机端
2. 加载时自动判断是否能连接数据库，能连则从数据库中获取，不能则使用mock数据
3. 导航可以通过 CreateNav创建 有三个参数:type控制是web还是wap，orient控制横向还是竖向，showChild控制是否显示子菜单
4. lazy加载各个section，使用mock数据时，因为section使用同一个模板，因此只会lazy加载1次；连接数据库获取时，section使用各自的模板，点击对应的section时才加载
5. section下面的detail内容可以实时进行“增删改”,连接数据库时能保存到数据库中，mock数据刷新页面即消失
6. 修改内容未保存时跳转，自定义propmt弹框
7. 通过右上角search，可以对所有内容进行检索，查到的会以列表方式列出
8. 动画功能（暂未添加）
#### 页面结构
1. 菜单栏：页面中创建2个菜单栏，一个横向，一个竖向，创建使用同一个component（Nav-->navcore），只是css设定不同，具体见Nav文件夹
2. 板块(section)：mock数据有3个板块，用同一个component(Section-->template)，其中竖向菜单栏是进入具体板块才会创建，在overview页面不会创建，lazyload用的是bundle+import方法，具体见Sections文件夹下sectionwrap+bundle(lazyLoad)和template
3. 内容(detail)：具体内容可以‘增删改’，detail标题和具体内容就是<Link>和<Route>，具体见Sections文件夹下detail和editdetail
4. 搜索(search)：非受控组件，具体见Search文件夹
5. 其他：基本就这些了，其他也就是prompt弹框，成功失败提示，loading提示等