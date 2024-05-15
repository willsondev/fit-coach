 let totalDays; // Declarar la variable global

    window.onload = function () {
      generateCalendar();
    };

    function generateCalendar() {
      const calendar = document.getElementById('calendar');
      const currentDate = new Date();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0).getDate(); // Obtener el último día del mes
      const firstDayWeek = firstDayOfMonth.getDay();
      totalDays = lastDayOfMonth; // Asignar el valor a la variable global

      // Limpiar el calendario
      calendar.innerHTML = '';

      for (let i = 0; i < firstDayWeek; i++) {
        let blankDay = document.createElement("div");
        calendar.appendChild(blankDay);
      }

      for (let day = 1; day <= totalDays; day++) {
        let daySquare = document.createElement("div");
        daySquare.className = "calendar-day";
        daySquare.textContent = day;
        daySquare.id = `day-${day}`; // Ajustar el id para que comience desde 1
        calendar.appendChild(daySquare);
      }
    }

    function showAddTaskModal() {
      document.getElementById("addTaskModal").style.display = "block";
    }

    function closeAddTaskModal() {
      document.getElementById("addTaskModal").style.display = "none";
    }

    function deleteTask(taskElement) {
      if (confirm("¿Estás seguro de eliminar la tarea?")) {
        taskElement.parentNode.removeChild(taskElement);
      }
    }

    function editTask(taskElement) {
      const newTaskDesc = prompt("Edita tu tarea:", taskElement.textContent);
      if (newTaskDesc !== null && newTaskDesc.trim() !== "") {
        taskElement.textContent = newTaskDesc;
      }
    }

    function addTask() {
      const taskDateInput = document.getElementById("task-date");
      const taskDesc = document.getElementById("task-desc").value.trim();

      // Validar que la descripción de la tarea no esté vacía
      if (taskDesc === "") {
        alert("Por favor, ingresa una descripción de la tarea.");
        return;
      }

      // Obtener la fecha de la tarea del campo de fecha
      const taskDate = moment(taskDateInput.value, "YYYY-MM-DD", true);

      // Validar que se haya ingresado una fecha válida
      if (!taskDate.isValid()) {
        alert("Por favor, ingresa una fecha válida para la tarea.");
        return;
      }

      // Obtener el día de la fecha seleccionada
      const taskDay = taskDate.date();

      // Validar que el día de la tarea sea menor o igual que el número de días del mes
      if (taskDay > totalDays) {
        alert("El día seleccionado no está disponible en el calendario actual.");
        return;
      }

      // Buscar el elemento del calendario correspondiente al día de la tarea
      const calendarDayElement = document.getElementById(`day-${taskDay}`);

      // Si no se encuentra el elemento del día en el calendario, mostrar un mensaje de error
      if (!calendarDayElement) {
        alert("El día seleccionado no está disponible en el calendario actual.");
        return;
      }

      // Crear el elemento de la tarea
      const taskElement = document.createElement("div");
      taskElement.className = "task";
      taskElement.textContent = taskDesc;

      // Añadir evento de click para editar la tarea
      taskElement.addEventListener("click", function () {
        editTask(taskElement);
      });

      // Añadir evento de click derecho para eliminar la tarea
      taskElement.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        deleteTask(taskElement);
      });

      // Agregar la tarea al día correspondiente en el calendario
      calendarDayElement.appendChild(taskElement);

      // Cerrar el modal de agregar tarea
      closeAddTaskModal();
    }