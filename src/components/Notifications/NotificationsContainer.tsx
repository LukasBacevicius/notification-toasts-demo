import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

import {
  useNotificationsContext,
  Notification as NotificationType
} from "./context";

import Notification from "./Notification";

const Root = styled(motion.div)`
  position: fixed;
  pointer-events: none;

  right: 32px;
  bottom: 32px;
  display: block;
  z-index: 1000;
  width: 320px;
`;

const Item = styled(motion.div)`
  margin: 12px 0;
  text-align: right;
`;

export default () => {
  const [currentNotifications, setCurrentNotifications] = useState<
    Array<NotificationType>
  >([]);
  const { notifications, hide } = useNotificationsContext();

  const update = (n: Array<NotificationType>) =>
    setCurrentNotifications([...n]);

  useEffect(() => {
    update(notifications);
  }, [notifications]);

  const transition = { duration: 0.15, ease: "easeInOut" };

  return (
    <Root>
      <AnimatePresence initial={false}>
        {currentNotifications.map((n: NotificationType) => (
          <Item
            layout="position"
            key={n.id}
            initial={{ opacity: 0, scale: 0.85 }}
            transition={transition}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { ...transition, delay: 0.15 }
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition
            }}
          >
            <Notification {...n} onClose={() => hide(n)} />
          </Item>
        ))}
      </AnimatePresence>
    </Root>
  );
};
