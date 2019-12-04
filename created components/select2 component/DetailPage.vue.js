// UTILS
import helper from '~/utils/helper';

// COMPONENTS
import Swal from 'sweetalert2';
import VButton from "~/components/VButton/VButton.vue";
import NoteEditor from "~/components/NoteEditor/NoteEditor.vue";

// MIXINS
import helperMixin from '~/mixins/helperMixin';

// MODELS
import SingleRequest from '~/models/reqts/requests/SingleRequest';
import NoteType from '~/models/reqts/NoteType';
import Note from '~/models/reqts/Note';

// SERVICES
import RequestService from '~/services/reqts/RequestService';
import NoteService from '~/services/reqts/NoteService';

// SERVICES INSTANCES
const requestService = new RequestService();
const noteService = new NoteService();

export default {
  name: 'reqts-request-detail',
  components: {
    'v-button': VButton,
    NoteEditor,
  },
  mixins: [helperMixin],
  data() {
    return {
      request: new SingleRequest(),
      isPrinting: false,
      noteTypes: [],
      notesList: []
    }
  },
  watch: {
    notes(value){
      this.notesList = value ?  value : [];
    }
  },
  computed: {
    notes(){
      return this.request? this.request.requestNotes.map(rqnote => new Note({
        ...rqnote,
        typeId: rqnote.requestNoteTypeId,
        createdByName: rqnote.createdByName,
        updatedByName: rqnote.updatedByName,
      })): [];
    }
  },
  methods: {
    onAddNote(note){
      this.notesList.push(note);
    },
    removeNoteFromList(id) {
      if(id > 0) 
        this.request.requestNotes = this.request.requestNotes.filter(item => item.id != id);
      else
        this.notesList = this.notesList.filter(item => item.id != id);
    },
    updateSavedNote(id, note) {
      if(id > 0) {
        this.request.requestNotes = this.request.requestNotes.map(item => {
          if(item.id == id) return note;
  
          return item
        });
      } else 
          this.request.requestNotes.push(note);
    },
    async onDeleteNote(id){
      if(id > 0) {
        try
        {
          await noteService.delete(id);
          this.removeNoteFromList(id);
          //TODO: i18n
          Swal.fire({ type: "warning", html: "Nota Eliminada!"});
        }catch(ex) {
          throw ex;
        }
      } else {
        this.removeNoteFromList(id);
      }
    },
    async onSaveNote(note){
      try {
        var savedNote = await noteService.add(note);
        this.updateSavedNote(note.id, savedNote);    
        //TODO: i18n    
        Swal.fire({
          type: "success",
          html: "Nota agregada!"
        });
      } catch(ex) {
          throw ex;
      }
    },
    async loadNoteTypes(){
      try {
        const response = await noteService.getTypes();
        this.noteTypes = response.map(type => new NoteType(type));
      } catch(ex) {
        throw ex;
      }
    },
    async loadRequest() {
      try {
        let code = window.requestCode || '';
        this.request = await requestService.getByCode(code);
      } catch (error) {
        // TODO: Traducir este mensaje, mediante los recursos
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al tratar de recuperar la solicitud. Si el error persiste, no dude en contactarnos'
        });
      }
    },
    async printRequest() {
      this.isPrinting = true;
      let code = window.requestCode || '';
      let requestView = await requestService.print(code);

      helper.print(requestView).then(() => {
        this.isPrinting = false;
      });
    }
  },
  created() {
    this.loadRequest();
    this.loadNoteTypes();
  }
}