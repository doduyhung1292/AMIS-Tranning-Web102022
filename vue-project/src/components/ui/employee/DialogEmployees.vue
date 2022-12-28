<template>
    <div class="model">
        <div class="model-content" 
            v-on:keydown.ctrl.enter="saveEmployee('saveAndShowDialog')"
            v-on:keydown.ctrl.shift.enter="saveEmployee('saveAndHideDialog')"
            v-on:keydown.esc="closeDialogEmployee">

            <div class="model-content-header">
                <div class="model-content-header-left">
                    <div class="title">{{this.dialogEmployee.titleDialog}}</div>
                </div>
                <div class="model-content-header-right">
                    <div class="icon-help" :title="this.dialogEmployee.titleIconHelp"></div>
                    <div class="icon-close btn__close" v-on:click="closeDialogEmployee" :title="this.dialogEmployee.titleButtonClose"></div>
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
                            <div class="alert-error" v-if="this.isEmployeeCodeValid == false">{{errorMessage.employeeCodeInvalid}}</div>
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
                            <div class="alert-error" v-if="this.isEmployeeNameValid == false">{{errorMessage.employeeNameInvalid}}</div>
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
                            <option v-for="(department, index) in this.allDepartment">{{department.DepartmentName}}</option>
                        </select>
                        <div class="alert-error" v-if="this.isDepartmentValid == false">{{errorMessage.departmentInvalid}}</div>
                    </div>

                    <div>
                        <label for="job-title" :title="this.dialogEmployee.jobPositionName">
                            {{this.dialogEmployee.jobPositionName}}
                        </label><br />
                        <select name="job-title" id="job-title" 
                            v-model="this.emp.JobPositionName" 
                            :title="this.dialogEmployee.jobPositionName" 
                            tabindex="4">
                            <option v-for="(position, index) in this.allPosition" :key="index">{{position.JobPositionName}}</option>
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
                            <div class="alert-error" v-if="this.isDateOfBirthValid == false">{{errorMessage.dateOfBirthInvalid}}</div>
                        </div>
                        <div>
                            <label for="male" class="label__sex" :title="this.dialogEmployee.gender">
                                {{this.dialogEmployee.gender}}
                            </label><br />
                                <div class="display-inline combo-radio-gender">
                                    <div class="radio-sex">
                                        <input type="radio"  :title="this.dialogEmployee.genderMale" id="male" name="sex" 
                                            tabindex="6" v-model="this.emp.GenderName"
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
                                            value="Khác" name="sex" v-model="this.emp.GenderName">
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
                                v-on:input="formatIdentityNumberLayer1"
                                :class="identityNumberBorder"
                                type="text" id="identity-number" 
                                v-model="this.emp.IdentityNumber" 
                                maxlength="20"
                                tabindex="7">
                            <div class="alert-error" v-if="this.isIdentityNumberValid == false">{{errorMessage.identityNumberInvalid}}</div>
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
                            <div class="alert-error" v-if="this.isIdentityDateValid == false">{{errorMessage.identityDateInvalid}}</div>
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
                            v-on:input="formatPhoneNumberLayer1"
                            :class="this.mobilephoneBorder"
                            id="mobile-phone-number" 
                            v-model="this.emp.PhoneNumber" 
                            maxlength="20"
                            tabindex="11">
                        <div class="alert-error" v-if="this.isPhoneNumberValid == false">{{errorMessage.phoneNumberInvalid}}</div>
                    </div>

                    <div>
                        <label for="landline-phone-number" :title="this.dialogEmployee.titleTelephoneNumber">
                            {{this.dialogEmployee.telephoneNumber}}
                        </label><br />
                        <input :title="this.dialogEmployee.titleTelephoneNumber" type="text" 
                            v-on:blur="validateInputTelephoneNumberTypeNumber"
                            :class="this.telephoneBorder"
                            id="landline-phone-number" 
                            v-on:input="formatTelephoneNumberLayer1"
                            v-model="this.emp.TelephoneNumber" 
                            maxlength="20"
                            tabindex="12">
                        <div class="alert-error" v-if="this.isTelephoneNumberValid == false">{{errorMessage.telephoneNumberInvalid}}</div>
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
                        <div class="alert-error" v-if="this.isEmailValid == false">{{errorMessage.emailInvalid}}</div>
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
                            v-on:input="formatBankAcountNumberLayer1"
                            v-model="this.emp.BankAccountNumber" 
                            maxlength="20"
                            tabindex="14">
                        <div class="alert-error" style="margin:0" v-if="this.isBankAccountNumberValid == false">
                            {{errorMessage.bankAccountNumberInvalid}}
                        </div>
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
    import _ from 'lodash'
    import DialogNotice from '../dialog/DialogNotice.vue'
    import {DialogEmployee, ErrorMessage, GenderName, ModeDialogName} from '../../../resource.js';
    import {GenderEnum} from '../../../enum.js';
    import {validateRequiredInputs, validateEmail} from '../../../js/base/validate.js';
    import {formatDate} from '../../../js/base/common.js';

    export default {
        name: "DialogEmployees",
        components: {DialogNotice},
        props: ["employeeEdit", "mode"],
        data () {
            return {
                emp: {},
                tempEmployeeModeModify: {},
                typeModal: null,
                typeSave: null,
                errMsg: [],
                allPosition: [],
                allDepartment: [],
                serverResponse: {},
                requiredInput: [],
                typeOfSave: null,

                // border input validate
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

                // import from resource
                dialogEmployee: DialogEmployee,
                errorMessage: ErrorMessage,
                genderName: GenderName,
                modeDialogName: ModeDialogName,

                // import from enum
                genderEnum: GenderEnum,

                // check input valid
                isEmployeeCodeValid: true,
                isEmployeeNameValid: true,
                isDepartmentValid: true,
                isDateOfBirthValid: true,
                isIdentityDateValid: true,
                isIdentityNumberValid: true,
                isPhoneNumberValid: true,
                isTelephoneNumberValid: true,
                isEmailValid: true,
                isBankAccountNumberValid: true,
            }
        },
        created() {
            try {
                this.emp = _.cloneDeep(this.employeeEdit);
                this.tempEmployeeModeModify = _.cloneDeep(this.employeeEdit);

                // format Date to dd/mm/yyyy
                if(this.emp.DateOfBirth) {
                    this.emp.DateOfBirth = formatDate(this.emp.DateOfBirth)
                };

                // format Date to dd/mm/yyyy
                if(this.emp.IdentityDate) {
                    this.emp.IdentityDate = formatDate(this.emp.IdentityDate)
                }

                //format to gender name
                if(this.emp.Gender != null) {
                    this.emp.GenderName = this.formatToGenderName(this.emp.Gender)
                }

                //Check mode, set type model
                if(this.emp.EmployeeId && this.mode == "Modify") {
                    this.typeModal = this.modeDialogName.modify
                } 

                if(this.emp.EmployeeId && this.mode == "Clone") {
                    this.typeModal = this.modeDialogName.clone;
                    this.getNewEmployeeCode()
                } 

                if(!this.emp.EmployeeId && this.mode == "AddNew") {
                    this.typeModal = this.modeDialogName.addNew; 
                    this.getNewEmployeeCode()
                }
            } catch (error) {
                console.log(error)
            }
            /**
             * Get department 
             * Author: doduyhung1292 (22/11/2022)
             */
             axios.get("http://localhost:5210/api/v1/Departments")
                .then(res => {this.allDepartment = res.data})
                .catch(err => console.log(err))
            /**
             * Get positon 
             * Author: doduyhung1292 (22/11/2022)
             */
             axios.get("http://localhost:5210/api/v1/JobPositions")
                .then(res => {this.allPosition = res.data; console.log(res);})
                .catch(err => console.log(err))


        },
        methods: {
//Region API
            /**
             * Get new employee code
             * Author: doduyhung1292 (15/11/2022)
             */
             getNewEmployeeCode: function() {
             axios.get("http://localhost:5210/api/v1/Employees/new-code")
                .then(res => {this.emp.EmployeeCode = res.data.MaxEmployeeCode;})
                .catch(err => console.log(err))
            },

            /**
             * Function send api save employee
             * Author: doduyhung1292 (09/11/2022)
             */

             callApiEmployee: function() {
                try {
                this.errMsg = [];
                this.fullnameInput();
                this.departmentInput();
                if (this.isEmployeeNameValid == false) {this.errMsg.push(this.errorMessage.employeeNameInvalid)}
                if (this.isDepartmentValid == false) {this.errMsg.push(this.errorMessage.departmentInvalid)}

                if (this.errMsg.length > 0) {
                        this.showDialogNotice = true;
                    } else {
                        // save new employee infomation
                        if (this.mode == 'AddNew' || this.mode == 'Clone') {
                            axios.post("http://localhost:5210/api/v1/Employees", this.emp)
                                .then(res => {this.serverResponse = res; this.checkResponse();})
                                .catch(err => {
                                    this.serverResponse = err.response;
                                    this.checkResponse();
                                    console.log(err)})
                            };
                        // Change employee infomation    
                        if (this.typeModal == 'Sửa') {
                            axios.put(`http://localhost:5210/api/v1/Employees/${this.emp.EmployeeId}`, this.emp)
                                .then(res => {this.serverResponse = res; console.log(res); this.checkResponse();})
                                .catch(err => {
                                    this.serverResponse = err.response; 
                                    this.checkResponse(); 
                                    console.log(err)})
                        }
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
                    this.isEmailValid = false;
                    this.dialogEmployee.titleEmail = this.dialogEmployee.titleEmailInvalid
                } else {
                    this.emailBorder = null;
                    this.dialogEmployee.titleEmail = this.dialogEmployee.titleEmailValid;
                    this.isEmailValid = true;
                }
            },
            /**
             * Validate input identity date
             * Author: doduyhung1292 (27/11/2022)
             */
             validateIdentityDate: function() {
                if (this.validateDate(this.emp.IdentityDate) == false) {
                        this.identityDateBorder = 'borderRed';
                        this.isIdentityDateValid = false;
                        this.dialogEmployee.titleIdentityDate = this.dialogEmployee.titleIdentityDateInvalid}
                        else {
                            this.identityDateBorder = null;
                            this.dialogEmployee.titleIdentityDate = this.dialogEmployee.titleIdentityDateValid;
                            this.isIdentityDateValid = true;
                        }
             },

              /**
             * Validate input date of birth
             * Author: doduyhung1292 (27/11/2022)
             */
             validateDateOfBirth: function() {
                if (this.validateDate(this.emp.DateOfBirth) == false) {
                        this.dateOfBirthBorder = 'borderRed';
                        this.isDateOfBirthValid = false;
                        this.dialogEmployee.titleDateOfBirth = this.dialogEmployee.titleDateOfBirthInvalid}
                        else {
                            this.dateOfBirthBorder = null;
                            this.dialogEmployee.titleDateOfBirth = this.dialogEmployee.titleDateOfBirthValid;
                            this.isDateOfBirthValid = true;
                        }
             },

            /**
             * Validate number input indentity number type number
             * Author: doduyhung1292 (27/11/2022)
             */
             validateInputIdentityTypeNumber: function() {
                try {
                    if(this.emp.IdentityNumber && this.isNumber(this.emp.IdentityNumber.replace(/ /g, '')) == false) {
                        this.identityNumberBorder = 'borderRed';
                        this.isIdentityNumberValid = false;
                        this.dialogEmployee.titleIdentityNumber = this.dialogEmployee.titleIdentityNumberInvalid} 
                        else {
                        this.identityNumberBorder = null;
                        this.dialogEmployee.titleIdentityNumber = this.dialogEmployee.titleIdentityNumberValid
                        this.isIdentityNumberValid = true;} 
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
                    if(this.emp.PhoneNumber && this.isNumber(this.emp.PhoneNumber.replace(/ /g, '')) == false) {
                        this.mobilephoneBorder = 'borderRed';
                        this.isPhoneNumberValid = false;
                        this.dialogEmployee.titlePhoneNumber =  this.dialogEmployee.titlePhoneNumberInvalid} 
                        else {
                        this.mobilephoneBorder = null;
                        this.isPhoneNumberValid = true;
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
                    if(this.emp.TelephoneNumber && this.isNumber(this.emp.TelephoneNumber.replace(/ /g, '')) == false) {
                        this.telephoneBorder = 'borderRed';
                        this.isTelephoneNumberValid = false;
                        this.dialogEmployee.titleTelephoneNumber = this.dialogEmployee.titleTelephoneNumberInvalid} 
                        else {
                        this.telephoneBorder = null;
                        this.isTelephoneNumberValid = true;
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
                    if(this.isNumber(this.emp.BankAccountNumber && this.emp.BankAccountNumber.replace(/ /g, '')) == false) {
                        this.bankAccountBorder = 'borderRed';
                        this.isBankAccountNumberValid = false;
                        this.dialogEmployee.titleBankAccountNumber = this.dialogEmployee.titleBankAccountNumberInvalid} 
                        else {
                        this.bankAccountBorder = null;
                        this.isBankAccountNumberValid = true;
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
                    if (!this.emp.EmployeeCode) {
                        this.employeeCodeBorder = 'borderRed'; 
                        this.isEmployeeCodeValid = false;
                        this.dialogEmployee.titleEmployeeId = this.dialogEmployee.titleEmployeeIdInvalid;} 
                    else {
                        this.employeeCodeBorder = null;
                        this.isEmployeeCodeValid = true;  
                        this.dialogEmployee.titleEmployeeId = this.dialogEmployee.titleEmployeeIdValid}
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
                    if (!this.emp.EmployeeName) {
                        this.fullnameBorder = 'borderRed';  
                        this.isEmployeeNameValid = false;
                        this.dialogEmployee.titleEmployeeName = this.dialogEmployee.titleEmployeeNameInvalid} 
                    else {
                        this.fullnameBorder = null; 
                        this.dialogEmployee.titleEmployeeName = this.dialogEmployee.titleEmployeeNameValid
                        this.isEmployeeNameValid = true;}
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
                    if (!this.emp.DepartmentName) {
                        this.departmentBorder = 'borderRed';  
                        this.isDepartmentValid = false;
                        this.dialogEmployee.titleDepartment = this.dialogEmployee.titleDepartmentInvalid} 
                    else {
                        this.departmentBorder = null;
                        this.addDepartmentId();
                        this.isDepartmentValid = true;
                        this.dialogEmployee.titleDepartment = this.dialogEmployee.titleDepartmentValid}
                } catch (error) {
                    console.log(error)
                }
             },

             /**
              * Add department id into data 
              * Author: doduyhung1292 (13/11/2022)
              */
              addDepartmentId: function() {
                try {
                    this.allDepartment.forEach(department => {
                        if (this.emp.DepartmentName.trim() == department.DepartmentName.trim()) {
                            this.emp.DepartmentId = department.DepartmentId;
                            return;
                        }
                    });
                    return;
                } catch (error) {
                    console.log(error);
                }
              },

              /**
              * Add department id into data 
              * Author: doduyhung1292 (13/11/2022)
              */
              addJobPositionId: function() {
                try {
                    this.allPosition.forEach(jobPosition => {
                        if (jobPosition.JobPositionName == this.emp.JobPositionName) {
                            this.emp.JobPositionId = jobPosition.JobPositionID;
                        } else {
                            return
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
              },

              /**
               * Format identity number layer 1
               * If type input is number, will return to layer 2 to format number
               * Author: doduyhung1292 (10/12/2022)
               */
               formatIdentityNumberLayer1: function() {
                    try {
                        if(this.isNumber(this.emp.IdentityNumber.replace(/ /g, '')) == true) {
                            this.formatIdentityNumberLayer2();
                        } else {
                            return
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    
              },

              /**
               * Format identity number layer 2
               * Author: doduyhung1292 (10/12/2022)
               */
              formatIdentityNumberLayer2: function() {
                try {
                    if(this.emp.IdentityNumber.charAt(0) == '0' && this.emp.IdentityNumber.length > 1) {
                    this.emp.IdentityNumber = '0' + Number(Number(this.emp.IdentityNumber.replace(/\s/g, ""))).toLocaleString().replace(/,/g, ' ');
                    } else {
                        this.emp.IdentityNumber = Number(Number(this.emp.IdentityNumber.replace(/\s/g, ""))).toLocaleString().replace(/,/g, ' ');
                    }
                } catch (error) {
                    console.log(error)
                }
             },

              /**
               * Format bank number layer 1
               * If input is number will return to layer 2
               * Author: doduyhung1292 (10/12/2022)
               */
               formatBankAcountNumberLayer1: function() {
                    try {
                        if(this.isNumber(this.emp.BankAccountNumber.replace(/ /g, '')) == true) {
                            this.formatBankAcountNumberLayer2();
                        } else {
                            return
                        }
                    } catch (error) {
                        console.log(error)
                    }
              },

              /**
               * Format bank number layer 2
               * Author: doduyhung1292 (10/12/2022)
               */
               formatBankAcountNumberLayer2: function() {
                    try {
                        if(this.emp.BankAccountNumber.charAt(0) == '0' && this.emp.BankAccountNumber.length > 1) {
                            this.emp.BankAccountNumber = '0' + Number(Number(this.emp.BankAccountNumber.replace(/\s/g, ""))).toLocaleString().replace(/,/g, ' ');
                        } else {
                            this.emp.BankAccountNumber = Number(Number(this.emp.BankAccountNumber.replace(/\s/g, ""))).toLocaleString().replace(/,/g, ' ');
                        }
                    } catch (error) {
                        console.log(error)
                    }
              },

              /**
               * Format phone number
               * Author: doduyhung1292 (10/12/2022)
               */
               formatPhoneNumberLayer1: function() {
                    try {
                        if(this.isNumber(this.emp.PhoneNumber.replace(/ /g, '')) == true) {
                            this.formatPhoneNumberLayer2();
                        } else {
                            return
                        }
                    } catch (error) {
                        console.log(error)
                    }
              },

              /**
               * Format phone number
               * Author: doduyhung1292 (10/12/2022)
               */
               formatPhoneNumberLayer2: function() {
                    try {
                        if(this.emp.PhoneNumber.charAt(0) == '0' && this.emp.PhoneNumber.length > 1) {
                            this.emp.PhoneNumber = '0' + Number(Number(this.emp.PhoneNumber.replace(/\s/g, ""))).toLocaleString().replace(/,/g, ' ');
                        } else {
                            this.emp.PhoneNumber = Number(Number(this.emp.PhoneNumber.replace(/\s/g, ""))).toLocaleString().replace(/,/g, ' ');
                        }
                    } catch (error) {
                        console.log(error)
                    }
              },

              /**
               * Format telephone number
               * Author: doduyhung1292 (10/12/2022)
               */
               formatTelephoneNumberLayer1: function() {
                    try {
                        if(this.isNumber(this.emp.TelephoneNumber.replace(/\s/g, "")) == true) {
                        console.log(this.emp.TelephoneNumber);
                        this.formatTelephoneNumberLayer2();
                        } else {
                            return
                        }
                    } catch (error) {
                        console.log(error)
                    }
              },

              /**
               * Format telephone number
               * Author: doduyhung1292 (10/12/2022)
               */
               formatTelephoneNumberLayer2: function() {
                    try {
                        if(this.emp.TelephoneNumber.charAt(0) == '0' && this.emp.TelephoneNumber.length > 1) {
                            this.emp.TelephoneNumber = '0' + Number(Number(this.emp.TelephoneNumber.replace(/\s/g, ""))).toLocaleString().replace(/,/g, ' ');
                        } else {
                            this.emp.TelephoneNumber = Number(Number(this.emp.TelephoneNumber.replace(/\s/g, ""))).toLocaleString().replace(/,/g, ' ');
                        }
                    } catch (error) {
                        console.log(error)
                    }
              },
              /**
               *  Format gender to enum
               * Author: doduyhung1292 (08/12/2022)
               */
               formatGender: function(genderName) {
                    try {
                        switch (genderName) {
                        case this.genderName.male:
                            this.emp.Gender = this.genderEnum.male;
                            break;
                        case this.genderName.female:
                            this.emp.Gender = this.genderEnum.female;
                            break;
                        case this.genderName.other:
                            this.emp.Gender = this.genderEnum.other;
                            break;
                        default:
                            this.emp.Gender = null;
                            break;
                        }
                    } catch (error) {
                        console.log(error);
                    }
               },
               /**
                * Format to gender name
                * Author: doduyhung1292 (09/12/2022)
                */
                formatToGenderName: function(gender) {
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
//End region validate
//Region function
             /**
             * Function save new employee
             * Author: doduyhung1292 (09/11/2022)
             */
            saveEmployee: function(type) {
                try {
                    this.typeOfSave = type;
                    this.typeSave = type;
                    this.errMsg = [];
                    if(this.emp.JobPositionName != null) {this.addJobPositionId();}
                    if(this.emp.GenderName != null) {this.formatGender(this.emp.GenderName)}

                    // check valid input. Push error message to errMsg
                    if (this.isEmployeeCodeValid == false) {this.errMsg.push(this.errorMessage.employeeCodeInvalid)}
                    if (this.isEmployeeNameValid == false) {this.errMsg.push(this.errorMessage.employeeNameInvalid)}
                    if (this.isDepartmentValid == false) {this.errMsg.push(this.errorMessage.departmentInvalid)}
                    if (this.isDateOfBirthValid == false) {this.errMsg.push(this.errorMessage.dateOfBirthInvalid)}
                    if (this.isIdentityDateValid == false) {this.errMsg.push(this.errorMessage.identityDateInvalid)}
                    if (this.isIdentityNumberValid == false) {this.errMsg.push(this.errorMessage.identityNumberInvalid)}
                    if (this.isPhoneNumberValid == false) {this.errMsg.push(this.errorMessage.phoneNumberInvalid)}
                    if (this.isTelephoneNumberValid == false) {this.errMsg.push(this.errorMessage.telephoneNumberInvalid)}
                    if (this.isEmailValid == false) {this.errMsg.push(this.errorMessage.emailInvalid)}
                    if (this.isBankAccountNumberValid == false) {this.errMsg.push(this.errorMessage.bankAccountNumberInvalid)}
                    
                    if (this.errMsg.length > 0) {
                        this.showDialogNotice = true;
                    }
                    else {
                        this.emp.BankAccountNumber = this.emp.PhoneNumber?.replace(/ /g, '');
                        this.emp.IdentityNumber = this.emp.IdentityNumber?.replace(/ /g, '');
                        this.addJobPositionId();
                        this.callApiEmployee();
                    }
                    
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
                            this.$emit('closeUnCheck', this.typeSave);
                            this.$emit('showToastModifySuccess', this.emp);
                            this.$emit('updateTotalRowWhenAddNewSuccess');
                            this.emp = {};
                            this.getNewEmployeeCode();
                            break;
                        case 201:
                            if (this.typeOfSave == 'saveAndHideDialog') {
                                this.$emit('closeUnCheck');
                                // if add new success. server return employeeId and assign to new employee in Frontend
                                this.serverResponse.data? this.emp.EmployeeId = this.serverResponse.data : this.emp;
                                this.$emit('showToastSaveSuccess', this.emp);
                                this.emp = {};
                                this.getNewEmployeeCode();
                            } else {
                                // if add new success. server return employeeId and assign to new employee in Frontend
                                this.serverResponse.data? this.emp.EmployeeId = this.serverResponse.data : this.emp;
                                this.$emit('showToastSaveSuccess', this.emp);
                                this.emp = {};
                                this.getNewEmployeeCode();
                            }                         
                            
                            break;
                        case 400:
                            this.errMsg = [];
                            if (this.serverResponse.data.userMsg != null) {
                                var arrayError = this.serverResponse.data.userMsg;
                                arrayError.map(err => this.errMsg.push(err));
                                this.showDialogNotice = true;
                            }
                            break;
                        case 500:
                            this.errMsg.push(this.serverResponse.data.userMsg);
                            this.showDialogNotice = true;
                            break;
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
                    if(this.mode == "AddNew" && this.emp != {}) {this.$emit('closeCheck', 'AddNew' , this.emp); return;}
                    if(this.mode == "Modify" && this.emp != this.tempEmployeeModeModify) {this.$emit('closeCheck', 'Modify' ,this.emp); return;} 
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