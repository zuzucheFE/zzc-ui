/**
 * Created by lamho on 2017/4/11.
 */
export default function (pickupTime, returnTime, currTime) {
    if(pickupTime < currTime && currTime < returnTime){
        return true;
    }else{
        return false;
    }
}