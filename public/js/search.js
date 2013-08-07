var serviceUrl = "http://www.skidin.com/find?q=";


			// require([
			// 	"dojo/store/JsonRest",
			// 	"dojo/store/Memory",
			// 	"dojo/store/Cache",
			// 	"dojox/grid/DataGrid",
			// 	"dojo/data/ObjectStore",
			// 	"dojo/query",
			// 	"dojo/domReady!"
			// ], function(JsonRest, Memory, Cache, DataGrid, ObjectStore, query){
			// 	var myStore, dataStore, grid;
			// 	var jsonStore = new JsonRest({target:serviceUrl});
			// 	myStore = new Cache(jsonStore, new Memory());
			// 	grid = new DataGrid({
			// 		store: dataStore = new ObjectStore({objectStore: myStore}),
			// 		structure: [
			// 			{name:"N", field:""},
			// 			{name:"365_net_demand", field:"365_net_demand"},
			// 			{name:"id", field:"_id"},
			// 			{name:"best_reorder_point", field:"best_reorder_point"},
			// 			{name:"best_stocking_level", field:"best_stocking_level"},
			// 			{name:"bin_location", field:"bin_location"},
			// 			{name:"company", field:"company"},
			// 			{name:"cost", field:"cost"},
			// 			{name:"date_in_inv", field:"date_in_inv"},
			// 			{name:"date_phase_out", field:"date_phase_out"},
			// 			{name:"days_measured_for_orders", field:"days_measured_for_orders"},
			// 			{name:"days_supply", field:"days_supply"},
			// 			{name:"description", field:"description"},
			// 			{name:"enterprise", field:"enterprise"},
			// 			{name:"enterprise_company", field:"enterprise_company"},
			// 			{name:"flat_price", field:"flat_price"},
			// 			{name:"last_sale_date", field:"last_sale_date"},
			// 			{name:"list", field:"list"},
			// 			{name:"manufacturer", field:"manufacturer"},
			// 			{name:"mtd_net_demand", field:"mtd_net_demand"},
			// 			{name:"number", field:"number"},
			// 			{name:"on_order", field:"on_order"},
			// 			{name:"qty_on_hand", field:"qty_on_hand"},
			// 			{name:"shelf_location", field:"shelf_location"},
			// 			{name:"status", field:"status"},
			// 			{name:"stocking_group", field:"stocking_group"},
			// 			{name:"stocking_guides", field:"stocking_guides"},
			// 			{name:"weighted_daily_avg_demand", field:"weighted_daily_avg_demand"}
			// 		],
			// 		height: "60%",
			// 		query: "kit"
			// 	}, "gridDiv"); // make sure you have a target HTML element with this id
			// 	grid.startup();
			// });


// Init Daily Summary Form:
require(["dojo/dom", 
	"dojo/dom-construct",
	"dojo/store/Memory",
	"dojo/data/ObjectStore",
	"dojo/query",
	"dojo/domReady!",
	"dojox/grid/DataGrid",
	"dojox/validate",
	"dijit/layout/BorderContainer",
	"dijit/layout/AccordionContainer",
	"dijit/layout/ContentPane",
	"dijit/form/DateTextBox", 
	"dijit/form/ValidationTextBox",
	"dijit/form/Form",
	"dijit/form/Button", 
	"dijit/form/Select",
	"dijit/form/CheckBox"], 
	function(dom, domConstruct) {
	    // Call reusable function to add select drop down:
	    // addSelect("Series", "Series", "http://localhost:8080/app/rest/service-url", "SeriesLoadingIcon");
	    addTextBox("Query","QueryText");
	    // Add Search & Reset buttons:
	    addSearchResetButtons();    
}); 

function getDataUrl() {
	var query = getText("QueryText");
	return serviceUrl + query;
}

function getCriteriaHTML() {
	var html = "<table width=\"*\" border=0>" + 
			"<tr><td>Query: </td><td>"+getText("query")+"</td></tr>" + 
			"<tr><td>Service URL: </td><td>"+getDataUrl()+"</td></tr>";
	if(debug) {
		html += "<tr><td>Service Response: </td><td><span id='ServiceResponse"+resTabCount+"'></span></td></tr></table>";
	} else {
		html += "</table>";
	}
	return html;
}

function resetForm() {
	document.forms[0].reset();
	dijit.byId("SearchButton").setAttribute('disabled', false);
}

function isDirectCaseRequest() {
	return false;
}
