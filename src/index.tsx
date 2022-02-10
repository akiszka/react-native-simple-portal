import React, {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react"

const PortalContext = createContext<
	| {
			gates: { [name: string]: ReactNode }
			teleport: (gateName: string, element: ReactNode) => void
			removeTeleport: (gateName: string) => void
	  }
	| undefined
>(undefined)

const PortalOut: React.FC<{ gateName: string }> = ({ gateName }) => {
	const { gates } = useContext(PortalContext)!

	return <>{gates[gateName]}</>
}

const PortalIn: React.FC<{ gateName: string }> = ({ children, gateName }) => {
	const { teleport, removeTeleport } = useContext(PortalContext)!

	useEffect(() => {
		teleport(gateName, children)
		return () => {
			removeTeleport(gateName)
		}
	}, [teleport, gateName, children])

	return <></>
}

const PortalProvider: React.FC = ({ children }) => {
	const [gates, setGates] = useState<{ [name: string]: ReactNode }>({})

	const teleport = useCallback(
		(gateName: string, element: ReactNode) => {
			setGates((oldGates) => {
				return { ...oldGates, [gateName]: element }
			})
		},
		[setGates]
	)

	const removeTeleport = useCallback(
		(gateName: string) => {
			setGates((oldGates) => {
				return { ...oldGates, [gateName]: undefined }
			})
		},
		[setGates]
	)

	return (
		<PortalContext.Provider value={{ gates, teleport, removeTeleport }}>
			{children}
		</PortalContext.Provider>
	)
}

export { PortalIn, PortalOut, PortalProvider }
