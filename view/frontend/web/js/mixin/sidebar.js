define([
    "jquery",
    "Magento_Customer/js/model/authentication-popup",
    "Magento_Customer/js/customer-data",
    "Magento_Ui/js/modal/alert",
    "Magento_Ui/js/modal/confirm",
    "jquery-ui-modules/widget",
    "mage/decorate",
    "mage/collapsible",
    "mage/cookies",
    "jquery-ui-modules/effect-fade"
], function ($, authenticationPopup, customerData, alert, confirm) {
    "use strict";
    return function () {
        return $.widget("mage.sidebar", $.mage.sidebar, {
            _initContent: function () {
                var self = this,
                    events = {};

                this.element.decorate("list", this.options.isRecursive);

                /**
                 * @param {jQuery.Event} event
                 */
                events["click " + this.options.button.close] = function (
                    event
                ) {
                    event.stopPropagation();
                    $(self.options.targetElement).dropdownDialog("close");
                };
                events["click " + this.options.button.checkout] = $.proxy(
                    function () {
                        var cart = customerData.get("cart"),
                            customer = customerData.get("customer"),
                            element = $(this.options.button.checkout);

                        if (
                            !customer().firstname &&
                            cart().isGuestCheckoutAllowed === false
                        ) {
                            // set URL for redirect on successful login/registration. It's postprocessed on backend.
                            $.cookie(
                                "login_redirect",
                                this.options.url.checkout
                            );

                            if (this.options.url.isRedirectRequired) {
                                element.prop("disabled", true);
                                location.href = this.options.url.loginUrl;
                            } else {
                                authenticationPopup.showModal();
                            }

                            return false;
                        }
                        element.prop("disabled", true);
                        location.href = this.options.url.checkout;
                    },
                    this
                );

                /**
                 * @param {jQuery.Event} event
                 */
                events["click " + this.options.button.remove] = function (
                    event
                ) {
                    event.stopPropagation();
                    confirm({
                        content: self.options.confirmMessage,
                        actions: {
                            /** @inheritdoc */
                            confirm: function () {
                                self._removeItem($(event.currentTarget));
                            },

                            /** @inheritdoc */
                            always: function (e) {
                                e.stopImmediatePropagation();
                            }
                        }
                    });
                };

                /**
                 * @param {jQuery.Event} event
                 */
                events["keyup " + this.options.item.qty] = function (event) {
                    self._showItemButton($(event.target));
                };

                /**
                 * @param {jQuery.Event} event
                 */
                events["change " + this.options.item.qty] = function (event) {
                    self._showItemButton($(event.target));
                };

                /**
                 * @param {jQuery.Event} event
                 */
                events["click " + this.options.item.button] = function (event) {
                    event.stopPropagation();
                    self._updateItemQty($(event.currentTarget));
                };

                /**
                 * @param {jQuery.Event} event
                 */
                events["focusout " + this.options.item.qty] = function (event) {
                    self._validateQty($(event.currentTarget));
                };

                /**
                 * Update qty when pressing enter
                 *
                 * @param {jQuery.Event} event
                 */
                events["keypress " + this.options.item.qty] = function (event) {
                    var keycode = event.keyCode ? event.keyCode : event.which;
                    if (keycode == "13") {
                        self._updateItemQty($(event.currentTarget));
                    }
                };

                /**
                 * Increase or descrease qty and show update button
                 *
                 * @param {jQuery.Event} event
                 */
                events["click " + ":button.qty-btn"] = function (event) {
                    const target = event.target.closest("[data-qty]");
                    const itemId = $(event.currentTarget).data("cart-item");
                    const qtyId = "#cart-item-" + itemId + "-qty";
                    var inputValue = parseInt($(qtyId).val())
                        ? parseInt($(qtyId).val())
                        : 0;
                    const inputValueMin = $(qtyId).attr("min");
                    const inputValueMax = $(qtyId).attr("max");
                    const inputValueStep = parseInt($(qtyId).attr("step")) || 1;

                    if (target.getAttribute("data-qty") === "up") {
                        if (inputValue === inputValueMax) return;
                        inputValue += inputValueStep;
                        if (inputValueMax && inputValue > inputValueMax) return;
                        $(qtyId).val(inputValue);
                        self._showItemButton($(qtyId));
                    } else if (target.getAttribute("data-qty") === "down") {
                        if (inputValue === inputValueMin) return;
                        if (inputValue < inputValueStep) return;
                        inputValue -= inputValueStep;
                        $(qtyId).val(inputValue);
                        self._showItemButton($(qtyId));
                    }
                };

                this._on(this.element, events);
                this._calcHeight();
            }
        });
    };
});
