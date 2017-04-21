Tabs组件
===================

调用方式：

```JavaScript

import {Tabs} from "zzc-ui";

<div>
    <Tabs
        defaultIndex={this.props.tabIndex}
        defaultColor='blue'
        onChange={( index ) => {
        this.setState( {
            tabIndex: index
        } );
    }}>
        <span name="tab1"></span>
        <span name="tab2"></span>
    </Tabs>

    <div>
        {
            this.state.tabIndex == 0 ?
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci amet blanditiis consequatur dolorum earum est eveniet expedita fuga fugit id ipsam iusto molestias nemo, omnis provident quo quos veritatis voluptate?</p>
                :
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolorem eligendi facere, in magnam nemo obcaecati recusandae sed ullam? Commodi dolore enim facilis, molestias nobis placeat quod reiciendis ut voluptatum!</p>
                    }
    </div>
</div>
```

Tabs需要传入的参数：
1. defaultIndex -> 默认的选中的tab的下标
2. defaultColor -> 选中的字体颜色（#000、blue）
3. onChange -> 更改tabs选中的事件函数，会返回当前选中的tabs的下标



