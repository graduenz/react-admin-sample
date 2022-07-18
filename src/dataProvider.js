import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

export default (apiUrl) => {
    const httpClient = (url, options) => {
        options = {
            ...options,
            headers: new Headers({ Accept: 'application/json' }),
        };
        // TODO: Pegar o token de onde ele realmente fica salvo
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1aWxoZXJtZS5yYWR1ZW56LmJyQGF2ZW51ZWNvZGUuY29tIiwidW5pcXVlX25hbWUiOiJHdWlsaGVybWUgUmFkdWVueiIsIndlYnNpdGUiOiJBZG1pbkFwcGxpY2F0aW9uIiwidWlkIjoiYzkxMTkyY2UtMTg3YS00OGVlLWJhNzktZmRhZGVkMjM5ODQ0Iiwicm9sZSI6IkpTTUFkbWluIiwiY25wanMiOiIxMDk2OTA0MDAwMTk3IiwibmJmIjoxNjU1MzE0MzI3LCJleHAiOjE2NTU5MTkxMjcsImlhdCI6MTY1NTMxNDMyNywiaXNzIjoidGZwOi8vaWRlbnRpdHkuanNtL2F1dGhvcml0eSIsImF1ZCI6ImJjMDUxZGUzLWFlYWEtNGFjOS04ZmJmLTA1YTg2ZTA4M2ZjZiJ9.h9VCOQUq41jHXybmNPACCq7u4f1L2qdW8ONpAVwCxrk';
        if (token) {
            options.headers.set('Authorization', `Bearer ${token}`);
        }

        return fetchUtils.fetchJson(url, options);
    };

    return {
        getList: async (resource, params) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                pageIndex: page,
                pageSize: perPage,
                sort: field,
                order: order,
            };
            Object.entries(params.filter).forEach(entry => {
                query[`filter.${entry[0]}`] = entry[1];
            });
            const url = `${apiUrl}/${resource}?${stringify(query)}`;

            const response = await httpClient(url);
            return {
                data: response.json,
                total: parseInt(response.headers.get('content-range').split('/').pop(), 10),
            };
        },

        getOne: async (resource, params) => {
            const response = await httpClient(`${apiUrl}/${resource}/${params.id}`);
            return {
                data: response.json,
            };
        },

        getMany: async (resource, params) => {
            const query = {
                "filter.ids": params.ids,
            };
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            
            const response = await httpClient(url);
            return {
                data: response.json,
            };
        },

        getManyReference: async (resource, params) => {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                pageIndex: page,
                pageSize: perPage,
                sort: field,
                order: order,
            };
            Object.entries(params.filter).forEach(entry => {
                query[`filter.${entry[0]}`] = entry[1];
            });
            query[`filter.${params.target}`] = params.id;

            const url = `${apiUrl}/${resource}?${stringify(query)}`;

            const response = await httpClient(url);
            return {
                data: response.json,
                total: parseInt(response.headers.get('content-range').split('/').pop(), 10),
            };
        },

        update: async (resource, params) => {
            const response = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            });
            return {
                data: response.json,
            };
        },

        updateMany: async (resource, params) => {
            const query = {
                ids: params.ids,
            };
            const response = await httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            });
            return {
                data: response.json,
            };
        },

        create: async (resource, params) => {
            const response = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
            });
            return {
                data: response.json,
            };
        },

        delete: async (resource, params) => {
            const response = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'DELETE',
            });
            return {
                data: response.json,
            };
        },

        deleteMany: async (resource, params) => {
            const query = {
                ids: params.ids,
            };
            const response = await httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
                method: 'DELETE',
            });
            return {
                data: response.json,
            };
        },
    };
};