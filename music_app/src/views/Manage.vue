<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload-section :addSong="addSong" ref="upload"></upload-section>
      </div>
      <div class="col-span-2">
        <div
          class="bg-white rounded border border-gray-200 relative flex flex-col"
        >
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i
              class="fa fa-compact-disc float-right text-green-400 text-2xl"
            ></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :index="i"
              :updateSong="updateSong"
              :deleteSong="deleteSong"
            ></composition-item>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import useUserStore from '@/stores/user';
import UploadSection from '@/components/UploadSection.vue';
import CompositionItem from '@/components/CompositionItem.vue';
import { auth, songsCollection } from '@/includes/firebase';

export default {
  name: 'Manage',
  components: {
    UploadSection,
    CompositionItem,
  },
  data() {
    return {
      songs: [],
    };
  },

  async created() {
    // query database for songs
    let snapshot = await songsCollection
      .where('uid', '==', auth.currentUser.uid)
      .get();
    console.log('snapshot', snapshot);
    snapshot.forEach(this.addSong);
  },

  methods: {
    /**
     * Update song info event handler
     * @param {Number} i: index of song
     * @param {Object} values: values of song that were updated
     */
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    },

    /**
     * Delete song event hanq
     * @param {Number} i: index of song
     */
    deleteSong(i) {
      this.songs.splice(i, 1);
    },

    addSong(document) {
      console.log('document', document);
      let song = {
        ...document.data(),
        docID: document.id,
      };

      this.songs.push(song);
    },
  },
  // Method 2 to cancel upload: using the router guard (the best method to cancel upload but in this app we just need to use method 1)
  // beforeRouteLeave(to, from, next) {
  //   let uploadRef = this.$refs.upload;
  //   uploadRef.onCancelUpload();
  //   next();
  // },

  // // route setup
  // beforeRouteEnter(to, from, next) {
  //   let store = useUserStore();
  //   if (store.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: 'home' });
  //   }
  // },
};
</script>
