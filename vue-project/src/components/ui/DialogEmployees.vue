<template>
    <div class="model">
        <div class="model-content">
            <div class="model-content-header">
                <div class="model-content-header-left">
                    <div class="title">Thông tin nhân viên</div>
                    <div class="model-content-header__checkbox">
                        <input type="checkbox">
                        <div>Là khách hàng</div>
                    </div>
                    <div class="model-content-header__checkbox">
                        <input type="checkbox">
                        <div>Là nhà cung cấp</div>
                    </div>
                </div>
                <div class="model-content-header-right">
                    <div class="icon-help" title="Trợ giúp"></div>
                    <div class="icon-close btn__close" v-on:click="$emit('closeCheck')" title="Đóng"></div>
                </div>
            </div>
            <div class="model-content-main">
                <div class="job-infomation">
                    <div class="display-inline">
                        <div>
                            <label for="id-employee">Mã <span style="color: red">*</span></label><br />
                            <input type="text" id="id-employee" v-on:blur="employeeCodeInput" :class="employeeCodeBorder" v-model="this.emp.EmployeeCode" ref="employeeCode"  required>
                        </div>
                        <div>
                            <label for="full-name">Tên </label><span style="color: red">*</span><br />
                            <input type="text" id="full-name" v-on:blur="fullnameInput" :class="fullnameBorder" v-model="this.emp.EmployeeName"  required>
                        </div>
                    </div>
                    <div>
                        <label for="unit">Đơn vị </label><span style="color: red">*</span><br />
                        <select name="unit" id="unit" v-on:blur="departmentInput" :class="departmentBorder" v-model="this.emp.DepartmentName" required>
                            <option>Phòng nhân sự</option>
                            <option>Phòng tuyển sinh</option>
                            <option>Phòng sản xuất</option>
                            <option>Phòng đào tạo</option>
                        </select>
                    </div>
                    <div>
                        <label for="job-title">Chức danh</label><br />
                        <input type="text" id="job-title" v-model="this.emp.EmployeePosition">
                    </div>
                </div>
                <div class="personal-infomation">
                    <div class="display-inline">
                        <div>
                            <label for="date-of-birth">Ngày sinh</label><br />
                            <input type="date" id="date-of-birth" placeholder="DD/MM/YYYY" v-model="this.emp.DateOfBirth">
                        </div>
                        <div>
                            <label for="male" class="label__sex">Giới tính</label><br />
                                <div class="display-inline">
                                    <div class="radio-sex">
                                        <input type="radio" id="male" name="sex" v-model="this.emp.GenderName" value="Nam">
                                        <label for="male">Nam</label>
                                    </div>
                                    <div class="radio-sex">
                                        <input type="radio" id="female" name="sex" v-model="this.emp.GenderName" value="Nữ">
                                        <label for="female">Nữ</label>
                                    </div>
                                    <div class="radio-sex">
                                        <input type="radio" id="other" name="sex" v-model="this.emp.GenderName" value="Khác">
                                        <label for="other">Khác</label>
                                    </div>
                                </div>

                        </div>
                    </div>
                    <div class="display-inline">
                        <div>
                            <label for="identity-number" title="Số chứng minh nhân dân">Số CMND</label><br />
                            <input @keypress="validateNumber" type="text" id="identity-number" v-model="this.emp.IdentityNumber">
                        </div>
                        <div>
                            <label for="issue-date">Ngày cấp</label><br />
                            <input type="date" id="issue-date" v-model="this.emp.IdentityDate" placeholder="DD/MM/YYYY">
                        </div>
                    </div>
                    <div>
                        <label for="issued-by">Nơi cấp</label><br />
                        <input type="text" id="issued-by" v-model="this.emp.IdentityPlace">
                    </div>
                </div>
                <div class="address">
                    <label for="address">Địa chỉ</label><br />
                    <input type="text" id="address" v-model="this.emp.Address">
                </div>
                <div class="contact display-inline">
                    <div>
                        <label for="mobile-phone-number" title="Điện thoại di động">ĐT di động</label><br />
                        <input @keypress="validateNumber" type="text" id="mobile-phone-number" v-model="this.emp.PhoneNumber">
                    </div>
                    <div>
                        <label for="landline-phone-number" title="Điện thoại cố định">ĐT cố định</label><br />
                        <input @keypress="validateNumber" type="text" id="landline-phone-number" v-model="this.emp.TelephoneNumber">
                    </div>
                    <div>
                        <label for="email">Email</label><br />
                        <input type="email" id="email" v-model="this.emp.Email">
                    </div>
                </div>
                <div class="bank-infomation display-inline">
                    <div>
                        <label for="bank-account">Tài khoản ngân hàng</label><br />
                        <input @keypress="validateNumber" type="text" id="bank-account" v-model="this.emp.BankAccountNumber">
                    </div>
                    <div>
                        <label for="bank-name">Tên ngân hàng</label><br />
                        <input type="text" id="bank-name" v-model="this.emp.BankName">
                    </div>
                    <div>
                        <label for="branch">Chi nhánh</label><br />
                        <input type="text" id="branch" v-model="this.emp.BankBranchName">
                    </div>
                </div>
            </div>
            <div class="model-content-footer">
                <div class="footer-left">
                    <button class="btn-cancel"  v-on:click="$emit('closeUnCheck')">Hủy</button>
                </div>
                <div class="footer-right display-inline">
                    <button class="btn-store">Cất</button>
                    <button class="btn-save" v-on:click="saveEmployee">Cất và {{this.typeModal}}</button>
                </div>
            </div>
        </div>
    </div>
    <DialogNotice :errMsg = "this.errMsg" 
                  v-if="this.showDialogNotice"
                  v-on:closeDialogNotice="closeDialogNotice"/>
