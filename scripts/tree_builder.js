let testGrandChildPerson2 = {
	id : 6,
	first_name : "Анна",
	last_name : "Стародубцева",
	birth_date : "14.05.2021",
	death_date : null,
	birth_history : "Lorem ispum birth",
	death_history : null,
	photo_url : null,
	sex : "woman",
	merries : []
};

let testGrandChildPerson = {
	id : 5,
	first_name : "Алексей",
	last_name : "Стародубцев-Восьмиглазов",
	birth_date : "14.05.2020",
	death_date : null,
	birth_history : "Lorem ispum birth",
	death_history : null,
	photo_url : null,
	sex : "man",
	merries : []
};

let testChildPerson = {
	id : 2,
	first_name : "Андрей",
	last_name : "Стародубцев",
	birth_date : "14.05.2000",
	death_date : null,
	birth_history : "Lorem ispum birth",
	death_history : null,
	photo_url : null,
	sex : "man",
	merries : []
};

let testChildPerson3 = {
	id : 7,
	first_name : "Иван",
	last_name : "Стародубцев",
	birth_date : "14.05.2005",
	death_date : null,
	birth_history : "Lorem ispum birth",
	death_history : null,
	photo_url : null,
	sex : "man",
	merries : []
};

let testDivorceChild = {
	id : 4,
	first_name : "Василий",
	last_name : "Стародубцев-Восьмиглазов",
	birth_date : "14.05.1995",
	death_date : null,
	birth_history : "Lorem ispum birth",
	death_history : null,
	photo_url : null,
	sex : "man",
	merries : []
};

let testChildPerson2 = {
	id : 3,
	first_name : "Марина",
	last_name : "Алексеева",
	birth_date : "14.05.2001",
	death_date : null,
	birth_history : "Lorem ispum birth",
	death_history : null,
	photo_url : null,
	sex : "woman",
	merries : [/*{
		id : 0,
		couple : testDivorceChild,
		merry_date : "08.09.2020",
		divorce_date : null,
		children : [
			testGrandChildPerson2
		]
	}*/]
};

let testMerryPerson = {
	id : 1,
	first_name : "Валентин",
	last_name : "Стародубцев",
	birth_date : "14.05.1975",
	death_date : "20.05.2041",
	birth_history : "Lorem ispum birth",
	death_history : "Dolor sit amet death",
	photo_url : null,
	sex : "man",
	parent1 : null,
	parent2 : null,
	merries : []
}

let testDivorcePerson = {
	id : 1,								    //идентификатор человека
	first_name : "Татьяна",
	last_name : "Восьмиглазова",
	birth_date : "14.05.1970", 
	death_date : "20.05.2041", 			 	//по умолчанию ставить null 
	birth_history : "Lorem ispum birth", 
	death_history : "Dolor sit amet death", //по умолчанию ставить null 
	photo_url : null,				 //если null, картинка определяется полем sex
	sex : "woman", 					 //man или woman
	parent1 : null,					 //родители
	parent2 : null,
	merries : [{ 					 //каждый объект брака должен присутствовать у обоих супругов
		id : 1,  					 //id брака должен совпадать у супругов, заключивших этот брак
		couple : testMerryPerson,    //супруг(а)
		merry_date : "08.08.1995",   //дата бракосочетания
		divorce_date : "08.08.2001", //дата развода, по умолчанию ставить null
		children : [ 				 //дети, родившиеся в браке
			testDivorceChild,
			testGrandChildPerson
		]
	}, null //последний брак в списке - нынешний, активный. То есть если человек развелся, но потом не женился,
	]	 	//надо поставить в конце списка null
}			//браки должны быть расставлены в хронологической последовательности

let testRootPerson = {
	id : 0,
	first_name : "Оксана",
	last_name : "Стародубцева",
	birth_date : "14.05.1975",
	death_date : "20.05.2040",
	birth_history : "Lorem ispum birth Lorem ispum birth Lorem ispum birth",
	death_history : "Dolor sit amet death Dolor sit amet death Dolor sit amet death",
	photo_url : null,
	sex : "woman",
	parent1 : null,
	parent2 : null,
	merries : [{
		id : 2,
		couple : testMerryPerson, 
		merry_date : "08.08.2005",
		divorce_date : null,
		children : [
			testChildPerson2,
			testChildPerson,
			testChildPerson3
		]
	}]
};

