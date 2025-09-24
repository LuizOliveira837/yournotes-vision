import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Save, Eye, Settings, Calendar, Folder, MoreHorizontal } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = "/dashboard"}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            
            <div className="flex items-center gap-2">
              {selectedTopicData && (
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${selectedTopicData.color}`} />
                  <span className="text-sm text-muted-foreground">
                    {selectedTopicData.title}
                  </span>
                </div>
              )}
              
              {isPublished && (
                <Badge variant="secondary" className="text-xs">
                  Publicado
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {lastSaved && (
              <span className="text-xs text-muted-foreground hidden sm:block">
                Salvo {formatLastSaved(lastSaved)}
              </span>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSave()}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Topic Selection */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="topic" className="text-sm font-medium mb-2 block">
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
          <div>
            <Input
              placeholder="Título da anotação..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold border-0 px-0 h-auto py-2 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{ fontSize: '2rem', lineHeight: '2.5rem' }}
            />
          </div>

          {/* Content */}
          <div className="relative">
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
              className="min-h-[500px] resize-none text-base leading-relaxed border-0 px-0 py-4 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70"
              style={{ 
                lineHeight: '1.75',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Word count */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
            <div className="flex items-center gap-4">
              <span>
                {content.length} caracteres
              </span>
              <span>
                {content.trim().split(/\s+/).filter(word => word.length > 0).length} palavras
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date().toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;