</template>

<script>
    import axios from 'axios'
    import DialogNotice from './DialogNotice.vue'

    export default {
        name: "DialogEmployees",
        components: {DialogNotice},
        props: ["employeeEdit"],
        data () {
            return {
                emp: {},
                typeModal: null,
                errMsg: [],
                serverResponse: {},
                requiredInput: [],
                employeeCodeBorder: null,
                fullnameBorder: null,
                departmentBorder: null,
                showDialogNotice: false,
            }
        },
        created() {
            this.emp = this.employeeEdit;
            if(this.emp.DateOfBirth) {this.emp.DateOfBirth = this.formatDate(this.emp.DateOfBirth)};
            if(this.emp.IdentityDate) {this.emp.IdentityDate = this.formatDate(this.emp.IdentityDate)}
            this.emp.EmployeeId? this.typeModal = "Sửa": this.typeModal = "Thêm";
        },
        methods: {
            /**
             * 
             * Change color border to red if no data in required input
             * Author: doduyhung1292 (11/11/2022)
             */

             employeeCodeInput: function() {
                if (!this.emp.EmployeeCode) {this.employeeCodeBorder = 'borderRed'} else {this.employeeCodeBorder = null}
             },

             fullnameInput: function() {
                if (!this.emp.EmployeeName) {this.fullnameBorder = 'borderRed'} else {this.fullnameBorder = null}
             },

             departmentInput: function() {
                if (!this.emp.DepartmentName) {this.departmentBorder = 'borderRed'} else {this.departmentBorder = null}
             },

            /**
             * Formate date
             * Author: doduyhung1292 (10/11/2022)
             */
            formatDate: function(date) {
                try {
                    var dateBirth = new Date(date);
                    var day = dateBirth.getDay();
                    if (day<10) {day = `0${day}`};

                    var month = dateBirth.getMonth() + 1;
                    if(month<10) {month = `0${month}`};

                    var year = dateBirth.getFullYear();

                    return `${year}-${month}-${day}`;
                } catch (error) {
                    console.log(error)
                } 
            },
            /**
             * 
             * Only accept input type = number
             * Author: doduyhung1292 (11/11/2022)
             */
            validateNumber: (event) => {
                let keyCode = event.keyCode;
                if (keyCode < 48 || keyCode > 57) {
                    event.preventDefault();
                }
            },

            /**
             * 
             * Validate email
             * Author: doduyhung1292 (11/11/2022)
             */

            validateEmail: function(e) {
                try {
                    if(!e) {return}
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
                    return
                    } else {
                        this.errMsg.push("Email không hợp lệ.")
                    } 
                } catch (error) {
                    console.log(error);
                }
            },
            /**
             * Function save new employee
             * Author: doduyhung1292 (09/11/2022)
             */
            saveEmployee: function() {
                try {
                    this.errMsg = [];
                    this.validateInputs();
                    if (this.errMsg.length > 0) {
                        this.showDialogNotice = true;
                    } else {
                        this.additionalDepartmentId();
                        this.callApiEmployee();};
                } catch (error) {
                    console.log(error);
                }
            },
            /**
             * Function validate inputs
             * Author: doduyhung1292 (11/11/2022)
             */

             validateInputs: function() {
                try {
                    if (!this.emp.EmployeeCode) {this.errMsg.push("Mã nhân viên không được bỏ trống")};
                    if (!this.emp.EmployeeName) {this.errMsg.push("Tên nhân viên không được bỏ trống")};
                    if (!this.emp.DepartmentName) {this.errMsg.push("Đơn vị không được bỏ trống")};
                    this.validateEmail(this.emp.Email);
                    console.log(this.errMsg);
                    return
                } catch (error) {
                    console.log(error);
                }
             },

             /**
             * Function send api save employee
             * Author: doduyhung1292 (09/11/2022)
             */

             callApiEmployee: function() {
                try {
                // save new employee infomation
                    if (this.typeModal == 'Thêm') {
                        axios.post("https://amis.manhnv.net/api/v1/Employees", this.emp)
                            .then(res => {this.serverResponse = res; this.checkResponse();})
                            .catch(err => console.log(err))
                        };
                // Change employee infomation    
                    if (this.typeModal == 'Sửa') {
                        axios.put(`https://amis.manhnv.net/api/v1/Employees/${this.emp.EmployeeId}`, this.emp)
                            .then(res => {this.serverResponse = res; this.checkResponse();})
                            .catch(err => console.log(err))
                        }
        
                } catch (error) {
                    console.log(error);
                }
            },

            /**
             * Check response
             * Author: doduyhung1292 (13/11/2022)
             */
             checkResponse: function () {
                switch (this.serverResponse.status) {
                        case 200:
                            this.$emit('closeUnCheck');
                            this.$emit('showToastSuccess');
                            break;
                        case 201:
                            this.$emit('closeUnCheck');
                            this.$emit('showToastSuccess');
                        default:
                            break;
                    }
            },

            /**
             * Hide dialog notice
             * Author: doduyhung1292 (13/11/2022)
             */

             closeDialogNotice: function() {
                try {
                    this.showDialogNotice = false;
                } catch (error) {
                    console.log(error);
                }
             },

             /**
              * Add department id into data 
              * Author: doduyhung1292 (13/11/2022)
              */
              additionalDepartmentId: function() {
                try {
                   
                    switch (this.emp.DepartmentName) {
                        case "Phòng tuyển sinh":
                            this.emp.DepartmentId = "17120d02-6ab5-3e43-18cb-66948daf6128";
                            break;
                        case "Phòng nhân sự":
                            this.emp.DepartmentId = "142cb08f-7c31-21fa-8e90-67245e8b283e";
                            break;
                        case "Phòng sản xuất":
                            this.emp.DepartmentId = "469b3ece-744a-45d5-957d-e8c757976496";
                            break;
                        case "Phòng đào tạo":
                            this.emp.DepartmentId = "4e272fc4-7875-78d6-7d32-6a1673ffca7c";
                            break;
                        default:
                            break;
                    };
                } catch (error) {
                    console.log(error);
                }
              }
    },
    mounted() {
        this.$refs.employeeCode.focus();
    },
}
</script>

<style>
    @import url(../../css/ui/DialogEmployees.css);
    .borderRed {
        border-color: red;
    }
</style>