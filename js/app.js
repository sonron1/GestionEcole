
// Application de Gestion Universitaire - Design Moderne
class GestionEcole {
    constructor() {
        this.currentUser = 'Admin';
        this.students = [];
        this.teachers = [];
        this.courses = [];
        this.grades = [];
        this.absences = [];
        this.payments = [];
        this.messages = [];
        this.announcements = [];
        this.currentSection = 'dashboard';
        this.sidebarOpen = true;
        this.init();
    }

    init() {
        // Initialiser les données de démonstration
        this.loadDemoData();

        // Initialiser les événements
        this.initEventListeners();

        // Afficher le tableau de bord par défaut
        this.showSection('dashboard');

        // Initialiser les graphiques
        setTimeout(() => this.initCharts(), 500);
    }

    initEventListeners() {
        // Toggle sidebar
        const sidebarToggle = document.getElementById('sidebarToggle');
        const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');

        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        if (mobileSidebarToggle) {
            mobileSidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // L'onclick sera géré par les fonctions globales
            });
        });

        // Recherche en temps réel
        const searchStudent = document.getElementById('searchStudent');
        if (searchStudent) {
            searchStudent.addEventListener('input', () => this.filterStudents());
        }

        // Responsive
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768) {
                this.sidebarOpen = false;
                document.querySelector('.sidebar').classList.remove('open');
            }
        });

        // Fermer sidebar sur mobile en cliquant ailleurs
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const sidebar = document.querySelector('.sidebar');
                const toggle = document.getElementById('mobileSidebarToggle');

                if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }

    toggleSidebar() {
        if (window.innerWidth <= 768) {
            // Mode mobile
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('open');
        } else {
            // Mode desktop
            this.sidebarOpen = !this.sidebarOpen;
            const sidebar = document.querySelector('.sidebar');
            const mainContent = document.querySelector('.main-content');

            if (this.sidebarOpen) {
                sidebar.classList.remove('collapsed');
                mainContent.style.marginLeft = 'var(--sidebar-width)';
            } else {
                sidebar.classList.add('collapsed');
                mainContent.style.marginLeft = 'var(--sidebar-collapsed-width)';
            }
        }
    }

    showSection(sectionName) {
        // Mettre à jour la navigation active
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Masquer toutes les sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Afficher la section demandée
        const targetSection = document.getElementById(sectionName + '-section');
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;

            // Mettre à jour le titre de la section
            this.updateSectionTitle(sectionName);

            // Charger les données spécifiques à la section
            this.loadSectionData(sectionName);
        }

        // Fermer sidebar sur mobile après navigation
        if (window.innerWidth <= 768) {
            document.querySelector('.sidebar').classList.remove('open');
        }
    }

    updateSectionTitle(sectionName) {
        const titles = {
            'dashboard': 'Tableau de bord',
            'etudiants': 'Gestion des Étudiants',
            'enseignants': 'Gestion des Enseignants',
            'cours': 'Gestion des Cours',
            'notes': 'Notes et Évaluations',
            'absences': 'Gestion des Absences',
            'paiements': 'Gestion des Paiements',
            'communication': 'Communication',
            'documents': 'Documents',
            'rapports': 'Rapports'
        };

        const titleElement = document.getElementById('currentSectionTitle');
        if (titleElement) {
            titleElement.textContent = titles[sectionName] || 'GestionEcole';
        }
    }

    loadSectionData(sectionName) {
        switch(sectionName) {
            case 'dashboard':
                this.updateDashboardStats();
                break;
            case 'etudiants':
                this.loadStudentsTable();
                break;
            case 'enseignants':
                this.loadTeachersTable();
                break;
            case 'cours':
                this.loadCoursesTable();
                break;
            case 'notes':
                this.loadCoursesForGrades();
                break;
            case 'absences':
                this.loadAbsencesTable();
                this.loadCoursesForAbsences();
                break;
            case 'paiements':
                this.loadPaymentsTable();
                break;
            case 'communication':
                this.loadMessages();
                this.loadAnnouncements();
                break;
            case 'rapports':
                this.loadReportsCharts();
                break;
        }
    }

    loadDemoData() {
        // Données d'exemple pour les étudiants
        this.students = [
            {
                id: 1,
                nom: 'Dupont',
                prenom: 'Jean',
                numeroEtudiant: 'ETU001',
                email: 'jean.dupont@email.com',
                telephone: '0123456789',
                dateNaissance: '2000-05-15',
                adresse: '123 Rue de la Paix, Paris',
                nationalite: 'Française',
                departement: 'informatique',
                niveau: 'L3',
                statut: 'Actif',
                photo: 'https://via.placeholder.com/100x100/8B4513/FFFFFF?text=JD'
            },
            {
                id: 2,
                nom: 'Martin',
                prenom: 'Marie',
                numeroEtudiant: 'ETU002',
                email: 'marie.martin@email.com',
                telephone: '0987654321',
                dateNaissance: '1999-08-22',
                adresse: '456 Avenue des Champs, Lyon',
                nationalite: 'Française',
                departement: 'mathematiques',
                niveau: 'M1',
                statut: 'Actif',
                photo: 'https://via.placeholder.com/100x100/A0522D/FFFFFF?text=MM'
            },
            {
                id: 3,
                nom: 'Bernard',
                prenom: 'Pierre',
                numeroEtudiant: 'ETU003',
                email: 'pierre.bernard@email.com',
                telephone: '0654321987',
                dateNaissance: '2001-02-10',
                adresse: '789 Rue du Commerce, Marseille',
                nationalite: 'Française',
                departement: 'physique',
                niveau: 'L2',
                statut: 'Actif',
                photo: 'https://via.placeholder.com/100x100/CD853F/FFFFFF?text=PB'
            },
            {
                id: 4,
                nom: 'Leclerc',
                prenom: 'Sophie',
                numeroEtudiant: 'ETU004',
                email: 'sophie.leclerc@email.com',
                telephone: '0678912345',
                dateNaissance: '2000-11-30',
                adresse: '321 Boulevard Saint-Michel, Nice',
                nationalite: 'Française',
                departement: 'informatique',
                niveau: 'M2',
                statut: 'Actif',
                photo: 'https://via.placeholder.com/100x100/D2B48C/8B4513?text=SL'
            }
        ];

        // Données d'exemple pour les enseignants
        this.teachers = [
            {
                id: 1,
                nom: 'Professeur',
                prenom: 'Alice',
                email: 'alice.professeur@universite.fr',
                telephone: '0123456789',
                departement: 'informatique',
                specialite: 'Intelligence Artificielle',
                statut: 'Actif'
            },
            {
                id: 2,
                nom: 'Docteur',
                prenom: 'Bob',
                email: 'bob.docteur@universite.fr',
                telephone: '0987654321',
                departement: 'mathematiques',
                specialite: 'Analyse Numérique',
                statut: 'Actif'
            },
            {
                id: 3,
                nom: 'Chercheur',
                prenom: 'Claire',
                email: 'claire.chercheur@universite.fr',
                telephone: '0456789123',
                departement: 'physique',
                specialite: 'Physique Quantique',
                statut: 'Actif'
            }
        ];

        // Données d'exemple pour les cours
        this.courses = [
            {
                id: 1,
                code: 'INFO101',
                nom: 'Introduction à la Programmation',
                departement: 'informatique',
                niveau: 'L1',
                credits: 6,
                enseignantId: 1,
                semestre: 1,
                description: 'Cours d\'introduction aux concepts de base de la programmation',
                etudiantsInscrits: 45
            },
            {
                id: 2,
                code: 'MATH201',
                nom: 'Analyse Mathématique',
                departement: 'mathematiques',
                niveau: 'L2',
                credits: 8,
                enseignantId: 2,
                semestre: 1,
                description: 'Cours d\'analyse mathématique avancée',
                etudiantsInscrits: 38
            },
            {
                id: 3,
                code: 'PHYS301',
                nom: 'Physique Quantique',
                departement: 'physique',
                niveau: 'L3',
                credits: 7,
                enseignantId: 3,
                semestre: 2,
                description: 'Introduction à la mécanique quantique',
                etudiantsInscrits: 25
            }
        ];

        // Autres données...
        this.grades = [];
        this.absences = [];
        this.payments = [];
        this.messages = [];
        this.announcements = [];
    }

    updateDashboardStats() {
        // Mettre à jour les statistiques avec animation
        this.animateNumber('total-students', this.students.length);
        this.animateNumber('total-teachers', this.teachers.length);
        this.animateNumber('total-courses', this.courses.length);
        this.animateNumber('active-exams', 12);
    }

    animateNumber(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const currentValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
        const increment = Math.ceil((targetValue - currentValue) / 20);

        if (currentValue < targetValue) {
            element.textContent = (currentValue + increment).toLocaleString();
            setTimeout(() => this.animateNumber(elementId, targetValue), 50);
        } else {
            element.textContent = targetValue.toLocaleString();
        }
    }

    loadStudentsTable() {
        const tbody = document.getElementById('studentsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (this.students.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center" style="padding: 2rem;">
                        <div style="color: var(--gray-500);">
                            <i class="fas fa-users fa-3x mb-3"></i>
                            <p>Aucun étudiant trouvé</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        this.students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${student.photo}" alt="Photo" class="profile-img">
                </td>
                <td>
                    <div style="font-weight: 600;">${student.prenom} ${student.nom}</div>
                    <div style="font-size: 0.8rem; color: var(--gray-500);">${student.email}</div>
                </td>
                <td><span style="font-family: monospace; font-weight: 600;">${student.numeroEtudiant}</span></td>
                <td>${this.formatDepartment(student.departement)}</td>
                <td><span class="badge" style="background: var(--secondary-color); color: var(--primary-color);">${student.niveau}</span></td>
                <td><span class="badge bg-success">${student.statut}</span></td>
                <td>
                    <button class="btn btn-sm" style="background: var(--primary-color); color: white; margin-right: 4px;" onclick="app.viewStudent(${student.id})" title="Voir">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="app.editStudent(${student.id})" title="Modifier" style="margin-right: 4px;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="app.deleteStudent(${student.id})" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadTeachersTable() {
        const tbody = document.getElementById('teachersTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.teachers.forEach(teacher => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div style="font-weight: 600;">${teacher.prenom} ${teacher.nom}</div>
                    <div style="font-size: 0.8rem; color: var(--gray-500);">${teacher.email}</div>
                </td>
                <td>${this.formatDepartment(teacher.departement)}</td>
                <td>${teacher.specialite}</td>
                <td>${teacher.email}</td>
                <td>${teacher.telephone}</td>
                <td><span class="badge bg-success">${teacher.statut}</span></td>
                <td>
                    <button class="btn btn-sm" style="background: var(--primary-color); color: white; margin-right: 4px;" onclick="app.viewTeacher(${teacher.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="app.editTeacher(${teacher.id})" style="margin-right: 4px;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="app.deleteTeacher(${teacher.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    loadCoursesTable() {
        const tbody = document.getElementById('coursesTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.courses.forEach(course => {
            const teacher = this.teachers.find(t => t.id === course.enseignantId);
            const teacherName = teacher ? `${teacher.prenom} ${teacher.nom}` : 'Non assigné';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span style="font-family: monospace; font-weight: 600; color: var(--primary-color);">${course.code}</span></td>
                <td>
                    <div style="font-weight: 600;">${course.nom}</div>
                    <div style="font-size: 0.8rem; color: var(--gray-500);">${course.description || 'Aucune description'}</div>
                </td>
                <td>${teacherName}</td>
                <td>${this.formatDepartment(course.departement)}</td>
                <td><span class="badge" style="background: var(--secondary-color); color: var(--primary-color);">${course.niveau}</span></td>
                <td><span style="font-weight: 600;">${course.credits}</span></td>
                <td>
                    <span style="background: var(--info-color); color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem;">
                        ${course.etudiantsInscrits} étudiants
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm" style="background: var(--primary-color); color: white; margin-right: 4px;" onclick="app.viewCourse(${course.id})" title="Voir">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="app.editCourse(${course.id})" title="Modifier" style="margin-right: 4px;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="app.deleteCourse(${course.id})" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    filterStudents() {
        const searchTerm = document.getElementById('searchStudent')?.value.toLowerCase() || '';
        const filterDept = document.getElementById('filterDepartment')?.value || '';
        const filterNiveau = document.getElementById('filterNiveau')?.value || '';

        const filteredStudents = this.students.filter(student => {
            const matchesSearch = !searchTerm ||
                student.nom.toLowerCase().includes(searchTerm) ||
                student.prenom.toLowerCase().includes(searchTerm) ||
                student.numeroEtudiant.toLowerCase().includes(searchTerm) ||
                student.email.toLowerCase().includes(searchTerm);

            const matchesDept = !filterDept || student.departement === filterDept;
            const matchesNiveau = !filterNiveau || student.niveau === filterNiveau;

            return matchesSearch && matchesDept && matchesNiveau;
        });

        this.displayFilteredStudents(filteredStudents);
    }

    displayFilteredStudents(students) {
        const tbody = document.getElementById('studentsTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        if (students.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center" style="padding: 2rem;">
                        <div style="color: var(--gray-500);">
                            <i class="fas fa-search fa-2x mb-3"></i>
                            <p>Aucun étudiant trouvé pour ces critères</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${student.photo}" alt="Photo" class="profile-img">
                </td>
                <td>
                    <div style="font-weight: 600;">${student.prenom} ${student.nom}</div>
                    <div style="font-size: 0.8rem; color: var(--gray-500);">${student.email}</div>
                </td>
                <td><span style="font-family: monospace; font-weight: 600;">${student.numeroEtudiant}</span></td>
                <td>${this.formatDepartment(student.departement)}</td>
                <td><span class="badge" style="background: var(--secondary-color); color: var(--primary-color);">${student.niveau}</span></td>
                <td><span class="badge bg-success">${student.statut}</span></td>
                <td>
                    <button class="btn btn-sm" style="background: var(--primary-color); color: white; margin-right: 4px;" onclick="app.viewStudent(${student.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="app.editStudent(${student.id})" style="margin-right: 4px;">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="app.deleteStudent(${student.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    initCharts() {
        // Graphique des inscriptions
        const inscriptionsCtx = document.getElementById('inscriptionsChart');
        if (inscriptionsCtx) {
            new Chart(inscriptionsCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                    datasets: [{
                        label: 'Nouvelles inscriptions',
                        data: [120, 190, 150, 250, 220, 300],
                        borderColor: '#8B4513',
                        backgroundColor: 'rgba(139, 69, 19, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#8B4513',
                        pointBorderColor: '#FFFFFF',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: '#737373'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: '#F5F5F5'
                            },
                            ticks: {
                                color: '#737373'
                            }
                        }
                    }
                }
            });
        }

        // Graphique en donut pour les départements
        const departmentCtx = document.getElementById('departmentChart');
        if (departmentCtx) {
            new Chart(departmentCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Informatique', 'Mathématiques', 'Physique'],
                    datasets: [{
                        data: [45, 30, 25],
                        backgroundColor: [
                            '#8B4513',
                            '#A0522D',
                            '#D2B48C'
                        ],
                        borderWidth: 0,
                        hoverOffset: 10
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                color: '#404040'
                            }
                        }
                    }
                }
            });
        }
    }

    // Utilitaires
    formatDepartment(dept) {
        const departments = {
            'informatique': 'Informatique',
            'mathematiques': 'Mathématiques',
            'physique': 'Physique'
        };
        return departments[dept] || dept;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} position-fixed`;
        notification.style.cssText = `
            top: 20px; 
            right: 20px; 
            z-index: 9999; 
            min-width: 350px; 
            box-shadow: var(--shadow-lg);
            border: none;
            animation: slideInRight 0.3s ease-out;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button type="button" style="background: none; border: none; color: inherit; opacity: 0.7; cursor: pointer; margin-left: auto;" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        // Supprimer automatiquement après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'warning': 'exclamation-triangle',
            'danger': 'exclamation-circle',
            'error': 'exclamation-circle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Actions CRUD simplifiées pour la démo
    viewStudent(id) {
        const student = this.students.find(s => s.id === id);
        if (student) {
            this.showNotification(`Consultation du profil de ${student.prenom} ${student.nom}`, 'info');
        }
    }

    editStudent(id) {
        const student = this.students.find(s => s.id === id);
        if (student) {
            this.showNotification(`Édition de ${student.prenom} ${student.nom}`, 'warning');
        }
    }

    deleteStudent(id) {
        const student = this.students.find(s => s.id === id);
        if (student && confirm(`Êtes-vous sûr de vouloir supprimer ${student.prenom} ${student.nom} ?`)) {
            this.students = this.students.filter(s => s.id !== id);
            this.loadStudentsTable();
            this.showNotification('Étudiant supprimé avec succès', 'success');
        }
    }

    viewTeacher(id) {
        const teacher = this.teachers.find(t => t.id === id);
        if (teacher) {
            this.showNotification(`Consultation du profil de ${teacher.prenom} ${teacher.nom}`, 'info');
        }
    }

    editTeacher(id) {
        const teacher = this.teachers.find(t => t.id === id);
        if (teacher) {
            this.showNotification(`Édition de ${teacher.prenom} ${teacher.nom}`, 'warning');
        }
    }

    deleteTeacher(id) {
        const teacher = this.teachers.find(t => t.id === id);
        if (teacher && confirm(`Êtes-vous sûr de vouloir supprimer ${teacher.prenom} ${teacher.nom} ?`)) {
            this.teachers = this.teachers.filter(t => t.id !== id);
            this.loadTeachersTable();
            this.showNotification('Enseignant supprimé avec succès', 'success');
        }
    }

    viewCourse(id) {
        const course = this.courses.find(c => c.id === id);
        if (course) {
            this.showNotification(`Consultation du cours ${course.code} - ${course.nom}`, 'info');
        }
    }

    editCourse(id) {
        const course = this.courses.find(c => c.id === id);
        if (course) {
            this.showNotification(`Édition du cours ${course.code} - ${course.nom}`, 'warning');
        }
    }

    deleteCourse(id) {
        const course = this.courses.find(c => c.id === id);
        if (course && confirm(`Êtes-vous sûr de vouloir supprimer le cours ${course.code} ?`)) {
            this.courses = this.courses.filter(c => c.id !== id);
            this.loadCoursesTable();
            this.showNotification('Cours supprimé avec succès', 'success');
        }
    }

    showAddStudentModal() {
        const modal = new bootstrap.Modal(document.getElementById('addStudentModal'));
        modal.show();
    }

    showAddTeacherModal() {
        this.showNotification('Fonctionnalité d\'ajout d\'enseignant en cours de développement', 'info');
    }

    showAddCourseModal() {
        this.showNotification('Fonctionnalité d\'ajout de cours en cours de développement', 'info');
    }

    addStudent() {
        const form = document.getElementById('addStudentForm');
        const formData = new FormData(form);

        if (!formData.get('nom') || !formData.get('prenom') || !formData.get('email')) {
            this.showNotification('Veuillez remplir tous les champs obligatoires', 'error');
            return;
        }

        const newStudent = {
            id: this.students.length + 1,
            nom: formData.get('nom'),
            prenom: formData.get('prenom'),
            numeroEtudiant: 'ETU' + String(this.students.length + 1).padStart(3, '0'),
            email: formData.get('email'),
            telephone: formData.get('telephone'),
            dateNaissance: formData.get('dateNaissance'),
            adresse: formData.get('adresse'),
            nationalite: formData.get('nationalite'),
            departement: formData.get('departement'),
            niveau: formData.get('niveau'),
            statut: 'Actif',
            photo: `https://via.placeholder.com/100x100/8B4513/FFFFFF?text=${formData.get('prenom')[0]}${formData.get('nom')[0]}`
        };

        this.students.push(newStudent);
        this.loadStudentsTable();

        const modal = bootstrap.Modal.getInstance(document.getElementById('addStudentModal'));
        modal.hide();
        form.reset();

        this.showNotification('Étudiant ajouté avec succès!', 'success');
    }

    generateReport() {
        this.showNotification('Génération du rapport en cours...', 'info');
        setTimeout(() => {
            this.showNotification('Rapport généré avec succès!', 'success');
        }, 2000);
    }

    logout() {
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            this.showNotification('Déconnexion en cours...', 'info');
            setTimeout(() => {
                location.reload();
            }, 1500);
        }
    }

    // Méthodes vides pour éviter les erreurs
    loadCoursesForGrades() {}
    loadAbsencesTable() {}
    loadCoursesForAbsences() {}
    loadPaymentsTable() {}
    loadMessages() {}
    loadAnnouncements() {}
    loadReportsCharts() {}
}

