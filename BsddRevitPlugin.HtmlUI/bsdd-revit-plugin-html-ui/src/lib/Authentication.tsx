import React, { useEffect, useState } from 'react';
import { Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { loginRequest } from '../authConfig';
import { useMsal } from '@azure/msal-react';

interface Props {
  setAccessToken: (value: string) => void;
}

function Authentication({ setAccessToken }: Props) {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const { instance, inProgress, accounts } = useMsal();
  // const [selectOptions, setSelectOptions] = useState<any[]>([])

  useEffect(() => {
    if (accounts[0]) {
      instance.acquireTokenSilent({ ...loginRequest, account: accounts[0] }).then((result) => {
        if (result.accessToken !== '') {
          setAccessToken(result.accessToken);
          setAuthenticated(true);
        }
      });
    }
  }, [accounts, instance, setAuthenticated, setAccessToken]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthenticated(e.target.checked);
    if (authenticated) {
      instance.logoutRedirect({ postLogoutRedirectUri: '/' });
    } else {
      instance.loginRedirect(loginRequest);
    }
  };

  return (
    <OverlayTrigger overlay={<Tooltip>log in on bSDD</Tooltip>} placement="bottom">
      <Form.Check type="switch" id="custom-switch" checked={authenticated} onChange={(e) => handleOnChange(e)} />
    </OverlayTrigger>
  );
}
export default Authentication;
