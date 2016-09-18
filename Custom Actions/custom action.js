/////////////// Read Actions /////////////
function ReadActions(listUrl) {

    var context = SP.ClientContext.get_current();
    list = context.get_web().getList(listUrl);

    var collUserCustomAction = list.get_userCustomActions();
    context.load(list);
    context.load(collUserCustomAction);
    context.executeQueryAsync(
             function (a, b) {
                 var enumerator = collUserCustomAction.getEnumerator();
                 var removeThese = []
                 // find the custom action
                 while (enumerator.moveNext()) {
                     var action = enumerator.get_current();
                     console.log(action.get_name());
                     console.log(action.get_title());
                     console.log(action.get_location());
                     console.log(action.get_group());
                     console.log(action.get_sequence());
                     console.log(action.get_commandUIExtension());
                     console.log(action.get_imageUrl());
                     console.log(action.get_url());
                     console.log(action.get_scriptSrc());

                     console.log("- - - -");
                 }
             }, function (a, b) {
                 console.log('error');
                 console.log(a); console.log(b);
             });

}
var listUrl = "/sites/demos/actions/Documents";
ReadActions(listUrl);

/////////////// Add Actions /////////////

function AddRibbonAction(listUrl) {

    var permissionsWeb = new SP.BasePermissions();
    permissionsWeb.set(SP.PermissionKind.approveItems);

    var context = SP.ClientContext.get_current();
    list = context.get_web().getList(listUrl);
    var collUserCustomAction = list.get_userCustomActions();

    var scriptLink = collUserCustomAction.add();
    scriptLink.set_title('My Action');
    scriptLink.set_description('My Action for documents');
    scriptLink.set_location('CommandUI.Ribbon.ListView');
    scriptLink.set_commandUIExtension('<CommandUIExtension xmlns="http://schemas.microsoft.com/sharepoint/"> \
                                              <CommandUIDefinitions> \
                                                <CommandUIDefinition Location="Ribbon.Documents.Manage.Controls._children"> \
                                                  <Button Id="{50506F31-4590-4EB8-A555-F9993679002A}" \
                                                    Command="{81879291-CA52-44B9-A345-FDA7F67C80AC}" \
                                                    Image32by32="/sites/demos/SiteCollectionImages/action.png" \
                                                    Image16by16="/sites/demos/SiteCollectionImages/action16.png" \
                                                    Sequence="4" \
                                                    LabelText="My Action" \
                                                    Description="" \
                                                    TemplateAlias="o1" />\
                                                </CommandUIDefinition>\
                                              </CommandUIDefinitions>\
                                              <CommandUIHandlers>\
                                                <CommandUIHandler  \
                                                          Command="{81879291-CA52-44B9-A345-FDA7F67C80AC}" \
                                                          CommandAction="javascript:DTS.Demo.ActionFunction(SP.ListOperation);" \
                                                          EnabledScript=\'javascript: \
                                                                  function LoadDTSDemoScript() { \
                                                                        if (typeof DTS == "undefined" || typeof DTS.Demo == "undefined") { \
                                                                            var scriptUrl = _spPageContextInfo.siteAbsoluteUrl + "/SiteAssets/Actions/dts.demo.script.js"; \
                                                                            SP.SOD.registerSod("dts.demo.script.js", scriptUrl); \
                                                                            SP.SOD.executeFunc("dts.demo.script.js", null, function () { \
                                                                                console.log("dts.demoscript.js is loaded"); \
                                                                            }); \
                                                                        } \
                                                                        else { \
                                                                            console.log("dts.demoscript.js is alredy loaded"); \
                                                                        } \
                                                                        var ctx = SP.ClientContext.get_current(); \
                                                                        var items = SP.ListOperation.Selection.getSelectedItems(ctx); \
                                                                        if (items.length &gt; 0) { \
                                                                            return true;  \
                                                                        } \
                                                                        else { \
                                                                            return false; \
                                                                        } \
                                                                   } LoadDTSDemoScript(); \' /> \
                                               </CommandUIHandlers>\
                                            </CommandUIExtension>');
    scriptLink.set_sequence('4');
    scriptLink.set_rights(permissionsWeb);
    scriptLink.update();

    context.load(list);
    context.load(collUserCustomAction);

    context.executeQueryAsync(
        function (a, b) {
            console.log('success: action is created');
        }, function (a, b) {
            console.log('error!');
            console.log(a); console.log(b);
        });

}
var listUrl = "/sites/demos/actions/Documents";
AddRibbonAction(listUrl);