const horisontalSpace = 10;  //расстояние между людьми по горизонтали
const verticalSpace = 6;     //расстояние между людьми по вертикали
	
const horisontalIndent = 12; //отступ дерева от левого края
const verticalIndent = 0;    //отступ дерева от верхнего края
	
const personHeight = 8;		 //высота болка человека (должна соответствовать .person.height в tree_styles.css!!! и сумме .person-photo.width + .person-info.width + .person-buttons.width + 1(for borders))
const personWidth = 30;		 //ширина болка человека (должна соответствовать .person.width в tree_styles.css!!!)
const personBorder = 0.2;	 //толщина границы блока человека
	
const merrySymbolWidth = 2;	 	  			//ширина символа брака(кольца)
const merrySymbolHeight = 1.3333; 			//высота символа брака(кольца)
const lineStrength = 0.1;		  			//толщина линий родства
const parentToChildLineHorisontalShift = 1; //отступ от центра предка при проведении линии к потомку

const defaultLineColor = "#A0A0A0";
const selectedLineColor = "black";

let personButtons = {
	mainInfoButton : 0,
	parentsButton : 1,
	brothersSistersButton : 2,
	merriesButton : 3
};

function init() {
	
	testMerryPerson.merries.push({
		id : 1,
		couple : testDivorcePerson,
		merry_date : "08.08.1995",
		divorce_date : "08.08.2001",
		children : [
			testDivorceChild,
			testGrandChildPerson
		]
	}, {
		id : 2,
		couple : testRootPerson,
		merry_date : "08.08.2005",
		divorce_date : null,
		children : [
			testChildPerson2,
			testChildPerson,
			testChildPerson3
		]
	});
	
	/*testDivorceChild.merries.push({
		id : 0,
		couple : testChildPerson2,
		merry_date : "08.09.2020",
		divorce_date : null,
		children : [
			testGrandChildPerson2
		]
	});*/
	
	//Добавить браки, которые не могли быть добавлены при инициализации
	
	testGrandChildPerson2.parent1 = testChildPerson2;
	testGrandChildPerson2.parent2 = testGrandChildPerson;
	
	testDivorceChild.parent1 = testDivorcePerson;
	testDivorceChild.parent2 = testMerryPerson;
	
	testGrandChildPerson.parent1 = testDivorcePerson;
	testGrandChildPerson.parent2 = testMerryPerson;
	
	testChildPerson2.parent1 = testRootPerson;
	testChildPerson2.parent2 = testMerryPerson;
	
	testChildPerson.parent1 = testRootPerson;
	testChildPerson.parent2 = testMerryPerson;
	
	testChildPerson3.parent1 = testRootPerson;
	testChildPerson3.parent2 = testMerryPerson;
	
	//Добавить предков, которые не могли быть добавлены при инициализации
	
	//Положить сюда список всх людей
	let people = [ 
		testDivorcePerson, 
		testMerryPerson, 
		testRootPerson, 
		testDivorceChild, 
		testGrandChildPerson, 
		testChildPerson2, 
		testChildPerson, 
		testGrandChildPerson2,
		testChildPerson3
	];
	
	people.sort((a, b) => Math.random() > 0.5 ? 1 : -1);
	
	//Передать сюда одного из корневых предков (testRootPerson)
	let sizes = getTreeSize(testRootPerson, people);
	let sortedPeople = sortPeople(sizes);
	
	let tree = document.getElementById("tree");	
	let selectedPersonView = null;
	
	locatePersonViews(sortedPeople, (e) => {
		if(selectedPersonView != null && selectedPersonView.parentLines != undefined)
			selectedPersonView.parentLines.forEach(line => line.style.backgroundColor = defaultLineColor);
		
		if(e.person.view.parentLines != undefined) {
			e.person.view.parentLines.forEach(line => line.style.backgroundColor = selectedLineColor);
			selectedPersonView = e.person.view;
		}
		
		let event = document.createEvent('Event');
		event.person = e.person;
		event.initEvent('personSelected', true, true);
		tree.dispatchEvent(event);
	}, (e) => {
		let event = document.createEvent('Event');
		event.clickedButton = e;
		event.personButtons = personButtons;
		event.initEvent('personButtonClicked', true, true);
		tree.dispatchEvent(event);
	}, tree);
	
	createAllMerryLines(people, personWidth, personHeight, merrySymbolWidth, merrySymbolHeight, personBorder, tree);
	createAllChildLines(people, personWidth, personHeight, personBorder, parentToChildLineHorisontalShift, lineStrength, tree);
}

