<template>
    <div class="sidebar">
        <div class="logo-container">
            <div class="icon-menu" title="Menu"></div>
            <div class="logo__brand" title="Kế toán"></div>
        </div>
        <div class="sidebar-item">
            <a href="">
                <div class="menu-item overview" :title="this.theSideBarContent.itemOverview">
                    <div class="icon-overview"></div>
                    <div class="">{{this.theSideBarContent.itemOverview}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item money" :title="this.theSideBarContent.itemMoney">
                    <div class="icon-money"></div>
                    <div class="">{{this.theSideBarContent.itemMoney}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item bank" :title="this.theSideBarContent.itemBank">
                    <div class="icon-bank"></div>
                    <div class="">{{this.theSideBarContent.itemBank}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item buy" :title="this.theSideBarContent.itemBuy">
                    <div class="icon-buy"></div>
                    <div class="">{{this.theSideBarContent.itemBuy}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item sell" :title="this.theSideBarContent.itemSell">
                    <div class="icon-sell"></div>
                    <div class="">{{this.theSideBarContent.itemSell}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item order" :title="this.theSideBarContent.itemOrder">
                    <div class="icon-order"></div>
                    <div class="">{{this.theSideBarContent.itemOrder}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item warehouse" :title="this.theSideBarContent.itemWarehouse">
                    <div class="icon-warehouse"></div>
                    <div class="">{{this.theSideBarContent.itemWarehouse}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item tools" :title="this.theSideBarContent.itemTools">
                    <div class="icon-tools"></div>
                    <div class="">{{this.theSideBarContent.itemTools}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item assets" :title="this.theSideBarContent.itemAssets">
                    <div class="icon-assets"></div>
                    <div class="">{{this.theSideBarContent.itemAssets}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item tax" :title="this.theSideBarContent.itemTax">
                    <div class="icon-tax"></div>
                    <div class="">{{this.theSideBarContent.itemTax}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item price" :title="this.theSideBarContent.itemPrice">
                    <div class="icon-price"></div>
                    <div class="">{{this.theSideBarContent.itemPrice}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item general" :title="this.theSideBarContent.itemGeneral">
                    <div class="icon-general"></div>
                    <div class="">{{this.theSideBarContent.itemGeneral}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item budget" :title="this.theSideBarContent.itemBudget">
                    <div class="icon-budget"></div>
                    <div class="">{{this.theSideBarContent.itemBudget}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item report" :title="this.theSideBarContent.itemReport">
                    <div class="icon-report"></div>
                    <div class="">{{this.theSideBarContent.itemReport}}</div>
                </div>
            </a>
            <a href="">
                <div class="menu-item financial" :title="this.theSideBarContent.itemFinancial">
                    <div class="icon-financial"></div>
                    <div class="">{{this.theSideBarContent.itemFinancial}}</div>
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