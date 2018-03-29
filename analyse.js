function analyze(Text) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(Text, "text/html");
    let hsl = doc.getElementsByClassName("hslexample");
    console.log(
        Array.prototype.map.call(hsl, function(HSL){
            let color = HSL.children[0].children;//console.log(color);
            return Array.prototype.map.call(color,
                 function(C,i){return (i<=1)? 
                    `\\multicolumn\{6\}\{|c|\}\{${C.children[1].innerText.trim()}\}`:
                    Array.prototype.map.call(C.children, 
                       function(C){return C.style.background||C.innerText.trim().replace("%","\\%");}).
                    join("&")}).
            join("\\\\\\hline");})
    );//Lightness
}
