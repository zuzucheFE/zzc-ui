/**
 * Created by lamho on 2017/4/17.
 */
export default function (time) {
    let currTime = new Date(time),
        opt = {};

    opt.year = currTime.getFullYear();
    opt.month = currTime.getMonth() + 1;
    opt.day = currTime.getDate();
    opt.hours = currTime.getHours() < 10 ? `0${currTime.getHours()}` : currTime.getHours();
    opt.minutes = currTime.getMinutes() < 10 ? `0${currTime.getMinutes()}` : currTime.getMinutes();
    opt.time = currTime;

    return opt;
}