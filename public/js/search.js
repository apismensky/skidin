var serviceUrl = "http://www.skidin.com/find?q=";

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

function resetForm() {
	document.getElementById("gridDiv").innerHTML = "";
}

