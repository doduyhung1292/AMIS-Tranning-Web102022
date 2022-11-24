<template>
    <div class="main-content-table">
            <table class="row-table">
                <tr>    
                        <th class="th__checkbox">
                            <input type="checkbox">
                        </th>
                        <th class="th__employee-id" :title="this.theMainContent.mainContentTable.employeeId">{{this.theMainContent.mainContentTable.employeeId}}</th>
                        <th class="th__fullname" :title="this.theMainContent.mainContentTable.employeeName">{{this.theMainContent.mainContentTable.employeeName}}</th>
                        <th class="th__sex" :title="this.theMainContent.mainContentTable.gender">{{this.theMainContent.mainContentTable.gender}}</th>
                        <th class="th__date-of-birth" :title="this.theMainContent.mainContentTable.dateOfBirth">{{this.theMainContent.mainContentTable.dateOfBirth}}</th>
                        <th class="th__entity-number" :title="this.theMainContent.mainContentTable.titleIdentityNumber">{{this.theMainContent.mainContentTable.identityNumber}}</th>
                        <th class="th__title-job" :title="this.theMainContent.mainContentTable.positionName">{{this.theMainContent.mainContentTable.positionName}}</th>
                        <th class="th__unit" :title="this.theMainContent.mainContentTable.departmentName">{{this.theMainContent.mainContentTable.departmentName}}</th>
                        <th class="th__bank-account" :title="this.theMainContent.mainContentTable.bankAccountNumber">{{this.theMainContent.mainContentTable.bankAccountNumber}}</th>
                        <th class="th__bank-name" :title="this.theMainContent.mainContentTable.bankName">{{this.theMainContent.mainContentTable.bankName}}</th>
                        <th class="th__branch-bank" :title="this.theMainContent.mainContentTable.titleBankBranchName">{{this.theMainContent.mainContentTable.bankBranchName}}</th>
                        <th class="th__function" :title="this.theMainContent.mainContentTable.functionTable">{{this.theMainContent.mainContentTable.functionTable}}</th>
                    </tr>
                    <tbody>
                        <tr v-for="(employee, index) in employees" :key="index"
                            v-on:click="selectEmployee(index)"
                            v-on:dblclick="showModal(employee)"
                            :class="{selected: rowSelected == index}">
                            <td class="td__checkbox" :class="{selected: rowSelected == index}">
                                <input type="checkbox">
                            </td>
                            <td class="td__employee-id">{{employee.EmployeeCode}}</td>
                            <td>{{employee.EmployeeName}}</td>
                            <td>{{employee.GenderName}}</td>
                            <td class="td__date-of-birth">{{formatDate(employee.DateOfBirth)}}</td>
                            <td class="td__identity-number">{{employee.IdentityNumber}}</td>
                            <td>{{employee.EmployeePosition}}</td>
                            <td>{{employee.DepartmentName}}</td>
                            <td class="td__bank-account-number">{{employee.BankAccountNumber}}</td>
                            <td>{{employee.BankName}}</td>
                            <td>{{employee.BankBranchName}}</td>
                            <td class="td__function" :class="{selected: rowSelected == index}">
                                <div class="td__function-content">
                                    <div  v-on:click="showModal(employee)">{{this.theMainContent.mainContentTable.functionOnTable.typeFunction}}</div>
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
                <LoadingSpinner v-if="isLoading"/>
                </table>
            </div>
    <DialogConfirm v-if="isShowDialogConfirmDelete" 
                    v-on:callApiDelete = "this.callApiDelete" 
                    v-on:closeDialogConfirm="this.hideDialogConfirm"
                    :msgConfirmDelete="this.msgConfirmDelete"/>
</template>

