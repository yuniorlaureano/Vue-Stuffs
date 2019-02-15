<template>
    <table class="table table-striped table-bordered table-hover" cellspacing="0" ref="dataTable">
        <caption>
            <div class="caption-container">
                <select class="form-control" @change="onPageLengthModel" v-if="hasLengthMenu">
                    <option v-for="(item, index) in lengthMenu" :value="item" :key="index">{{ item }}</option>
                </select>
                <!--<input type="text" class="form-control" v-model="filter" style="flex: auto; margin-left: 2px; margin-right: 2px" placeholder="Filtrar" />-->
                <div class="dt-buttons btn-group">
                    <!--<a class="btn btn-default" style="cursor: pointer" @click="exportToCsv($event)" data-loading-text="<i class='fa fa-spinner fa-spin'></i>" v-if="hasCsvButton">
                        CSV
                    </a>
                    <a class="btn btn-default" style="cursor: pointer" @click="exportToPdf($event)" data-loading-text="<i class='fa fa-spinner fa-spin'></i>" v-if="hasPdfButton">
                        PDF
                    </a>
                    <a class="btn btn-default" style="cursor: pointer" @click="exportToExcel($event)" data-loading-text="<i class='fa fa-spinner fa-spin'></i>" v-if="hasExcelButton">
                        Excel
                    </a>-->
                    <a class="btn btn-default" @click="refresh">
                        Refrescar
                    </a>
                </div>
            </div>
        </caption>
        <thead>
            <tr>
                <th :class="column.classList" v-for="(column, index) in columns" :key="index">{{ column.label }}</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</template>
