let subtotal, shippingCost, serviceFee, setCartTotal, setCartItems, cartItems;
beforeEach(() => {
    subtotal = 100;
    shippingCost = 10;
    serviceFee = 5;
    setCartTotal = jest.fn();
    setCartItems = jest.fn();
    cartItems = [
        { id: 1, name: "Item 1", cartCount: 2 },
        { id: 2, name: "Item 2", cartCount: 1 },
    ];
});

//Test for calculateCartTotal
test("calculateCartTotal calculates total correctly and sets it", () => {
    const calculateCartTotal = () => {
        const total = subtotal + shippingCost + serviceFee;
        setCartTotal(total);
    };

    calculateCartTotal();

    expect(setCartTotal).toHaveBeenCalledWith(115);
});

//Test for adjustQuantity
test("adjustQuantity updates item count correctly", () => {
    const adjustQuantity = (id, amount) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === id) {
                const newCount = Math.max(item.cartCount + amount, 1);
                return { ...item, cartCount: newCount };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    adjustQuantity(1, 1);

    expect(setCartItems).toHaveBeenCalledWith([
        { id: 1, name: "Item 1", cartCount: 3 },
        { id: 2, name: "Item 2", cartCount: 1 },
    ]);

    adjustQuantity(1, -3); //må ikke under 1

    expect(setCartItems).toHaveBeenCalledWith([
        { id: 1, name: "Item 1", cartCount: 1 },
        { id: 2, name: "Item 2", cartCount: 1 },
    ]);
});

//Test for removeItem
test("removeItem removes the correct item", () => {
    const removeItem = (id) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCartItems);
    };

    removeItem(1);

    expect(setCartItems).toHaveBeenCalledWith([
        { id: 2, name: "Item 2", cartCount: 1 },
    ]);
});
