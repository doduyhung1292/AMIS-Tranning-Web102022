<template>
    <div class="main">
        <div class="main-header">
            <div class="main-header__left">
                <div class="main-header__name">{{this.theMainContent.mainContentHeader.title}}</div>
            </div>
            <div class="main-header__right">
                <button class="btn__add-new" v-on:click="showModalEdit(this.tempEmployeeModeAddNew, 'AddNew')">{{this.theMainContent.mainContentHeader.btnAddNewEmployee}}</button>
            </div>
        </div>
        <div class="main-content-toolbar">
            <div class="execute-delete">
                <div class="number-selected"  v-if="this.employeeToDelete">{{this.theMainContent.mainContentHeader.selected}} <span>{{this.employeeToDelete}}</span></div>
                <div  v-if="this.employeeToDelete != 0">
                    <button class="btn-unselect" v-on:click="unselectAll">
                        {{this.theMainContent.mainContentHeader.unselect}}
                    </button>
                </div>
                <div  v-if="this.employeeToDelete">
                    <button class="btn-mass-delete" v-on:click="executeDelete">
                        {{this.theMainContent.mainContentHeader.delete}} {{this.employeeToDelete}} {{this.theMainContent.mainContentHeader.record}}
                    </button>
                </div>
            </div>
            <div class="display-inline toolbar-right">
                <input type="text" class="input-search" :placeholder="this.theMainContent.mainContentHeader.placeholderSearch"  
                            v-on:focusin="inputSearchFocus"
                            v-on:select="inputSearchFocus" 
                            v-on:focusout="inputSearchFocusOut"
                            v-on:mouseenter="inputSearchHover"
                            v-on:mouseleave="inputSearchUnhover"
                            v-model="this.inputSearchEmployee"
                            v-on:keydown.enter="this.searchEmployee">
                <div class="icon-search" 
                            :class="isSearchButtonFocus, isSearchButtonHover" 
                            v-on:click="this.searchEmployee"></div>
                <div class="icon-reload" :title="this.theMainContent.mainContentHeader.titleButtonReload" v-on:click="reloadPage"></div>
                <div class="icon-excel" :title="this.theMainContent.mainContentHeader.titleButtonExportExcel" v-on:click="exportExcel"></div>
            </div>
        </div>
        <div class="main-content">
            <TableEmployees v-on:showModal="showModalEdit" 
                            v-on:showToastDeleteSuccess="showToastDeleteSuccess"
                            v-on:showToastMassDeleteSuccess = "showToastMassDeleteSuccess"
                            v-on:getEmployeeLength="getEmployeeLength"
                            v-on:updateTotalRowOnTable="updateTotalRowOnTable"
                            v-on:changeStateEmployeeDelete="this.changeStateEmployeeDelete"
                            :numberPerPage = "this.numberPerPage"
                            :rowStart = "this.rowStart"
                            :newEmployee = "this.newEmployee"
                            :modifyEmployee = "this.modifyEmployee"                            
                            :informationSearchEmployee = "this.informationSearchEmployee"
                            :isExecuteDelete = "this.isExecuteDelete"
                            :isUnselectAll = "this.isUnselectAll"
                            :tempEmployeeModeModify = "this.tempEmployeeModeModify"
                            :employeeSaved="this.employeeSaved"
                            v-on:setExecuteDeleteToFalse = "this.setExecuteDeleteToFalse"
                            v-on:unselectAllToFalse = "this.unselectAllToFalse"/>
            <div class="container-footer">
                <div class="main-paging-left content-footer--right">{{this.theMainContent.mainContentPaging.total}}&nbsp : &nbsp<span class="footer__number-employee">{{this.numberEmployee}}</span></div>
                    <div class="main-paging-right">
                        <div class="select-paging">
                            <div class="content-footer--right">{{this.theMainContent.mainContentPaging.recordPerPage}}</div>
                            <select v-model="this.numberPerPage">
                                <option v-for="(number, index) in this.theMainContent.mainContentPaging.numberPerPage" :key="index">{{number}}</option>
                            </select>
                        </div>
                        <div class="number-paging">
                            <div class="content-footer--right numberRecords">{{this.rowStart}} - {{this.rowEnd}} {{this.theMainContent.mainContentPaging.record}}</div>
                            <button class="icon-next" v-on:click="changePage(this.rowStart - Number(this.numberPerPage))"></button>
                            <button class="icon-previous" v-on:click="changePage(this.rowStart + Number(this.numberPerPage))"></button>
                        </div>
                    </div>
            </div>
        </div>
        
        </div>
        <DialogEmployees 
                    v-if="this.isModalVisible == true"
                    v-on:closeUnCheck="closeModalUnCheck"
                    v-on:closeCheck="closeModalCheck"
                    v-on:showToastSaveSuccess="showToastSaveSuccess"
                    v-on:showToastModifySuccess="showToastModifySuccess"
                    v-on:clickStore="this.clickStore"
                    v-on:updateTotalRowWhenAddNewSuccess="updateTotalRowWhenAddNewSuccess"
                    :employeeEdit="this.employeeEdit"
                    :mode="this.mode"
                />
        <ToastNotice v-if="isToastSuccessVisible" 
                    v-on:closeToast="this.closeToast"
                    :contentToastSuccess="this.contentToastSuccess"/>
        <DialogConfirmStore  v-if="this.isShowModalConfirmStore" 
                            v-on:cancelDialogConfirmStore="this.hideDialogConfirmStore"
                            v-on:clickNoStore="this.clickNoStore"
                            v-on:clickStore="this.clickStore"/>
