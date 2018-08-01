import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    items: []
  },
  actions: {    
    loadTodos ({ commit }) {
        axios.get('/api/todos')              
            .then(response => response.data)
            .then(todos => {
                commit('SET_TODOS', todos)
            })
    },
    addTodo ({ commit }, { todo }) {
        axios.post('/api/todos', todo) 
            .then(response => { 
                commit('ADD_TODO',response.data)
            });  
    },
    removeTodo ({ commit }, { todo }) {
        axios.delete('/api/todos/'+todo.id)
            .then(response => {
                commit('REMOVE_TODO',todo)                
            }) 
    },
    toggleDone ({ commit }, { todo }) {
        todo.done=!todo.done
        axios.put('/api/todos/'+todo.id, todo)
            .then(response => {
                commit('DONE_TODO',response.data)                
            }); 
    }
  },
  mutations: {
    SET_TODOS: (state, todos) => {
        state.items = todos
    },
    ADD_TODO: (state, todo) => {
        state.items.push(todo)
    },
    REMOVE_TODO: (state, todo) => {
        state.items = state.items.filter(item => item.id !== todo.id)
    },
    DONE_TODO: (state, todo) => {
        state.items.filter(item => item.id === todo.id)[0].done = todo.done;
    }
  },
  getters: {
  },  
  modules: {
    
  }
})

export default store