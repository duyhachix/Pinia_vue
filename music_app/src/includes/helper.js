export default {
  /**
   * A utility function that format time into 'minutes:seconds' format
   * @param {Number} time: The time in seconds
   * @returns {String} The formatted time
   */
  formatTime(time) {
    // format the time in seconds to minutes and seconds
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time - minutes * 60) || 0;

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  },
};
