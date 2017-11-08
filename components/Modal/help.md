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
4. btn -> 为modal自定按钮（Array）


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

自定义按钮的调用方式实例
```JavaScript

<Modal ref="modal2"
    visible={this.state.visible2}
    onCancel={() => this.hideModal2()}
    content={this.state.modalContent}
    btn={
        [
            {
                btnText: '关闭',
                click: () => { },
                style: {}
            },
            {
                btnText: '立即使用',
                click: () =>console.log(1231},
                style: {
                    color:'#333'
                }
            }
        ]
    }
/>

```
