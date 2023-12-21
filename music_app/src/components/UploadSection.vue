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
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm">{{ upload.name }}</div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div
            class="transition-all progress-bar bg-blue-400"
            :class="'bg-blue-400'"
            :style="{ width: upload.current_progress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { storage } from '@/includes/firebase';

export default {
  name: 'UploadSection',
  data() {
    return {
      is_dragover: false,
      uploads: [],
    };
  },
  methods: {
    onUpload($event) {
      this.is_dragover = false;
      // default files is object, so that we need spread object into array
      let files = [...$event.dataTransfer.files];

      files.forEach((file) => {
        if (file.type !== 'audio/mpeg') {
          console.log('Invalid file type. Please upload an mp3 file.');
          return;
        }

        // reference to the storage - it represent the path in firebase storage a.k.a "storageBucket"
        // storageBucket : music-pinia.appspot.com,
        const storageRef = storage.ref();
        const songsRef = storageRef.child(`songs/${file.name}`); // 'music-pinia.appspot.com/songs/example.mp3'',

        // upload file to firebase storage
        let task = songsRef.put(file);

        let uploadIndex =
          this.uploads.push({
            task,
            current_progress: 0,
            name: file.name,
          }) - 1;

        task.on('state_changed', (snapshot) => {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // re-assign precentage value
          this.uploads[uploadIndex].current_progress = percentage;
          console.log(`Upload is ${percentage}%/100% done`);
        });
      });

      console.log(files);
    },
  },
};
</script>
