import {apiClient} from './client';

export interface DepartmentFullResponseDto {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    deleted: boolean;
    deletedAt: string | null;
    deletedBy: string | null;
}

export interface SpringPage<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export const departmentApi = {
    // Получить список с пагинацией
    findAll: async (page = 0, size = 10) => {
        const res = await apiClient.get<SpringPage<DepartmentFullResponseDto>>('/api/departments', {
            params: {page, size}
        });
        return res.data;
    },

    // Создать
    create: async (name: string) => {
        const res = await apiClient.post<DepartmentFullResponseDto>('/api/departments', {name});
        return res.data;
    },

    // Обновить
    update: async (id: number, name: string) => {
        const res = await apiClient.patch<DepartmentFullResponseDto>(`/api/departments/${id}`, {name});
        return res.data;
    },

    // Удалить (Soft delete)
    delete: async (id: number) => {
        await apiClient.delete(`/api/departments/${id}`);
    },

    // Восстановить из архива
    restore: async (id: number) => {
        await apiClient.post(`/api/departments/${id}/restore`);
    }
};