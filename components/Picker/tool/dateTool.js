/**
 * Created by lamho on 2017/5/3.
 */

function resetMinutes(minutes) {
    return minutes < 30 ? '00' : '30';
}

export function setTime(time,defaultTime) {
    if(!!time && time !== ''){
        return {
            h: new Date(time).getHours(),
            m: resetMinutes(new Date(time).getMinutes())
        };
    }else{
        //默认为10点
        return !!defaultTime ? defaultTime : {
                h: '10',
                m: '00'
            };
    }
}

export function setDay(day) {
    if(!!day && day !== ''){
        return new Date(day);
    }else{
        return null;
    }
}

export function setDayCount(pickupDay,returnDay) {
    let returnTime = returnDay.getTime(),
        pickupTime = pickupDay.getTime(),
        diff = returnTime - pickupTime;
    // 当diff少于1，同一天取还，都当1处理
    if (diff < 1) {
        return 1;
    }
    return Math.ceil(diff/1000/60/60/24);
}