function sortPeople(treeSizes) {
	let levelsSorted = [];
	for(let i = 0; i < treeSizes.levels.length; i++) {
		let level = [];
		let totalSize = (treeSizes.maxWidth - treeSizes.levels[i].length) / 2;
		while(treeSizes.levels[i].filter(person => !person.in_group).length != 0) {
			let group = getNextGroup(treeSizes.levels[i]);
			group.leftPosition = totalSize;
			for(let pers of group)
				pers.leftPosition = totalSize++;
			level.push(group);
		}
		
		level.forEach(group => sortGroup(group));
		
		for(let k = 0; k < level.length - 1; k++) {
			for(let j = 0; j < level.length - 1; j++) {
				let distanceCurrent = getAvgGroupDistanceToParents(level[j]);
				let distanceOther = getAvgGroupDistanceToParents(level[j + 1]);
					
				swapGroupsPositions(level[j], level[j + 1]);
					
				let temp = level[j];
				level[j] = level[j + 1];
				level[j + 1] = temp;
					
				sortGroup(level[j]);
				sortGroup(level[j + 1]);
				
				let distanceProbe = getAvgGroupDistanceToParents(level[j]);
				let distanceOtherProbe = getAvgGroupDistanceToParents(level[j + 1]);
				
				if(distanceProbe + distanceOtherProbe > distanceCurrent + distanceOther) {
					swapGroupsPositions(level[j], level[j + 1]);
					
					let temp = level[j];
					level[j] = level[j + 1];
					level[j + 1] = temp;
					
					sortGroup(level[j]);
					sortGroup(level[j + 1]);
				}
				
			}
		}
		
		levelsSorted[i] = level;
	}
	
	return {
		maxHeight : treeSizes.maxHeight,
		maxWidth : treeSizes.maxWidth,
		levels : levelsSorted.map(levelSorted => levelSorted.reduce((people, group) => people.concat(group), []))
	};
}

function swapGroupsPositions(group1, group2) {
	let leftGroup = group1.leftPosition < group2.leftPosition ? group1 : group2;
	let rightGroup = group1.leftPosition < group2.leftPosition ? group2 : group1;
	
	for(let pers of leftGroup)
		pers.leftPosition = pers.leftPosition + rightGroup.length;
					
	for(let pers of rightGroup)
		pers.leftPosition = pers.leftPosition - leftGroup.length;
					
	rightGroup.leftPosition -= leftGroup.length;
	leftGroup.leftPosition += rightGroup.length;
}

function sortGroup(group) {
	for(let i = 0; i < group.length - 1; i++) {
		for(let j = 0; j < group.length - 1; j++) {
			let distanceCurrent = getAvgDistanceToParents(group[j]);
			let distanceCurrentProbe = getAvgDistanceToParentsProbe(group[j], group[j + 1].leftPosition);
			
			let distanceOther = getAvgDistanceToParents(group[j + 1]);
			let distanceOtherProbe = getAvgDistanceToParentsProbe(group[j + 1], group[j].leftPosition);
				
			if(distanceCurrentProbe + distanceOtherProbe < distanceCurrent + distanceOther) {
				let temp = group[j];
				let tempLeftPosition = group[j].leftPosition;
				
				group[j].leftPosition = group[j + 1].leftPosition;
				group[j] = group[j + 1];
					
				group[j + 1].leftPosition = tempLeftPosition;
				group[j + 1] = temp;
			}
		}
	}
}

function getAvgGroupDistanceToParentsProbe(group, probeShift) {
	return group.reduce((acc, pers) => getAvgDistanceToParentsProbe(pers, pers.leftPosition + probeShift), 0) / group.length;
}

function getAvgGroupDistanceToParents(group) {
	return group.reduce((acc, pers) => acc + getAvgDistanceToParents(pers), 0) / group.length;
}

