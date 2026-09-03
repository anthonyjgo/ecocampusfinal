/*
    ==========================================
    DASHBOARD ADMINISTRADOR
    ==========================================
*/


function renderDashboard() {

    // ==========================================
    // CONTADORES
    // ==========================================

    const total = reports.length;


    const pending = reports.filter(
        report =>
            report.status === 'Pendiente'
    ).length;


    const inProcess = reports.filter(
        report =>
            report.status === 'En proceso'
    ).length;


    const solved = reports.filter(
        report =>
            report.status === 'Solucionado'
    ).length;


    // ==========================================
    // MOSTRAR CONTADORES
    // ==========================================

    document.getElementById(
        'statTotal'
    ).textContent = total;


    document.getElementById(
        'statPending'
    ).textContent = pending;


    document.getElementById(
        'statInProcess'
    ).textContent = inProcess;


    document.getElementById(
        'statSolved'
    ).textContent = solved;


    // ==========================================
    // CONTAR TIPOS
    // ==========================================

    const typesCount = {};


    reports.forEach(report => {

        typesCount[report.type] =
            (typesCount[report.type] || 0) + 1;

    });


    // ==========================================
    // GRÁFICO DE ESTADOS
    // ==========================================

    const statusCanvas =
        document.getElementById(
            'chartStatus'
        );


    if (!statusCanvas) {
        return;
    }


    const ctxStatus =
        statusCanvas.getContext('2d');


    if (chartStatusInstance) {

        chartStatusInstance.destroy();

    }


    chartStatusInstance = new Chart(
        ctxStatus,
        {

            type: 'doughnut',

            data: {

                labels: [
                    'Pendiente',
                    'En proceso',
                    'Solucionado'
                ],

                datasets: [

                    {

                        data: [
                            pending,
                            inProcess,
                            solved
                        ],

                        backgroundColor: [
                            '#f59e0b',
                            '#3b82f6',
                            '#10b981'
                        ]

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false

            }

        }
    );


    // ==========================================
    // GRÁFICO DE TIPOS
    // ==========================================

    const typesCanvas =
        document.getElementById(
            'chartTypes'
        );


    if (!typesCanvas) {
        return;
    }


    const ctxTypes =
        typesCanvas.getContext('2d');


    if (chartTypesInstance) {

        chartTypesInstance.destroy();

    }


    chartTypesInstance = new Chart(
        ctxTypes,
        {

            type: 'bar',

            data: {

                labels:
                    Object.keys(typesCount),

                datasets: [

                    {

                        label:
                            'Número de Reportes',

                        data:
                            Object.values(typesCount),

                        backgroundColor:
                            '#22c55e'

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {

                            stepSize: 1

                        }

                    }

                }

            }

        }
    );

}