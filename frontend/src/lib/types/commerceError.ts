interface CommerceError {
    data: {
        error: {
            message: string;
            type: string;
        }
        status_code: number;
    }
    originalError: any;
}