/*
    ==========================================
    PERFIL DE USUARIO
    ==========================================
*/


// ==========================================
// CARGAR DATOS DEL PERFIL
// ==========================================

function loadProfileData() {

    document.getElementById(
        'profileName'
    ).value =
        currentUser.name || '';


    document.getElementById(
        'profileDisplayName'
    ).textContent =
        currentUser.name || 'Usuario';


    document.getElementById(
        'profileDisplayRole'
    ).textContent =
        currentUser.role || 'Rol';


    document.getElementById(
        'profileAvatar'
    ).textContent =
        currentUser.name
            ? currentUser.name
                .charAt(0)
                .toUpperCase()
            : 'U';

}


// ==========================================
// ACTUALIZAR PERFIL
// ==========================================

function handleUpdateProfile(e) {

    e.preventDefault();


    const newName =
        document
            .getElementById('profileName')
            .value
            .trim();


    const newPass =
        document
            .getElementById('profilePass')
            .value
            .trim();


    // Actualizar nombre

    if (newName) {

        currentUser.name =
            newName;

    }


    // Actualizar contraseña

    if (newPass) {

        currentUser.pass =
            newPass;

    }


    // Buscar usuario

    const index =
        users.findIndex(
            user =>
                user.id === currentUser.id
        );


    if (index !== -1) {

        users[index] =
            currentUser;

    }


    // Guardar

    saveData();


    showAlert(
        'Perfil actualizado correctamente.',
        'success'
    );


    router(
        currentUser.role
    );

}