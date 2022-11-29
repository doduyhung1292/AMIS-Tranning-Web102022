<template>
    <div class="dialog-notice">
        <div class="content-notice">
            <div class="content-header">
                <div>{{this.dialogConfirmStore.titleDialog}}</div>
                <div class="icon-close"   v-on:click="this.clickCancel" :title="this.dialogConfirmStore.titleButtonCloseDialog"></div>
            </div>
            <div class="content-main">
                <div class="content-warning">
                    <div>{{this.dialogConfirmStore.contentDialog}}</div>
                </div>
            </div>
            <div class="content-footer">
                <div>
                    <button class="btn-cancel" v-on:click="this.clickCancel" :title="this.dialogConfirmStore.titleButtonCloseDialog">
                        {{this.dialogConfirmStore.buttonCloseDialog}}
                    </button>
                    <button class="btn-cancel" v-on:click="this.clickNoStore" :title="this.dialogConfirmStore.titleButtonNotSave">
                        {{this.dialogConfirmStore.buttonNotSave}}
                    </button>
                    <button class="close-dialog btn__store"  v-on:click="this.clickStore" :title="this.dialogConfirmStore.titleButtonSave">
                        {{this.dialogConfirmStore.buttonSave}}
                    </button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import {DialogConfirmStoreResource} from '../../../resource.js';
    export default {
        name: "DialogConfirmStore",
        data() {
            return {
                dialogConfirmStore: DialogConfirmStoreResource
            }
        },
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
    @import url(../../../css/ui/dialog/DialogConfirmStore.css);
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