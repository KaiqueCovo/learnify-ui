
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { getCourseById } from '@/utils/mockData';
import { useToast } from '@/hooks/use-toast';
import { EnrollmentData } from '@/types';
import { useI18n } from '@/contexts/I18nContext';

const EnrollmentPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData>({
    personalInfo: {
      fullName: '',
      email: 'joao@email.com',
      phone: '',
      dateOfBirth: '',
      documentNumber: '',
    },
    address: {
      zipCode: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
    additionalInfo: {
      educationLevel: '',
      occupation: '',
      hearAboutUs: '',
      goals: '',
      marketingConsent: false,
    },
  });

  const course = courseId ? getCourseById(courseId) : null;

  if (!course) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('courses.notfound')}</h1>
        <Button onClick={() => navigate('/courses')}>
          {t('courses.backtocourses')}
        </Button>
      </div>
    );
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: t('enrollment.success'),
        description: t('enrollment.ready'),
      });
      setCurrentStep(4); // Success step
      setIsSubmitting(false);
    }, 2000);
  };

  const progressPercentage = (currentStep / 3) * 100;

  if (currentStep === 4) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('enrollment.success')}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {t('enrollment.welcome')} "{course.title}". {t('enrollment.ready')}
        </p>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-medium mb-2">{t('enrollment.details')}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">{t('enrollment.duration')}</span>
              <div className="font-medium">{course.duration} {t('courses.hours')}</div>
            </div>
            <div>
              <span className="text-gray-500">{t('enrollment.instructor')}</span>
              <div className="font-medium">{course.instructor.name}</div>
            </div>
            <div>
              <span className="text-gray-500">{t('enrollment.level')}</span>
              <div className="font-medium capitalize">{course.level}</div>
            </div>
            <div>
              <span className="text-gray-500">{t('enrollment.students')}</span>
              <div className="font-medium">{course.studentsCount.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => navigate(`/courses/${course.id}`)}>
            {t('common.startlearning')}
          </Button>
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            {t('enrollment.backtodashboard')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('enrollment.title')} {course.title}
        </h1>
        <p className="text-gray-600">
          {t('enrollment.subtitle')}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{t('enrollment.step')} {currentStep} {t('enrollment.of')} 3</span>
          <span>{Math.round(progressPercentage)}{t('enrollment.completepercent')}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && t('enrollment.personal')}
            {currentStep === 2 && t('enrollment.address')}
            {currentStep === 3 && t('enrollment.additional')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 1 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('enrollment.fullname')} *</Label>
                  <Input
                    id="fullName"
                    value={enrollmentData.personalInfo.fullName}
                    onChange={(e) => setEnrollmentData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                    }))}
                    placeholder={t('form.enterfullname')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('login.email')} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={enrollmentData.personalInfo.email}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('enrollment.phone')} *</Label>
                  <Input
                    id="phone"
                    value={enrollmentData.personalInfo.phone}
                    onChange={(e) => setEnrollmentData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, phone: e.target.value }
                    }))}
                    placeholder={t('form.enterphone')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">{t('enrollment.birth')} *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={enrollmentData.personalInfo.dateOfBirth}
                    onChange={(e) => setEnrollmentData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="documentNumber">{t('enrollment.document')} *</Label>
                <Input
                  id="documentNumber"
                  value={enrollmentData.personalInfo.documentNumber}
                  onChange={(e) => setEnrollmentData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, documentNumber: e.target.value }
                  }))}
                  placeholder={t('form.enterdocument')}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">{t('enrollment.zipcode')} *</Label>
                  <Input
                    id="zipCode"
                    value={enrollmentData.address.zipCode}
                    onChange={(e) => setEnrollmentData(prev => ({
                      ...prev,
                      address: { ...prev.address, zipCode: e.target.value }
                    }))}
                    placeholder={t('form.enterzip')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{t('enrollment.state')} *</Label>
                  <Select
                    value={enrollmentData.address.state}
                    onValueChange={(value) => setEnrollmentData(prev => ({
                      ...prev,
                      address: { ...prev.address, state: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.selectstate')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">{t('state.sp')}</SelectItem>
                      <SelectItem value="RJ">{t('state.rj')}</SelectItem>
                      <SelectItem value="MG">{t('state.mg')}</SelectItem>
                      <SelectItem value="RS">{t('state.rs')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="street">{t('enrollment.street')} *</Label>
                  <Input
                    id="street"
                    value={enrollmentData.address.street}
                    onChange={(e) => setEnrollmentData(prev => ({
                      ...prev,
                      address: { ...prev.address, street: e.target.value }
                    }))}
                    placeholder={t('form.streetname')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">{t('enrollment.number')} *</Label>
                  <Input
                    id="number"
                    value={enrollmentData.address.number}
                    onChange={(e) => setEnrollmentData(prev => ({
                      ...prev,
                      address: { ...prev.address, number: e.target.value }
                    }))}
                    placeholder={t('form.housenumber')}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complement">{t('enrollment.complement')}</Label>
                  <Input
                    id="complement"
                    value={enrollmentData.address.complement}
                    onChange={(e) => setEnrollmentData(prev => ({
                      ...prev,
                      address: { ...prev.address, complement: e.target.value }
                    }))}
                    placeholder={t('form.apartment')}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">{t('enrollment.neighborhood')} *</Label>
                  <Input
                    id="neighborhood"
                    value={enrollmentData.address.neighborhood}
                    onChange={(e) => setEnrollmentData(prev => ({
                      ...prev,
                      address: { ...prev.address, neighborhood: e.target.value }
                    }))}
                    placeholder={t('form.neighborhood')}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">{t('enrollment.city')} *</Label>
                <Input
                  id="city"
                  value={enrollmentData.address.city}
                  onChange={(e) => setEnrollmentData(prev => ({
                    ...prev,
                    address: { ...prev.address, city: e.target.value }
                  }))}
                  placeholder={t('form.cityname')}
                />
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="educationLevel">{t('enrollment.education')} *</Label>
                  <Select
                    value={enrollmentData.additionalInfo.educationLevel}
                    onValueChange={(value) => setEnrollmentData(prev => ({
                      ...prev,
                      additionalInfo: { ...prev.additionalInfo, educationLevel: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.selecteducation')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">{t('education.highschool')}</SelectItem>
                      <SelectItem value="bachelors">{t('education.bachelors')}</SelectItem>
                      <SelectItem value="masters">{t('education.masters')}</SelectItem>
                      <SelectItem value="phd">{t('education.phd')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">{t('enrollment.occupation')} *</Label>
                  <Select
                    value={enrollmentData.additionalInfo.occupation}
                    onValueChange={(value) => setEnrollmentData(prev => ({
                      ...prev,
                      additionalInfo: { ...prev.additionalInfo, occupation: value }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('form.selectoccupation')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">{t('occupation.student')}</SelectItem>
                      <SelectItem value="developer">{t('occupation.developer')}</SelectItem>
                      <SelectItem value="designer">{t('occupation.designer')}</SelectItem>
                      <SelectItem value="manager">{t('occupation.manager')}</SelectItem>
                      <SelectItem value="other">{t('occupation.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hearAboutUs">{t('enrollment.hearabout')} *</Label>
                <Select
                  value={enrollmentData.additionalInfo.hearAboutUs}
                  onValueChange={(value) => setEnrollmentData(prev => ({
                    ...prev,
                    additionalInfo: { ...prev.additionalInfo, hearAboutUs: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('form.selectoption')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">{t('hearabout.google')}</SelectItem>
                    <SelectItem value="social-media">{t('hearabout.socialmedia')}</SelectItem>
                    <SelectItem value="friend">{t('hearabout.friend')}</SelectItem>
                    <SelectItem value="advertisement">{t('hearabout.advertisement')}</SelectItem>
                    <SelectItem value="other">{t('hearabout.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goals">{t('enrollment.goals')}</Label>
                <Textarea
                  id="goals"
                  value={enrollmentData.additionalInfo.goals}
                  onChange={(e) => setEnrollmentData(prev => ({
                    ...prev,
                    additionalInfo: { ...prev.additionalInfo, goals: e.target.value }
                  }))}
                  placeholder={t('form.tellgoals')}
                  rows={4}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="marketingConsent"
                  checked={enrollmentData.additionalInfo.marketingConsent}
                  onCheckedChange={(checked) => setEnrollmentData(prev => ({
                    ...prev,
                    additionalInfo: { ...prev.additionalInfo, marketingConsent: checked as boolean }
                  }))}
                />
                <Label htmlFor="marketingConsent" className="text-sm">
                  {t('enrollment.marketing')}
                </Label>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? () => navigate(`/courses/${course.id}`) : handleBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {currentStep === 1 ? t('enrollment.backtocourse') : t('common.back')}
            </Button>
            <Button
              onClick={currentStep === 3 ? handleSubmit : handleNext}
              disabled={isSubmitting}
            >
              {currentStep === 3 ? (
                isSubmitting ? t('enrollment.enrolling') : t('enrollment.completebtn')
              ) : (
                <>
                  {t('common.next')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentPage;
