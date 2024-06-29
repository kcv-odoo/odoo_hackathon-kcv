export declare const hashPassword: (password: string) => string;
export declare const hashToken: (token: string) => string;
export declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
