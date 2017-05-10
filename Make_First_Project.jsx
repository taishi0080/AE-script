var mainWindow = new Window("palette","Add Folders&Comps Set",undefined);

var groupOne = mainWindow.add("group",undefined,"groupOne");
groupOne.orientation = "row";
groupOne.add("statictext",undefined,"Fixed Comp Name");
var Pname = 001//app.project.file.name;
var CompName = groupOne.add("edittext",[30,40,200,60],Pname);
groupOne.add("statictext",undefined,"Comp Numbers");
var CompNum_ = groupOne.add("edittext",undefined,"10");

var groupTwo = mainWindow.add("group",undefined,"groupTwo");
groupTwo.orientation = "row";
groupTwo.add("statictext",undefined,"Comp Duration");
var CompDuration_ = groupTwo.add("edittext",undefined,"15");
groupTwo.add("statictext",undefined,"sec");
groupTwo.add("statictext",undefined,"Comp FPS");
var CompFPS_ = groupTwo.add("edittext",undefined,"29.97");

var groupTree = mainWindow.add("group",undefined,"groupTree");
groupTree.orientation = "row";
groupTree.add("statictext",undefined,"Comp Size");
groupTree.add("statictext",undefined,"w:");
var CompWidth_ = groupTree.add("edittext",undefined,"1920");
groupTree.add("statictext",undefined,"h:");
var CompHeight_ = groupTree.add("edittext",undefined,"1080");

var groupfour = mainWindow.add("panel",undefined);
groupfour.orientation = "row";

var startButton = groupfour.add("button",undefined,"Start");
var cancelButton = groupfour.add("button",undefined,"Cancel");

mainWindow.show();

startButton.onClick = function(){
    app.beginUndoGroup("Add Folders&Comps Set");
    doThings();
    mainWindow.close();
    }


cancelButton.onClick = function(){
    mainWindow.close();
    }

function doThings(){
    var MainFolder =app.project.items.addFolder("master"); 
    var CompDuration= parseFloat(CompDuration_.text);
    var CompWidth = parseInt(CompWidth_.text);
    var CompHeight = parseInt(CompHeight_.text);
    var CompFPS = parseFloat(CompFPS_.text);
    var CompNum =parseInt(CompNum_.text);
        
    for(i =1;i<=CompNum;i++){
        if(i<10){
            var i ="0"+i;
            }
    var MakeComps = MainFolder .items.addComp(CompName.text+i,CompWidth,CompHeight, 1.0, CompDuration, CompFPS).layers.addSolid([0,0,0],"BG",CompWidth,CompHeight,1.0,CompDuration);

    }

    app.project.items.addFolder("precomps");
    app.project.items.addFolder("stills");
    app.project.items.addFolder("movie");
    app.project.items.addFolder("vectors");
    app.project.items.addFolder("sounds");

    app.project.consolidateFootage();//増えてしまったBG平面レイヤーを統合//


    }






