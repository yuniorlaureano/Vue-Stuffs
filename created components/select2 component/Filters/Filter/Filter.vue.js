
import Input from "~/components/Input/Input.vue";
import Select from "~/components/Input/Select.vue";
import Multiselect from "~/components/Input/Multiselect.vue";
import FlatPickr from "~/components/Input/FlatPickr.vue";
import FlatPickrRange from "~/components/Input/FlatPickrRange.vue";
import InputRange from "~/components/Input/InputRange.vue";
import * as types from "~/components/Input/InputTypes";
import * as datatypes from "~/components/Filter/datatypes";
import * as conditions from "~/components/Filter/conditions";

export default {
    name: "FilterContainer",
    components:{
        Input,
        Select,
        Multiselect,
        FlatPickr,
        FlatPickrRange,
        InputRange
    },
    props:{
        schema: {
            type: Array,
            required: true
        },
        schemaValues:{
            type: Object,
            required: true
        }
    },
    methods: {
        search(){
            const filter = this.getFilter();
            this.$emit("onFilter", filter);
        },
        clear(){
            const keys = Object.keys(this.schemaValues);
            for(let i = 0; i < keys.length; i++){
                this.schemaValues[keys[i]] = "";
                if(this.$refs[keys[i]][0].clear) {
                    this.$refs[keys[i]][0].clear();
                }
            }
        },
        getFilter(){
            let filterData = [];

            for(let i = 0; i < this.schema.length; i++){
                
                const item = this.schema[i];

                if(!this.validateFilter(item)) continue;
                
                switch(item.element){
                    case types.INPUT: 
                    filterData.push({
                        dataType: item.dataType,
                        fieldName: item.fieldName,
                        operation: item.dataType == datatypes.STRING ? conditions.CONTAINS : conditions.EQUAL_TO,
                        value: this.schemaValues[item.name]
                    });
                    break;
                    case types.SELECT: filterData.push({
                        dataType: item.dataType,
                        fieldName: item.fieldName,
                        operation: item.multiple?  conditions.CONTAINS : conditions.EQUAL_TO,
                        value: typeof this.schemaValues[item.name] == "object" ? [...this.schemaValues[item.name]] : this.schemaValues[item.name],
                    });
                    break;
                    case types.MULTI_SELECT: filterData.push({
                        dataType: item.dataType,
                        fieldName: item.fieldName,
                        operation: item.multiple?  conditions.CONTAINS : conditions.EQUAL_TO,
                        value: typeof this.schemaValues[item.name] == "object" ? [...this.schemaValues[item.name]] : this.schemaValues[item.name]
                    });
                    break;
                    case types.INPUT_DATE: filterData.push({
                        dataType: item.dataType,
                        fieldName: item.fieldName,
                        operation: conditions.EQUAL_TO,
                        value: this.schemaValues[item.name]
                    });
                    break;
                    case types.INPUT_DATE_RANGE: filterData = filterData.concat(
                        [{
                            dataType: item.dataType,
                            fieldName: item.fieldName,
                            operation: conditions.GREATER_THAN_OR_EQUAL_TO,
                            value: this.schemaValues[item.name].from
                         },
                         {
                            dataType: item.dataType,
                            fieldName: item.fieldName,
                            operation: conditions.LESS_THAN,
                            value: this.schemaValues[item.name].to
                          }
                        ]);
                    break;
                    case types.INPUT_RANGE: filterData = filterData.concat(
                        [{
                            dataType: item.dataType,
                            fieldName: item.fieldName,
                            operation: conditions.GREATER_THAN_OR_EQUAL_TO,
                            value: this.schemaValues[item.name].from
                         },
                         {
                            dataType: item.dataType,
                            fieldName: item.fieldName,
                            operation: conditions.LESS_THAN_OR_EQUAL_TO,
                            value: this.schemaValues[item.name].to
                          }
                        ]);
                    break;                    
                }
            }

            return filterData;
        },
        validateFilter(item){
            switch(item.element){
                case types.INPUT: 
                    if(!this.schemaValues[item.name]) return false;                
                break;
                case types.SELECT:
                {
                    if(item.multiple) 
                    {
                        if(!this.schemaValues[item.name] || !this.schemaValues[item.name].length){
                            return false
                        }
                    }
                    else {
                        if(!this.schemaValues[item.name]) return false;
                    }
                }
                break;
                case types.MULTI_SELECT: 
                {
                    if(this.schemaValues[item.name]) 
                    {
                        if(!this.schemaValues[item.name] || !this.schemaValues[item.name].length){
                            return false
                        }
                    }
                    else {
                        if(!this.schemaValues[item.name]) return false;
                    }
                }
                break;
                case types.INPUT_DATE: 
                    if(!this.schemaValues[item.name]) return false;
                break;
                case types.INPUT_DATE_RANGE: 
                    if(!this.schemaValues[item.name].from || !this.schemaValues[item.name].to) return false;
                break;
                case types.INPUT_RANGE: 
                    if(!this.schemaValues[item.name].from || !this.schemaValues[item.name].to) return false;
                break;     
                default: return false;               
            }
            return true;
        }
    },
}