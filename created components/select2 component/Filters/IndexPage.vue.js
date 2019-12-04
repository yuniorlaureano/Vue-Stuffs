import VDataTable from "~/components/VDataTable/VDataTable.vue";
import helper from '~/utils/helper';
import Filter from "~/components/Filter/Filter.vue";
import * as types from "~/components/Input/InputTypes";
import * as datatypes from "~/components/Filter/datatypes";
import mixins from "~/mixins/helperMixin";


const translations = helper.getTranslations(window.resources.labels, {
  'requests.createdAt': 'Fecha de Solicitud',
  'requests.requestNo': 'No. Solicitud',
  'requests.requestType': 'Tipo de Solicitud',
  'requests.status': 'Estado',
  'requests.organism': 'Organismo',
  'requests.importer': 'Importador',
  'requests.productsCount': 'Cantidad de Productos',
  'requests.shippingDocumentNo': 'No. Documento de Embarque',
  'actions': 'Acciones',
  'details': 'Detalles'
}); 

export default {
  name: "reqts-requests-index",
  components: {
    "v-datatable": VDataTable,
    "filter-container": Filter
  },
  data() {
    return {
      dataTableConfig: {
        ajaxUrl: "/datatables/reqts/requests",
        excelUrl: "",
        filename: "Requests",
        ajaxData:{
          filters: "[]"
        },
        columns: [{
            data: "creationDate",
            label: translations['requests.createdAt'],
            classList: {
              "text-center": true
            },
            render: function (data) {
              return helper.formatDate(data);
            }
          },
          {
            data: "code",
            label: translations['requests.requestNo'],
            classList: {
              "text-center": true
            }
          },
          {
            data: "requestType",
            label: translations['requests.requestType'],
            classList: {
              "text-center": true
            }
          },
          {
            data: 'status',
            label: translations['requests.status'],
            classList: {
              "text-center": true
            }
          },
          {
            data: "organismName",
            label: translations['requests.organism'],
            classList: {
              "text-center": true
            }
          },
          {
            data: "importerName",
            label: translations['requests.importer'],
            classList: {
              "text-center": true
            }
          },
          {
            data: "productsCount",
            label: translations['requests.productsCount'],
            classList: {
              "text-center": true
            }
          },
          {
            data: "shippingDocumentNumber",
            label: translations['requests.shippingDocumentNo'],
            classList: {
              "text-center": true
            }
          },
          {
            data: null,
            label: translations['actions'],
            defaultContent: "",
            classList: {
              "text-center": true
            },
            actions: [{
              title: translations['details'],
              className: "btn btn-primary btn-sm",
              style: "margin-left: 2px",
              innerHTML: '<i class="fa fa-book-open"></i>',
              href: (item) => `/reqts/requests/detail/${item.code}`
            }]
          }
        ]
      },
      showFilterModal: false,
      schema: [
        {
            element: types.INPUT_RANGE,
            placeholderFrom: "Desde",
            placeholderTo: "Hasta",
            type: "number",
            label: "Cantidad de Productos",
            name: "productsCount",
            dataType: datatypes.SHORT,
            fieldName: "ProductsCount",
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
            placeholderFrom: "Desde",
            placeholderTo: "Hasta",
            label: "Fecha de Solicitud",
            name: "createdAt",
            config: {
                ...mixins.data().dateOptions
            },
            dataType: datatypes.DATETIME,
            fieldName: "CreatedAt",
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
        }
      ],
      schemaValues: {
        productsCount: "",
        createdAt: ""
      }
    }
  },
  methods: {
    onFilter(data){
      this.dataTableConfig.ajaxData = {
         ...this.dataTableConfig.ajaxData, 
         filters: JSON.stringify(data)
      };
    }
  },
};