<template>
    <div class="dialog-notice">
        <div class="content-notice">
            <div class="content-header">
                <div>Dữ liệu đã thay đổi</div>
                <div class="icon-close"   v-on:click="this.clickCancel"></div>
            </div>
            <div class="content-main">
                <div class="content-warning">
                    <div>Lưu lại những thay đổi?</div>
                </div>
            </div>
            <div class="content-footer">
                <div>
                    <button class="btn-cancel" v-on:click="this.clickNoStore">Đóng</button>
                    <button class="btn-cancel" v-on:click="this.clickNoStore">Không lưu</button>
                    <button class="close-dialog btn__store"  v-on:click="this.clickStore" >Lưu</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DialogConfirmStore",
        methods: {
            /**
             * Close dialog when click button 'cancel'
             * Author: doduyhung1292 (20/11/2022)
             */
             clickCancel: function() {
                try {
                    this.$emit('cancelDialogConfirmStore');
                } catch (error) {
                    console.log(error);
                }
            },

            /**
             * Close dialog when click button 'Không'
             * Author: doduyhung1292 (20/11/2022)
             */
             clickNoStore: function() {
                try {
                    this.$emit('clickNoStore');
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
            }
        }
    }
</script>

<style scoped>
    @import url(../../css/ui/DialogEmployees.css);
    .btn-cancel {
        margin: 0 4px;
    }
    .close-dialog {
        margin-left: 4px;
    }
    button {
        min-width: 80px;
    }
</style>