Switch组件
===================

调用方式：

```JavaScript

import {Switch} from "zzc-ui";

<Switch
    defaultStyle={true}
    onClick={this.click.bind( this )}
/>

<Switch
    defaultStyle={false}
    onClick={this.click.bind( this )}
    disabled
/>
```

提供两个属性
1. defaultStyle -> 默认状态，布尔值true / false
2. onClick -> 点击事件，当点击的时候，会返回当前是否打开的布尔值，true/false
3. disabled -> 如果写上disabled属性，会禁止点击并且会有禁止样式