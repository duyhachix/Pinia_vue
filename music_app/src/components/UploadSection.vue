<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop=""
        @dragend.prevent.stop="is_dragover = false"
        @dragover.prevent.stop="is_dragover = true"
        @dragenter.prevent.stop="is_dragover = true"
        @dragleave.prevent.stop="is_dragover = false"
        @drop.prevent.stop="onUpload($event)"
      >
        <h5>Drop your files here</h5>
      </div>
      <input type="file" id="" multiple @change="onUpload($event)" />
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.text_class">
          <i :class="upload.icon"></i>{{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar bg-blue-400"
            :class="upload.variant"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { auth, storage, songsCollection } from '@/includes/firebase';

export default {
  name: 'UploadSection',
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },

  beforeUnmount() {
    // handling cancel uploading file when unmounting the component
    this.uploads.forEach((upload) => {
      upload.task.cancel();
    });
  },

  methods: {
    onUpload($event) {
      this.is_dragover = false;

      // default files is object, so that we need spread object into array
      let files = $event.dataTransfer
        ? [...$event.dataTransfer.files]
        : [...$event.target.files];

      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          console.log('Invalid file type. Please upload an mp3 file.');
          return;
        }

        // reference to the storage - it represent the path in firebase storage a.k.a "storageBucket"
        // storageBucket : music-pinia.appspot.com,
        const storageRef = storage.ref();
        const songsRef = storageRef.child(`songs/${file.name}`); // 'music-pinia.appspot.com/songs/example.mp3'',

        // upload file to firebase storage (*)
        let task = songsRef.put(file);

        let uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
            variant: 'bg-blue-400',
            icon: 'fas fa-spinner fa-spin',
            text_class: '',
          }) - 1;

        task.on(
          'state_changed',
          // function1: handling the progress change
          (snapshot) => {
            let percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // re-assign precentage value
            this.uploads[uploadIndex].current_progress = percentage;
          },

          // function2: handling the error (optional)
          (error) => {
            // change the properties of the upload object to error status
            this.uploads[uploadIndex].variant = 'bg-red-400';
            this.uploads[uploadIndex].icon = 'fas fa-exclamation-triangle';
            this.uploads[uploadIndex].text_class = 'text-red-400';
            console.error(error);
          },

          // function3: handling the success (optional)
          async () => {
            let song = {
              uid: auth.currentUser.uid,
              display_name: auth.currentUser.displayName,
              original_name: task.snapshot.ref.name,
              modified_name: task.snapshot.ref.name,
              genre: '',
              comment_count: 0,
            };
            song.url = await task.snapshot.ref.getDownloadURL();

            // add object 'song' to the database (**)
            await songsCollection.add(song);

            // change the properties of the upload object to success status
            this.uploads[uploadIndex].variant = 'bg-green-400';
            this.uploads[uploadIndex].icon = 'fas fa-check';
            this.uploads[uploadIndex].text_class = 'text-green-400';
          },
        );
      });

      console.log(files);
    },
  },
};
</script>