function getAvgDistanceToParentsProbe(person, probePosition) {
	return person.parent1 == null || person.parent1 == undefined ||
		   person.parent2 == null || person.parent2 == undefined ? 0 :
		(Math.abs(person.parent1.leftPosition - probePosition) + 
		 Math.abs(person.parent2.leftPosition - probePosition)) / 2;
}

function getAvgDistanceToParents(person) {
	return getAvgDistanceToParentsProbe(person, person.leftPosition);
}

function getPersonChildrenCount(person) {
	return person.merries.reduce((acc, merry) => acc + (merry == null ? 0 : merry.children.length), 0);
}

function getNextGroup(levelPeople) {
	let mostChildedPerson = levelPeople.filter(person => !person.in_group).reduce(
		(acc, person) => getPersonChildrenCount(acc) > getPersonChildrenCount(person) ? acc : person
	);
	
	return getPersonCoupleGroup(mostChildedPerson, levelPeople);
}

function hasCommonParent(p1, p2) {
	return (p1.parent1 != undefined && p1.parent1 != null && p2.parent1 != undefined && p2.parent1 != null && p1.parent1.id == p2.parent1.id) || 
		   (p1.parent1 != undefined && p1.parent1 != null && p2.parent2 != undefined && p2.parent2 != null && p1.parent1.id == p2.parent2.id) || 
		   (p1.parent2 != undefined && p1.parent2 != null && p2.parent1 != undefined && p2.parent1 != null && p1.parent2.id == p2.parent1.id) || 
		   (p1.parent2 != undefined && p1.parent2 != null && p2.parent2 != undefined && p2.parent2 != null && p1.parent2.id == p2.parent2.id);
}

function getPersonCoupleGroup(person, levelPeople) {
	let group = [person];
	person.in_group = true;
	
	let brotherSisterCouple = levelPeople.filter(pers => !pers.in_group && hasCommonParent(person, pers));
	let merryCouple = person.merries.filter(merry => merry != null && !merry.couple.in_group)
									.sort((merry, other) => other.children.length - merry.children.length - 1)
									.map(merry => merry.couple);
	
	let brothersSistersClear = brotherSisterCouple.filter(pers => merryCouple.find(p => p.id == pers.id) == undefined);
	let allNested = merryCouple;//.concat(brothersSistersClear);
	
	allNested.forEach(pers => pers.in_group = true);
	
	allNested.forEach(pers => {
		let nestedPeople = getPersonCoupleGroup(pers, levelPeople);
		if(group.length % 2 == 0) {
			for(let nestedPerson of nestedPeople)
				group.unshift(nestedPerson);
		}
		else {
			for(let nestedPerson of nestedPeople)
				group.push(nestedPerson);
		}
	});
	
	return group;
}

function createAllChildLines(people, personWidth, personHeight, personBorder, parentToChildLineHorisontalShift, lineStrength, tree) {
	for(let person of people) {
		for(let i = 0; i < person.merries.length; i++) {
			if(person.merries[i] == null || person.merries[i] == undefined || 
			   person.merries[i].children_built || person.merries[i].children.length == 0)
				continue;
			
			createChildLines(
				[person.view, person.merries[i].couple.view], 
				person.merries[i].children.map(child => child.view), 
				personWidth, personHeight, personBorder, 
				parentToChildLineHorisontalShift, lineStrength, tree
			);
			
			person.merries[i].children_built = true;
			person.merries[i].couple.merries.find(m => m.id == person.merries[i].id).children_built = true;
		}
	}
}

function createAllMerryLines(people, personWidth, personHeight, merrySymbolWidth, merrySymbolHeight, personBorder, tree) {
	for(let person of people) {
		for(let i = 0; i < person.merries.length; i++) {
			if(person.merries[i] == null || person.merries[i] == undefined || person.merries[i].merry_built)
				continue;
			
			createMerryLine(
				person.view, person.merries[i].couple.view, 
				personWidth, personHeight, merrySymbolWidth, merrySymbolHeight, 
				i != person.merries.length - 1, personBorder, tree
			);
			
			person.merries[i].merry_built = true;
			person.merries[i].couple.merries.find(m => m.id == person.merries[i].id).merry_built = true;
		}
	}
}

