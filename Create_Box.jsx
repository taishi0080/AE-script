app.beginUndoGroup("Create_Box");

var ActiveItem = app.project.activeItem;
var boxF_height = 800;
var boxF_width = 800;
var box_Dur = 15;

ActiveItem.layers.addSolid([1,0,0],"facecolor",boxF_height,boxF_width,1.0,box_Dur);
ActiveItem.layers.precompose([1],"tile_comp",false);

var Sele_Comp=ActiveItem.selectedLayers[0]  
      Sele_Comp.threeDLayer  = true;
      
var topFace=
var bottomFace=
var rightsideFace =
var leftsideFace =
