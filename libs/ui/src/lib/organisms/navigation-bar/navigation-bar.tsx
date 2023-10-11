import { HtmlHTMLAttributes } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/button';

/* eslint-disable-next-line */
export interface NavigationBarProps extends HtmlHTMLAttributes<HTMLDivElement> {
  currentUsername?: string;
  loginLoading: boolean;
  login: () => void;
  logout: () => void;
}

const StyledNavigationBar = styled.div`
  background: ${(props) => props.theme.colorPrimary};
  color: white;
  display: flex;
  height: 50px;
  justify-content: space-between;
  line-height: 50px;
  padding: 0 8px;
`;

const Username = styled.div`
  margin-right: 10px;
`;

const RightSide = styled.div`
  display: flex;
`;

export function NavigationBar({
  login,
  loginLoading = false,
  logout,
  currentUsername,
  ...props
}: NavigationBarProps) {
  const onClickBtn = () => {
    if (currentUsername) {
      logout();
    } else {
      login();
    }
  };

  const btnText = currentUsername ? 'Logout' : 'Login';

  return (
    <StyledNavigationBar {...props}>
      <div>This is the navigation bar</div>

      <RightSide>
        <Username>{currentUsername && `Logged in as ${currentUsername}`}</Username>

        <div>
          <Button loading={loginLoading} onClick={onClickBtn}>
            {btnText}
          </Button>
        </div>
      </RightSide>
    </StyledNavigationBar>
  );
}

export default NavigationBar;
