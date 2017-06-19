app.beginUndoGroup("Bounce_text");

var ActiveItem = app.project.activeItem;
var Sele_Layer = ActiveItem.selectedLayers[0];


if(Sele_Layer.matchName == "ADBE Text Layer")
    
var Names = ["Delay_frame","Frequency","Amplitude","Decay"];
var eachValues = [3,3,50,3];

for(i=0;i<4;i++){
var SetSLdr = Sele_Layer.property("ADBE Effect Parade").addProperty("ADBE Slider Control");
SetSLdr.name = Names[i];
SetSLdr.property(1).setValue(eachValues[i]);
}

var SetAnim = Sele_Layer.Text.Animators.addProperty("ADBE Text Animator");
var SetSlctr = SetAnim.Selectors.addProperty("ADBE Text Expressible Selector");
SetSlctr.property(2).expression = 
"""delay = effect("Delay_frame")(1)/30;
myDelay = delay*textIndex;
t =(time-inPoint)-myDelay;
if(t>=0){
freq = effect("Frequency")(1);
amplitude =effect("Amplitude")(1)*2;
decay = effect("Decay")(1);
s = amplitude*Math.cos(freq*t*2*Math.PI)/Math.exp(decay*t);
[s,s];
}else{
value;
}""";
SetAnim.Properties.addProperty("ADBE Text Scale 3D").setValue([0,0,0]);
SetAnim.Properties.addProperty("ADBE Text Rotation");
SetAnim.Properties.addProperty("ADBE Text Position 3D");
