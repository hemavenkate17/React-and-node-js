import {takeEvery} from 'redux-saga/effects'
import { loginHandler } from './handlers'


export function* rootSaga(){
    yield takeEvery("LOGIN_ACTION",loginHandler)
}