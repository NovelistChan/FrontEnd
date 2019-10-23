import request from '@/utils/request'
import { createSchema, deleteSchema, getSchemas } from './service.js'
export default {
    namespace: 'schemaList',
    state: [],
    reducers: {
        updateList(_, { payload }) {
            return payload
        }
    },
    effects: {
        *getSchemaList(_, { call, put }) {
            const response = yield call(getSchemas)
            console.log("here")
            console.log(response)
            yield put({
                type: 'updateList',
                payload: response
            })
        },
        *deleteSchema({ id }, { call, put }) {
            yield call(deleteSchema, id)
            const response = yield call(getSchemas)
            yield put({
                type: 'updateList',
                payload: response
            })
        },
        *createSchema({payload}, { call, put }) {
            yield call(createSchema, payload)
            const response = yield call(getSchemas)
            yield put({ type: 'updateList', payload: response })
        }
    }
}
