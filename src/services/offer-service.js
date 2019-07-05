import authService from './auth-service';

// const SALE = 'sale';
// const AUCTION = 'reseller';
const BULK_PURCHASE = 'bulk_purchase';
const PURCHASE = 'purchase';
const SALE = 'sale';


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
                {
                    if (type == PURCHASE)
                        return true;
                    return false;
                }
                case (authService.isBuyer()):
                    return false;               
                case authService.isReseller():
                {
                    if (type === BULK_PURCHASE || type === SALE)
                        return true;
                    return false;
                }
                default:
                    return false;

            }
        }
        return false;
    }
}

export default new OfferService();