var regions = [{label: 'USA', value: 'US', selected: true}, {label: 'Europe', value: 'ECE'}];
var steering = [{label: 'Left', value: 'L', selected: true}, {label: 'Right', value: 'R'}];

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
            addSelect("Series", "Series", "http://www.skidin.com/series/index");
            addSelect("Body", "Body", "http://www.skidin.com/bodies/index");
            addSelect("Model", "Model", "http://www.skidin.com/models/index");
	    addSelectWithOptions("Region", "Region", regions);
	    addSelectWithOptions("Steering", "Steering", steering);
            addSelect("Group", "Group", "http://www.skidin.com/groups/index");
	    // Add Search & Reset buttons:
	    addSearchButton();    
}); 



