import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt' | 'en';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations = {
  pt: {
    // Common
    'common.loading': 'Carregando...',
    'common.search': 'Pesquisar',
    'common.filter': 'Filtrar',
    'common.next': 'Próximo',
    'common.back': 'Voltar',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.view': 'Ver',
    'common.close': 'Fechar',
    'common.home': 'Início',
    'common.welcome': 'Bem-vindo',
    'common.welcomeback': 'Bem-vindo de volta',
    'common.startlearning': 'Começar a Aprender',
    'common.viewall': 'Ver Todos',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.courses': 'Cursos',
    'nav.jobs': 'Oportunidades de Emprego',
    'nav.profile': 'Meu Perfil',
    'nav.resume': 'Currículo',
    'nav.logout': 'Sair',
    'nav.mainnavigation': 'Navegação Principal',
    
    // Layout
    'layout.appname': 'Learnify',
    'layout.notifications': 'Notificações',
    'header.notifications': 'Notificações',
    'header.search': 'Buscar cursos, instrutores...',
    
    // Login
    'login.title': 'Bem-vindo de volta',
    'login.subtitle': 'Entre para continuar sua jornada de aprendizado',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.signin': 'Entrar',
    'login.signingin': 'Entrando...',
    'login.forgot': 'Esqueceu sua senha?',
    'login.nocaccount': 'Não tem uma conta?',
    'login.createaccount': 'Criar conta',
    'login.orcontinue': 'Ou continue com',
    'login.success': 'Login realizado com sucesso!',
    'login.welcome': 'Bem-vindo de volta ao EduPlatform.',
    'login.failed': 'Falha no login',
    'login.checkcredentials': 'Verifique suas credenciais e tente novamente.',
    
    // Dashboard
    'dashboard.welcome': 'Bem-vindo de volta',
    'dashboard.subtitle': 'Continue sua jornada de aprendizado e explore novas oportunidades.',
    'dashboard.enrolled': 'Cursos Matriculados',
    'dashboard.completed': 'Cursos Concluídos',
    'dashboard.certificates': 'Certificados Obtidos',
    'dashboard.hours': 'Horas Estudadas',
    'dashboard.continue': 'Continue Aprendendo',
    'dashboard.pickupwhere': 'Continue de onde parou',
    'dashboard.continuebtn': 'Continuar',
    'dashboard.recommended': 'Recomendados para Você',
    'dashboard.basedon': 'Baseado no seu progresso e interesses de aprendizado',
    'dashboard.activity': 'Atividade Recente',
    'dashboard.latestactivities': 'Suas últimas atividades de aprendizado',
    'dashboard.viewall': 'Ver Todos',
    'dashboard.startlearning': 'Começar a Aprender',
    'dashboard.activitycompleted': 'Concluído',
    'dashboard.activityenrolled': 'Matriculado em',
    'dashboard.activitycertificate': 'Certificado obtido para',
    
    // Courses
    'courses.title': 'Cursos',
    'courses.search': 'Pesquisar cursos...',
    'courses.categories': 'Categorias',
    'courses.level': 'Nível',
    'courses.duration': 'Duração',
    'courses.price': 'Preço',
    'courses.all': 'Todos',
    'courses.programming': 'Programação',
    'courses.design': 'Design',
    'courses.business': 'Negócios',
    'courses.marketing': 'Marketing',
    'courses.beginner': 'Iniciante',
    'courses.intermediate': 'Intermediário',
    'courses.advanced': 'Avançado',
    'courses.free': 'Gratuito',
    'courses.paid': 'Pago',
    'courses.hours': 'horas',
    'courses.students': 'estudantes',
    'courses.viewdetails': 'Ver Detalhes',
    'courses.enrollnow': 'Matricular Agora',
    'courses.notfound': 'Curso não encontrado',
    'courses.backtocourses': 'Voltar aos Cursos',
    
    // Course Detail
    'course.overview': 'Visão Geral',
    'course.curriculum': 'Currículo',
    'course.instructor': 'Instrutor',
    'course.reviews': 'Avaliações',
    'course.includes': 'Este curso inclui',
    'course.lifetime': 'Acesso vitalício',
    'course.certificate': 'Certificado de conclusão',
    'course.mobile': 'Acesso em dispositivos móveis',
    'course.support': 'Suporte completo',
    'course.whatlearn': 'O que você aprenderá',
    'course.requirements': 'Requisitos',
    'course.related': 'Cursos Relacionados',
    'course.backtocourses': 'Voltar aos Cursos',
    
    // Enrollment
    'enrollment.title': 'Matricular-se em',
    'enrollment.subtitle': 'Complete sua matrícula para começar a aprender',
    'enrollment.step': 'Passo',
    'enrollment.of': 'de',
    'enrollment.personal': 'Informações Pessoais',
    'enrollment.address': 'Informações de Endereço',
    'enrollment.additional': 'Informações Adicionais',
    'enrollment.fullname': 'Nome Completo',
    'enrollment.phone': 'Número de Telefone',
    'enrollment.birth': 'Data de Nascimento',
    'enrollment.document': 'Número do Documento/RG',
    'enrollment.zipcode': 'CEP',
    'enrollment.street': 'Endereço',
    'enrollment.number': 'Número',
    'enrollment.complement': 'Complemento',
    'enrollment.neighborhood': 'Bairro',
    'enrollment.city': 'Cidade',
    'enrollment.state': 'Estado',
    'enrollment.education': 'Nível de Educação',
    'enrollment.occupation': 'Ocupação Atual',
    'enrollment.hearabout': 'Como soube de nós?',
    'enrollment.goals': 'Quais são seus objetivos para este curso?',
    'enrollment.marketing': 'Aceito receber emails sobre novos cursos e atualizações',
    'enrollment.enrolling': 'Matriculando...',
    'enrollment.completebtn': 'Completar Matrícula',
    'enrollment.success': 'Matrícula Realizada com Sucesso! 🎉',
    'enrollment.welcome': 'Bem-vindo ao',
    'enrollment.ready': 'Você está pronto para começar sua jornada de aprendizado!',
    'enrollment.details': 'Detalhes do Curso:',
    'enrollment.duration': 'Duração:',
    'enrollment.instructor': 'Instrutor:',
    'enrollment.level': 'Nível:',
    'enrollment.students': 'Estudantes:',
    'enrollment.backtocourse': 'Voltar ao Curso',
    'enrollment.backtodashboard': 'Voltar ao Dashboard',
    'enrollment.required': 'Obrigatório',
    'enrollment.optional': 'Opcional',
    'enrollment.completepercent': '% Completo',
    
    // Form placeholders and labels
    'form.enterfullname': 'Digite seu nome completo',
    'form.enterphone': '(11) 99999-9999',
    'form.enterdocument': 'Digite seu RG ou número do documento',
    'form.enterzip': '00000-000',
    'form.selectstate': 'Selecione o estado',
    'form.streetname': 'Nome da rua',
    'form.housenumber': '123',
    'form.apartment': 'Apartamento, sala, etc.',
    'form.neighborhood': 'Nome do bairro',
    'form.cityname': 'Nome da cidade',
    'form.selecteducation': 'Selecione o nível de educação',
    'form.selectoccupation': 'Selecione a ocupação',
    'form.selectoption': 'Selecione uma opção',
    'form.tellgoals': 'Conte-nos sobre seus objetivos de aprendizado...',
    
    // Education levels
    'education.highschool': 'Ensino Médio',
    'education.bachelors': 'Ensino Superior',
    'education.masters': 'Mestrado',
    'education.phd': 'Doutorado',
    
    // Occupations
    'occupation.student': 'Estudante',
    'occupation.developer': 'Desenvolvedor',
    'occupation.designer': 'Designer',
    'occupation.manager': 'Gerente',
    'occupation.other': 'Outro',
    
    // How did you hear about us
    'hearabout.google': 'Pesquisa do Google',
    'hearabout.socialmedia': 'Redes Sociais',
    'hearabout.friend': 'Recomendação de Amigo',
    'hearabout.advertisement': 'Anúncio',
    'hearabout.other': 'Outro',
    
    // States (Brazil)
    'state.sp': 'São Paulo',
    'state.rj': 'Rio de Janeiro',
    'state.mg': 'Minas Gerais',
    'state.rs': 'Rio Grande do Sul',
    
    // Profile
    'profile.title': 'Meu Perfil',
    'profile.personal': 'Informações Pessoais',
    'profile.account': 'Configurações da Conta',
    'profile.courses': 'Meus Cursos',
    'profile.certificates': 'Certificados',
    'profile.name': 'Nome',
    'profile.email': 'Email',
    'profile.phone': 'Telefone',
    'profile.location': 'Localização',
    'profile.bio': 'Biografia',
    'profile.language': 'Idioma',
    'profile.notifications': 'Notificações',
    'profile.privacy': 'Privacidade',
    'profile.progress': 'Progresso',
    'profile.completed': 'Concluído',
    'profile.inprogress': 'Em Progresso',
    'profile.download': 'Baixar',
    
    // Resume
    'resume.title': 'Meu Currículo',
    'resume.builder': 'Construtor de Currículo',
    'resume.personal': 'Informações Pessoais',
    'resume.education': 'Educação',
    'resume.experience': 'Experiência',
    'resume.skills': 'Habilidades',
    'resume.download': 'Baixar Currículo',
    'resume.preview': 'Visualizar',
    'resume.edit': 'Editar Seção',
    'resume.add': 'Adicionar',
    'resume.degree': 'Formação',
    'resume.institution': 'Instituição',
    'resume.year': 'Ano',
    'resume.position': 'Cargo',
    'resume.company': 'Empresa',
    'resume.period': 'Período',
    'resume.description': 'Descrição',
    
    // Jobs
    'jobs.title': 'Oportunidades de Emprego',
    'jobs.comingsoon': 'Em breve...',
    
    // Error pages
    'error.notfound': 'Página não encontrada',
    'error.404': '404',
    'error.pagenotexist': 'A página que você está procurando não existe.',
    'error.gohome': 'Voltar ao Início',
    
    // Language names
    'language.portuguese': 'Português',
    'language.english': 'English',
    
    // Buttons and actions
    'button.startlearning': 'Começar a Aprender',
    'button.continuereading': 'Continue Lendo',
    'button.learnmore': 'Saiba Mais',
    'button.getstated': 'Começar',
    'button.try': 'Tentar',
    'button.signup': 'Cadastrar-se',
    'button.signin': 'Entrar',
  },
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.next': 'Next',
    'common.back': 'Back',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.close': 'Close',
    'common.home': 'Home',
    'common.welcome': 'Welcome',
    'common.welcomeback': 'Welcome back',
    'common.startlearning': 'Start Learning',
    'common.viewall': 'View All',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.courses': 'Courses',
    'nav.jobs': 'Job Opportunities',
    'nav.profile': 'My Profile',
    'nav.resume': 'Resume',
    'nav.logout': 'Logout',
    'nav.mainnavigation': 'Main Navigation',
    
    // Layout
    'layout.appname': 'EduPlatform',
    'layout.notifications': 'Notifications',
    
    // Login
    'login.title': 'Welcome Back',
    'login.subtitle': 'Sign in to continue your learning journey',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.signin': 'Sign In',
    'login.signingin': 'Signing in...',
    'login.forgot': 'Forgot your password?',
    'login.nocaccount': "Don't have an account?",
    'login.createaccount': 'Create account',
    'login.orcontinue': 'Or continue with',
    'login.success': 'Login successful!',
    'login.welcome': 'Welcome back to EduPlatform.',
    'login.failed': 'Login failed',
    'login.checkcredentials': 'Please check your credentials and try again.',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.subtitle': 'Continue your learning journey and explore new opportunities.',
    'dashboard.enrolled': 'Enrolled Courses',
    'dashboard.completed': 'Completed Courses',
    'dashboard.certificates': 'Certificates Earned',
    'dashboard.hours': 'Hours Studied',
    'dashboard.continue': 'Continue Learning',
    'dashboard.pickupwhere': 'Pick up where you left off',
    'dashboard.continuebtn': 'Continue',
    'dashboard.recommended': 'Recommended for You',
    'dashboard.basedon': 'Based on your learning progress and interests',
    'dashboard.activity': 'Recent Activity',
    'dashboard.latestactivities': 'Your latest learning activities',
    'dashboard.viewall': 'View All',
    'dashboard.startlearning': 'Start Learning',
    'dashboard.activitycompleted': 'Completed',
    'dashboard.activityenrolled': 'Enrolled in',
    'dashboard.activitycertificate': 'Earned certificate for',
    
    // Courses
    'courses.title': 'Courses',
    'courses.search': 'Search courses...',
    'courses.categories': 'Categories',
    'courses.level': 'Level',
    'courses.duration': 'Duration',
    'courses.price': 'Price',
    'courses.all': 'All',
    'courses.programming': 'Programming',
    'courses.design': 'Design',
    'courses.business': 'Business',
    'courses.marketing': 'Marketing',
    'courses.beginner': 'Beginner',
    'courses.intermediate': 'Intermediate',
    'courses.advanced': 'Advanced',
    'courses.free': 'Free',
    'courses.paid': 'Paid',
    'courses.hours': 'hours',
    'courses.students': 'students',
    'courses.viewdetails': 'View Details',
    'courses.enrollnow': 'Enroll Now',
    'courses.notfound': 'Course Not Found',
    'courses.backtocourses': 'Back to Courses',
    
    // Course Detail
    'course.overview': 'Overview',
    'course.curriculum': 'Curriculum',
    'course.instructor': 'Instructor',
    'course.reviews': 'Reviews',
    'course.includes': 'This course includes',
    'course.lifetime': 'Lifetime access',
    'course.certificate': 'Certificate of completion',
    'course.mobile': 'Access on mobile devices',
    'course.support': 'Full support',
    'course.whatlearn': 'What you will learn',
    'course.requirements': 'Requirements',
    'course.related': 'Related Courses',
    'course.backtocourses': 'Back to Courses',
    
    // Enrollment
    'enrollment.title': 'Enroll in',
    'enrollment.subtitle': 'Complete your enrollment to start learning',
    'enrollment.step': 'Step',
    'enrollment.of': 'of',
    'enrollment.personal': 'Personal Information',
    'enrollment.address': 'Address Information',
    'enrollment.additional': 'Additional Information',
    'enrollment.fullname': 'Full Name',
    'enrollment.phone': 'Phone Number',
    'enrollment.birth': 'Date of Birth',
    'enrollment.document': 'ID/Document Number',
    'enrollment.zipcode': 'ZIP/Postal Code',
    'enrollment.street': 'Street Address',
    'enrollment.number': 'Number',
    'enrollment.complement': 'Complement',
    'enrollment.neighborhood': 'Neighborhood',
    'enrollment.city': 'City',
    'enrollment.state': 'State/Province',
    'enrollment.education': 'Education Level',
    'enrollment.occupation': 'Current Occupation',
    'enrollment.hearabout': 'How did you hear about us?',
    'enrollment.goals': 'What are your goals for this course?',
    'enrollment.marketing': 'I agree to receive marketing emails about new courses and updates',
    'enrollment.enrolling': 'Enrolling...',
    'enrollment.completebtn': 'Complete Enrollment',
    'enrollment.success': 'Enrollment Successful! 🎉',
    'enrollment.welcome': 'Welcome to',
    'enrollment.ready': "You're all set to begin your learning journey!",
    'enrollment.details': 'Course Details:',
    'enrollment.duration': 'Duration:',
    'enrollment.instructor': 'Instructor:',
    'enrollment.level': 'Level:',
    'enrollment.students': 'Students:',
    'enrollment.backtocourse': 'Back to Course',
    'enrollment.backtodashboard': 'Back to Dashboard',
    'enrollment.required': 'Required',
    'enrollment.optional': 'Optional',
    'enrollment.completepercent': '% Complete',
    
    // Form placeholders and labels
    'form.enterfullname': 'Enter your full name',
    'form.enterphone': '(11) 99999-9999',
    'form.enterdocument': 'Enter your ID or document number',
    'form.enterzip': '00000-000',
    'form.selectstate': 'Select state',
    'form.streetname': 'Street name',
    'form.housenumber': '123',
    'form.apartment': 'Apartment, suite, etc.',
    'form.neighborhood': 'Neighborhood name',
    'form.cityname': 'City name',
    'form.selecteducation': 'Select education level',
    'form.selectoccupation': 'Select occupation',
    'form.selectoption': 'Select an option',
    'form.tellgoals': 'Tell us about your learning goals...',
    
    // Education levels
    'education.highschool': 'High School',
    'education.bachelors': "Bachelor's Degree",
    'education.masters': "Master's Degree",
    'education.phd': 'PhD',
    
    // Occupations
    'occupation.student': 'Student',
    'occupation.developer': 'Developer',
    'occupation.designer': 'Designer',
    'occupation.manager': 'Manager',
    'occupation.other': 'Other',
    
    // How did you hear about us
    'hearabout.google': 'Google Search',
    'hearabout.socialmedia': 'Social Media',
    'hearabout.friend': 'Friend Recommendation',
    'hearabout.advertisement': 'Advertisement',
    'hearabout.other': 'Other',
    
    // States (can be adapted for different countries)
    'state.sp': 'São Paulo',
    'state.rj': 'Rio de Janeiro',
    'state.mg': 'Minas Gerais',
    'state.rs': 'Rio Grande do Sul',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.personal': 'Personal Information',
    'profile.account': 'Account Settings',
    'profile.courses': 'My Courses',
    'profile.certificates': 'Certificates',
    'profile.name': 'Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone',
    'profile.location': 'Location',
    'profile.bio': 'Bio',
    'profile.language': 'Language',
    'profile.notifications': 'Notifications',
    'profile.privacy': 'Privacy',
    'profile.progress': 'Progress',
    'profile.completed': 'Completed',
    'profile.inprogress': 'In Progress',
    'profile.download': 'Download',
    
    // Resume
    'resume.title': 'My Resume',
    'resume.builder': 'Resume Builder',
    'resume.personal': 'Personal Information',
    'resume.education': 'Education',
    'resume.experience': 'Experience',
    'resume.skills': 'Skills',
    'resume.download': 'Download Resume',
    'resume.preview': 'Preview',
    'resume.edit': 'Edit Section',
    'resume.add': 'Add',
    'resume.degree': 'Degree',
    'resume.institution': 'Institution',
    'resume.year': 'Year',
    'resume.position': 'Position',
    'resume.company': 'Company',
    'resume.period': 'Period',
    'resume.description': 'Description',
    
    // Jobs
    'jobs.title': 'Job Opportunities',
    'jobs.comingsoon': 'Coming soon...',
    
    // Error pages
    'error.notfound': 'Page not found',
    'error.404': '404',
    'error.pagenotexist': "The page you're looking for doesn't exist.",
    'error.gohome': 'Go Home',
    
    // Language names
    'language.portuguese': 'Português',
    'language.english': 'English',
    
    // Buttons and actions
    'button.startlearning': 'Start Learning',
    'button.continuereading': 'Continue Reading',
    'button.learnmore': 'Learn More',
    'button.getstated': 'Get Started',
    'button.try': 'Try',
    'button.signup': 'Sign Up',
    'button.signin': 'Sign In',
  }
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
