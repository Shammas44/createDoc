#target InDesign;
#include "./test.jsx";



var document = app.documents.add(true);
with (document.documentPreferences) {
    const facingPages = true;
    const pagesPerDocument = 4;
    const pageOrientation = PageOrientation.PORTRAIT;
    const createPrimaryTextFrame = false;
    const intent = DocumentIntentOptions.PRINT_INTENT;
    const allowPageShuffle = true;
}
//Set the measurement units and ruler origin.
document.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
document.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;
document.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
var pageW = Number(document.documentPreferences.pageWidth);
var pageH = Number(document.documentPreferences.pageHeight);
//Get a reference to the first master spread.
var myMasterSpread = document.masterSpreads.item(0);
//Get a reference to the margin preferences of the first page in the master spread.
var myMarginPreferences = myMasterSpread.pages.item(0).marginPreferences;
//Now set up the page margins and columns.
myMarginPreferences.left = 70;
myMarginPreferences.top = 70;
myMarginPreferences.right = 70;
myMarginPreferences.bottom = 78;
myMarginPreferences.columnCount = 3;
myMarginPreferences.columnGutter = 14;
//Page margins and columns for the right-hand page
var myMarginPreferences = myMasterSpread.pages.item(1).marginPreferences;
myMarginPreferences.left = 70;
myMarginPreferences.top = 70;
myMarginPreferences.right = 70;
myMarginPreferences.bottom = 78;
myMarginPreferences.columnCount = 3;
myMarginPreferences.columnGutter = 14;
//grille de ligne de base
var myGridPreferences = document.gridPreferences;
myGridPreferences.baselineDivision = 14;
myGridPreferences.baselineStart = 70;
myGridPreferences.baselineGridShown = true;
//layer
var sourceLayer = document.layers[0];
//masterSpread
var myMasterSpread = document.masterSpreads.item(0);
var myLeftPage = myMasterSpread.pages.item(0);
var myRightPage = myMasterSpread.pages.item(1);



//leftFooter
var myLeftFooter = myLeftPage.textFrames.add(sourceLayer);
var x2 = pageW - 70;
myLeftFooter.geometricBounds = [728, 70, 763.89, x2];
myLeftFooter.textFramePreferences.firstBaselineOffset = FirstBaseline.LEADING_OFFSET;
myLeftFooter.contents = SpecialCharacters.AUTO_PAGE_NUMBER;
myLeftFooter.parentStory.characters.item(0).pointSize = 11;
myLeftFooter.parentStory.characters.item(0).leading = 14;
//rightFooter
var myRightFooter = myRightPage.textFrames.add(sourceLayer);
myRightFooter.geometricBounds = [728, 70, 763.89, x2];
myRightFooter.textFramePreferences.firstBaselineOffset = FirstBaseline.LEADING_OFFSET;
myRightFooter.contents = SpecialCharacters.AUTO_PAGE_NUMBER;
myRightFooter.parentStory.characters.item(0).pointSize = 11;
myRightFooter.parentStory.characters.item(0).leading = 14;
myRightFooter.parentStory.characters.item(0).justification = Justification.RIGHT_ALIGN;

var myLeftPage = myMasterSpread.pages.item(0);
var myRightPage = myMasterSpread.pages.item(1);

var myLeftTextFrame = myLeftPage.textFrames.add(sourceLayer);
myLeftTextFrame.geometricBounds = [70, 70, 763.89, x2];
myLeftTextFrame.textFramePreferences.firstBaselineOffset = FirstBaseline.LEADING_OFFSET;
myLeftTextFrame.textFramePreferences.textColumnCount = 3;
myLeftTextFrame.textFramePreferences.textColumnGutter = 14;
//Add a label to make the frame easier to find later on.myLeftTextFrame.label = "BodyTextFrame"
var myRightTextFrame = myRightPage.textFrames.add(sourceLayer);
myRightTextFrame.geometricBounds = [70, 70, 763.89, x2];
myRightTextFrame.textFramePreferences.firstBaselineOffset = FirstBaseline.LEADING_OFFSET;
myRightTextFrame.textFramePreferences.textColumnCount = 3;
myRightTextFrame.textFramePreferences.textColumnGutter = 14;
//Add a label to make the frame easier to find later on.myRightTextFrame.label = "BodyTextFrame"
//Link the two frames using the nextTextFrame property.myLeftTextFrame.nextTextFrame = myRightTextFrame











var str = '';
var index = 0;
for (index = 0; index < 500; index++) {
    str += 'ABCDASFGALFGKAéF ';
}

//var myTextFrame = document.masterSpreads.item(0).pages.item(1).textFrames.item(0).override(document.pages.item(0));
//Add text by setting the contents of an insertion point to a string.//In JavaScript, "\r" is a return character.
//myTextFrame.insertionPoints.item(0).contents = "Headline!\r"+str;

// var tfs = document.textFrames;
// var oversetPageNums = [];

// for (var i = 0; i < tfs.length; i++) {
// if (tfs[i].overflows) {
// }
// }

