function setOptions(props, Opt) {
  for( let key in Opt) {
    if(props.hasOwnProperty(key)) props[key] = Opt[key];
  }
}
function setStyle(props, Opt) {
  setOptions(props, Opt);
  return {
    style: JSON.stringify(props).replace(/[{"]/g,"").replace(/[,}]/g,";")};
}
let DOMObject = (()=>{
  let NS ={
    HTML:"http://www.w3.org/1999/xhtml",
    SVG: "http://www.w3.org/2000/svg"
  }
  return class{
    static getElmId(id) {
      return {elm:document.getElementById(id)};
    }
    static getElmsTagName(elm) {
      let elms = document.getElementsByTagName(elm);
      return Array.prototype.map.call(
          elms,(E)=>{r = new DOMObject(); r.elm=E;return r});
    }
    constructor(elm, attribs, parentNode, events, nameSpace="HTML"){
      if(elm){        
        this.elm = document.createElementNS(NS[nameSpace], elm);
        this.setAttribs(attribs);//console.log(parentNode);
        if(parentNode&& parentNode.elm) {
          parentNode.elm.appendChild(this.elm);
        }
        for(let evt in events) {
          this.elm.addEventListener(evt, events[evt], true);
        }
      }
    }
    setAttribs(Opt) {
      let elm = this.elm;
      for(let attrib in Opt) {
        elm.setAttribute(attrib,Opt[attrib]);
      }
    }
  };})();
class divWithText extends DOMObject{
  constructor(text, parentNode, opt) {
    super("div", opt, parentNode);
    this.elm.innerText = text;
  }
}
class NamedTextBox extends divWithText{
  constructor(name, P, size="5", initValue=""){
    super(name, P, {style:"display:inline-block;margin:5px"});
    this.textBox = new DOMObject("input",
         {type:"text", style:"text-align:right",
          size:size, value:initValue},this);
  }
  get value(){
    return this.textBox.elm.value;
  }
}
class Button extends divWithText{
  constructor(name, P, E){
    super("", P);
    this.button = new DOMObject("input", {type:"button", value:name},this, E);
  }
  get value(){
    return this.textBox.elm.value;
  }
}
class SpinBox {
  constructor(Opt, P, Events, callback) {//console.log("called");
    this.callback = callback;
    this.values= {
      max:Number.MAX_VALUE,
      min:-Number.MAX_VALUE,
      skip: 1, bigSkip:5, value:0,
      type:"limited"// "cyclic" 
    },
    this.boundary = {
				display:"block", margin: "0px", border: "0px", padding:"0px"};
    let container = new DOMObject("div", setStyle(this.boundary, Opt), P);
    setOptions(this.values, Opt);
    let div0 = new DOMObject("div",
      {style:"display:inline-block; vertical-align:middle;"},
       container);
    this.textBox = new DOMObject(
      "input", {type:"text", size:"1em", value:this.values.value,
           readonly:"readonly",
           style:"font-size:15px; text-align:right; disable" }, div0);
    let div = new DOMObject("div",
          {style:"display:inline-block;vertical-align:middle"}, container);
    let buttonStyle = {
      style: "font-size:8px;margin:0px;"+
             "cursor:default;"+
             "background:lightgray;border-color:black;"
    }
    buttonStyle.type = "up";
    this.buttonUP = new DOMObject(
				"div", buttonStyle, div, {click:(E)=>{this.up = E.shiftKey;}});
    this.buttonUP.elm.innerText ="▲";
    buttonStyle.type = "down";
    this.buttonDOWN = new DOMObject(
				"div", buttonStyle, div, {click:(E)=>{this.down = E.shiftKey;}});
    this.buttonDOWN.elm.innerText ="▼";
  }
  get value() {
    return this.values.value;
  }
  set value(val) {
    this.textBox.elm.value = this.values.value = val;
  }
  set up(shift){
      let skip = shift?this.values.bigSkip:this.values.skip;
      let tmpValue = this.values.value+skip;
      if(this.values.type=="limited"){
          this.value = Math.min(tmpValue, this.values.max);
      } else {
          this.value = (tmpValue>this.values.max)?this.values.min:tmpValue;
      }
      if(this.callback) this.callback();
  }
  set down(shift){
    let skip = shift?this.values.bigSkip:this.values.skip;
    let tmpValue = this.value-skip;
    if(this.values.type=="limited"){
        this.value = Math.max(tmpValue, this.values.min);
    } else {
        this.value = (tmpValue<this.values.min)?this.values.max:tmpValue;
    }
    if(this.callback) this.callback()
  }
}
class SetColor {
  constructor(title, type, P, callback, opt) {
//    let that = this;
    this.callback = callback;
    if(title) {
      new divWithText(title, P,
        {style:"display:inline-block;width:100px;text-align:center"});
    }
    if(type.match(/^rgb$/i)) {
      this.type = "rgb";
      this.elm = new DOMObject("div",opt, P,
					{click:(E)=>{
          if(this.checkBox.elm.checked){
            this.RGB.forEach((C)=>
              {C[E.target.getAttribute("type")] = E.shiftKey;});
            E.stopPropagation();
            if(this.callback) this.callback(E);
          }
        }
      }).elm;
      this.RGB = Array(3).fill(0).map(()=>{
        return new SpinBox({
          type:"limited",
          display:"inline-block", margin:"5px",
          value:128, max:255, min:0
          },
          this, {}, this.callback);
      });
      this.checkBox = new DOMObject("input",
          {type:"checkbox", style:"display:inline-block"},this);
      new divWithText("同時", this, {style:"display:inline-block;"});
    } else {
      this.type = "hsl";
      this.elm = new DOMObject("div",opt, P).elm;
      this.HSL = [[360,0],[100,50],[100,50]].map((V)=>{
        return new SpinBox({
          type:"limited",
          display:"inline-block", margin:"5px",
          value:V[1], max:V[0], min:0
          },
          this, {}, this.callback);
      });
      this.HSL[0].values.type="cyclic";
    }
  }
  get rgb()    {return this.RGB.map((V)=>{return V.value});}
  set rgb(vals){vals.forEach((V, i)=>{this.RGB[i].value = V;});}
  get hsl()    {return this.HSL.map((V)=>{return V.value});}
  set hsl(vals){vals.forEach((V, i)=>{this.HSL[i].value = V;});}
  toString(){
    return (this.type == "rgb") ?
      `rgb(${this.rgb.join(",")})`:
      `hsl(${this.hsl[0]},${this.hsl[1]}%,${this.hsl[2]}%)`;
  }
}
