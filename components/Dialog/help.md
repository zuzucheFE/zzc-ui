Loading组件
===================

调用方式：

```JavaScript

import {Dialog} from "zzc-ui";

let defaultTitleBtn = {
    left: {
        name: <i className="iconfont-goback"></i>,
        isShow: true,
        style: {
            color:'red'
        }
    },
    right: {
        isShow: false
    }
}

<Dialog
    title='hello world'
    close={() => {
        console.log('取消');
    }}
    confirm={() => {
        console.log('确定');
    }}
    defaultTitleBtn={defaultTitleBtn}
>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
</Dialog>
```

Dialog提供多个属性供自定义：
1.  title -> title的文案
2.  close -> 点击左边按钮的事件
3.  confirm -> 点击右边按钮的事件

需要说明的是defaultTitleBtn这个属性：
这个属性需要传入的是一个对象，对象里面分别有两个键值，
1. left
2. right

两个键值也是一个对象，对象里面的属性是一样的，分别为：
1. name -> 按钮文案，可以是一个jsx对象
2. isShow -> 控制按钮是否出现
3. style -> 控制按钮样式的属性，是一个对象。例如color:'red'


另外还有一个事件，afterConfirm
该事件是点击确认，执行confirm函数的时候先执行的，需要return一个布尔值，如果布尔值为true则会执行confirm，如果布尔值返回的是false，则会跳过这次confirm。




