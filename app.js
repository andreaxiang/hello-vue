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
    todoList: []
  },
  created: function(){
    window.onbeforeunload = ()=>{

      let dataString = JSON.stringify(this.todoList)
      window.localStorage.setItem('myTodos', dataString)
      //获取newTodo未发布内容
      let oneditString = JSON.stringify(this.newTodo)
      window.localStorage.setItem('typeTodo', oneditString)
    }

    let oldDataString = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDataString)
    this.todoList = oldData || []
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
      this.newTodo = ''; //输入完成之后清空
    },
    //增加删除功能
    removeTodo: function(todo){
      let index = this.todoList.indexOf(todo) // Array.prototype.indexOf 是 ES 5 新加的 API
      this.todoList.splice(index,1)
    },
    //注册
    signUp: function(){
      // 新建 AVUser 对象实例
      var user = new AV.User();
      // 设置用户名
      user.setUsername(this.formData.username);
      // 设置密码
      user.setPassword(this.formData.password);
      // 设置邮箱
      user.setEmail(this.formData.email);
      user.signUp().then(function (loginedUser) {
        console.log(loginedUser);
      }, function (error) {
      });
    }
  }
})
