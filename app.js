import Vue from 'vue';

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
    }
  }
})
