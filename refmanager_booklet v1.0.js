(function(){
	// Toggle off if already running
    if (document.getElementById("contactToolbar")) {
        document.getElementById("contactToolbar").remove();
        document.getElementById("contactToolbarLauncher")?.remove();
        return;
    }

    // ======================
    // Notifications
    // ======================

    function notifyError(title, text = "") {
		if (typeof Swal !== "undefined") {
			Swal.fire({
				icon: "error",
				title,
				text
			});
			return;
		}

		// Prevent loading SweetAlert multiple times
		let script = document.querySelector(
			'script[src*="sweetalert2"]'
		);

		if (!script) {
			script = document.createElement("script");
			script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
			script.onload = () => notifyError(title, text);
			script.onerror = () =>
				alert(title + (text ? "\n\n" + text : ""));
			document.head.appendChild(script);
		} else {
			// Script exists but Swal isn't ready yet
			setTimeout(() => notifyError(title, text), 100);
		}
	}
	
	// ======================
    // First Check, is URL correct?
    // ======================
	
	const chUr = location.origin;
	if(chUr != "https://referralmanager.churchofjesuschrist.org"){
		notifyError("Incorrect Page", "This 'bookmarklet' is designed to work with the Missionary Referral Manager, Please make your way to this page");
		return;
	}
	
	const chPa = location.pathname;
	if(chPa === "/persons/mission" || chPa === "/persons/mission/"){
		document.querySelectorAll("a.name").forEach(link => {
			link.title="Open in PopUp";
			link.addEventListener("click", e => {
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();

				e.currentTarget.innerHTML += " --#C#--";
				e.currentTarget.style.color = "#b51936";

				const popup = window.open(link.href, "popup", null);
				const plScript = popup.document.createElement("script");
				plScript.src="https://cdn.jsdelivr.net/gh/jaguarclaws2007-v1121-mission/SUD-mission-ref-portal-bookmarklet@main/refmanager_booklet%20v1.0.min.js";
				
				popup.addEventListener("load", () => {
					popup.document.head.appendChild(plScript);
				});
			}, true);
		});
	}

    // ======================
    // Status Indicator
    // ======================

    let status;

    function setStatus(text, color = "#81c784", autoReset = false) {

        status.textContent = text;
        status.style.color = color;

        if (autoReset) {
            setTimeout(() => {
                status.textContent = "Ready";
                status.style.color = "#81c784";
            }, 3000);
        }

    }

    // ======================
    // Helpers
    // ======================

    function requireElement(selector, name) {
        const el = document.querySelector(selector);
        if (!el) {
            throw new Error(name + " not found");
        }
        return el;
    }

    function setValue(el, value) {
        el.value = value;
        el.dispatchEvent(
            new Event("input", {
                bubbles: true
            })
        );

        el.dispatchEvent(
            new Event("change", {
                bubbles: true
            })
        );

    }

    // ======================
    // YOUR SITE-SPECIFIC HELPERS
    // ======================

    function getContactTypeSelect(){
		return document.querySelector('[formcontrolname="contactTypeId"]');
	}

	function getResultSelect(){
		return document.querySelector('[formcontrolname="verifyStatusId"]');
	}

	function getSaveButton(){
		return document.querySelector('button.primary-button');
	}

	function addContact(){
		const dContact = document.querySelector("#teaching-record-menu-icons > a:nth-child(1)");
		if(dContact){
			dContact.click();
		}else{
			if(location.pathname === "/event/edit" || location.pathname === "/event/edit(modal:event/edit)"){
				setStatus("Contact form already open", "#8a810e");	
			} else {
				throw new Error("Contact button does not exist");
			}
		}
	}

	function changeTime(min){
		const input = document.querySelectorAll("input[name='times']")[0];

		const [h,m] = input.value.split(":").map(Number);

		const date = new Date();
		date.setHours(h,m+min);

		document.querySelectorAll("input[name='times']")[1].value = date.toTimeString().slice(0,5);
	}

	async function saveForm(){
		setTimeout(() => getSaveButton().click(), 1000);
	}

    // ======================
    // ACTIONS
    // ======================

	async function addContact(){
		try {
			addContact();
            setStatus("Opening form...", "#ffd54f");
			
            setTimeout(async function() {
                try {
                    setStatus("Filling form...", "#ffd54f");
                    changeTime(1);

                    setStatus(
                        "Awaiting user input",
                        "#dbc00d",
                        true
                    );

                } catch (err) {

                    setStatus("Error", "#ef5350");

                    notifyError(
                        "Unable to Save Contact",
                        err.message
                    );
                }

            }, 1000);

        } catch (err) {
            setStatus("Error", "#ef5350");
            notifyError(
                "Action Failed",
                err.message
            );
        }

    }

    async function contactedContact() {
        try {
			addContact();
            setStatus("Opening form...", "#ffd54f");
			
            setTimeout(async function() {
                try {
                    setStatus("Filling form...", "#ffd54f");
                    changeTime(1);

                    getContactTypeSelect().value = "1: 20";
					//getResultSelect().value = "1: 10";

                    //setStatus("Saving...", "#ffd54f");

                    //await saveForm();

                    setStatus(
                        "Awaiting user input",
                        "#dbc00d",
                        true
                    );

                } catch (err) {

                    setStatus("Error", "#ef5350");

                    notifyError(
                        "Unable to Save Contact",
                        err.message
                    );
                }

            }, 1000);

        } catch (err) {
            setStatus("Error", "#ef5350");
            notifyError(
                "Action Failed",
                err.message
            );
        }

    }

    async function missedContact() {
        try {
			addContact();
            setStatus("Opening form...", "#ffd54f");

            setTimeout(async function() {
                try {
                    setStatus("Filling form...", "#ffd54f");
                    changeTime(1);

                    getContactTypeSelect().value = "1: 20";
					//getResultSelect().value = "2: 30";

                    //setStatus("Saving...", "#ffd54f");

                    //await saveForm();

                    setStatus(
                        "Awaiting user input",
                        "#dbc00d",
                        true
                    );

                } catch (err) {
                    setStatus("Error", "#ef5350");
                    notifyError(
                        "Unable to Save Contact",
                        err.message
                    );
                }

            }, 1000);

        } catch (err) {

            setStatus("Error", "#ef5350");

            notifyError(
                "Action Failed",
                err.message
            );
        }

    }

    // ======================
    // TOOLBAR
    // ======================

    const bar = document.createElement("div");
    bar.id = "contactToolbar";
    bar.style.cssText = 'position:fixed; top:0; left:0; right:0; z-index:999999; background:#222; padding:8px; display:flex; gap:8px; align-items:center; font-family:Arial,sans-serif; box-shadow:0 2px 8px rgba(0,0,0,.3);';

	const launcher = document.createElement("div");
    launcher.id = "contactToolbarLauncher";
    launcher.innerHTML = "📞";
    launcher.title = "Show Contact Toolbar";
    launcher.style.cssText = 'position:fixed; bottom:20px; right:20px; width:60px; height:60px; border-radius:50%; background:#1976d2; color:white; display:none; align-items:center; justify-content:center; font-size:24px; cursor:pointer; z-index:999999; box-shadow:0 2px 10px rgba(0,0,0,.4); transition:all .2s ease;';

	launcher.onmouseenter =() => {
        launcher.style.transform = "scale(1.1)";
    };

    launcher.onmouseleave = () => {
        launcher.style.transform = "scale(1)";
    };

    function hideToolbar() {
        bar.style.display = "none";
        launcher.style.display = "flex";
    }

    function showToolbar() {
        launcher.style.display = "none";
        bar.style.display = "flex";
    }

    function destroyToolbar() {
        bar.remove();
        launcher.remove();
    }

    launcher.onclick = showToolbar;

    function makeButton(text, fn) {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.style.cssText = `
			padding:6px 12px;
			cursor:pointer;
			border:none;
			border-radius:4px;
		`;

        btn.onclick = fn;
        return btn;
    }

	// Status element

	status = document.createElement("span");
	status.textContent = "Ready";
	status.style.cssText = 'color: #81c784; font-size:12px; padding:0 12px; font-weight:bold;';

	// Buttons

	bar.appendChild(
		makeButton("✕",destroyToolbar)
	);

	bar.appendChild(
		makeButton("Add Contact",addContact)
	);

	/*
	bar.appendChild(
		makeButton("Contacted",contactedContact)
	);
	bar.appendChild(
		makeButton("Missed",missedContact)
	);

	bar.appendChild(
		makeButton("WhatsApp",whatsApp)
	);

	bar.appendChild(status);

	bar.appendChild(
		makeButton("Home",function(){location.href = "https://referralmanager.churchofjesuschrist.org/"})
	);
	*/

	const spacer = document.createElement("div");
	spacer.style.flex = "1";

	bar.appendChild(spacer);

	bar.appendChild(
		makeButton("Hide", hideToolbar)
	);

	document.body.appendChild(bar);
	document.body.appendChild(launcher);

})();
