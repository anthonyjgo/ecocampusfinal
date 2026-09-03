/*
    ==========================================
    DATOS Y ESTADO GLOBAL
    ==========================================
*/


// ==========================================
// USUARIOS
// ==========================================

let users = JSON.parse(
    localStorage.getItem('eco_users')
) || [

    {
        id: '1',
        name: 'Administrador General',
        email: 'admin@campus.edu',
        pass: 'admin123',
        role: 'admin'
    },

    {
        id: '2',
        name: 'Carlos Bonadiez',
        email: 'estudiante@campus.edu',
        pass: '123456',
        role: 'estudiante'
    }

];


// ==========================================
// REPORTES
// ==========================================

let reports = JSON.parse(
    localStorage.getItem('eco_reports')
) || [

    {
        id: '101',
        userId: '2',
        userName: 'Carlos Bonadiez',
        type: 'Fuga de Agua',
        location: 'Bloque B - Baños del 1er piso',
        desc: 'Tubería rota generando desperdicio constante de agua.',
        status: 'Pendiente',
        date: '2026-08-13',
        comments: []
    },

    {
        id: '102',
        userId: '2',
        userName: 'Carlos Bonadiez',
        type: 'Residuos / Basura',
        location: 'Cafetería Central',
        desc: 'Acumulación de envases plásticos fuera del contenedor.',
        status: 'En proceso',
        date: '2026-08-14',
        comments: [
            'Personal de aseo programado para la jornada de la tarde.'
        ]
    }

];


// ==========================================
// USUARIO ACTUAL
// ==========================================

let currentUser = JSON.parse(
    localStorage.getItem('eco_current_user')
) || null;


// ==========================================
// INSTANCIAS DE GRÁFICOS
// ==========================================

let chartStatusInstance = null;
let chartTypesInstance = null;


// ==========================================
// GUARDAR DATOS
// ==========================================

function saveData() {

    localStorage.setItem(
        'eco_users',
        JSON.stringify(users)
    );

    localStorage.setItem(
        'eco_reports',
        JSON.stringify(reports)
    );

    localStorage.setItem(
        'eco_current_user',
        JSON.stringify(currentUser)
    );

}