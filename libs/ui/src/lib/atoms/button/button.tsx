import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { omit } from 'lodash';
import { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import { darken, grid, th } from '@pubsweet/ui-toolkit';

type ButtonStatus = 'error' | 'danger' | 'success';

/* eslint-disable-next-line */
export interface ButtonProps extends AntButtonProps {
  status?: ButtonStatus | null;
  autoFocus?: boolean;
}

const colors: Record<ButtonStatus, string> = {
  danger: 'colorError',
  error: 'colorError',
  success: 'colorSuccess',
  // warn: 'colorWarning',
};

const StyledButton = styled(AntButton)`
  box-shadow: none;
  font-size: ${th('fontSizeBase')};
  /* let lineHeight expand the button height */
  height: unset;
  line-height: ${th('lineHeightBase')};
  ${(props: any) =>
    props.direction === 'rtl' &&
    css`
      direction: rtl;

      .anticon + span {
        margin-right: 8px;
        margin-left: 0;
      }
    `};

  ${(props: any) => {
    const { status, theme, type, ghost, disabled } = props;

    if (disabled) return null;

    if (!Object.keys(colors).includes(status)) {
      if (type === 'primary' && !ghost) {
        return css`
          &:hover,
          &:focus,
          &:active {
            background-color: ${darken('colorPrimary', 0.25)} !important;
          }
        `;
      }

      return css`
        &:hover,
        &:focus,
        &:active {
          border-color: ${darken('colorPrimary', 0.25)} !important;
          color: ${darken('colorPrimary', 0.25)} !important;
        }
      `;
    }

    const color = theme[colors[status as ButtonStatus]];

    // primary
    if (type === 'primary')
      return css`
        background-color: ${color};
        border-color: ${color};
        color: ${theme.colorTextReverse};

        &:hover,
        &:focus,
        &:active {
          border-color: ${color};
          color: ${theme.colorTextReverse};
        }

        &:hover,
        &:focus {
          background-color: ${darken(color, 0.25)} !important;
        }

        &:active {
          background-color: ${darken(color, 0.25)} !important;
        }
      `;

    // non-primary
    return css`
      color: ${color};
      border-color: ${color};

      &:hover,
      &:focus {
        color: ${darken(color, 0.25)};
        border-color: ${darken(color, 0.25)};
      }

      &:active {
        color: ${darken(color, 0.25)};
        border-color: ${darken(color, 0.25)};
      }
    `;
  }}
  padding: 0 ${grid(4)};
`;

export function Button({
  children,
  className,
  autoFocus = false,
  status = null,
  ...rest
}: ButtonProps) {
  const passProps = omit(rest, 'danger');
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (autoFocus) {
      buttonRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <StyledButton className={className} ref={buttonRef} {...passProps}>
      {children}
    </StyledButton>
  );
}

export default Button;
