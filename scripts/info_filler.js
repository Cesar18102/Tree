function initEventHandler() {
	let frame = document.getElementById("tree-wrapper");
	let doc = frame.contentDocument ? frame.contentDocument : frame.contentWindow.document;
	let tree = doc.getElementById("tree");
	
	tree.addEventListener("personSelected", function(e) {
		document.getElementById("parents-wrapper").hidden = false;
		Object.assign(personDataBindingObject, e.person);
	}, false);
	
	tree.addEventListener("personButtonClicked", function(e) {
		switch(e.clickedButton) {
			case e.personButtons.mainInfoButton :
				document.getElementById("person-main-info-popup").hidden = false;
				break;
			case e.personButtons.parentsButton :
				document.getElementById("person-parents-popup").hidden = false;
				break;
			case e.personButtons.brothersSistersButton :
				document.getElementById("person-sisters-brothers-popup").hidden = false;
				break;
			case e.personButtons.merriesButton :
				document.getElementById("person-merries-popup").hidden = false;
				break;
		}
	}, false);
}

let personDataBindingObject = {
	id : -1,
	first_name : "",
	last_name : "",
	birth_date : null,
	death_date : null,
	birth_history : null,
	death_history : null,
	parent1 : null,
	parent2 : null,
	photo_url : "",
	sex : "",
	merries : []
};

function initDataBinding() {
	
	Vue.filter('father', function (staticText, parent1, parent2) {
		let father = [parent1, parent2].find(parent => parent != null && parent != undefined && parent.sex == "man");
		return staticText + (father == undefined ? "Неизвестен" : father.first_name + " " + father.last_name);
	});
	
	Vue.filter('mother', function (staticText, parent1, parent2) {
		let father = [parent1, parent2].find(parent => parent != null && parent != undefined && parent.sex == "woman");
		return staticText + (father == undefined ? "Неизвестна" : father.first_name + " " + father.last_name);
	});
	
	Vue.filter('brotherSister', function () {
		let parent = this.parent1 ? this.parent1 : (this.parent2 ? this.parent2 : null);
		if(parent == null)
			return [];
		
		let merry = parent.merries.find(m => m.children.find(child => child.id == this.id) != undefined);
		if(merry == undefined)
			return [];
		
		return merry.children.filter(child => child.id != this.id);
	});
	
	new Vue({
		el : "#info-wrapper",
		data : personDataBindingObject
	});
}

initDataBinding();

[
 "person-main-info-popup",
 "person-parents-popup",
 "person-sisters-brothers-popup",
 "person-merries-popup"
].map(id => document.getElementById(id))
 .forEach(popupWrapper => {
	 popupWrapper.onclick = () => popupWrapper.hidden = true;
	 new Vue({
		el : "#" + popupWrapper.id,
		data : personDataBindingObject
	 });
 });

Array.from(document.getElementsByClassName("popup-body"))
	 .forEach(popupBody => popupBody.onclick = (e) => {
		 e.stopPropagation();
		 return true;
	 });