for (var i = 0; i <= 3; i++) {
    var textFrame = document.pages[i].textFrames.add(sourceLayer);
    textFrame.geometricBounds = [70, 70, 763.89, x2];
    textFrame.textFramePreferences.textColumnCount = 3;
    textFrame.textFramePreferences.textColumnGutter = 14;
    if (i == 0) {
        textFrame.insertionPoints.item(0).contents = "Headline!\r" + str;
    }
}


var allPages = document.pages;
var currentFrame = allPages[0].textFrames[0];
for (var i = 1; i < allPages.length; i++) {
    currentFrame.nextTextFrame = allPages[i].textFrames[0];
    currentFrame = allPages[i].textFrames[0];
}

var myParagraphStyle = document.paragraphStyles.item("Heading 1");
try {
    var myName = myParagraphStyle.name;
} catch (myError) {
    //The paragraph style did not exist, so create it.
    myParagraphStyle = document.paragraphStyles.add({ name: "Heading 1" });
}
//We'll need to create a color. Check to see if the color already exists.
var myColor = document.colors.item("Red");
try {
    myName = myColor.name;
} catch (myError) {
    //The color did not exist, so create it.
    myColor = document.colors.add({ name: "Red", model: ColorModel.PROCESS, colorValue: [0, 100, 100, 0] });
}
//Now set the formatting of the paragraph style.
myParagraphStyle.appliedFont = "Arial";
myParagraphStyle.fontStyle = "Bold";
myParagraphStyle.pointSize = 24;
myParagraphStyle.spaceAfter = 24;
myParagraphStyle.spaceBefore = 24;
myParagraphStyle.fillColor = document.colors.item("Red");
//Apply the style to the paragraph.
var preFile = File('/Applications/MAMP/htdocs/indesignScript/styles/designfreebies_indesign_stylesheet_template.indd');
app.importStyles(ImportFormat.PARAGRAPH_STYLES_FORMAT, preFile, GlobalClashResolutionStrategy.LOAD_ALL_WITH_OVERWRITE);
var style = document.paragraphStyleGroups.itemByName('Paragraphs').paragraphStyles.itemByName("Paragraph - with indent");
// document.pages.item(0).textFrames.item(0).paragraphs.item(0).applyParagraphStyle(style, true);


//You could also use:
//document.pages.item(0).textFrames.item(0).paragraphs.item(0).appliedParagraphStyle = myParagraphStyle;


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

//remove masterspread for cover
var cover = document.pages.item(0);
cover.appliedMaster = null;

var leftFooterImg = File('/Applications/MAMP/htdocs/indesignScript/link/footer_left.eps');
var rightFooterImg = File('/Applications/MAMP/htdocs/indesignScript/link/footer_right.eps');
var coverImg = File('/Applications/MAMP/htdocs/indesignScript/link/cover.eps');
if ((leftFooterImg) && (rightFooterImg) && (leftFooterImg != null) && (rightFooterImg != null)) {
    //var imgLeft = document.pages.item(0).place(leftFooterImg, [0, 0], sourceLayer );
    var imgLeft = myLeftPage.place(leftFooterImg, [0, 0], sourceLayer);
    var imgRight = myRightPage.place(rightFooterImg, [0, 0], sourceLayer);
    //Since you can place multiple graphics at once, the place method
    //returns an array. To get the graphic you placed, get the first
    imgLeft = imgLeft[0];
    imgRight = imgRight[0];
    //The frame containing the graphic is the parent of the graphic.
    var leftFrame = imgLeft.parent;
    var rightFrame = imgRight.parent;
    //Resize the frame to a specific size.
    leftFrame.geometricBounds = [748.727, 0, pageH, pageW];
    rightFrame.geometricBounds = [748.727, 0, pageH, pageW];
    //Fit the graphic to the frame proportionally.
    leftFrame.fit(FitOptions.PROPORTIONALLY);
    rightFrame.fit(FitOptions.PROPORTIONALLY);
    //Next, fit frame to the resized graphic.
    leftFrame.fit(FitOptions.FRAME_TO_CONTENT);
    rightFrame.fit(FitOptions.FRAME_TO_CONTENT);
}

    // if((coverImg)&&(coverImg != null)){
    // //var imgLeft = document.pages.item(0).place(leftFooterImg, [0, 0], sourceLayer );
    // var coverPage = document.pages.item(0);
    // var cover = coverPage.place(coverImg, [0, 0], sourceLayer );
    // //Since you can place multiple graphics at once, the place method
    // //returns an array. To get the graphic you placed, get the first
    // cover = cover[0];
    //  //The frame containing the graphic is the parent of the graphic.
    // var coverFrame = cover.parent;
    // //Resize the frame to a specific size.
    // coverFrame.geometricBounds = [0,0,pageH,pageW];
    // //Fit the graphic to the frame proportionally.
    // coverFrame.fit(FitOptions.PROPORTIONALLY);
    // //Next, fit frame to the resized graphic.
    // coverFrame.fit(FitOptions.FRAME_TO_CONTENT);
    // }






