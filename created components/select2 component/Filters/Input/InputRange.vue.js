import InputMixins from "./InputMixins";

export default {
    name: "InputRange",
    mixins: [InputMixins],
    props: ["placeholderFrom","placeholderTo", "type"],
    data() {
        return {
            dummyFrom: null,
            dummyTo: null
        }
    },
    methods: {
        onInput(){
            this.$emit("input", {from: this.dummyFrom, to:this.dummyTo});
        },
        clear(){
            this.dummyFrom = null;
            this.dummyTo = null;
        }
    },
}