import React, { createContext, useCallback, useContext, useEffect, useState, } from "react";
const PortalContext = createContext(undefined);
const PortalOut = ({ gateName }) => {
    const { gates } = useContext(PortalContext);
    return React.createElement(React.Fragment, null, gates[gateName]);
};
const PortalIn = ({ children, gateName }) => {
    const { teleport, removeTeleport } = useContext(PortalContext);
    useEffect(() => {
        teleport(gateName, children);
        return () => {
            removeTeleport(gateName);
        };
    }, [teleport, gateName, children]);
    return React.createElement(React.Fragment, null);
};
const PortalProvider = ({ children }) => {
    const [gates, setGates] = useState({});
    const teleport = useCallback((gateName, element) => {
        setGates((oldGates) => {
            return Object.assign(Object.assign({}, oldGates), { [gateName]: element });
        });
    }, [setGates]);
    const removeTeleport = useCallback((gateName) => {
        setGates((oldGates) => {
            return Object.assign(Object.assign({}, oldGates), { [gateName]: undefined });
        });
    }, [setGates]);
    return (React.createElement(PortalContext.Provider, { value: { gates, teleport, removeTeleport } }, children));
};
export { PortalIn, PortalOut, PortalProvider };
