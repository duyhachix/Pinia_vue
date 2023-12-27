import { defineStore } from 'pinia';
import { Howl } from 'howler';
import helper from '@/includes/helper';

const usePlayerStore = defineStore('player', {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%',
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
    /**
     * player button click event handler in Player.vue file
     * @param {Object} song: The song info
     */
    async newSong(song) {
      // check if Howl sound object is already exist then unload the song
      if (this.sound instanceof Howl) {
        this.sound.unload();
      }

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

      this.sound.on('seek', () => requestAnimationFrame(this.progress));
    },

    async toggleAudio() {
      if (!this.sound.playing) return;

      this.sound.playing() ? this.sound.pause() : this.sound.play();
    },

    progress() {
      // update seek and duration state
      this.seek = helper.formatTime(this.sound.seek());
      this.duration = helper.formatTime(this.sound.duration());

      this.playerProgress = `${
        (this.sound.seek() / this.sound.duration()) * 100
      }%`;

      // check if the song is playing
      if (this.sound.playing()) {
        // update and reflect the current progress of the song
        requestAnimationFrame(this.progress);
      }
    },

    /**
     *
     * @param {Event} e
     */
    updateSeek(e) {
      if (!this.sound.playing) return;

      // get the x position of the mouse click relative to the progress bar
      const { x, width } = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - x;
      const percentage = clickX / width;
      const seconds = this.sound.duration() * percentage;

      // change the position
      this.sound.seek(seconds);
      // this.sound.once('seek', this.progress);
    },
  },
});

export default usePlayerStore;
