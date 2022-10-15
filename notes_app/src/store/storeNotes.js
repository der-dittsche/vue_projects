import { defineStore } from "pinia";

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [
        {
          id: "id1",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quibusdam similique repellat nostrum itaque enim ad, sit laborum odit exercitationem qui tenetur ullam quis. Labore vitae dolore asperiores neque explicabo.",
        },
        {
          id: "id2",
          content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
        {
          id: "id3",
          content:
            "Lorem ipsum dolor sit aasdfasdasdff met consectetur adipisicing elit. odit exercitationem qui tenetur ullam quis. Labore v",
        },
        {
          id: "id4",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. olor sit amet consectetur adipisicing elit. Voluptas quibusdam similique repellat nostrum itaque enim ad, sit laborum odit exercitationem",
        },
      ],
    };
  },
  actions: {
    addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        id = currentDate.toString();

      let note = {
        id,
        content: newNoteContent,
      };

      this.notes.unshift(note);
    },
    deleteNote(idToDelete) {
      this.notes = this.notes.filter((note) => {
        return note.id !== idToDelete;
      });
    },
  },
});
