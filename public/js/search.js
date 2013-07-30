var serviceUrls = new Array();

// Init Daily Summary Form:
require(["dojo/dom", 
	"dojo/dom-construct",
	"dojo/store/Memory",
	"dojo/data/ObjectStore",
	"dojo/query",
	"dojo/domReady!",
	"dojox/grid/EnhancedGrid",
	"dojox/grid/enhanced/plugins/NestedSorting",
	"dojox/grid/enhanced/plugins/Printer",
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
	    addSelect("Series", "Series", "http://localhost:8080/app/rest/service-url", "SeriesLoadingIcon");
	    // Add Search & Reset buttons:
	    addSearchResetButtons();    
}); 

function getDataUrl() {
	var series = getText("SeriesSelect");
	if(!series) { series = "*"; }
	return serviceUrls[formIndex] + series + "/json";
}

function getCriteriaHTML() {
	var html = "<table width=\"*\" border=0>" + 
			"<tr><td>Series: </td><td>"+getText("SeriesSelect")+"</td></tr>" + 
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
