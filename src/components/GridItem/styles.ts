import styled from 'styled-components';

type ContainerProps = {
    showBackground: boolean;
}
type IconProps = {
    opacity?: number;
}

export const Container = styled.div<ContainerProps>`
    background-color: ${props => props.showBackground ? '#1550FF' : '#E2E3E3'};
    height: 100px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const Icon = styled.img<IconProps>`
    height: 40px;
    width: 40px;
    opacity: ${props => props.opacity ?? 1 };
`;

// export const Container = styled.div``;
