import axios from "axios";
import vuceApi from '~/utils/vuceApi';

export default {
    props: ["label","inputgrandparentclasses", "name", "inputclasses", "inputparentclasses","inputlabelclasses", "ajax"],
    data(){
        return {            
            optionsModel: []
        };
    },
    methods: {
        ajaxData(){
            if(this.ajax)
            {
                if(this.ajax.method = 'GET')
                    vuceApi.get(this.ajax.url).then(resp => this.optionsModel = this.ajax.func(resp));
                else 
                    vuceApi.get(this.ajax.url).then(resp => this.optionsModel = this.ajax.func(resp));
            } else {
                this.optionsModel = this.options;
            }
        }
    },
}