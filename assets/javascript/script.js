// Code to link the calculate button to the function to calculate the 'Take-Home Pay'
document.getElementById('calculate-button').addEventListener('click', calculateTakeHomePay);


// Code to configure the 'Take-Home Pay' calculation function
function calculateTakeHomePay() {
    const grossIncome = parseFloat(document.getElementById('gross-income').value);
    if (isNaN(grossIncome) || grossIncome <= 0) {
        alert('Please enter a valid gross income.');
        return;
    }

    // Code to combine all following functions together to create the main function
    let personalAllowance = calculatePersonalAllowance(grossIncome);
    let taxableIncome = calculateTaxableIncome(grossIncome, personalAllowance);
    let incomeTax = calculateIncomeTax(grossIncome, taxableIncome, personalAllowance);
    let nationalInsurance = calculateNationalInsurance(grossIncome);
    let takeHomePay = calculateTakeHomePayAmount(grossIncome, incomeTax, nationalInsurance);

    displayResults(grossIncome, personalAllowance, taxableIncome, incomeTax, nationalInsurance, takeHomePay);
}


// Code to calculate personal allowance, deduct £1 from personal allowance for every £2 over £100,000 earned
function calculatePersonalAllowance(grossIncome) {
    let personalAllowance = 12570;

    // If salary is over £100,000
    if (grossIncome > 100000) {

    // Subtract £100,000 from salary to get excess income
    let excessIncome = grossIncome - 100000;

    // Divide excess income by 2
    let allowanceReduction = excessIncome / 2;

    // Now subtract the reduction from the personal allowance. The '0' ensures the amount can't go below 0.
    personalAllowance = Math.max(personalAllowance - allowanceReduction, 0);
    }
    return personalAllowance;
}


// Code to calculate taxable income
function calculateTaxableIncome(grossIncome, personalAllowance) {
    return   Math.max(grossIncome - personalAllowance, 0);
}


// Code to calculate income tax
function calculateIncomeTax(grossIncome, taxableIncome, personalAllowance) {
    const basicRateLimit = 50270;
    const higherRateLimit = 125140;
    let incomeTax = 0;

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
    return incomeTax;
}


// Code to calculate National Insurance (simplified)
function calculateNationalInsurance(grossIncome) {
    let nationalInsurance = 0;

    // If salary is more than £12,570
    if (grossIncome > 12570) {
        // National Insurance is 8% of salary between £12,570 and £50,270
        nationalInsurance = Math.min(grossIncome - 12570, 50270 - 12570) * 0.08;

        // If salary is more than £50,270
        if (grossIncome > 50270) {
        // National Insurance is 8% of salary between £12,570 and £50,270, and 2% of salary above that
            nationalInsurance += (grossIncome - 50270) * 0.02;
        }
    }
    return nationalInsurance;
}


// Code to calculate Take-Home pay
function calculateTakeHomePayAmount(grossIncome, incomeTax, nationalInsurance) {
    return grossIncome - incomeTax - nationalInsurance;
}


// Code to display yearly, monthly and weekly values on the table
function displayResults(grossIncome, personalAllowance, taxableIncome, incomeTax, nationalInsurance, takeHomePay) {
    // Code to display 'Gross Salary' data on the results table
    document.getElementById('gross-yearly').textContent = formatCurrency(grossIncome);
    document.getElementById('gross-monthly').textContent = formatCurrency(grossIncome / 12);
    document.getElementById('gross-weekly').textContent = formatCurrency(grossIncome / 52);

    // Code to display 'Personal Allowance' data on the results table
    document.getElementById('personal-allowance-yearly').textContent = formatCurrency(personalAllowance);
    document.getElementById('personal-allowance-monthly').textContent = formatCurrency(personalAllowance / 12);
    document.getElementById('personal-allowance-weekly').textContent = formatCurrency(personalAllowance / 52);

    // Code to display 'Taxable Income' data on the results table
    document.getElementById('taxable-yearly').textContent = formatCurrency(taxableIncome);
    document.getElementById('taxable-monthly').textContent = formatCurrency(taxableIncome / 12);
    document.getElementById('taxable-weekly').textContent = formatCurrency(taxableIncome / 52);

    // Code to display 'Income Tax' deductions data on the results table
    document.getElementById('tax-yearly').textContent = formatCurrency(incomeTax);
    document.getElementById('tax-monthly').textContent = formatCurrency(incomeTax / 12);
    document.getElementById('tax-weekly').textContent = formatCurrency(incomeTax / 52);

    // Code to display 'National Insurance' deductions data on the results table
    document.getElementById('ni-yearly').textContent = formatCurrency(nationalInsurance);
    document.getElementById('ni-monthly').textContent = formatCurrency(nationalInsurance / 12);
    document.getElementById('ni-weekly').textContent = formatCurrency(nationalInsurance / 52);

    // Code to display 'Take-Home Pay' data on the results table
    document.getElementById('take-home-yearly').textContent = formatCurrency(takeHomePay);
    document.getElementById('take-home-monthly').textContent = formatCurrency(takeHomePay / 12);
    document.getElementById('take-home-weekly').textContent = formatCurrency(takeHomePay / 52);
 
    // Code to display a table by removing the 'hidden' class, only when the salary is input and calculate button is pressed
    document.getElementById('results').classList.remove('hidden');
}


// Code to format the results into pound sterling currency
function formatCurrency(number) {
    return '£' + number.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2});
}