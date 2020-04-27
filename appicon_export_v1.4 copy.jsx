//general setting
var document = app.activeDocument;
var artboard_size = 48;//campus size
var radius = 7.6;
var prefix = "icon";
var appname = app.activeDocument.name.slice( 0, -4 );//get file name and delete '.svg'
var flg = true;

//folder opeartion
var folder_root = Folder.selectDialog();
var folder = new Folder(folder_root.fsName+"/"+appname+"_App_2.2");
var exportFolder_iOS = new Folder(folder.fsName+"/2.iOS");
var exportFolder_Android = new Folder(folder.fsName+"/3.Android");
var exportFolder_Adaptive = new Folder(folder.fsName+"/4.Adaptive");
var exportFolder_PWA = new Folder(folder.fsName+"/5.PWA");

function main(){

  var board_width=document.artboards[0].artboardRect[2]-document.artboards[0].artboardRect[0];
  if(board_width!=48){//It will stop running unless artboard set to 48x48
    alert("ERROR!! Please resize artboard to 48x48px");
    return;
  }

app.preferences.setIntegerPreference("rulerType",6);
//0.ask round or clippingmask
firstDialog();
//1.create folder
folder.create();
//2.export without rounded corner
export_iOS(); 
//3.add rounded corner
addRounded();
//4.export with rounded corner
export_Android();
//5.export svg with rounded corner
export_SVG();
//6.create adaptive folder
export_adaptive();
//7.open all svgs
openAllSVG();
}

main();


function firstDialog(){
  var win = new Window ("dialog");  
  win.alignChildren = "center";
  win.Round = win.add ("radiobutton", undefined, "Round Background");  
  win.Clipping = win.add ("radiobutton", undefined, "Clipping Mask");  
  win.cancelBtn = win.add("button", undefined, "Cancel");    
  win.quitBtn = win.add("button", undefined, "OK");    
  win.defaultElement = win.quitBtn;
  win.cancelElement = win.cancelBtn;    
  if (win.show() == 1){  
    if (win.Round.value == true){flg = true;};  
    if (win.Clipping.value == true){flg = false;};
  }  
}

function resetZoom(){
  var currentDocument = app.activeDocument;
  currentDocument.views[0].zoom = 1.0;
  currentDocument.views[0].centerPoint = [54,-54];

}

function openAllSVG(){
  //open adaptive background.svg
  fileObj = new File(folder_root.fsName+"/"+appname+"_App_2.2"+"/4.Adaptive/background.svg");
  app.open(fileObj);
  resetZoom()

  //open Appname.svg
  //fileObj = new File(folder_root.fsName+"/"+appname+"_App_2.2/"+appname+".svg");
  //app.open(fileObj);
  //resetZoom()
}

function addRounded(){
  var targetItems = document.pathItems;
  
  var artboards = document.artboards;
  var abindex = artboards.getActiveArtboardIndex();
  var pos = artboards[abindex].artboardRect;
  var leftX = pos[0];
  var leftY = pos[1];
  var rightX = pos[2];
  var rightY = pos[3];
  var artLayer = activeDocument.layers[0];
  app.defaultStroked = false;
  app.defaultFilled = true;

  if(flg == true){ //When the background is filled with one colour, run this script

    var rndRect = artLayer.pathItems.roundedRectangle(leftY,leftX,artboard_size,artboard_size,radius,radius);//place rounded-corner rectangle
    var targetItems = document.pathItems;
    targetItems[targetItems.length-1].selected = true ;//select background
    rndRect.selected = true;
    app.executeMenuCommand('group');//group background and rounded-corner
    app.executeMenuCommand('sendToBack');//move elements to the bottom 
    app.executeMenuCommand('Live Pathfinder Crop');//crip content with pathfinder

  }else{ //Else

    app.executeMenuCommand('selectall');
    app.executeMenuCommand("group");//unless group, cripping mask applied to each object 
    var rndRect = artLayer.pathItems.roundedRectangle(leftY,leftX,artboard_size,artboard_size,radius,radius);//place rounded-corner rectangle
    app.executeMenuCommand('selectall');//select all
    app.executeMenuCommand('makeMask');//apply cripping mask
  }
}

function exportPNG(folder, prefix, scaleTo, suffix) {
  if(!folder.exists) {
      folder.create();
  }

  var file = new File(folder.fsName + "/" + prefix + "_"  + suffix + ".png");
  options = new ExportOptionsPNG24();
  options.antiAliasing = false;
  options.transparency = true;
  options.artBoardClipping = true;
  options.verticalScale = scaleTo / artboard_size * 100.0;
  options.horizontalScale = scaleTo / artboard_size * 100.0;

  document.artboards.setActiveArtboardIndex(0);
  document.exportFile(file, ExportType.PNG24, options);
} 


function export_iOS(){
  if(folder && document) {
    exportPNG(exportFolder_iOS, prefix, 40, '20@2x');
    exportPNG(exportFolder_iOS, prefix, 60, '20@3x');
    exportPNG(exportFolder_iOS, prefix, 58, '29@2x');
    exportPNG(exportFolder_iOS, prefix, 87, '29@3x');
    exportPNG(exportFolder_iOS, prefix, 80, '40@2x');
    exportPNG(exportFolder_iOS, prefix, 120, '40@3x');
    exportPNG(exportFolder_iOS, prefix, 120, '60@2x');
    exportPNG(exportFolder_iOS, prefix, 180, '60@3x');
    exportPNG(exportFolder_iOS, prefix, 152, '76@2x');
    exportPNG(exportFolder_iOS, prefix, 167, '83.5@2x');
    exportPNG(exportFolder_iOS, prefix, 1024, 'iTunesArtwork');
    
    exportPNG(exportFolder_Android , prefix, 512, 'GooglePlay');
  }
}

function export_Android(){
  if(folder && document) {
    exportPNG(exportFolder_Android , prefix, 36, '36x36');
    exportPNG(exportFolder_Android , prefix, 48, '48x48');
    exportPNG(exportFolder_Android , prefix, 72, '72x72');
    exportPNG(exportFolder_Android , prefix, 96, '96x96');
    exportPNG(exportFolder_Android , prefix, 144, '144x144');
    exportPNG(exportFolder_Android , prefix, 192, '192x192');
    exportPNG(exportFolder_Android , prefix, 512, '512x512');

    exportPNG(exportFolder_PWA , prefix, 192, '192x192');
  }
}


function export_SVG(){
  var file = new File(folder.fsName+"/"+appname+".svg");
  var options = new ExportOptionsSVG();
  
  document.exportFile(file,ExportType.SVG,options);
}

function export_adaptive(){

  exportFolder_Adaptive.create();
  document.artboards[0].artboardRect = [0, 0, 108, -108];
  app.executeMenuCommand('selectall');
  app.executeMenuCommand("group");

  document.groupItems[0].left = 22;
  document.groupItems[0].top = -22;
  document.groupItems[0].width = 64;
  document.groupItems[0].height = 64;

  app.executeMenuCommand("ungroup");
  app.executeMenuCommand("Clipping Masks menu item"); 
  app.executeMenuCommand("releaseMask");

  var file_back = new File(exportFolder_Adaptive+"/background.svg");
  var file_fore = new File(exportFolder_Adaptive+"/foreground.svg");
  var options = new ExportOptionsSVG();
  
  document.exportFile(file_back,ExportType.SVG,options);
  document.exportFile(file_fore,ExportType.SVG,options);

  resetZoom();
}
