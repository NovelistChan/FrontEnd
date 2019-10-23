import request from '@/utils/request';

export async function getSchema(id) {
  return request.get(`/api/schemas/${id}`);
}

export async function updateSchema(id, params) {
  console.log(params);
  return request(`/api/schemas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
}

export async function getSchemaCommits(id) {
  return request(`/api/schemas/${id}/commits`, {
    method: 'GET',
  });
}

export async function getSchemaWithCommitId(params) {
  return request(`/api/schemas/${id}/commits?=${params.commitId}`, {
    method: 'GET',
  });
}
