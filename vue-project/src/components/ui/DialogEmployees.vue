<template>
    <div class="model">
        <div class="model-content">
            <div class="model-content-header">
                <div class="model-content-header-left">
                    <div class="title">Thông tin nhân viên</div>
                </div>
                <div class="model-content-header-right">
                    <div class="icon-help" title="Trợ giúp"></div>
                    <div class="icon-close btn__close" v-on:click="closeDialogEmployee" title="Đóng"></div>
                </div>
            </div>
            <div class="model-content-main">
                <div class="job-infomation">
                    <div class="display-inline">
                        <div>
                            <label for="id-employee" title="Mã nhân viên">Mã <span style="color: red" ref="employeeCode" >*</span></label><br />
                            <input type="text" id="id-employee" 
                                v-bind:title='titleEmployeeCodeInput' 
                                v-on:blur="employeeCodeInput" 
                                :class="employeeCodeBorder" 
                                v-model="this.emp.EmployeeCode" 
                                ref="employeeCode" 
                                required tabindex="1">
                        </div>
                        <div>
                            <label for="full-name" title="Tên nhân viên">Tên </label><span style="color: red">*</span><br />
                            <input type="text" id="full-name" 
                                v-bind:title='titleEmployeeNameInput' 
                                v-on:blur="fullnameInput" 
                                :class="fullnameBorder" 
                                v-model="this.emp.EmployeeName" required
                                tabindex="2">
                        </div>
                    </div>
                    <div>
                        <label for="unit" title="Đơn vị">Đơn vị </label><span style="color: red">*</span><br />
                        <select name="unit" id="unit" 
                            v-bind:title='titleDepartmentInput' 
                            v-on:blur="departmentInput" 
                            :class="departmentBorder" 
                            v-model="this.emp.DepartmentName" required
                            tabindex="3">
                            <option v-for="(department, index) in allDepartment" :key="index">{{department.DepartmentName}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="job-title" title="Chức danh">Chức danh</label><br />
                        <select name="job-title" id="job-title" 
                            v-model="this.emp.EmployeePosition" 
                            title="Chức danh" 
                            tabindex="4">
                            <option v-for="(position, index) in allPosition" :key="index">{{position.PositionName}}</option>
                        </select>
                    </div>
                </div>
                <div class="personal-infomation">
                    <div class="display-inline">
                        <div>
                            <label for="date-of-birth" title="Ngày sinh">Ngày sinh</label><br />
                            <input type="date" id="date-of-birth" title="Ngày sinh" 
                                    placeholder="DD/MM/YYYY" v-model="this.emp.DateOfBirth" 
                                    tabindex="5">
                        </div>
                        <div>
                            <label for="male" class="label__sex" title="Giới tính">Giới tính</label><br />
                                <div class="display-inline combo-radio-gender">
                                    <div class="radio-sex">
                                        <input type="radio"  title="Nam" id="male" name="sex" 
                                                v-model="this.emp.GenderName" value="Nam" 
                                                tabindex="6">
                                        <label for="male" title="Nam">Nam</label>
                                    </div>
                                    <div class="radio-sex">
                                        <input type="radio"  title="Nữ" id="female" name="sex" v-model="this.emp.GenderName" value="Nữ" >
                                        <label for="female"  title="Nữ">Nữ</label>
                                    </div>
                                    <div class="radio-sex">
                                        <input type="radio" id="other"  title="Khác" name="sex" v-model="this.emp.GenderName" value="Khác" >
                                        <label for="other"  title="Khác">Khác</label>
                                    </div>
                                </div>

                        </div>
                    </div>
                    <div class="display-inline">
                        <div>
                            <label for="identity-number" title="Số chứng minh nhân dân">Số CMND</label><br />
                            <input title="Số chứng minh nhân dân" 
                                type="text" id="identity-number" 
                                v-model="this.emp.IdentityNumber" 
                                tabindex="7">
                        </div>
                        <div>
                            <label for="issue-date" title="Ngày cấp">Ngày cấp</label><br />
                            <input type="date" id="issue-date" title="Ngày cấp" 
                                v-model="this.emp.IdentityDate" placeholder="DD-MM-YYYY" 
                                tabindex="8">
                        </div>
                    </div>
                    <div>
                        <label for="issued-by" title="Nơi cấp">Nơi cấp</label><br />
                        <input type="text" id="issued-by" title="Nơi cấp" 
                            v-model="this.emp.IdentityPlace" 
                            tabindex="9">
                    </div>
                </div>
                <div class="address">
                    <label for="address" title="Địa chỉ">Địa chỉ</label><br />
                    <input type="text" id="address" title="Địa chỉ" 
                        v-model="this.emp.Address" 
                        tabindex="10">
                </div>
                <div class="contact display-inline">
                    <div>
                        <label for="mobile-phone-number" title="Điện thoại di động">ĐT di động</label><br />
                        <input title="Điện thoại di động" type="text" 
                            id="mobile-phone-number" 
                            v-model="this.emp.PhoneNumber" 
                            tabindex="11">
                    </div>
                    <div>
                        <label for="landline-phone-number" title="Điện thoại cố định">ĐT cố định</label><br />
                        <input title="Điện thoại cố định" type="text" 
                            id="landline-phone-number" v-model="this.emp.TelephoneNumber" 
                            tabindex="12">
                    </div>
                    <div>
                        <label for="email" title="Email">Email</label><br />
                        <input type="email" id="email" title="Email" v-model="this.emp.Email" tabindex="13">
                    </div>
                </div>
                <div class="bank-infomation display-inline">
                    <div>
                        <label for="bank-account" title="Tài khoản ngân hàng">Tài khoản ngân hàng</label><br />
                        <input type="text" 
                            title="Tài khoản ngân hàng" id="bank-account" 
                            v-model="this.emp.BankAccountNumber" 
                            tabindex="14">
                    </div>
                    <div>
                        <label for="bank-name" title="Tên ngân hàng">Tên ngân hàng</label><br />
                        <input type="text" id="bank-name" title="Tên ngân hàng" v-model="this.emp.BankName" 
                        tabindex="15">
                    </div>
                    <div>
                        <label for="branch" title="Chi nhánh">Chi nhánh</label><br />
                        <input type="text" id="branch" title="Chi nhánh" v-model="this.emp.BankBranchName" 
                            tabindex="16">
                    </div>
                </div>
            </div>
            <div class="model-content-footer">
                <div class="footer-left">
                    <button class="btn-cancel"  
                        v-on:click="$emit('closeUnCheck')" 
                        title="Hủy" 
                        tabindex="19"
                        v-on:keydown.tab="returnFirstTabIndex">Hủy</button>
                </div>
                <div class="footer-right display-inline">
                    <button class="btn-store" title="Cất"   
                        v-on:click="this.clickStore" 
                        tabindex="17">Cất</button>
                    <button class="btn-save" v-on:click="saveEmployee" 
                        tabindex="18">Cất và {{this.typeModal}}</button>
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
                allPosition: [],
                allDepartment: [],
                serverResponse: {},
                requiredInput: [],
                employeeCodeBorder: null,
                fullnameBorder: null,
                departmentBorder: null,
                showDialogNotice: false,
                titleEmployeeCodeInput: "Mã nhân viên",
                titleEmployeeNameInput: "Tên nhân viên",
                titleDepartmentInput: "Đơn vị"
            }
        },
        created() {
            this.emp = this.employeeEdit;
            if(this.emp.DateOfBirth) {this.emp.DateOfBirth = this.formatDate(this.emp.DateOfBirth)};
            if(this.emp.IdentityDate) {this.emp.IdentityDate = this.formatDate(this.emp.IdentityDate)}
            if(this.emp.EmployeeId) {this.typeModal = "Sửa"} else {this.typeModal = "Thêm"; this.getNewEmployeeCode()}

            /**
             * Get department 
             * Author: doduyhung1292 (22/11/2022)
             */
            axios.get("https://amis.manhnv.net/api/v1/Departments")
                .then(res => {this.allDepartment = res.data})
                .catch(err => console.log(err))
            
            /**
             * Get positon 
             * Author: doduyhung1292 (22/11/2022)
             */
             axios.get("https://amis.manhnv.net/api/v1/Positions")
                .then(res => {this.allPosition = res.data})
                .catch(err => console.log(err))


        },
        methods: {
//Region API
            /**
             * Get new employee code
             * Author: doduyhung1292 (15/11/2022)
             */
             getNewEmployeeCode: function() {
             axios.get("https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode")
                .then(res => {this.emp.EmployeeCode = res.data})
                .catch(err => console.log(err))
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
                            .catch(err => {
                                this.serverResponse = err.response;
                                this.checkResponse();
                                console.log(err)})
                        };
                // Change employee infomation    
                    if (this.typeModal == 'Sửa') {
                        axios.put(`https://amis.manhnv.net/api/v1/Employees/${this.emp.EmployeeId}`, this.emp)
                            .then(res => {this.serverResponse = res; this.checkResponse();})
                            .catch(err => {
                                this.serverResponse = err.response; 
                                this.checkResponse(); 
                                console.log(err)})
                        }
        
                } catch (error) {
                    console.log(error);
                }
            },
            
