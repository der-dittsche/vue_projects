<template>
  <div class="task">
    <h2>New Questions</h2>
    <div class="add_questions">
      <div class="add_question_content">
        <textarea
          ref="newQuestionRef"
          v-model="newQuestion"
          class="add_question_content_value"
          placeholder="ask your Question"
        ></textarea>
      </div>
      <div class="add_question_buttons">
        <button :disabled="!newQuestion" @click="addQuestion">submit</button>
      </div>
    </div>
    <QuestionContent
      v-for="note of notes"
      :key="note.id"
      :note="note"
      @delete-clicked="deleteQuestion"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import QuestionContent from "@/components/QuestionContent.vue";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";

const notes = ref([]);

const questionCollectionQuerry = collection(db, "task-app");

const newQuestion = ref("");
const newQuestionRef = ref(null);

const answer = ref("");
const answerRef = ref(null);

const addQuestion = () => {
  addDoc(questionCollectionQuerry, {
    id: "",
    question: newQuestion.value,
    answer: "",
    date: "",
  });

  newQuestion.value = "";

  newQuestionRef.value.focus();
};

const deleteQuestion = (idToDelete) => {
  deleteDoc(doc(questionCollectionQuerry, idToDelete));
};

const saveAnswer = (id, answer) => {
  updateDoc(doc(questionCollectionQuerry, id), {
    answer: answer.value,
  });
  answer.value = "";

  answerRef.value.focus();
};

const undoAnswer = () => {};

onMounted(() => {
  onSnapshot(questionCollectionQuerry, (querySnapshot) => {
    const fbQuestions = [];
    querySnapshot.forEach((doc) => {
      const questionEntrys = {
        id: doc.id,
        question: doc.data().question,
        answer: doc.data().answer,
        date: doc.data().date,
      };
      fbQuestions.push(questionEntrys);
    });
    notes.value = fbQuestions;
  });
});
</script>
