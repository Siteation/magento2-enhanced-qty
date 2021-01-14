define([
    "jquery",
    "jquery-ui-modules/widget",
    "mage/validation/validation"
], function ($) {
    "use strict";
    return function () {
        return $.widget("mage.validation", $.mage.validation, {
            options: {
                radioCheckboxClosest: "ul, ol",
                /**
                 * @param {*} error
                 * @param {HTMLElement} element
                 */
                errorPlacement: function (error, element) {
                    var messageBox, dataValidate;

                    // logic for field wrapper
                    var fieldWrapper = element.closest(".addon");

                    if (fieldWrapper.length) {
                        element = fieldWrapper.after(error);
                    }

                    if ($(element).hasClass("datetime-picker")) {
                        element = $(element).parent();

                        if (
                            element.parent().find("[generated=true].mage-error")
                                .length
                        ) {
                            return;
                        }
                    }

                    if (element.attr("data-errors-message-box")) {
                        messageBox = $(element.attr("data-errors-message-box"));
                        messageBox.html(error);

                        return;
                    }

                    dataValidate = element.attr("data-validate");

                    if (
                        dataValidate &&
                        dataValidate.indexOf(
                            "validate-one-checkbox-required-by-name"
                        ) > 0
                    ) {
                        error.appendTo("#links-advice-container");
                    } else if (element.is(":radio, :checkbox")) {
                        element.closest(this.radioCheckboxClosest).after(error);
                    } else {
                        element.after(error);
                    }
                }
            }
        });
    };
});
