import { HtmlHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

/* eslint-disable-next-line */
export interface ContainerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  second?: boolean;
}

const StyledContainer = styled.div<ContainerProps>`
  /* background: ${(props) => props.theme.colorBackground}; */
  display: flex;
  flex-direction: column;
  min-height: 100%;

  /* stylelint-disable-next-line no-descending-specificity */
  > div:first-child {
    align-self: center;
    margin: 20px 0;
  }

  a {
    padding: 4px;
    text-decoration: none;
    text-transform: uppercase;

    &:hover {
      outline: 2px solid ${(props) => props.theme.colorBorder};
    }
  }

  ${(props) =>
    props.second &&
    css`
      align-items: center;
      justify-content: center;
    `}
`;

export function Container({ children, ...props }: ContainerProps) {
  return <StyledContainer {...props}>{children}</StyledContainer>;
}

export default Container;
