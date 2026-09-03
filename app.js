/*
    ==========================================
    APLICACIÓN PRINCIPAL
    ==========================================
*/


// ==========================================
// INICIAR APLICACIÓN
// ==========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        if (currentUser) {

            router(
                currentUser.role
            );

        } else {

            router('auth');

        }

    }
);


// ==========================================
// IR AL INICIO
// ==========================================

function handleNavHome() {

    if (currentUser) {

        router(
            currentUser.role
        );

    } else {

        router('auth');

    }

}


// ==========================================
// ROUTER
// ==========================================

function router(view) {

    // ==========================================
    // VISTAS DISPONIBLES
    // ==========================================

    const views = [
        'auth',
        'student',
        'admin',
        'profile'
    ];


    // Ocultar todas

    views.forEach(viewName => {

        const element =
            document.getElementById(
                `view-${viewName}`
            );


        if (element) {

            element.classList.add(
                'hidden'
            );

        }

    });


    // ==========================================
    // NAVBAR
    // ==========================================

    const navUser =
        document.getElementById(
            'navUserSection'
        );


    // ==========================================
    // AUTENTICACIÓN
    // ==========================================

    if (view === 'auth') {

        document
            .getElementById('view-auth')
            .classList.remove('hidden');


        navUser.classList.add(
            'hidden'
        );


        return;
    }


    // ==========================================
    // USUARIO LOGUEADO
    // ==========================================

    if (!currentUser) {

        router('auth');

        return;
    }


    navUser.classList.remove(
        'hidden'
    );


    document.getElementById(
        'navUserInfo'
    ).textContent =
        `${currentUser.name} (${currentUser.role})`;


    // ==========================================
    // ESTUDIANTE
    // ==========================================

    if (view === 'estudiante') {

        document
            .getElementById('view-student')
            .classList.remove('hidden');


        renderStudentReports();

    }


    // ==========================================
    // ADMINISTRADOR
    // ==========================================

    else if (view === 'admin') {

        document
            .getElementById('view-admin')
            .classList.remove('hidden');


        renderAdminReports();

        renderDashboard();

    }


    // ==========================================
    // PERFIL
    // ==========================================

    else if (view === 'profile') {

        document
            .getElementById('view-profile')
            .classList.remove('hidden');


        loadProfileData();

    }

}


// ==========================================
// CERRAR SESIÓN
// ==========================================

function logout() {

    currentUser = null;


    localStorage.removeItem(
        'eco_current_user'
    );


    router('auth');


    showAlert(
        'Sesión cerrada correctamente.',
        'success'
    );

}