function locatePersonViews(treeSizes, viewClickHandler, buttonsClickHandler, parent) {
	let maxWidth = (personWidth + horisontalSpace) * treeSizes.maxWidth - horisontalSpace;
	
	for(let i = 0; i < treeSizes.levels.length; i++) {
		let wIndent = (maxWidth - treeSizes.levels[i].length * (personWidth + horisontalSpace) - horisontalSpace) / 2;
		for(let j = 0; j < treeSizes.levels[i].length; j++) {
			let person = treeSizes.levels[i][j];
			let personView = createPersonView(person, buttonsClickHandler);
			
			personView.style.top = ((treeSizes.levels.length - i) * (personHeight + verticalSpace) + verticalIndent) + "em";
			personView.style.left = (j * (personWidth + horisontalSpace) + wIndent + horisontalIndent) + "em";
			
			personView.onclick = (e) => { 
				e.person = person;
				viewClickHandler(e);
			}
			
			parent.appendChild(personView);
		}
	}
}

function createChildLines(parents, children, personWidth, personHeight, personBorder, middleShift, lineStrength, tree) {
	if(parents.length < 2 || children.length == 0)
		return;
	
	let lines = [];
	
	let relyParent = parents[0];
	let relyChild = children[0];
	
	let relyTop = parseInt(relyChild.style.top.replace("em", "")) + personHeight;
	let relyBottom = parseInt(relyParent.style.top.replace("em", ""));
	
	let hDistance = relyTop - relyBottom;
	let hDistanceFourth = hDistance / 4;
	
	let tempParentMiddles = parents.map(parent => parseInt(parent.style.left.replace("em", "")) + personWidth / 2);
	let tempMinMiddle = Math.min(...tempParentMiddles);
	let tempMaxMiddle = Math.max(...tempParentMiddles);
	let tempMiddleOfMiddle = tempMinMiddle + (tempMaxMiddle - tempMinMiddle) / 2;
	
	let parentMiddles = tempParentMiddles.map(middle => middle + (middle > tempMiddleOfMiddle ? -middleShift : middleShift));
	let minMiddle = Math.min(...parentMiddles);
	let maxMiddle = Math.max(...parentMiddles);
	let middleOfMiddle = minMiddle + (maxMiddle - minMiddle) / 2;
	
	parentMiddles.forEach(middle => lines.push(createLine(middle, relyBottom + hDistanceFourth, middle, relyBottom, "v-line", tree, "em")));
	lines.push(createLine(minMiddle, relyBottom + hDistanceFourth, maxMiddle, relyBottom + hDistanceFourth, "h-line", tree, "em"));
	
	let childrenMiddles = children.map(child => parseInt(child.style.left.replace("em", "")) + personWidth / 2);
	let minMiddleChild = Math.min(...childrenMiddles);
	let maxMiddleChild = Math.max(...childrenMiddles);
	let childrenMiddleOfMiddle = minMiddleChild + (maxMiddleChild - minMiddleChild) / 2;
	
	if(children != 1) {
		lines.push(createLine(minMiddleChild, relyTop - hDistanceFourth, maxMiddleChild, relyTop - hDistanceFourth, "h-line", tree, "em"));
		childrenMiddles.forEach(middle => lines.push(createLine(middle, relyTop + personBorder, middle, relyTop + lineStrength - hDistanceFourth, "v-line", tree, "em")));
	}
	
	if(Math.abs(childrenMiddleOfMiddle - middleOfMiddle) < personWidth / 4)
		lines.push(createLine(
			middleOfMiddle, children.length == 1 ? relyTop + personBorder : relyTop - hDistanceFourth, 
			middleOfMiddle, relyBottom + hDistanceFourth, "v-line", tree, "em"
		));
	else {
		let hStart = Math.min(middleOfMiddle, childrenMiddleOfMiddle);
		let hEnd = Math.max(middleOfMiddle, childrenMiddleOfMiddle) + lineStrength;
		
		lines.push(createLine(middleOfMiddle, relyBottom + hDistanceFourth * 2, middleOfMiddle, relyBottom + hDistanceFourth, "v-line", tree, "em"));
		lines.push(createLine(hStart, relyBottom + hDistanceFourth * 2, hEnd, relyBottom + hDistanceFourth * 2, "h-line", tree, "em"));
		lines.push(createLine(childrenMiddleOfMiddle, relyBottom + hDistanceFourth * 3, childrenMiddleOfMiddle, relyBottom + hDistanceFourth * 2, "v-line", tree, "em"));
	}
	
	children.forEach(child => 
		child.parentLines = parents.reduce((acc, parent) => 
			acc.concat(parent.parentLines == undefined ? [] : parent.parentLines), []
		).concat(lines)
	);
}

