/*
let chart = null;

function initializeChart() {
    const ctx = document.getElementById('stock-chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Precio de Cierre',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolution of the stock price'
                }
            },
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

async function updateChart() {
    const stock = document.getElementById('stock-select').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    try {
        const response = await fetch(`/api/stock-data?symbol=${stock}&start=${startDate}&end=${endDate}`);
        const data = await response.json();

        chart.data.labels = data.dates;
        chart.data.datasets[0].data = data.prices;
        chart.data.datasets[0].label = `${stock} - Close Price`;
        chart.update();
    } catch (error) {
        console.error('Error al obtener datos:', error);
        alert('Error al cargar los datos de la acción');
    }
}

// Inicializar fechas
const today = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(today.getFullYear() - 1);

document.getElementById('end-date').value = today.toISOString().split('T')[0];
document.getElementById('start-date').value = oneYearAgo.toISOString().split('T')[0];

// Inicializar gráfico y eventos
initializeChart();

document.getElementById('stock-select').addEventListener('change', updateChart);
document.getElementById('start-date').addEventListener('change', updateChart);
document.getElementById('end-date').addEventListener('change', updateChart);

// Cargar datos iniciales
updateChart();



*/

/*

let chart = null;

// Función para calcular la línea de tendencia
function calculateTrendline(dates, prices) {
    const xPoints = Array.from(Array(dates.length).keys());
    const n = xPoints.length;
    
    // Calcular medias
    const xMean = xPoints.reduce((a, b) => a + b, 0) / n;
    const yMean = prices.reduce((a, b) => a + b, 0) / n;
    
    // Calcular coeficientes de regresión
    let numerator = 0;
    let denominator = 0;
    
    for (let i = 0; i < n; i++) {
        numerator += (xPoints[i] - xMean) * (prices[i] - yMean);
        denominator += Math.pow(xPoints[i] - xMean, 2);
    }
    
    const slope = numerator / denominator;
    const intercept = yMean - (slope * xMean);
    
    // Generar puntos de la línea de tendencia
    return xPoints.map(x => slope * x + intercept);
}

function initializeChart() {
    const ctx = document.getElementById('stock-chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Precio de Cierre',
                    data: [],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
                {
                    label: 'Línea de Tendencia',
                    data: [],
                    borderColor: 'rgba(255, 99, 132, 0.8)',
                    borderDash: [5, 5],
                    tension: 0,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolución del Precio de la Acción'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const datasetLabel = context.dataset.label || '';
                            const value = context.parsed.y;
                            return `${datasetLabel}: $${value.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(2);
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function updateTable(dates, prices) {
    const tbody = document.getElementById('stock-data-body');
    tbody.innerHTML = '';

    // Calcular variaciones porcentuales
    const variations = prices.map((price, index) => {
        if (index === 0) return '-';
        const prevPrice = prices[index - 1];
        const variation = ((price - prevPrice) / prevPrice) * 100;
        return variation.toFixed(2);
    });

    // Crear filas de la tabla
    dates.forEach((date, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date}</td>
            <td>$${prices[index].toFixed(2)}</td>
            <td>${variations[index] === '-' ? '-' : variations[index] + '%'}</td>
        `;
        tbody.appendChild(row);
    });
}

async function updateChart() {
    const stock = document.getElementById('stock-select').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    try {
        const response = await fetch(`/api/stock-data?symbol=${stock}&start=${startDate}&end=${endDate}`);
        const data = await response.json();

        // Calcular línea de tendencia
        const trendlineData = calculateTrendline(data.dates, data.prices);

        // Actualizar datos del gráfico
        chart.data.labels = data.dates;
        chart.data.datasets[0].data = data.prices;
        chart.data.datasets[1].data = trendlineData;
        chart.data.datasets[0].label = `${stock} - Precio de Cierre`;
        chart.update();

        // Actualizar la tabla
        updateTable(data.dates, data.prices);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        alert('Error al cargar los datos de la acción');
    }
}

// Inicializar fechas
const today = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(today.getFullYear() - 1);

document.getElementById('end-date').value = today.toISOString().split('T')[0];
document.getElementById('start-date').value = oneYearAgo.toISOString().split('T')[0];

// Inicializar gráfico y eventos
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();

    document.getElementById('stock-select').addEventListener('change', updateChart);
    document.getElementById('start-date').addEventListener('change', updateChart);
    document.getElementById('end-date').addEventListener('change', updateChart);

    // Cargar datos iniciales
    updateChart();
});

*/

let chart = null;

