// LYRIC INFO
const songList = {

  1: "Fun times in Babylon/ That's what I'm counting on/ Before the dam goes up at the foot of the sea/ Before the new wing of the prison ribbon ceremony/ Before the Star of the Morning comes looking for me/ I would like to abuse my lungs/ Smoke everything in sight with every girl I've ever loved/ Ride around the wreckage on a horse knee-deep in blood/ Look out Hollywood here I come/ Fun times in Babylon/ Mama, they've just begun/ Before they put me to work in a government camp/  Before they do my face up like a corpse and say get up and dance/ Before the beast comes lookin for last year's rent/ I would like to abuse my lungs/ Smoke everything in sight with every girl I've ever loved/ Ride around the wreckage on a horse knee-deep in blood/ Look out Hollywood here I come/ Look out Hollywood here I come/ Look out Hollywood here I come".split('/ '),

  2: "A heart that's full up like a landfill/ A job that slowly kills you/ Bruises that won't heal/ You look so tired, unhappy/ Bring down the government/ When they don't, they don't speak for us/ I'll take a quiet life/ A handshake of carbon monoxide/ With no alarms and no surprises/ No alarms and no surprises/ No alarms and no surprises/ Silent, silent/ This is my final fit/ My final bellyache/ With no alarms and no surprises/ No alarms and no surprises/ No alarms and no surprises, please/ INSTRUMENTAL/ Such a pretty house/ And such a pretty garden/ No alarms and no surprises/ No alarms and no surprises/ No alarms and no surprises, please".split('/ '),

  3: "Twenty-five years and my life is still, Trying to get up that great big hill of hope, For a destination, I realized quickly when I knew I should, That the world was made up of this brotherhood of man, For whatever that means, And so I cry sometimes when I'm lying in bed, Just to get it all out what's in my head, And I, I am feeling a little peculiar, And so I wake in the morning and I step outside, And I take a deep breath and I get real high, and I Scream from the top of my lungs, What's going on?, And I say hey yeah yeah hey yeah yeah, I said hey what's going on?, And I say hey yeah yeah hey yeah yeah,I said hey what's going on?".split(', ')
}

// INITIAL REDUX STATE
const initialState = {
  currentSongId: null,
  songsById: {
    1: {
      title: "Funtimes in Babylon",
      artist: "Father John Misty",
      songId: 1,
      songArray: songList[1],
      arrayPosition: 0,
    },
    2: {
      title: "No Surprises",
      artist: "Radiohead",
      songId: 2,
      songArray: songList[2],
      arrayPosition: 0,
    },
    3: {
      title: "What's Goin' On",
      artist: "Four Non-Blondes",
      songId: 2,
      songArray: songList[3],
      arrayPosition: 0,
    }
  }
}

// REDUCERS
const lyricChangeReducer = (state = initialState.songsById, action) => {
  let newArrayPosition;
  let newSongsByIdEntry;
  let newSongsByIdStateSlice;
  switch (action.type) {
    case 'NEXT_LYRIC':
      // Locates the arrayPosition of the song whose ID was provided in the action's payload and increments it by one:
      newArrayPosition = state[action.currentSongId].arrayPosition + 1;

      // Creates a copy of that song's entry in the songsById state slice and adds the updated newArrayPosition value we just calculated as its arrayPosition:
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: newArrayPosition
      });

      // Creates a copy of the entire songsById state slice and adds the updated newSongsById state entry we just created to this new copy:
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });

      // Returns the entire newSongsByIdStateSlice we just constructed, which will update state in our Redux store to match this returned value:
      return newSongsByIdStateSlice;

    case 'RESTART_SONG':
      newSongsByIdEntry = Object.assign({}, state[action.currentSongId], {
        arrayPosition: 0
      });
      newSongsByIdStateSlice = Object.assign({}, state, {
        [action.currentSongId]: newSongsByIdEntry
      });
      return newSongsByIdStateSlice;
    default:
      return state;
  }
}

const songChangeReducer = (state = initialState.currentSongId, action) => {
  switch (action.type) {
    case 'CHANGE_SONG':
      return action.newSelectedSongId
    default:
      return state;
  }
}

// JEST TESTS & SETUP
const { expect } = window;

  // tests for LYRIC CHANGE REDUCER
expect(lyricChangeReducer(initialState.songsById, { type: null })).toEqual(initialState.songsById);

expect(lyricChangeReducer(initialState.songsById, { type: 'NEXT_LYRIC', currentSongId: 2 })).toEqual({
  1: {
    title: "Funtimes in Babylon",
    artist: "Father John Misty",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "No Surprises",
    artist: "Radiohead",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 1,
  },
  3: {
    title: "What's Goin' On",
    artist: "Four Non-Blondes",
    songId: 2,
    songArray: songList[3],
    arrayPosition: 0,
  }
});

expect(lyricChangeReducer(
  initialState.songsById,
  { type: 'RESTART_SONG', currentSongId: 1 }
)).toEqual({
  1: {
    title: "Funtimes in Babylon",
    artist: "Father John Misty",
    songId: 1,
    songArray: songList[1],
    arrayPosition: 0,
  },
  2: {
    title: "No Surprises",
    artist: "Radiohead",
    songId: 2,
    songArray: songList[2],
    arrayPosition: 0,
  },
  3: {
    title: "What's Goin' On",
    artist: "Four Non-Blondes",
    songId: 2,
    songArray: songList[3],
    arrayPosition: 0,
  }
});

  //tests for SONG CHANGE REDUCER
expect(songChangeReducer(initialState, { type: null })).toEqual(initialState);

expect(songChangeReducer(initialState, { type: 'CHANGE_SONG', newSelectedSongId: 1})).toEqual(1);

// REDUX STORE
const { createStore } = Redux;
const store = createStore(lyricChangeReducer);

// // RENDERING STATE IN DOM
// const renderLyrics = () => {
//   // definds a lyricsDisplay constat referring to the div with a 'lyrics' ID in index.html
//   const lyricsDisplay = document.getElementById('lyrics');
//   //if there are already lyrics in this div, remove them one-by-one until it is empty:
//   while (lyricsDisplay.firstChild) {
//     lyricsDisplay.removeChild(lyricsDisplay.firstChild);
//   }
//   // Locates the song lyric at the current arrayPosition:
//   const currentLine = store.getState().songLyricsArray[store.getState().arrayPosition];
//   // Creates DOM text node containing the song lyric identified in line above:
//   const renderedLine = document.createTextNode(currentLine);
//   // Adds text node created in line above to 'lyrics' div in DOM
//   document.getElementById('lyrics').appendChild(renderedLine);
// }
//
// // runs renderLyrics() method from above when page is finished loading.
// //window.onload is the HTML5 version of jQuery's $(document).ready()
// window.onload = function() {
//   renderLyrics();
// }
//
// // CLICK LISTENER
// const userClick = () => {
//   const currentState = store.getState();
//   if (currentState.arrayPosition === currentState.songLyricsArray.length - 1){
//     store.dispatch({ type: 'RESTART_SONG' });
//   } else {
//     store.dispatch({ type: 'NEXT_LYRIC' });
//   }
// }
//
// // SUBSCRIBE TO REDUX STORE
// store.subscribe(renderLyrics);
