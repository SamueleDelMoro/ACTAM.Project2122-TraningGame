var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBw4yueSosPMIWNkEAWI1zi_9RdTr2jGt4",
  authDomain: "provamelody.firebaseapp.com",
  projectId: "provamelody",
  storageBucket: "provamelody.appspot.com",
  messagingSenderId: "173143885954",
  appId: "1:173143885954:web:40e739ff4d5f0160c30c9b"
});

var db = firebaseApp.firestore();

const collectionRef = db.collection('Melody');

const docRef = collectionRef.doc("RicNumeroUno");
var noteArray = [];
var durationArray = [];
var timeArray = [];
var melodyArray = [];
var melodyToUpload = [];

class DB{
  constructor(){
  }

  initializeLocalVariables(){
    console.log("initLocal");
    docRef.get().then((doc) => {
      if(!doc.exists)
        return;
      var c = doc.data();
      melodyArray = doc.get("melodyToUpload");
        //var t = JSON.stringify(c)
        //const obj = JSON.parse(t);
        //noteArray = obj.melody.split(',');
        //dArray = obj.duration.split(',').map(Number);
        //custom = new CustomFunctions(dArray, noteArray);
        //noteArray.push(c)
      melodyArray.forEach(element => {
        noteArray.push(element.Note);
        durationArray.push(element.Duration);
        timeArray.push(element.Time);
      });
      console.log(noteArray);
    });
  }

  getNoteArray(){
    return noteArray;
  }

  getDurationArray(){
    return durationArray;
  }

  getDataInCustom(callback){

    docRef.get().then((doc) => {
      if(!doc.exists)
      return;
      console.log("custom");
      callback(durationArray, noteArray, timeArray);
    });

  }

  async asyncMidiFunction() {
    console.log("async");
    // load a midi file in the browser
    const midi = await Midi.fromUrl("../prova3.mid");
    //the file name decoded from the first track
    const name = midi.name
    //get the tracks
    midi.tracks.forEach(track => {
        //tracks have notes and controlChanges
        //notes are an array
        const notes = track.notes
        notes.forEach(note => {
            var noteToUpload = new Object();
            //note.midi, note.time, note.duration, note.name
            //this.noteArray.push(note.midi);
            console.log(note.name)
            noteToUpload.Note = note.name;
            noteToUpload.Duration = note.duration;
            noteToUpload.Time = note.time;
            melodyToUpload.push(noteToUpload);
        })
        console.log(melodyToUpload);
        docRef.set({melodyToUpload});
    })
    return;
  }
}