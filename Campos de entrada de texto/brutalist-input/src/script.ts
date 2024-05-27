window.addEventListener("DOMContentLoaded",() => {
	const form = new BrutalistInput("form");
});

class BrutalistInput {
	/** Form used for this component */
	el: HTMLFormElement | null;
	/** Timeout function for state changes */
	timeout = 0;
	/**
	 * @param el CSS selector of the form
	 */
	constructor(el: string) {
		this.el = document.querySelector(el);
		this.el?.addEventListener("input",this.emailValidate.bind(this));
		this.el?.addEventListener("submit",this.submit.bind(this));
	}
	private _state = SubmitState.Default;
	get state() {
		return this._state;
	}
	set state(value: SubmitState) {
		this._state = value;

		const shouldBeDisabled = value > SubmitState.Default;

		this.toggleDisabled(shouldBeDisabled);
		this.stateDisplay(value);
	}
	private _emailInalid = true;
	get emailInvalid() {
		return this._emailInalid;
	}
	set emailInvalid(value: boolean) {
		this._emailInalid = value;
		this.el?.email?.setAttribute("aria-invalid",`${value}`);

		const submitBtn = this.el?.send;

		if (submitBtn) {
			submitBtn.disabled = value;
		}
	}
	/** Validate the email input. */
	emailValidate(): void {
		const email = this.el?.email?.value;
		const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

		this.emailInvalid = !email.length || !emailRegex.test(email);
	}
	/**
	 * Display how the form should appear under a specific state.
	 * @param index Index of the state
	 */
	stateDisplay(index: SubmitState): void {
		this.el?.setAttribute("data-state",`${index}`);
	}
	/**
	 * Send the supplied email (simulated) and reset the form.
	 * @param e Submit event
	 */
	async submit(e: Event): Promise<void> {
		e.preventDefault();

		if (this.state !== SubmitState.Default || this.emailInvalid) {
			return;
		}

		const activeElement = document.activeElement as HTMLButtonElement | HTMLInputElement;
		activeElement?.blur();

		this.state = SubmitState.Working;

		const delayWorking = 1300;
		const delayDone = 2000;

		return await new Promise<void>(resolve => {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.state = SubmitState.Done;
				resolve();
			},delayWorking);
		}).then(() => {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.state = SubmitState.Default;
				this.emailInvalid = true;
				this.el?.reset();
			},delayDone);
		});
	}
	/**
	 * Enable or disable the form controls.
	 * @param disabled Whether or not the controls should be disabled
	 */
	toggleDisabled(disabled: boolean): void {
		const controls = ["email","send"];

		controls.forEach(control => {
			let controlEl: HTMLButtonElement | HTMLInputElement | null | undefined;
			controlEl = this.el?.[control];

			if (controlEl) {
				controlEl.disabled = disabled;
			}
		})
	}
}
const enum SubmitState {
	Default = 0,
	Working,
	Done
}