# drop-sort
To help you sort the component.

# Features
- Ordering component

#Usage
```js
import React, { useState } from 'react';
import DropSort from 'wd-drop-sort/lib';
import CusItem from '你自己定义的子组件';

const App = () => {
    const [data, setData] = useState([{id: 1, name: 2}, {id: 11, name: 22}]);

    return (
        <DropSort
            data={data}
            Item={CusItem} {/* 可以接收到每一项数据内容以及index */}
            dataChange={(newData) => setData(newData)}
        />
    )
};
```
