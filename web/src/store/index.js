import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
    process.env.NODE_ENV === 'development'
        ? console.tron.createSagaMonitor()
        : null;
const sagaMiddlweare = createSagaMiddleware({ sagaMonitor });

const middlweares = [sagaMiddlweare];

const store = createStore(rootReducer, middlweares);

sagaMiddlweare.run(rootSaga);

export default store;
