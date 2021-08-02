
function setDocument() {
    var document = app.documents.add(true);
    with (document.documentPreferences) {
        const facingPages = true;
        const pagesPerDocument = 4;
        const pageOrientation = PageOrientation.PORTRAIT;
        const createPrimaryTextFrame = false;
        const intent = DocumentIntentOptions.PRINT_INTENT;
        const allowPageShuffle = true;
        //Set the measurement units and ruler origin.
        document.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
        document.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;
        document.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
        return document;
    }
}

function setMasterSpread(document) {
    //Get a reference to the first master spread.
    var myMasterSpread = document.masterSpreads.item(0);
    //masterSpread
    var myMasterSpread = document.masterSpreads.item(0);
    var myLeftPage = myMasterSpread.pages.item(0);
    var myRightPage = myMasterSpread.pages.item(1);
    var array = {
        myMasterSpread: myMasterSpread, myLeftPage: myLeftPage, myRightPage: myRightPage
    };
    return array;
}

function setMargin(document, myMasterSpread) {
    //Get a reference to the margin preferences of the first page in the master spread.
    var myMarginPreferences = myMasterSpread.myMasterSpread.pages.item(0).marginPreferences;
    //Now set up the page margins and columns.
    myMarginPreferences.left = 70;
    myMarginPreferences.top = 70;
    myMarginPreferences.right = 70;
    myMarginPreferences.bottom = 78;
    myMarginPreferences.columnCount = 3;
    myMarginPreferences.columnGutter = 14;
    //Page margins and columns for the right-hand pagjke
    var myMarginPreferences = myMasterSpread.myMasterSpread.pages.item(1).marginPreferences;
    myMarginPreferences.left = 70;
    myMarginPreferences.top = 70;
    myMarginPreferences.right = 70;
    myMarginPreferences.bottom = 78;
    myMarginPreferences.columnCount = 3;
    myMarginPreferences.columnGutter = 14;
}

function setGrid(document) {
    //grille de ligne de base
    var myGridPreferences = document.gridPreferences;
    myGridPreferences.baselineDivision = 14;
    myGridPreferences.baselineStart = 70;
    myGridPreferences.baselineGridShown = true;
}

function setLayer(document) {
    var sourceLayer = document.layers[0];
    return sourceLayer;
}

function setFooter(document, myMasterSpread, sourceLayer) {
    //leftFooter
    var myLeftFooter = myMasterSpread.myLeftPage.textFrames.add(sourceLayer);
    myLeftFooter.geometricBounds = [728, 70, 763.89, x2];
    myLeftFooter.textFramePreferences.firstBaselineOffset = FirstBaseline.LEADING_OFFSET;
    myLeftFooter.contents = SpecialCharacters.AUTO_PAGE_NUMBER;
    myLeftFooter.parentStory.characters.item(0).pointSize = 11;
    myLeftFooter.parentStory.characters.item(0).leading = 14;
    //rightFooter
    var myRightFooter = myMasterSpread.myRightPage.textFrames.add(sourceLayer);
    myRightFooter.geometricBounds = [728, 70, 763.89, x2];
    myRightFooter.textFramePreferences.firstBaselineOffset = FirstBaseline.LEADING_OFFSET;
    myRightFooter.contents = SpecialCharacters.AUTO_PAGE_NUMBER;
    myRightFooter.parentStory.characters.item(0).pointSize = 11;
    myRightFooter.parentStory.characters.item(0).leading = 14;
    myRightFooter.parentStory.characters.item(0).justification = Justification.RIGHT_ALIGN;
    //right and left pages
    var myLeftPage = myMasterSpread.myMasterSpread.pages.item(0);
    var myRightPage = myMasterSpread.myMasterSpread.pages.item(1);
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
}

function setContent(document, sourceLayer) {
    var str = '';
    var index = 0;
    for (index = 0; index < 500; index++) {
        str += 'ABCDASFGALFGKAéF ';
    }

    for (var i = 0; i <= 3; i++) {
        var textFrame = document.pages[i].textFrames.add(sourceLayer);
        textFrame.geometricBounds = [70, 70, 763.89, x2];
        textFrame.textFramePreferences.textColumnCount = 3;
        textFrame.textFramePreferences.textColumnGutter = 14;
        if (i == 0) {
            textFrame.insertionPoints.item(0).contents = "Headline!\r" + str;
        }
    }


    //link textFrame to each other
    var allPages = document.pages;
    var currentFrame = allPages[0].textFrames[0];
    for (var i = 1; i < allPages.length; i++) {
        currentFrame.nextTextFrame = allPages[i].textFrames[0];
        currentFrame = allPages[i].textFrames[0];
    }
}