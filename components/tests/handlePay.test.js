import { jest } from '@jest/globals';
import { describe, expect, it } from '@jest/globals';


describe('handlePay', () => {
  let checkoutDetails;
  let setIsCheckoutVisible;
  let setIsSuccessVisible;
  let setCartItems;
  let setCheckoutDetails;
  let handlePay;
  let mockAlert;

  beforeEach(() => {
    setIsCheckoutVisible = jest.fn();
    setIsSuccessVisible = jest.fn();
    setCartItems = jest.fn();
    setCheckoutDetails = jest.fn();

    checkoutDetails = {
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      phone: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    };

    mockAlert = jest.spyOn(global, 'alert').mockImplementation(() => {});

    handlePay = () => {
      const { fullName, address, city, postalCode, country, phone, email, cardNumber, expiryDate, cvv } = checkoutDetails;

      if (!fullName || !address || !city || !postalCode || !country || !phone || !email || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all fields!');
        return;
      }

      if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        alert('Invalid card number. It must be 16 digits.');
        return;
      }

      if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Invalid expiry date. Use format MM/YY.');
        return;
      }

      if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
        alert('Invalid CVV. It must be 3 digits.');
        return;
      }

      setIsCheckoutVisible(false);
      setIsSuccessVisible(true);
      setCartItems([]);
      setCheckoutDetails({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
        phone: '',
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      });
    };
  });

  afterEach(() => {
    mockAlert.mockRestore();
  });

  it('should alert when fields are missing', () => {
    handlePay();
    expect(mockAlert).toHaveBeenCalledWith('Please fill in all fields!');
  });

  it('should alert when card number is invalid', () => {
    checkoutDetails = { ...checkoutDetails, fullName: 'John Doe', address: '123 Main St', city: 'Copenhagen', postalCode: '12345', country: 'Denmark', phone: '12345678', email: 'john@example.com', cardNumber: '123', expiryDate: '12/25', cvv: '123' };
    handlePay();
    expect(mockAlert).toHaveBeenCalledWith('Invalid card number. It must be 16 digits.');
  });

  it('should alert when expiry date is invalid', () => {
    checkoutDetails = { ...checkoutDetails, fullName: 'John Doe', address: '123 Main St', city: 'Copenhagen', postalCode: '12345', country: 'Denmark', phone: '12345678', email: 'john@example.com', cardNumber: '4111111111111111', expiryDate: '1225', cvv: '123' };
    handlePay();
    expect(mockAlert).toHaveBeenCalledWith('Invalid expiry date. Use format MM/YY.');
  });

  it('should alert when CVV is invalid', () => {
    checkoutDetails = { ...checkoutDetails, fullName: 'John Doe', address: '123 Main St', city: 'Copenhagen', postalCode: '12345', country: 'Denmark', phone: '12345678', email: 'john@example.com', cardNumber: '4111111111111111', expiryDate: '12/25', cvv: '12' };
    handlePay();
    expect(mockAlert).toHaveBeenCalledWith('Invalid CVV. It must be 3 digits.');
  });

  it('should process payment successfully', () => {
    checkoutDetails = { ...checkoutDetails, fullName: 'John Doe', address: '123 Main St', city: 'Copenhagen', postalCode: '12345', country: 'Denmark', phone: '12345678', email: 'john@example.com', cardNumber: '4111111111111111', expiryDate: '12/25', cvv: '123' };
    handlePay();
    expect(setIsCheckoutVisible).toHaveBeenCalledWith(false);
    expect(setIsSuccessVisible).toHaveBeenCalledWith(true);
    expect(setCartItems).toHaveBeenCalledWith([]);
    expect(setCheckoutDetails).toHaveBeenCalledWith({
      fullName: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      phone: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
  });
});
