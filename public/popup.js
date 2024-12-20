document.getElementById("remove-min-spend").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab.url.startsWith("https://www.redrooster.com.au/")) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    try {
                        let cart = sessionStorage.getItem("cart");

                        if (cart !== null) {
                            cart = JSON.parse(cart);

                            function setMinSpendToZero(obj) {
                                if (typeof obj === "object" && obj !== null) {
                                    for (let key in obj) {
                                        if (key === "minSpend") {
                                            obj[key] = 0;
                                        } else {
                                            setMinSpendToZero(obj[key]);
                                        }
                                    }
                                }
                            }

                            setMinSpendToZero(cart);

                            cart = JSON.stringify(cart);
                            sessionStorage.setItem("cart", cart);

                            alert("Removed the minimum spend for vouchers.");
                            window.location.reload();
                        } else {
                            alert("Cart not found in sessionStorage.");
                        }
                    } catch (error) {
                        alert("Error modifying cart: " + error);
                    }
                },
            });
        } else {
            alert(
                "This extension only works on the Red Rooster checkout page."
            );
        }
    });
});

document.getElementById("set-to-25-for-delivery").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (
            tab.url.startsWith("https://www.redrooster.com.au/")
        ) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    try {
                        let cart = sessionStorage.getItem("cart");

                        if (cart !== null) {
                            cart = JSON.parse(cart);
                            cart.total = 2500;
                            cart = JSON.stringify(cart);

                            sessionStorage.setItem("cart", cart);

                            alert("Used the infamous five finger discount.");
                            window.location.reload();
                        } else {
                            alert("Cart not found in sessionStorage.");
                        }
                    } catch (error) {
                        alert("Error modifying cart: " + error);
                    }
                },
            });
        } else {
            alert("This extension only on the Red Rooster checkout page.");
        }
    });
});

document.getElementById("apply-five-finger").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (
            tab.url.startsWith("https://www.redrooster.com.au/order/payment/")
        ) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    try {
                        let cart = sessionStorage.getItem("cart");
                        let checkout = sessionStorage.getItem("checkout");

                        if (cart !== null && checkout !== null) {
                            cart = JSON.parse(cart);
                            cart.total = 0;
                            cart = JSON.stringify(cart);
                            sessionStorage.setItem("cart", cart);

                            checkout = JSON.parse(checkout);
                            checkout.totalPayment = 0;
                            checkout = JSON.stringify(checkout);

                            sessionStorage.setItem("checkout", checkout);

                            alert("Used the infamous five finger discount.");
                            window.location.reload();
                        } else {
                            alert("Cart not found in sessionStorage.");
                        }
                    } catch (error) {
                        alert("Error modifying cart: " + error);
                    }
                },
            });
        } else {
            alert("This extension only on the Red Rooster checkout page.");
        }
    });
});
