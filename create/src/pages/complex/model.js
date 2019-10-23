import { message } from 'antd';
import { getSchema, updateSchema, getSchemaCommits, getSchemaWithCommitId } from './service.js'
export default {
    namespace: 'schema-form-page',
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
        *getSchema({ payload, callback }, { call, put }) {
            const response = yield call(getSchema, payload)
            yield put({
                type: 'updateState',
                payload: response,
            })
            debugger
            callback(response)
            // callback(JSON.stringify(response))
        },
        *updateSchema({ payload }, { call, put }) {
            const params = JSON.parse(payload)
            yield call(updateSchema, params)
            const response = yield call(getSchema, params.id)
            yield put({
                type: 'updateState',
                payload: response
            })
            const commits = yield call(getSchemaCommits, params.id)
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
            const response = yield call(getTemplateCommits, payload)
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