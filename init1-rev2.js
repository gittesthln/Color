function setValues(Val1, Val2, N) {
		console.log(Val1);
		console.log(Val2);
  let res = [];
  let Diff = Array(3).fill(0).map(
      (dummy,j)=>{return (Val2[j]-Val1[j])/(N-1)
  });
  Array(N).fill(0).map((dummy, j)=>{
      res.push(Diff.map((V,k)=>{return Math.floor(V*j+Val1[k])}));});
    return res;
}
window.onload = function(){
  let Params = {
      Size:200,
      R:60,
      No:5, 
      Left:[[0,0,0], [0,100,50],[0,100,20]],
      Right:[[0,0,50], [0,100,50], [0,100,20]]};
  let places = [DOMObject.getElmId("placeLeft"),
                DOMObject.getElmId("placeRight"),
                DOMObject.getElmId("placeButton")];
  let type = "hsl";
  let Names = ["Left", "Right"];
  let SS = new NamedTextBox("図形の大きさ", places[2], 2, Params.Size);
  let RR = new NamedTextBox("円の大きさ", places[2], 2, Params.R);
  let No = new NamedTextBox("個数", places[2], 2, Params.No);
  let Go = new Button("設定", places[2], {click:function(){showFigs(1);}});
  let Save = new Button("保存", places[2], {click:function(){
    for(let i=0;i<2;i++) {
      let res = colors[i].reduce((x,y)=>{ return `${x} ${y.hsl.join(" ")}`;},"[")+"]";
      console.log(res);
    }
    console.log("saved");
  }});
  let colors;
  let P = DOMObject.getElmId("Canvas");
  let SVG, rects=[], circles=[[],[]];
  showFigs(0);//initilize
  function showFigs(mode=true) {//console.log("called");
    let Size = SS.value-0, R = RR.value-0, Margin = 20, N = No.value-0;
    if(mode ==0) {
      colors = ["(左部)","(右部)"].map(function(T, i){
        let divT = new divWithText(T, places[i]);
        let div = new DOMObject("div",{},divT);
        let res = [new SetColor("背景色", "hsl", div, function(){showFigs(2);})];
        res[0].hsl = Params[Names[i]][0];
        let Values = setValues(
          Params[Names[i]][1],Params[Names[i]][2],Params.No);
        for(j=0;j<Params.No;j++) {
          res.push(new SetColor(`中央の色(${j})`, "hsl",
          div, function(){showFigs(2);}));
						res[res.length-1].hsl = Values[j];
        }
        return res;
      });
      P.elm.removeChild(P.elm.firstChild);
      SVG = new DOMObject(
          "svg",{width:(Size+Margin)*2, height:Size*N+Margin*2, id:"SVG"},
                P, {}, "SVG");
          for(let i=0;i<2;i++) {
            let xOffset = Margin + Size*i;
            rects[i] = new DOMObject("rect",
                    {x:xOffset, y:Margin, width:Size, height:Size*N,
                     fill:`${colors[i][0]}`
                    }, SVG, {}, "SVG");
            let cx = xOffset + Size/2;
            for(let j=0, cy = Margin + Size/2; j<N; j++, cy+=Size) {
              circles[i][j] = new DOMObject("circle",
                {cx:cx, cy:cy, r:R, fill:`${colors[i][j+1]}`}, SVG, {}, "SVG");
            }
          }
    }
    if(mode==1) {//button pushed
      console.log(N);
			let ncolors = ["(左部)","(右部)"].map(function(T, i){
			  places[i].elm.removeChild(places[i].elm.firstChild);
        let divT = new divWithText(T, places[i]);
        let div = new DOMObject("div",{},divT);
        let res = [new SetColor("背景色", "hsl", div, function(){showFigs(2);})];
        res[0].hsl = colors[i][0].hsl;
					let Values = setValues(colors[i][1].hsl,colors[i][colors[i].length-1].hsl, N);
					console.log(Values);
        for(j=0;j<N;j++) {
          res.push(new SetColor(`中央の色(${j})`, "hsl", div, function(){showFigs(2);}));
          res[j+1].hsl = Values[j];                 
        }
        return res;
      });
      P.elm.removeChild(P.elm.firstChild);
      SVG = new DOMObject(
          "svg",{width:(Size+Margin)*2, height:Size*N+Margin*2, id:"SVG"},
                P, {}, "SVG");
          for(let i=0;i<2;i++) {
            let xOffset = Margin + Size*i;
            rects[i] = new DOMObject("rect",
                    {x:xOffset, y:Margin, width:Size, height:Size*N,
                     fill:`${colors[i][0]}`
                    }, SVG, {}, "SVG");
            let cx = xOffset + Size/2;
            for(let j=0, cy = Margin + Size/2; j<N; j++, cy+=Size) {
              circles[i][j] = new DOMObject("circle",
                {cx:cx, cy:cy, r:R, fill:`${colors[i][j+1]}`}, SVG, {}, "SVG");
            }
          }
				colors = ncolors;
    }
    if(mode == 2){//color box value changed
        rects.forEach((rect,i)=>{
            rect.setAttribs({fill:`${colors[i][0]}`})});
        for(let i=0;i<2;i++) {
            for(let j=0; j<N; j++) {
                circles[i][j].setAttribs({fill:`${colors[i][j+1]}`});
            }
        }
    }
    }
}
