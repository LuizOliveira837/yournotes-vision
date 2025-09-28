import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Save, Eye, Settings, Calendar, Folder, MoreHorizontal, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface Topic {
  id: string;
  title: string;
  color: string;
}

const ArticleEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Mock topics data
  const topics: Topic[] = [
    { id: "1", title: "Desenvolvimento Web", color: "bg-blue-500" },
    { id: "2", title: "Design System", color: "bg-purple-500" },
    { id: "3", title: "Produtividade", color: "bg-green-500" },
    { id: "4", title: "Estudos", color: "bg-orange-500" }
  ];

  // Auto-save functionality
  useEffect(() => {
    const autoSave = () => {
      if (title.trim() || content.trim()) {
        handleSave(true);
      }
    };

    const timer = setTimeout(autoSave, 5000); // Auto-save every 5 seconds
    return () => clearTimeout(timer);
  }, [title, content, selectedTopic]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }, [content]);

  const handleSave = async (isAutoSave = false) => {
    if (!title.trim() && !content.trim()) return;

    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
      
      if (!isAutoSave) {
        toast({
          title: "Anotação salva",
          description: "Suas alterações foram salvas com sucesso.",
        });
      }
    }, 800);
  };

  const handlePublish = () => {
    setIsPublished(!isPublished);
    toast({
      title: isPublished ? "Anotação despublicada" : "Anotação publicada",
      description: isPublished 
        ? "A anotação agora está privada." 
        : "A anotação agora está visível publicamente."
    });
  };

  const selectedTopicData = topics.find(t => t.id === selectedTopic);

  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Agora";
    if (minutes === 1) return "1 minuto atrás";
    if (minutes < 60) return `${minutes} minutos atrás`;
    
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      {/* Header */}
      <header className="border-b bg-card/90 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = "/dashboard"}
              className="hover:bg-secondary/80 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            
            <div className="flex items-center gap-2">
              {selectedTopicData && (
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${selectedTopicData.color}`} />
                  <span className="text-sm text-muted-foreground font-medium">
                    {selectedTopicData.title}
                  </span>
                </div>
              )}
              
              {isPublished && (
                <Badge variant="secondary" className="text-xs font-medium bg-green-500/10 text-green-600 border-green-500/20">
                  Publicado
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {lastSaved && (
              <span className="text-xs text-muted-foreground hidden sm:block font-medium">
                Salvo {formatLastSaved(lastSaved)}
              </span>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSave()}
              disabled={isSaving}
              className="h-9 px-4 font-medium border-2 hover:border-primary/50 transition-all duration-200"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                  Salvando...
                </div>
              ) : "Salvar"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-secondary/80 transition-all duration-200">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handlePublish}>
                  <Eye className="h-4 w-4 mr-2" />
                  {isPublished ? "Despublicar" : "Publicar"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Configurações
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl relative">
          <div className="space-y-8">
            {/* Topic Selection */}
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in">
              <div className="flex-1">
                <Label htmlFor="topic" className="text-base font-semibold mb-3 block">
                  Tópico
                </Label>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Selecione um tópico..." />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${topic.color}`} />
                        {topic.title}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end gap-2">
              <Button
                variant="outline"
                onClick={() => window.location.href = "/topic/new"}
                className="h-11"
              >
                <Folder className="h-4 w-4 mr-2" />
                Novo Tópico
              </Button>
            </div>
          </div>

            {/* Title */}
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Input
                placeholder="Título da anotação..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-3xl font-bold border-0 px-0 h-auto py-3 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                style={{ fontSize: '2.25rem', lineHeight: '2.75rem' }}
              />
            </div>

            {/* Content */}
            <div className="relative animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Textarea
                ref={textareaRef}
                placeholder="Comece a escrever sua anotação aqui...

Use markdown para formatação:
# Título
## Subtítulo
**negrito** *itálico*
- Lista
- Itens

```código```

[link](url)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[500px] resize-none text-lg leading-relaxed border-0 px-0 py-6 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 bg-transparent"
                style={{ 
                  lineHeight: '1.8',
                  fontSize: '1.125rem'
                }}
              />
            </div>

            {/* Article Stats */}
            <div className="flex items-center justify-between pt-6 border-t border-border/50 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span className="font-medium">
                  {content.length.toLocaleString()} caracteres
                </span>
                <span className="font-medium">
                  {content.trim().split(/\s+/).filter(word => word.length > 0).length.toLocaleString()} palavras
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">
                      {Math.floor(Math.random() * 500 + 100).toLocaleString()} visitantes
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span className="font-medium">
                      {Math.floor(Math.random() * 50 + 10)} curtidas
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-medium">
                    {new Date().toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;