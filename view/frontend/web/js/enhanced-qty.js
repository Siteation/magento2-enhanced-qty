define([], function () {
    "use strict";

    /**
     * Handels the click events for the Qty Buttons in PHtml files
     */
    document.addEventListener(
        "click",
        (e) => {
            if (!e.target.closest("[data-qty]")) return;
            e.preventDefault();

            const target = e.target.closest("[data-qty]");
            const btnId = target.getAttribute("data-qty-id");
            if (!btnId) return;
            const input = document.getElementById(btnId);
            let inputValue = parseInt(input.value) ? parseInt(input.value) : 0;
            const inputValueMin = input.getAttribute("min");
            const inputValueMax = input.getAttribute("max");
            const inputValueStep = parseInt(input.getAttribute("step")) || 1;

            if (target.getAttribute("data-qty") === "up") {
                if (inputValue === inputValueMax) return;
                inputValue += inputValueStep;
                if (inputValueMax && inputValue > inputValueMax) return;
                input.value = inputValue;
            } else if (target.getAttribute("data-qty") === "down") {
                if (inputValue === inputValueMin) return;
                if (inputValue < inputValueStep) return;
                inputValue -= inputValueStep;
                input.value = inputValue;
            }
        },
        false
    );
});
