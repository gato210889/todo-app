<template>
    <div class="container">
        <todo-input-component
            @click="addTodo"
            @addTodo="addTodo"
        ></todo-input-component>
        <table class="table is-bordered">
            <tr v-for="(todo, index) in items" :key="index">
                <td class="is-fullwidth" style="cursor: pointer" :class="{ 'is-done': todo.done }" @click="toggleDone(todo)">
                    {{ todo.text }}
                </td>
                <td class="is-narrow">
                    <a class="button is-danger is-small" @click="removeTodo(todo)">Eliminar</a>
                </td>
            </tr>
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
                    .then(res => { 
                        this.items.push(res.data) 
                        this.todoItemText = '' 
                    });                     
                } 
            },   
            removeTodo (todo) {
                axios.delete(`http://127.0.0.1:8000/api/todos/`+todo.id)
                .then(response => {
                    this.items = this.items.filter(item => item !== todo)
                })
            },
            toggleDone (todo) {
                todo.done = !todo.done
                axios.put(`http://127.0.0.1:8000/api/todos/`+todo.id, todo)
                .then(res => {
                    todo=res.data
                });
                
            }
        },
        components: {
            'todo-input-component': require('./TodoInput.vue')
        }
    }
</script>

<style>
    .is-done {
        text-decoration: line-through;
    }
</style>
