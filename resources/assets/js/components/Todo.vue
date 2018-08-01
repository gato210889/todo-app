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
    import { mapState } from 'vuex';

    export default {   
        computed: mapState([
            'items'
        ]),  
        mounted () {
            this.$store.dispatch('loadTodos')            
        },
        methods: {          
            addTodo (todo) { 
                todo.text = todo.text.trim()                 
                if (todo.text !== '') { 
                    this.$store.dispatch('addTodo', {todo})                    
                } 
            },   
            removeTodo (todo) {
                this.$store.dispatch('removeTodo', {todo})
            },
            toggleDone (todo) {
                this.$store.dispatch('toggleDone', {todo})             
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
