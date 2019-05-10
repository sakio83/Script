/** !!! This script ONLY WORKS if the file has ONE artboard of SIZE 60 x 60 !!!
 * if your artboard is not the right size, please adjust the artboard or change line 35 & 36 */

var folder = Folder.selectDialog();
var exportFolder = new Folder(folder.fsName+"/3.Android");
/* create a new folder named '/3.Android' in the selected folder */
var document = app.activeDocument;
var prefix = "Icon";

if(folder && document) {


    exportPNG(exportFolder, prefix, 36, '36x36');
    exportPNG(exportFolder, prefix, 48, '48x48');
    exportPNG(exportFolder, prefix, 72, '72x72');
    exportPNG(exportFolder, prefix, 96, '96x96');
    exportPNG(exportFolder, prefix, 144, '144x144');
    exportPNG(exportFolder, prefix, 192, '192x192');
    /** exportPNG(1.folder, 2.prefix, 3.{file width/height}, 4.'{surfix}')
     * If you would like to add variations, copy & paste line 13 and change 3 and 4  */

}

function exportPNG(folder, prefix, scaleTo, suffix) {
    if(!folder.exists) {
        folder.create();
    }

    var file = new File(folder.fsName + "/" + prefix +  "_" + suffix + ".png");
    /** new File(folder.fsName + "/" + prefix + "_"  + suffix + ".png")
    * => create new file (folderName/icon(prefix)_{suffix}.png)*/

    options = new ExportOptionsPNG24();
    options.antiAliasing = true;
    options.transparency = true;
    options.artBoardClipping = true;
    options.verticalScale = scaleTo / 60 * 100.0;
    options.horizontalScale = scaleTo / 60 * 100.0;
    /** line 35 to 36: 
     * 'scaleTo / {artboard size} * 100.0;' 
     * If you change size of artboard, please adjust {artboard size} **/

    document.artboards.setActiveArtboardIndex(0);
    document.exportFile(file, ExportType.PNG24, options);
}
