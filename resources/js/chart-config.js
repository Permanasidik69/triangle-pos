$(document).ready(function () {
    let salesPurchasesBar = document.getElementById('salesPurchasesChart');
    $.get('/sales-purchases/chart-data', function (response) {
        let salesPurchasesChart = new Chart(salesPurchasesBar, {
            type: 'bar',
            data: {
                labels: response.sales.original.days,
                datasets: [{
                    label: 'Sales',
                    data: response.sales.original.data,
                    backgroundColor: [
                        '#6366F1',
                    ],
                    borderColor: [
                        '#6366F1',
                    ],
                    borderWidth: 1
                },
                    {
                        label: 'Purchases',
                        data: response.purchases.original.data,
                        backgroundColor: [
                            '#A5B4FC',
                        ],
                        borderColor: [
                            '#A5B4FC',
                        ],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });

    let overviewChart = document.getElementById('currentMonthChart');
    $.get('/current-month/chart-data', function (response) {
        let currentMonthChart = new Chart(overviewChart, {
            type: 'doughnut',
            data: {
                labels: ['Sales', 'Purchases', 'Expenses', 'Profit'],
                datasets: [{
                    data: [response.sales, response.purchases, response.expenses, response.profit],
                    backgroundColor: [
                        '#F59E0B',
                        '#0284C7',
                        '#EF4444',
                        '#10B981',
                    ],
                    hoverBackgroundColor: [
                        '#F59E0B',
                        '#0284C7',
                        '#EF4444',
                        '#10B981',
                    ],
                }]
            },
        });
    });

    let applyFilter = function (date) {
        console.log(date.value);
        const month = date.value.substring(5, 7);
        const year = date.value.substring(0, 4);
        console.log(month);

        const lastDay = (y, m) => {
            return new Date(y, m, 0).getDate();
        }

        const startDate = `${date.value}}-01`;
        const endDate = `${date.value}-${lastDay(year, month)}`;

        currentMonthChart.config.data.labels = ['Sales', 'Purchases', 'Expenses', 'Profit'];
        $.get(`/current-month/chart-data?start_date=${startDate}&end_date=${endDate}`, function (response) {
            currentMonthChart.config.data.datasets[0].data = [response.sales, response.purchases, response.expenses, response.profit];
            currentMonthChart.update();
        });
    }

    let paymentChart = document.getElementById('paymentChart');
    $.get('/payment-flow/chart-data', function (response) {
        let cashflowChart = new Chart(paymentChart, {
            type: 'line',
            data: {
                labels: response.months,
                datasets: [
                    {
                        label: 'Payment Sent',
                        data: response.payment_sent,
                        fill: false,
                        borderColor: '#EA580C',
                        tension: 0
                    },
                    {
                        label: 'Payment Received',
                        data: response.payment_received,
                        fill: false,
                        borderColor: '#2563EB',
                        tension: 0
                    },
                ]
            },
        });
    });
});
