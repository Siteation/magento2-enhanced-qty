define(["jquery", "mage/translate", "domReady!"], function ($) {
    "use strict";

    /**
     * Adds qty buttons after each input number
     *
     * @param   {[type]}  config           [config description]
     * @param   {[type]}  el               [el description]
     * @param   {[type]}  .input-text.qty  [.input-text.qty description]
     *
     * @return  {[type]}                   [return description]
     */
    return function (config, el = ".input-text.qty") {
        const {
            wrapperClass = "enhanced-qty",
            btnClass = "qty-btn",
            btnPlusText = $.mage.__("Increase the quantity"),
            btnMinText = $.mage.__("Decrease the quantity")
        } = config;
        console.log({ el, config });

        if (!el) return;

        // Don't render if the input is not a number
        if (!el.getAttribute("type") === "number") return;

        // Make sure the input has an id, else set it with the name value
        if (el.id === "") {
            el.setAttribute("id", el.name);
        }

        // Add the disabled state if the input is also disabled
        let isDisabled = el.getAttribute("disabled") ? "disabled" : "";

        let qtyId = el.id;
        const qtyBtnPlus = `<button type="button" class="${btnClass}"
            data-qty="up" data-qty-id="${qtyId}" tabindex="-1" ${isDisabled}>
            <span class="qty-text">${btnPlusText}</span>
        </button>`;
        const qtyBtnMin = `<button type="button" class="${btnClass}"
            data-qty="down" data-qty-id="${qtyId}" tabindex="-1" ${isDisabled}>
            <span class="qty-text">${btnMinText}</span>
        </button>`;
        el.insertAdjacentHTML("afterend", qtyBtnMin);
        el.insertAdjacentHTML("afterend", qtyBtnPlus);
        el.parentNode.classList.add(wrapperClass);
    };
});
