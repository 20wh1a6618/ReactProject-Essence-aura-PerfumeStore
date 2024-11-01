import { configureStore, createSlice } from "@reduxjs/toolkit";

// Product slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
        women: [
            { brand: "Chanel", name: "Coco Mademoiselle", price: 150 },
            { brand: "Dior", name: "J'adore", price: 135 },
            { brand: "Yves Saint Laurent", name: "Black Opium", price: 130 },
            { brand: "Tom Ford", name: "Black Orchid", price: 180 },
            { brand: "Lancôme", name: "La Vie Est Belle", price: 125 },
            { brand: "Gucci", name: "Bloom", price: 120 },
            { brand: "Viktor & Rolf", name: "Flowerbomb", price: 165 },
            { brand: "Dolce & Gabbana", name: "Light Blue", price: 100 },
            { brand: "Jo Malone", name: "English Pear & Freesia", price: 144 },
            { brand: "Hermès", name: "Twilly d'Hermès", price: 145 }
        ],
        men: [
            { brand: "Creed", name: "Aventus", price: 445 },
            { brand: "Dior", name: "Sauvage Eau de Parfum", price: 125 },
            { brand: "Tom Ford", name: "Oud Wood", price: 270 },
            { brand: "Chanel", name: "Bleu de Chanel", price: 150 },
            { brand: "Giorgio Armani", name: "Acqua di Gio Profumo", price: 135 },
            { brand: "Yves Saint Laurent", name: "La Nuit de l'Homme", price: 95 },
            { brand: "Hermès", name: "Terre d’Hermès", price: 135 },
            { brand: "Versace", name: "Eros", price: 105 },
            { brand: "Paco Rabanne", name: "1 Million", price: 95 },
            { brand: "Jean Paul Gaultier", name: "Le Male", price: 95 }
        ]
    }
});

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], discount: 0, couponDiscount: 0 },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity if item exists
            } else {
                state.items.push({ ...action.payload, quantity: 1 }); // Add new item
            }
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.name === action.payload.name);
            if (index > -1) {
                state.items.splice(index, 1); // Remove item from cart
            }
        },
        incrementQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity += 1; // Increment the quantity of the item
            }
        },
        decrementQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1; // Decrement the quantity if greater than 1
            } else if (existingItem && existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.name !== action.payload.name);
            }
        },
        applyDiscount: (state, action) => {
            state.discount = action.payload; // Sets the discount percentage
        },
        applyCoupon: (state, action) => {
            switch (action.payload) {
                case 'sundaysale':
                    state.couponDiscount = 5;
                    break;
                case 'festivesale':
                    state.couponDiscount = 10;
                    break;
                case 'newyearsale':
                    state.couponDiscount = 15;
                    break;
                default:
                    state.couponDiscount = 0; // Reset if invalid
                    break;
            }
        },
        clearCart: (state) => {
            state.items = []; // Clear all items in the cart
            state.discount = 0; // Reset discount
            state.couponDiscount = 0; // Reset coupon discount
        },
    },
});
// Purchase History Slice
const purchaseHistorySlice = createSlice({
    name: 'purchaseHistory',
    initialState: [],
    reducers: {
        addPurchase: (state, action) => {
            state.push(action.payload);
        }
    }
});

const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        purchaseHistory: purchaseHistorySlice.reducer
    }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, applyDiscount, applyCoupon, clearCart } = cartSlice.actions;
export const { addPurchase } = purchaseHistorySlice.actions;
export default store;
