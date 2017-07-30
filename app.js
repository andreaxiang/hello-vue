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

      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();
      avTodos.set('content', dataString);
      avTodos.save().then(function(todo){
        //保存成功后，执行其他逻辑
        console.log('保存成功');
      },function(error){
        console.error('保存失败');
      })

      let oneditString = JSON.stringify(this.newTodo)
      window.localStorage.setItem('typeTodo', oneditString)
    }

    //从 LeanCloud 读取 todos 的逻辑先不写
    /*let oldDataString = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDataString)
    this.todoList = oldData || []*/

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
