// Common JavaScript code

var evalStr = ""; 
var searchBtnMap = new Map();
var maxJsonRowsDisplayed = 1;
var emptyLabel = "&nbsp;&nbsp;&nbsp;&nbsp;";

//Max Height of all select boxes except office select (defined in office-select.js)
var maxSelectHeight = 200;

// Load JSON data and display in a new tab from specified URL or from a form:
function loadData(url) {
	if(!url) {
		if(!validateForm()) {
			alert("Form is invalid. Please select all required fields and try again.");
			return;
		}
		url = getDataUrl();
	}
	$.getJSON(url, function(json) {
		var totalMap = new Map(); 
		var myStore = new dojo.store.Memory();		
		// Construct grid header
		var layout = [[
					{name:"id", field:"_id"},
					{name:"company", field:"company"},
					{name:"cost", field:"cost"},
					{name:"date_in_inv", field:"date_in_inv"},
					{name:"date_phase_out", field:"date_phase_out"},
					{name:"days_supply", field:"days_supply"},
					{name:"description", field:"description"},
					{name:"last_sale_date", field:"last_sale_date"},
					{name:"list", field:"list"},
					{name:"manufacturer", field:"manufacturer"},
					{name:"mtd_net_demand", field:"mtd_net_demand"},
					{name:"number", field:"number"},
					{name:"on_order", field:"on_order"},
					{name:"qty_on_hand", field:"qty_on_hand"},
					{name:"shelf_location", field:"shelf_location"},
					{name:"status", field:"status"}
					]];
		for(key in json) {
  			var obj = json[key];
  			var rowEval = "myStore.add({"; 
  			var i = 0;
  			for(name in obj) {
  				var value = obj[name];
  				if(name == "") { name = "N"; }
				rowEval += "\"" + name + "\": \"" + value + "\", ";
			}
			rowEval += "\"X\": \"\" });";
			eval(rowEval);
  		}
  		// Create grid#:	
  		var dataStore  = dojo.data.ObjectStore({objectStore: myStore});
 		var grid = new dojox.grid.DataGrid({
 			id: "grid",
			store: dataStore,
			structure: layout,
			height: "80%"
		}, "gridDiv"); 
		grid.startup();
  	});	
}

function validateForm() {
	return  validateItem('OfficeSelect')&&
			validateItem('DateText')&&
			validateItem('StartDateText')&&
			validateItem('EndDateText'); 
}

function validateItem(id) {
	if(dijit.byId(id)) {
		return dijit.byId(id).validate();
	} else {
		// if doesn't exists - then default to valid:
		return true;
	}
}

function addRunDate(prefix) {
	if(prefix == null) {
		prefix = "";
	}
	// Set default date - yesterday
	var runDate = new Date();
	runDate.setDate(runDate.getDate()-1);
	var runDateTextBox = new dijit.form.DateTextBox({
		id: prefix+"DateText",
		regExp: '\\d\\d?/\\d\\d?/\\d{4}', 
		invalidMessage: 'Invalid Date. Use mm/dd/yyyy format.',
		required: true,
		value: runDate
	}, prefix+"Date");
	dijit.byId(prefix+'DateText').constraints.max = dijit.byId(prefix+'DateText').get('Value');
}

function addStartAndEndDates(prefix) {
	if(prefix == null) {
		prefix = "";
	}
	var startDateId = prefix+"StartDateText";
	var endDateId = prefix+"EndDateText";
	// Set default start date a month ago
	var startDate = new Date();
	startDate.setMonth(startDate.getMonth()-2);
	var startDateTextBox = new dijit.form.DateTextBox({
		id: startDateId,
		regExp: '\\d\\d?/\\d\\d?/\\d{4}', 
		invalidMessage: 'Invalid Start Date. Use mm/dd/yyyy format.',
		onChange: function() { dijit.byId(endDateId).constraints.min = this.get('Value'); },
		value: startDate
	}, prefix+"StartDate");
	
	// default end date - yesterday
	var endDate = new Date();
	endDate.setDate(endDate.getDate()-1);
	var endDateTextBox = new dijit.form.DateTextBox({
		id: endDateId,
		regExp: '\\d\\d?/\\d\\d?/\\d{4}', 
		invalidMessage: 'Invalid End Date. Use mm/dd/yyyy format.',
		onChange: function() { dijit.byId(startDateId).constraints.max = this.get('Value'); },
		required: true,
		value: endDate 
	}, prefix+"EndDate");
	
	// Set default min/max constraints:
	//dijit.byId(startDateId).constraints.min = dijit.byId(startDateId).get('Value');
	dijit.byId(startDateId).constraints.max = dijit.byId(endDateId).get('Value');
	dijit.byId(endDateId).constraints.min = dijit.byId(startDateId).get('Value');
	dijit.byId(endDateId).constraints.max = dijit.byId(endDateId).get('Value');
}

