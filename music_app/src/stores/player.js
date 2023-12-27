import { defineStore } from 'pinia';
import { Howl } from 'howler';

const usePlayerStore = defineStore('player', {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
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
      this.sound.on('play', () => {
        // requestAnimationFrame were used will execute a function passed into it
        // the function gets called before next frame gets painted onto screen
        // update the 'seek' and 'duration'
        requestAnimationFrame(this.progress);
      });
    },

    async toggleAudio() {
      if (!this.sound.playing) return;

      this.sound.playing() ? this.sound.pause() : this.sound.play();
    },

    async progress() {
      // update seek and duration state
      this.seek = this.sound.seek();
      this.duration = this.sound.duration();

      // check if the song is playing 
      if (this.sound.playing()) {
        // update and reflect the current progress of the song
        requestAnimationFrame(this.progress);
      }
    },
  },
});

export default usePlayerStore;
