<template>
  <div class="notes">
    <AddEditNote v-model="newNote" ref="addEditNote">
      <template #buttons>
        <button
          @click="addNote"
          :disabled="!newNote"
          class="button is-link has-background-success"
        >
          Add New Note
        </button></template
      >
    </AddEditNote>
    <Note v-for="note in storeNotes.notes" :key="note.id" :note="note" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Note from "@/components/Notes/Notes.vue";
import AddEditNote from "@/components/Layout/AddEditNote.vue";
import { useStoreNotes } from "@/store/storeNotes";

const newNote = ref("");

const storeNotes = useStoreNotes();
const addEditNoteRef = ref(null);

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
  storeNotes.addNote(newNote.value);

  newNote.value = "";
  addEditNoteRef.value.focusTextarea();
};
</script>
