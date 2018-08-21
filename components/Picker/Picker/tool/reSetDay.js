/**
 * Created by lamho on 2017/4/11.
 */
export default function (time) {
    let newTime = new Date(time);
    newTime.setHours(0);
    newTime.setMinutes(0);
    newTime.setSeconds(0);
    newTime.setMilliseconds(0);

    return newTime;
}