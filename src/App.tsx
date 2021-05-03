import { createGlobalStyle } from "styled-components";

import {
  NotificationsContextProvider,
  NotificationsContainer
} from "./components/Notifications";

import Demo from "./Demo";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <NotificationsContextProvider>
        <Demo />
        <NotificationsContainer />
      </NotificationsContextProvider>
    </>
  );
}
