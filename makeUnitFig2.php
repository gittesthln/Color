<?php
$BGH = 0;
$BGS = 0;
$BGL = 0;
$CH =  0;
$CS =  0;
//$CL = 50;
$Gray = [
[   0,  0, 100],  //100
[  10, 13,  95],  //95  
[  10, 13,  90],  //90
[  10, 13,  84],  //85
[  10, 13,  79],  //80
[  10, 13,  70],  //75
[  10, 10,  64],  //70
[  10, 10,  59],  //65
[   0, 13,  55],  //60
[   0, 13,  50],  //55
[ -10, 15,  45],  //50
[ -10, 15,  41],  //45
[ -10, 10,  35],  //40
[ -10, 10,  30],  //35
[ -10, 10,  25],  //30
[ -10, 10,  20],  //25
[ -10, 15,  15],  //20
[ -10, 15,  10],  //15
[ -10, 15,   5],  //10
[   0,  0,   0]
];
$no = 0;
for($i=0; $i<count($Gray);$i++) {
list($BGH, $BGC, $BGL) = $Gray[$i];
for($j = 0; $j <count($Gray); $j++) {
if($i==$j) continue;
list($CH, $CC, $CL) = $Gray[$j];
$filename = "fig-$BGH-$BGS-$BGL-$CH-$CS-$CL.eps";
print '\Fig{'. $filename ."}\n";
$fp = fopen($filename, "w");
fwrite($fp,
<<<_EOL_
%!PS-Adobe-3.0 EPSF-3.0
%%BoundingBox: 13 13 243 243
%%Title: C:\usr\local\teluhiko\html\shimizu2\unitfig1.ps
%%Creator: GSview from C:\usr\local\teluhiko\html\shimizu2\unitfig1.ps
%%CreationDate: Fri Mar 02 12:42:53 2018
%%Pages: 1
%%EndComments
%%Page: 1 1
%%BeginDocument: C:\usr\local\teluhiko\html\shimizu2\unitfig1.ps
/HSL2RGB {
    100 div 3 1 roll
    100 div 3 1 roll
    360 div 3 1 roll
    hsl2rgb
%		3 {255 mul round 3 1 roll) repeat
} def
/hsl2rgb{
		/L exch def
		/S exch def
		/m2 L 0.5 le {L S 1 add mul}{L S add L S mul sub}ifelse def
		/m1 L 2 mul m2 sub def
    dup dup 1 3 div add hue2rgb 
    exch hue2rgb
    3 -1 roll 1 3 div sub hue2rgb
} def
/hue2rgb {
		dup 0 lt {1 add}if
		dup 1 gt {1 sub}if
		dup 6 mul 1 lt{
				m2 m1 sub mul 6 mul m1 add false
		}{true} ifelse
		{	dup 2 mul 1 lt
        {	pop m2 false}{true} ifelse
    }{false}ifelse
		{	dup 3 mul 2 lt
        {2 3 div exch sub m2 m1 sub mul 6 mul m1 add}
				{pop m1} ifelse
    }if
}def

/size  80 def
/R     25 def

/bgColor1 { $BGH $BGS $BGL} def
/circleColor1 { $CH $CS $CL} def

/Left  5 def

/DrawFig{
    translate
    0 0 moveto  0 size lineto  size size lineto  size 0 lineto
    closepath
    HSL2RGB setrgbcolor
    fill
    size 2 div dup R 0 360 arc
    HSL2RGB setrgbcolor
   fill
} def

72 25.4 div dup scale
circleColor1 bgColor1 Left dup DrawFig

%%EndDocument
%%Trailer

_EOL_
);
fclose($fp);
$no++;
if($no%2==0) print '\newline'."\n";
}
}
?>
