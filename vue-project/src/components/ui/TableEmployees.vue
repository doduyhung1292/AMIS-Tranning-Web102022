<template>
    <div class="main-content-table">
            <table class="row-table">
                <tr>
                        <th class="th__checkbox">
                            <input type="checkbox">
                        </th>
                        <th class="th__employee-id" title="MÃ NHÂN VIÊN">MÃ NHÂN VIÊN</th>
                        <th class="th__fullname" title="TÊN NHÂN VIÊN">TÊN NHÂN VIÊN</th>
                        <th class="th__sex" title="GIỚI TÍNH">GIỚI TÍNH</th>
                        <th class="th__date-of-birth" title="NGÀY SINH">NGÀY SINH</th>
                        <th class="th__entity-number" title="SỐ CHỨNG MINH NHÂN DÂN">SỐ CMND</th>
                        <th class="th__issue-date" title="NGÀY CẤP">NGÀY CẤP</th>
                        <th class="th__issued-by" title="NƠI CẤP">NƠI CẤP</th>
                        <th class="th__title-job" title="CHỨC DANH">CHỨC DANH</th>
                        <th class="th__id-unit" title="MÃ ĐƠN VỊ">MÃ ĐƠN VỊ</th>
                        <th class="th__unit" title="TÊN ĐƠN VỊ">TÊN ĐƠN VỊ</th>
                        <th class="th__bank-account" title="SỐ TÀI KHOẢN">SỐ TÀI KHOẢN</th>
                        <th class="th__bank-name" title="TÊN NGÂN HÀNG">TÊN NGÂN HÀNG</th>
                        <th class="th__branch-bank" title="CHI NHÁNH TÀI KHOẢN NGÂN HÀNG">CHI NHÁNH TK NGÂN HÀNG</th>
                        <th class="th__is-customer" title="LÀ KHÁCH HÀNG">LÀ KHÁCH HÀNG</th>
                        <th class="th__is-supplier" title="LÀ NHÀ CUNG CẤP">LÀ NHÀ CUNG CẤP</th>
                        <th class="th__function" title="CHỨC NĂNG">CHỨC NĂNG</th>
                    </tr>
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
                            <td class="td__identity-date">{{formatDate(employee.IdentityDate)}}</td>
                            <td>{{employee.IdentityPlace}}</td>
                            <td>{{employee.EmployeePosition}}</td>
                            <td>{{employee.DepartmentId}}</td>
                            <td>{{employee.DepartmentName}}</td>
                            <td class="td__bank-account-number">{{employee.BankAccountNumber}}</td>
                            <td>{{employee.BankName}}</td>
                            <td>{{employee.BankBranchName}}</td>
                            <td class="td__checkbox">
                                <input type="checkbox">
                            </td>
                            <td class="td__checkbox">
                                <input type="checkbox">
                            </td>
                            <td class="td__function" :class="{selected: rowSelected == index}">
                                <div class="td__function-content">
                                    Sửa
                                    <div class="dropdown">
                                        <select class="select-function">
                                            <option hidden></option>
                                            <option><button>Nhân bản</button></option>
                                            <option><button>Xóa</button></option>
                                            <option><button>Sử dụng</button></option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                    </tr>
                </table>
            </div>
    <LoadingSpinner v-if="isLoading"/>
</template>

<script>
    import axios from "axios"
    import LoadingSpinner from "./LoadingSpinner.vue"
    
    export default {
        name: "TableEmployees",
        components: {LoadingSpinner},
        created() {
          /**
             * API Get employees
             * Author: doduyhung1292 (08/11/2022)
             */
             axios.get("https://amis.manhnv.net/api/v1/Employees")
                .then(res => {this.employees = res.data; this.isLoading = false})
                .catch(err => console.log(err))
      },
      methods: {
         /**
             * 
             * Highlight row selected
             * Author: doduyhung1292 (08/11/2022)
             */
             selectEmployee: function(index) {
                this.rowSelected = index
            },
            /**
             * 
             * Show form edit infomation employee when double click
             * Author: doduyhung1292 (08/11/2022)
             */

             //Show modal
             showModal: function(item) {
                this.$emit('showModal', item);
            },

             /**
             * Formate date
             * Author: doduyhung1292 (13/11/2022)
             */
             formatDate: function(date) {
                try {
                    if (!date) {return}
                    var dateBirth = new Date(date);
                    var day = dateBirth.getDay();
                    if (day<10) {day = `0${day}`};

                    var month = dateBirth.getMonth() + 1;
                    if(month<10) {month = `0${month}`};

                    var year = dateBirth.getFullYear();

                    return `${day}-${month}-${year}`;
                } catch (error) {
                    console.log(error)
                } 
            },
      },
        data() {
            return{
                employees: [],
                employeeParent: null,
                rowSelected: -1,
                isLoading: true
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
        background-color: #e5f3ff!important;
    }
    .hover {
        background-color: #e5f3ff;
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
    }
</style>