</template>

<script>
    import axios from "axios"
    import TableEmployees from "../../ui/employee/TableEmployees.vue"
    import ToastNotice from "../../ui/toast/ToastNotice.vue"
    import DialogEmployees from "../../ui/employee/DialogEmployees.vue"
    import DialogConfirmStore from "../../ui/dialog/DialogConfirmStore.vue"
    import {TheMainContent, ToastContent} from '../../../resource.js';

    export default {
        name: "TheMainEmployee",
        components: {DialogEmployees, TableEmployees, ToastNotice, DialogConfirmStore},
        methods: {
//Region function
            /**
             * unselected all when click button 
             * Author: doduyhung1292 (10/12/2022)
             */
            unselectAll: function() {
                try {
                    this.isUnselectAll = true
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Change number on delete state
             * @param {number on delete state} state 
             */
            changeStateEmployeeDelete: function(employeeToDelete) {
                try {
                    this.employeeToDelete = employeeToDelete;
                } catch (error) {
                    console.log(error)
                }
            },
            /**
             * 
             * Update total row when add new success
             * Author: doduyhung1292 (27/11/2022)
             */
             updateTotalRowWhenAddNewSuccess: function() {
                try {
                    this.numberEmployee = this.numberEmployee + 1
                } catch (error) {
                    console.log(error)
                }
             },
            /**
             * Update total row
             * Author: doduyhung1292 (27/11/2022)
             */
             updateTotalRowOnTable: function (numberRowDeleteSuccess) {
                try {
                    this.numberEmployee = this.numberEmployee - numberRowDeleteSuccess;
                } catch (error) {
                    console.log(error)
                }
            },
            /**
             * Search employee
             * Author: doduyhung1292 (22/11/2022)
             */
            searchEmployee: function() {
                try {
                    this.informationSearchEmployee = this.inputSearchEmployee;
                    this.rowStart = 0;
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Chuyển sang trang khác
             * Author: doduyhung1292 (22/11/2022)
             * @param {num} Số trang 
             */
            changePage: function(number) {
                try {
                    var num = Number(number);
                    if (num < 0) {this.rowStart = 0; return};
                    if (num > this.numberEmployee) {this.rowStart = this.numberEmployee; return};
                    this.rowStart = num; 
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * 
             * Get total employee from component TableEmployee
             * Author: doduyhung1292 (22/11/2022) 
             */
             getEmployeeLength: function(totalEmployee, limit, offset) {
                try {
                    this.numberEmployee = totalEmployee;
                    this.rowStart = offset;
                    this.rowEnd = offset + limit;
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Reload page when click icon reload on toolbar
             * Author: doduyhung1292 (20/11/2022)
             */
             reloadPage: function() {
                // this.$forceUpdate();
                try {
                    window.location.reload();
                } catch (error) {
                    console.log(error)
                }
             },

            /**
             * close modal confirm store and modal employee
             * Author: doduyhung1292 (20/11/2022)
             */
             clickNoStore: function() {
                //console.log("function active");
                try {
                    this.isShowModalConfirmStore = false;
                    this.isModalVisible = false;
                    this.tempEmployeeModeAddNew = {};
                    this.tempEmployeeModeModify = {}
                } catch (error) {
                    console.log(error)
                }
             },

             /**
             * close modal confirm store and modal employee
             * Author: doduyhung1292 (20/11/2022)
             */
             clickStore: function() {
                try {
                    this.isShowModalConfirmStore = false;
                    this.isModalVisible = false;
                } catch (error) {
                    console.log(error)
                }
             },

             /**
              * Export data employee to excel
              * Author: doduyhung1292 (20/11/2022)
              */
              exportExcel: function() {
                try {
                    axios({
                        url: 'http://localhost:5210/api/v1/Employees/export-excel',
                        method: 'GET',
                        responseType: 'blob',
                    }).then((response) => {
                        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                        var fileLink = document.createElement('a');
                    
                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'Danh_sach_nhan_vien.xlsx');
                        document.body.appendChild(fileLink);
                    
                        fileLink.click();
                    });
                } catch (error) {
                    console.log(error)
                }
              },

              /**
               * delete employees
               * Author: doduyhung1292 (08/12/2022)
               */
              executeDelete: function() {
                try {
                    this.isExecuteDelete = true
                } catch (error) {
                    console.log(error)
                }
              },

              /**
               * set isexecute to false
               * Author: doduyhung1292 (08/12/2022)
               */
               setExecuteDeleteToFalse: function() {
                try {
                    this.isExecuteDelete = false
                } catch (error) {
                    console.log(error)
                }
              },

              /**
               * set isUnselectedAll to false
               * Author: doduyhung1292 (08/12/2022)
               */
               unselectAllToFalse: function() {
                try {
                    this.isUnselectAll = false
                } catch (error) {
                    console.log(error)
                }
              },
              
//End Region function
//Region UI
            /**
             * Display button delete
             * Author: doduyhung1292 (08/12/2022)
             */
            displayButtonDelete: function(state) {
                try {
                    this.isShowButtonDelete = !this.isShowButtonDelete;
                } catch (error) {
                    console.log(error)
                }
            },
            
             /**
              * Catch event hover input search
              * Author: doduyhung1292 (24/11/2022)
              */
            inputSearchHover: function() {
                try {
                    this.isSearchButtonHover = "input__search--hover"
                } catch (error) {
                    console.log(error)
                }
            },

            /**
              * Catch event unhover input search
              * Author: doduyhung1292 (24/11/2022)
              */
              inputSearchUnhover: function() {
                try {
                    this.isSearchButtonHover = null
                } catch (error) {
                    console.log(error)
                }
            },

             /**
             * Show modal confirm store when click button "Cất"
             * Author: doduyhung1292 (20/11/2022)
             */
            showModalConfirmStore: function() {
                try {
                    this.isShowModalConfirmStore = !this.isShowModalConfirmStore;
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Close modal when click button close and uncheck data change
             * Author: doduyhung1292 (13/11/2022)
             */
             closeModalUnCheck: function(e) {
                try {
                    if (e == 'saveAndShowDialog')
                        {
                            this.isModalVisible = true;
                        } else {
                            this.isModalVisible = false;
                        }
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Close modal when click button close and check data change
             * Author: doduyhung1292 (13/11/2022)
             */
            closeModalCheck: function(mode, item) {
                try {
                    this.typeTempEmp = mode;
                    if (this.typeTempEmp == 'AddNew' || this.typeTempEmp == 'Clone') {
                        this.tempEmployeeModeAddNew = item;
                    } else {}

                    if (this.typeTempEmp == 'Modify') {
                        this.tempEmployeeModeModify = item;
                    }

                    this.isShowModalConfirmStore = !this.isShowModalConfirmStore;
                } catch (error) {
                    console.log(error)
                }
            },

             /**
              * 
              * Show modal edit employee
              * Author: doduyhung1292 (13/11/2022)
              */
             showModalEdit: function(item, mode) {
                try {
                    if (mode == "Modify") {
                        this.isModalVisible = true;
                        this.employeeEdit = item;
                        this.mode = mode
                    }
                    if (mode == "Clone") {
                        this.isModalVisible = true;
                        this.employeeEdit = item;
                        this.mode = mode
                    } else {
                        this.isModalVisible = true;
                        this.employeeEdit = item;
                        this.mode = mode
                    }
                } catch (error) {
                    console.log(error);
                }
            },

            /**
             * Show toast save success
             * Author: doduyhung1292 (13/11/2022)
             */
            showToastSaveSuccess: function(employeeSaved) {
                try {
                    this.employeeSaved = employeeSaved;
                    this.tempEmployeeModeModify = employeeSaved;
                    this.contentToastSuccess = this.toastContent.contentToastSaveSuccess;
                    this.isToastSuccessVisible = !this.isToastSuccessVisible;
                    setTimeout(() => {this.isToastSuccessVisible = false}, 2500)
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Show toast modify success
             * Author: doduyhung1292 (13/11/2022)
             */

            showToastModifySuccess: function(e) {
                try {
                    this.modifyEmployee = e;
                    this.contentToastSuccess = this.toastContent.contentToastModifySuccess;
                    this.isToastSuccessVisible = !this.isToastSuccessVisible;
                    setTimeout(() => {this.isToastSuccessVisible = false}, 2500)
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Hide toast modify success
             * Author: doduyhung1292 (24/11/2022)
             */
            closeToast: function() {
                try {
                    this.isToastSuccessVisible = !this.isToastSuccessVisible;
                } catch (error) {
                    console.log(error)
                }
            },
            /**
             * Hide modal confirm store
             * Author: doduyhung1292 (20/11/2022)
             */
             hideDialogConfirmStore: function() {
                try {
                    this.isShowModalConfirmStore = false;
                } catch (error) {
                    console.log(error)
                }
             },

             
            /**
             * Show toast success delete 
             * Author: doduyhung1292 (15/11/2022)
             */
            showToastDeleteSuccess: function() {
                try {
                    this.contentToastSuccess = this.toastContent.contentToastDeleteSuccess;
                    this.isToastSuccessVisible = !this.isToastSuccessVisible;
                    setTimeout(() => {this.isToastSuccessVisible = false}, 2500)
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Show toast success delete 
             * Author: doduyhung1292 (15/11/2022)
             */
             showToastMassDeleteSuccess: function() {
                try {
                    this.contentToastSuccess = this.toastContent.contentToastMassDeleteSuccess;
                    this.isToastSuccessVisible = !this.isToastSuccessVisible;
                    setTimeout(() => {this.isToastSuccessVisible = false}, 2500)
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Bắt sự kiện ô input search in focus
             * Author: doduyhung1292 (13/11/2022)
             */
             inputSearchFocus: function() {
                try {
                    this.isSearchButtonFocus = "borderFocus" 
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Bắt sự kiện ô input search out focus
             * Author: doduyhung1292 (13/11/2022)
             */

            inputSearchFocusOut: function() {
                try {
                    this.isSearchButtonFocus = null
                } catch (error) {
                    console.log(error)
                }
            },
//End region UI            
},
        data() {
            return {
                isModalVisible: false,
                isToastSuccessVisible: false,
                employeeEdit: {},
                numberEmployee: 0,
                isSearchButtonFocus: null,
                isSearchButtonHover: null,
                contentToastSuccess: null,
                isShowModalConfirmStore: false,
                isShowButtonDelete: false,
                tempEmp: {},
                tempEmployeeModeAddNew: {},
                tempEmployeeModeModify: {},
                employeeSaved: {},
                numberPerPage: 10,
                pageSelected: 1,
                inputSearchEmployee: null,
                informationSearchEmployee: null,
                theMainContent: TheMainContent,
                toastContent: ToastContent,
                newEmployee: {},
                modifyEmployee: {},
                rowEnd: 0, 
                rowStart: 0,
                isExecuteDelete: false,
                isUnselectAll: false,
                employeeToDelete: 0,
                mode: null
            }
        },
    }
</script>

<style scoped>
    @import url(../../../css/layout/employee/TheMainEmployee.css);
    .borderFocus {
       border-color: #2ca10c;
    }
    .selectedPage {
    background-color: #fff;
    border: 1px solid #e0e0e0!important;
    border-radius: 2px;
    cursor: pointer;
}
.content-footer--right, select{
    font-family: Notosans;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
}
.select-paging>select {
    background-color: #F5F5F5;
    border: none;
    height: 29px;
}

.numberRecords {
    margin-left: 16px;
}
.input__search--hover {
    background-color: #F6F6F6;
}
</style>