// Fonctions globales
function showSection(sectionName) {
    app.showSection(sectionName);
}

function showAddStudentModal() {
    app.showAddStudentModal();
}

function showAddTeacherModal() {
    app.showAddTeacherModal();
}

function showAddCourseModal() {
    app.showAddCourseModal();
}

function addStudent() {
    app.addStudent();
}

function filterStudents() {
    app.filterStudents();
}

function generateReport() {
    app.generateReport();
}

function logout() {
    app.logout();
}

// Initialiser l'application
const app = new GestionEcole();

// Gérer le redimensionnement de fenêtre
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && app.sidebarOpen) {
        document.querySelector('.sidebar').classList.remove('open');
    }
});

// Ajout des sections manquantes au fichier app.js existant

// Section Notes & Évaluations
function showNotesContent() {
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <div class="section-header">
            <div class="section-title">
                <h1>Notes & Évaluations</h1>
                <p>Gestion des notes et bulletins des étudiants</p>
            </div>
            <div class="section-actions">
                <button class="btn btn-secondary">
                    <i class="fas fa-file-export"></i>
                    Exporter notes
                </button>
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    Saisir notes
                </button>
            </div>
        </div>

        <!-- Statistiques des notes -->
        <div class="stats-grid">
            <div class="stat-card success">
                <div class="stat-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">14.2</div>
                    <div class="stat-label">Moyenne générale</div>
                    <div class="stat-trend positive">
                        <i class="fas fa-arrow-up"></i> +0.3 points
                    </div>
                </div>
            </div>

            <div class="stat-card info">
                <div class="stat-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">89%</div>
                    <div class="stat-label">Taux de réussite</div>
                    <div class="stat-trend positive">
                        <i class="fas fa-arrow-up"></i> +5% ce semestre
                    </div>
                </div>
            </div>

            <div class="stat-card warning">
                <div class="stat-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">45</div>
                    <div class="stat-label">Étudiants en difficulté</div>
                    <div class="stat-trend negative">
                        <i class="fas fa-arrow-down"></i> Moyenne < 10
                    </div>
                </div>
            </div>

            <div class="stat-card primary">
                <div class="stat-icon">
                    <i class="fas fa-clipboard-check"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">156</div>
                    <div class="stat-label">Évaluations saisies</div>
                    <div class="stat-trend neutral">
                        <i class="fas fa-check"></i> Ce mois
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtres pour les notes -->
        <div class="filters-card">
            <div class="filters-grid">
                <div class="filter-item">
                    <label>Rechercher étudiant</label>
                    <div class="input-group">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Nom, prénom ou numéro..." id="searchGrades">
                    </div>
                </div>
                <div class="filter-item">
                    <label>Matière</label>
                    <select class="form-select" id="filterSubject">
                        <option value="">Toutes les matières</option>
                        <option value="mathematiques">Mathématiques</option>
                        <option value="informatique">Informatique</option>
                        <option value="physique">Physique</option>
                        <option value="anglais">Anglais</option>
                    </select>
                </div>
                <div class="filter-item">
                    <label>Niveau</label>
                    <select class="form-select" id="filterGradeLevel">
                        <option value="">Tous les niveaux</option>
                        <option value="L1">Licence 1</option>
                        <option value="L2">Licence 2</option>
                        <option value="L3">Licence 3</option>
                        <option value="M1">Master 1</option>
                        <option value="M2">Master 2</option>
                    </select>
                </div>
                <div class="filter-item">
                    <label>Semestre</label>
                    <select class="form-select" id="filterSemester">
                        <option value="current">Semestre actuel</option>
                        <option value="S1">Semestre 1</option>
                        <option value="S2">Semestre 2</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Graphiques de performance -->
        <div class="dashboard-grid">
            <div class="dashboard-card chart-card">
                <div class="card-header">
                    <h3>Distribution des notes</h3>
                    <div class="card-actions">
                        <button class="btn-card-action" title="Options">
                            <i class="fas fa-cog"></i>
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: var(--gray-50); border-radius: var(--border-radius-md); color: var(--gray-500);">
                        <div style="text-align: center;">
                            <i class="fas fa-chart-bar" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                            <p>Histogramme de distribution des notes</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dashboard-card">
                <div class="card-header">
                    <h3>Top 10 des étudiants</h3>
                </div>
                <div class="card-content">
                    <div class="ranking-list">
                        <div class="ranking-item">
                            <div class="rank-position">1</div>
                            <img src="https://images.unsplash.com/photo-1494790108755-2616b612b494?w=40&h=40&fit=crop&crop=face" class="profile-img" alt="Photo">
                            <div class="rank-info">
                                <div class="rank-name">Sophie Martin</div>
                                <div class="rank-details">L3 Informatique</div>
                            </div>
                            <div class="rank-score">18.5</div>
                        </div>
                        <div class="ranking-item">
                            <div class="rank-position">2</div>
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" class="profile-img" alt="Photo">
                            <div class="rank-info">
                                <div class="rank-name">Thomas Dubois</div>
                                <div class="rank-details">L2 Mathématiques</div>
                            </div>
                            <div class="rank-score">17.8</div>
                        </div>
                        <div class="ranking-item">
                            <div class="rank-position">3</div>
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" class="profile-img" alt="Photo">
                            <div class="rank-info">
                                <div class="rank-name">Emma Laurent</div>
                                <div class="rank-details">L1 Physique</div>
                            </div>
                            <div class="rank-score">17.2</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table des notes récentes -->
        <div class="table-card">
            <div class="table-header">
                <h3>Notes récemment saisies</h3>
                <div class="table-actions">
                    <button class="btn-table-action" title="Filtrer">
                        <i class="fas fa-filter"></i>
                    </button>
                    <button class="btn-table-action" title="Exporter">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
            <div class="table-content">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Étudiant</th>
                            <th>Matière</th>
                            <th>Type d'évaluation</th>
                            <th>Note</th>
                            <th>Coefficient</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b494?w=40&h=40&fit=crop&crop=face" class="profile-img" alt="Photo">
                                    <div>
                                        <div style="font-weight: 600;">Marie Dubois</div>
                                        <div style="font-size: 0.8rem; color: var(--gray-500);">20230001</div>
                                    </div>
                                </div>
                            </td>
                            <td>Mathématiques</td>
                            <td>Partiel</td>
                            <td><span class="grade-score excellent">16.5</span></td>
                            <td>3</td>
                            <td>15/12/2023</td>
                            <td>
                                <button class="btn btn-sm btn-warning" title="Modifier">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-info" title="Détails">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" class="profile-img" alt="Photo">
                                    <div>
                                        <div style="font-weight: 600;">Jean Martin</div>
                                        <div style="font-size: 0.8rem; color: var(--gray-500);">20230002</div>
                                    </div>
                                </div>
                            </td>
                            <td>Informatique</td>
                            <td>Contrôle continu</td>
                            <td><span class="grade-score good">14.0</span></td>
                            <td>2</td>
                            <td>14/12/2023</td>
                            <td>
                                <button class="btn btn-sm btn-warning" title="Modifier">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-info" title="Détails">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Section Absences
function showAbsencesContent() {
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <div class="section-header">
            <div class="section-title">
                <h1>Gestion des Absences</h1>
                <p>Suivi de l'assiduité et des présences</p>
            </div>
            <div class="section-actions">
                <button class="btn btn-secondary">
                    <i class="fas fa-file-export"></i>
                    Rapport absences
                </button>
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    Saisir absence
                </button>
            </div>
        </div>

        <!-- Statistiques des absences -->
        <div class="stats-grid">
            <div class="stat-card primary">
                <div class="stat-icon">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">92%</div>
                    <div class="stat-label">Taux de présence</div>
                    <div class="stat-trend positive">
                        <i class="fas fa-arrow-up"></i> +2% ce mois
                    </div>
                </div>
            </div>

            <div class="stat-card warning">
                <div class="stat-icon">
                    <i class="fas fa-user-times"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">126</div>
                    <div class="stat-label">Absences cette semaine</div>
                    <div class="stat-trend negative">
                        <i class="fas fa-arrow-up"></i> +15%
                    </div>
                </div>
            </div>

            <div class="stat-card danger">
                <div class="stat-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">23</div>
                    <div class="stat-label">Étudiants à risque</div>
                    <div class="stat-trend negative">
                        <i class="fas fa-warning"></i> > 20% d'absences
                    </div>
                </div>
            </div>

            <div class="stat-card info">
                <div class="stat-icon">
                    <i class="fas fa-file-medical"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">34</div>
                    <div class="stat-label">Absences justifiées</div>
                    <div class="stat-trend neutral">
                        <i class="fas fa-check"></i> Cette semaine
                    </div>
                </div>
            </div>
        </div>

        <!-- Filtres absences -->
        <div class="filters-card">
            <div class="filters-grid">
                <div class="filter-item">
                    <label>Période</label>
                    <select class="form-select" id="filterAbsencePeriod">
                        <option value="today">Aujourd'hui</option>
                        <option value="week">Cette semaine</option>
                        <option value="month">Ce mois</option>
                        <option value="semester">Ce semestre</option>
                    </select>
                </div>
                <div class="filter-item">
                    <label>Type d'absence</label>
                    <select class="form-select" id="filterAbsenceType">
                        <option value="">Tous les types</option>
                        <option value="justified">Justifiée</option>
                        <option value="unjustified">Non justifiée</option>
                        <option value="medical">Médicale</option>
                        <option value="administrative">Administrative</option>
                    </select>
                </div>
                <div class="filter-item">
                    <label>Matière</label>
                    <select class="form-select" id="filterAbsenceSubject">
                        <option value="">Toutes les matières</option>
                        <option value="mathematiques">Mathématiques</option>
                        <option value="informatique">Informatique</option>
                        <option value="physique">Physique</option>
                    </select>
                </div>
                <div class="filter-item">
                    <label>Rechercher</label>
                    <div class="input-group">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Nom étudiant..." id="searchAbsence">
                    </div>
                </div>
            </div>
        </div>

        <!-- Graphiques absences -->
        <div class="dashboard-grid">
            <div class="dashboard-card chart-card">
                <div class="card-header">
                    <h3>Évolution des absences</h3>
                </div>
                <div class="card-content">
                    <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: var(--gray-50); border-radius: var(--border-radius-md); color: var(--gray-500);">
                        <div style="text-align: center;">
                            <i class="fas fa-chart-line" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                            <p>Graphique d'évolution des absences par semaine</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dashboard-card">
                <div class="card-header">
                    <h3>Étudiants les plus absents</h3>
                </div>
                <div class="card-content">
                    <div class="absence-list">
                        <div class="absence-item alert">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" class="profile-img" alt="Photo">
                            <div class="absence-info">
                                <div class="absence-name">Pierre Durand</div>
                                <div class="absence-details">L2 Informatique • 28% d'absences</div>
                            </div>
                            <div class="absence-actions">
                                <button class="btn btn-sm btn-warning">
                                    <i class="fas fa-bell"></i>
                                </button>
                            </div>
                        </div>
                        <div class="absence-item warning">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" class="profile-img" alt="Photo">
                            <div class="absence-info">
                                <div class="absence-name">Julie Moreau</div>
                                <div class="absence-details">L1 Mathématiques • 22% d'absences</div>
                            </div>
                            <div class="absence-actions">
                                <button class="btn btn-sm btn-info">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Table des absences -->
        <div class="table-card">
            <div class="table-header">
                <h3>Absences récentes</h3>
                <div class="table-actions">
                    <button class="btn-table-action" title="Justifier en lot">
                        <i class="fas fa-check-double"></i>
                    </button>
                    <button class="btn-table-action" title="Exporter">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
            <div class="table-content">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" id="selectAll">
                            </th>
                            <th>Étudiant</th>
                            <th>Matière</th>
                            <th>Date & Heure</th>
                            <th>Type</th>
                            <th>Statut</th>
                            <th>Justification</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" class="profile-img" alt="Photo">
                                    <div>
                                        <div style="font-weight: 600;">Jean Martin</div>
                                        <div style="font-size: 0.8rem; color: var(--gray-500);">20230002</div>
                                    </div>
                                </div>
                            </td>
                            <td>Mathématiques</td>
                            <td>15/12/2023 - 09h00</td>
                            <td>Cours magistral</td>
                            <td><span class="badge bg-danger">Non justifiée</span></td>
                            <td>-</td>
                            <td>
                                <button class="btn btn-sm btn-success" title="Justifier">
                                    <i class="fas fa-check"></i>
                                </button>
                                <button class="btn btn-sm btn-warning" title="Contacter">
                                    <i class="fas fa-envelope"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="checkbox"></td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <img src="https://images.unsplash.com/photo-1494790108755-2616b612b494?w=40&h=40&fit=crop&crop=face" class="profile-img" alt="Photo">
                                    <div>
                                        <div style="font-weight: 600;">Marie Dubois</div>
                                        <div style="font-size: 0.8rem; color: var(--gray-500);">20230001</div>
                                    </div>
                                </div>
                            </td>
                            <td>Informatique</td>
                            <td>14/12/2023 - 14h00</td>
                            <td>TP</td>
                            <td><span class="badge bg-success">Justifiée</span></td>
                            <td>Certificat médical</td>
                            <td>
                                <button class="btn btn-sm btn-info" title="Voir justificatif">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Section Examens complète
function showExamensContent() {
    const contentArea = document.querySelector('.content-area');
    contentArea.innerHTML = `
        <div class="section-header">
            <div class="section-title">
                <h1>Gestion des Examens</h1>
                <p>Planification et organisation des évaluations</p>
            </div>
            <div class="section-actions">
                <button class="btn btn-secondary">
                    <i class="fas fa-calendar-alt"></i>
                    Planning examens
                </button>
                <button class="btn btn-primary">
                    <i class="fas fa-plus"></i>
                    Programmer un examen
                </button>
            </div>
        </div>

        <!-- Statistiques examens -->
        <div class="stats-grid">
            <div class="stat-card info">
                <div class="stat-icon">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">8</div>
                    <div class="stat-label">Examens à venir</div>
                    <div class="stat-trend positive">
                        <i class="fas fa-arrow-up"></i> Cette semaine
                    </div>
                </div>
            </div>

            <div class="stat-card success">
                <div class="stat-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">24</div>
                    <div class="stat-label">Examens terminés</div>
                    <div class="stat-trend positive">
                        <i class="fas fa-arrow-up"></i> Ce mois
                    </div>
                </div>
            </div>

            <div class="stat-card warning">
                <div class="stat-icon">
                    <i class="fas fa-users"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">456</div>
                    <div class="stat-label">Étudiants concernés</div>
                    <div class="stat-trend neutral">
                        <i class="fas fa-minus"></i> Total
                    </div>
                </div>
            </div>

            <div class="stat-card primary">
                <div class="stat-icon">
                    <i class="fas fa-clipboard-list"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-number">12</div>
                    <div class="stat-label">Notes en attente</div>
                    <div class="stat-trend negative">
                        <i class="fas fa-clock"></i> À saisir
                    </div>
                </div>
            </div>
        </div>

        <!-- Calendrier des examens -->
        <div class="dashboard-grid">
            <div class="dashboard-card chart-card">
                <div class="card-header">
                    <h3>Calendrier des examens - Décembre 2023</h3>
                    <div class="card-actions">
                        <button class="btn-card-action" title="Vue mensuelle">
                            <i class="fas fa-calendar"></i>
                        </button>
                        <button class="btn-card-action" title="Vue liste">
                            <i class="fas fa-list"></i>
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <div class="exam-calendar">
                        <div class="calendar-mini">
                            <div class="calendar-header-mini">
                                <button class="btn btn-sm btn-secondary">‹</button>
                                <h4>Décembre 2023</h4>
                                <button class="btn btn-sm btn-secondary">›</button>
                            </div>
                            <div class="calendar-grid-mini">
                                <div class="day-header-mini">L</div>
                                <div class="day-header-mini">M</div>
                                <div class="day-header-mini">M</div>
                                <div class="day-header-mini">J</div>
                                <div class="day-header-mini">V</div>
                                <div class="day-header-mini">S</div>
                                <div class="day-header-mini">D</div>

                                <div class="day-mini inactive">27</div>
                                <div class="day-mini inactive">28</div>
                                <div class="day-mini inactive">29</div>
                                <div class="day-mini inactive">30</div>
                                <div class="day-mini">1</div>
                                <div class="day-mini">2</div>
                                <div class="day-mini">3</div>

                                <div class="day-mini">4</div>
                                <div class="day-mini has-exam">5</div>
                                <div class="day-mini">6</div>
                                <div class="day-mini">7</div>
                                <div class="day-mini has-exam">8</div>
                                <div class="day-mini">9</div>
                                <div class="day-mini">10</div>

                                <div class="day-mini">11</div>
                                <div class="day-mini today">12</div>
                                <div class="day-mini">13</div>
                                <div class="day-mini">14</div>
                                <div class="day-mini has-exam">15</div>
                                <div class="day-mini">16</div>
                                <div class="day-mini">17</div>

                                <div class="day-mini has-exam">18</div>
                                <div class="day-mini">19</div>
                                <div class="day-mini has-exam">20</div>
                                <div class="day-mini">21</div>
                                <div class="day-mini has-exam">22</div>
                                <div class="day-mini">23</div>
                                <div class="day-mini">24</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dashboard-card">
                <div class="card-header">
                    <h3>Examens cette semaine</h3>
                </div>
                <div class="card-content">
                    <div class="exam-timeline">
                        <div class="exam-day">
                            <div class="exam-date">
                                <div class="exam-day-number">15</div>
                                <div class="exam-day-name">VEN</div>
                            </div>
                            <div class="exam-events">
                                <div class="exam-event">
                                    <div class="exam-time">09:00</div>
                                    <div class="exam-details">
                                        <div class="exam-subject">Mathématiques</div>
                                        <div class="exam-info">L2 - Salle A101 - 2h</div>
                                    </div>
                                    <div class="exam-students">45 étudiants</div>
                                </div>
                                <div class="exam-event">
                                    <div class="exam-time">14:00</div>
                                    <div class="exam-details">
                                        <div class="exam-subject">Informatique</div>
                                        <div class="exam-info">L3 - Lab Info - 3h</div>
                                    </div>
                                    <div class="exam-students">32 étudiants</div>
                                </div>
                            </div>
                        </div>
                        <div class="exam-day">
                            <div class="exam-date">
                                <div class="exam-day-number">18</div>
                                <div class="exam-day-name">LUN</div>
                            </div>
                            <div class="exam-events">
                                <div class="exam-event">
                                    <div class="exam-time">10:00</div>
                                    <div class="exam-details">
                                        <div class="exam-subject">Physique</div>
                                        <div class="exam-info">L1 - Amphi B - 2h</div>
                                    </div>
                                    <div class="exam-students">67 étudiants</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Liste des examens -->
        <div class="table-card">
            <div class="table-header">
                <h3>Tous les examens</h3>
                <div class="table-actions">
                    <button class="btn-table-action" title="Filtrer par statut">
                        <i class="fas fa-filter"></i>
                    </button>
                    <button class="btn-table-action" title="Exporter planning">
                        <i class="fas fa-download"></i>
                    </button>
                </div>
            </div>
            <div class="table-content">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>Matière</th>
                            <th>Date & Heure</th>
                            <th>Durée</th>
                            <th>Salle</th>
                            <th>Niveau</th>
                            <th>Étudiants</th>
                            <th>Surveillant</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div>
                                    <div style="font-weight: 600;">Mathématiques</div>
                                    <div style="font-size: 0.8rem; color: var(--gray-500);">Partiel</div>
                                </div>
                            </td>
                            <td>15/12/2023<br><span style="color: var(--gray-500);">09h00</span></td>
                            <td>2h00</td>
                            <td>A101</td>
                            <td>L2</td>
                            <td>45</td>
                            <td>Prof. Dupont</td>
                            <td><span class="badge bg-warning">Programmé</span></td>
                            <td>
                                <button class="btn btn-sm btn-info" title="Détails">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn btn-sm btn-warning" title="Modifier">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-primary" title="Feuille d'émargement">
                                    <i class="fas fa-clipboard-list"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    <div style="font-weight: 600;">Informatique</div>
                                    <div style="font-size: 0.8rem; color: var(--gray-500);">TP noté</div>
                                </div>
                            </td>
                            <td>12/12/2023<br><span style="color: var(--gray-500);">14h00</span></td>
                            <td>3h00</td>
                            <td>Lab Info</td>
                            <td>L3</td>
                            <td>32</td>
                            <td>Prof. Martin</td>
                            <td><span class="badge bg-success">Terminé</span></td>
                            <td>
                                <button class="btn btn-sm btn-success" title="Saisir notes">
                                    <i class="fas fa-plus"></i>
                                </button>
                                <button class="btn btn-sm btn-info" title="Résultats">
                                    <i class="fas fa-chart-bar"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Ajouter cette fonction pour gérer toutes les sections
function handleSectionDisplay(sectionName) {
    // Masquer toutes les sections existantes
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Appeler la fonction appropriée selon la section
    switch(sectionName) {
        case 'notes':
            showNotesContent();
            updateSectionTitle('Notes & Évaluations');
            break;
        case 'absences':
            showAbsencesContent();
            updateSectionTitle('Gestion des Absences');
            break;
        case 'examens':
            showExamensContent();
            updateSectionTitle('Gestion des Examens');
            break;
        // Ajouter les autres cas...
    }
}

