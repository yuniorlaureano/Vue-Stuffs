
import InputMixins from "./InputMixins";

export default {
    name: "Select",
    mixins: [InputMixins],
    props: ["multiple", "options"],
    data() {
        return {
            dummy: null
        }
    },
    mounted() {
        this.ajaxData();
    },
    methods: {
        clear(){
            if(this.multiple)
                this.dummy = [];
            else
                this.dummy = "";
        }
    },
}