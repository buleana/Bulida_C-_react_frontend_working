import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useModal } from 'src/helpers/react/useModal';
import { SignInModal } from 'src/components/header/Modal/SignInModal';
import { MIButton } from 'src/components/common/MIButton';
import AuthenticationService from 'src/services/authenticationService';
import LogoImage from 'src/images/general/logo.svg';
import { BUTTON_VARIANT } from 'src/utils/consts';
import { removeUser, saveUser } from 'src/redux/user/actions';
import { getIsLoggedIn } from 'src/redux/user/selectors';
import { ResetPasswordModal } from 'src/components/header/Modal/ResetPasswordModal';

export const AppHeader = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(getIsLoggedIn);

  const setIsSignedIn = useCallback(() => {
    dispatch(saveUser());
  }, [dispatch]);

  const setIsLoggedOut = useCallback(() => {
    dispatch(removeUser());
  }, [dispatch]);

  const checkIfUserSignedIn = async () => {
    const result = await AuthenticationService.isSignedIn();
    if (result) {
      setIsSignedIn();
    } else {
      setIsLoggedOut();
    }
  };

  useEffect(() => {
    checkIfUserSignedIn();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logOut = async () => {
    await AuthenticationService.signOut();
    setIsLoggedOut();
  };

  const [ResetPassword, showResetPassword] = useModal(ResetPasswordModal, {
    id: 'resetPasswordModal',
  });

  const [SignIn, showSignIn] = useModal(SignInModal, {
    id: 'signInModal',
    setIsSignedIn: setIsSignedIn,
    showResetPassword: showResetPassword,
  });

  return (
    <>
      {SignIn}
      {ResetPassword}
      <AppHeaderContainer>
        <Logo src={LogoImage} />
        <Menu>
          <MenuItem>Product tour</MenuItem>
          <MenuItem>Help center</MenuItem>
          <MenuItem>Pricing</MenuItem>
        </Menu>
        <Auth>
          {isSignedIn ? (
            <MIButton label='LOG OUT' onClick={logOut} />
          ) : (
            <>
              <MIButton
                label='SIGN IN'
                variant={BUTTON_VARIANT.SECONDARY}
                onClick={showSignIn}
              />
              <MIButton
                label='SIGN UP'
                onClick={() => console.log('register')}
              />
            </>
          )}
        </Auth>
      </AppHeaderContainer>
    </>
  );
};

const AppHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem 12rem;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.pureWhite};
  box-shadow: 0px 0px 12px rgba(84, 89, 98, 0.15);
`;

const Logo = styled.img``;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.colors.black1};
  ${(props) => props.theme.text.fontType.body2};

  > div:nth-child(2) {
    margin: 0 2rem;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 1rem;
`;

const Auth = styled.div`
  display: flex;
  flex-direction: row;
  height: 5rem;
  ${(props) => props.theme.text.fontType.body4};

  > button:nth-child(1) {
    margin: 0 0.5rem 0 0;
  }
`;
