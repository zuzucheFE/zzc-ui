Modal组件
===================

调用方式：

```JavaScript

import {Modal} from "zzc-ui";

<Modal 
    visible={this.state.visible}
    onCancel={() => this.hideModal()}
    content={this.state.modalContent}
/>
```

Modal提供两个属性：
1. visible -> 用于控制Modal是否出现  bool
2. onCancel -> 点击关闭后的回调函数   func
3. content -> 为弹框的内容（jsx语法编写）

content属性的例子：


```JavaScript

<div className="modal-box">
    <h1 className="title">title</h1>
    <div className="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam consequatur dignissimos eligendi labore nulla provident quod similique sint ut! Architecto aut dignissimos nihil nostrum officia quae, quisquam saepe tenetur.</p>
    </div>
</div>
```

通过className控制样式。
