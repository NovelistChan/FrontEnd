import request from '@/utils/request'
export async function createSchema(params) {
    //console.log("params: ", params)
    return request(`/api/schemas/new`, {
        method: 'POST',
    //    data: JSON.parse(params)
        data: JSON.parse(params)
    })
}

export async function getSchemas() {
    return request(`/api/schemas`, {
        method: 'GET'
    })
}

export async function deleteSchema(id) {
    return request(`/api/schemas/${id}`, {
        method: 'DELETE',
    })
}