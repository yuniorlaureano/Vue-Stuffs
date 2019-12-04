import InputMixins from "./InputMixins";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import moment from "moment";

export default {
    name: "FlatPickerRange",
    mixins: [InputMixins],
    props: ["placeholderFrom","placeholderTo", "config"],
    components:{
        flatPickr
    },
    data() {
        return {
            dummyFrom: null,
            dummyTo: null
        }
    },
    mounted() {
        this.onInput();
    },
    methods: {
        onInput(){
            let _to = this.dummyTo ? moment(new Date(this.dummyTo), this.config).add(1, 'days').format(): this.dummyTo;
            _to = _to ? _to.split("T")[0] : _to;
            let _from = this.dummyFrom ? this.dummyFrom.split("T")[0] : this.dummyFrom;

            this.$emit("input", { from: _from, to: _to });
        },
        clear(){
            this.dummyFrom = null;
            this.dummyTo = null;
        }
    },
}