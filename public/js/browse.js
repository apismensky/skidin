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
        var seriesSelect = addSelect("SeriesC", "Series", "http://www.skidin.com/series/index");
        seriesSelect.on("change", function(){
        	refreshModels();
  		});
        var bodySelect = addSelect("BodyC", "Body", "http://www.skidin.com/bodies/index");
        bodySelect.on("change", function(){
        	refreshModels();
  		});
        addSelect("ModelC", "Model", "http://www.skidin.com/models/index");
	    addSelectWithOptions("RegionC", "Region", regions);
	    addSelectWithOptions("SteeringC", "Steering", steering);
        var groupSelect = addSelect("GroupC", "Group", "http://www.skidin.com/groups/index");
        groupSelect.on("change", function(){
        	refreshSubgroups();
  		});
	    // Add Search & Reset buttons:
	    addSearchButton(); 
	    refreshAll();   
}); 


function refreshAll() {
	refreshSubgroups();
	refreshModels();
}

function refreshProdMonth() {
	
}

function refreshSubgroups() {
	var subgroupUrl = "http://www.skidin.com/subgroups/" + getText("Group");
    var subgroupSelect = addSelect("SubgroupC", "Subgroup", subgroupUrl);
}

function refreshModels() {
	var modelUrl = "http://www.skidin.com/models/" + getText("Series");
    var body = getText("Body");
    if(body) { 
        modelUrl += "/" + body;
    }
    var modelSelect = addSelect("ModelC", "Model", modelUrl);
}

