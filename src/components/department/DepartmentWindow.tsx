import React, {useEffect, useState} from 'react';
import {
    Window, WindowHeader, WindowContent, Button, Table,
    TableHead, TableRow, TableHeadCell, TableBody, TableDataCell,
    TextInput, Frame
} from 'react95';
import {departmentApi} from '../../api/departments.ts';
import type {DepartmentFullResponseDto} from '../../api/departments.ts';

interface DepartmentWindowProps {
    onClose: () => void;
}

export const DepartmentWindow: React.FC<DepartmentWindowProps> = ({onClose}) => {
    const [departments, setDepartments] = useState<DepartmentFullResponseDto[]>([]);
    const [deptName, setDeptName] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    const loadDepartments = async () => {
        try {
            const data = await departmentApi.findAll(0, 50);
            setDepartments(data.content);
        } catch (err: any) {
            setErrorMsg('Ошибка при загрузке данных с сервера');
        }
    };

    useEffect(() => {
        loadDepartments();
    }, []);

    const handleSave = async () => {
        if (!deptName.trim()) return;
        try {
            if (editingId) {
                await departmentApi.update(editingId, deptName);
            } else {
                await departmentApi.create(deptName);
            }
            setDeptName('');
            setEditingId(null);
            setErrorMsg('');
            loadDepartments();
        } catch (err: any) {
            setErrorMsg(err.response?.data?.message || 'Ошибка валидации! Название должно начинаться с буквы.');
        }
    };

    const handleEdit = (dept: DepartmentFullResponseDto) => {
        setEditingId(dept.id);
        setDeptName(dept.name);
    };

    const handleDelete = async (id: number) => {
        await departmentApi.delete(id);
        loadDepartments();
    };

    const handleRestore = async (id: number) => {
        await departmentApi.restore(id);
        loadDepartments();
    };

    return (
        <Window style={{width: 700, position: 'absolute', top: 40, left: 60, zIndex: 500}}>
            <WindowHeader style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span>Управление подразделениями</span>
                <Button size="sm" square onClick={onClose}><span>X</span></Button>
            </WindowHeader>

            <WindowContent>
                {/* Форма создания / редактирования */}
                <Frame variant="well" style={{padding: 10, marginBottom: 15}}>
                    <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
                        <TextInput
                            placeholder="Название подразделения..."
                            value={deptName}
                            onChange={(e) => setDeptName(e.target.value)}
                            style={{flex: 1}}
                        />
                        <Button primary onClick={handleSave}>
                            {editingId ? 'Сохранить' : 'Добавить'}
                        </Button>
                        {editingId && (
                            <Button onClick={() => {
                                setEditingId(null);
                                setDeptName('');
                            }}>Отмена</Button>
                        )}
                    </div>
                    {errorMsg && <p style={{color: 'red', fontSize: 11, marginTop: 6, margin: 0}}>{errorMsg}</p>}
                </Frame>

                {/* Таблица */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>ID</TableHeadCell>
                            <TableHeadCell>Название</TableHeadCell>
                            <TableHeadCell>Статус</TableHeadCell>
                            <TableHeadCell>Действия</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departments.map((dept) => (
                            <TableRow key={dept.id} style={{opacity: dept.deleted ? 0.6 : 1}}>
                                <TableDataCell>{dept.id}</TableDataCell>
                                <TableDataCell style={{fontWeight: 'bold'}}>{dept.name}</TableDataCell>
                                <TableDataCell>
                                    {dept.deleted ? '📦 В архиве' : '✅ Активно'}
                                </TableDataCell>
                                <TableDataCell>
                                    {!dept.deleted ? (
                                        <div style={{display: 'flex', gap: 4}}>
                                            <Button size="sm" onClick={() => handleEdit(dept)}>Ред.</Button>
                                            <Button size="sm" onClick={() => handleDelete(dept.id)}>В архив</Button>
                                        </div>
                                    ) : (
                                        <Button size="sm" onClick={() => handleRestore(dept.id)}>Восстановить</Button>
                                    )}
                                </TableDataCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </WindowContent>
        </Window>
    );
};