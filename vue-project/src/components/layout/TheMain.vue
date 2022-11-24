<template>
    <div class="main">
        <div class="main-header">
            <div class="main-header__left">
                <div class="main-header__name">Nhân viên</div>
            </div>
            <div class="main-header__right">
                <button class="btn__add-new" v-on:click="showModalEdit(this.tempEmp)">Thêm mới nhân viên</button>
            </div>
        </div>
        <div class="main-content-toolbar">
                <div class="display-inline toolbar-right">
                    <input type="text" class="input-search" placeholder="Tìm theo mã, tên nhân viên"  
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
                    <div class="icon-reload" title="Lấy lại dữ liệu." v-on:click="reloadPage"></div>
                </div>
        </div>
        <div class="main-content">
            <TableEmployees v-on:showModal="showModalEdit" 
                            v-on:showToastDeleteSuccess="showToastDeleteSuccess"
                            v-on:getEmployeeLength="getEmployeeLength"
                            :numberPerPage = "this.numberPerPage"
                            :pageSelected = "this.pageSelected"
                            :newEmployee = "this.newEmployee"
                            :modifyEmployee = "this.modifyEmployee"                            
                            :informationSearchEmployee = "this.informationSearchEmployee"/>
                            <div class="container-footer">
            <div class="main-paging-left content-footer--right">{{this.theMainContent.mainContentPaging.total}} {{this.numberEmployee}} {{this.theMainContent.mainContentPaging.record}}</div>
                <div class="main-paging-right">
                    <div class="select-paging">
                        <div class="content-footer--right">{{this.theMainContent.mainContentPaging.recordPerPage}}</div>
                        <select v-model="this.numberPerPage">
                            <option v-for="(number, index) in this.theMainContent.mainContentPaging.numberPerPage" :key="index">{{number}}</option>
                        </select>
                    </div>
                    <div class="number-paging">
                        <div class="content-footer--right numberRecords">1 - 4 {{this.theMainContent.mainContentPaging.record}}</div>
                        <button class="icon-next" v-on:click="changePage(pageSelected - 1)"></button>
                        <button class="icon-previous" v-on:click="changePage(pageSelected + 1)"></button>
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
                    :employeeEdit="this.employeeEdit"
                />
        <ToastNotice v-if="isToastSuccessVisible" 
                    :contentToastSuccess="this.contentToastSuccess"/>
        <DialogConfirmStore  v-if="this.isShowModalConfirmStore" 
                            v-on:cancelDialogConfirmStore="this.hideDialogConfirmStore"
                            v-on:clickNoStore="this.clickNoStore"
                            v-on:clickStore="this.clickStore"/>
</template>

<script>
    import TableEmployees from "../ui/TableEmployees.vue"
    import ToastNotice from "../ui/ToastNotice.vue"
    import DialogEmployees from "../ui/DialogEmployees.vue"
    import DialogConfirmStore from "../ui/DialogConfirmStore.vue"
    import {TheMainContent, ToastContent} from './../../resource.js';

    export default {
        name: "TheMain",
        components: {DialogEmployees, TableEmployees, ToastNotice, DialogConfirmStore},
        methods: {
//Region function
            /**
             * Search employee
             * Author: doduyhung1292 (22/11/2022)
             */
            searchEmployee: function() {
                try {
                    this.informationSearchEmployee = this.inputSearchEmployee;
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Chuyển sang trang khác
             * Author: doduyhung1292 (22/11/2022)
             * @param {num} Số trang 
             */
            changePage: function(num) {
                try {
                    if (num < 1) {this.pageSelected = 1; return};
                    if (num > this.numberPage) {this.pageSelected = this.numberPage; return};
                    this.pageSelected = num; 
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * 
             * Get total employee from component TableEmployee
             * Author: doduyhung1292 (22/11/2022) 
             */
             getEmployeeLength: function(numberEmp, numberPage) {
                try {
                    this.numberEmployee = numberEmp;
                    this.numberPage = numberPage;
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

            //  /**
            //  * Convert select paging to number employee/page
            //  * Author: doduyhung1292 (22/11/2022)
            //  */
            // convertType: function() {
            //     try {
            //         switch (this.selectPaging) {
            //         case '10 bản ghi trên 1 trang':
            //             this.numberPerPage = 10
            //             break;
            //         case '20 bản ghi trên 1 trang':
            //             this.numberPerPage = 20
            //             break;
            //         case '30 bản ghi trên 1 trang':
            //             this.numberPerPage = 30
            //             break;
            //         case '50 bản ghi trên 1 trang':
            //             this.numberPerPage = 50
            //             break;
            //         case '100 bản ghi trên 1 trang':
            //             this.numberPerPage = 100
            //             break;
            //         default:
            //             break;
            //         };
            //     } catch (error) {
            //         console.log(error)
            //     }
            // },

            /**
             * close modal confirm store and modal employee
             * Author: doduyhung1292 (20/11/2022)
             */
             clickNoStore: function() {
                //console.log("function active");
                try {
                    this.isShowModalConfirmStore = false;
                    this.isModalVisible = false;
                    this.tempEmp = {};
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
//End Region function
//Region UI
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
             closeModalUnCheck: function() {
                try {
                    this.isModalVisible = false;
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * Close modal when click button close and check data change
             * Author: doduyhung1292 (13/11/2022)
             */
            closeModalCheck: function(e) {
                try {
                    this.tempEmp = e;
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
             showModalEdit: function(item) {
                try {
                    this.isModalVisible = true;
                    this.employeeEdit = item
                } catch (error) {
                    console.log(error);
                }
            },

            /**
             * Show toast save success
             * Author: doduyhung1292 (13/11/2022)
             */
            showToastSaveSuccess: function(e) {
                try {
                    this.newEmployee = e;
                    this.contentToastSuccess = this.toastContent.contentToastSaveSuccess;
                    this.isToastSuccessVisible = !this.isToastSuccessVisible;
                    setTimeout(() => {this.isToastSuccessVisible = false}, 5000)
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
                    setTimeout(() => {this.isToastSuccessVisible = false}, 5000)
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
                    setTimeout(() => {this.isToastSuccessVisible = false}, 5000)
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
                tempEmp: {},
                selectPaging: '10',
                numberPerPage: 10,
                numberPage: 0, 
                pageSelected: 1,
                inputSearchEmployee: null,
                informationSearchEmployee: null,
                theMainContent: TheMainContent,
                toastContent: ToastContent
            }
        },
    }
</script>

<style scoped>
    @import url(../../css/layout/TheMain.css);
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
    background-color: #CEEAD9;
    border: none;
    height: 29px;
}

.numberRecords {
    margin-bottom: 2px;
    margin-left: 16px;
}
.input__search--hover {
    background-color: #E7F5EC;
}
</style>