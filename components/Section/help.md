Section组件
===================

调用方式：

```JavaScript

import {Section} from "zzc-ui";

<Section>
    <Section.Header 
        title='title' 
        extra='副标题' 
        className="abc"
        onClick={() => {
            alert('123')
        }}/>
        <Section.Body className="abc">
            <p>text</p>
        </Section.Body>
</Section>
```

Section组件是一个实例化组件，里面有两个私有组件
1. Section.Header  ->  Section的头部（可以不传）
2. Section.Body -> Section的内容


### Section.Head ######

有两个参数：
1. title -> 头部的文案
2. extra -> 头部的副文案
3. onClick -> 头部的点击事件
4. className -> 给head和body一个className，方便更改样式

### Section.Body ######

需要直接传入html标签进去，用jsx语法。
需要定义样式的话，通过传入去的html标签给予相应的className控制样式。详情看demo