<script>
    import axios from "axios"
    import LoadingSpinner from "./LoadingSpinner.vue"
    import DialogConfirm from "./DialogConfirm.vue"
    import {TheMainContent} from './../../resource.js';

    export default {
        name: "TableEmployees",
        components: {LoadingSpinner, DialogConfirm},
        props: ["modifyEmployee", "newEmployee", "numberPerPage", "pageSelected", "informationSearchEmployee"],
        created() {
          /**
             * API Get employees
             * Author: doduyhung1292 (08/11/2022)
             */
             axios.get(`https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${this.numberPerPage}&pageNumber=1`)
                .then(res => {this.employees = res.data.Data; 
                                this.isLoading = false; 
                                this.$emit('getEmployeeLength', res.data.TotalRecord, res.data.TotalPage)})
                .catch(err => console.log(err))
      },
      watch: {
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
                for (var emplo of this.employees) {
                    if (emplo.EmployeeId == newVal.EmployeeId) {
                        emplo = newVal;
                        console.log("updated")
                    }
                }
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
            axios.get(`https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${this.numberPerPage}&pageNumber=${this.pageSelected}`)
                .then(res => {this.employees = res.data.Data; 
                                this.isLoading = false;
                                this.$emit('getEmployeeLength', res.data.TotalRecord, res.data.TotalPage)})
                .catch(err => console.log(err))
        },
        /**
         * Lấy lại api khi thay đổi số trang
         * Author: doduyhung1292 (22/11/2022)
         * @param {số trang} newVal 
         * 
         */
         pageSelected: function(newVal, oldVal) {
            axios.get(`https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${this.numberPerPage}&pageNumber=${this.pageSelected}`)
                .then(res => {this.employees = res.data.Data;
                    console.log(this.pageSelected);
                                this.isLoading = false;
                                this.$emit('getEmployeeLength', res.data.TotalRecord, res.data.TotalPage)})
                .catch(err => console.log(err))
        },
        /**
         * Search API
         * Author: doduyhung1292 (22/11/2022)
         */
         informationSearchEmployee: function(newVal, oldVal) {
            axios.get(`https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${this.numberPerPage}&pageNumber=${this.pageSelected}&employeeFilter=${this.informationSearchEmployee}`)
                .then(res => {this.employees = res.data.Data;
                    console.log(this.pageSelected);
                                this.isLoading = false;
                                this.$emit('getEmployeeLength', res.data.TotalRecord, res.data.TotalPage)})
                .catch(err => console.log(err))
         },
      },
      methods: {         
// Region UI
            /**
             * 
             * Highlight row selected
             * Author: doduyhung1292 (08/11/2022)
             */
             selectEmployee: function(index) {
                try {
                    this.rowSelected = index
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Show form edit infomation employee when double click
             * Author: doduyhung1292 (08/11/2022)
             */

             showModal: function(item) {
                try {
                    this.$emit('showModal', item);
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
                        this.msgConfirmDelete = `Bạn có thực sự muốn xóa nhân viên <${this.employeeOnFunction.EmployeeCode}> không?`;
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
                    this.isShowDialogConfirmDelete = false
                } catch (error) {
                    console.log(error)
                }
             },
// Endregion UI
//Region API
             /**
             * Call api delete employee
             * Author: doduyhung1292 (14/11/2022)
             */
             callApiDelete: function() {
                try {
                    axios.delete(`https://amis.manhnv.net/api/v1/Employees/${this.employeeOnFunction.EmployeeId}`)
                    .then(res => {this.responseApiDelete(res); console.log(res)})
                    .catch(err => {console.log(err)})
                } catch (error) {
                    console.log(error)
                }
             },
//End region API
//Region function
             /**
              * Check response from server when delete
              * Author: doduyhung1292(15/11/2022)
              */
              responseApiDelete: function(res) {
                try {
                    switch (res.status) {
                    case 200:
                        this.$emit('showToastDeleteSuccess');
                        this.isShowDialogConfirmDelete = false;
                        this.employees = this.employees.filter(item => item.EmployeeId != this.employeeOnFunction.EmployeeId)
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
                    case "Xóa":
                        this.showDialogConfirmDelete();
                        break;
                    case "Nhân bản":
                        console.log("Nhân bản")
                    default:
                        break;
                    }
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
                employees: [],
                employeeParent: null,
                rowSelected: -1,
                isLoading: true,
                isShowDialogConfirmDelete: false,
                funtionOnTable: null,
                employeeOnFunction: null,
                msgConfirmDelete: null,
                theMainContent: TheMainContent
            }
        }
    }
</script>

<style>
    @import url(../../css/ui/TheTable.css);
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
        background-color: #E7F5EC;
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
</style>