var config = {
    config: {
        mixins: {
            "Magento_Checkout/js/sidebar": {
                "Siteation_EnhancedQty/js/mixin/sidebar": true
            }
        }
    },
    map: {
        "*": {
            enhancedQty: "Siteation_EnhancedQty/js/enhanced-qty",
            renderQtyBtn: "Siteation_EnhancedQty/js/render-qty-btn",
            "Magento_Checkout/template/minicart/item/default.html":
                "Siteation_EnhancedQty/template/minicart/item/default.html"
        }
    }
};
