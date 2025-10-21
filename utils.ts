
export const getStatusBadgeClass = (status: string): string => {
    if (!status) return 'badge-ghost';
    switch (status.toLowerCase()) {
        case 'live':
            return 'badge-success text-success-content';
        case 'testing':
            return 'badge-info text-info-content';
        case 'onboarding':
            return 'badge-warning text-warning-content';
        case 'cancelled':
            return 'badge-error text-error-content';
        default:
            return 'badge-ghost';
    }
};
