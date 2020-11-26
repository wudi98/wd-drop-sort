import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import DropSort from './components/index';

const App = () => {
    const [data, setData] = useState([{id: 1, name: 2}, {id: 11, name: 22}]);
    return (
        <DropSort
            data={data}
            dataChange={(newData) => setData(newData)}
        />
    )
};

if (module.hot) { module.hot.accept() }

ReactDOM.render(<App />, document.getElementById('root'));
