import React, { useState } from "react";
import { useNotificationsContext } from "./components/Notifications";

import styled from "styled-components";

const Root = styled.div`
  padding: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 16px 24px;
  max-width: 500px;
  margin: 0 auto;
`;

type ButtonProps = {
  background: string;
};

const Button = styled.button<ButtonProps>`
  padding: 8px;
  height: 40px;
  min-width: 0;
  border: 0;
  border-radius: 12px;
  font-weight: 400;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: ${({ background }) => background};
`;

export default () => {
  const {
    notifyError,
    notifySuccess,
    notifyInfo,
    notifyWarning
  } = useNotificationsContext();

  const onErrorClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    notifyError("Error");
  };

  const onSuccessClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    notifySuccess("Success");
  };

  const onInfoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    notifyInfo("Info");
  };

  const onWarningClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    notifyWarning("Warning");
  };

  return (
    <Root>
      <Button background="#F6354D" onClick={onErrorClick}>
        Show error notification
      </Button>
      <Button background="#FFB818" onClick={onSuccessClick}>
        Show success notification
      </Button>
      <Button background="#1E2FF1" onClick={onInfoClick}>
        Show info notification
      </Button>
      <Button background="#009378" onClick={onWarningClick}>
        Show warning notification
      </Button>
    </Root>
  );
};
