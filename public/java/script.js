document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("cost-calculator");
    document.getElementById("emailSwitch").addEventListener("change", toggleEmailInput);
    calculateCost();
});

function updateRecycleValue() {
    const recycleQty = parseFloat(document.getElementById("recycle").value);
    const recycleCost = recycleQty * 90;
    document.getElementById("recycleCost").textContent = `CHF ${recycleCost.toFixed(2)}`;
}

function toggleCaution() {
    calculateCost();
}

function toggleTwint() {
    calculateCost();
}

function calculateCost() {
    const initialPrice = parseFloat(document.getElementById("initialPrice").value);
    const option1 = parseFloat(document.getElementById("option1").value);
    const option2 = parseFloat(document.getElementById("option2").value);
    const option3 = parseFloat(document.getElementById("option3").value);
    const recycleQty = parseFloat(document.getElementById("recycle").value);
    const recyclePrice = 90;
    const caution = document.getElementById("cautionSwitch").checked ? 100 : 0;
    const twint = document.getElementById("twintSwitch").checked ? 1.013 : 1;

    const subTotal = initialPrice + option1 + option2 + option3 + (recycleQty * recyclePrice) + caution;
    const vat = subTotal * 0.077;
    const total = subTotal + vat;
    const totalToPay = total * twint;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <div class="result-box mb-3">Sub-total: CHF ${subTotal.toFixed(2)}</div>
        <div class="result-box mb-3">VAT: CHF ${vat.toFixed(2)}</div>
        <div class="result-box mb-3">Total: CHF ${total.toFixed(2)}</div>
        <div class="result-box">Total to Pay: CHF ${totalToPay.toFixed(2)}</div>
    `;
    if (document.getElementById("emailSwitch").checked) {
        sendEmail();
    }
}

function toggleEmailInput() {
    const emailInput = document.getElementById("emailInput");
    if (document.getElementById("emailSwitch").checked) {
        emailInput.style.display = "block";
    } else {
        emailInput.style.display = "none";
    }
}

function sendEmail() {
    const email = document.getElementById("email").value;
    const subject = "Cost Calculator Results";
    const resultsDiv = document.getElementById("results");
    const body = encodeURIComponent(resultsDiv.innerText);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
}