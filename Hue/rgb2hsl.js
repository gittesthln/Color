function rgb2hsl(C){
    let max = min = 0, h = 0;
    C.forEach(function(V,i, CC){
        max = CC[max]<V?i:max;
        min = CC[min]>V?i:min;
    });
    if(C[max] > C[min]) {
        c1 = (min+2)%3;
        c2 = (min+1)%3;
        h = Math.round(60*(C[c1]-C[c2])/(C[max]-C[min])+60*((3+min*2)%7)+360,1)%360;
    }
    return [h,C[max]-C[min],Math.round((C[max]+C[min])/2)] ;
}
