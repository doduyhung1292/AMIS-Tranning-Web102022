<template>
    <div class="sidebar">
        <div class="logo-container">
            <div class="icon-menu" title="Menu"></div>
            <div class="logo__brand" title="Kế toán"></div>
        </div>
        <div class="sidebar-item">
            <a href="">
                <div class="menu-item overview" title="Tổng quan">
                    <div class="icon-overview"></div>
                    <div class="">{{this.theSideBarContent.itemOverview}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item money" title="Tiền mặt">
                    <div class="icon-money"></div>
                    <div class="">Tiền mặt</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item bank" title="Tiền gửi">
                    <div class="icon-bank"></div>
                    <div class="">Tiền gửi</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item buy" title="Mua hàng">
                    <div class="icon-buy"></div>
                    <div class="">Mua hàng</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item sell" title="Bán hàng">
                    <div class="icon-sell"></div>
                    <div class="">Bán hàng</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item order" title="Quản lý hóa đơn">
                    <div class="icon-order"></div>
                    <div class="">Quản lý hóa đơn</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item warehouse" title="Kho">
                    <div class="icon-warehouse"></div>
                    <div class="">Kho</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item tools" title="Công cụ dụng cụ">
                    <div class="icon-tools"></div>
                    <div class="">Công cụ dụng cụ</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item assets" title="Tài sản cố định">
                    <div class="icon-assets"></div>
                    <div class="">Tài sản cố định</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item tax" title="Thuế">
                    <div class="icon-tax"></div>
                    <div class="">Thuế</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item price" title="Giá thành">
                    <div class="icon-price"></div>
                    <div class="">Giá thành</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item general" title="Tổng hợp">
                    <div class="icon-general"></div>
                    <div class="">Tổng hợp</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item budget" title="Ngân sách">
                    <div class="icon-budget"></div>
                    <div class="">Ngân sách</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item report" title="Báo cáo">
                    <div class="icon-report"></div>
                    <div class="">Báo cáo</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item financial" title="Phân tích tài chính">
                    <div class="icon-financial"></div>
                    <div class="">Phân tích tài chính</div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    import {TheSidebarContent} from './../../resource.js';

    export default {
        name: "TheSidebar",
        data() {
            return {
                theSideBarContent: TheSidebarContent
            }
        }
    }
</script>

<style scoped>
    @import url(../../css/layout/TheSidebar.css);
</style>