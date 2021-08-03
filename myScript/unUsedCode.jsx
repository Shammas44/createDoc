
// //Display a standard open file dialog box to select a text file.
// var myTextFile = File.openDialog("Choose a text file");
// //If a text file was selected, and if you didn't press Cancel,
// //place the text file at the first insertion point after the headline.
// if((myTextFile)&&(myTextFile != null)){
//     myTextFrame.insertionPoints.item(-1).place(myTextFile);
// }


//Display a standard open file dialog box to select a graphic file.
// var myGraphicFile = File.openDialog("Choose a graphic file");
//If a graphic file was selected, and if you didn't press Cancel, 
//place the graphic file on the page.

// var myGraphicFile = File('/Applications/MAMP/htdocs/indesignScript/link/shared.ai'); 
// if((myGraphicFile)&&(myGraphicFile != null)){
//     var myGraphic = document.pages.item(0).place(myGraphicFile, [70, 70], sourceLayer );
// //Since you can place multiple graphics at once, the place method
// //returns an array. To get the graphic you placed, get the first
// myGraphic = myGraphic[0];
// //Create an object style to apply to the graphic frame.
// var myObjectStyle = document.objectStyles.item("GraphicFrame");
// try {
//     var myName = myObjectStyle.name;
// }catch (myError){
// //The object style did not exist, so create it.
// myObjectStyle = document.objectStyles.add({name:"GraphicFrame"});
// }
// myObjectStyle.enableStroke = true;
// myObjectStyle.strokeWeight = 3;
// myObjectStyle.strokeType = document.strokeStyles.itemByID(0);
// myObjectStyle.strokeColor = document.colors.item("Red");
// //The frame containing the graphic is the parent of the graphic.
// var myFrame = myGraphic.parent;
// myFrame.applyObjectStyle(myObjectStyle, true);
// //Resize the frame to a specific size.
// myFrame.geometricBounds = [0,0,144,144];
// //Fit the graphic to the frame proportionally.
// myFrame.fit(FitOptions.PROPORTIONALLY);
// //Next, fit frame to the resized graphic.
// myFrame.fit(FitOptions.FRAME_TO_CONTENT);
// var myBounds = myFrame.geometricBounds;
// var myGraphicWidth = myBounds[3]-myBounds[1];
// //Move the graphic frame.
// var myTopMargin = document.pages.item(0).marginPreferences.top;
// myFrame.move([pageW-myGraphicWidth, myTopMargin]);
// //Apply a text wrap to the graphic frame.
// myFrame.textWrapPreferences.textWrapMode = TextWrapModes.BOUNDING_BOX_TEXT_WRAP;
// myFrame.textWrapPreferences.textWrapOffset = [24, 12, 24, 12];
// }