function createMerryLine(from, to, personWidth, personHeight, symbolWidth, symbolHeight, isEx, middleShift, tree) {
	let merrySymbol = createElement("div", [ isEx ? "ex-merry-symbol" : "merry-symbol" ], null, null, null, tree);
	
	let fromLeft = parseInt(from.style.left.replace("em", ""));
	let toLeft = parseInt(to.style.left.replace("em", ""));
	let top = parseInt(from.style.top.replace("em", ""));
	
	let left = Math.min(fromLeft + personWidth, toLeft + personWidth);
	let right = Math.max(fromLeft, toLeft);
	let distance = right - left;
	
	let width = (distance - symbolWidth) / 2;
	let lineTop = top + personHeight / 2;
	
	merrySymbol.style.width = symbolWidth + "em";
	merrySymbol.style.height = symbolHeight + "em";
	
	merrySymbol.style.left = (left + width) + "em";
	merrySymbol.style.top = (lineTop - symbolHeight / 2) + "em";
	
	createLine(left, lineTop, left + width, lineTop, "h-line", tree, "em");
	createLine(left + width + symbolWidth, lineTop, left + 2 * width + symbolWidth, lineTop, "h-line", tree, "em");
}

function createLine(xStart, yStart, xEnd, yEnd, style, parent, unit) {
	let line = createElement("div", [ style ], null, null, null, parent);
	
	let left = Math.min(xStart, xEnd);
	let right = Math.max(xStart, xEnd);
	let width = right - left;
	
	let top = Math.min(yStart, yEnd);
	let bottom = Math.max(yStart, yEnd);
	let height = bottom - top;
	
	line.style.left = left + unit;
	line.style.top = top + unit;
	
	if(width != 0)
		line.style.width = width + unit;
	
	if(height != 0)
		line.style.height = height + unit;
	
	return line;
}

function getTreeSize(rootPerson, allPeople) {
	markLevels(rootPerson, 0, []);
	
	let widths = [];
	for(let person of allPeople) {
		if(widths[person.height] == undefined)
			widths[person.height] = [];
		widths[person.height].push(person);
	}
	
	let heights = allPeople.map(person => person.height);
	
	return { 
		maxHeight : Math.max(...heights) - Math.min(...heights) + 1, 
		maxWidth : Math.max(...widths.map(level => level.length)),
		levels : widths
	};
}

function markLevels(person, height, ignore) {
	if(person == null || ignore.indexOf(person) != -1)
		return;
	
	ignore.push(person);
	person.height = height;
	
	for(let merry of person.merries) {
		if(merry == null)
			continue;
		
		for(let child of merry.children)
			markLevels(child, height + 1, ignore);
		
		markLevels(merry.couple, height, ignore);
	}
}

function createElement(tag, styles, id, attrs, textContent, parent) {
	let elem = document.createElement(tag);
	
	if(styles != null)
		for(let style of styles)
			elem.classList.add(style);
	
	if(id != null)
		elem.id = id;
	
	if(attrs != null)
		for(let key in attrs)
			elem.setAttribute(key, attrs[key]);
		
	if(textContent != null)
		elem.textContent = textContent;
	
	if(parent != null)
		parent.appendChild(elem);
	
	return elem;
}

function createLineSeparator(parent) {
	let row = createElement("tr", null, null, null, null, parent);
	let cell = createElement("td", null, null, null, null, row);
	let separator = createElement("div", [ "horisontal-person-info-separator" ], null, null, null, cell);
}