// Función para calcular la línea de tendencia
function calculateTrendline(dates, prices) {
    const xPoints = Array.from(Array(dates.length).keys());
    const n = xPoints.length;
    
    // Calcular medias
    const xMean = xPoints.reduce((a, b) => a + b, 0) / n;
    const yMean = prices.reduce((a, b) => a + b, 0) / n;
    
    // Calcular coeficientes de regresión
    let numerator = 0;
    let denominator = 0;
    
    for (let i = 0; i < n; i++) {
        numerator += (xPoints[i] - xMean) * (prices[i] - yMean);
        denominator += Math.pow(xPoints[i] - xMean, 2);
    }
    
    const slope = numerator / denominator;
    const intercept = yMean - (slope * xMean);
    
    // Generar puntos de la línea de tendencia
    return xPoints.map(x => slope * x + intercept);
}

function initializeChart() {
    const ctx = document.getElementById('stock-chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Precio de Cierre',
                    data: [],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
                {
                    label: 'Línea de Tendencia',
                    data: [],
                    borderColor: 'rgba(255, 99, 132, 0.8)',
                    borderDash: [5, 5],
                    tension: 0,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolución del Precio de la Acción'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const datasetLabel = context.dataset.label || '';
                            const value = context.parsed.y;
                            return `${datasetLabel}: $${value.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(2);
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function updateTable(dates, prices) {
    const tbody = document.getElementById('stock-data-body');
    tbody.innerHTML = '';

    // Calcular variaciones porcentuales
    const variations = prices.map((price, index) => {
        if (index === 0) return '-';
        const prevPrice = prices[index - 1];
        const variation = ((price - prevPrice) / prevPrice) * 100;
        return variation.toFixed(2);
    });

    // Crear filas de la tabla
    dates.forEach((date, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date}</td>
            <td>$${prices[index].toFixed(2)}</td>
            <td>${variations[index] === '-' ? '-' : variations[index] + '%'}</td>
        `;
        tbody.appendChild(row);
    });
}

// Función para mostrar/ocultar el indicador de carga
function toggleLoading(show) {
    const chartContainer = document.getElementById('chart-container');
    let loadingElement = document.getElementById('loading-indicator');
    
    if (show) {
        if (!loadingElement) {
            loadingElement = document.createElement('div');
            loadingElement.id = 'loading-indicator';
            loadingElement.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background-color: rgba(255, 255, 255, 0.8);
                padding: 20px;
                border-radius: 5px;
                z-index: 1000;
            `;
            loadingElement.textContent = 'Cargando datos...';
            chartContainer.appendChild(loadingElement);
        }
        loadingElement.style.display = 'block';
    } else if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

async function updateChart() {
    const stock = document.getElementById('stock-select').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    // Mostrar indicador de carga
    toggleLoading(true);

    try {
        //const response = await fetch(`/api/stock-data?symbol=${stock}&start=${startDate}&end=${endDate}`);
        //Conexion a Render
        const response = await fetch(`https://stock-viewer-api.onrender.com/api/stock-data?symbol=${stock}&start=${startDate}&end=${endDate}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (!data.dates || !data.prices || data.dates.length === 0) {
            throw new Error('No hay datos disponibles para el período seleccionado');
        }

        // Calcular línea de tendencia
        const trendlineData = calculateTrendline(data.dates, data.prices);

        // Actualizar datos del gráfico
        chart.data.labels = data.dates;
        chart.data.datasets[0].data = data.prices;
        chart.data.datasets[1].data = trendlineData;
        chart.data.datasets[0].label = `${stock} - Precio de Cierre`;
        chart.update();

        // Actualizar la tabla
        updateTable(data.dates, data.prices);
    } catch (error) {
        console.error('Error al obtener datos:', error);
        // Solo mostrar alerta si es un error que el usuario necesita saber
        if (error.message.includes('No hay datos disponibles')) {
            alert(error.message);
        }
    } finally {
        // Ocultar indicador de carga
        toggleLoading(false);
    }
}

// Inicializar fechas
const today = new Date();
const oneYearAgo = new Date();
oneYearAgo.setFullYear(today.getFullYear() - 1);

document.getElementById('end-date').value = today.toISOString().split('T')[0];
document.getElementById('start-date').value = oneYearAgo.toISOString().split('T')[0];

// Inicializar gráfico y eventos
document.addEventListener('DOMContentLoaded', () => {
    initializeChart();

    document.getElementById('stock-select').addEventListener('change', updateChart);
    document.getElementById('start-date').addEventListener('change', updateChart);
    document.getElementById('end-date').addEventListener('change', updateChart);

    // Cargar datos iniciales
    updateChart();
});

