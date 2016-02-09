app.beginUndoGroup("cells_transition");

var ActiveItem = app.project.activeItem;
var Sele_Layer = ActiveItem.selectedLayers[0];
var Comp_size = [ActiveItem.width,ActiveItem.height]


if(!Sele_Layer ){
	alert("任意のシェイプレイヤー（長方形）を選択してください");
    }

else{
   
Sele_Layer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vector Transform Group").property("ADBE Vector Position").setValue([0,0]);
Sele_Layer.threeDLayer  = true;
Sele_Layer.name = "main_rectangle";


var Rect_size = Sele_Layer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Size").value;

var Rect_size_x = Math.round(Rect_size[0]);
var Rect_size_y = Math.round(Rect_size[1]);
var Rect_size =Sele_Layer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Size").setValue([Rect_size_x,Rect_size_y]);
var Rect_size = Sele_Layer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Size").value;

var Set_pos = Sele_Layer.transform.position.setValue(Rect_size/2);

Sele_Layer.scale.setValuesAtTimes([0,1],[[0,0],[100,100]]);//初期アニメーション




//ディレイ制御//
var Sura =Sele_Layer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
Sura.property(1).setValue(3);//初期ディレイ値（フレーム）
Sura.name = "deray_frame";


//クローン生成//
var cell_num = (Math.ceil(Comp_size[0]/Rect_size[0]))*(Math.ceil(Comp_size[1]/Rect_size[1]))-1;

//var Sele_L_color = Sele_Layer.property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vector Graphic - Fill").Value;
//シャイプの塗り取得できない？？？



for(i=0;i<cell_num;i++){
var Add_cl_shape = ActiveItem.layers.addShape();
var Add_cl_s_Property = Add_cl_shape.property("ADBE Root Vectors Group");
var Add_cl_Path = Add_cl_s_Property.addProperty("ADBE Vector Group");
var Add_cl_Rect = Add_cl_Path.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
var fill = Add_cl_Path.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
fill.property("ADBE Vector Fill Color").setValue([255,255,255]);
Add_cl_shape.threeDLayer  = true;//3Dレイヤー化
Add_cl_shape.shy = true;//シャイレイヤー化
Add_cl_shape.name = "clone"+(i+1);
}

Sele_Layer.moveToBeginning();//main_rectangleを一番上に移動


//クローンにエクスプレッション適用//
for(i=0;i<cell_num;i++){
ActiveItem.layer(i+2).position.expression = 
"""Xofst = thisComp.layer("main_rectangle").content("ADBE Vector Group").content("ADBE Vector Shape - Rect").size[0];
Yofst = thisComp.layer("main_rectangle").content("ADBE Vector Group").content("ADBE Vector Shape - Rect").size[1];
kaiGyo = thisComp.width/thisComp.layer("main_rectangle").content("ADBE Vector Group").content("ADBE Vector Shape - Rect").size[0];
kaiGyo = Math.ceil(kaiGyo);
Delay = thisComp.layer("main_rectangle").effect("deray_frame")(1);
if(kaiGyo>=index)
{
psi =thisComp.layer(index-1).transform.position.valueAtTime(time-(Delay)/30);
Xp = psi[0]+Xofst;
Yp = psi[1];
Zp = psi[2];
}
else
{
psi_02 =thisComp.layer(index-kaiGyo).transform.position.valueAtTime(time-(Delay)/30); 
Xp = psi_02[0];
Yp = psi_02[1]+Yofst;
Zp = psi_02[2];
}
[Xp,Yp,Zp]

""";


ActiveItem.layer(i+2).scale.expression = 
"""kaiGyo = thisComp.width/thisComp.layer("main_rectangle").content("ADBE Vector Group").content("ADBE Vector Shape - Rect").size[0];
kaiGyo = Math.ceil(kaiGyo);

Delay = thisComp.layer("main_rectangle").effect("deray_frame")(1);

if(index<=kaiGyo)
{
Delay = thisComp.layer(index-1).transform.scale.valueAtTime(time-(Delay)/30);
}
else
{
Delay = thisComp.layer(index-kaiGyo).transform.scale.valueAtTime(time-(Delay)/30);
}
""";

ActiveItem.layer(i+2).opacity.expression = 
"""kaiGyo = thisComp.width/thisComp.layer("main_rectangle").content("ADBE Vector Group").content("ADBE Vector Shape - Rect").size[0];
kaiGyo = Math.ceil(kaiGyo);

Delay = thisComp.layer("main_rectangle").effect("deray_frame")(1);

if(index<=kaiGyo)
{
Delay = thisComp.layer(index-1).transform.opacity.valueAtTime(time-(Delay)/30);
}
else
{
Delay = thisComp.layer(index-kaiGyo).transform.opacity.valueAtTime(time-(Delay)/30);
}
""";

ActiveItem.layer(i+2).anchorPoint.expression = 
"""kaiGyo = thisComp.width/thisComp.layer("main_rectangle").content("ADBE Vector Group").content("ADBE Vector Shape - Rect").size[0];
kaiGyo = Math.ceil(kaiGyo);

Delay = thisComp.layer("main_rectangle").effect("deray_frame")(1);

if(index<=kaiGyo)
{
Delay = thisComp.layer(index-1).transform.anchorPoint.valueAtTime(time-(Delay)/30);
}
else
{
Delay = thisComp.layer(index-kaiGyo).transform.anchorPoint.valueAtTime(time-(Delay)/30);
}
""";

ActiveItem.layer(i+2).xRotation.expression = 
"""kaiGyo = thisComp.width/thisComp.layer("main_rectangle").content("ADBE Vector Group").content("ADBE Vector Shape - Rect").size[0];
kaiGyo = Math.ceil(kaiGyo);

Delay = thisComp.layer("main_rectangle").effect("deray_frame")(1);

if(index<=kaiGyo)
{
Delay = thisComp.layer(index-1).transform.xRotation.valueAtTime(time-(Delay)/30);
}
else
{
Delay = thisComp.layer(index-kaiGyo).transform.xRotation.valueAtTime(time-(Delay)/30);
}
""";

ActiveItem.layer(i+2).yRotation.expression = 
"""kaiGyo = thisComp.width/thisComp.layer("main_rectangle").content("ADBE Vector Group").content("ADBE Vector Shape - Rect").size[0];
kaiGyo = Math.ceil(kaiGyo);

Delay = thisComp.layer("main_rectangle").effect("deray_frame")(1);

if(index<=kaiGyo)
{
Delay = thisComp.layer(index-1).transform.yRotation.valueAtTime(time-(Delay)/30);
}
else
{
Delay = thisComp.layer(index-kaiGyo).transform.yRotation.valueAtTime(time-(Delay)/30);
}
""";

ActiveItem.layer(i+2).rotation.expression = 
"""kaiGyo = thisComp.width/thisComp.layer("main_rectangle").content("ADBE Vector Group").content("ADBE Vector Shape - Rect").size[0];
kaiGyo = Math.ceil(kaiGyo);

Delay = thisComp.layer("main_rectangle").effect("deray_frame")(1);

if(index<=kaiGyo)
{
Delay = thisComp.layer(index-1).transform.rotation.valueAtTime(time-(Delay)/30);
}
else
{
Delay = thisComp.layer(index-kaiGyo).transform.rotation.valueAtTime(time-(Delay)/30);
}
""";


ActiveItem.layer(i+2).property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Size").expression = 
"""thisComp.layer("main_rectangle").content("ADBE Vector Group").content("ADBE Vector Shape - Rect").size
"""

ActiveItem.layer(i+2).property("ADBE Root Vectors Group").property("ADBE Vector Group").property("ADBE Vectors Group").property("ADBE Vector Shape - Rect").property("ADBE Vector Rect Roundness").expression = 
"""thisComp.layer("main_rectangle").content("ADBE Vector Group").content("ADBE Vector Shape - Rect").roundness;
""";

            }
     ActiveItem.hideShyLayers = true;
          }
