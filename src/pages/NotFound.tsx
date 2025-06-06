import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, BookOpen } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Página não encontrada</h2>
            <p className="text-gray-600 mb-6">
              A página que você está procurando não existe ou foi movida.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/dashboard')} 
              className="w-full"
            >
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Dashboard
            </Button>
            <Button 
              onClick={() => navigate('/courses')} 
              variant="outline"
              className="w-full"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Explorar Cursos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
