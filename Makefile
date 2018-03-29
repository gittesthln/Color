LATEX = platex
DVIPS = dvips -Ppdf
DVIPDF = dvipdfmx
O	=	64
GS = gswin$(O)c -dNOPAUSE -dBATCH -sDEVICE=pdfwrite 
SLOPTION = -dDEVICEWIDTHPOINTS=363 -dDEVICEHEIGHTPOINTS=273
HOOPTION8 = -dDEVICEWIDTHPOINTS=273 -dDEVICEHEIGHTPOINTS=363
HOOPTION4 = -dDEVICEWIDTHPOINTS=363 -dDEVICEHEIGHTPOINTS=273
SRC	=  $(T).tex
SRCSL = $(T).tex
SRCHO = $(THO).tex $(SRC)
$(T).pdf: $(T).dvi
	$(DVIPS) -z -f $(T).dvi | bkmk2uni > $(T).ps
	$(GS) -sOutputFile=$(T).pdf $(T).ps
#	$(GS) $(SLOPTION) -sOutputFile=$(T).pdf $(T).ps
$(T).dvi: $(SRCSL)
	$(LATEX) $(T)
	$(LATEX) $(T)
M = 00dev
all:
	make T=$(M) -B
#	nkf -Sw $(M).aux |	grep newlabel > $(M)-tmp.aux
	make T=$(M)Probs -B
