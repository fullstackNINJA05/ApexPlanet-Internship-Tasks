// Contact Form Validation JavaScript
        class FormValidator {
            constructor(formId) {
                this.form = document.getElementById(formId);
                this.setupEventListeners();
            }

            setupEventListeners() {
                // Real-time validation on input
                this.form.querySelectorAll('input, select, textarea').forEach(field => {
                    field.addEventListener('blur', () => this.validateField(field));
                    field.addEventListener('input', () => this.clearErrors(field));
                });

                // Form submission
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            }

            validateField(field) {
                const fieldGroup = field.closest('.form-group');
                const errorMsg = fieldGroup.querySelector('.error-message');
                const successMsg = fieldGroup.querySelector('.success-message');
                let isValid = true;

                // Clear previous states
                fieldGroup.classList.remove('error', 'success');
                errorMsg.style.display = 'none';
                successMsg.style.display = 'none';

                // Validation rules
                if (field.hasAttribute('required') && !field.value.trim()) {
                    this.showError(fieldGroup, errorMsg, 'This field is required');
                    isValid = false;
                } else if (field.type === 'email' && field.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        this.showError(fieldGroup, errorMsg, 'Please enter a valid email address');
                        isValid = false;
                    }
                } else if (field.type === 'tel' && field.value) {
                    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                    if (!phoneRegex.test(field.value.replace(/[\s\-$$$$]/g, ''))) {
                        this.showError(fieldGroup, errorMsg, 'Please enter a valid phone number');
                        isValid = false;
                    }
                } else if (field.name === 'message' && field.value.length < 10 && field.value.length > 0) {
                    this.showError(fieldGroup, errorMsg, 'Message must be at least 10 characters long');
                    isValid = false;
                }

                if (isValid && field.value.trim()) {
                    this.showSuccess(fieldGroup, successMsg);
                }

                return isValid;
            }

            showError(fieldGroup, errorMsg, message) {
                fieldGroup.classList.add('error');
                errorMsg.textContent = message;
                errorMsg.style.display = 'block';
            }

            showSuccess(fieldGroup, successMsg) {
                fieldGroup.classList.add('success');
                successMsg.style.display = 'block';
            }

            clearErrors(field) {
                const fieldGroup = field.closest('.form-group');
                fieldGroup.classList.remove('error');
                fieldGroup.querySelector('.error-message').style.display = 'none';
            }

            handleSubmit(e) {
                e.preventDefault();
                
                let isFormValid = true;
                const formData = new FormData(this.form);
                
                // Validate all fields
                this.form.querySelectorAll('input, select, textarea').forEach(field => {
                    if (!this.validateField(field)) {
                        isFormValid = false;
                    }
                });

                if (isFormValid) {
                    // Simulate form submission
                    const submitBtn = this.form.querySelector('.btn');
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;

                    setTimeout(() => {
                        alert('Form submitted successfully! Thank you for your message.');
                        this.form.reset();
                        
                        // Clear all validation states
                        this.form.querySelectorAll('.form-group').forEach(group => {
                            group.classList.remove('error', 'success');
                            group.querySelector('.error-message').style.display = 'none';
                            group.querySelector('.success-message').style.display = 'none';
                        });

                        submitBtn.textContent = 'Send Message';
                        submitBtn.disabled = false;
                    }, 2000);
                } else {
                    alert('Please fix the errors in the form before submitting.');
                }
            }
        }

        // Dynamic To-Do List JavaScript
        class TodoApp {
            constructor() {
                this.todos = JSON.parse(localStorage.getItem('todos')) || [];
                this.currentFilter = 'all';
                this.setupEventListeners();
                this.render();
            }

            setupEventListeners() {
                // Add new todo
                document.getElementById('addTodoBtn').addEventListener('click', () => this.addTodo());
                document.getElementById('todoInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.addTodo();
                });

                // Filter buttons
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
                });
            }

            addTodo() {
                const input = document.getElementById('todoInput');
                const text = input.value.trim();

                if (text) {
                    const todo = {
                        id: Date.now(),
                        text: text,
                        completed: false,
                        createdAt: new Date().toISOString()
                    };

                    this.todos.unshift(todo);
                    this.saveTodos();
                    this.render();
                    input.value = '';
                }
            }

            toggleTodo(id) {
                const todo = this.todos.find(t => t.id === id);
                if (todo) {
                    todo.completed = !todo.completed;
                    this.saveTodos();
                    this.render();
                }
            }

            deleteTodo(id) {
                if (confirm('Are you sure you want to delete this task?')) {
                    this.todos = this.todos.filter(t => t.id !== id);
                    this.saveTodos();
                    this.render();
                }
            }

            editTodo(id) {
                const todo = this.todos.find(t => t.id === id);
                if (todo) {
                    const newText = prompt('Edit task:', todo.text);
                    if (newText !== null && newText.trim()) {
                        todo.text = newText.trim();
                        this.saveTodos();
                        this.render();
                    }
                }
            }

            setFilter(filter) {
                this.currentFilter = filter;
                
                // Update active filter button
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
                
                this.render();
            }

            getFilteredTodos() {
                switch (this.currentFilter) {
                    case 'active':
                        return this.todos.filter(todo => !todo.completed);
                    case 'completed':
                        return this.todos.filter(todo => todo.completed);
                    default:
                        return this.todos;
                }
            }

            render() {
                const todoList = document.getElementById('todoList');
                const filteredTodos = this.getFilteredTodos();

                if (filteredTodos.length === 0) {
                    todoList.innerHTML = `
                        <div style="text-align: center; padding: 2rem; color: #666;">
                            ${this.currentFilter === 'all' ? 'No tasks yet. Add one above!' : 
                              this.currentFilter === 'active' ? 'No active tasks!' : 'No completed tasks!'}
                        </div>
                    `;
                } else {
                    todoList.innerHTML = filteredTodos.map(todo => `
                        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                                   onchange="todoApp.toggleTodo(${todo.id})">
                            <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                            <div class="todo-actions">
                                <button class="edit-btn" onclick="todoApp.editTodo(${todo.id})">Edit</button>
                                <button class="delete-btn" onclick="todoApp.deleteTodo(${todo.id})">Delete</button>
                            </div>
                        </div>
                    `).join('');
                }

                this.updateStats();
            }

            updateStats() {
                const total = this.todos.length;
                const completed = this.todos.filter(t => t.completed).length;
                const active = total - completed;

                document.getElementById('totalTasks').textContent = total;
                document.getElementById('activeTasks').textContent = active;
                document.getElementById('completedTasks').textContent = completed;
            }

            escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }

            saveTodos() {
                localStorage.setItem('todos', JSON.stringify(this.todos));
            }
        }

        // Initialize applications when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Initialize form validator
            new FormValidator('contactForm');
            
            // Initialize todo app
            window.todoApp = new TodoApp();
            
            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });