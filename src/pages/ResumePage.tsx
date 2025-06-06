
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Download, Plus, Edit3, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeData {
  institution?: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  company?: string;
  position?: string;
  description?: string;
  name?: string;
  level?: string;
  category?: string;
  skills?: string[];
  period?: string;
}

interface ResumeSection {
  id: string;
  type: 'education' | 'experience' | 'skill';
  data: ResumeData;
}

const ResumePage = () => {
  const { toast } = useToast();
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Kaique Covo',
    email: 'kaique.kng@gmail.com',
    phone: '+55 (11) 98765-4321',
    location: 'São Paulo, SP - Brasil',
    summary: 'Desenvolvedor Full Stack especializado em React e TypeScript, com paixão por criar interfaces intuitivas e experiências digitais excepcionais. Experiência em metodologias ágeis e trabalho colaborativo.',
  });

  const [sections, setSections] = useState<ResumeSection[]>([
    {
      id: '1',
      type: 'education',
      data: {
        institution: 'Universidade Estadual de Campinas (UNICAMP)',
        degree: 'Bacharelado em Ciência da Computação',
        field: 'Engenharia de Software',
        startDate: '2019',
        endDate: '2023',
        description: 'Formação focada em desenvolvimento de software, estruturas de dados, algoritmos e engenharia de software. Participação ativa em projetos de extensão e iniciação científica.',
      },
    },
    {
      id: '2',
      type: 'experience',
      data: {
        company: 'TechStart Inovação Digital',
        position: 'Desenvolvedora Frontend Pleno',
        startDate: '2023',
        endDate: 'Atual',
        description: 'Desenvolvimento de aplicações web responsivas utilizando React, TypeScript e Tailwind CSS. Colaboração em equipes ágeis, implementação de testes automatizados e otimização de performance.',
      },
    },
    {
      id: '3',
      type: 'experience',
      data: {
        company: 'Freelancer - Projetos Diversos',
        position: 'Desenvolvedora Frontend',
        startDate: '2022',
        endDate: '2023',
        description: 'Desenvolvimento de websites e aplicações para pequenas e médias empresas. Especialização em e-commerce, landing pages e sistemas de gestão.',
      },
    },
    {
      id: '3',
      type: 'skill',
      data: {
        category: 'Programming Languages',
        skills: ['JavaScript', 'TypeScript', 'Python', 'Java'],
      },
    },
    {
      id: '4',
      type: 'skill',
      data: {
        category: 'Frameworks & Tools',
        skills: ['React', 'Node.js', 'Git', 'Docker'],
      },
    },
  ]);

  const [editingSection, setEditingSection] = useState<string | null>(null);

  const handleDownload = () => {
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded as a PDF file.",
    });
  };

  const addSection = (type: 'education' | 'experience' | 'skill') => {
    const newId = Date.now().toString();
    const newSection: ResumeSection = {
      id: newId,
      type,
      data: type === 'skill' 
        ? { category: '', skills: [] }
        : { institution: '', degree: '', period: '', description: '' },
    };
    setSections([...sections, newSection]);
    setEditingSection(newId);
  };

  const updateSection = (id: string, data: ResumeData) => {
    setSections(sections.map(section => 
      section.id === id ? { ...section, data } : section
    ));
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
    setEditingSection(null);
  };

  const renderSection = (section: ResumeSection) => {
    const isEditing = editingSection === section.id;

    if (section.type === 'education' || section.type === 'experience') {
      return (
        <Card key={section.id} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">
              {section.type === 'education' ? 'Education' : 'Experience'}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(isEditing ? null : section.id)}
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteSection(section.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>
                    {section.type === 'education' ? 'Institution' : 'Company'}
                  </Label>
                  <Input
                    value={section.data.institution || section.data.company || ''}
                    onChange={(e) => updateSection(section.id, {
                      ...section.data,
                      [section.type === 'education' ? 'institution' : 'company']: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label>
                    {section.type === 'education' ? 'Degree' : 'Position'}
                  </Label>
                  <Input
                    value={section.data.degree || section.data.position || ''}
                    onChange={(e) => updateSection(section.id, {
                      ...section.data,
                      [section.type === 'education' ? 'degree' : 'position']: e.target.value
                    })}
                  />
                </div>
              </div>
              <div>
                <Label>Period</Label>
                <Input
                  value={section.data.period || ''}
                  onChange={(e) => updateSection(section.id, {
                    ...section.data,
                    period: e.target.value
                  })}
                  placeholder="e.g., 2020 - 2024"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={section.data.description || ''}
                  onChange={(e) => updateSection(section.id, {
                    ...section.data,
                    description: e.target.value
                  })}
                  rows={3}
                />
              </div>
              <Button
                size="sm"
                onClick={() => setEditingSection(null)}
              >
                Save
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">
                  {section.data.institution || section.data.company}
                </h4>
                <span className="text-sm text-gray-500">
                  {section.data.period}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                {section.data.degree || section.data.position}
              </p>
              <p className="text-sm text-gray-600">
                {section.data.description}
              </p>
            </div>
          )}
        </Card>
      );
    }

    if (section.type === 'skill') {
      return (
        <Card key={section.id} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Skills</h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingSection(isEditing ? null : section.id)}
              >
                <Edit3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteSection(section.id)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <div>
                <Label>Category</Label>
                <Input
                  value={section.data.category || ''}
                  onChange={(e) => updateSection(section.id, {
                    ...section.data,
                    category: e.target.value
                  })}
                  placeholder="e.g., Programming Languages"
                />
              </div>
              <div>
                <Label>Skills (comma-separated)</Label>
                <Input
                  value={section.data.skills?.join(', ') || ''}
                  onChange={(e) => updateSection(section.id, {
                    ...section.data,
                    skills: e.target.value.split(',').map(skill => skill.trim())
                  })}
                  placeholder="e.g., JavaScript, React, Node.js"
                />
              </div>
              <Button
                size="sm"
                onClick={() => setEditingSection(null)}
              >
                Save
              </Button>
            </div>
          ) : (
            <div>
              <h4 className="font-medium mb-2">{section.data.category}</h4>
              <div className="flex flex-wrap gap-2">
                {section.data.skills?.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Resume</h1>
          <p className="text-gray-600 mt-2">
            Build and customize your professional resume
          </p>
        </div>
        <Button onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resume Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Resume Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Info */}
              <div className="text-center border-b pb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {personalInfo.fullName}
                </h1>
                <div className="text-gray-600 space-y-1">
                  <p>{personalInfo.email} • {personalInfo.phone}</p>
                  <p>{personalInfo.location}</p>
                </div>
                <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                  {personalInfo.summary}
                </p>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-1">
                  Education
                </h2>
                <div className="space-y-3">
                  {sections
                    .filter(s => s.type === 'education')
                    .map(section => renderSection(section))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-1">
                  Experience
                </h2>
                <div className="space-y-3">
                  {sections
                    .filter(s => s.type === 'experience')
                    .map(section => renderSection(section))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-3 border-b pb-1">
                  Skills
                </h2>
                <div className="space-y-3">
                  {sections
                    .filter(s => s.type === 'skill')
                    .map(section => renderSection(section))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Editor Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Personal Info Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label>Full Name</Label>
                <Input
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo(prev => ({
                    ...prev,
                    fullName: e.target.value
                  }))}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                />
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={personalInfo.location}
                  onChange={(e) => setPersonalInfo(prev => ({
                    ...prev,
                    location: e.target.value
                  }))}
                />
              </div>
              <div>
                <Label>Professional Summary</Label>
                <Textarea
                  value={personalInfo.summary}
                  onChange={(e) => setPersonalInfo(prev => ({
                    ...prev,
                    summary: e.target.value
                  }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Add Sections */}
          <Card>
            <CardHeader>
              <CardTitle>Add Sections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addSection('education')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Education
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addSection('experience')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addSection('skill')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skills
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumePage;
