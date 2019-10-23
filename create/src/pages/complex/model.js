import { message } from 'antd';
import { getSchema, updateSchema, getSchemaCommits, getSchemaWithCommitId } from './service.js';
export default {
  namespace: 'schema-form-page',
  state: {},
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        schema: payload,
      };
    },
    updateCommits(state, { payload }) {
      return {
        ...state,
        commits: payload,
      };
    },
  },
  effects: {
    *getSchema({ payload, callback }, { call, put }) {
      const response = yield call(getSchema, payload);
      yield put({
        type: 'updateState',
        payload: response,
      });
      callback(JSON.stringify(response.schemaContent.schema));
      // callback(JSON.stringify(response))
    },
    *updateSchema({ id, payload }, { call, put }) {
      const schema = JSON.parse(payload);
      const params = { schema };
      const response = yield call(updateSchema, id, params);
      // const response = yield call(getSchema, id)
      debugger;
      yield put({
        type: 'updateState',
        payload: response,
      });
      const commits = yield call(getSchemaCommits, id);
      yield put({
        type: 'updateCommits',
        payload: commits,
      });
      message.success('保存成功');
    },
    *getSchemaCommit({ payload }, { call, put }) {
      const response = yield call(getSchemaWithCommitId, payload);
      yield put({
        type: 'updateState',
        payload: response,
      });
    },
    *getSchemaCommits({ payload }, { call, put }) {
      const response = yield call(getTemplateCommits, payload);
      yield put({
        type: 'updateCommits',
        payload: response,
      });
    },
    *rollbackSchema({ payload, callback }, { put }) {
      yield put({
        type: 'updateState',
        payload,
      });
      if (callback) callback(payload);
    },
  },
};
