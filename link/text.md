# markdownID: Markdown import for InDesign

a Jongware script  
04-Jun-2012

>> With Markdown, the font, style, margin and other stuff all comes later.
>>> _The Markdown Mindset_, Hilton Lipschitz (<http://hiltmon.com/blog/2012/02/20/the-markdown-mindset/>)

If you want to write simple documents using a plain text editor but still want to add basic text
formatting, you can use [Markdown][md]: John Gruber's formatting system,
with which you  use short and easy-to-remember codes to *mark up* your text. Lots of websites and blogs are already using
Markdown, so you can enter plain text and still have it formatted the way you want.

[md]: http://daringfireball.net/projects/markdown/


With my Javascript `markdownID` ([download][dl]), you can select existing text or import a Markdown file,
and it will be converted into properly styled text for InDesign.

[dl]: http://www.jongware.com/binaries/markdownid.zip "download link"

The script supports lots of the standard functions from the original Markdown, and so you can use the 
[Markdown reference][] for the basic set of commands.
Unfortunately, there are also some functions that InDesign cannot easily emulate.

[Markdown reference]: http://daringfireball.net/projects/markdown/ "A titled reference!"

Markdown was designed to work with HTML, and HTML allows unlimited
nesting of its equivalent of 'paragraph' and 'character' styles -- you can use a header
inside a block quote and italics inside a hyperlink. However, since these codes are
converted into InDesign Paragraph and Character Styles, you cannot nest them as InDesign can't do something similar.
Markdown also lets you insert images; my script does not support this.

With the real Markdown you can type "inline HTML" -- any HTML command is copied _verbatim_ into its output, as it was designed to work with HTML only.
Writing a full HTML-to-InDesign parser goes a bit beyond the intention of this script,
so I left that out in its entirety.

== Basic functions ==

The following basic Markdown syntax functions are supported:

4. First and second level headings, marked by underlining the heading with `====` and `----`
3. Heading 1 to 6, marked with up to six `#` characters
1. Numbered lists (single level only)
2. Bulleted lists (single level only)
5. "Blockquote" indented text (any level of indentation)
6. "Preformatted" text
7. **\*\*Bold*\***, _\_italic\__, and `` `typewriter` `` formatting
1. Escape otherwise 'special' characters using a backslash: `\\_` will insert a plain `_`.
8. Horizontal rules
9. Two or more space at the end of a regular line inserts a soft line break
9. Automatic hyperlinks for immediate links such as `<http://some.link.com>`, inline linked text such as `[Text](http://link.com)`, and
   references `[Text][my_ref]`.
   
See the [Markdown Syntax] (http://daringfireball.net/projects/markdown/basics) web page for
more information on how to use the basic syntax.

== Additions ==

Standard Markdown allows both single and double `*` and `_` to be nested to form bold + italics. Such nesting of character style formatting is not
possible with InDesign, so I had to write some extra code to handle it. Theoretically, you can use _italics **inside** bold_ and vice versa as you would expect:

	Theoretically, you can use _italics **inside** bold_ and vice versa as you would expect.

If it does not come out the way you intended, you'll have to change the markup in an easier to parse way.
Triple markings such as `***hello***` and `___goodbye___` work as expected.

You can safely use the underscore _inside_ words for "special_terms" -- its meaning is ignored when
there are 'word' characters to its left and right.

The original Markdown only uses the `#` character to mark headers; `markdownID` also allows `=`.

=== Tables ===

By way of addition to the standard Markdown syntax, it also supports simple tables.
The following will automatically be converted to a basic table:

	|----------------|-----------|-------------|
 | Header           | Header 2      | Another one   |
 | ---------------- | ------------- | ------------- |
 | Regular cell     | A merged cell |               |
 | Left align       | Right         | Center        |
 | ---------------- | -----------   | ------------- |

... this will come in as a proper table:

|----------------|-----------|-------------|
| Header           | Header 2      | Another one   |
| ---------------- | ------------- | ------------- |
| Regular cell     | A merged cell |               |
| Left align       | Right         | Center        |
| ---------------- | -----------   | ------------- |

There must be a `|` at the start of each line; at the end it may be omitted.
Text above a dashed line will automatically be designated a "Header Row". The dashed lines at the very top and bottom are not necessary, you may leave them out.

Spaces can be used to visually align the columns,
or you can let everything run together (but _do_ use spaces, so you can better see what you are doing!).
If there is only one, or no space at the right hand side of a 'cell' and at
least two at the left hand side, the contents will be right-aligned. If there are two or more spaces at 
both start and end of a cell, its contents will be centered. To insert a blank cell, make sure there is at least
one space between two `|` characters. Two or more `|` without spaces will horizontally merge that number of cells into one
(there is no equivalent to create vertically merged cells).

`markdownID` attempts to size columns according to their contents, but this is only a _very_ rough guess. Merged cells, for example, will throw its calculations off.

=== Special characters ===

The script has extended support for special characters. Two dashes `--` will be converted to an en-dash; three
dashes `---` into an em-dash. Three periods `...` will end up as a proper ellipsis.
Single `'` and double `"` will be converted to smart quotes (ever so slightly
smarter than InDesign's own, by the way). In addition, you can use the following shortcuts to indicate 
accented characters:

*	`'` for an acute; type `\\a'` to get "\a'";
*	`` ` `` for a grave; type ``\\e` `` to get "\e`";
*	`^` adds a circumflex; for example, `\\o^` in "h\o^tel";
*	`~` for a tilde; type `\\N~` to get "\N~";
*	`,` for a cedilla or ogonek; `\\c,` is a c-cedilla "\c,", `\\o,` is the Polish "\o,";
*	`#` for the Hungarian double acute on `o` and `u`: `\\o#` yields "\o#", `\\u#` forms "\u#";
*	`"` is useful for German umlauts: use `\\u"` to get some "vergn\u"gen";
*	uppercase and lowercase `\\L/`, `\\AE`, and `\\oe` result in "\L/", "\AE", and "\oe".
*	lowercase only: `\\ss` translates to the German double-s "\ss".

Acute, grave, circumflex, tilde, and umlaut work on lowercase and uppercase `a`, `e`, `i`, `o`, and `u`.
The tilde also works on the `n`; ogonek/cedilla works on `a`, `c`, `e`, `n`, and `o`.

=== Style translation

The necessary styles will be created automatically and get added to your current styles in a separate folder 'Markdown', but you
can provide a translation list from the default styles to your own. To do so, draw a small text frame somewhere on
the pasteboard next to any page in your document. Enter `#markdown` as the first line, followed by a hard return; then add
a line in the form `<tag> = <your style name>` for each style you want to get translated.
The Markdown tags you can define this way are the following:

==== Character styles ===
* `strong` = bold
* `em` = italics
* `strongem` = bold and italics (as this needs a ***separate*** style in InDesign)
* `code` = typewriter font
* `hyperlink` = pretty obvious

==== Paragraph styles ===
* `text` = plain paragraphs
* `quote` = indented block quotes
* `pre` = 'preformatted', computer listing style
* `h1` = First header
* `h2` = Second header
* `h3` = Third header
* `h4` = Fourth header
* `h5` = Fifth header
* `h6` = Sixth, and last, header
* `bullet` = Bulleted list
* `numbered` = Numbered list
* `indent` = Indented text, without bullet or number
* `hrule` = A simple but effective horizontal line
* `th` = Table header text
* `td` = Table body text
==== Table Style ===
* `table` = The Table Style applied to your tables
==== Cell Styles ===
* `header` = The Cell Style applied to headers
* `body` = The Cell Style applied to table body cells

Fortunately, you don't have to re-define all of them; and 'translated' style names do not need to exist in advance in your document, they will 
be added as soon as you run the script.


== How to use ==

You can use the script in two different ways. Running it with no text selected pops up an "Open File" dialog, so you
can retrieve a file from your hard disk and 'place' it as usual.

You can also select some text that you already typed or imported, and then run it; it will convert *only* the selected text, leaving the rest unchanged.

=== Sample file ==
You can view this document in its original MarkdownID notation [here][sample]. You can open it in a text editor or import as 'plain text' into InDesign and check how I
used the various commands, and then you can import it using the script and see how it comes in.

[sample]: http://www.jongware.com/markdownid.md

== Copyright ==

The syntax used in `markdownID.jsx` is based on the original Markdown markup language as designed by John Gruber, which bears the following copyright statement:

> Copyright © 2004, John Gruber  
> <http://daringfireball.net/>  
> All rights reserved.

This version is entirely Jongware's interpretation of Markdown; as such its behavior
and output may be different from the original version, intentional or by accident.
In that case you probably can blaim Jongware for that.