TextToast组件
===================

调用方式：

```JavaScript

import {TextToast} from "zzc-ui";

TextToast.info('订单确认之前无法打印提车单<br>请耐心等待订单确认');
```

TextToast提供的是一个info函数，通过该函数输出指定内容和指定停留秒数。

默认是停留3秒，如果需要指定停留秒数，可通过第二个参数传入毫秒数进行指定。



