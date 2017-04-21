Card组件
===================

调用方式：

```JavaScript

import {Card} from "zzc-ui";

<Card>
    <Card.Header 
        title='title' 
        extra={<span>（租租车提供）</span>}
    >
    </Card.Header>
    <Card.Body>
        <div className="card-content-box">
            <div className="text">content</div>
        </div>
    </Card.Body>
</Card>

```

Card组件是一个实例化组件，里面有两个私有组件
1. Card.Header  ->  Card的头部（可以不传）
2. Card.Body -> Card的内容


### Card.Head ######

有两个参数：
1. title -> 头部的文案
2. extra -> 头部的副文案

### Card.Body ######

需要直接传入html标签进去，用jsx语法。
需要定义样式的话，通过传入去的html标签给予相应的className控制样式。详情看demo

### 没有边距的Card ###

通过在Card组件中传入 full。

```JavaScript

import {Card} from "zzc-ui";

<Card full>
    <Card.Header 
        title='title' 
        extra={<span>（租租车提供）</span>}
    >
    </Card.Header>
    <Card.Body>
        <div className="card-content-box">
            <div className="text">content</div>
        </div>
    </Card.Body>
</Card>

```
