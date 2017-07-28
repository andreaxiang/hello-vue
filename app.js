import Vue from 'vue';

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  created: function(){
    window.onbeforeunload = ()=>{
      let dataString = JSON.stringify(this.todoList)
      window.localStorage.setItem('myTodos', dataString)
    }

    let oldDataString = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDataString)
    this.todoList = oldData || []

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
