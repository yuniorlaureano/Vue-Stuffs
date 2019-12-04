import InputMixins from "./InputMixins";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
    name: "FlatPicker",
    mixins: [InputMixins],
    props: ["placeholder", "config"],
    components:{
        flatPickr
    },
    data() {
        return {
            dummy: null
        }
    },
    mounted() {
        this.onInput();
    },
    methods: {
        clear(){
            this.dummy = "";
        },
        onInput(){
            let dummy = this.dummy ? this.dummy.split("T")[0] : this.dummy;
            this.$emit("input", dummy);
        },
    },
}