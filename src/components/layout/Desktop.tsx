import React from 'react';
import styled from 'styled-components';
import {Folder, Settings, User} from '@react95/icons';

const DesktopWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 45px);
    background-color: #008080;
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 20px;
    position: relative;
`;

const IconShortcut = styled.div`
    width: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    color: white;
    text-shadow: 1px 1px 1px black;
    font-size: 12px;
    text-align: center;

    &:hover {
        background-color: rgba(0, 0, 128, 0.4);
    }
`;

interface DesktopProps {
    onOpenDept: () => void;
    onClick: () => void;
    children?: React.ReactNode;
}

export const Desktop: React.FC<DesktopProps> = ({onOpenDept, onClick, children}) => {
    return (
        <DesktopWrapper onClick={onClick}>
            <IconShortcut onDoubleClick={onOpenDept}>
                <Folder variant="32x32_4"/>
                <span style={{marginTop: 4}}>Подразделения</span>
            </IconShortcut>

            <IconShortcut>
                <User variant="32x32_4"/>
                <span style={{marginTop: 4}}>Сотрудники</span>
            </IconShortcut>

            <IconShortcut>
                <Settings variant="32x32_4"/>
                <span style={{marginTop: 4}}>Настройки</span>
            </IconShortcut>

            {children}
        </DesktopWrapper>
    );
};