function createPersonView(person, buttonsClickHandler) {
	
	let tableWrapper = createElement("table", [ "person" ], "person_" + person.id, { cellpadding : 0, cellspacing : 0 }, null, null);
	let tableWrapperRow = createElement("tr", null, null, null, null, tableWrapper);
	
	let personPhotoCell = createElement("td", null, null, null, null, tableWrapperRow);
	let personPhotoUrl = person.photo_url == null || person.photo_url == undefined ? ('./imgs/default-' + person.sex + '.png') : person.photo_url;
	let personPhoto = createElement("div", [ "person-photo" ], null, { style : "background-image : url(" + personPhotoUrl + ")" }, null, personPhotoCell);
	
	let personInfoCell = createElement("td", null, null, null, null, tableWrapperRow);
	let personInfoTable = createElement("table", [ "person-info" ], null, { cellpadding : 0, cellspacing : 0 }, null, personInfoCell);
	
	let personNamesRow = createElement("tr", null, null, null, null, personInfoTable);
	let personNamesCell = createElement("td", null, null, null, null, personNamesRow);
	let personNamesCenter = createElement("center", [ "person-names" ], null, null, null, personNamesCell);
	
	createElement("div", [ "person-first-name" ], null, null, person.first_name + "\u00A0",  personNamesCenter);
	createElement("div", [ "person-last-name" ], null, null, person.last_name, personNamesCenter);
	
	createLineSeparator(personInfoTable);
	
	let personDatesRow = createElement("tr", null, null, null, null, personInfoTable);
	let personDatesCell = createElement("td", null, null, null, null, personDatesRow);
	let personDatesCenter = createElement("center", [ "person-dates" ], null, null, null, personDatesCell);
	
	createElement("div", [ "person-birth-date" ], null, null, person.birth_date, personDatesCenter);
	
	if(person.death_date != null && person.death_date != undefined)
		createElement("div", [ "person-death-date" ], null, null, ' — ' + person.death_date, personDatesCenter);	
	
	createLineSeparator(personInfoTable);
	
	let personBirthHistoryRow = createElement("tr", null, null, null, null, personInfoTable);
	let personBirthHistoryCell = createElement("td", null, null, null, null, personBirthHistoryRow);
	createElement("center", [ "birth-history" ], null, null, person.birth_history, personBirthHistoryCell);
	
	if(person.death_date != null && person.death_date != undefined) {
		createLineSeparator(personInfoTable);
		let personDeathHistoryRow = createElement("tr", null, null, null, null, personInfoTable);
		let personDeathHistoryCell = createElement("td", null, null, null, null, personDeathHistoryRow);
		createElement("center", [ "death-history" ], null, null, person.death_history, personDeathHistoryCell);
	}
	
	let personButtonsCell = createElement("td", null, null, null, null, tableWrapperRow);
	let personButtonsTable = createElement("table", [ "person-buttons" ], null, { cellpadding : 0, cellspacing : 0 }, null, personButtonsCell);
	
	let personButtonsRow1 = createElement("tr", null, null, null, null, personButtonsTable);
	let personButtonsRow2 = createElement("tr", null, null, null, null, personButtonsTable);
	let personButtonsRow3 = createElement("tr", null, null, null, null, personButtonsTable);
	let personButtonsRow4 = createElement("tr", null, null, null, null, personButtonsTable);
	
	let personButtonsCell1 = createElement("td", null, null, { valign : "middle" }, null, personButtonsRow1);
	let personButtonsCell2 = createElement("td", null, null, null, null, personButtonsRow2);
	let personButtonsCell3 = createElement("td", null, null, null, null, personButtonsRow3);
	let personButtonsCell4 = createElement("td", null, null, null, null, personButtonsRow4);
	
	let mainInfoButton = createElement("div", [ "person-button", "main-info-button" ], null, null, null, personButtonsCell1);
	let parentsButton = createElement("div", [ "person-button", "top-person-button", "parents-button" ], null, null, null, personButtonsCell2);
	let brothersSistersButton = createElement("div", [ "person-button", "brothers-sisters-button" ], null, null, null, personButtonsCell3);
	let merriesButton = createElement("div", [ "person-button", "bottom-person-button", "merries-button" ], null, null, null, personButtonsCell4);
	
	mainInfoButton.onclick = () => buttonsClickHandler(personButtons.mainInfoButton);
	parentsButton.onclick = () => buttonsClickHandler(personButtons.parentsButton);
	brothersSistersButton.onclick = () => buttonsClickHandler(personButtons.brothersSistersButton);
	merriesButton.onclick = () => buttonsClickHandler(personButtons.merriesButton);
	
	person.view = tableWrapper;
	return tableWrapper;
}