import React, { createContext, useContext, useReducer } from "react";

const ACTIONS = {
  hide: "HIDE",
  hideAll: "HIDE_ALL",
  show: "SHOW"
};

export const ROLES = {
  success: "success",
  error: "error",
  info: "info",
  warning: "warning"
};

type ProviderProps = {
  children: React.ReactNode | Array<React.ReactNode>;
};

type $Values<O extends object> = O[keyof O];

export type Notification = {
  role: $Values<typeof ROLES>;
  message: string;
  lifespan: number;
  id: string;
};

type Context = {
  dispatch: (arg0: Action) => void;
  notifications: Array<Notification>;
  hide: (arg0: Notification) => void;
  hideAll: () => void;
  notify: (arg0: Partial<Notification>) => void;
  notifyError: (arg0: string, arg1?: number) => void;
  notifySuccess: (arg0: string, arg1?: number) => void;
  notifyInfo: (arg0: string, arg1?: number) => void;
  notifyWarning: (arg0: string, arg1?: number) => void;
};

type Action = {
  action: $Values<typeof ACTIONS>;
  notification?: Notification;
};

type NotificationsState = {
  notifications: Array<Notification>;
};

const initialState: NotificationsState = {
  notifications: []
};

function reducer(
  state: NotificationsState,
  { action, notification }: Action
): NotificationsState {
  switch (action) {
    case ACTIONS.show:
      if (!notification) return state;

      return {
        ...state,
        notifications: [notification, ...state.notifications]
      };
    case ACTIONS.hide:
      if (!notification) return state;

      return {
        ...state,
        notifications: [...state.notifications].filter(
          (n) => n.id !== notification.id
        )
      };
    case ACTIONS.hideAll:
      return {
        ...state,
        notifications: []
      };
    default:
      return {
        ...state
      };
  }
}

const notificationFragment = (n: Partial<Notification>): Notification => {
  const defaultNotification = {
    id: new Date().toISOString(),
    role: ROLES.info,
    message: "",
    lifespan: 5000
  };

  if (!n) return defaultNotification;

  return {
    ...defaultNotification,
    ...n
  };
};

const NotificationsContext = createContext<Context>(initialState);

const NotificationsContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { notifications } = state;

  const hideAll = () => dispatch({ action: ACTIONS.hideAll });

  const hide = (notification: Notification) =>
    dispatch({
      action: ACTIONS.hide,
      notification
    });

  const notify = (n: Partial<Notification>) => {
    const notification = notificationFragment(n);

    dispatch({
      action: ACTIONS.show,
      notification
    });
  };

  const notifySuccess = (message: string, lifespan: number = 5000) =>
    notify({ message, role: ROLES.success, lifespan });
  const notifyError = (message: string, lifespan: number = 5000) => {
    notify({ message, role: ROLES.error, lifespan });
  };
  const notifyWarning = (message: string, lifespan: number = 5000) =>
    notify({ message, role: ROLES.warning, lifespan });
  const notifyInfo = (message: string, lifespan: number = 5000) =>
    notify({ message, role: ROLES.info, lifespan });

  const context: Context = {
    dispatch,
    notifications,
    hideAll,
    hide,
    notify,
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo
  };

  return (
    <NotificationsContext.Provider value={context}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationsContext = () => useContext(NotificationsContext);

export default NotificationsContextProvider;