//Document Library
function AddECBAction(listUrl) {

    var permissions = new SP.BasePermissions();
    permissions.set(SP.PermissionKind.approveItems);

    var context = SP.ClientContext.get_current();
    list = context.get_web().getList(listUrl);
    var collUserCustomAction = list.get_userCustomActions();

    var scriptLink = collUserCustomAction.add();
    scriptLink.set_title('My Action');
    scriptLink.set_description('My Action');
    scriptLink.set_location('EditControlBlock');
    scriptLink.set_sequence('20');
    scriptLink.set_url('javascript: \
                                    function LoadDTSDemoScript1() { \
                                        if (typeof DTS == "undefined" || typeof DTS.Demo == "undefined") { \
                                            var scriptUrl = _spPageContextInfo.siteAbsoluteUrl + "/SiteAssets/Actions/dts.demo.script.js"; \
                                            SP.SOD.registerSod("dts.demo.script.js", scriptUrl); \
                                            SP.SOD.executeFunc("dts.demo.script.js", null, function () { \
                                                                console.log("dts.demoscript.js is loaded"); \
                                                                DTS.Demo.ActionFunctionSingleDocument({ItemId}); \
                                                           }); \
                                        } \
                                        else { \
                                            console.log("dts.demoscript.js is alredy loaded"); \
                                            DTS.Demo.ActionFunctionSingleDocument({ItemId}) \
                                        } \
                                  } \
                                  SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () { \
                                        LoadDTSDemoScript1(); \
                                  }); ');

    scriptLink.set_imageUrl('/sites/demos/SiteCollectionImages/action16.png');
    scriptLink.set_rights(permissions)

    scriptLink.update();
    context.load(list);
    context.load(collUserCustomAction);
    context.executeQueryAsync(
        function (a, b) {
            console.log('success: action is created');
        }, function (a, b) {
            console.log('error!');
            console.log(a); console.log(b);
        });

}
var listUrl = "/sites/demos/actions/Documents";
AddECBAction(listUrl);


//List
function AddECBAction_List(listUrl) {

    var permissions = new SP.BasePermissions();
    permissions.set(SP.PermissionKind.approveItems);

    var context = SP.ClientContext.get_current();
    list = context.get_web().getList(listUrl);
    var collUserCustomAction = list.get_userCustomActions();

    var scriptLink = collUserCustomAction.add();
    scriptLink.set_title('My Action');
    scriptLink.set_description('My Action');
    scriptLink.set_location('EditControlBlock');
    scriptLink.set_sequence('20');
    scriptLink.set_url('javascript: \
                                    function LoadDTSDemoScript1() { \
                                        if (typeof DTS == "undefined" || typeof DTS.Demo == "undefined") { \
                                            var scriptUrl = _spPageContextInfo.siteAbsoluteUrl + "/SiteAssets/Actions/dts.demo.script.js"; \
                                            SP.SOD.registerSod("dts.demo.script.js", scriptUrl); \
                                            SP.SOD.executeFunc("dts.demo.script.js", null, function () { \
                                                                console.log("dts.demoscript.js is loaded"); \
                                                                DTS.Demo.ActionFunctionSingleDocument({ItemId}); \
                                                           }); \
                                        } \
                                        else { \
                                            console.log("dts.demoscript.js is alredy loaded"); \
                                            DTS.Demo.ActionFunctionSingleDocument({ItemId}) \
                                        } \
                                  } \
                                  SP.SOD.executeFunc("sp.js", "SP.ClientContext", function () { \
                                        LoadDTSDemoScript1(); \
                                  }); ');

    scriptLink.set_imageUrl('/sites/demos/SiteCollectionImages/action16.png');
    scriptLink.set_rights(permissions)

    scriptLink.update();
    context.load(list);
    context.load(collUserCustomAction);
    context.executeQueryAsync(
        function (a, b) {
            console.log('success: action is created');
        }, function (a, b) {
            console.log('error!');
            console.log(a); console.log(b);
        });

}
var listUrl = "/sites/demos/actions/Lists/TheList";
AddECBAction_List(listUrl);

