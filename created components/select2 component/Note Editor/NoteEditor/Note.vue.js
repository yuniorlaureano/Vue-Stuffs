//mixins
import helperMixin from "~/mixins/helperMixin";

export default {
  name: 'Note',
  props:['text','noteId','typeId', 'createdAt', 'createdByName', 'updatedAt','updatedByName'],
  methods: {
    onDelete(){
      this.$emit('onDelete', this.noteId);
    },
    onSave(){
      this.$emit("onSave", {
        id: this.noteId,
        text: this.$el.querySelector("p.editor-text").innerHTML.trim(),
        typeId: this.typeId
      });
    }
  },
  mixins:[helperMixin],
  computed: {
    createdDate: function(){ return this.createdAt ? this.createdAt : "" },
    updatedDate: function(){ return this.updatedAt ? this.updatedAt : "" }
  }
}