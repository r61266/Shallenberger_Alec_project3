// JavaScript Document
// Alec Shallenberger
// April 17, 2013
// Term 1304
// VFW Project2

window.addEventListener("DOMContentLoaded", function(){
		
	
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	function makeSpec(){
		var formTag = document.getElementsByTagName("form");	
			selectLi = $('select');
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "holiday");
		for (var i=0, j=specHoliday.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = specHoliday[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect); 	
	}

	var checkboxes = document.getElementById("checklistForm").dishes;
	var sideValue = function(){
		for(i=0, j=checkboxes.length; i<j; i++){
			if(checkboxes[i].checked){
				console.log(checkboxes[i].value);
			}
		}
	};
	
				
	function toggleControls(n){
		switch(n){
			case "on":
				$('checklistForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('checklsitForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}	
	}
	
	
	function storeData(){
		var id				= Math.floor(Math.random()*14685325);
		sideValue();
		var item			= {};
			item.holigroup	= ["Holiday:", $('holiday').value];
			item.app		= ["Appitzer:", $('app').value];
			item.mname		= ["Main Meal:", $('mname').value];	
			item.side		= ["Sides Dishes:", sideValue];
			item.date		= ["Date:", $('date').value];
			item.amofpeople	= ["Amount of People:", $('amofpeople').value];
			item.notes		= ["Notes:", $('notes').value];
		localStorage.setItem(id, JSON.stringify(item));
		alert("Checklist Saved!");
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage.");
		}
		
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.displau = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			for(var k in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[k][0]+" "+obj[k][1];
				makeSubli.innerHTML = optSubText;
			}
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("All checklists are deleted!");
			window.location.reload();
			return false;
		}	
	}
	
	
	//Variable defualts
	var specHoliday = ["--Choose a Holiday--", "Christmas", "Thanksgiving", "Easter", "Hanukkah", "New Years", "St. Patricks", "Fourth of July"];
		
	
	
	makeSpec();
	
	
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);
	
	
});