<script>

   import Helper from '../scripts/helper.js';  

   export default {
        props: {
            ajaxUrl: {
                type: String,
                required: true,
                validator: function (value) {
                    if (Helper.validationHelper.isEmptyString(value)) {
                        return false;
                    }

                    return true;
                }
            },
            csvUrl: {
                type: String,
                required: false
            },
            pdfUrl: {
                type: String,
                required: false
            },
            excelUrl: {
                type: String,
                required: false
            },
            filename: {
                type: String,
                default: 'Archivo'
            },
            ajaxMethod: {
                type: String,
                default: 'GET'
            },
            ajaxHeaders: {
                type: Object,
                default: function () {
                    return {
                        Authorization: `Bearer ${Cookies.get("Authorization")}`
                    };
                }
            },
            ajaxSrc: {
                type: String,
                default: 'data'
            },
            ajaxData: {
                type: [Object, Function],
                default: function () {
                    return {};
                }
            },
            length: {
                type: Number,
                default: 10,
                validator: function (value) {
                    if (Helper.validationHelper.isValidNumber(value) && value > 0) {
                        return true;
                    }

                    return false;
                }
            },
            lengthMenu: {
                type: Array,
                default: function () {
                    return [10, 20, 50, 100];
                },
                validator: function (value) {
                    if (Helper.validationHelper.isValidArray(value)) {
                        return true;
                    }

                    return false;
                }
            },
            columns: {
                type: [Object, Array, Function],
                required: true,
                validator: function (value) {
                    var columns = value;
                    if (typeof columns === 'function') {
                        columns = columns();
                    }

                    if (Helper.validationHelper.isValidArray(columns) && columns.length) {
                        return true;
                    }

                    return false;
                }
            },
            actions: {
                type: [Array, Function],
                default: function () {
                    return [];
                },
                validator: function (value) {
                    var actions = value;
                    if (typeof actions === 'function') {
                        actions = actions();
                    }

                    if (Helper.validationHelper.isValidArray(actions)) {
                        return true;
                    }

                    return false;
                }
            }
        },
        data: function () {
            return {
                dataTable: null,
                filter: '',
                filterLapsed: null
            };
        },
        watch: {
            //filter: function () {
            //    clearTimeout(this.filterLapsed);
            //    this.filterLapsed = setTimeout(() => {
            //        this.refresh();
            //    }, 500);
            //},
            length: function () {

            },
            ajaxData: {
                handler: 'refresh',
                deep: true
            },
            actions: {
                handler: function () {
                    this.initDataTable();
                },
                deep: true
            }
        },
        mounted: function () {
            this.initDataTable();
        },
        methods: {
            initDataTable: function () {
                var settings = {
                    dom: 'Bfrtip',
                    language: {
                        url: '/apps/sac/i18n/es.json'
                    },
                    destroy: true,
                    searching: false,
                    ordering: false,
                    processing: true,
                    serverSide: true,
                    responsive: true,
                    select: false,
                    paging: true,
                    pageLength: this.length,
                    ajax: {
                        url: `${mappUrls.gateway}/${this.ajaxUrl}`,
                        type: this.ajaxMethod,
                        headers: this.ajaxHeaders,
                        dataSrc: this.ajaxSrc,
                        data: (obj) => {
                            obj.FilterSearch = this.filter;
                            var ajaxData = this.ajaxData;

                            if (this.ajaxData instanceof Function) ajaxData = this.ajaxData();
                            return JSON.stringify($.extend({}, obj, ajaxData));
                        }
                    },
                    buttons: [],
                    columnDefs: [],
                    columns: []
                };

                var columns = this.columns;
                if (typeof columns === 'function') {
                    columns = columns();
                }

                columns.map((column, index) => {
                    settings.columns.push(column);

                    if (column.data) {
                        settings.columnDefs.push({
                            targets: index,
                            createdCell: (td, cellData, rowData, row, col) => {
                                var div = document.createElement('div');
                                div.className = 'cell-centered';
                                div.innerHTML = td.innerHTML;

                                td.style.height = '1px';
                                td.innerHTML = div.outerHTML;
                            }
                        });
                    }
                });

                if (this.actions || typeof this.actions === 'function') {
                    settings.columnDefs.push({
                        targets: -1,
                        createdCell: (td, cellData, rowData, row, col) => {
                            var div = document.createElement('div');
                            div.className = 'cell-centered';
                            div.innerHTML = td.innerHTML;

                            var actions = this.actions;
                            if (typeof actions === 'function') {
                                actions = actions();
                            }

                            for (var i = 0; i < actions.length; i++) {
                                let action = Object.assign({}, actions[i]);

                                let btn = document.createElement('button');
                                btn.title = action.title;
                                btn.className = action.className;
                                btn.style.cssText = action.style;
                                btn.innerHTML = action.innerHTML;

                                if (action.dataLoadingText) {
                                    btn.dataset.loadingText = action.dataLoadingText;
                                }

                                btn.onclick = function (e) {
                                    action.click(e, this, rowData);
                                };

                                div.appendChild(btn);
                            }

                            td.style.height = '1px';
                            td.appendChild(div);
                        }
                    });
                }

                if (this.dataTable !== null) {
                    this.dataTable.destroy();
                }

                this.dataTable = $(this.$refs.dataTable).DataTable(settings);
            },
            refresh: function () {
                this.dataTable.ajax.reload();
            },
            exportToCsv: function (event) {
                $(event.target).button('loading');

                let start = this.dataTable.page.info().start;
                let length = this.length;
                let search = this.filter;
                var filters = this.getFilters();

                var url = '';
                if (this.csvUrl.indexOf(mappUrls.gateway) > -1) {
                    url = this.config.csvUrl;
                } else {
                    url = `${mappUrls.gateway}/${this.csvUrl}`
                }

                var filename = this.getFileName(1);
                this.downloadFile(url, {
                    start: start,
                    length: length,
                    search: search,
                    filters: filters,
                }, filename, () => {
                    $(event.target).button('reset');
                });
            },
            exportToPdf: function (event) {
                $(event.target).button('loading');

                let start = this.dataTable.page.info().start;
                let length = this.length;
                let search = this.filter;
                var filters = this.getFilters();

                var url = '';
                if (this.pdfUrl.indexOf(mappUrls.gateway) > -1) {
                    url = this.config.pdfUrl;
                } else {
                    url = `${mappUrls.gateway}/${this.pdfUrl}`
                }

                var filename = this.getFileName(2);
                this.downloadFile(url, {
                    start: start,
                    length: length,
                    search: search,
                    filters: filters,
                }, filename, () => {
                    $(event.target).button('reset');
                });
            },
            exportToExcel: function (event) {
                $(event.target).button('loading');

                let start = this.dataTable.page.info().start;
                let length = this.length;
                let search = this.filter;
                var filters = this.getFilters();

                var url = '';
                if (this.excelUrl.indexOf(mappUrls.gateway) > -1) {
                    url = this.config.excelUrl;
                } else {
                    url = `${mappUrls.gateway}/${this.excelUrl}`
                }

                var filename = this.getFileName(3);
                this.downloadFile(url, {
                    start: start,
                    length: length,
                    search: search,
                    filters: filters,
                }, filename, () => {
                    $(event.target).button('reset');
                });
            },
            getFilters: function () {
                var ajaxData = this.ajaxData;
                if (this.ajaxData instanceof Function) ajaxData = this.ajaxData();

                if (!ajaxData || !ajaxData.filters) return '[]';

                return ajaxData.filters;
            },
            downloadFile: function (url, params, filename, callback) {
                $.ajax({
                    url: url,
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${Cookies.get("Authorization")}`
                    },
                    data: params,
                    xhr: function () {
                        var xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        return xhr;
                    },
                    success: (blob, status, xhr) => {
                        if (typeof window.navigator.msSaveBlob !== 'undefined') {
                            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                            window.navigator.msSaveBlob(blob, filename);
                            return;
                        }

                        var URL = window.URL || window.webkitURL;
                        var downloadUrl = URL.createObjectURL(blob);

                        if (!filename) {
                            window.open(downloadUrl);
                            return;
                        }

                        // use HTML5 a[download] attribute to specify filename
                        var a = document.createElement("a");

                        // safari doesn't support this yet
                        if (typeof a.download === 'undefined') {
                            window.open(downloadUrl);
                            return;
                        }

                        a.href = downloadUrl;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();

                        setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
                        callback();
                    },
                    error: err => {
                        MApp.messageBoxError('Ha ocurrido un error inesperado');
                        callback();
                    }
                });
            },
            getFileName: function (type) {
                var extension = '.csv';

                switch (type) {
                    case 1:
                        extension = '.csv';
                        break;
                    case 2:
                        extension = '.pdf';
                        break;
                    case 3:
                        extension = '.xlsx';
                        break;
                }

                var filename = this.filename || 'Archivo';
                return filename + extension;
            },
            onPageLengthModel: function (event) {
                this.dataTable.page.len(event.target.value).draw();
            },
            filterTable: function (filter) {
                this.filter = filter;
                this.refresh();
            }
        },
        computed: {
            hasCsvButton: function () {
                if (Helper.validationHelper.isEmptyString(this.csvUrl)) {
                    return false;
                }

                return true;
            },
            hasPdfButton: function () {
                if (Helper.validationHelper.isEmptyString(this.pdfUrl)) {
                    return false;
                }

                return true;
            },
            hasExcelButton: function () {
                if (Helper.validationHelper.isEmptyString(this.excelUrl)) {
                    return false;
                }

                return true;
            },
            hasLengthMenu: function () {
                if (!this.lengthMenu.length) {
                    return false;
                }

                return true;
            }
        },
        destroyed: function(){

            if(this.dataTable != null){

                this.dataTable.destroy();
            }
        }
   }
</script>