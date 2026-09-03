/*
    ==========================================
    INTERFAZ DE USUARIO
    ==========================================
*/


// ==========================================
// BADGE DE ESTADO
// ==========================================

function getStatusBadge(status) {

    if (status === 'Pendiente') {

        return `
            <span class="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-bold">
                Pendiente
            </span>
        `;

    }

    if (status === 'En proceso') {

        return `
            <span class="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-bold">
                En proceso
            </span>
        `;

    }

    if (status === 'Solucionado') {

        return `
            <span class="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold">
                Solucionado
            </span>
        `;

    }

    return '';
}


// ==========================================
// MOSTRAR / OCULTAR MODAL
// ==========================================

function toggleModal(modalId, show) {

    const modal = document.getElementById(modalId);

    if (!modal) {
        return;
    }

    if (show) {

        modal.classList.remove('hidden');

    } else {

        modal.classList.add('hidden');

    }

}


// ==========================================
// ALERTAS
// ==========================================

function showAlert(msg, type) {

    const container = document.getElementById(
        'alertContainer'
    );

    const alert = document.createElement('div');

    alert.className = `
        p-4
        rounded-xl
        text-sm
        shadow-lg
        border
        text-white
        flex
        items-center
        justify-between
        mb-2
        transition-all
        ${
            type === 'success'
                ? 'bg-emerald-600 border-emerald-500'
                : 'bg-red-600 border-red-500'
        }
    `;

    alert.innerHTML = `
        <span>${msg}</span>

        <button
            onclick="this.parentElement.remove()"
            class="ml-4 font-bold"
        >
            &times;
        </button>
    `;

    container.appendChild(alert);

    setTimeout(() => {

        if (alert.parentElement) {
            alert.remove();
        }

    }, 4000);

}