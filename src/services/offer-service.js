import authService from './auth-service';

// const SALE = 'sale';
// const AUCTION = 'reseller';
const BULK_PURCHASE = 'bulk_purchase';
const PURCHASE = 'purchase';


class OfferService {

    isAReseller() {
        switch (authService.getRoles(authService.getToken())) {
            case authService.isReseller():
                return true;
            default:
                return false;
        }
    }
    isAllowedToAccept(type) {
        if (authService.isAuthenticated()) {
            switch (authService.getRoles(authService.getToken())) {
                case authService.isPicker():
                    return false;
                case authService.isBuyer() && (type === BULK_PURCHASE || type === PURCHASE):
                    return true;
                case authService.isReseller():
                    return true;
                default:
                    return false;

            }
        }
        return false;
    }
}

export default new OfferService();