<template>
    <Vtable :ajax-url="dataTableConfig.ajaxUrl"
                 :csv-url="dataTableConfig.csvUrl"
                 :pdf-url="dataTableConfig.pdfUrl"
                 :excel-url="dataTableConfig.excelUrl"
                 :filename="dataTableConfig.filename"
                 :ajax-method="dataTableConfig.ajaxMethod"
                 :ajax-data="dataTableConfig.ajaxData"
                 :columns="dataTableConfig.columns"
                 :actions="dataTableConfig.actions"
                 :ajax-headers="dataTableConfig.ajaxHeaders"
                 ref="casetable" />
</template>
<script>

    import Vtable from './Vtable';
    import { ApplicationModule, CaseModule } from '../scripts/modules.js';

    export default {
        components: {
            Vtable: Vtable
        },
        data: function () {
            return {
                dataTableConfig: {
                    ajaxUrl: 'sysintelcustoms/gia/cases',
                    csvUrl: '/sac/employees/exportToCsv',
                    pdfUrl: '/sac/employees/exportToPdf',
                    excelUrl: '/sac/employees/exportToExcel',
                    filename: 'Colaboradores',
                    ajaxMethod: 'POST',
                    ajaxHeaders: {
                        'Authorization': 'Bearer ' + MApp.getCookie('Authorization'),
                        'Url': mappUrls.gateway + "/casesystem/case/paged",
                        'UserUrl': mappUrls.gateway + "/core/security/applications/" + ApplicationModule.getAcronym() + "/childusers",
                        'AppAcronyms': ApplicationModule.getAcronym(),
                        'Content-Type': 'application/json'
                    },
                    ajaxData: function (object) {
                        return object
                    },
                    columns: [
                        {
                            data: "code", "render": function (data, type, row, meta) {
                                return row.appAcronymOrigin + '-' + data;
                            },
                            label: "Código",
                            //classList: {'text-center': true},

                        },
                        { "data": "title", label: "Título" },
                        { "data": "gia.objectNo", label: "Declaración" },
                        {
                            "data": "inputDate", render: function (data, type, row) {
                                return (new Date(data)).toLocaleString();
                            },
                            label: "Fecha"
                        },
                        { "data": "asignedName", label: "Responsable" },
                        { "data": "inputByName", label: "Creado Por" },
                        { "data": "statusName", className: "app-status", label: "Estado" },
                        { "data": "isInternalString", label: "Interno" },
                        { "data": "appAcronym", label: "Aplicación Actual" },
                        {
                            data: null,
                            defaultContent: '',
                            label: 'Acciones'
                        }
                    ],
                    actions: [
                        {
                            title: 'Resultado',
                            className: 'btn btn-info btn-xs',
                            //style: 'margin-left: 2px',
                            innerHTML: '<i class="glyphicon glyphicon-ok-circle"></i>',
                            //dataLoadingText: '<i class="fa fa-spinner fa-spin"></i>',
                            click: this.onViewResult 
                        },
                        {
                            title: 'Editar',
                            className: 'btn btn-warning btn-xs',
                            innerHTML: '<i class="glyphicon glyphicon-edit"></i>',
                            click: this.onEdit
                        },
                        {
                            title: 'Cambiar Estado',
                            className: 'btn btn-info btn-xs',
                            innerHTML: '<i class="glyphicon glyphicon-refresh"></i>',
                            click: this.onChangeStatus
                        },
                        {
                            title: 'Documento',
                            className: 'btn btn-default btn-xs',
                            innerHTML: '<i class="glyphicon glyphicon-list-alt"></i>',
                            click: this.onShowDeclaration
                        },
                        {
                            title: 'Cambiar Aplicación',
                            className: 'btn btn-default btn-xs',
                            innerHTML: '<i class="glyphicon glyphicon-random"></i>',
                            click: this.onChangeApp
                        }
                    ],
                }
            };
        },
        methods: {
            onViewResult: function (e, el, item) {
                this.$emit("onViewResult", {
                    caseId: item.id,
                    riskId: item.gia.id,
                    objectNo: item.gia.objectNo,
                    statusId: item.caseStatusAppId
                });
            },
            onEdit: function (e, el, item) {
                this.$emit("onEdit", {
                    caseId: item.id,
                    riskId: item.gia.id,
                    objectNo: item.gia.objectNo,
                    assignedTo: item.asignedTo
                });
            },
            onChangeStatus: function (e, el, item) {
                this.$emit("onChangeStatus", {
                    caseId: item.id,
                    statusId: item.caseStatusAppId
                });
            },
            onShowDeclaration: function (e, el, item) {
                this.$emit("onShowDeclaration", {
                    objectNo: item.gia.objectNo
                });
            },
            onChangeApp: function (e, el, item) {
                this.$emit("onChangeApp", {
                    caseId: item.id,
                    statusId: item.caseStatusAppId,
                    statusName: item.statusName,
                    asignedName: item.asignedName
                });
            }
        }
   }
</script>