//End region API
// Region validate

            /**
             * Function validate inputs
             * Author: doduyhung1292 (11/11/2022)
             */

             validateInputs: function() {
                try {
                    if (!this.emp.EmployeeCode) {this.errMsg.push("Mã nhân viên không được để trống")};
                    if (!this.emp.EmployeeName) {this.errMsg.push("Tên nhân viên không được để trống")};
                    if (!this.emp.DepartmentName) {this.errMsg.push("Đơn vị không được để trống")};
                    this.validateEmail(this.emp.Email);
                    console.log(this.errMsg);
                    return
                } catch (error) {
                    console.log(error);
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
             * 
             * Change color border to red if no data in required input
             * Author: doduyhung1292 (11/11/2022)
             */

             employeeCodeInput: function() {
                try {
                    if (!this.emp.EmployeeCode) {this.employeeCodeBorder = 'borderRed'; this.titleEmployeeCodeInput = "Mã nhân viên không được để trống."; console.log(this.titleEmployeeNameInput);} 
                    else {this.employeeCodeBorder = null;  this.titleEmployeeCodeInput = "Mã nhân viên."}
                } catch (error) {
                    console.log(error);
                }
             },

             /**
             * 
             * Change color border to red if no data in required input
             * Author: doduyhung1292 (11/11/2022)
             */
             fullnameInput: function() {
                try {
                    if (!this.emp.EmployeeName) {this.fullnameBorder = 'borderRed';  this.titleEmployeeNameInput = "Tên nhân viên không được để trống."} 
                    else {this.fullnameBorder = null; this.titleEmployeeNameInput = "Tên nhân viên."}
                } catch (error) {
                    console.log(error);
                }
             },

             /**
             * 
             * Change color border to red if no data in required input
             * Author: doduyhung1292 (11/11/2022)
             */
             departmentInput: function() {
                try {
                    if (!this.emp.DepartmentName) {this.departmentBorder = 'borderRed';  this.titleDepartmentInput = "Đơn vị không được để trống."} 
                    else {this.departmentBorder = null;   this.titleDepartmentInput = "Đơn vị."}
                } catch (error) {
                    console.log(error)
                }
             },

             /**
              * Add department id into data 
              * Author: doduyhung1292 (13/11/2022)
              */
              additionalDepartmentId: function() {
                try {
                    for (let depart of this.allDepartment) {
                        if (this.emp.DepartmentName == depart.DepartmentName) {
                            this.emp.DepartmentId = depart.DepartmentId} 
                    }
                } catch (error) {
                    console.log(error);
                }
              },

              /**
             * Formate date
             * Author: doduyhung1292 (10/11/2022)
             */
            formatDate: function(date) {
                try {
                    var dateBirth = new Date(date);
                    var day = dateBirth.getDate();
                    if (day<10) {day = `0${day}`};

                    var month = dateBirth.getMonth() + 1;
                    if(month<10) {month = `0${month}`};

                    var year = dateBirth.getFullYear();

                    return `${year}-${month}-${day}`;
                } catch (error) {
                    console.log(error)
                } 
            },
//End region validate
//Region function
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
             * Close dialog when click button 'Có'
             * Author: doduyhung1292 (20/11/2022)
             */
             clickStore: function() {
                try {
                    this.$emit('clickStore');
                } catch (error) {
                    console.log(error);
                }
            },

            /**
             * Check response
             * Author: doduyhung1292 (13/11/2022)
             */
             checkResponse: function () {
                try {
                    switch (this.serverResponse.status) {
                        case 200:
                            this.$emit('closeUnCheck');
                            this.$emit('showToastModifySuccess', this.emp);
                            break;
                        case 201:
                            this.$emit('closeUnCheck');
                            this.$emit('showToastSaveSuccess', this.emp);
                            break;
                        case 400:
                            this.errMsg = [];
                            this.errMsg.push(this.serverResponse.data.userMsg);
                            this.showDialogNotice = true;
                            break;
                        case 500:
                            this.errMsg.push(this.serverResponse.data.userMsg);
                            this.showDialogNotice = true;
                            break;

                            // Return old employee code if can't change to new employee code
                            //if(this.serverResponse.data.data.SqlState == "23000") {this.emp.EmployeeCode = this.employeeEdit.EmployeeCode; console.log(this.employeeEdit)}
                        default:
                            break;
                    }
                } catch (error) {
                    console.log(error);
                }
            },
//End region function
// Region UI
            /**
             * emit close dialog employee
             * Author: doduyhung1292 (15/11/2022)
             */
             closeDialogEmployee: function() {
                try {
                    if(this.typeModal == "Thêm" && this.emp != {}) {this.$emit('closeCheck', this.emp); return;}
                    if(this.typeModal == "Sửa" && this.emp != this.employeeEdit) {this.$emit('closeCheck', this.emp); return;} 
                        else {this.$emit('closeUnCheck'); return;}
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             *  return to first input in dialog employee
             * Author: doduyhung1292 (22/11/2022)
             */
             returnFirstTabIndex: function() {
                try {
                    this.$refs.employeeCode.focus();
                } catch (error) {
                    console.log(error)
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
// End region UI         
    },
    mounted() {
        this.$refs.employeeCode.focus();
    },
}

</script>

<style scoped>
    @import url(../../css/ui/DialogEmployees.css);
    .borderRed {
        border-color: red;
    }

    .model-content-header__checkbox:focus {
        outline :1px solid red;
    }

    button {
        min-width: 80px;
    }
    .combo-radio-gender {
        margin-top: 9px;
        margin-left: 7px;
    }

    input[type="radio"] {
        margin-right: 1px;
    }
</style>