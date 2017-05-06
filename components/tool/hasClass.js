/**
 * Created by lamho on 2017/3/30.
 */
export default function (className,targetClassName) {
    const classNameArr = className.split(' ');
    return classNameArr.indexOf(targetClassName) != -1 ? true : false;
}