import Vue from 'vue';

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  methods: {
    addTodo: function(){
      this.todoList.push({
        title: this.newTodo,
        createdAt: new Date()
      })
      this.newTodo = ''; //输入完成之后清空
    }
  }
})
