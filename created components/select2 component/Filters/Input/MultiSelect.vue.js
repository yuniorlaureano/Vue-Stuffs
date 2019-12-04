import VueMultiselect from 'vue-multiselect'
import InputMixins from "./InputMixins";

export default {
    name: "VueMultiSelect",
    data(){
        return {
            dummy: null
        };
    },
    mixins: [InputMixins],
    components:{
        VueMultiselect
    },
    props: ["multiple", "options", "caption", "trackby"],
    mounted() {
        this.ajaxData();
    },
    methods: {
        onInput(val){
            if(val){
                if(val.length){
                    return this.$emit("input", val.map(v => v.id));
                } else { 
                    return this.$emit("input", val.id);
                }
            }

            return this.$emit("input", null);
        },
        clear(){
            if(this.multiple)
                this.dummy = [];
            else
                this.dummy = null;
        }
    },
}