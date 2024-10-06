document.getElementById('calculate-button').addEventListener('click', calculateTakeHomePay);

function calculateTakeHomePay() {
    const grossIncome = parseFloat(document.getElementById('gross-income').value);
    if (isNaN(grossIncome) || grossIncome <= 0) {
        alert('Please enter a valid gross income.');
        return;
    }


    // Personal Allowance
    let personalAllowance = 12570;


    // Code to calculate taxable income
    let taxableIncome = Math.max(grossIncome - personalAllowance, 0);
    let incomeTax = 0;
    let nationalInsurance = 0;


    // Income tax brackets
    const basicRateLimit = 50270;
    const higherRateLimit = 125140;
}