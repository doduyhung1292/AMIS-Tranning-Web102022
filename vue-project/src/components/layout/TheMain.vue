<template>
    <div class="main">
        <div class="main-header">
            <div class="main-header__left">
                <div class="main-header__name">Nhân viên</div>
                <div class="direction">Tất cả danh mục</div>
            </div>
            <div class="main-header__right">
                <button class="btn-utilities">
                    <div>Tiện ích</div> 
                    <div class="icon"></div>
                </button>
                <button class="btn__add-new" v-on:click="showModalEdit({})">Thêm</button>
                <button class="btn__expand-more">
                    <div class="line"></div>
                    <div class="icon__expand-more"></div>
                </button>
            </div>
        </div>
        <div class="main-content">
            <div class="main-content-toolbar">
                <div>
                    <button class="btn-execution">Thực hiện hàng loạt</button>
                </div>
                <div class="display-inline toolbar-right">
                    <input type="text" class="input-search" placeholder="Tìm theo mã, tên nhân viên"  v-on:focusin="inputSearchFocus"  v-on:focusout="inputSearchFocusOut">
                    <div class="icon-search" :class="isSearchButtonFocus"></div>
                    <div class="icon-reload" title="Tải lại"></div>
                    <div class="icon__excel" title="Export excel"></div>
                    <div class="icon__set-up" title="Cài đặt"></div> 
                </div>
            </div>
            <TableEmployees v-on:showModal="showModalEdit" v-on:showToastDeleteSuccess="showToastDeleteSuccess"/>
            <div class="container-footer">
                <div class="main-paging-left">Tổng số: <span>{{this.numberRowTable}}</span> bản ghi</div>
                    <div class="main-paging-right">
                        <div class="select-paging">
                            <select>
                                <option><button class="10row">10 bản ghi trên 1 trang</button></option>
                                <option><button class="20row">20 bản ghi trên 1 trang</button></option>
                                <option><button class="30row">30 bản ghi trên 1 trang</button></option>
                                <option><button class="50row">50 bản ghi trên 1 trang</button></option>
                                <option><button class="100row">100 bản ghi trên 1 trang</button></option>
                            </select>
                        </div>
                        <div class="number-paging">
                            <button class="next-page">Trước</button>
                            <button class="page-selected">1</button>
                            <button class="page-unselected">2</button>
                            <button class="previous-page">Sau</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DialogEmployees 
                    v-if="isModalVisible == true"
                    v-on:closeUnCheck="closeModalUnCheck"
                    v-on:closeCheck="closeModalCheck"
                    v-on:showToastSuccess="showToastSaveSuccess"
                    :employeeEdit="this.employeeEdit"
                />
        <ToastNotice v-if="isToastSuccessVisible" 
                    :contentToastSuccess="this.contentToastSuccess"/>
</template>

<script>
    import TableEmployees from "../ui/TableEmployees.vue"
    import ToastNotice from "../ui/ToastNotice.vue"
    import DialogEmployees from "../ui/DialogEmployees.vue"

    export default {
        name: "TheMain",
        components: {DialogEmployees, TableEmployees, ToastNotice},
        methods: {
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
            closeModalCheck: function() {
                try {
                    this.isModalVisible = false;
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
             * Show toast success
             * Author: doduyhung1292 (13/11/2022)
             */
            showToastSaveSuccess: function() {
                try {
                    this.contentToastSuccess = "Lưu thành công.";
                    this.isToastSuccessVisible = !this.isToastSuccessVisible;
                    setTimeout(() => {this.isToastSuccessVisible = false}, 2000)
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

            /**
             * Show toast success delete 
             * Author: doduyhung1292 (15/11/2022)
             */
            showToastDeleteSuccess: function() {
                this.contentToastSuccess = "Xóa thành công.";
                this.isToastSuccessVisible = !this.isToastSuccessVisible;
                setTimeout(() => {this.isToastSuccessVisible = false}, 2000)
            }
        },
        data() {
            return {
                isModalVisible: false,
                isToastSuccessVisible: false,
                employeeEdit: {},
                numberRowTable: 0,
                isSearchButtonFocus: null,
                contentToastSuccess: null
            }
        },
    }
</script>

<style scoped>
    @import url(../../css/layout/TheMain.css);
    .borderFocus {
       border-color: #2ca10c;
    }
</style>