var regions = [{label: 'USA', value: 'US', selected: true}, {label: 'Europe', value: 'ECE'}];
var steering = [{label: 'Left', value: 'L', selected: true}, {label: 'Right', value: 'R'}];

var currentProdCode = "";

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
        var seriesSelect = addSelect("SeriesC", "Series", "http://www.skidin.com/series/index", refreshModels);
        seriesSelect.on("change", function(){
        	refreshModels();
  		});
        var bodySelect = addSelect("BodyC", "Body", "http://www.skidin.com/bodies/index", refreshModels);
        bodySelect.on("change", function(){
        	refreshModels();
  		});
        var modelSelect = addSelect("ModelC", "Model", "http://www.skidin.com/models/index", refreshEngine);
        modelSelect.on("change", function(){
        	refreshEngine();
  		});
	    var regionSelect = addSelectWithOptions("RegionC", "Region", regions);
	    regionSelect.on("change", function(){
        	refreshEngine();
  		});
	    var steeringSelect = addSelectWithOptions("SteeringC", "Steering", steering);
	    steeringSelect.on("change", function(){
        	refreshEngine();
  		});
        var groupSelect = addSelect("GroupC", "Group", "http://www.skidin.com/groups/index", refreshSubgroups);
        groupSelect.on("change", function(){
        	refreshSubgroups();
  		});
	    // Add Search & Reset buttons:
	    addSearchButton(); 
	    refreshAll();   
}); 


function addEngineSelect(url, callback) {
	var select = dijit.byId("Engine");
    if(select) {
      	select.removeOption(select.getOptions());
   	} else {
 		select = new dijit.form.Select({
			id: "Engine"
		}, "EngineC");
 	}
    $.getJSON(url, function(json) {
			for(idx in json) {
                var obj = json[idx];
                var engine = $.trim(obj['engine']);
                var option =  { label: engine, value: engine };
                if(!select.getOptions(engine)) {
					select.addOption( option );
				}
            }
            if(callback) {
            	callback(url);
            }
    });
	return select;
}

function refreshAll() {
	refreshSubgroups();
	refreshModels();
	refreshEngine();
}

function refreshEngine() {
	var sid = $.trim(getText("Series"));
	var bid = $.trim(getText("Body"));
	var mid = $.trim(getText("Model"));
	var region = $.trim(getText("Region"));
	var steering = $.trim(getText("Steering"));
	if(sid && mid && bid && region && steering) {
		var url = "http://www.skidin.com/prodcodes/"+mid+"/"+bid+"/"+sid+"/"+region+"/"+steering;
		var select = addEngineSelect(url, refreshProdCode);
		select.on("change", function(){
        	refreshProdCode(url);
  		});
	}
}

function refreshProdCode(url) {
	var engine = $.trim(getText("Engine"));
	if(engine) {
		url+="/"+engine;
	}
	$.getJSON(url, function(json) {
		var html = "";
		for(idx in json) {
            var obj = json[idx];	
       		currentProdCode = $.trim(obj['id']); 
			var description = obj['description'];	
			html = "<p><b>"+currentProdCode+"</b>: "+description+"</p>";
        }
        $("#ProdCodeDiv").html(html);
        refreshProdMonth();
    });
}

function refreshProdMonth() {
	var url = "http://www.skidin.com/prodcodedates/"+currentProdCode;
	var select = dijit.byId("ProdMonth");
    if(select) {
      	select.removeOption(select.getOptions());
   	} else {
 		select = new dijit.form.Select({
			id: "ProdMonth"
		}, "ProdMonthC");
		select.on("change", function(){
        	refreshDiagrams;
  		});
 	}
 	if(currentProdCode) {
    	$.getJSON(url, function(json) {
			for(idx in json) {
                var obj = json[idx];
                var prodmonth = $.trim(obj['prodmonth']);
                var option = { label: prodmonth, value: prodmonth };
                if(!select.getOptions(prodmonth)) {
					select.addOption(option);
				}
            }
            refreshDiagrams();
    	});
	}
	return select;
}

function refreshDiagrams() {
	var pid = $.trim(currentProdCode);
	var sgid = $.trim(getText("Subgroup"));
	if(pid && sgid) {
		var url = "http://www.skidin.com/diagrams/"+pid+"/"+sgid;
		$("#ResultDiv").html(url);
		$.getJSON(url, function(json) {
			for(idx in json) {
                var obj = json[idx];
                var did = $.trim(obj['id']);
                var dname = $.trim(obj['name']);
                var dimage = $.trim(obj['image']);
                $("#ResultDiv").html("<p>"+did+": "+dname+", "+dimage+"</p>");
            }
    	});
	}
}

function refreshSubgroups() {
	var group = $.trim(getText("Group"))
	if(group) {
		var subgroupUrl = "http://www.skidin.com/subgroups/"+group;
    	var subgroupSelect = addSelect("SubgroupC", "Subgroup", subgroupUrl, refreshDiagrams);
    }
}

function refreshModels() {
	var series = $.trim(getText("Series"));
	var modelUrl = "http://www.skidin.com/models/"
	if(series) {
		modelUrl += series;
		var body = $.trim(getText("Body"));
    	if(body) { 
        	modelUrl += "/" + body;
    	}
    } else {
		modelUrl += "index";
	}
    
    var modelSelect = addSelect("ModelC", "Model", modelUrl, refreshEngine);
}




