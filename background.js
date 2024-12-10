chrome.action.onClicked.addListener((tab) => {
    if (tab.url.startsWith("https://www.redrooster.com.au/")) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: modifyCart,
        });
    } else {
        alert(
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
            alert('Used the infamous five finger discount.');
        } else {
            alert("Cart not found in sessionStorage.");
        }
    } catch (error) {
        alert("Error modifying cart:", error);
    }
}
