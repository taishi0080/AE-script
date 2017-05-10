app.beginUndoGroup("Light_leaks");

var ActiveItem = app.project.activeItem;

if(!ActiveItem){
	alert("コンポを選択してくだしあ (´・ω・`)");
    }

else{
     var Comp_size = [ActiveItem.width,ActiveItem.height];
     var Comp_Dur = ActiveItem.duration;
     var CNTLname = ["Speed","Scale","Contrast_offset","Brightness_offset","Position_offset"];
     
       
 //フラクタルノイズ生成
 for(i = 0;i<2;i++){
	var color = [0,0,0];
	var name = "F_noise"+0+(i+1);
	var width = ActiveItem.width;
	var height = ActiveItem.height;
	var pixelAspect = ActiveItem.pixelAspect;
	var duration = ActiveItem.duration;
	var n = ActiveItem.layers.addSolid(color,name,width,height,pixelAspect,duration);
	var n2 = n("Effects").addProperty("ADBE Fractal Noise");
	var n3 = n("Effects").addProperty("ADBE Tint")
	      n.blendingMode = BlendingMode.ADD;
         }
     
     
     //制御レイヤー作成
  var n3 = ActiveItem.layers.addSolid([1,1,1],"LightLeaks_CNTL",width,height,pixelAspect,duration);  
  n3.adjustmentLayer = true;
  
   for(i = 0;i<4;i++){
     var AllCNTL = ActiveItem.layer(1)("Effects").addProperty("ADBE Slider Control");
     AllCNTL.name =CNTLname[i];
	         }

  var ADD_PositionOffsetCNTL = ActiveItem.layer(1)("Effects").addProperty("ADBE Point Control")         
  ADD_PositionOffsetCNTL.name = "Position_offset";
         
  var ADD_ColorCNTL1 = ActiveItem.layer(1)("Effects").addProperty("ADBE Color Control")         
  ADD_ColorCNTL1.name = "Color1";

  var ADD_ColorCNTL2 = ActiveItem.layer(1)("Effects").addProperty("ADBE Color Control")         
  ADD_ColorCNTL2.name = "Color2";

  var ADD_Exp = ActiveItem.layer(1)("Effects").addProperty("ADBE Exposure2")         


    //初期パラメータ入力   (制御レイヤー)
　ActiveItem.layer(1)("Effects")("Speed").property(1).setValue(1000);
　ActiveItem.layer(1)("Effects")("Scale").property(1).setValue(2676);
　ActiveItem.layer(1)("Effects")("Color1").property(1).setValue([1,0,0]);
　ActiveItem.layer(1)("Effects")("Color2").property(1).setValue([1,0.85,0.5]);
   
    //初期パラメータ入力   (フラクタルノイズ)
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(4).setValue(268);//コントラスト
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(5).setValue(-89);//明るさ
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(10).setValue(5038);//スケール 
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(16).setValue(1);//複雑度
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(28).setValue(529);//ランダムシード

　ActiveItem.layer(3)("Effects").property("ADBE Fractal Noise").property(4).setValue(368);//コントラスト
　ActiveItem.layer(3)("Effects").property("ADBE Fractal Noise").property(5).setValue(-84);//明るさ
　ActiveItem.layer(3)("Effects").property("ADBE Fractal Noise").property(10).setValue(2800);//スケール 
　ActiveItem.layer(3)("Effects").property("ADBE Fractal Noise").property(16).setValue(1);//複雑度
 
   
   //フラクタルノイズにエクスプレッション適用
      
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(4).expression="""value+thisComp.layer("LightLeaks_CNTL").effect("Contrast_offset")(1);""";
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(5).expression="""value+thisComp.layer("LightLeaks_CNTL").effect("Brightness_offset")(1);""";
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(10).expression="""thisComp.layer("LightLeaks_CNTL").effect("Scale")(1);""";
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(13).expression="""Xamo = thisComp.layer("LightLeaks_CNTL").effect("Position_offset")(1)[0];;
Yamo = thisComp.layer("LightLeaks_CNTL").effect("Position_offset")(1)[1];
[value[0]+time*Xamo,value[1]+time*Yamo];""";
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(24).expression="""time*thisComp.layer("LightLeaks_CNTL").effect("Speed")(1)""";
　ActiveItem.layer(2)("Effects").property("ADBE Tint").property(2).expression="""thisComp.layer("LightLeaks_CNTL").effect("Color1")(1);""";
 
 
　ActiveItem.layer(3)("Effects").property("ADBE Fractal Noise").property(4).expression="""value+thisComp.layer("LightLeaks_CNTL").effect("Contrast_offset")(1);""";
　ActiveItem.layer(3)("Effects").property("ADBE Fractal Noise").property(5).expression="""value+thisComp.layer("LightLeaks_CNTL").effect("Brightness_offset")(1);""";
　ActiveItem.layer(3)("Effects").property("ADBE Fractal Noise").property(10).expression="""thisComp.layer("LightLeaks_CNTL").effect("Scale")(1);""";
　ActiveItem.layer(3)("Effects").property("ADBE Fractal Noise").property(13).expression="""Xamo = thisComp.layer("LightLeaks_CNTL").effect("Position_offset")(1)[0];;
Yamo = thisComp.layer("LightLeaks_CNTL").effect("Position_offset")(1)[1];
[value[0]+time*Xamo,value[1]+time*Yamo];""";
　ActiveItem.layer(3)("Effects").property("ADBE Fractal Noise").property(24).expression="""time*thisComp.layer("LightLeaks_CNTL").effect("Speed")(1)""";
　ActiveItem.layer(3)("Effects").property("ADBE Tint").property(2).expression="""thisComp.layer("LightLeaks_CNTL").effect("Color2")(1);""";
 
   //プリコン
  var Precomp = ActiveItem.layers.precompose([1,2,3],"Lightleaks",true);
       ActiveItem.layers[1].blendingMode = BlendingMode.ADD;
 ;}



