//select2 implementation
Vue.component('select-2', {
    template: '<select v-bind:name="name" v-bind:selectelement="selectelement" class="form-control" v-bind:multiple="multiple"></select>',
    props: {
        name: '',
        options: {},
        value: null,
        multiple: false,
        selectelement: ''
    },
    data: function () {
        return {
            select2data: []
        }
    },
    mounted() {
        this.formatOptions();
        let vm = this;
        let select = $(this.$el);
        select.select2({
            placeholder: 'Select',
            theme: 'bootstrap',
            width: '100%',
            allowClear: true,
            data: this.select2data
        }).on('change', function () {

            vm.$emit('input', select.val());
        });
        select.val(this.value).trigger('change');
    },
    methods: {
        formatOptions() {

            //this.select2data.push({ id: '', text: 'Select' });
            for (let key in this.options) {
                this.select2data.push({ id: this.options[key].id, text: this.options[key].description })
            }
        },
        setSelectedValues(values) {
            let select = $(this.$el);
            select.val(values).trigger('change');
        },
        clearValues() {
            let select = $(this.$el);
            select.val(null).trigger('change');
        }
    },
    destroyed: function () {
        $(this.$el).off().select2('destroy');
    }
});


//The parent of the select2
var multiSelect = Vue.component('multiple-select', {
    data: function () {
        return {
            selected: [],
            parametric: []
        }
    },
    mounted: function () {
        CaseModule.getParametricList((response) => {
            CaseModule.summarizeParatricList(response);
            this.parametric = CaseModule.getSummarizedParametricList();
        });
    },
    methods: {
        getSelectedValues: function () {
            var array = [];
            var keys = Object.keys(this.selected);

            for (var i = 0; i < keys.length; i++) {
                array = array.concat(this.selected[keys[i]]);
            }

            return array;
        },
        getOptions: function (selectelement) {
            return this.$el.querySelector(selectelement).__vue__.options;
        },
        setValues: function (selectelement, values) {
            this.$el.querySelector(selectelement).__vue__.setSelectedValues(values);
        },
        clearSelect: function (selectelement) {

            this.$el.querySelector(selectelement).__vue__.clearValues();
        }
    }
});