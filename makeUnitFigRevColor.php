<?php
$BGH = 0;
$BGS = 0;
$BGL = 0;
$CH =  0;
$CS =  0;
$no = 0;
$BGLs = [00,80];
$CHs = [0,60, 120, 180, 240, 300];
$CSs = [100];
for($k=0;$k<count($CHs);$k++){
for($kk=0;$kk<count($CSs);$kk++){
for($i=0; $i<count($BGLs);$i++) {
  $BGH = $BGC = 0;
  $BGL = $BGLs[$i];
  for($j = 50; $j <=60; $j+=2) {
//    if($i==$j) continue;
    $CH = $CHs[$k];
		$CS = $CSs[$kk];
  	$CL= $j;
    $filename = "fig-$BGL-$CH-$CS-$CL.eps";
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
}
}
?>
