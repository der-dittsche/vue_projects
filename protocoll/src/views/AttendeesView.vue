<template>
  <div><h2>Add new Attendee</h2></div>
  <form @submit.prevent="addAttendee">
    <div class="first_input">
      <p class="first_input_text">
        <input
          v-model="newAttendeeContentSurname"
          class="first_input_text_area"
          type="text"
          placeholder="Surname"
        />
        <input
          v-model="newAttendeeContentLastname"
          class="first_input_text_area"
          type="text"
          placeholder="Lastname"
        />
        <input
          v-model="newAttendeeContentEmail"
          class="first_input_text_area"
          type="text"
          placeholder="E-Mail"
        />
        <input
          v-model="newAttendeeContentGithub"
          class="first_input_text_area"
          type="text"
          placeholder="github Account Name"
        />
        <input
          v-model="newAttendeeContentClasses"
          class="first_input_text_area"
          type="text"
          placeholder="Classes"
        />
      </p>
      <p class="first_input_button">
        <button
          :disabled="
            !(
              newAttendeeContentSurname.length > 0 &&
              newAttendeeContentLastname.length > 0 &&
              newAttendeeContentEmail.length > 0 &&
              newAttendeeContentGithub.length > 0 &&
              newAttendeeContentClasses.length > 0
            )
          "
          class="first_input_button_text"
        >
          Submit
        </button>
      </p>
    </div>
  </form>
  <div><h2>AttendeeList</h2></div>
  <div v-for="attendee in attendees" :key="attendee.id" class="card">
    <div class="card_content_text">
      <ul>
        <li>{{ attendee.surname }}</li>
        <li>{{ attendee.lastname }}</li>
        <li>{{ attendee.email }}</li>
        <li>{{ attendee.githubAccount }}</li>
        <li>{{ attendee.classes }}</li>
        <li>Fulltime: {{ attendee.fulltime }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";

const attendees = ref([]);

const attendeesCollectionRef = collection(db, "protocoll-app");
const attendeesCollectionQuerry = query(
  attendeesCollectionRef,
  orderBy("classes", "desc")
);

onMounted(() => {
  onSnapshot(attendeesCollectionQuerry, (querySnapshot) => {
    const fbAttendees = [];
    querySnapshot.forEach((doc) => {
      const attendees = {
        id: doc.id,
        surname: doc.data().surname,
        lastname: doc.data().lastname,
        email: doc.data().email,
        githubAccount: doc.data().githubAccount,
        classes: doc.data().classes,
        fulltime: doc.data().fulltime,
      };
      fbAttendees.push(attendees);
    });
    attendees.value = fbAttendees;
  });
});

const newAttendeeContentSurname = ref("");
const newAttendeeContentLastname = ref("");
const newAttendeeContentEmail = ref("");
const newAttendeeContentGithub = ref("");
const newAttendeeContentClasses = ref("");

const addAttendee = () => {
  addDoc(attendeesCollectionRef, {
    surname: newAttendeeContentSurname.value,
    lastname: newAttendeeContentLastname.value,
    email: newAttendeeContentEmail.value,
    githubAccount: newAttendeeContentGithub.value,
    classes: newAttendeeContentClasses.value,
    fulltime: true,
  });
  newAttendeeContentSurname.value = "";
  newAttendeeContentLastname.value = "";
  newAttendeeContentEmail.value = "";
  newAttendeeContentGithub.value = "";
  newAttendeeContentClasses.value = "";
};
</script>
