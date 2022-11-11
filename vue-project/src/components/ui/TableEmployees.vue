<template>
    <div class="main-content-table">
            <table class="row-table">
                <tr>
                        <th class="th__checkbox">
                            <input type="checkbox">
                        </th>
                        <th class="th__employee-id">MÃ NHÂN VIÊN</th>
                        <th class="th__fullname">TÊN NHÂN VIÊN</th>
                        <th class="th__sex">GIỚI TÍNH</th>
                        <th class="th__date-of-birth">NGÀY SINH</th>
                        <th class="th__entity-number">SỐ CMND</th>
                        <th class="th__issue-date">NGÀY CẤP</th>
                        <th class="th__issued-by">NƠI CẤP</th>
                        <th class="th__title-job">CHỨC DANH</th>
                        <th class="th__id-unit">MÃ ĐƠN VỊ</th>
                        <th class="th__unit">TÊN ĐƠN VỊ</th>
                        <th class="th__bank-account">SỐ TÀI KHOẢN</th>
                        <th class="th__bank-name">TÊN NGÂN HÀNG</th>
                        <th class="th__branch-bank">CHI NHÁNH TK NGÂN HÀNG</th>
                        <th class="th__is-customer">LÀ KHÁCH HÀNG</th>
                        <th class="th__is-supplier">LÀ NHÀ CUNG CẤP</th>
                        <th class="th__function">CHỨC NĂNG</th>
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
                            <td>{{employee.DateOfBirth}}</td>
                            <td>{{employee.IdentityNumber}}</td>
                            <td>{{employee.IdentityDate}}</td>
                            <td>{{employee.IdentityPlace}}</td>
                            <td>{{employee.EmployeePosition}}</td>
                            <td>{{employee.DepartmentId}}</td>
                            <td>{{employee.DepartmentName}}</td>
                            <td>{{employee.BankAccountNumber}}</td>
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
            
</template>

<script>
    import axios from "axios"
    
    export default {
        name: "TableEmployees",
        created() {
          /**
             * API Get employees
             * Author: doduyhung1292 (08/11/2022)
             */
             axios.get("https://amis.manhnv.net/api/v1/Employees")
                .then(res => this.employees = res.data)
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
      },
        data() {
            return{
                employees: [],
                employeeParent: null,
                rowSelected: -1,
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