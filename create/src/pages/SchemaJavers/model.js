import { message } from 'antd';
import { getSchema, updateSchema, getSchemaCommits, getSchemaWithCommitId } from './service.js'
export default {
    namespace: 'schemaEdit',
    state: {},
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                schema: payload,
            }
        },
        updateCommits(state, { payload }) {
            return {
                ...state,
                commits: payload,
            }
        },
    },
    effects: {
        *getSchema({ payload }, { call, put }) {
            const response = yield call(getSchema, payload.id)
            if (callback) callback(response)
            yield put({
                type: 'updateState',
                payload: response
            })
        },
        *updateSchema({ payload }, { call, put }) {
            yield call(updateSchema, payload)
            const response = yield call(getSchema, payload.id)
            yield put({
                type: 'updateState',
                payload: response
            })
            const commits = yield call(getSchemaCommits, payload.id)
            yield put({
                type: 'updateCommits',
                payload: commits
            })
            message.success('保存成功')
        },
        *getSchemaCommit({ payload }, { call, put }) {
            const response = yield call(getSchemaWithCommitId, payload)
            yield put({
                type: 'updateState',
                payload: response
            })
        },
        *getSchemaCommits({ payload }, {call, put}) {
            const response = yield call(getTemplateCommits, payload.id)
            yield put({
                type: 'updateCommits',
                payload: response
            })
        },
        *rollbackSchema({ payload, callback }, { put }) {
            yield put({
                type: 'updateState',
                payload
            })
            if (callback) callback(payload)
        }
    }
}