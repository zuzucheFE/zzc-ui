/**
 * Created by lamho on 2017/4/25.
 */
export function startArrayToDate(time) {
    return time ? new Date(time[0], time[1] - 1, time[2]) : new Date();
}

export function endArrayToDate(time, startTime) {
    return time ? new Date(time[0], time[1] - 1, time[2]) : new Date(new Date(startTime).setFullYear(new Date(startTime).getFullYear() + 1));
}