/* =========================================
   STARLUXE GLOBAL MARKETPLACE
   CENTRAL DATA MANAGEMENT
========================================= */

const STARLUXE_DATA = {

    brand: {
        name: "STARLUXE",
        tagline: "Where Celebrity Meets Luxury",
        currency: "USD",
        language: "en"
    },


    categories: [
        {
            id: "music",
            name: "Music",
            description: "Musicians, singers and recording artists"
        },
        {
            id: "actors",
            name: "Actors",
            description: "Film and television personalities"
        },
        {
            id: "sports",
            name: "Sports",
            description: "Athletes and sports personalities"
        },
        {
            id: "fashion",
            name: "Fashion",
            description: "Models, designers and fashion icons"
        },
        {
            id: "entertainment",
            name: "Entertainment",
            description: "Entertainers and public personalities"
        }
    ],


    experienceTypes: [
        {
            id: "meet-and-greet",
            name: "Meet & Greets"
        },
        {
            id: "events",
            name: "Events & Tickets"
        },
        {
            id: "merchandise",
            name: "Exclusive Merchandise"
        },
        {
            id: "vacations",
            name: "Luxury Getaways"
        },
        {
            id: "private-dining",
            name: "Private Dining"
        },
        {
            id: "performances",
            name: "Celebrity Performances"
        },
        {
            id: "fan-cards",
            name: "Fan Cards & Digital IDs"
        },
        {
            id: "autographed-items",
            name: "Autographed Merchandise"
        }
    ],


    celebrities: [
        {
            id: "celebrity-001",
            name: "Featured Celebrity",
            category: "Music",
            categoryId: "music",
            description: "Celebrity profile demonstration. Official profile information will be added by the STARLUXE administrator.",
            country: "",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
            featured: true,
            verified: false,
            status: "draft"
        },

        {
            id: "celebrity-002",
            name: "Featured Personality",
            category: "Entertainment",
            categoryId: "entertainment",
            description: "Celebrity profile demonstration. Official profile information will be added by the STARLUXE administrator.",
            country: "",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
            featured: true,
            verified: false,
            status: "draft"
        },

        {
            id: "celebrity-003",
            name: "Featured Fashion Icon",
            category: "Fashion",
            categoryId: "fashion",
            description: "Celebrity profile demonstration. Official profile information will be added by the STARLUXE administrator.",
            country: "",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800",
            featured: true,
            verified: false,
            status: "draft"
        }
    ],


    offerings: [
        {
            id: "offer-001",
            celebrityId: "celebrity-001",
            title: "Exclusive Meet & Greet",
            description: "Demonstration listing for an exclusive celebrity meeting experience.",
            type: "meet-and-greet",
            price: 500,
            currency: "USD",
            image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
            stock: 5,
            availability: "draft",
            featured: true
        },

        {
            id: "offer-002",
            celebrityId: "celebrity-002",
            title: "VIP Event Experience",
            description: "Demonstration listing for a premium event experience.",
            type: "events",
            price: 250,
            currency: "USD",
            image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800",
            stock: 20,
            availability: "draft",
            featured: true
        },

        {
            id: "offer-003",
            celebrityId: "celebrity-003",
            title: "Exclusive Merchandise",
            description: "Demonstration listing for exclusive celebrity merchandise.",
            type: "merchandise",
            price: 100,
            currency: "USD",
            image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800",
            stock: 10,
            availability: "draft",
            featured: false
        }
    ]

};


/* =========================================
   GLOBAL STARLUXE HELPERS
========================================= */

window.STARLUXE_DATA = STARLUXE_DATA;


window.STARLUXE = {

    getCelebrities: function () {
        return STARLUXE_DATA.celebrities;
    },


    getCelebrityById: function (id) {
        return STARLUXE_DATA.celebrities.find(
            celebrity => celebrity.id === id
        );
    },


    getOfferings: function () {
        return STARLUXE_DATA.offerings;
    },


    getOfferingById: function (id) {
        return STARLUXE_DATA.offerings.find(
            offering => offering.id === id
        );
    },


    getOfferingsByCelebrity: function (celebrityId) {
        return STARLUXE_DATA.offerings.filter(
            offering => offering.celebrityId === celebrityId
        );
    },


    getOfferingsByCategory: function (category) {
        return STARLUXE_DATA.offerings.filter(
            offering => offering.type === category
        );
    },


    getFeaturedCelebrities: function () {
        return STARLUXE_DATA.celebrities.filter(
            celebrity => celebrity.featured === true
        );
    },


    getFeaturedOfferings: function () {
        return STARLUXE_DATA.offerings.filter(
            offering => offering.featured === true
        );
    },


    formatPrice: function (price, currency = "USD") {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency
        }).format(price);
    },


    getCategories: function () {
        return STARLUXE_DATA.categories;
    },


    getExperienceTypes: function () {
        return STARLUXE_DATA.experienceTypes;
    }

};


/* =========================================
   SHOPPING CART STORAGE
========================================= */

window.STARLUXE_CART = {

    getItems: function () {
        return JSON.parse(
            localStorage.getItem("starluxe_cart") || "[]"
        );
    },


    addItem: function (offeringId, quantity = 1) {

        const offering = STARLUXE.getOfferingById(offeringId);

        if (!offering) {
            return false;
        }

        const cart = this.getItems();

        const existingItem = cart.find(
            item => item.offeringId === offeringId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                offeringId: offeringId,
                quantity: quantity
            });
        }

        localStorage.setItem(
            "starluxe_cart",
            JSON.stringify(cart)
        );

        return true;
    },


    removeItem: function (offeringId) {

        const updatedCart = this.getItems().filter(
            item => item.offeringId !== offeringId
        );

        localStorage.setItem(
            "starluxe_cart",
            JSON.stringify(updatedCart)
        );
    },


    clear: function () {
        localStorage.removeItem("starluxe_cart");
    },


    getCount: function () {

        return this.getItems().reduce(
            (total, item) => total + item.quantity,
            0
        );
    },


    getTotal: function () {

        return this.getItems().reduce(
            (total, item) => {

                const offering = STARLUXE.getOfferingById(
                    item.offeringId
                );

                if (!offering) {
                    return total;
                }

                return total + offering.price * item.quantity;

            },
            0
        );
    }

};


/* =========================================
   UPDATE CART COUNT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = STARLUXE_CART.getCount();
    }

});
