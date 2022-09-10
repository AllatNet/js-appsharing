/**
 * Loci GmbH - AppSharing.com Library
 *
 * @author Loci GmbH
 * @version 1.0.0
 * @license Private
 * @link https://www.app-sharing.com
 * @link https://www.loci.com
 */

class iFrameBridge_AppSharing {

	constructor(name, source = 'client') {
		this.iframe_name = name;
		this.source_window = source;
		this.init();
	}

	init() {
		this.iframe = document.getElementById(this.iframe_name);
		if (this.iframe) {
			this.iframe.addEventListener('load', this.onLoad.bind(this));
		}
		window.addEventListener('message', this.onMessage.bind(this));
	}

	execute(js_code) {
		if(this.source_window === 'server') {
			this.toParent(js_code);
		} else {
			this.toFrame(js_code);
		}
	}

	toFrame(js_code) {
		this.iframe.contentWindow.postMessage({
			type: 'execute',
			data: js_code
		}, '*');
	}

	toParent(js_code) {
		window.parent.postMessage({
			type: 'execute',
			data: js_code
		}, '*')
	}

	onMessage(event) {
		if (this.source_window === 'client' && event.origin.indexOf('www.app-sharing.com') === -1) {
			return;
		}
		if (event.data.type === 'execute') {
			eval(event.data.data);
		}
	}

	onLoad(event) {
		var instance =	this;
		var scrollPosition = window.scrollY | document.body.scrollTop;
		var iFramePosition = this.iframe.offsetTop;
		if(scrollPosition<iFramePosition) {
			scrollPosition = iFramePosition;
		}
		instance.execute(
			"var styleSheet = document.createElement('style');" +
			"styleSheet.id = 'iframe_mfp_style';" +
			"styleSheet.type = 'text/css';" +
			"styleSheet.innerText = '.mfp-wrap .mfp-container .mfp-content { top: "+scrollPosition+"px; }';" +
			"document.head.appendChild(styleSheet);"
		);
		window.addEventListener('scroll', function() {
			scrollPosition = window.scrollY | document.body.scrollTop;
			iFramePosition = instance.iframe.offsetTop;
			if(scrollPosition<iFramePosition) {
				scrollPosition = iFramePosition;
			}
			instance.execute(
				"var styleTag = document.getElementById('iframe_mfp_style');" +
				"styleTag.innerText = '.mfp-wrap .mfp-container .mfp-content { top: "+scrollPosition+"px; }';"
			);
		});
	}
}

class iFrameLoader_AppSharing {

	constructor(src, width = false, height = false, name = 'appsharing_contentframe') {
		this.src = src;
		if (width) {
			this.width = width;
		}
		if (height) {
			this.height = height;
		}
		this.name = name;
		this.init();
	}

	init() {
		this.createFrame();
		this.loadFrame();
	}

	createFrame() {
		let iframe = document.getElementById('__app_sharing_wireframe');
		if (iframe) {
			iframe.src = this.src;
			iframe.name = this.name;
			iframe.id = this.name;
			iframe.style.border = 'none';
			if(this.width){
				iframe.style.width = this.width;
			} else {
				iframe.style.width = '100%';
			}
			if(this.height){
				iframe.style.height = this.height;
			} else {
				iframe.style.height = '100%';
			}
			iframe.style.minHeight = '500px';
			iframe.style.zIndex = '1';
			iframe.style.overflow = 'hidden';
			iframe.innerHTML = 'Bitte haben Sie noch einen Augenblick geduld, während wir die Seite für Sie vorbereiten.';
			this.iframe = iframe;
		}
	}

	loadFrame() {
		if (this.iframe) {
			this.bridge = new iFrameBridge_AppSharing(this.iframe.name);
		}
	}
}

class Deploy_AppSharing {
	constructor(src, element_target = 'load_lcms_frame') {
		this.src = src;
		this.element_target = element_target;
		this.init();
	}

	element() {
		let e = document.getElementById(this.element_target);
		let d = document.createElement('div');
		d.innerHTML = e.innerHTML;
		d.id = this.element_target;
		d.classList.add('lcms-frame-container');
		e.parentNode.insertBefore(d, e);
		e.parentNode.removeChild(e);
	}

	init() {
		this.element();
		this.container = document.getElementById(this.element_target);
		this.ajax();
	}

	ajax() {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', this.src, true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				this.container.innerHTML = xhr.responseText;
			}
		};
		xhr.send();
	}
}