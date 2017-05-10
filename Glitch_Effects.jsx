app.beginUndoGroup("Glitch");

var ActiveItem = app.project.activeItem;

if(!ActiveItem){
	alert("コンポを選択してくだしあ (´・ω・`)");
    }

else{
     var Comp_size = [ActiveItem.width,ActiveItem.height];
     var Comp_Dur = ActiveItem.duration;
     var AjNames = ["R_offset","G_offset","B_offset",];
     var SV01 = [2,10,10]
     var SV02 = [10,3,10]
     var SV03 = [10,10,4]
    
 //RGBチャンネルオフセットレイヤー群作成
 for(i = 0;i<3;i++){
	var color = [1,1,1];
	var  name = AjNames[i];
	var width = ActiveItem.width;
	var height = ActiveItem.height;
	var pixelAspect = ActiveItem.pixelAspect;
	var duration = ActiveItem.duration;
	var n = ActiveItem.layers.addSolid(color,name,width,height,pixelAspect,duration);
	var n2 = n("Effects").addProperty("ADBE Shift Channels");
	n2.property(2).setValue(SV01[i]);
	n2.property(3).setValue(SV02[i]);
	n2.property(4).setValue(SV03[i]);
    var n2 = n("Effects").addProperty("ADBE Geometry2");
	n.adjustmentLayer = true;
	n.blendingMode = BlendingMode.LIGHTEN;
         }
     
     
 //MAPレイヤー作成
 var n4 = ActiveItem.layers.addSolid([0,0,0],"F_noise",width,height,pixelAspect,duration);  
 var Fnois = n4("Effects").addProperty("ADBE Fractal Noise");
   Fnois.property(2).setValue(1);//ノイズの種類
   Fnois.property(4).setValue(720);//コントラスト
   Fnois.property(5).setValue(-200);//明るさ
   Fnois.property(9).setValue(false);//トランスフォーム縦横比固定
   Fnois.property(11).setValue(3800);//スケールの幅
   Fnois.property(12).setValue(3600);//スケールの高さ
   Fnois.property(13).expression ="""time*10000+value;""";//乱気流オフセット
   n4.scale.setValue([1200,100]);
 var Precomp = ActiveItem.layers.precompose([1],"map",true);
 
 
  //制御レイヤー作成
  var n3 = ActiveItem.layers.addSolid(color,"Glitch_CNTL",width,height,pixelAspect,duration);  
  n3.adjustmentLayer = true;

 for(i = 0;i<3;i++){
     var AllCNTL = ActiveItem.layer(1)("Effects").addProperty("ADBE Point Control");
     AllCNTL.name =AjNames[i];
	         }
　ActiveItem.layer(1)("Effects")("R_offset").property(1).setValuesAtTimes([0,1/30,3/30,10/30,17/30,19/30],[[960,540],[951,540],[954,540],[952,543],[952,543],[960,540]]);
　ActiveItem.layer(1)("Effects")("G_offset").property(1).setValuesAtTimes([0,1/30,3/30,10/30,17/30,19/30],[[960,540],[966,541],[964,542],[940,539],[940,539],[960,540]]);
　ActiveItem.layer(1)("Effects")("B_offset").property(1).setValuesAtTimes([0,1/30,3/30,10/30,17/30,19/30],[[960,540],[953,548],[954,540],[940,540],[943,543],[960,540]]) 

  var DspMent_map = ActiveItem.layer(1)("Effects").addProperty("ADBE Displacement Map");
   DspMent_map.property(1).setValue(2);
   DspMent_map.property(3).setValuesAtTimes([4/30,5/30,7/30,8/30,11/30,12/30,15/30,17/30],[0,45,45,0,0,-100,300,0]);
   DspMent_map.property(5).setValuesAtTimes([4/30,5/30,7/30,8/30,11/30,12/30,15/30,17/30],[0,300,300,0,0,210,-380,0]);   
   
  var WWarp = ActiveItem.layer(1)("Effects").addProperty("ADBE Wave Warp");
　WWarp.property(2).setValuesAtTimes([9/30,10/30,11/30],[0,360,0]);
　WWarp.property(3).setValue(11);
　WWarp.property(4).setValue(0);
  

  
   ActiveItem.layer(2).enabled = false;
   ActiveItem.layer(2).moveToEnd();
   
   //RGBオフセットレイヤーにエクスプレッション適用
   
   
　ActiveItem.layer(4)("Effects").property("ADBE Geometry2").property(2).expression="""thisComp.layer("Glitch_CNTL").effect("R_offset")(1);"""
　ActiveItem.layer(3)("Effects").property("ADBE Geometry2").property(2).expression="""thisComp.layer("Glitch_CNTL").effect("G_offset")(1);"""
　ActiveItem.layer(2)("Effects").property("ADBE Geometry2").property(2).expression="""thisComp.layer("Glitch_CNTL").effect("B_offset")(1);"""   
   
    ;} 





