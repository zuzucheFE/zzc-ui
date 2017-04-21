/**
 * Created by lamho on 2017/3/30.
 */
export default function combine(object1, object2) {

    let newDefaultOpt = {};

    function copy(obj,key) {
        let newObj = {};

        if(!object2[key]){
            return object1[key];
        }

        for(let k in obj){
            if(object2[key][k] == null || object2[key][k] == undefined){
                newObj[k] = obj[k];
            }else{
                newObj[k] = object2[key][k];
            }
        }
        return newObj;
    };

    for(var k in object1){
        newDefaultOpt[k] = copy(object1[k],k);
    }
    return newDefaultOpt;

}