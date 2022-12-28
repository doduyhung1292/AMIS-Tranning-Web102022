<template>
    <div class="main-content-table">
            <table class="row-table">
                <tr>    
                        <th class="th__checkbox">
                            <input type="checkbox" v-on:change="chooseAll" v-model="this.isSelectAll" value="none" id="none">
                        </th>
                        <th class="th__employee-id" :title="this.theMainContent.mainContentTable.employeeId">{{this.theMainContent.mainContentTable.employeeId}}</th>
                        <th class="th__fullname" :title="this.theMainContent.mainContentTable.employeeName">{{this.theMainContent.mainContentTable.employeeName}}</th>
                        <th class="th__sex" :title="this.theMainContent.mainContentTable.gender">{{this.theMainContent.mainContentTable.gender}}</th>
                        <th class="th__date-of-birth" :title="this.theMainContent.mainContentTable.dateOfBirth">{{this.theMainContent.mainContentTable.dateOfBirth}}</th>
                        <th class="th__entity-number" :title="this.theMainContent.mainContentTable.titleIdentityNumber">{{this.theMainContent.mainContentTable.identityNumber}}</th>
                        <th class="th__title-job" :title="this.theMainContent.mainContentTable.positionName">{{this.theMainContent.mainContentTable.jobPositionName}}</th>
                        <th class="th__unit" :title="this.theMainContent.mainContentTable.departmentName">{{this.theMainContent.mainContentTable.departmentName}}</th>
                        <th class="th__bank-account" :title="this.theMainContent.mainContentTable.bankAccountNumber">{{this.theMainContent.mainContentTable.bankAccountNumber}}</th>
                        <th class="th__bank-name" :title="this.theMainContent.mainContentTable.bankName">{{this.theMainContent.mainContentTable.bankName}}</th>
                        <th class="th__branch-bank" :title="this.theMainContent.mainContentTable.titleBankBranchName">{{this.theMainContent.mainContentTable.bankBranchName}}</th>
                        <th class="th__function" :title="this.theMainContent.mainContentTable.functionTable">{{this.theMainContent.mainContentTable.functionTable}}</th>
                    </tr>
                    <tbody>
                        <tr v-for="(employee, index) in employees" :key="index"
                            v-if="this.employees.length != 0"
                            v-on:click="selectEmployee(employee.EmployeeId)"
                            v-on:dblclick="showModal(employee, 'Modify')"
                            :class="{selected: this.employeeIdExcuteDelete.includes(employee.EmployeeId) == true}">
                            <td class="td__checkbox" :class="{selected: this.employeeIdExcuteDelete.includes(employee.EmployeeId) == true}">
                                <input type="checkbox" :id="index" :value="employee.EmployeeId" v-model="this.employeeIdExcuteDelete" v-on:click="toggleCheckbox(employee.EmployeeId)">
                            </td>
                            <td class="td__employee-id">{{employee.EmployeeCode}}</td>
                            <td>{{employee.EmployeeName}}</td>
                            <td>{{formatGender(employee.Gender)}}</td>
                            <td class="td__date-of-birth">{{formatDate(employee.DateOfBirth)}}</td>
                            <td class="td__identity-number">{{employee.IdentityNumber}}</td>
                            <td>{{employee.JobPositionName}}</td>
                            <td>{{employee.DepartmentName}}</td>
                            <td class="td__bank-account-number">{{employee.BankAccountNumber}}</td>
                            <td>{{employee.BankName}}</td>
                            <td>{{employee.BankBranchName}}</td>
                            <td class="td__function" :class="{selected: this.employeeIdExcuteDelete.includes(employee.EmployeeId) == true}">
                                <div class="td__function-content">
                                    <div  v-on:click="showModal(employee, 'Modify')">{{this.theMainContent.mainContentTable.functionOnTable.typeFunction}}</div>
                                    <div class="dropdown" v-on:change="this.executeFuntion" v-on:click="this.functionToEmployee(employee)"> 
                                        <select class="select-function" v-model="this.funtionOnTable">
                                            <option hidden></option>
                                            <option>{{this.theMainContent.mainContentTable.functionOnTable.cloneEmployee}}</option>
                                            <option>{{this.theMainContent.mainContentTable.functionOnTable.deleteEmployee}}</option>
                                            <option>{{this.theMainContent.mainContentTable.functionOnTable.useEmployee}}</option>
                                        </select>
                                    </div>
                                    </div>
                            </td>
                    </tr>
                </tbody>
                <LoadingDataTable v-if="isLoading"/>
                <tbody v-if="this.employees.length == 0">
                        <tr>
                            <td colspan="8" class="tr__no-found-data">
                                {{this.theMainContent.mainContentTable.notFoundRecord}}
                            </td>
                        </tr>
                </tbody>
                
                </table>
            </div>
    <DialogConfirm v-if="isShowDialogConfirmDelete" 
                    v-on:callApiDelete = "this.callApiDelete" 
                    v-on:closeDialogConfirm="this.hideDialogConfirm"
                    :msgConfirmDelete="this.msgConfirmDelete"/>
    <DialogConfirmMassDelete v-if="isShowDialogConfirmMassDelete" 
                    v-on:callApiMassDelete = "this.callApiMassDelete"
                    v-on:closeDialogConfirm="this.hideDialogConfirm"
                    :msgConfirmDelete="this.msgConfirmDelete"/>
    <DialogNotice :errMsg = "this.errMsg" 
                  v-if="this.showDialogNotice"
                  v-on:closeDialogNotice="closeDialogNotice"/>
