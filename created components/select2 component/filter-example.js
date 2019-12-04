
import Input from "~/components/Input/Input.vue";
import Select from "~/components/Input/Select.vue";
import Multiselect from "~/components/Input/Multiselect.vue";
import FlatPickr from "~/components/Input/FlatPickr.vue";
import FlatPickrRange from "~/components/Input/FlatPickrRange.vue";
import InputRange from "~/components/Input/InputRange.vue";
import mixins from "~/mixins/helperMixin";
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
    mixins: [mixins],
    data(){
        return {
            schema: [
                {
                    element: types.INPUT_RANGE,
                    placeholderFrom: "From",
                    placeholderTo: "To",
                    type: "number",
                    label: "AgeRage",
                    name: "ageRage",
                    dataType: datatypes.INT,
                    fieldName: "",
                    inputclasses: {
                        "form-control": true,
                        "col-sm-6": true
                        },
                        inputgrandparentclasses: {
                            "form-group": true,
                            row: true
                        },
                        inputparentclasses: {
                            "col-sm-10": true
                            },
                        inputlabelclasses: {
                            "col-form-label": true,
                            "col-sm-2": true
                        },
                },
                {
                    element: types.INPUT_DATE_RANGE,
                    placeholderFrom: "From",
                    placeholderTo: "To",
                    label: "DateOfEngage",
                    name: "dateOfEngage",
                    config: {
                        ...mixins.data().dateOptions
                    },
                    dataType: datatypes.INT,
                    fieldName: "",
                    inputclasses: {
                        "form-control": true,
                        "col-sm-6": true
                        },
                        inputgrandparentclasses: {
                            "form-group": true,
                            row: true
                        },
                        inputparentclasses: {
                            "col-sm-10": true
                            },
                        inputlabelclasses: {
                            "col-form-label": true,
                            "col-sm-2": true
                        },
                },
                {
                    element: types.INPUT_DATE,
                    placeholder: "DateOfBirth",
                    label: "DateOfBirth",
                    name: "dateofbirth",
                    config: {
                        ...mixins.data().dateOptions
                    },
                    dataType: datatypes.INT,
                    fieldName: "",
                    inputclasses: {
                        "form-control": true,
                        "col-sm-6": true
                        },
                        inputgrandparentclasses: {
                            "form-group": true,
                            row: true
                        },
                        inputparentclasses: {
                            "col-sm-10": true
                            },
                        inputlabelclasses: {
                            "col-form-label": true,
                            "col-sm-2": true
                        },
                },
                {
                    element: types.MULTI_SELECT,
                    name: "lenguaje",
                    label: "Lenguaje",
                    trackby: "id", 
                    caption: "value", 
                    multiple: false,
                    ajax: {
                        url: "https://jsonplaceholder.typicode.com/todos/1/comments",
                        method: "GET",
                        headers: {                            
                        },
                        func: (data) => data ? data.map(item => ({id: item.id, value: item.email})) : [] 
                    },
                    options: [
                        {id: 1, value: "C#"},
                        {id: 2, value: "C++"},
                        {id: 3, value: "JAVA"}
                    ],
                    dataType: datatypes.INT,
                    fieldName: "",
                    inputclasses: {
                        },
                        inputgrandparentclasses: {
                            "form-group": true,
                            row: true
                          },
                        inputparentclasses: {
                              "col-sm-10": true
                            },
                        inputlabelclasses: {
                            "col-form-label": true,
                            "col-sm-2": true
                          },
                },
                {
                    element: types.MULTI_SELECT,
                    name: "religion",
                    label: "Religion",
                    trackby: "id", 
                    caption: "value", 
                    multiple: true,
                    ajax: {
                        url: "https://jsonplaceholder.typicode.com/todos",
                        method: "GET",
                        headers: {                            
                        },
                        func: (data) => data ? data.map(item => ({id: item.id, value: item.title})) : [] 
                    },
                    options: [
                        {id: 1, value: "Dominicano"},
                        {id: 2, value: "Haitiano"},
                        {id: 3, value: "Chino"}
                    ],
                    dataType: datatypes.INT,
                    fieldName: "",
                    inputclasses: {
                        },
                        inputgrandparentclasses: {
                            "form-group": true,
                            row: true
                          },
                        inputparentclasses: {
                              "col-sm-10": true
                            },
                        inputlabelclasses: {
                            "col-form-label": true,
                            "col-sm-2": true
                          },
                },
                {
                  element: types.SELECT,
                  name: "title",
                  label: "Title",
                  options: [
                      {id: 1, value: "Abierto"},
                      {id: 2, value: "Cerrado"},
                      {id: 3, value: "En Proceso"}
                  ],
                  dataType: datatypes.INT,
                  fieldName: "",
                  inputclasses: {
                      "form-control": true,
                    },
                    inputgrandparentclasses: {
                        "form-group": true,
                        row: true
                      },
                    inputparentclasses: {
                          "col-sm-10": true
                        },
                    inputlabelclasses: {
                        "col-form-label": true,
                        "col-sm-2": true
                      },
                },
                {
                  element: types.INPUT,
                  type: "text",
                  name: "firstName",
                  label: "First Name",
                  placeholder: "First Name",
                  dataType: datatypes.INT,
                  fieldName: "",
                  inputclasses: {
                      "form-control": true,
                      "col-sm-6": true
                    },
                    inputgrandparentclasses: {
                        "form-group": true,
                        row: true
                      },
                    inputparentclasses: {
                          "col-sm-10": true
                        },
                    inputlabelclasses: {
                        "col-form-label": true,
                        "col-sm-2": true
                      },
                },
                {
                  element: types.INPUT,
                  type: "text",
                  placeholder: "Last Name",
                  label: "Last Name",
                  name: "lastName",
                  dataType: datatypes.INT,
                  fieldName: "",
                  inputclasses: {
                      "form-control": true,
                      "col-sm-6": true
                    },
                    inputgrandparentclasses: {
                        "form-group": true,
                        row: true
                      },
                    inputparentclasses: {
                          "col-sm-10": true
                        },
                    inputlabelclasses: {
                        "col-form-label": true,
                        "col-sm-2": true
                      },
                },
                {
                  element: types.INPUT,
                  type: "number",
                  placeholder: "Age",
                  name: "age",
                  label: "Age",  
                  dataType: datatypes.INT,
                  fieldName: "",                
                  inputclasses: {
                      "form-control": true,
                    },
                    inputgrandparentclasses: {
                        "form-group": true,
                        row: true
                      },
                    inputparentclasses: {
                          "col-sm-6": true
                        },
                    inputlabelclasses: {
                        "col-form-label": true,
                        "col-sm-2": true
                      },
                }
              ],
              schemaVales: {
                title: "",
                firstName: "",
                lastName: "",
                age: "",
                religion: "",
                lenguaje: "",
                dateofbirth: "",
                dateOfEngage: "",
                ageRage: ""
              }
        };
    },
    methods: {
        search(){
            const filter = this.getFilter();
            console.log(filter);
            this.$emit("filter", filter);
        },
        clear(){
            const keys = Object.keys(this.schemaVales);
            for(let i = 0; i < keys.length; i++){
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
                        value: this.schemaVales[item.name]
                    });
                    break;
                    case types.SELECT: filterData.push({
                        dataType: item.dataType,
                        fieldName: item.fieldName,
                        operation: item.multiple?  conditions.CONTAINS : conditions.EQUAL_TO,
                        value: typeof this.schemaVales[item.name] == "object" ? [...this.schemaVales[item.name]] : this.schemaVales[item.name],
                    });
                    break;
                    case types.MULTI_SELECT: filterData.push({
                        dataType: item.dataType,
                        fieldName: item.fieldName,
                        operation: item.multiple?  conditions.CONTAINS : conditions.EQUAL_TO,
                        value: typeof this.schemaVales[item.name] == "object" ? [...this.schemaVales[item.name]] : this.schemaVales[item.name]
                    });
                    break;
                    case types.INPUT_DATE: filterData.push({
                        dataType: item.dataType,
                        fieldName: item.fieldName,
                        operation: conditions.EQUAL_TO,
                        value: this.schemaVales[item.name]
                    });
                    break;
                    case types.INPUT_DATE_RANGE: filterData = filterData.concat(
                        [{
                            dataType: item.dataType,
                            fieldName: item.fieldName,
                            operation: conditions.GREATER_THAN_OR_EQUAL_TO,
                            value: this.schemaVales[item.name].from
                         },
                         {
                            dataType: item.dataType,
                            fieldName: item.fieldName,
                            operation: conditions.LESS_THAN,
                            value: this.schemaVales[item.name].to //add one day to this.
                          }
                        ]);
                    break;
                    case types.INPUT_RANGE: filterData = filterData.concat(
                        [{
                            dataType: item.dataType,
                            fieldName: item.fieldName,
                            operation: conditions.GREATER_THAN_OR_EQUAL_TO,
                            value: this.schemaVales[item.name].from
                         },
                         {
                            dataType: item.dataType,
                            fieldName: item.fieldName,
                            operation: conditions.LESS_THAN_OR_EQUAL_TO,
                            value: this.schemaVales[item.name].to
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
                    if(!this.schemaVales[item.name]) return false;                
                break;
                case types.SELECT:
                {
                    if(item.multiple) 
                    {
                        if(!this.schemaVales[item.name] || this.schemaVales[item.name].length == 0){
                            return false
                        }
                    }
                    else {
                        if(!this.schemaVales[item.name]) return false;
                    }
                }
                break;
                case types.MULTI_SELECT: 
                {
                    if(this.schemaVales[item.name]) 
                    {
                        if(!this.schemaVales[item.name] || this.schemaVales[item.name].length == 0){
                            return false
                        }
                    }
                    else {
                        if(!this.schemaVales[item.name]) return false;
                    }
                }
                break;
                case types.INPUT_DATE: 
                    if(!this.schemaVales[item.name]) return false;
                break;
                case types.INPUT_DATE_RANGE: 
                    if(!this.schemaVales[item.name].from || !this.schemaVales[item.name].to) return false;
                break;
                case types.INPUT_RANGE: 
                    if(!this.schemaVales[item.name].from || !this.schemaVales[item.name].to) return false;
                break;     
                default: return false;               
            }
            return true;
        }
    },
}