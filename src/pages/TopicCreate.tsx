import { useState } from "react";
import { ArrowLeft, Save, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const colorOptions = [
  { name: "Azul", value: "bg-blue-500", preview: "#3b82f6" },
  { name: "Roxo", value: "bg-purple-500", preview: "#8b5cf6" },
  { name: "Verde", value: "bg-green-500", preview: "#10b981" },
  { name: "Laranja", value: "bg-orange-500", preview: "#f97316" },
  { name: "Rosa", value: "bg-pink-500", preview: "#ec4899" },
  { name: "Amarelo", value: "bg-yellow-500", preview: "#eab308" },
  { name: "Vermelho", value: "bg-red-500", preview: "#ef4444" },
  { name: "Índigo", value: "bg-indigo-500", preview: "#6366f1" },
];

const TopicCreate = () => {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Erro",
        description: "O título é obrigatório",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simular criação do tópico
    setTimeout(() => {
      toast({
        title: "Tópico criado!",
        description: `O tópico "${title}" foi criado com sucesso.`,
      });
      
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="font-semibold">Criar Tópico</h1>
          </div>

          <Button 
            type="submit" 
            form="topic-form"
            disabled={isSubmitting}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Criando..." : "Criar Tópico"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-2xl py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Novo Tópico
            </CardTitle>
            <CardDescription>
              Crie um novo tópico para organizar seus artigos
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form id="topic-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Título do Tópico</Label>
                <Input
                  id="title"
                  placeholder="Digite o título do tópico..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg"
                  maxLength={100}
                />
                <p className="text-sm text-muted-foreground">
                  {title.length}/100 caracteres
                </p>
              </div>

              {/* Color Selection */}
              <div className="space-y-2">
                <Label>Cor do Tópico</Label>
                <div className="grid grid-cols-4 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setSelectedColor(color.value)}
                      className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                        selectedColor === color.value 
                          ? "border-primary ring-2 ring-primary/20" 
                          : "border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: color.preview }}
                        />
                        <span className="text-xs font-medium">{color.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-2">
                <Label>Prévia</Label>
                <div className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colorOptions.find(c => c.value === selectedColor)?.preview }}
                    />
                    <span className="font-medium">
                      {title || "Título do tópico"}
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TopicCreate;