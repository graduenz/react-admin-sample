// in src/App.js
import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { MakeList, MakeEdit, MakeCreate } from './makes';
import { ModelList, ModelEdit, ModelCreate } from './models';

import dataProvider from './dataProvider.js';

const App = () => (
    <div>
        <Admin dataProvider={dataProvider('http://localhost:5084')}>
            <Resource name="makes" list={MakeList} edit={MakeEdit} create={MakeCreate} />
            <Resource name="models" list={ModelList} edit={ModelEdit} create={ModelCreate} />
        </Admin>
    </div>
);

export default App;