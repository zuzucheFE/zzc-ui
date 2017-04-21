Alert组件
===================

调用方式：

```JavaScript

import {Alert} from "zzc-ui";

<button onClick={() => {Alert('','确认删除吗?',[
    { text: '取消', onPress: () => console.log('cancel')},
    { text: '删除', onPress: () => console.log('ok'),style: {'color':'#108ee9','fontWeight':'bold'}},
])}}>Alert</button>

```

Alert组件提供了一个Alert函数，传入的参数是：

1. String -> Alert弹窗的title文案
2. String -> Alert弹窗的content内容
3. Array -> Alert弹窗的按钮数组

Array的数组参数

```JavaScript
{ 
    text: '取消', //按钮文案 - String
    onPress: () => console.log('cancel') //点击的回到事件
}
```

如果按钮的的样式需要自定义，可以通过传入style对象

```JavaScript
{ 
    text: '删除', 
    onPress: () => console.log('ok'),
    style: {'color':'#108ee9','fontWeight':'bold'}
}
```
