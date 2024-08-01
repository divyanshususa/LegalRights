import { createContext, useContext } from "react";

const initialState = {
  template: 0,
  content: "",
  updateContent: (details) => {},
  updateTemplate: (a) => {},
};
export const TemplteContext = createContext(initialState);

export const useTemplate = () => {
  return useContext(TemplteContext);
};

export const TemplteProvider = TemplteContext.Provider;
