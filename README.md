# 🎓 Learnify UI Demo

Uma aplicação web moderna de plataforma de aprendizado online desenvolvida com React, TypeScript e Tailwind CSS. O projeto demonstra uma interface completa para uma plataforma educacional com recursos de cursos, dashboard, perfil de usuário e sistema de internacionalização.

## ✨ Funcionalidades

- 📊 **Dashboard Interativo** - Painel principal com estatísticas e progresso dos cursos
- 📚 **Catálogo de Cursos** - Navegação e busca por cursos disponíveis
- 👤 **Perfil de Usuário** - Gerenciamento de informações pessoais e preferências
- 📄 **Gerador de Currículo** - Ferramenta para criar currículos profissionais
- 🌐 **Internacionalização** - Suporte para Português e Inglês
- 📱 **Design Responsivo** - Interface adaptável para diferentes dispositivos
- 🎨 **UI Moderna** - Componentes elegantes com Shadcn/UI e Tailwind CSS
- 🔍 **Sistema de Busca** - Pesquisa avançada de cursos e conteúdos
- 📈 **Progresso de Aprendizado** - Acompanhamento do desenvolvimento do usuário

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e desenvolvimento rápido
- **React Router DOM** - Roteamento client-side

### UI e Estilização
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/UI** - Componentes UI modernos e acessíveis
- **Radix UI** - Primitivos de UI sem estilo
- **Lucide React** - Ícones SVG otimizados
- **Class Variance Authority** - Variantes de classe condicionais

### Gerenciamento de Estado e Dados
- **TanStack Query (React Query)** - Gerenciamento de estado do servidor
- **React Hook Form** - Formulários performáticos
- **Zod** - Validação de esquemas TypeScript

### Outras Bibliotecas
- **Date-fns** - Manipulação de datas
- **Recharts** - Gráficos e visualizações
- **Sonner** - Notificações toast elegantes
- **React Resizable Panels** - Painéis redimensionáveis

## 📂 Estrutura do Projeto

```
learnify-ui-demo/
├── public/                 # Arquivos estáticos
├── src/
│   ├── components/        # Componentes React
│   │   ├── common/        # Componentes comuns
│   │   ├── layout/        # Componentes de layout
│   │   └── ui/            # Componentes UI (Shadcn)
│   ├── contexts/          # Contextos React
│   ├── data/              # Dados mock/exemplo
│   ├── hooks/             # Hooks customizados
│   ├── lib/               # Utilitários e configurações
│   ├── pages/             # Páginas da aplicação
│   ├── types/             # Definições de tipos TypeScript
│   └── utils/             # Funções utilitárias
├── components.json        # Configuração Shadcn/UI
├── tailwind.config.ts     # Configuração Tailwind CSS
└── vite.config.ts         # Configuração Vite
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Bun (gerenciador de pacotes)

### Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd learnify-ui-demo
```

2. **Instale as dependências**
```bash
bun install
```

3. **Execute o projeto em modo de desenvolvimento**
```bash
bun run dev
```

4. **Acesse a aplicação**
Abra seu navegador em `http://localhost:5173`

### Scripts Disponíveis

- `bun run dev` - Inicia o servidor de desenvolvimento
- `bun run build` - Cria build de produção
- `bun run build:dev` - Cria build de desenvolvimento
- `bun run lint` - Executa o linter ESLint
- `bun run preview` - Visualiza o build de produção

## 📱 Páginas e Funcionalidades

### 🏠 Dashboard
- Estatísticas de aprendizado
- Cursos em progresso
- Atividades recentes
- Cursos recomendados

### 📚 Cursos
- Catálogo completo de cursos
- Filtros por categoria e nível
- Detalhes do curso com módulos
- Sistema de inscrição

### 👤 Perfil
- Informações pessoais
- Histórico de cursos
- Configurações de conta
- Estatísticas de progresso

### 📄 Currículo
- Gerador automático de currículo
- Templates profissionais
- Export em diferentes formatos
- Personalização avançada

## 🌐 Internacionalização

O projeto suporta múltiplos idiomas através do contexto `I18nContext`:

- **Português (pt)** - Idioma padrão
- **Inglês (en)** - Idioma alternativo

Para adicionar novos idiomas, edite o arquivo `src/contexts/I18nContext.tsx`.

## 🎨 Personalização

### Temas
O projeto usa Tailwind CSS com Shadcn/UI para styling. Para personalizar:

1. **Cores**: Edite `tailwind.config.ts`
2. **Componentes**: Modifique arquivos em `src/components/ui/`
3. **Layout**: Ajuste componentes em `src/components/layout/`

### Dados Mock
Os dados de exemplo estão em `src/data/`:
- `courses.json` - Cursos disponíveis
- `users.json` - Usuários do sistema
- `activities.json` - Atividades recentes

## 🔧 Configuração de Desenvolvimento

### ESLint
Configuração em `eslint.config.js` com regras para React e TypeScript.

### TypeScript
Configuração modular com:
- `tsconfig.json` - Configuração base
- `tsconfig.app.json` - Configuração da aplicação
- `tsconfig.node.json` - Configuração do Node.js

### PostCSS
Configurado para processar Tailwind CSS e autoprefixer.

## 📦 Build e Deploy

### Build de Produção
```bash
bun run build
```

### Visualizar Build
```bash
bun run preview
```

Os arquivos de build são gerados em `dist/` e estão prontos para deploy em qualquer servidor estático.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é um demo/demonstração e está disponível para fins educacionais e de aprendizado.

---

Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS
