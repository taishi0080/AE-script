app.beginUndoGroup("Filmjitter");

var ActiveItem = app.project.activeItem;

if(!ActiveItem){
	alert("コンポを選択してくだしあ (´・ω・`)");
    }

else{
    
    
//フレームきわのヘア1 
  var myShapeProperty = ActiveItem.layers.addShape().property("ADBE Root Vectors Group");
  var myShapeGroup = myShapeProperty.addProperty("ADBE Vector Group").property("ADBE Vectors Group");
  var myShapePath = myShapeGroup.addProperty("ADBE Vector Shape - Group");
 
  var myShape = new Shape();
  myShape.vertices = [[0,0],[40,-15],[60,20],[120,-60],[180,-20]];
  myShape.closed = false;
  myShapePath(2).setValue(myShape);
 var fill = myShapeGroup.addProperty("ADBE Vector Graphic - Stroke");
  fill.property("ADBE Vector Stroke Color").setValue([0,0,0]);
  fill.property("ADBE Vector Stroke Width").setValue(1);
  myShapeGroup.addProperty("ADBE Vector Filter - Roughen");
 ActiveItem.layer(1).transform.position.setValue([0,800]);
 ActiveItem.layer(1).transform.rotation.expression ="""wiggle(60,10)""";
 ActiveItem.layer(1).name ="hair_edge";
 
 //フレームきわのヘア2 
  var myShapeProperty = ActiveItem.layers.addShape().property("ADBE Root Vectors Group");
  var myShapeGroup = myShapeProperty.addProperty("ADBE Vector Group").property("ADBE Vectors Group");
  var myShapePath = myShapeGroup.addProperty("ADBE Vector Shape - Group");
 
  var myShape = new Shape();
  myShape.vertices = [[0,0],[-40,-20],[-60,-10],[-120,-30],[-80,30]];
  myShape.closed = false;
  myShapePath(2).setValue(myShape);
 var fill = myShapeGroup.addProperty("ADBE Vector Graphic - Stroke");
  fill.property("ADBE Vector Stroke Color").setValue([0,0,0]);
  fill.property("ADBE Vector Stroke Width").setValue(1);
  myShapeGroup.addProperty("ADBE Vector Filter - Roughen");
 ActiveItem.layer(1).transform.position.setValue([ActiveItem.width,200])
 ActiveItem.layer(1).transform.rotation.expression ="""wiggle(60,10)"""
  ActiveItem.layer(1).name ="hair_edge2";
  
//フラクタルのノイズ作成
    var fnoiseName = ["Angelhair","Dust"]
    
 for(i = 0;i<2;i++){
	var color = [0,0,0];
	var name = fnoiseName[i];
	var width = ActiveItem.width;
	var height = ActiveItem.height;
	var pixelAspect = ActiveItem.pixelAspect;
	var duration = ActiveItem.duration;
	var n = ActiveItem.layers.addSolid(color,name,width,height,pixelAspect,duration);
	var n2 = n("Effects").addProperty("ADBE Fractal Noise");
	
	n.blendingMode = BlendingMode.MULTIPLY;
    }

//初期パラメータ（Dust）
　ActiveItem.layer(1)("Effects").property("ADBE Fractal Noise").property(4).setValue(250);//コントラスト
　ActiveItem.layer(1)("Effects").property("ADBE Fractal Noise").property(5).setValue(120);//明るさ
　ActiveItem.layer(1)("Effects").property("ADBE Fractal Noise").property(13).expression = """wiggle(4000,2000)"""//乱気流のオフセット
//初期パラメータ（Angelhair）
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(4).setValue(130);//コントラスト
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(5).setValue(90);//明るさ
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(9).setValue(false);//スケール縦横比固定
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(11).setValue(1);//スケールX
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(12).setValue(10000);//スケールY
　ActiveItem.layer(2)("Effects").property("ADBE Fractal Noise").property(24).expression = """time*500"""//展開
　

//vignette作成
 for(i = 0;i<2;i++){
	var color = [0,0,0];
	var name = "Vignette"+0+(i+1);
	var width = ActiveItem.width;
	var height = ActiveItem.height;
	var pixelAspect = ActiveItem.pixelAspect;
	var duration = ActiveItem.duration;
	ActiveItem.layers.addSolid(color,name,width,height,pixelAspect,duration);
    }
//vignette01
   var myShape = new Shape();
   myShape.vertices = [[width/2,0],[width,height/2],[width/2,height],[0,height/2]];
   myShape.closed = true;
   myShape.inTangents = [[width/-4,0],[0,height/-4],[width/4,0],[0,height/4]];
   myShape.outTangents = [[width/4,0],[0,height/4],[width/-4,0],[0,height/-4]];
   var vignette01 = ActiveItem.layer(1).property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
   vignette01.maskShape.setValue(myShape);
   vignette01.inverted = true;
   vignette01.maskFeather.setValue([460,460]);
   vignette01.maskExpansion.setValue(170);
   
//vignette02
   var vignette02 = ActiveItem.layer(2).property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
   vignette02.inverted = true;
   vignette02.maskFeather.setValue([60,60]);
   vignette02.maskExpansion.setValue(-45);
   
   
 //調整レイヤー作成
   var ajsName = ["ADJS","CNTL"]
   
 for(i = 0;i<2;i++){
	var color = [1,1,1];
	var name = ajsName[i];
	var width = ActiveItem.width;
	var height = ActiveItem.height;
	var pixelAspect = ActiveItem.pixelAspect;
	var duration = ActiveItem.duration;
	var ADJS_L = ActiveItem.layers.addSolid(color,name,width,height,pixelAspect,duration);
    ADJS_L.adjustmentLayer = true;
    }
    //調整レイヤー01(コントロール)
    ActiveItem.layer(1)("Effects").addProperty("ADBE Easy Levels2");
    ActiveItem.layer(1)("Effects").addProperty("ADBE HUE SATURATION");
    ActiveItem.layer(1)("Effects").addProperty("ADBE Color Balance 2");
    ActiveItem.layer(1)("Effects").addProperty("ADBE Exposure2"); 
    ActiveItem.layer(1)("Effects").addProperty("ADBE Point Control").name = "Film_jitter"; 
    ActiveItem.layer(1)("Effects").addProperty("ADBE Slider Control").name = "Wiggle_Speed"; 
    ActiveItem.layer(1)("Effects").addProperty("ADBE Slider Control").name = "Wiggle_Amount"; 
    ActiveItem.layer(1)("Effects").addProperty("ADBE Gaussian Blur"); 
    ActiveItem.layer(1)("Effects").addProperty("ADBE Sharpen"); 
    ActiveItem.layer(1)("Effects").addProperty("ADBE Noise"); 
    
    //パラメータセット
    ActiveItem.layer(1)("Effects").property("ADBE Easy Levels2").property(5).setValue(0.6);//ガンマ  
    ActiveItem.layer(1)("Effects").property("ADBE HUE SATURATION").property(4).setValue(-57);//彩度
    ActiveItem.layer(1)("Effects").property("ADBE Color Balance 2").property(4).setValue(-19);
    ActiveItem.layer(1)("Effects").property("ADBE Color Balance 2").property(5).setValue(-10);
    ActiveItem.layer(1)("Effects").property("ADBE Color Balance 2").property(6).setValue(15);
    ActiveItem.layer(1)("Effects").property("ADBE Color Balance 2").property(8).setValue(9);
    ActiveItem.layer(1)("Effects").property("ADBE Color Balance 2").property(9).setValue(-7);
    ActiveItem.layer(1)("Effects").property("ADBE Exposure2").property(3).setValue(0.53);//露出
    ActiveItem.layer(1)("Effects").property("Film_jitter").property(1).setValuesAtTimes([0,10/30],[[960,4200],[960,540]]);//オフセット初期アニメーション
    ActiveItem.layer(1)("Effects").property("Wiggle_Speed").property(1).setValue(31);
    ActiveItem.layer(1)("Effects").property("Wiggle_Amount").property(1).setValue(2);
    ActiveItem.layer(1)("Effects").property("ADBE Sharpen").property(1).setValue(100);//シャープ 
    ActiveItem.layer(1)("Effects").property("ADBE Noise").property(1).setValue(10);//ノイズ量  
    
    ActiveItem.layer(1)("Effects").property("Film_jitter").property(1).expression = 
    """Wsp =effect("Wiggle_Speed")(1)
     Wamo = effect("Wiggle_Amount")(1)
     wiggle(Wsp,Wamo)"""
    ActiveItem.layer(1)("Effects").property("ADBE Gaussian Blur").property(1).expression = """wiggle(5,10)"""
     
    //調整レイヤー02 
    ActiveItem.layer(2)("Effects").addProperty("ADBE Offset")
    ActiveItem.layer(2)("Effects").addProperty("ADBE Motion Blur")
   
    ActiveItem.layer(2)("Effects").property("ADBE Offset").property(1).expression = """thisComp.layer("CNTL").effect("Film_jitter")(1);""";     
    ActiveItem.layer(2)("Effects").property("ADBE Motion Blur").property(2).expression = 
    """k =0.005;
    Sp = effect("ADBE Offset")(1).speed;
    B_length = Sp*k+10;""";
     
    
  
   
   
   
}