</template>

<script>
    import axios from "axios"
    import LoadingDataTable from "./LoadingDataTable.vue"
    import DialogConfirm from "../dialog/DialogConfirm.vue"
    import DialogConfirmMassDelete from "../dialog/DialogConfirmMassDelete.vue"
    import {TheMainContent, GenderName, ConfirmMessage, ModeDialogName} from '../../../resource.js';
    import {GenderEnum} from '../../../enum.js';
    import DialogNotice from '../dialog/DialogNotice.vue'

    export default {
        name: "TableEmployees",
        components: {LoadingDataTable, DialogConfirm, DialogConfirmMassDelete},
        props: ["modifyEmployee", "newEmployee", "numberPerPage", "rowStart", "informationSearchEmployee", "isExecuteDelete", "isUnselectAll", "tempEmployeeModeModify", "employeeSaved"],
        created() {
          /**
             * API Get employees
             * Author: doduyhung1292 (08/11/2022)
             */
             axios.get(`http://localhost:5210/api/v1/Employees/filter?limit=${this.numberPerPage}&offset=0`)
                .then(res => {this.employees = res.data.dataEmployee; 
                                console.log(this.employees);
                                var totalEmployee =  res.data.totalCount;
                                var limit = res.data.dataEmployee.length;
                                var offset = res.data.offset;
                                this.$emit('getEmployeeLength', totalEmployee , limit, offset)})
                .catch(err => console.log(err))
            try {
                if (this.employees.length > 0) {
                    this.isLoading = false;
                } else {setTimeout(() => {this.isLoading = false;}, 6000)}
            } catch (error) {
                console.log(error)
            }
      },
      watch: {
        employeeSaved: function(newVal, oldVal) {
            try {
                if(this.employeeSaved != null) {
                    this.employees.unshift(this.employeeSaved);
                }
            } catch (error) {
                console.log(error)
            }
        },
        /**
         * unselected all
         * Author: doduyhung1292 (10/12/2022)
         */
         isUnselectAll: function(newVal, oldVal) {
            try {
                if (this.isUnselectAll == true) {
                    this.employeeIdExcuteDelete = [];
                    this.isSelectAll = [];
                    this.$emit('unselectAllToFalse');
                    this.$emit("changeStateEmployeeDelete", this.employeeIdExcuteDelete.length);
                } else {this.$emit('unselectAllToFalse');}
                
            } catch (error) {
                console.log(error)
            }
         },

        /**
         * Execute mass delete 
         * Author: doduyhung1292 (10/12/2022)
         */
        isExecuteDelete: function(newVal, oldVal) {
            try {
                if (this.isExecuteDelete == true && this.employeeIdExcuteDelete.length != 0) {
                    this.isShowDialogConfirmMassDelete = true;
                    this.msgConfirmDelete = this.confirmMessage.massDelete;
                } else {
                    this.$emit('setExecuteDeleteToFalse');
                    this.$emit("changeStateEmployeeDelete", this.employeeIdExcuteDelete.length);}
                
            } catch (error) {
                console.log(error)
            }
         },
        /**
         * Receive prop new employee when save success
         * Author: doduyhung1292 (24/11/2022)
         */
        newEmployee: function(newVal, oldVal) {
            try {
                this.employees.unshift(newVal);
            } catch (error) {
                console.log(error)
            }
         },

         /**
         * Receive prop new employee when save success
         * Author: doduyhung1292 (24/11/2022)
         */
         modifyEmployee: function(newVal, oldVal) {
            try {
                this.employees.map((employee, index) => {
                    if (employee.EmployeeId == newVal.EmployeeId) {
                        this.employees[index] = newVal
                    }
                })
                // for (var emplo of this.employees) {
                //     if (emplo.EmployeeId == newVal.EmployeeId) {
                //         emplo = newVal;
                //         console.log(emplo);
                //     }
                // }
            } catch (error) {
                console.log(error)
            }
         },

        /**
         * Lấy lại api khi thay đổi số lượng bản ghi/ trang
         * Author: doduyhung1292 (22/11/2022)
         * @param {số bản ghi/ trang} newVal 
         * 
         */
        numberPerPage: function(newVal, oldVal) {
            if (this.informationSearchEmployee) 
            {
                axios.get(`http://localhost:5210/api/v1/Employees/filter?limit=${this.numberPerPage}&offset=${this.rowStart}&keyword=${this.informationSearchEmployee}`)
                .then(res => {this.employees = res.data.dataEmployee;
                                this.isLoading = false;
                                var totalEmployee =  res.data.totalCount;
                                var limit = res.data.dataEmployee.length;
                                var offset = res.data.offset;
                                this.$emit('getEmployeeLength', totalEmployee , limit, offset)})
                .catch(err => console.log(err))
            }
            else 
            {
                if (this.rowStart < 0) {this.rowStart = 0;}
                axios.get(`http://localhost:5210/api/v1/Employees/filter?limit=${this.numberPerPage}&offset=${this.rowStart}`)
                    .then(res => {this.employees = res.data.dataEmployee; 
                                this.isLoading = false;
                                var totalEmployee =  res.data.totalCount;
                                var limit = res.data.dataEmployee.length;
                                var offset = res.data.offset;
                                this.$emit('getEmployeeLength', totalEmployee , limit, offset)})
                .catch(err => console.log(err))
            }
            
        },
        /**
         * Lấy lại api khi thay đổi số trang
         * Author: doduyhung1292 (22/11/2022)
         * @param {số trang} newVal 
         * 
         */
         rowStart: function(newVal, oldVal) {
            if (this.informationSearchEmployee) {
                axios.get(`http://localhost:5210/api/v1/Employees/filter?limit=${this.numberPerPage}&offset=${this.rowStart}&keyword=${this.informationSearchEmployee}`)
                    .then(res => {this.employees = res.data.dataEmployee;
                                    this.isLoading = false;
                                    var totalEmployee =  res.data.totalCount;
                                    var limit = res.data.dataEmployee.length;
                                    var offset = res.data.offset;
                                    this.$emit('getEmployeeLength', totalEmployee , limit, offset)})
                    .catch(err => console.log(err))
            }
            else 
            {
                axios.get(`http://localhost:5210/api/v1/Employees/filter?limit=${this.numberPerPage}&offset=${this.rowStart}`)
                    .then(res => {this.employees = res.data.dataEmployee;
                        console.log(`http://localhost:5210/api/v1/Employees/filter?limit=${this.numberPerPage}&offset=${this.rowStart}`);
                                    this.isLoading = false;
                                    var totalEmployee =  res.data.totalCount;
                                    var limit = res.data.dataEmployee.length;
                                    var offset = res.data.offset;
                                    this.$emit('getEmployeeLength', totalEmployee , limit, offset)})
                    .catch(err => console.log(err))
            }
        },
        /**
         * Search API
         * Author: doduyhung1292 (22/11/2022)
         */
         informationSearchEmployee: function(newVal, oldVal) {
            axios.get(`http://localhost:5210/api/v1/Employees/filter?limit=${this.numberPerPage}&offset=${this.rowStart}&keyword=${this.informationSearchEmployee}`)
                .then(res => {this.employees = res.data.dataEmployee;
                                this.isLoading = false;
                                var totalEmployee =  res.data.totalCount;
                                var limit = res.data.dataEmployee.length;
                                var offset = res.data.offset;
                                this.$emit('getEmployeeLength', totalEmployee , limit, offset)})
                .catch(err => console.log(err))
         },
      },
      methods: {         
// Region UI
            /**
             * Close dialog notice
             * Author: doduyhung1292 (10/12/2022)
             */
             closeDialogNotice: function() {
                this.showDialogNotice = false;
             },
            /**
             * 
             * Highlight row selected
             * Author: doduyhung1292 (08/11/2022)
             */
             selectEmployee: function(employeeId) {
                try {
                    if(this.employeeIdExcuteDelete.includes(employeeId) == false) {
                        this.employeeIdExcuteDelete.push(employeeId);
                    }
                    else {
                        this.employeeIdExcuteDelete = this.employeeIdExcuteDelete.filter(itemId => employeeId != itemId)
                    }
                    this.$emit("changeStateEmployeeDelete", this.employeeIdExcuteDelete.length);
                } catch (error) {
                    console.log(error)
                }
            },
            /**
             * Show form edit infomation employee when double click
             * Author: doduyhung1292 (08/11/2022)
             */

             showModal: function(item, mode) {
                try {
                    if (item.EmployeeId == this.tempEmployeeModeModify.EmployeeId) {
                        this.$emit('showModal', this.tempEmployeeModeModify, mode);
                    } else {
                        this.$emit('showModal', item, mode);
                    }
                    
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Show dialog confirm delete
             * Author: doduyhung1292 (14/11/2022)
             */
             showDialogConfirmDelete: function() {
                    try {
                        this.isShowDialogConfirmDelete = true;
                        this.funtionOnTable = null;
                        this.msgConfirmDelete = this.confirmMessage.msgConfirmDelete1 + this.employeeOnFunction.EmployeeCode + this.confirmMessage.msgConfirmDelete2;
                    } catch (error) {
                        console.log(error)
                    }
            },
            /**
             * Hide dialog confirm
             * Author: doduyhung1292 (14/11/2022)
             */
             hideDialogConfirm: function() {
                try {
                    this.isShowDialogConfirmDelete = false;
                    this.isShowDialogConfirmMassDelete = false;
                    this.$emit('setExecuteDeleteToFalse');
                } catch (error) {
                    console.log(error)
                }
             },
// Endregion UI
//Region API
             /**
              * Call api mass delete
              * Author: doduyhung1292 (09/12/2022)
              */
              callApiMassDelete: function() {
                console.log(this.employeeIdExcuteDelete);
                axios.delete(`http://localhost:5210/api/v1/Employees/delete-multiple`, {data: this.employeeIdExcuteDelete})
                        .then(res => {this.responseApiMassDelete(res)})
                        .catch(err => console.log(err))
                this.$emit('setExecuteDeleteToFalse');
              },
              /**
               * Call api get employees
               * Author: doduyhung1292 (09/12/2022)
               */
              callApiGetEmployee: function() {
                axios.get(`http://localhost:5210/api/v1/Employees/filter?limit=${this.numberPerPage}&offset=0`)
                    .then(res => {this.employees = res.data.dataEmployee; 
                                    console.log(this.employees);
                                    this.isLoading = false; 
                                    var totalEmployee =  res.data.totalCount;
                                    var limit = res.data.dataEmployee.length;
                                    var offset = res.data.offset;
                                    this.$emit('getEmployeeLength', totalEmployee , limit, offset)})
                    .catch(err => console.log(err))
              },
             /**
             * Call api delete employee
             * Author: doduyhung1292 (14/11/2022)
             */
             callApiDelete: function() {
                try {
                    axios.delete(`http://localhost:5210/api/v1/Employees/${this.employeeOnFunction.EmployeeId}`)
                    .then(res => {this.responseApiDelete(res); console.log(res)})
                    .catch(err => {console.log(err)})
                } catch (error) {
                    console.log(error)
                }
             },
//End region API
//Region function
             /**
              * Select all row in a page
              * Author: doduyhung1292 (09/12/2022)
              */
             chooseAll: function() {
                try {
                    if (this.isSelectAll.length == 1) {
                    this.employees.map(employee => {
                        if(this.employeeIdExcuteDelete.includes(employee.EmployeeId) == false) {
                            this.employeeIdExcuteDelete.push(employee.EmployeeId)
                        }
                    })
                    }
                    this.$emit("changeStateEmployeeDelete", this.employeeIdExcuteDelete.length);
                } catch (error) {
                    console.log(error)
                }
             },

             /**
              * select/ unselect when click checkbox
              * @param {employee id} employeeId 
              * Author: doduyhung1292 (9/12/2022)
              */
             toggleCheckbox: function (employeeId) {
                try {
                    if (this.employeeIdExcuteDelete.includes(employeeId)) {
                    this.employeeIdExcuteDelete.push(employeeId)
                    }
                    else 
                    {
                        this.employeeIdExcuteDelete.filter( 
                            (id, index) => {if (id == employeeId) {
                                this.employeeIdExcuteDelete.splice(index, 1);}})
                    }
                    this.$emit("changeStateEmployeeDelete", this.employeeIdExcuteDelete.length);
                } catch (error) {
                    console.log(error)
                }
            },
             /**
              * Check response from server when delete
              * Author: doduyhung1292(15/11/2022)
              */
              responseApiDelete: function(res) {
                try {
                    switch (res.status) {
                    case 200:
                        this.isShowDialogConfirmDelete = false;
                        this.employees = this.employees.filter(item => item.EmployeeId != this.employeeOnFunction.EmployeeId);
                        if (this.employees.length == 0) {this.callApiGetEmployee();}
                        this.$emit('showToastMassDeleteSuccess');
                        this.$emit('updateTotalRowOnTable', this.employeeIdExcuteDelete.length);
                        break;
                    case 204:
                        this.errMsg = this.mainContentTable.deleteError;
                        this.showDialogNotice = true;
                        this.isShowDialogConfirmMassDelete = false;
                        break;
                    case 500:
                        this.errMsg = this.mainContentTable.deleteError;
                        this.showDialogNotice = true;
                        this.isShowDialogConfirmMassDelete = false;
                        break;
                    default:
                        break;
                    }
                } catch (error) {
                    console.log(error)
                }
              },

              /**
              * Check response from server when mass delete
              * Author: doduyhung1292(15/11/2022)
              */
              responseApiMassDelete: function(res) {
                try {
                    switch (res.status) {
                    case 200:
                        this.isShowDialogConfirmMassDelete = false;
                        // update row on table when delete success
                        this.employees = this.employees.filter(item => this.employeeIdExcuteDelete.includes(item.EmployeeId) == false);
                        if (this.employees.length == 0) {this.callApiGetEmployee();}
                        this.$emit('showToastMassDeleteSuccess');
                        this.$emit('updateTotalRowOnTable', 1);
                        this.employeeIdExcuteDelete = [];
                        this.isSelectAll = [];
                        this.$emit("changeStateEmployeeDelete", this.employeeIdExcuteDelete.length);
                        break;
                    case 204:
                        this.errMsg = this.mainContentTable.deleteError;
                        this.showDialogNotice = true;
                        this.isShowDialogConfirmMassDelete = false;
                        break;
                    case 500:
                        this.errMsg = this.mainContentTable.deleteError;
                        this.showDialogNotice = true;
                        this.isShowDialogConfirmMassDelete = false;
                        break;
                    default:
                        break;
                    }
                } catch (error) {
                    console.log(error)
                }
              },

            /**
             * Select funtion on table
             * Author: doduyhung1292 (14/11/2022)
             */
            executeFuntion: function() {
                try {
                    switch (this.funtionOnTable) {
                    case this.modeDialogName.delete:
                        this.showDialogConfirmDelete();
                        break;
                    case this.modeDialogName.clone:
                        this.showModal(this.employeeOnFunction, "Clone");
                    default:
                        break;
                    }
                    this.funtionOnTable = null;
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Formate date
             * Author: doduyhung1292 (13/11/2022)
             */
             formatDate: function(date) {
                try {
                    if (!date) {return}
                    var dateBirth = new Date(date);
                    var day = dateBirth.getDate();
                    if (day<10) {day = `0${day}`};

                    var month = dateBirth.getMonth() + 1;
                    if(month<10) {month = `0${month}`};

                    var year = dateBirth.getFullYear();
                    return `${day}/${month}/${year}`;
                } catch (error) {
                    console.log(error)
                } 
            },

            /**
             * Format gender
             * if gender = 0 return male
             * gender = 1 return female
             * gender = 2 return other
             * Author: doduyhung1292 (08/12/2022)
             */
             formatGender: function(gender) {
                try {
                    switch (gender) {
                            case this.genderEnum.male:
                                return this.genderName.male;
                                break;
                            case this.genderEnum.female:
                                return this.genderName.female;
                                break;
                            case this.genderEnum.other:
                                return this.genderName.other;
                                break;
                            default:
                                break;
                        }
                } catch (error) {
                    console.log(error)
                }
             },

            /**
              * get employee in function
              * Author: doduyhung1292 (14/11/2022)
              */
            functionToEmployee: function(employee) {
                try {
                    this.employeeOnFunction = employee
                } catch (error) {
                    console.log(error)
                }
            },
//End region function
},
        data() {
            return{
                employeeIdExcuteDelete: [],
                isSelectAll: [],
                employees: [],
                rowSelected: [],
                errMsg: null,
                isLoading: true,
                isShowDialogConfirmDelete: false,
                isShowDialogConfirmMassDelete: false,
                showDialogNotice: false,
                funtionOnTable: null,
                employeeOnFunction: null,
                msgConfirmDelete: null,
                theMainContent: TheMainContent,

                // import from resources
                genderName: GenderName,
                confirmMessage: ConfirmMessage,
                modeDialogName: ModeDialogName,

                // import from enum
                genderEnum: GenderEnum,
            }
        }
    }
</script>

<style>
    @import url(../../../css/ui/employee/TableEmployees.css);
    .td_function {
        display: flex;
        flex-direction: row;  
        align-items: center;
        justify-content: center;
    }

    .selected {
        background-color: #CEEAD9!important;
    }
    .hover {
        background-color: #F1FFEF;
    }

    .select-function {
        height: 16px; 
        width: 19px;
        border: none; 
        margin: 0;
        background-color: #ffffff00;
    }

    .td__function-content {
        display: flex;
        flex-direction: row;
        margin-left: 25px;
    }
    .dropdown {
        position: relative;
    }
    .content-dropdown {
        position: absolute;
        display: flex;
        flex-direction: column;
        
    }
    .content-dropdown>button {
        background-color: #fff;
        z-index: 40;
    }
    tr>th:first-child,tr>td:first-child {
    position: sticky;
    left: 0;
    border-left: none;
    }
    tr>td:first-child {
        background-color: #fff;
        padding-left: 16px;
        text-align: left;
    }
    .tr__no-found-data {
        padding-left: 460px!important;
    }
</style>