TextToast组件
===================

调用方式：

```JavaScript

import {TextToast} from "zzc-ui";

TextToast.show({
    content : '12312313132123132',
    duration : 2000,
    callBack : () => {
        console.log(123);
    },
    zIndex : 9999,
    targetParent : document.querySelector('.zzc-popup')
});
```

TextToast提供了一个方法就是show，通过执行show传入指定参数进行初始化Toast框和显示。

参数说明：
1. content  -> 显示的内容
2. duration -> 停留的事件（默认为3000）
3. callBack -> 弹出关闭后的回调事件
4. zIndex -> css的z-index属性，默认999
5. 执行append到哪一个父级元素当中，默认是body



