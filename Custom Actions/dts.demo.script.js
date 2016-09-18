console.log("loading dts.demo.script.js :" + window.location.href);

// Register script for MDS if possible
RegisterModuleInit("dts.demo.script.js", EnsureWoWScript_Inject); //MDS registration
EnsureWoWScript_Inject(); //non MDS run

if (typeof (Sys) != "undefined" && Boolean(Sys) && Boolean(Sys.Application)) {
    Sys.Application.notifyScriptLoaded();
}

if (typeof (NotifyScriptLoadedAndExecuteWaitingJobs) == "function") {
    NotifyScriptLoadedAndExecuteWaitingJobs("dts.demo.script.js");
}

function EnsureWoWScript_Inject() {
    //sp.js is required;
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
        //SP client model is now loaded
        // do something if needed
    });
}

// initialize the namespace 
Type.registerNamespace('DTS.Demo')
DTS.Demo = DTS.Demo || {};
console.log("registerNamespace: DTS.Demo");


DTS.Demo.ActionFunction = function (spListOperation, archiveFolderContentTypeId, archivedDocumentContentTypeId, documentContentTypeId, listUrl, isRequiredChekcOutOn, isContentApprovalOn) {

    var selectedItems = spListOperation.Selection.getSelectedItems(); // Retrieve selected items

    if (selectedItems.length > 0) {
        //you logic here
        var message = "";
        for (var i = 0; i < selectedItems.length; i++) {
            message += selectedItems[i].id + "| ";
        }
        alert(message);

    }
    else {
        alert("Please select documents...")
    }
};

DTS.Demo.ActionFunctionSingleDocument = function (itemId) {

    if (itemId > 0) {
        //you logic here
        alert("Selected ID: " + itemId);
    }
    else {
        alert("Error: Document is not loaded. Please contact the site administrator.")
    }
}

