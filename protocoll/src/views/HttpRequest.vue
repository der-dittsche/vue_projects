<!-- eslint-disable no-undef -->
<template>
  <div class="attendees">
    <h1>Hallo Welt!</h1>
    <form @submit.prevent="addAttendee">
      <p class="input_text_attendee">
        <input
          v-model="newAttendeeContent"
          class="input_text_attendee"
          type="text"
          placeholder="surname"
        />
        <input
          v-model="newAttendeeContent"
          class="input_text_attendee"
          type="text"
          placeholder="lastname"
        />
        <input
          v-model="newAttendeeContent"
          class="input_text_attendee"
          type="text"
          placeholder="githubAccount"
        />
        <input
          v-model="newAttendeeContent"
          class="input_text_attendee"
          type="text"
          placeholder="email"
        />
        <input
          v-model="newAttendeeContent"
          class="input_text_attendee"
          type="text"
          placeholder="class"
        />
      </p>
      <p class="input_button_attendee">
        <button :disable="!newAttendeeContent" class="input_button_text">
          Submit
        </button>
      </p>
    </form>
    <div v-for="attendee in attendees" :key="attendee.id" class="card">
      <div class="card_content_text">
        <ul>
          <li>{{ attendee.surname }}</li>
          <li>{{ attendee.lastname }}</li>
          <li>{{ attendee.email }}</li>
          <li>{{ attendee.githubAccount }}</li>
          <li>{{ attendee.classes }}</li>
        </ul>
      </div>
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

/* firebase reference */

const attendeesCollectionRef = collection(db, "protocoll-app");
const attendeesCollectionQuerry = query(
  attendeesCollectionRef,
  orderBy("class", "desc")
);

/* get Array of Attendees from firebase */

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

/* Array of Attendees */

const attendees = ref[{}];

/* add new Attendee by click submit button or press enter */

const newAttendeeContent = ref("");

const addAttendee = () => {
  addDoc(attendeesCollectionRef, {
    firstname: newAttendeeContent.value,
    laststname: newAttendeeContent.value,
    email: newAttendeeContent.value,
    githubAccount: newAttendeeContent.value,
    classes: newAttendeeContent.value,
    fulltime: true,
    date: Date.now(),
  });
  newAttendeeContent.value = "";
};
</script>
