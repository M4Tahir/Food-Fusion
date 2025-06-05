import { ReactNode, useContext, createContext } from 'react';

type AuthContextType = {
	user: null | { name: string };
	login: (user: { name: string }) => void;
	logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const value: AuthContextType = {
		user: null,
		login: (user) => {
			console.log('Login', user);
		},
		logout: () => {
			console.log('Logout');
		},
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('"useAuth" must be used within an "AuthProvider"');
	}
	return context;
};

export { AuthProvider, useAuth };
