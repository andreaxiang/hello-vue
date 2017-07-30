import Vue from 'vue';
import AV from 'leancloud-storage';

var APP_ID = 'AggQrwzKPp2ouqEdYinh24Fn-gzGzoHsz';
var APP_KEY = 'p1HN8uq8QtQHX3ashfFaEsJa';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var app = new Vue({
  el: '#app',
  data: {
    actionType: 'signUp',
    formData: {
      username: '',
      email: '',
      password: ''
    },
    newTodo: '',
    todoList: [],
    currentUser: null //LeanCloud 文档说 AV.User.current() 可以获取当前登录的用户
  },
  created: function(){
    window.onbeforeunload = ()=>{
      // onbeforeunload文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/onbeforeunload

      let dataString = JSON.stringify(this.todoList)

      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();
      avTodos.set('content', dataString);
      avTodos.save().then(function(todo){
        //保存成功后，执行其他逻辑
        console.log('保存成功');
      },function(error){
        console.error('保存失败');
      })


      window.localStorage.setItem('myTodos', dataString)
      //获取newTodo未发布内容
      let oneditString = JSON.stringify(this.newTodo)
      window.localStorage.setItem('typeTodo', oneditString)
    }

    //从 LeanCloud 读取 todos 的逻辑先不写
    /*let oldDataString = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDataString)
    this.todoList = oldData || []*/

    //检查用户是否登录
    this.currentUser = this.getCurrentUser();

    //本地保存newTodo未发布内容
    let uncompleteDataString = window.localStorage.getItem('typeTodo')
    let uncompleteData = JSON.parse(uncompleteDataString)
    this.newTodo = uncompleteData || []
  },
  methods: {
    addTodo: function(){
      this.todoList.push({
        title: this.newTodo,
        createdAt: new Date(),
        done: false //添加一个 done 属性
      })
      this.newTodo = ''; //输入完成之后清空newTodo
    },

    //删除功能
    removeTodo: function(todo){
      let index = this.todoList.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
      this.todoList.splice(index,1)
    },

    //注册
    signUp: function(){
      // 新建 AVUser 对象实例
      let user = new AV.User();
      // 设置用户名
      user.setUsername(this.formData.username);
      // 设置邮箱
      user.setEmail(this.formData.email);
      // 设置密码
      user.setPassword(this.formData.password);

      user.signUp().then((loginedUser)=> { //将 function 改成箭头函数，方便使用 this
        this.currentUser = this.getCurrentUser()  //获取当前登录用户
      }, (error)=> {
        alert('注册失败，请检查')
      });
    },

    //登录
    login: function(){
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser)=> {
        this.currentUser = this.getCurrentUser()  //获取当前登录用户
      }, (error)=> {
        alert('登录失败，请检查')
      });
    },

    //获取当前登录用户
    getCurrentUser: function(){
      //首先要判断用户是否登录
      let current = AV.User.current()
      if (current){
        let {id, createdAt, attributes: {username}} = AV.User.current();
        // 我的《ES 6 新特性列表》里面有链接：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        return {id, username, createdAt} // 看文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer#ECMAScript_6%E6%96%B0%E6%A0%87%E8%AE%B0
      } else {
        return null
      }
    },

    //退出登录
    logout: function(){
      AV.User.logOut()
      this.currentUser = null
      window.location.reload()
    },

  }
})
