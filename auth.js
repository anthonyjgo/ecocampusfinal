/*
    ==========================================
    AUTENTICACIÓN
    ==========================================
*/


// ==========================================
// CAMBIAR PESTAÑA DE AUTENTICACIÓN
// ==========================================

function switchAuthTab(tab) {

    // Resetear pestañas

    document
        .querySelectorAll('.auth-tab')
        .forEach(tabElement => {

            tabElement.classList.remove(
                'border-brand-600',
                'text-brand-600'
            );

            tabElement.classList.add(
                'border-transparent',
                'text-slate-400'
            );

        });


    // Ocultar formularios

    document
        .querySelectorAll('.auth-form')
        .forEach(form => {

            form.classList.add('hidden');

        });


    // Login estudiante

    if (tab === 'login-student') {

        document
            .getElementById('tab-login-student')
            .classList.add(
                'border-brand-600',
                'text-brand-600'
            );

        document
            .getElementById('form-login-student')
            .classList.remove('hidden');

    }


    // Login administrador

    else if (tab === 'login-admin') {

        document
            .getElementById('tab-login-admin')
            .classList.add(
                'border-brand-600',
                'text-brand-600'
            );

        document
            .getElementById('form-login-admin')
            .classList.remove('hidden');

    }


    // Registro

    else if (tab === 'register') {

        document
            .getElementById('tab-register')
            .classList.add(
                'border-brand-600',
                'text-brand-600'
            );

        document
            .getElementById('form-register')
            .classList.remove('hidden');

    }


    // Recuperación

    else if (tab === 'forgot') {

        document
            .getElementById('form-forgot')
            .classList.remove('hidden');

    }

}


// ==========================================
// LOGIN
// ==========================================

function handleLogin(e, role) {

    e.preventDefault();


    const userInput =
        role === 'admin'
            ? document
                .getElementById('loginAdminUser')
                .value
                .trim()
            : document
                .getElementById('loginStudentUser')
                .value
                .trim();


    const passInput =
        role === 'admin'
            ? document
                .getElementById('loginAdminPass')
                .value
                .trim()
            : document
                .getElementById('loginStudentPass')
                .value
                .trim();


    const user = users.find(u =>

        (
            u.email.toLowerCase() ===
                userInput.toLowerCase()
            ||
            u.name.toLowerCase() ===
                userInput.toLowerCase()
        )

        &&

        u.pass === passInput

        &&

        u.role === role

    );


    if (user) {

        currentUser = user;

        saveData();

        showAlert(
            `¡Bienvenido de nuevo, ${user.name}!`,
            'success'
        );

        router(user.role);

    } else {

        showAlert(
            'Credenciales incorrectas o usuario no registrado con este rol.',
            'error'
        );

    }

}


// ==========================================
// REGISTRO
// ==========================================

function handleRegister(e) {

    e.preventDefault();


    const name = document
        .getElementById('regName')
        .value
        .trim();

    const email = document
        .getElementById('regEmail')
        .value
        .trim();

    const pass = document
        .getElementById('regPass')
        .value
        .trim();


    // Validación

    if (!name || !email || !pass) {

        showAlert(
            'Por favor, complete todos los campos obligatorios.',
            'error'
        );

        return;
    }


    // Correo existente

    if (
        users.some(
            u =>
                u.email.toLowerCase() ===
                email.toLowerCase()
        )
    ) {

        showAlert(
            'El correo ingresado ya se encuentra registrado previamente.',
            'error'
        );

        return;
    }


    // Crear usuario

    const newUser = {

        id: Date.now().toString(),

        name,

        email,

        pass,

        role: 'estudiante'

    };


    users.push(newUser);

    saveData();


    showAlert(
        'Registro exitoso. Ahora puede ingresar.',
        'success'
    );


    switchAuthTab('login-student');

}


// ==========================================
// RECUPERAR CONTRASEÑA
// ==========================================

function handleForgot(e) {

    e.preventDefault();


    const email = document
        .getElementById('forgotEmail')
        .value
        .trim();


    const exists = users.some(
        u =>
            u.email.toLowerCase() ===
            email.toLowerCase()
    );


    if (exists) {

        showAlert(
            'Enlace para restablecer la contraseña enviado al correo.',
            'success'
        );

        switchAuthTab('login-student');

    } else {

        showAlert(
            'El correo especificado no pertenece a ningún usuario.',
            'error'
        );

    }

}