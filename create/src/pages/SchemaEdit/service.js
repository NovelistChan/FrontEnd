import request from '@/utils/request'

export async function getSchema(id) {
    return request.get(`/api/schemas/${id}`)
}

export async function updateSchema(params) {
    return request(`/api/schemas/${params.id}`, {
        method: 'PUT',
        data: params
    })
}

export async function getSchemaCommits(id) {
    return request(`/api/schemas/${id}/commits`, {
        method: 'GET'
    })
}

export async function getSchemaWithCommitId(params) {
    return request(`/api/schemas/${id}/commits?=${params.commitId}`, {
        method: 'GET'
    })
}