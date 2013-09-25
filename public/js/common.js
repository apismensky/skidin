// Common JavaScript code

var evalStr = ""; 
var maxJsonRowsDisplayed = 1;
var emptyLabel = "&nbsp;&nbsp;&nbsp;&nbsp;";

//Max Height of all select boxes except office select (defined in office-select.js)
var maxSelectHeight = 200;
var gridCounter = 0;
var gridLayout = [[
		{name:"Dno", field:"dno", width:"35px"},
		{name:"Part #", field:"partno", width:"90px" },
		{name:"Description", field:"description", width:"180px"},
		{name:"Qty", field:"qty", width:"35px"},
		{name:"Price", field:"price", width:"50px"},
		{name:"From Date", field:"fromdate", width:"80px"},
		{name:"Upto Date", field:"uptodate", width:"80px"},
		{name:"Supplement", field:"supplement", width:"90px"},
		{name:"Notes", field:"notes", width:"60px"}
]];


function loadDiagramPartsData(divid, url) {
	var datacount = 0;
	$.getJSON(url, function(json) {
		var gridStore = new dojo.store.Memory();	
		for(key in json) {
  			var obj = json[key];
  			var rowEval = "gridStore.add({"; 
  			var i = 0;
  			for(name in obj) {
  				var value = obj[name];
  				if(name == "") { name = "N"; }
  				if(value == "null") { value = ""; }
  				if(value == null) { value = ""; }
				rowEval += "\"" + name + "\": \"" + value + "\", ";
			}
			rowEval += "\"X\": \"\" });";
			eval(rowEval);
			datacount++;
  		}
  		// Create grid#:	
  		if(datacount > 0) {
  			var dataStore  = dojo.data.ObjectStore({objectStore: gridStore});
  			var grid = new dojox.grid.DataGrid({
 				id: divid+"-grid-"+(++gridCounter),
				store: dataStore,
				structure: gridLayout,
				autoHeight:true
			}, divid); 
			grid.startup();
		} else {
			$("#"+divid).html("No parts available");
		}
  	});	
}

// Load JSON data and display in a new tab from specified URL or from a form:
function loadData(url) {
	if(!url) { url = getDataUrl(); }
	$.getJSON(url, function(json) {
		var myStore = new dojo.store.Memory();		
		// Construct grid header
		var layout = [[
					{name:"Id", field:"_id", width:"200px"},
					{name:"Company", field:"company", width:"90px" },
					{name:"Cost", field:"cost", width:"80px"},
					{name:"Date in inventory", field:"date_in_inv", width:"70px"},
					{name:"Date phase out", field:"date_phase_out", width:"70px"},
					{name:"Days supply", field:"days_supply", width:"70px"},
					{name:"Description", field:"description", width:"200px"},
					{name:"Last sale date", field:"last_sale_date", width:"70px"},
					{name:"List", field:"list", width:"70px"},
					{name:"Manufacturer", field:"manufacturer", width:"90px"},
					{name:"Mtd net demand", field:"mtd_net_demand", width:"60px"},
					{name:"Number", field:"number", width:"100px"},
					{name:"On order", field:"on_order", width:"60px"},
					{name:"Qty on hand", field:"qty_on_hand", width:"60px"},
					{name:"Shelf location", field:"shelf_location", width:"60px"},
					{name:"Status", field:"status", width:"50px"}
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
  		if(grid == null) {
 			grid = new dojox.grid.DataGrid({
 				id: "grid",
				store: dataStore,
				structure: layout,
				height: "80%"
			}, "gridDiv"); 
			grid.startup();
		} else {
			grid.setStore(dataStore);
		}
  	});	
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

function addSearchButton(prefix) {
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

function addSelect(container, id, url, callback) {
	var select = dijit.byId(id);
    if(select) {
      	select.removeOption(select.getOptions());
   	} else {
 		select = new dijit.form.Select({
			id: id,
			options: []
		}, container);
 	}
    $.getJSON(url, function(json) {
			for(idx in json) {
                var obj = json[idx];
                var objId = $.trim(obj['id']);
                var objName = $.trim(obj['name']);
                var option = { label: objName, value: objId };
                if(!select.getOptions(objId)) {
					select.addOption( option );
				}
            }
            if(callback) {
            	callback();
            }
    });
	return select;
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



