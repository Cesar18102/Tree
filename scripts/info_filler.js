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
	sex : "",
	first_name : "",
	last_name : "",
	christening_name : null,
	
	birth_date : null,
	country_birh : null,
	birth_history : null,
	christening : null,
	
	death_date : null,
	death_history : null,
	death_cause : null,
	
	age : null, 
	
	relocation : null,                   //смена мест проживания
	positions_held : null,               //история трудовой деятельности
	accidents : null,                    //история несчастных случаев
	chronica_ilments : null,             //перечень хронических заболеваний
	character_traits : null,             //черты характера 
	vices : null,                        //пагубные привычки, зависимости 
	sin : null,                          //судимости, преступления 
	person_marks : null,                 //особые отметки на человеке - list `богоотступница|оккультистка|ведьма`
	ability : null,                      //таланты - html
	common : null,                       //дополнительная информация - string
	
	specials : null,                     //особые даты и события. может принимать значения  в виде '[дата1][описание1]|[дата2][описание2]' 
	
	attitude_to_parent_1 : null,         //описание взаимоотношений данной персоны к отцу 
	attitude_to_parent_2 : null,         //описание взаимоотношений данной персоны к матери 
	
	attitude_to_me_from_parent_1 : null, //описание взаимоотношений отца к данной персоне 
	attitude_to_me_from_parent_2 : null, //описание взаимоотношений матери к данной персоне 
	
	parent1 : null,
	parent2 : null,
	
	photo_url : "",
	merries : []
};

function getAttitudesParent(person, parent) {
	if(parent == null || parent == undefined)
		return { to : "не указано", from : "не указано" };
	
	let attitudes_parent1 = { 
		to : person.attitude_to_parent_1 == null ? "не указано" : person.attitude_to_parent_1, 
		from : person.attitude_to_me_from_parent_1 == null ? "не указано" : attitude_to_me_from_parent_1
	};
	
	let attitudes_parent2 = {
		to : person.attitude_to_parent_2 == null ? "не указано" : person.attitude_to_parent_2, 
		from : person.attitude_to_me_from_parent_2 == null ? "не указано" : attitude_to_me_from_parent_2
	}
	
	return person.parent1 != null && parent.id == person.parent1.id ? attitudes_parent1 : attitudes_parent2;
}

function getBrothersSisters(person) {
	let parent = person.parent1 ? person.parent1 : (person.parent2 ? person.parent2 : null);
	if(parent == null)
		return [];
		
	let merry = parent.merries.find(m => m.children.find(child => child.id == person.id) != undefined);
	if(merry == undefined)
		return [];
		
	return merry.children.filter(child => child.id != person.id);
}

function isParent1Father(person) {
	if(person.parent1 == null || person.parent1 == undefined)
		return person.parent2 == null || person.parent2 == undefined || person.parent2.sex == "woman";
		
	return person.parent1.sex == "man";
}

function isParent2Father(person) {
	if(person.parent2 == null || person.parent2 == undefined)
		return !(person.parent1 == null || person.parent1 == undefined || person.parent1.sex == "man");
		
	return person.parent2.sex == "man";
}

function initDataBinding() {
	
	Vue.filter('parentOneFilter', function (parent1) {
		let isFather = isParent1Father(this);
		
		return (isFather ? "Отец: " : "Мать: ") + 
			   (parent1 == null || parent1 == undefined ? (isFather ? "неизвестен" : "неизвестна") : 
			   (parent1.first_name + (parent1.last_name == null || parent1.last_name == undefined ? "" : " " + parent1.last_name)));
	});
	
	Vue.filter('parentTwoFilter', function (parent2) {
		let isFather = isParent2Father(this);
		
		return (isFather ? "Отец: " : "Мать: ") + 
			   (parent2 == null || parent2 == undefined ? (isFather ? "неизвестен" : "неизвестна") : 
			   (parent2.first_name + (parent2.last_name == null || parent2.last_name == undefined ? "" : " " + parent2.last_name)));
	});
	
	Vue.filter('normalMerries', function (merries) {
		return merries.filter(merry => merry != null && merry.fiktivnyj_brak == 0).length > 0
	});
	
	Vue.filter('merryClass', function (merry, merries) {
		return merries[merries.length - 1] != null && merry.id == merries[merries.length - 1].id ? 'person-merry' : 'person-ex-merry';
	});
	
	Vue.filter('ageString', function (age) {
		let mod = age % 10;
	
		if(mod == 1 && age != 11) return ', ' +  age + ' год';
		else if(mod >= 2 && mod <= 4 && (age <= 4 || age > 14)) return ', ' + age + ' года';
		else return ', ' + age + ' лет';
	});
	
	Vue.filter('birthString', function (birth_date) {
		let born = this.sex == "woman" ? "Родилась " : "Родился ";
		return born + birth_date;
	});
	
	Vue.filter('christeningString', function (christening) {
		if(christening == null || christening == undefined)
			return "Неизвестно, крещен" + (this.sex == "woman" ? "а" : "") + " ли";
	
		let christ = this.christening.indexOf("не") == -1;
		return (christ ? "Крещен" : "НЕ крещен") + (this.sex == "woman" ? "а" : "");
	});
	
	Vue.filter('deathString', function (death_date) {
		let death = this.sex == "woman" ? "Умерла " : "Умер ";
		return death + death_date;
	});
	
	Vue.filter('sexString', function (sex) {
		if(sex == "woman")
			return "Пол — женский";
		else if(sex == "man")
			return "Пол — мужской";
		else if(sex == null || sex == undefined)
			return "Пол — неизвестен";
		else
			return "Пол — " + sex;
	});
	
	Vue.filter('brotherSister', function () {
		return getBrothersSisters(this);
	});
	
	Vue.filter('brotherSisterCount', function () {
		return getBrothersSisters(this).length > 0;
	});
	
	Vue.filter('attitudeToParentOne', function (parent1) {
		let isFather = isParent1Father(this);
		return "Отношение персоны к " + (isFather ? "отцу: " : "матери: ") + 
			   (this.attitude_to_parent_1 == null || this.attitude_to_parent_1 == undefined ? "неизвестно" : this.attitude_to_parent_1);
	});
	
	Vue.filter('attitudeFromParentOne', function (parent1) {
		let isFather = isParent1Father(this);
		return "Отношение " + (isFather ? "отца" : "матери") + " к персоне: " +
			   (this.attitude_to_me_from_parent_1 == null || this.attitude_to_me_from_parent_1 == undefined ? "неизвестно" : this.attitude_to_me_from_parent_1);
	});
	
	Vue.filter('attitudeToParentTwo', function (parent2) {
		let isFather = isParent2Father(this);
		return "Отношение персоны к " + (isFather ? "отцу: " : "матери: ") + 
			   (this.attitude_to_parent_2 == null || this.attitude_to_parent_2 == undefined ? "неизвестно" : this.attitude_to_parent_2);
	});
	
	Vue.filter('attitudeFromParentTwo', function (parent2) {
		let isFather = isParent2Father(this);
		return "Отношение " + (isFather ? "отца" : "матери") + " к персоне: " +
			   (this.attitude_to_me_from_parent_2 == null || this.attitude_to_me_from_parent_2 == undefined ? "неизвестно" : this.attitude_to_me_from_parent_2);
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

