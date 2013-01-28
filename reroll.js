function reroll(){

var refresh_rate = 1000;
var tags = ['link','script','html'];
var xhr = window.ActiveXObject ? new ActiveXObject( 'Microsoft.XMLHTTP' ) : new XMLHttpRequest();
var lm_time;
var links = [];

	// Start reroll
	function startRollin(){

		for(tag in tags){
		elems = document.getElementsByTagName(tags[tag]);
		setAssets(elems);
		}

		reloadFiles();

	}

	// Reload Files
	function reloadFiles(){

		for(i = 0, len = links.length; i < len; i++){
			var link = links[i];
			newTime = getTime(link.url);
			if(link.time != undefined && link.time != newTime){
				setAssetLnk(link.elem, link.url);
			}

			link.time = newTime;
		}

		setTimeout(function(){ reloadFiles(); }, refresh_rate );
	}

	// Gets the Last-Modified time header
	function getTime(url){

		try{
			xhr.open('HEAD', url, false);
			xhr.send();

			xhr.onreadystatechange = function(){
				if(this.readyState == 4) lm_time = xhr.getResponseHeader('Last-Modified');
			}

		}catch(e){
			console.log(e);
		}

		return lm_time;
	}

	// Get Asset Link
	function getAssetLnk(elem){5
		switch(elem.tagName){
			case 'LINK':
				return elem.href;
			break;
			case 'SCRIPT':
			case 'IMG':
				return elem.src;
			break;
			case 'HTML':
				return elem.baseURI;
			break;
		}
	}

	// Set Asset Link
	function setAssetLnk(elem, url){
		switch(elem.tagName){
			case 'LINK':
				elem.setAttribute('href', url + '?' + Math.random());
			break;
			case 'IMG':
			case 'HTML':
			case 'SCRIPT':
				window.location.reload();
			break;
		}
	}

	function setAssets(elems){
		if(elems.length <= 0){
			return false;
		}

		for(i = 0; i < elems.length; i++){

			elemLink = getAssetLnk(elems[i]);

			modTime = getTime(elemLink);

			links.push({
				'elem': elems[i],
				'url': elemLink,
				'time': modTime
			});
		}
	}

	startRollin();

}

reroll();
