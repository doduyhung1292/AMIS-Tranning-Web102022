<template>
    <div class="dialog-notice">
        <div class="content-notice">
            <div class="content-main">
                <div class="icon__warning-store"></div>
                <div class="content-warning">
                    <div>Dữ liệu đã bị thay đổi. Bạn có muốn cất không?</div>
                </div>
            </div>
            <div class="content-footer">
                <button v-on:click="this.clickCancel" class="btn-cancel">Hủy</button>
                <div>
                    <button class="btn-cancel" v-on:click="this.clickNoStore">Không</button>
                    <button class="close-dialog btn__store"  v-on:click="this.clickStore" >Có</button>
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

    .content-footer {
        display: flex;
        justify-content: space-between;
    }
    .btn__store {
        margin-left: 6px;
    }
</style>