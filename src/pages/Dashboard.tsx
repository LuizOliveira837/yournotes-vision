import { useState } from "react";
import { Plus, Search, FileText, Folder, Calendar, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/ui/logo";

interface Topic {
  id: string;
  title: string;
  description?: string;
  articlesCount: number;
  updatedAt: string;
  color: string;
}

interface RecentArticle {
  id: string;
  title: string;
  topicTitle: string;
  updatedAt: string;
  preview: string;
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - substituir por dados reais da API
  const topics: Topic[] = [
    {
      id: "1",
      title: "Desenvolvimento Web",
      description: "Conceitos, frameworks e best practices",
      articlesCount: 12,
      updatedAt: "2 horas atrás",
      color: "bg-blue-500"
    },
    {
      id: "2", 
      title: "Design System",
      description: "Componentes e padrões de UI/UX",
      articlesCount: 8,
      updatedAt: "1 dia atrás",
      color: "bg-purple-500"
    },
    {
      id: "3",
      title: "Produtividade",
      description: "Métodos e ferramentas para otimizar o trabalho",
      articlesCount: 15,
      updatedAt: "3 dias atrás", 
      color: "bg-green-500"
    },
    {
      id: "4",
      title: "Estudos",
      description: "Anotações de cursos e livros",
      articlesCount: 23,
      updatedAt: "1 semana atrás",
      color: "bg-orange-500"
    }
  ];

  const recentArticles: RecentArticle[] = [
    {
      id: "1",
      title: "Implementando Dark Mode com Tailwind",
      topicTitle: "Desenvolvimento Web",
      updatedAt: "2 horas atrás",
      preview: "Como implementar modo escuro de forma eficiente usando Tailwind CSS e React Context..."
    },
    {
      id: "2",
      title: "Princípios de Design System",
      topicTitle: "Design System", 
      updatedAt: "1 dia atrás",
      preview: "Fundamentos para criar um design system consistente e escalável..."
    },
    {
      id: "3",
      title: "Técnica Pomodoro Avançada",
      topicTitle: "Produtividade",
      updatedAt: "2 dias atrás",
      preview: "Variações da técnica Pomodoro para diferentes tipos de trabalho..."
    }
  ];

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-primary/5">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      {/* Header */}
      <header className="border-b bg-card/90 backdrop-blur-xl sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo variant="compact" />
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-80 hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tópicos e anotações..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-background/50 border-border/50 backdrop-blur-sm focus:bg-background focus:border-primary/50 transition-all duration-200"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-foreground/10 hover:ring-foreground/20 transition-all duration-200">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-foreground to-foreground/90 text-background text-sm font-semibold">
                      JS
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

        <div className="container mx-auto px-4 py-8 relative">
          {/* Search on mobile */}
          <div className="md:hidden mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tópicos e anotações..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base bg-background/80 border-border/50 backdrop-blur-sm focus:bg-background focus:border-primary/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="flex-1 h-14 text-base font-semibold bg-gradient-to-r from-foreground to-foreground/90 hover:from-foreground/90 hover:to-foreground shadow-lg shadow-foreground/10 transition-all duration-200 animate-scale-in"
                onClick={() => window.location.href = "/article/new"}
              >
                <Plus className="mr-2 h-5 w-5" />
                Nova Anotação
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1 h-14 text-base font-semibold border-2 hover:border-foreground/50 hover:bg-foreground/5 transition-all duration-200 animate-scale-in"
                onClick={() => window.location.href = "/topic/new"}
                style={{ animationDelay: "0.1s" }}
              >
                <Folder className="mr-2 h-5 w-5" />
                Novo Tópico
              </Button>
            </div>
          </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Topics Grid */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Seus Tópicos
                </h2>
                <Badge variant="secondary" className="text-sm font-medium px-3 py-1">
                  {filteredTopics.length} tópicos
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">{/* ... keep existing code (topics mapping) */}
                {filteredTopics.map((topic, index) => (
                  <Card 
                    key={topic.id} 
                    className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary/30 bg-card/80 backdrop-blur-sm hover:bg-card animate-slide-up"
                    onClick={() => window.location.href = `/topic/${topic.id}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full ${topic.color} mt-1.5`} />
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors truncate">
                            {topic.title}
                          </CardTitle>
                          {topic.description && (
                            <CardDescription className="mt-1 line-clamp-2">
                              {topic.description}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {topic.articlesCount} anotações
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {topic.updatedAt}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredTopics.length === 0 && (
                <div className="text-center py-12">
                  <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    Nenhum tópico encontrado
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchQuery ? "Tente uma busca diferente" : "Comece criando seu primeiro tópico"}
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = "/topic/new"}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Tópico
                  </Button>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Articles */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Anotações Recentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentArticles.map((article) => (
                  <div 
                    key={article.id}
                    className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => window.location.href = `/article/${article.id}`}
                  >
                    <h4 className="font-medium text-sm mb-1 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {article.topicTitle} • {article.updatedAt}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {article.preview}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total de tópicos</span>
                  <span className="font-medium">{topics.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total de anotações</span>
                  <span className="font-medium">
                    {topics.reduce((acc, topic) => acc + topic.articlesCount, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Esta semana</span>
                  <span className="font-medium text-primary">+5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;