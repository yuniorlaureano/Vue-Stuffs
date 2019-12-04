
import Note from "~/components/NoteEditor/Note.vue";
import VModal from "~/components/VModal/VModal.vue";
import NoteModel from '~/models/reqts/Note';
import Swal from "sweetalert2";
import  helper from "~/utils/helper";

export default {
  name: 'NoteEditor',
  components:{
    Note,
    ConfirmDeleteModal: VModal
  },
  props:['requestId', 'typeId', 'notes'],
  data() {
    return {
        isShowConfirmDelete: false,
        deletedNote: 0,
        lastAddedId: 1
    }
  },
  methods: {
    addNote(){
        this.$emit("onAddNote", new NoteModel({
            id: this.notes ? this.notes.length * -1 : -1,
            typeId: this.typeId,
            requestId: this.requestId
        }));
    },
    onDelete(id){
        this.isShowConfirmDelete = true;
        this.deletedNote = id;
    },
    onSave(data){
        const note = new NoteModel({
            ...data,
            requestId: this.requestId,
            typeId: this.typeId
        });

        const errors = note.validate();

        if (errors.length) {
            return Swal.fire({
                type: "error",
                html: helper.arrayStringToHtmlList(errors)
            });
        }

        this.$emit('onSave', note);
    },
    confirmDelete(){
        this.isShowConfirmDelete = false;
        this.$emit('onDelete', this.deletedNote);
        this.deletedNote = 0;
    },
    cancelDeleteNote(){
        this.isShowConfirmDelete = false;
        this.deletedNote = 0;
    }
  }
}