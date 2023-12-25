import { defineStore } from 'pinia';

const usePlayerStore = defineStore('player', {
  state: () => ({
    currentSong: {},
  }),

  actions: {
    async newSong(song) {
      console.log('newSong action', song);
      this.currentSong = song;
    },
  },
});

export default usePlayerStore;
