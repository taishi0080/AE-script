TAB = String.fromCharCode(9);
filename = File.openDialog("ファイルを選択してください","");
fileObj = new File(filename);
if (fileObj.open("r"))
{
while(!fileObj.eof)
{
txt = fileObj.readln();
txt = txt.split(TAB);
layObj = app.project.activeItem.layers.addText(txt[0]);
layObj("position").setValue([txt[1],txt[2],0]);
}
}
