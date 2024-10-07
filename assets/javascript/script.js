document.getElementById('calculate-button').addEventListener('click', calculateTakeHomePay);

function calculateTakeHomePay() {
    const grossIncome = parseFloat(document.getElementById('gross-income').value);
    if (isNaN(grossIncome) || grossIncome <= 0) {
        alert('Please enter a valid gross income.');
        return;
    }


    // Personal Allowance - income below this amount is tax free
    let personalAllowance = 12570;


    // Code to deduct £1 from personal allowance for every £2 over £100,000 earned

        // If salary is over £100,000
    if (grossIncome > 100000) {

        // Subtract £100,000 from salary to get excess income
        let excessIncome = grossIncome - 100000;

        // Divide excess income by 2
        let allowanceReduction = excessIncome / 2;

        // Now subtract the reduction from the personal allowance. The '0' ensures the amount can't go below 0.
        personalAllowance = Math.max(personalAllowance - allowanceReduction, 0);
    }


    // Code to calculate taxable income
    let taxableIncome = Math.max(grossIncome - personalAllowance, 0);
    let incomeTax = 0;
    let nationalInsurance = 0;


    // Income tax brackets
    const basicRateLimit = 50270;
    const higherRateLimit = 125140;


    // Code to calculate income tax

        // If salary is less than or equal to £50,270
    if (grossIncome <= basicRateLimit) {
        // Then taxable income is taxed at 20%
        incomeTax = taxableIncome * 0.20;

        // If salary is less than or equal to £125,140
    } else if (grossIncome <= higherRateLimit) {
        // Then taxable income is taxed at 20% of £37,700 (£50,270 - £12,570 tax-free allowance), + 40% of remaining income.
        incomeTax = ((basicRateLimit - personalAllowance) * 0.20) + 
        ((grossIncome - basicRateLimit) * 0.40);

        // If salary is more than £125,140
    } else {
        // Then taxable income is taxed at 20% of £37,700, + 40% of income between £50,270 and £125,140, and 45% of remaining income.
        incomeTax = ((basicRateLimit - personalAllowance) * 0.20) + 
        ((higherRateLimit - basicRateLimit) * 0.40) + 
        ((grossIncome - higherRateLimit) * 0.45);
    }


    // Code to calculate National Insurance (simplified)

        // If salary is more than £12,570
    if (grossIncome > 12570) {
        // National Insurance is 8% of salary between £12,570 and £50,270
        nationalInsurance = Math.min(grossIncome - personalAllowance, basicRateLimit - personalAllowance) * 0.08;

        // If salary is more than £50,270
        if (grossIncome > 50270) {
        // National Insurance is 8% of salary between £12,570 and £50,270, and 2% of salary above that
            nationalInsurance += (grossIncome - basicRateLimit) * 0.02;
        }
    }

    
    // Code to calculate Take-Home pay
    const takeHomePay = grossIncome - incomeTax - nationalInsurance;


    // Code to display yearly, monthly and weekly values on the table
    document.getElementById('gross-yearly').textContent = (grossIncome);
    document.getElementById('gross-monthly').textContent = (grossIncome / 12);
    document.getElementById('gross-weekly').textContent = (grossIncome / 52);

    document.getElementById('personal-allowance-yearly').textContent = (personalAllowance);
    document.getElementById('personal-allowance-monthly').textContent = (personalAllowance / 12);
    document.getElementById('personal-allowance-weekly').textContent = (personalAllowance / 52);

    document.getElementById('taxable-yearly').textContent = (taxableIncome);
    document.getElementById('taxable-monthly').textContent = (taxableIncome / 12);
    document.getElementById('taxable-weekly').textContent = (taxableIncome / 52);

    document.getElementById('tax-yearly').textContent = (incomeTax);
    document.getElementById('tax-monthly').textContent = (incomeTax / 12);
    document.getElementById('tax-weekly').textContent = (incomeTax / 52);

    document.getElementById('ni-yearly').textContent = (nationalInsurance);
    document.getElementById('ni-monthly').textContent = (nationalInsurance / 12);
    document.getElementById('ni-weekly').textContent = (nationalInsurance / 52);

    document.getElementById('take-home-yearly').textContent = (takeHomePay);
    document.getElementById('take-home-monthly').textContent = (takeHomePay / 12);
    document.getElementById('take-home-weekly').textContent = (takeHomePay / 52);
}