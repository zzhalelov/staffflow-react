import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Button, MenuList, MenuListItem, Separator, Frame} from 'react95';
import {Computer, Folder, User} from '@react95/icons';

const TaskbarWrapper = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 45px;
    background: #c6c6c6;
    border-top: 2px solid #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
    z-index: 9999;
`;

const StartMenuWrapper = styled.div`
    position: absolute;
    bottom: 47px;
    left: 4px;
    z-index: 10000;
`;

interface TaskbarProps {
    isStartOpen: boolean;
    setIsStartOpen: (value: boolean) => void;
    isDeptOpen: boolean;
    onToggleDept: () => void;
    onLogout: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
                                                    isStartOpen,
                                                    setIsStartOpen,
                                                    isDeptOpen,
                                                    onToggleDept,
                                                    onLogout,
                                                }) => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
        };
        updateTime();
        const timer = setInterval(updateTime, 10000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {isStartOpen && (
                <StartMenuWrapper>
                    <MenuList onClick={() => setIsStartOpen(false)}>
                        <MenuListItem onClick={onToggleDept}>
                            <Folder variant="16x16_4" style={{marginRight: 8}}/>
                            Подразделения
                        </MenuListItem>
                        <MenuListItem>
                            <User variant="16x16_4" style={{marginRight: 8}}/>
                            Сотрудники
                        </MenuListItem>
                        <Separator/>
                        <MenuListItem onClick={onLogout}>
                            <Computer variant="16x16_4" style={{marginRight: 8}}/>
                            Завершение работы...
                        </MenuListItem>
                    </MenuList>
                </StartMenuWrapper>
            )}

            <TaskbarWrapper>
                <div style={{display: 'flex', gap: 6, alignItems: 'center'}}>
                    <Button
                        active={isStartOpen}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsStartOpen(!isStartOpen);
                        }}
                        style={{fontWeight: 'bold'}}
                    >
                        <Computer variant="16x16_4" style={{marginRight: 6}}/>
                        Пуск
                    </Button>

                    {isDeptOpen && (
                        <Button active onClick={onToggleDept} style={{fontWeight: 'bold'}}>
                            <Folder variant="16x16_4" style={{marginRight: 6}}/>
                            Подразделения
                        </Button>
                    )}
                </div>

                <Frame variant="well" style={{padding: '4px 10px', fontSize: 12}}>
                    {currentTime || '12:00'}
                </Frame>
            </TaskbarWrapper>
        </>
    );
};