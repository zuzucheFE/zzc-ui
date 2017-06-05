ImageViewer组件
===================

调用方式：

```JavaScript

import {ImageViewer} from "zzc-ui";

    constructor( props ) {
        super( props );
        this.state = {
            photoList: [
                { url: '../img/liuzichen01.jpeg' },
                { url: '../img/liuzichen02.jpeg' }
            ]
        };
    }

    openImageView( index ) {
        ImageViewer( {
            photos: this.state.photoList,
            showIndex: index + 1
        } );
    }

    render() {
        return (
            <div>
                <div className="img-box">
                    {
                        this.state.photoList.map(( item, k ) => {
                            return (
                                <p onClick={() => {
                                    this.openImageView( k );
                                }} key={`phote${k}`}><img src={item.url} /></p>
                            );
                        } )
                    }
                </div>
                <br />
                <button onClick={this.openImageView.bind( this )}>点击我（默认3秒）</button>
                <br />
            </div>
        )
    }
```

ImageViewer提供两个属性：
1. photos -> 用于显示图片的数组，数据每一个item为一个对象，对象中必须有url属性（为图片路径） Array
2. showIndex -> 用于显示photos中哪一个下标的item
