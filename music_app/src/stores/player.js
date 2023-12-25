import { defineStore } from 'pinia';
import { Howl } from 'howler';

const usePlayerStore = defineStore('player', {
  state: () => ({
    currentSong: {},
    sound: {},
  }),

  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
  },

  actions: {
    async newSong(song) {
      console.log('newSong action', song);
      this.currentSong = song;
      // use Howl to create a song object
      this.sound = new Howl({
        src: [song.url],
        html5: true,
      });

      this.sound.play();
    },

    async toggleAudio() {
      if (!this.sound.playing) return;

      this.sound.playing() ? this.sound.pause() : this.sound.play();
    },
  },
});

export default usePlayerStore;