function addStartAndEndAmounts(prefix) {
	if(prefix == null) {
		prefix = "";
	}
	var startAmountId = prefix+"StartAmountText";
	var endAmountId = prefix+"EndAmountText";
	// Set Example currency props:
	var example = dojo.currency.format(54775.53, {locale: 'en-us', currency: "USD"});
    var startCurTextBox = new dijit.form.CurrencyTextBox({
    	id: startAmountId,
        value: 0.0,
        lang: 'en-us',
        currency: "USD",
        invalidMessage: "Invalid amount.  Example: " + example,
        onChange: function() { dijit.byId(endAmountId).constraints.min = this.get('Value'); }
    }, prefix+"StartAmount");	
	// default end date - yesterday
    var endCurTextBox = new dijit.form.CurrencyTextBox({
    	id: endAmountId,
        value: 0.0,
        lang: 'en-us',
        currency: "USD",
        invalidMessage: "Invalid amount.  Example: " + example,
        onChange: function() { dijit.byId(startAmountId).constraints.max = this.get('Value'); }
    }, prefix+"EndAmount");
}

function addSearchResetButtons(prefix) {
	if(prefix == null) {
		prefix = "";
	}
	// Add Search & Reset buttons:
    var searchBtn = new dijit.form.Button({    
    	id: prefix+"SearchButton",
		label: "Search", 
		onClick: function(){ 
			loadData(); 
		}             
	}, prefix+"Search");
	searchBtn.startup();
	searchBtnMap.put(prefix+"SearchButton", searchBtn);
	var resetBtn = new dijit.form.Button({
		id: prefix+"ResetButton",                     
		label: "Reset", 
		onClick: function(){ 
			resetForm(); 
		}             
	}, prefix+"Reset");
	resetBtn.startup();
}

function addCheckBox(container, id, checked) {
	return new dijit.form.CheckBox({
		id: id,
		checked: checked
	}, container);
}

function addTextBox(container, id) {
	return new dijit.form.ValidationTextBox({
		id: id
	}, container);
}

function addRegExpTextBox(container, id, regexp, invalidMessage) {
	return new dijit.form.ValidationTextBox({
		id: id,
		regExp: regexp, 
		invalidMessage: invalidMessage
	}, container);
}

function addSelectWithOptions(container, id, options) {
	var select = new dijit.form.Select({
		id: id,
		maxHeight: maxSelectHeight,
		options: options
	}, container);
	return select;
} 

function addSelect(container, id, url, loadingIconId) {
	var select = new dijit.form.Select({
		id: id,
		maxHeight: maxSelectHeight,
		options: [{ label: emptyLabel, value: '', selected: true }]
	}, container);
	initSelect(select, url, loadingIconId);
	return select;
} 

function addSelectWithAll(container, id, url, loadingIconId) {
	var select = new dijit.form.Select({
		id: id,
		maxHeight: maxSelectHeight,
		options: [{ label: 'All', value: '*', selected: true }]
	}, container);
	initSelect(select, url, loadingIconId);
	return select;
} 

function initSelect(select, jsonUrl, loadingIconId) {
	$.getJSON(jsonUrl, 
		function(json) {
				for(var i = 0; i < json.reports.rows.length; i++) {
			  		for(var j = 0; j < json.reports.rows[i].dbrecords.length; j++) {
			  			var value = json.reports.rows[i].dbrecords[j].value;
			  			if(value) {
			  				select.addOption( { label: value, value: value } );
			  			} 
			  		}
			  	}
				if(loadingIconId) {
					document.getElementById(loadingIconId).style.visibility="hidden";
				}
		});
}