////////////////////////////////////////
function LoadDTSDemoScript() {
    if (typeof DTS == "undefined" || typeof DTS.Demo == "undefined") {
        var scriptUrl = _spPageContextInfo.siteAbsoluteUrl + "/SiteAssets/Actions/dts.demo.script.js";
        SP.SOD.registerSod("dts.demo.script.js", scriptUrl);
        SP.SOD.executeFunc('dts.demo.script.js', null, function () {
            console.log("dts.demoscript.js is loaded");
        });
    }
    else {
        console.log("dts.demoscript.js is alredy loaded");
    }
    var ctx = SP.ClientContext.get_current();
    var items = SP.ListOperation.Selection.getSelectedItems(ctx);
    // if (items.length &gt; 0){ !!! when you put this script in the XML
    if (items.length > 0) {
        return true;
    }
    else {
        return false;
    }

} LoadDTSDemoScript();


function LoadDTSDemoScript1() {
    if (typeof DTS == "undefined" || typeof DTS.Demo == "undefined") {
        var scriptUrl = _spPageContextInfo.siteAbsoluteUrl + "/SiteAssets/Actions/dts.demo.script.js";
        SP.SOD.registerSod("dts.demo.script.js", scriptUrl);
        SP.SOD.executeFunc('dts.demo.script.js', null, function () {
            console.log("dts.demoscript.js is loaded");
            DTS.Demo.ActionFunctionSingleDocument('{ItemId}');
        });
    }
    else {
        console.log("dts.demoscript.js is alredy loaded");
        DTS.Demo.ActionFunctionSingleDocument('{ItemId}')
    }
}
SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
    LoadDTSDemoScript1();
});


/////////////// Add Web Script Link Actions /////////////
function RegisterScriptLink() {

    var scriptBlock = 'var headID = document.getElementsByTagName("head")[0];var newScript = document.createElement("script");newScript.type = "text/javascript";newScript.src = "'
    scriptBlock += '/sites/demos/SiteAssets/Actions/dts.demo.script.js' + '?ver=' + ((new Date()) * 1);
    scriptBlock += '";headID.appendChild(newScript);';

    var context = new SP.ClientContext.get_current;
    this.site = context.get_web();
    var collUserCustomAction = this.site.get_userCustomActions();
    var scriptLink = collUserCustomAction.add();
    scriptLink.set_name('DTSDemo Script');
    scriptLink.set_title('DTSDemo Script');
    scriptLink.set_description('DTSDemo Script');
    scriptLink.set_scriptBlock(scriptBlock);
    scriptLink.set_location('ScriptLink');
    scriptLink.set_group('');
    scriptLink.update();
    context.executeQueryAsync(
        function (a, b) {
            console.log('success');
            console.log(a); console.log(b);
        },
            function (a, b) {
                console.log('error');
                console.log(a);
                console.log(b);
            });
}


/////////////// Delete Actions /////////////
function DeleteActions(actionTitle, listUrl) {

    var context = SP.ClientContext.get_current();
    list = context.get_web().getList(listUrl);
    var collUserCustomAction = list.get_userCustomActions();
    context.load(collUserCustomAction);
    context.executeQueryAsync(
        function (a, b) {

            console.log('DeleteActions loaded the actions');

            var enumerator = collUserCustomAction.getEnumerator();
            var removeThese = []
            // find the custom action
            while (enumerator.moveNext()) {
                var action = enumerator.get_current();

                if (action.get_title() == actionTitle) {
                    // add it to a temporary array (we cannot modify an enumerator while enumerating)
                    console.log("found")
                    removeThese.push(action)
                }
            }
            console.log(removeThese.length + " lenght")
            // do the actual removal of the custom action
            for (var i in removeThese) {
                removeThese[i].deleteObject()
                delete removeThese[i]
            }
            context.load(collUserCustomAction);
            context.executeQueryAsync(
                function (a, b) {
                    console.log('items deleted');
                }, function (a, b) {
                    console.log('error');
                    console.log(a); console.log(b);
                });


        }, function (a, b) {
            console.log('error');
            console.log(a); console.log(b);
        });

}
var listUrl = "/sites/demos/actions/Documents";
DeleteActions('My Action', listUrl);
