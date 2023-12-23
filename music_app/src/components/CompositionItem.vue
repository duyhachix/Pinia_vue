<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-lg font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click="openDialog"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="onToggleShowForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
      <el-dialog
        v-model="centeredDialog"
        width="40%"
        align-center
        title="Confirm"
      >
        <span>
          <span>Do you want to delete the song ?</span>
        </span>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="danger" @click="centeredDialog = false"
              >Cancel</el-button
            >
            <el-button type="white" @click="onDeleteSong"> Confirm </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <div v-show="showForm">
      <div
        class="text-white text-center font-bold p-2 mb-2 rounded"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form
        :validation-schema="schema"
        :initial-values="song"
        @submit="onEdit"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <ErrorMessage
            class="text-red-400"
            name="modified_name"
          ></ErrorMessage>
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <ErrorMessage class="text-red-200" name="genre"></ErrorMessage>
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          @click.prevent="onCancel"
          :disabled="in_submission"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase';

export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    deleteSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modified_name: 'required',
        genre: 'alpha_spaces',
      },
      in_submission: false,
      show_alert: false,
      alert_variant: 'bg-blue-500',
      alert_message: 'Please wait, updating song info ...',

      centeredDialog: false,
    };
  },
  methods: {
    onToggleShowForm() {
      this.showForm = !this.showForm;
    },
    // vee-validate get the 'values'
    async onEdit(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = 'bg-blue-500';
      this.alert_message = 'Please wait, updating song info';

      try {
        await songsCollection.doc(this.song.docID).update(values);
      } catch (e) {
        this.in_submission = false;
        this.alert_variant = 'bg-red-500';
        this.alert_message = e.message;

        return;
      }

      this.updateSong(this.index, values);

      this.in_submission = false;
      this.alert_variant = 'bg-green-500';
      this.alert_message = 'Song updated successfully';
    },

    onCancel() {
      this.showForm = false;
    },

    openDialog() {
      this.centeredDialog = true;
    },

    async onDeleteSong() {
      // reference to the storage object
      let storageref = storage.ref();
      let songRef = storageref.child(`songs/${this.song.original_name}`);

      await Promise.all([
        songRef.delete(),
        songsCollection.doc(this.song.docID).delete(),
      ]);

      // line 147, 149 nen co ham promise all hoac all settled
      this.deleteSong(this.index);
    },
  },
};
</script>
