<!-- eslint-disable no-undef -->
<!-- eslint-disable no-undef -->
<!-- eslint-disable no-unused-vars -->
<template>
  <h2>open Questions</h2>
  <div class="question_content">
    <p class="question_title">
      {{ note.question }}
    </p>
    <p class="answer_title">
      <textarea
        ref="newAnswerRef"
        v-model="answer"
        class="add_answer_content_value"
        placeholder="Type an Answer"
      >
      </textarea>
    </p>
    <p>{{ note.answer }}</p>
    <div class="edit_buttons">
      <button class="edit" @click="saveAnswer">edit</button>
      <button class="cancel" @click="cancelAnswer">cancel</button>
    </div>
    <p class="date">{{ note.date }}</p>
    <div class="question_buttons">
      <button class="edit">edit</button>
      <button class="done">done</button
      ><button class="delete" @click.prevent="handleDeletQuestion">
        delete
      </button>
    </div>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars, no-undef
const props = defineProps({
  note: {
    type: Object,
    required: true,
  },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["deleteClicked", "editClicked", "cancelClicked"]);

const handleDeletQuestion = () => {
  emit("deleteClicked", props.note.id);
};

const saveAnswer = () => {
  emit("editClicked", props.note.id);
};
const cancelAnswer = () => {
  emit("cancelClicked", props.note.id);
};
</script>
