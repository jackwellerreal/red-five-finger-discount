chrome.action.onClicked.addListener((tab) => {
    if (tab.url.startsWith("https://www.redrooster.com.au/")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: modifyCart,
        });
    } else {
        console.log(
            "This extension only works on https://www.redrooster.com.au/"
        );
    }
});

function modifyCart() {
    try {
        let cart = sessionStorage.getItem("cart");
        if (cart !== null) {
            cart = JSON.parse(cart);
            cart.total = 0;
            cart = JSON.stringify(cart);

            sessionStorage.setItem("cart", cart);
            console.log('Added five finger discount.');
        } else {
            console.log("Cart not found in sessionStorage.");
        }
    } catch (error) {
        console.error("Error modifying cart:", error);
    }
}
