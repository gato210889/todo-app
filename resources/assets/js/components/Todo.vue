<template>
    <div class="container">
        <todo-input-component
            @click="addTodo"
            @addTodo="addTodo"
        ></todo-input-component>
        <table class="table is-bordered">
            <todo-item-component v-for="todo in items" :key="todo.id" v-bind="todo"
                @toggleDone="toggleDone"
                @removeTodo="removeTodo">
            </todo-item-component>
        </table>
    </div>
</template>

<script>
    /**
     * Tips:
     * - En mounted pueden obtener el listado del backend de todos y dentro de la promesa de axios asirnarlo
     *   al arreglo que debe tener una estructura similar a los datos de ejemplo.
     * - En addTodo, removeTodo y toggleTodo deben hacer los cambios pertinentes para que las modificaciones,
     *   addiciones o elimicaiones tomen efecto en el backend asi como la base de datos.
     */
    export default {        
        data () {
            return {
                todoItemText: '',
                items: [],
            }
        },
        mounted () {
            axios.get(`http://127.0.0.1:8000/api/todos`)
            .then(response => {
                this.items = response.data
            })            
        },
        methods: {          
            addTodo (todoItemText) { 
                let text = todoItemText.trim()                 
                if (text !== '') {                     
                    axios.post(`http://127.0.0.1:8000/api/todos`, { text: text, done: false }) 
                    .then(response => { 
                        this.items.push(response.data) 
                        this.todoItemText = '' 
                    });                     
                } 
            },   
            removeTodo (todo) {
                axios.delete(`http://127.0.0.1:8000/api/todos/`+todo.id)
                .then(response => {
                    this.items = this.items.filter(item => item.id !== todo.id)
                })
            },
            toggleDone (todo) {
                todo.done=!todo.done
                axios.put(`http://127.0.0.1:8000/api/todos/`+todo.id, todo)
                .then(response => {
                    this.items.filter(item => item.id === todo.id)[0].done = todo.done;
                });                
            }
        },
        components: {
            'todo-input-component': require('./TodoInput.vue'),
            'todo-item-component': require('./TodoItemReminder.vue')
        }
    }
</script>

<style>
    .is-done {
        text-decoration: line-through;
    }
</style>