function json2HTML(json) {
	var HTML = "JSON {";
	var resCount = json.reports.count;
	var repName = json.reports.name;
	HTML += resCount + " records, Message: " + repName;
	for(var i = 0; i < json.reports.rows.length; i++) {
		HTML += "<br/>{"; 
		for(var j = 0; j < json.reports.rows[i].dbrecords.length; j++) {
			var name = json.reports.rows[i].dbrecords[j].name;
			var value = json.reports.rows[i].dbrecords[j].value;
			var type = json.reports.rows[i].dbrecords[j].type;
			HTML += (j+1) + ":[name = '" + name + "', type = '" + type + "', value = '" + value + "']";
			if(j < (json.reports.rows[i].dbrecords.length-1)) {
				HTML += ",<br/>";
			}
		}
		HTML += "},";
		if(i >= maxJsonRowsDisplayed-1) {
			HTML += "<br/>{ ... " + (json.reports.rows.length - maxJsonRowsDisplayed) + " more records ... }";
			break;
		}
	}
	HTML += " }";
	return HTML;
}

function formatString(str) {
	if(str == null) {
		return "";
	} else if(str == "null") {
		return "";
	} else if(str == "NULL") {
		return "";
	} else if(str == "Null") {
		return "";
	} else {
		return str;
	}
}

function formatNumber(num) {
	num = isNaN(num) || num === '' || num === null ? 0.00 : num;
	try {
		return parseFloat(num);
	} catch(err) {
		return num;
	}
}

function formatCurrency(num) { 
	num = isNaN(num) || num === '' || num === null ? 0.00 : num; 
	return parseFloat(num).toFixed(2); 
}

function formatDate(dt) {
	if(dt == null) {
		return "";
	} else if(dt.indexOf(' ') > 0) {
		// split into date, time portions:
		var dtarr = dt.split(' ');
		if(dtarr[0].indexOf('-') > 0) {
			// then split date into yy,mm,dd 
			var yymmdd = dtarr[0].split('-');
			if(yymmdd.length == 3) {
				// and form new date format:
				return yymmdd[1]+"/"+yymmdd[2]+"/"+yymmdd[0];
			} else if(yymmdd.length == 2) {
				return yymmdd[1]+"/"+yymmdd[0];
			} else if(yymmdd.length == 1) {
				return yymmdd[0];
			} else {
				return dtarr[0];
			}
		} else {
			return dtarr[0];
		}
	} else {
		return dt;
	}
}


function loadDataInDialog(url, title) {
	$.getJSON(url, 
			function(json) {
				if(!json) {
					alert("Could not retrieve data from " + url);
					return;
				}
				var content = "<p>";
				var counter = 0;
				for(var j = 0; j < json.reports.rows[0].dbrecords.length; j++) {
					var value = json.reports.rows[0].dbrecords[j].value;
					if(value) {
						content += value + "<br/>";
						counter++;
					}
				}
				content += "</p>";
				if(counter > 0) {
					showDialog(content, title);
				} else {
					alert("No data available from " + url);
				}
			});	
}

function showDialog(content, title) {
	if(!title) { title = "Dialog"; }
	require(["dojo/ready", "dijit/Dialog"], function(ready, Dialog){
	    ready(function(){
	        detDialog = new Dialog({
	            title: title,
	            content: formatAdvice(content),
	            style: "width: 500px"
	        });
	        detDialog.show();
	    });
	});
}

function customEncodeURLParameter(param) {
	var enc = encodeURIComponent(param);
	return enc.replace(/\%([\d\w]{2})/gi, "@$1@");
}

function isChecked(id) {
	if(dijit.byId(id)) {
		return dijit.byId(id).checked;
	} else {
		return false;
	}
}

function getText(id) {
	if(dijit.byId(id)) {
		return dijit.byId(id).get("value");
	} else {
		return "";
	}
}

function getDate(id, sep) {
	var date = dijit.byId(id).get("value");
	var month = (1 + date.getMonth()).toString();
	var day = date.getDate().toString();
	var year = date.getFullYear().toString();
	if(month < 10) {
		month = "0" + month;
	}
	if(day < 10) {
		day = "0" + day;
	}
	year = year.substring(2);
	return year + sep + month + sep + day;
}



