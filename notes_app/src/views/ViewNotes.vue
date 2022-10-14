<template>
  <div class="notes">
    <div class="card mb-4 p-4 has-background-success-dark">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            placeholder="Add Notes"
            ref="newNoteRef"
          />
        </div>
      </div>
    </div>
    <Note v-for="note in notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Note from "@/components/Notes/Notes.vue";

const newNote = ref("");
const newNoteRef = ref(null);

const notes = ref([
  {
    id: "id1",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quibusdam similique repellat nostrum itaque enim ad, sit laborum odit exercitationem qui tenetur ullam quis. Labore vitae dolore asperiores neque explicabo.",
  },
  {
    id: "id2",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
]);

const addNote = () => {
  let currentDate = new Date().getTime(),
    id = currentDate.toString();

  let note = {
    id,
    content: newNote.value,
  };

  notes.value.unshift(note);

  newNote.value = "";
  newNoteRef.value.focus();
};
</script>
