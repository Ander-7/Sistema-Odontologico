let patients = JSON.parse(localStorage.getItem('patients')) || [];
const patientTable = document.getElementById('patientTable').getElementsByTagName('tbody')[0];


function renderTable(filteredPatients = patients) {
	patientTable.innerHTML = '';
	filteredPatients.forEach((patient, index) => {
		const row = patientTable.insertRow();
		row.innerHTML = `
			<td>${patient.name}</td>
			<td>${patient.email}</td>
			<td>${patient.address}</td>
			<td>${patient.phone}</td>
			<td>${patient.age}</td>
			<td>${patient.dni}</td>
			<td>
				<button class="btn btn-info edit" data-index="${index}">Editar</button>
				<button class="btn btn-danger delete" data-index="${index}">Eliminar</button>
			</td>
		`;
	});
}

// Función para guardar los datos en localStorage
function savePatients() {
	localStorage.setItem('patients', JSON.stringify(patients));
}

// Agregar paciente
document.getElementById('addPatientForm').addEventListener('submit', function (e) {
	e.preventDefault();
	const newPatient = {
		name: document.getElementById('patientName').value,
		email: document.getElementById('patientEmail').value,
		address: document.getElementById('patientAddress').value,
		phone: document.getElementById('patientPhone').value,
		age: document.getElementById('patientAge').value,
		dni: document.getElementById('patientDNI').value
	};
	patients.push(newPatient);
	savePatients();
	renderTable();
	$('#addEmployeeModal').modal('hide');
	this.reset();
});

// Editar paciente
patientTable.addEventListener('click', function (e) {
	if (e.target.classList.contains('edit')) {
		const index = e.target.dataset.index;
		const patient = patients[index];
		document.getElementById('editPatientId').value = index;
		document.getElementById('editPatientName').value = patient.name;
		document.getElementById('editPatientEmail').value = patient.email;
		document.getElementById('editPatientAddress').value = patient.address;
		document.getElementById('editPatientPhone').value = patient.phone;
		document.getElementById('editPatientAge').value = patient.age;
		document.getElementById('editPatientDNI').value = patient.dni;
		$('#editEmployeeModal').modal('show');
	}
});

// Guardar cambios de paciente editado
document.getElementById('editPatientForm').addEventListener('submit', function (e) {
	e.preventDefault();
	const index = document.getElementById('editPatientId').value;
	patients[index] = {
		name: document.getElementById('editPatientName').value,
		email: document.getElementById('editPatientEmail').value,
		address: document.getElementById('editPatientAddress').value,
		phone: document.getElementById('editPatientPhone').value,
		age: document.getElementById('editPatientAge').value,
		dni: document.getElementById('editPatientDNI').value
	};
	savePatients();
	renderTable();
	$('#editEmployeeModal').modal('hide');
});

// Eliminar paciente
patientTable.addEventListener('click', function (e) {
	if (e.target.classList.contains('delete')) {
		const index = e.target.dataset.index;
		if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
			patients.splice(index, 1);
			savePatients();
			renderTable();
		}
	}
});

// Función de búsqueda
document.getElementById('dniSearch').addEventListener('input', function() {
	const searchValue = this.value.toLowerCase();
	const filteredPatients = patients.filter(patient => patient.dni.toLowerCase().includes(searchValue));
	renderTable(filteredPatients);
});


renderTable();
