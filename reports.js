/*
    ==========================================
    REPORTES AMBIENTALES
    ==========================================
*/


// ==========================================
// CREAR REPORTE
// ==========================================

function handleCreateReport(e) {

    e.preventDefault();


    const type = document
        .getElementById('reportType')
        .value;

    const location = document
        .getElementById('reportLocation')
        .value
        .trim();

    const desc = document
        .getElementById('reportDesc')
        .value
        .trim();


    // Validación

    if (!type || !location || !desc) {

        showAlert(
            'Debe diligenciar todos los campos obligatorios.',
            'error'
        );

        return;
    }


    // Nuevo reporte

    const newReport = {

        id: Date.now().toString(),

        userId: currentUser.id,

        userName: currentUser.name,

        type,

        location,

        desc,

        status: 'Pendiente',

        date: new Date()
            .toISOString()
            .split('T')[0],

        comments: []

    };


    reports.unshift(newReport);

    saveData();


    // Cerrar modal

    toggleModal(
        'modal-report',
        false
    );


    showAlert(
        'Reporte registrado correctamente.',
        'success'
    );


    renderStudentReports();

}


// ==========================================
// REPORTES DEL ESTUDIANTE
// ==========================================

function renderStudentReports() {

    const container =
        document.getElementById(
            'studentReportsList'
        );

    const countBadge =
        document.getElementById(
            'studentReportCount'
        );


    const myReports = reports.filter(
        report =>
            report.userId === currentUser.id
    );


    countBadge.textContent =
        `${myReports.length} reportes`;


    // Sin reportes

    if (myReports.length === 0) {

        container.innerHTML = `

            <div class="p-12 text-center space-y-3">

                <div class="inline-flex p-4 bg-slate-100 text-slate-400 rounded-full">

                    <i class="ph-bold ph-folder-open text-3xl"></i>

                </div>

                <h4 class="font-bold text-slate-700">
                    No tienes reportes registrados
                </h4>

                <p class="text-xs text-slate-400 max-w-sm mx-auto">
                    Cuando registres un problema ambiental en la plataforma,
                    podrás consultar su estado y los comentarios del administrador aquí.
                </p>

            </div>

        `;

        return;
    }


    // Renderizar reportes

    container.innerHTML = myReports
        .map(report => `

            <div class="p-6 space-y-3">

                <div class="flex justify-between items-start">

                    <div>

                        <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            ${report.type}
                        </span>

                        <h4 class="font-bold text-slate-800 mt-1 text-base">
                            ${report.location}
                        </h4>

                    </div>

                    ${getStatusBadge(report.status)}

                </div>


                <p class="text-sm text-slate-600">
                    ${report.desc}
                </p>


                <div class="text-xs text-slate-400 flex items-center justify-between pt-1">

                    <span>

                        <i class="ph-bold ph-calendar-blank mr-1"></i>

                        Fecha de registro:

                        <strong>
                            ${report.date}
                        </strong>

                    </span>

                </div>


                ${
                    report.comments &&
                    report.comments.length > 0
                        ? `

                        <div class="bg-brand-50/50 border border-brand-100 p-3.5 rounded-xl mt-3 space-y-1.5">

                            <span class="text-xs font-bold text-brand-900 flex items-center">

                                <i class="ph-bold ph-chat-circle-dots mr-1.5 text-brand-600"></i>

                                Comentarios del Administrador:

                            </span>

                            ${report.comments
                                .map(
                                    comment =>
                                        `<p class="text-xs text-slate-700 pl-5">
                                            • ${comment}
                                        </p>`
                                )
                                .join('')}

                        </div>

                    `
                        : ''
                }

            </div>

        `)
        .join('');

}


// ==========================================
// REPORTES DEL ADMINISTRADOR
// ==========================================

function renderAdminReports() {

    const container =
        document.getElementById(
            'adminReportsList'
        );


    // No existen reportes

    if (reports.length === 0) {

        container.innerHTML = `

            <div class="p-8 text-center text-slate-400 text-sm">

                No existen reportes registrados en la plataforma.

            </div>

        `;

        return;
    }


    // Renderizar

    container.innerHTML = reports
        .map(report => `

            <div class="p-6 space-y-3">

                <div class="flex justify-between items-start">

                    <div>

                        <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            ${report.type}
                        </span>

                        <h4 class="font-bold text-slate-800 mt-1">
                            ${report.location}
                        </h4>

                        <p class="text-xs text-slate-400">

                            Estudiante:
                            <strong>
                                ${report.userName}
                            </strong>

                            |

                            Fecha:
                            ${report.date}

                        </p>

                    </div>


                    <div class="flex items-center space-x-3">

                        ${getStatusBadge(report.status)}

                        <button
                            onclick="openAdminEditModal('${report.id}')"
                            class="text-xs bg-slate-800 hover:bg-slate-900 text-white font-medium px-3 py-1.5 rounded-lg transition"
                        >
                            Cambiar Estado
                        </button>

                    </div>

                </div>


                <p class="text-sm text-slate-600">
                    ${report.desc}
                </p>


                ${
                    report.comments &&
                    report.comments.length > 0
                        ? `

                        <div class="bg-slate-50 border border-slate-100 p-3 rounded-lg mt-2">

                            <span class="text-xs font-bold text-slate-700 block mb-1">
                                Observaciones registradas:
                            </span>

                            ${report.comments
                                .map(
                                    comment =>
                                        `<p class="text-xs text-slate-600">
                                            • ${comment}
                                        </p>`
                                )
                                .join('')}

                        </div>

                    `
                        : ''
                }

            </div>

        `)
        .join('');

}


// ==========================================
// ABRIR MODAL DE ADMINISTRACIÓN
// ==========================================

function openAdminEditModal(id) {

    const report = reports.find(
        report => report.id === id
    );


    if (!report) {
        return;
    }


    document
        .getElementById('adminActiveReportId')
        .value = id;


    document
        .getElementById('adminStatusSelect')
        .value = report.status;


    document
        .getElementById('adminComment')
        .value = '';


    toggleModal(
        'modal-admin-edit',
        true
    );

}


// ==========================================
// ACTUALIZAR ESTADO
// ==========================================

function handleUpdateReportStatus(e) {

    e.preventDefault();


    const id = document
        .getElementById('adminActiveReportId')
        .value;


    const newStatus = document
        .getElementById('adminStatusSelect')
        .value;


    const comment = document
        .getElementById('adminComment')
        .value
        .trim();


    const report = reports.find(
        report => report.id === id
    );


    if (!report) {
        return;
    }


    report.status = newStatus;


    if (comment) {

        report.comments.push(comment);

    }


    saveData();


    toggleModal(
        'modal-admin-edit',
        false
    );


    showAlert(
        'Estado del reporte actualizado.',
        'success'
    );


    renderAdminReports();

    renderDashboard();

}