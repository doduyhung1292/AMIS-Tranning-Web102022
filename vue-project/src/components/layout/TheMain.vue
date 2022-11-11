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
                    <input type="text" class="input-search" placeholder="Tìm theo mã, tên nhân viên">
                    <div class="icon-search"></div>
                    <div class="icon-reload"></div>
                    <div class="icon__excel"></div>
                    <div class="icon__set-up"></div> 
                </div>
            </div>
            <TableEmployees v-on:showModal="showModalEdit"/>
            <div class="container-footer">
                <div class="main-paging-left">Tổng số: <span>111</span> bản ghi</div>
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
                    :employeeEdit="this.employeeEdit"
                />
</template>

<script>
    import TableEmployees from "../ui/TableEmployees.vue"
    import DialogEmployees from "../ui/DialogEmployees.vue";

    export default {
        name: "TheMain",
        components: {DialogEmployees, TableEmployees},
        methods: {
            // Close modal when click button close and uncheck data change
            closeModalUnCheck: function() {
                try {
                    this.isModalVisible = false;
                } catch (error) {
                    console.log(error)
                }
            },
            closeModalCheck: function() {
                try {
                    this.isModalVisible = false;
                } catch (error) {
                    console.log(error)
                }
            },

            /**
             * 
             * Show form edit infomation employee when double click
             * Author: doduyhung1292 (08/11/2022)
             */

             //Show modal edit
             showModalEdit: function(item) {
                try {
                    this.isModalVisible = true;
                    this.employeeEdit = item
                    console.log(this.employeeEdit);
                } catch (error) {
                    console.log(error);
                }
            },

        },
        data() {
            return {
                isModalVisible: false,
                employeeEdit: {},
            }
        },
    }
</script>

<style scoped>
    @import url(../../css/layout/TheMain.css);
</style>