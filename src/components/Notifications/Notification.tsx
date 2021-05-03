import React, { useEffect } from "react";
import styled from "styled-components";

import {
  ErrorIcon,
  WarningIcon,
  SuccessIcon,
  InfoIcon,
  CloseIcon
} from "../../icons/notifications";

import { Notification as NotificationType, ROLES } from "./context";

type Props = NotificationType & {
  onClose: () => void;
};

const Root = styled.div`
  display: inline-flex;
  align-items: center;
  background: #fefefe;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1), 0 2px 6px rgba(0, 0, 0, 0.04),
    0 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  padding: 16px 24px;
  pointer-events: all;
`;

const baseIconStyles = `
  margin-right: 16px;
`;

const StyledErrorIcon = styled(ErrorIcon)`
  ${baseIconStyles}
`;

const StyledWarningIcon = styled(WarningIcon)`
  ${baseIconStyles}
`;

const StyledSuccessIcon = styled(SuccessIcon)`
  ${baseIconStyles}
`;

const StyledInfoIcon = styled(InfoIcon)`
  ${baseIconStyles}
`;

const StyledCloseIcon = styled(CloseIcon)`
  margin-left: 24px;
  fill: #919195;
  cursor: pointer;
  outline: none;
`;

const Message = styled.p`
  margin: 0;
`;

const getIcon = (role: NotificationType["role"]) => {
  switch (role) {
    case ROLES.info:
      return StyledInfoIcon;
    case ROLES.success:
      return StyledSuccessIcon;
    case ROLES.warning:
      return StyledWarningIcon;
    case ROLES.error:
      return StyledErrorIcon;
    default:
      return StyledInfoIcon;
  }
};

export default ({ message, role, lifespan, onClose }: Props) => {
  const Icon = getIcon(role);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose();
    }, lifespan);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Root>
      <Icon />
      <Message>{message}</Message>
      {onClose && (
        <StyledCloseIcon role="button" tabIndex={0} onClick={onClose} />
      )}
    </Root>
  );
};
