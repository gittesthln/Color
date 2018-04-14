<?php
$BGH = 0;
$BGS = 0;
$BGL = 0;
$CH =  0;
$CS =  0;
//$CL = 50;
$Gray = [
[   0,  0, 100],  //          0
[   5,  13,   94.7],  //OK 95 1
[   5,  14,   93],  //2
[   5,  15,   92],  //3
[   5,  16,   91],  //4
[   5,  15,   90],  //5
[   5,  17,   89],  //OK 90   6
[   0,  16.5, 88],  //7
[   0,  16,   87],  //8
[   0,  15.5, 86],  //9
[   0,  15,   85],  //10
[   0,  14.5, 84],  //11
[   0,  14,   83],  //12
[   0,  14,   83],  //OK 85   13
[   5,  13,   82],  //14
[   5,  13,   81],  //15
[   5,  13,   80],  //16
[   5,  13,   79],  //17
[   5,  13,   78],  //18
[   5,  13,   77],  //19
[   5,  13,   76],  //OK 80   20
[   0,  15,   75],  //21
[   0,  15,   74],  //22
[   0,  15,   73],  //23
[   0,  15,   72],  //24
[   0,  15,   71],  //25
[   0,  15,   70],  //OK 75   26
[  -1,  15,   69],  //27
[  -2,  15,   68],  //28
[  -3,  15,   67],  //29
[  -4,  15,   66],  //30
[  -5,  15,   65],  //31
[  -5,  15,   64],  //OK 70*  32
[  -5,  15,   63],  //33
[  -5,  15,   62],  //34
[  -5,  15,   61],  //35
[  -5,  15,   60],  //36
[  -5,  15,   59],  //37
[  -5,  15,   58],  //OK 65   38
[  -4,  14,   58],  //39
[  -3, 13.5,  57],  //40
[  -2,  13,   56],  //41
[  -1, 12.5,  55],  //42
[   0,  12,   54],   //43
[   0,  12,   53],  //   60** 44
[  -1,  12,   52],  //45
[  -2,11.5,   51],  //46
[  -3,  11,   50],  //47
[  -4,10.5,   49],  //48
[-4.5,  10,   48],  //49
[  -5,  10,   47],  //   55   50
[  -5, 9.5,   46],  //51
[  -5,   9,   45],  //52
[  -5, 8.5,   44],  //53
[  -5,   8,   43],  //54
[  -5,   8,   42],  //   50* 55
[  -5, 8.5,   41],  //56
[  -5,   9,   40],  //57
[  -5, 9.5,   39],  //58
[  -5,  10,   38],  //   45  59
[  -4, 9.5,   37.5],  //60
[  -3,   9,   36.5],  //61
[  -2, 8.5,   35.5],  //62
[  -1,   8,   34.5],  //63
[   0,   8,   33.5],  //OK 40 64
[   0,   8,   32.5],  //65
[   0,   8,   31.5],  //66
[   0,   8,   30.5],  //67
[   0,   8,   29.5],  //68
[   0,   8,   28.5], //   35 69
[  -1, 7.5,   27,5],  //70
[  -2,   7,   26.5],  //71
[  -3, 6.5,   25.5],  //72
[  -4,   6,   25],    //73
[  -5,   6,   24],  //OK  30 74
[  -5,   6,   23],  //75
[  -5,   6,   22],  //76
[  -5,   6,   21],  //77
[ -5,   6,   20],  //OK  25 78
[  -5, 6.5,   19],
[  -5,   7,   18],
[  -5, 7.5,   17],
[  -5,   8,   16],
[  -5,   8,   15],
[  -5,   8,   14.5],  //  20 16
//[  -5,   6,    9],    //  15 17
//[  -5,   8,    3],    //  10 18
//[   0,   0,    0]     //     19
];
$no = 0;

$BGList = [20,64]; 
for($i=0; $i<count($BGList);$i++) {
list($BGH, $BGC, $BGL) = $Gray[$BGList[$i]];
for($j = 0; $j <count($Gray); $j++) {
if($BGList[$i]==$j) continue;
list($CH, $CS, $CL) = $Gray[$j];
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
