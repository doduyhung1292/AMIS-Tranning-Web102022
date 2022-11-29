<template>
    <div class="model">
        <div class="model-content">
            <div class="model-content-header">
                <div class="model-content-header-left">
                    <div class="title">{{this.dialogEmployee.titleDialog}}</div>
                </div>
                <div class="model-content-header-right">
                    <div class="icon-help" :title="this.dialogEmployee.titleIconHelp"></div>
                    <div class="icon-close btn__close" v-on:click="closeDialogEmployee" :title="this.dialogEmployee.titleIconCloseDialog"></div>
                </div>
            </div>
            <div class="model-content-main">
                <div class="job-infomation">
                    <div class="display-inline">
                        <div>
                            <label for="id-employee" :title="this.dialogEmployee.titleEmployeeId">
                                {{this.dialogEmployee.employeeId}} 
                                <span style="color: red" ref="employeeCode" >*</span>
                            </label><br />
                            <input type="text" id="id-employee" 
                                v-bind:title='this.dialogEmployee.titleEmployeeId' 
                                v-on:blur="employeeCodeInput" 
                                :class="employeeCodeBorder" 
                                v-model="this.emp.EmployeeCode" 
                                ref="employeeCode" 
                                required tabindex="1">
                        </div>
                        <div>
                            <label for="full-name" :title="this.dialogEmployee.titleEmployeeName">
                                {{this.dialogEmployee.employeeName}} 
                            </label>
                            <span style="color: red">*</span><br />
                            <input type="text" id="full-name" 
                                v-bind:title='this.dialogEmployee.titleEmployeeName' 
                                v-on:blur="fullnameInput" 
                                :class="fullnameBorder" 
                                v-model="this.emp.EmployeeName" required
                                tabindex="2">
                        </div>
                    </div>
                    <div>
                        <label for="unit" :title="this.dialogEmployee.departmentName">
                            {{this.dialogEmployee.departmentName}}</label>
                        <span style="color: red">*</span><br />
                        <select name="unit" id="unit" 
                            v-bind:title='this.dialogEmployee.titleDepartment' 
                            v-on:blur="departmentInput" 
                            :class="departmentBorder" 
                            v-model="this.emp.DepartmentName" required
                            tabindex="3">
                            <option v-for="(department, index) in allDepartment" :key="index">{{department.DepartmentName}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="job-title" :title="this.dialogEmployee.positionName">
                            {{this.dialogEmployee.positionName}}
                        </label><br />
                        <select name="job-title" id="job-title" 
                            v-model="this.emp.EmployeePosition" 
                            :title="this.dialogEmployee.positionName" 
                            tabindex="4">
                            <option v-for="(position, index) in allPosition" :key="index">{{position.PositionName}}</option>
                        </select>
                    </div>
                </div>
                <div class="personal-infomation">
                    <div class="display-inline">
                        <div>
                            <label for="date-of-birth" :title="this.dialogEmployee.dateOfBirth">
                                {{this.dialogEmployee.dateOfBirth}}
                            </label><br />
                            <input type="date" id="date-of-birth" 
                                    :title="this.dialogEmployee.titleDateOfBirth" 
                                    placeholder="DD/MM/YYYY" 
                                    v-model="this.emp.DateOfBirth" 
                                    :class="this.dateOfBirthBorder"
                                    v-on:blur="validateDateOfBirth"
                                    tabindex="5">
                        </div>
                        <div>
                            <label for="male" class="label__sex" :title="this.dialogEmployee.gender">
                                {{this.dialogEmployee.gender}}
                            </label><br />
                                <div class="display-inline combo-radio-gender">
                                    <div class="radio-sex">
                                        <input type="radio"  :title="this.dialogEmployee.genderMale" id="male" name="sex" 
                                            tabindex="6" v-model="this.emp.genderMale"
                                            value="Nam">
                                        <label for="male"  :title="this.dialogEmployee.genderMale"> 
                                            {{this.dialogEmployee.genderMale}}
                                        </label>
                                    </div>
                                    <div class="radio-sex">
                                        <input type="radio"  
                                            :title="this.dialogEmployee.genderFemale" 
                                            value="Nữ" id="female" name="sex" v-model="this.emp.GenderName">
                                        <label for="female"  :title="this.dialogEmployee.genderFemale"> 
                                            {{this.dialogEmployee.genderFemale}}</label>
                                    </div>
                                    <div class="radio-sex">
                                        <input type="radio" id="other"  
                                            :title="this.dialogEmployee.otherGender" 
                                            value="Other" name="sex" v-model="this.emp.GenderName">
                                        <label for="other"  :title="this.dialogEmployee.otherGender"> 
                                            {{this.dialogEmployee.otherGender}}
                                        </label>
                                    </div>
                                </div>

                        </div>
                    </div>
                    <div class="display-inline">
                        <div>
                            <label for="identity-number" :title="this.dialogEmployee.titleIdentityNumber"> 
                                {{this.dialogEmployee.identityNumber}}
                            </label><br />
                            <input :title="this.dialogEmployee.titleIdentityNumber" 
                                v-on:blur="validateInputIdentityTypeNumber" 
                                :class="identityNumberBorder"
                                type="text" id="identity-number" 
                                v-model="this.emp.IdentityNumber" 
                                tabindex="7">
                        </div>
                        <div>
                            <label for="issue-date" :title="this.dialogEmployee.identityDate">
                                {{this.dialogEmployee.identityDate}}
                            </label><br />
                            <input type="date" id="issue-date" :title="this.dialogEmployee.titleIdentityDate" 
                                v-model="this.emp.IdentityDate"
                                :class="this.identityDateBorder"
                                v-on:blur="validateIdentityDate"
                                tabindex="8">
                        </div>
                    </div>
                    <div>
                        <label for="issued-by" :title="this.dialogEmployee.identityBy">
                            {{this.dialogEmployee.identityBy}}
                        </label><br />
                        <input type="text" id="issued-by" :title="this.dialogEmployee.identityBy" 
                            v-model="this.emp.IdentityPlace" 
                            tabindex="9">
                    </div>
                </div>
                <div class="address">
                    <label for="address" :title="this.dialogEmployee.address">
                        {{this.dialogEmployee.address}}
                    </label><br />
                    <input type="text" id="address" :title="this.dialogEmployee.address"
                        v-model="this.emp.Address" 
                        tabindex="10">
                </div>
                <div class="contact display-inline">
                    <div>
                        <label for="mobile-phone-number" :title="this.dialogEmployee.titlePhoneNumber">
                            {{this.dialogEmployee.phoneNumber}}
                        </label><br />
                        <input :title="this.dialogEmployee.titlePhoneNumber" type="text" 
                            v-on:blur="validateInputMobilePhoneTypeNumber"
                            :class="this.mobilephoneBorder"
                            id="mobile-phone-number" 
                            v-model="this.emp.PhoneNumber" 
                            tabindex="11">
                    </div>
                    <div>
                        <label for="landline-phone-number" :title="this.dialogEmployee.titleTelephoneNumber">
                            {{this.dialogEmployee.telephoneNumber}}
                        </label><br />
                        <input :title="this.dialogEmployee.titleTelephoneNumber" type="text" 
                            v-on:blur="validateInputTelephoneNumberTypeNumber"
                            :class="this.telephoneBorder"
                            id="landline-phone-number" 
                            v-model="this.emp.TelephoneNumber" 
                            tabindex="12">
                    </div>
                    <div>
                        <label for="email" :title="this.dialogEmployee.email">
                            {{this.dialogEmployee.email}}
                        </label><br />
                        <input type="email" id="email" 
                                :title="this.dialogEmployee.titleEmail" 
                                v-model="this.emp.Email" 
                                v-on:blur="validateInputEmail"
                                :class="emailBorder" tabindex="13">
                    </div>
                </div>
                <div class="bank-infomation display-inline">
                    <div>
                        <label for="bank-account" :title="this.dialogEmployee.bankAccountNumber">
                            {{this.dialogEmployee.bankAccountNumber}}
                        </label><br />
                        <input type="text" 
                            :title="this.dialogEmployee.titleBankAccountNumber" 
                            id="bank-account" 
                            :class="this.bankAccountBorder"
                            v-on:blur="validateInputBankAccountTypeNumber"
                            v-model="this.emp.BankAccountNumber" 
                            tabindex="14">
                    </div>
                    <div>
                        <label for="bank-name" :title="this.dialogEmployee.bankName">
                            {{this.dialogEmployee.bankName}}
                        </label><br />
                        <input type="text" id="bank-name" 
                            :title="this.dialogEmployee.bankName"
                            v-model="this.emp.BankName" 
                            tabindex="15">
                    </div>
                    <div>
                        <label for="branch" :title="this.dialogEmployee.bankBranchName">
                            {{this.dialogEmployee.bankBranchName}}
                        </label><br />
                        <input type="text" id="branch" :title="this.dialogEmployee.bankBranchName"
                             v-model="this.emp.BankBranchName" 
                            tabindex="16">
                    </div>
                </div>
            </div>
            <div class="model-content-footer">
                <div class="footer-left">
                    <button class="btn-cancel"  
                        v-on:click="$emit('closeUnCheck')" 
                        :title="this.dialogEmployee.buttonCacel" 
                        tabindex="19"
                        v-on:keydown.tab="returnFirstTabIndex">
                        {{this.dialogEmployee.buttonCacel}}
                    </button>
                </div>
                <div class="footer-right display-inline">
                    <button class="btn-store" :title="this.dialogEmployee.buttonStore"   
                        v-on:click="saveEmployee('saveAndHideDialog')" 
                        tabindex="17">
                        {{this.dialogEmployee.buttonStore}}
                    </button>
                    <button class="btn-save" 
                        v-on:click="saveEmployee('saveAndShowDialog')" 
                        :title="this.dialogEmployee.titleButtonSave"
                        tabindex="18">
                        {{this.dialogEmployee.buttonSave}} {{this.typeModal}}
                    </button>
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
    import DialogNotice from '../dialog/DialogNotice.vue'
    import {DialogEmployee} from '../../../resource.js';
    import {validateRequiredInputs, validateEmail} from '../../../js/base/validate.js';
    import {formatDate} from '../../../js/base/common.js';

    export default {
        name: "DialogEmployees",
        components: {DialogNotice},
        props: ["employeeEdit"],
        data () {
            return {
                emp: {},
                tempEmployeeModeModify: {},
                typeModal: null,
                errMsg: [],
                allPosition: [],
                allDepartment: [],
                serverResponse: {},
                requiredInput: [],
                typeOfSave: null,

                employeeCodeBorder: null,
                bankAccountBorder: null,
                telephoneBorder: null,
                mobilephoneBorder: null,
                identityNumberBorder: null,
                fullnameBorder: null,
                departmentBorder: null,
                identityDateBorder: null,
                dateOfBirthBorder: null,
                emailBorder: null,

                showDialogNotice: false,
                dialogEmployee: DialogEmployee,
            }
        },
        created() {
            this.emp = this.employeeEdit;
            this.tempEmployeeModeModify = this.employeeEdit;
            if(this.emp.DateOfBirth) {this.emp.DateOfBirth = formatDate(this.emp.DateOfBirth)};
            if(this.emp.IdentityDate) {this.emp.IdentityDate = formatDate(this.emp.IdentityDate)}
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
             *  Validate email
             * Author: doduyhung1292 (27/11/2022)
             */
             validateEmail: function(e) {
                try {
                    if(!e) {return true}
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
                    return true
                    } else {
                    return false
                    } 
                } catch (error) {
                    console.log(error);
                }
            },
            /**
             * Check type of input
             * Author: doduyhung1292 (27/11/2022)
             */
             isNumber: function(n) {
                 try {
                    if (n == null) {return}
                    return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
                 } catch (error) {
                    console.log(error)
                 }
                }, 
            /**
             * Validate date input
             * Author: doduyhung1292 (27/11/2022)
             */
            validateDate: function(input) {
                try {
                    var dateInput = new Date(input);
                    var dayInput = dateInput.getDate();
                    var monthInput = dateInput.getMonth() + 1;
                    var yearInput = dateInput.getFullYear();

                    var dateNow = new Date();
                    var dayNow = dateNow.getDate();
                    var monthNow = dateNow.getMonth() + 1;
                    var yearNow = dateNow.getFullYear();

                    if (yearInput > yearNow) {return false}
                    if ((yearInput == yearNow) && (monthInput > monthNow)) {return false}
                    if ((yearInput == yearNow) && (monthInput == monthNow) && (dayInput > dayNow)) {return false}

                    return true
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Validate email
             * Author: doduyhung1292 (27/11/2022)
             */
            validateInputEmail: function() {
                if(this.validateEmail(this.emp.Email) == false) {
                    this.emailBorder = 'borderRed';
                    this.dialogEmployee.titleEmail = this.dialogEmployee.titleEmailInvalid
                } else {
                    this.emailBorder = null;
                    this.dialogEmployee.titleEmail = this.dialogEmployee.titleEmailValid
                }
            },
            /**
             * Validate input identity date
             * Author: doduyhung1292 (27/11/2022)
             */
             validateIdentityDate: function() {
                if (this.validateDate(this.emp.IdentityDate) == false) {
                        this.identityDateBorder = 'borderRed';
                        this.dialogEmployee.titleIdentityDate = this.dialogEmployee.titleIdentityDateInvalid}
                        else {
                            this.identityDateBorder = null;
                            this.dialogEmployee.titleIdentityDate = this.dialogEmployee.titleIdentityDateValid
                        }
             },

              /**
             * Validate input date of birth
             * Author: doduyhung1292 (27/11/2022)
             */
             validateDateOfBirth: function() {
                if (this.validateDate(this.emp.DateOfBirth) == false) {
                        this.dateOfBirthBorder = 'borderRed';
                        this.dialogEmployee.titleDateOfBirth = this.dialogEmployee.titleDateOfBirthInvalid}
                        else {
                            this.dateOfBirthBorder = null;
                            this.dialogEmployee.titleDateOfBirth = this.dialogEmployee.titleDateOfBirthValid
                        }
             },

            /**
             * Validate number input indentity number type number
             * Author: doduyhung1292 (27/11/2022)
             */
             validateInputIdentityTypeNumber: function() {
                try {
                    if(this.isNumber(this.emp.IdentityNumber) == false) {
                        this.identityNumberBorder = 'borderRed';
                        this.dialogEmployee.titleIdentityNumber = this.dialogEmployee.titleIdentityNumberInvalid} 
                        else {
                        this.identityNumberBorder = null;
                        this.dialogEmployee.titleIdentityNumber = this.dialogEmployee.titleIdentityNumberValid} 
                } catch (error) {
                    console.log(error)
                }
             },

             /**
             * Validate number input mobile phone number type number
             * Author: doduyhung1292 (27/11/2022)
             */
             validateInputMobilePhoneTypeNumber: function() {
                try {
                    if(this.isNumber(this.emp.PhoneNumber) == false) {
                        this.mobilephoneBorder = 'borderRed';
                        this.dialogEmployee.titlePhoneNumber =  this.dialogEmployee.titlePhoneNumberInvalid} 
                        else {
                        this.mobilephoneBorder = null;
                        this.dialogEmployee.titlePhoneNumber = this.dialogEmployee.titlePhoneNumberValid} 
                } catch (error) {
                    console.log(error)
                }
             },

             /**
             * Validate number input telephone number type number
             * Author: doduyhung1292 (27/11/2022)
             */
             validateInputTelephoneNumberTypeNumber: function() {
                try {
                    if(this.isNumber(this.emp.TelephoneNumber) == false) {
                        this.telephoneBorder = 'borderRed';
                        this.dialogEmployee.titleTelephoneNumber = this.dialogEmployee.titleTelephoneNumberInvalid} 
                        else {
                        this.telephoneBorder = null;
                        this.dialogEmployee.titleTelephoneNumber = this.dialogEmployee.titleTelephoneNumberValid} 
                } catch (error) {
                    console.log(error)
                }
             },

             /**
             * Validate number input bank number type number
             * Author: doduyhung1292 (27/11/2022)
             */
             validateInputBankAccountTypeNumber: function() {
                try {
                    if(this.isNumber(this.emp.BankAccountNumber) == false) {
                        this.bankAccountBorder = 'borderRed';
                        this.dialogEmployee.titleBankAccountNumber = this.dialogEmployee.titleBankAccountNumberInvalid} 
                        else {
                        this.bankAccountBorder = null;
                        this.dialogEmployee.titleBankAccountNumber =  this.dialogEmployee.titleBankAccountNumberValid} 
                } catch (error) {
                    console.log(error)
                }
             },
            /**
             * 
             * Change color border to red if no data in required input
             * Author: doduyhung1292 (11/11/2022)
             */

             employeeCodeInput: function() {
                try {
                    if (!this.emp.EmployeeCode) {this.employeeCodeBorder = 'borderRed'; this.dialogEmployee.titleEmployeeId = this.dialogEmployee.titleEmployeeIdInvalid;} 
                    else {this.employeeCodeBorder = null;  this.dialogEmployee.titleEmployeeId = this.dialogEmployee.titleEmployeeIdValid}
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
                    if (!this.emp.EmployeeName) {this.fullnameBorder = 'borderRed';  this.dialogEmployee.titleEmployeeName = this.dialogEmployee.titleEmployeeNameInvalid} 
                    else {this.fullnameBorder = null; this.dialogEmployee.titleEmployeeName = this.dialogEmployee.titleEmployeeNameValid}
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
                    if (!this.emp.DepartmentName) {this.departmentBorder = 'borderRed';  this.dialogEmployee.titleDepartment = this.dialogEmployee.titleDepartmentInvalid} 
                    else {this.departmentBorder = null;   this.dialogEmployee.titleDepartment = this.dialogEmployee.titleDepartmentValid}
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
//End region validate
//Region function
             /**
             * Function save new employee
             * Author: doduyhung1292 (09/11/2022)
             */
            saveEmployee: function(type) {
                try {
                    this.typeOfSave = type;
                    this.errMsg = [];

                    // Check input required
                    validateRequiredInputs(this.emp.EmployeeCode, this.emp.EmployeeName, this.emp.DepartmentName)? this.errMsg = validateRequiredInputs(this.emp.EmployeeCode, this.emp.EmployeeName, this.emp.DepartmentName) : this.errMsg = [];

                    // validate email
                    validateEmail(this.emp.Email)? this.errMsg.push(validateEmail(this.emp.Email)) : this.errMsg;

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
                            this.$emit('updateTotalRowWhenAddNewSuccess');
                            this.emp = {};
                            break;
                        case 201:
                            if (this.typeOfSave == 'saveAndHideDialog') {
                                this.$emit('closeUnCheck');
                                this.emp = {};
                                this.$emit('showToastSaveSuccess', this.emp);
                                this.getNewEmployeeCode();
                        }   else {
                                this.emp = {};
                                this.$emit('showToastSaveSuccess', this.emp);
                                this.getNewEmployeeCode();
                        }                         
                            
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
                            this.errMsg.push(this.dialogEmployee.serverErrorDefault);
                            this.showDialogNotice = true;
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
                    if(this.typeModal == "Sửa" && this.emp != this.tempEmployeeModeModify) {this.$emit('closeCheck', this.emp); return;} 
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
    @import url(../../../css/ui/employee/DialogEmployees.css);
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