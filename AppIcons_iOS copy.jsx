/** !!! This script ONLY WORKS if the file has ONE artboard of SIZE 60 x 60 !!!
 * if your artboard is not the right size, please adjust the artboard or change line 49 & 50*/

var folder = Folder.selectDialog();
var exportFolder = new Folder(folder.fsName+"/2.iOS");
/* create a new folder named '/2.iOS' in the selected directory */
var document = app.activeDocument;
var prefix = "Icon";
/** Set prefix as "Icon"
 * You can change prefix here */


if(folder && document) {

    exportPNG(exportFolder, prefix, 40, '20@2x');
    exportPNG(exportFolder, prefix, 60, '20@3x');
    exportPNG(exportFolder, prefix, 58, '29@2x');
    exportPNG(exportFolder, prefix, 87, '29@3x');
    exportPNG(exportFolder, prefix, 80, '40@2x');
    exportPNG(exportFolder, prefix, 120, '40@3x');
    exportPNG(exportFolder, prefix, 120, '60@2x');
    exportPNG(exportFolder, prefix, 180, '60@3x');
    exportPNG(exportFolder, prefix, 152, '76@2x');
    exportPNG(exportFolder, prefix, 167, '83.5@2x');
    exportPNG(exportFolder, prefix, 1024, 'iTunesArtwork');
    
    /** !!!please make sure to move Icon_google_play_store.png to Andoroid folder!!!
     *  Icon_google_play_store.png will be exported in the folder you have selected but not '/2.iOS' */
    exportPNG(folder, prefix, 512, 'google_play_store');

    /** exportPNG(1.select folder, 2.set prefix, 3.set file width&height, 4.define surfix)
     * If you would like to add variation, copy & paste line 11 and change 3 and 4 */

}

function exportPNG(folder, prefix, scaleTo, suffix) {
    if(!folder.exists) {
        folder.create();
    }

    var file = new File(folder.fsName + "/" + prefix + "_"  + suffix + ".png");
    /** new File(folder.fsName + "/" + prefix + "_"  + suffix + ".png")
    * => create new file (folderName/icon(prefix)_{suffix}.png)*/
    
    options = new ExportOptionsPNG24();
    options.antiAliasing = true;
    options.transparency = true;
    options.artBoardClipping = true;
    options.verticalScale = scaleTo / 60 * 100.0;
    options.horizontalScale = scaleTo / 60 * 100.0;
    /** line 32 to 33: 
     * 'scaleTo / {artboard size} * 100.0;' 
     * If you change the artboard size, please adjust {artboard size} */

    document.artboards.setActiveArtboardIndex(0);
    document.exportFile(file, ExportType.PNG24, options);
} 
 