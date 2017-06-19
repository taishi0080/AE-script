app.beginUndoGroup("Grid_Comps");

var ActiveItem = app.project.activeItem;
var Sele_Layer = ActiveItem.selectedLayers;
var Comp_size = [ActiveItem.width,ActiveItem.height]
var seleL_num =new Array()
    
    
//for(var i in Sele_Layer )seleL_num.push( seleL_num[i].index );
ActiveItem.layers.precompose([1],"tile_comp",true);
    var Sele_Comp=ActiveItem.selectedLayers[0]  
    Sele_Comp.threeDLayer  = true;
    Sele_Comp.moveToBeginning();
    
    var tile_nums = 8
for(i = 0;i<tile_nums;i++)
    {
    ActiveItem.selectedLayers[0].duplicate()
   ;
    }

    var Sele_Comp=ActiveItem.selectedLayers[0]   
    Sele_Comp.name = "main_Cntl";
    Sele_Comp.moveToBeginning();
    
    var Kaigyo_pala= Sele_Comp.property("ADBE Effect Parade").addProperty("ADBE Slider Control"); 
    Kaigyo_pala.property(1).setValue(3);//初期値
    Kaigyo_pala.name = "kaigyo";
    var Index_pala= Sele_Comp.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
    Index_pala.name = "index_num";    
    Index_pala.property(1).expression = """index"""
    
for(i = 0;i<tile_nums;i++)
    {    
    ActiveItem.layer(i+2).position.expression =
    """num = thisComp.layer("main_Cntl").effect("kaigyo")("スライダー");
Xofst = thisComp.layer("main_Cntl").width;
Yofst = thisComp.layer("main_Cntl").height;

if(num>index-thisComp.layer("main_Cntl").effect("index_num")("スライダー"))
{
psi =thisComp.layer(index-1).transform.position;
Xp = psi[0]+Xofst;
Yp = psi[1];
Zp = psi[2];
}
else
{
psi_02 =thisComp.layer(index-num).transform.position;
Xp = psi_02[0];
Yp = psi_02[1]+Yofst;
Zp = psi_02[2];
}
[Xp,Yp,Zp]


"""
   }
    //}
