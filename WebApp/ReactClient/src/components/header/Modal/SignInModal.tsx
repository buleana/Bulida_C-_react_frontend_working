import { useState } from 'react';
import styled from 'styled-components';
import { FieldType } from 'src/utils/types';
import { MIModalMessage } from 'src/components/common/MIModalMessage';
import GoogleLoginButton from 'src/components/common/GoogleLoginButton';
import { MITextInput } from 'src/components/common/MITextInput';
import MIPasswordInput from 'src/components/common/MIPasswordInput';
import {
  notifyError,
  notifyInfo,
} from 'src/services/notifications/notificationService';
import AuthenticationService from 'src/services/authenticationService';
import { AuthenticationErrorType } from 'src/infrastructure/restClient/models/AuthenticationErrorType';
import { MIButton } from 'src/components/common/MIButton';
import { WizardOrLine } from 'src/components/layout/WizardElements';
import { MILink } from 'src/components/common/MILink';

type Props = {
  dismiss?: (event: React.MouseEvent) => void;
  setIsSignedIn: (value: boolean) => void;
  showResetPassword: () => void;
};

export const SignInModal = ({ dismiss, setIsSignedIn, showResetPassword }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const authenticationResult = await AuthenticationService.authenticate(
      email,
      password
    );

    if (authenticationResult.is_error) {
      setLoading(false);
      notifyError({ msg: 'Server error.' });
      return;
    }
    if (
      authenticationResult.content?.authenticationErrorType ===
      AuthenticationErrorType.None
    ) {
      setLoading(false);
      setIsSignedIn(true);
      dismiss && dismiss(event);
    }

    switch (authenticationResult.content?.authenticationErrorType) {
      case AuthenticationErrorType.IsUserNotFound:
        setLoading(false);
        notifyInfo({ msg: 'User not found' });
        break;
      case AuthenticationErrorType.IsWrongPassword:
        setLoading(false);
        notifyInfo({ msg: 'Wrong password' });
        break;
      default:
        break;
    }
  };

  const onFieldChanged = ({ id, value }: FieldType) => {
    if (id === 'email') {
      setEmail(value);
    }

    if (id === 'password') {
      setPassword(value);
    }
  };

  const onResetPasswordClicked = (event) => {
    showResetPassword()
    dismiss && dismiss(event);
  }

  return (
    <MIModalMessage
      dismiss={dismiss}
      titleComponent={
        <ModalTitleContainer>
          <ModalTitle>
            Log <Bold>In</Bold>
          </ModalTitle>
          <InputsContainer>
            <MITextInput
              id='email'
              value={email}
              label='Email'
              onChange={onFieldChanged}
              autoFocus
              autocomplete='username email'
              type='email'
              required
              // errorMessage={validationErrors.email}
            />

            <MIPasswordInput
              id='password'
              value={password}
              label='Password'
              required
              // errorMessage={validationErrors.password}
              onChange={onFieldChanged}
            />
            <ResetPasswordLink
              to={onResetPasswordClicked}
              label='Forgot password?'
            />
          </InputsContainer>
          <MIButton
            label='Log In'
            type='submit'
            onClick={handleSubmit}
            isProcessing={loading}
            fullWidth
          />
          <WizardOrLine />
          <GoogleLoginButton />
        </ModalTitleContainer>
      }
    />
  );
};

const ModalTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ModalTitle = styled.span`
  ${(props) => props.theme.text.fontType.h4};
  margin-bottom: 1rem;
  font-weight: 300;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const InputsContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const ResetPasswordLink = styled(MILink)`
  width: 100%;
  margin-bottom: 3rem;
  font-weight: ${(props) => props.theme.text.weight.semiBold};
`;
