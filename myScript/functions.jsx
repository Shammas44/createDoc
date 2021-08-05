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
    }
    return document;
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
    myMarginPreferences.bottom = 100;
    myMarginPreferences.columnCount = 2;
    myMarginPreferences.columnGutter = 14;
    //Page margins and columns for the right-hand pagjke
    var myMarginPreferences = myMasterSpread.myMasterSpread.pages.item(1).marginPreferences;
    myMarginPreferences.left = 70;
    myMarginPreferences.top = 70;
    myMarginPreferences.right = 70;
    myMarginPreferences.bottom = 100;
    myMarginPreferences.columnCount = 2;
    myMarginPreferences.columnGutter = 14;
}

function setGrid(document) {
    //grille de ligne de base
    var myGridPreferences = document.gridPreferences;
    myGridPreferences.baselineDivision = 14;
    myGridPreferences.baselineStart = 70;
    myGridPreferences.baselineGridShown = true;
}


function setFooter(document, myMasterSpread) {
    //leftFooter
    var myLeftFooter = myMasterSpread.myLeftPage.textFrames.add(secondLayer);
    myLeftFooter.geometricBounds = [PAGE_H - 66, MARGIN_X1, PAGE_H - 33, MARGIN_X2];
    myLeftFooter.textFramePreferences.firstBaselineOffset = FirstBaseline.LEADING_OFFSET;
    myLeftFooter.contents = SpecialCharacters.AUTO_PAGE_NUMBER;
    myLeftFooter.parentStory.characters.item(0).pointSize = 11;
    myLeftFooter.parentStory.characters.item(0).leading = 14;
    //rightFooter
    var myRightFooter = myMasterSpread.myRightPage.textFrames.add(secondLayer);
    myRightFooter.geometricBounds = [PAGE_H - 66, MARGIN_X1, PAGE_H - 33, MARGIN_X2];
    myRightFooter.textFramePreferences.firstBaselineOffset = FirstBaseline.LEADING_OFFSET;
    myRightFooter.contents = SpecialCharacters.AUTO_PAGE_NUMBER;
    myRightFooter.parentStory.characters.item(0).pointSize = 11;
    myRightFooter.parentStory.characters.item(0).leading = 14;
    myRightFooter.parentStory.characters.item(0).justification = Justification.RIGHT_ALIGN;
    //right and left pages
    var myLeftPage = myMasterSpread.myMasterSpread.pages.item(0);
    var myRightPage = myMasterSpread.myMasterSpread.pages.item(1);
    var myLeftTextFrame = myLeftPage.textFrames.add(sourceLayer);
    myLeftTextFrame.geometricBounds = [MARGIN_Y1, MARGIN_X1, 742, MARGIN_X2];
    myLeftTextFrame.textFramePreferences.firstBaselineOffset = FirstBaseline.LEADING_OFFSET;
    myLeftTextFrame.textFramePreferences.textColumnCount = 2;
    myLeftTextFrame.textFramePreferences.textColumnGutter = 14;
    //Add a label to make the frame easier to find later on.myLeftTextFrame.label = "BodyTextFrame"
    var myRightTextFrame = myRightPage.textFrames.add(sourceLayer);
    myRightTextFrame.geometricBounds = [MARGIN_Y1, MARGIN_X1, 742, MARGIN_X2];
    myRightTextFrame.textFramePreferences.firstBaselineOffset = FirstBaseline.LEADING_OFFSET;
    myRightTextFrame.textFramePreferences.textColumnCount = 2;
    myRightTextFrame.textFramePreferences.textColumnGutter = 14;
    //Add a label to make the frame easier to find later on.myRightTextFrame.label = "BodyTextFrame"
    //Link the two frames using the nextTextFrame property.myLeftTextFrame.nextTextFrame = myRightTextFrame
}

function setContent(document) {
    var i = 0;
    do {
        var textFrame = document.pages[i].textFrames.add(sourceLayer);
        textFrame.geometricBounds = [70, 70, 742, MARGIN_X2];
        textFrame.textFramePreferences.textColumnCount = 2;
        textFrame.textFramePreferences.textColumnGutter = 14;
        if (i == 0) {
            textFrame.select();
            var markdownScript = File('/Applications/MAMP/htdocs/indesignScript/myScript/markdownID.jsx');
            app.doScript(markdownScript, ScriptLanguage.javascript);
            // textFrame.insertionPoints.item(0).contents = "Headline!\r" + str;
            i = 0;
        }
        if (i >= 1) {
            //link textFrame to each other
            var allPages = document.pages;
            var currentFrame = allPages[i].textFrames[0];
            currentFrame.previousTextFrame = allPages[i - 1].textFrames[0];
        }
        i++;
    } while (textFrame.overflows);
}

function setParagraphStyle(document) {
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
    document.pages.item(1).textFrames.item(0).paragraphs.item(0).applyParagraphStyle(style, true);
    //You could also use:
    //document.pages.item(0).textFrames.item(0).paragraphs.item(0).appliedParagraphStyle = myParagraphStyle;
}

function setFooterImg(document) {
    var leftFooterImg = File('/Applications/MAMP/htdocs/indesignScript/link/footer_left.eps');
    var rightFooterImg = File('/Applications/MAMP/htdocs/indesignScript/link/footer_right.eps');
    if ((leftFooterImg) && (rightFooterImg) && (leftFooterImg != null) && (rightFooterImg != null)) {
        //var imgLeft = document.pages.item(0).place(leftFooterImg, [0, 0], sourceLayer );
        var imgLeft = myMasterSpread.myLeftPage.place(leftFooterImg, [0, 0], sourceLayer);
        var imgRight = myMasterSpread.myRightPage.place(rightFooterImg, [0, 0], sourceLayer);
        //Since you can place multiple graphics at once, the place method
        //returns an array. To get the graphic you placed, get the first
        imgLeft = imgLeft[0];
        imgRight = imgRight[0];
        //The frame containing the graphic is the parent of the graphic.
        var leftFrame = imgLeft.parent;
        var rightFrame = imgRight.parent;
        //Resize the frame to a specific size.
        leftFrame.geometricBounds = [748.727, 0, PAGE_H, PAGE_W];
        rightFrame.geometricBounds = [748.727, 0, PAGE_H, PAGE_W];
        //Fit the graphic to the frame proportionally.
        leftFrame.fit(FitOptions.PROPORTIONALLY);
        rightFrame.fit(FitOptions.PROPORTIONALLY);
        //Next, fit frame to the resized graphic.
        leftFrame.fit(FitOptions.FRAME_TO_CONTENT);
        rightFrame.fit(FitOptions.FRAME_TO_CONTENT);
    }
}

function setCoverImg(document) {
    var coverImg = File('/Applications/MAMP/htdocs/indesignScript/link/cover.eps');
    if ((coverImg) && (coverImg != null)) {
        //var imgLeft = document.pages.item(0).place(leftFooterImg, [0, 0], sourceLayer );
        var coverPage = document.pages.item(0);
        var cover = coverPage.place(coverImg, [0, 0], sourceLayer);
        //Since you can place multiple graphics at once, the place method
        //returns an array. To get the graphic you placed, get the first
        cover = cover[0];
        //The frame containing the graphic is the parent of the graphic.
        var coverFrame = cover.parent;
        //Resize the frame to a specific size.
        coverFrame.geometricBounds = [0, 0, PAGE_H, PAGE_W];
        //Fit the graphic to the frame proportionally.
        coverFrame.fit(FitOptions.PROPORTIONALLY);
        //Next, fit frame to the resized graphic.
        coverFrame.fit(FitOptions.FRAME_TO_CONTENT);
    }
}