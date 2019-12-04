import InputMixins from "./InputMixins";

export default {
    name: "Input",
    mixins: [InputMixins],
    props: ["placeholder", "type"],
    data() {
        return {
            dummy: ""
        }
    },
    methods: {
        clear(){
            this.dummy = "";
        }
    },
}