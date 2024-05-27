"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const form = new BrutalistInput("form");
});
class BrutalistInput {
    /**
     * @param el CSS selector of the form
     */
    constructor(el) {
        var _a, _b;
        /** Timeout function for state changes */
        this.timeout = 0;
        this._state = SubmitState.Default;
        this._emailInalid = true;
        this.el = document.querySelector(el);
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.addEventListener("input", this.emailValidate.bind(this));
        (_b = this.el) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", this.submit.bind(this));
    }
    get state() {
        return this._state;
    }
    set state(value) {
        this._state = value;
        const shouldBeDisabled = value > SubmitState.Default;
        this.toggleDisabled(shouldBeDisabled);
        this.stateDisplay(value);
    }
    get emailInvalid() {
        return this._emailInalid;
    }
    set emailInvalid(value) {
        var _a, _b, _c;
        this._emailInalid = value;
        (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.setAttribute("aria-invalid", `${value}`);
        const submitBtn = (_c = this.el) === null || _c === void 0 ? void 0 : _c.send;
        if (submitBtn) {
            submitBtn.disabled = value;
        }
    }
    /** Validate the email input. */
    emailValidate() {
        var _a, _b;
        const email = (_b = (_a = this.el) === null || _a === void 0 ? void 0 : _a.email) === null || _b === void 0 ? void 0 : _b.value;
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
        this.emailInvalid = !email.length || !emailRegex.test(email);
    }
    /**
     * Display how the form should appear under a specific state.
     * @param index Index of the state
     */
    stateDisplay(index) {
        var _a;
        (_a = this.el) === null || _a === void 0 ? void 0 : _a.setAttribute("data-state", `${index}`);
    }
    /**
     * Send the supplied email (simulated) and reset the form.
     * @param e Submit event
     */
    async submit(e) {
        e.preventDefault();
        if (this.state !== SubmitState.Default || this.emailInvalid) {
            return;
        }
        const activeElement = document.activeElement;
        activeElement === null || activeElement === void 0 ? void 0 : activeElement.blur();
        this.state = SubmitState.Working;
        const delayWorking = 1300;
        const delayDone = 2000;
        return await new Promise(resolve => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.state = SubmitState.Done;
                resolve();
            }, delayWorking);
        }).then(() => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                var _a;
                this.state = SubmitState.Default;
                this.emailInvalid = true;
                (_a = this.el) === null || _a === void 0 ? void 0 : _a.reset();
            }, delayDone);
        });
    }
    /**
     * Enable or disable the form controls.
     * @param disabled Whether or not the controls should be disabled
     */
    toggleDisabled(disabled) {
        const controls = ["email", "send"];
        controls.forEach(control => {
            var _a;
            let controlEl;
            controlEl = (_a = this.el) === null || _a === void 0 ? void 0 : _a[control];
            if (controlEl) {
                controlEl.disabled = disabled;
            }
        });
    }
}
var SubmitState;
(function (SubmitState) {
    SubmitState[SubmitState["Default"] = 0] = "Default";
    SubmitState[SubmitState["Working"] = 1] = "Working";
    SubmitState[SubmitState["Done"] = 2] = "Done";
})(SubmitState || (SubmitState = {}));