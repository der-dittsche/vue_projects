<template>
  <div class="input_area">
    <form @submit.prevent="addTodo">
      <div class="first_input">
        <p class="first_input_text">
          <input
            v-model="newTodoContent"
            class="first_input_text_area"
            type="text"
            placeholder="add Todo"
          />
        </p>
        <p class="first_input_button">
          <button :disabled="!newTodoContent" class="first_input_button_text">
            Submit
          </button>
        </p>
      </div>
    </form>
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="card"
      :class="{ todo_is_done: todo.done }"
    >
      <div class="card_content">
        <div class="card_content_text" :class="{ todo_text_done: todo.done }">
          {{ todo.content }}
        </div>
        <div class="todo_buttons">
          <button
            @click="toggleDone(todo.id)"
            class="check_button"
            :class="todo.done ? 'todo_button_done' : 'todo_botton_notdone'"
          >
            o.k.
          </button>
          <button @click="deleteTodo(todo.id)" class="check_button">del</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  doc,
  collection,
  /*getDocs*/ onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";

/* firebase reference */

const todosCollectionRef = collection(db, "todo-app");
const todosCollectionQuerry = query(
  todosCollectionRef,
  orderBy("date", "desc")
);

/* get Array of Todo from firebase */

onMounted(() => {
  onSnapshot(todosCollectionQuerry, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

/* Array of Todo */

const todos = ref([]);

/* add new todo by click submit button or press enter */

const newTodoContent = ref("");

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newTodoContent.value,
    done: false,
    date: Date.now(),
  });
  newTodoContent.value = "";
};

/* delete todo by delete button */

const deleteTodo = (id) => {
  deleteDoc(doc(todosCollectionRef, id));
};

/* toggle done by check button */

const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done,
  });
};
</script>
