import { createContext, useContext } from "react";

export const TemplteContext = createContext({
    template: 0,
    updateTemplate: function (a) {
       
   } 
});

export const useTemplate = () => {
  return useContext(TemplteContext);
};




export const TemplteProvider = TemplteContext.Provider;
