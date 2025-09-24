import { useState } from "react";
import { ArrowLeft, Plus, Search, Edit3, Calendar, Eye, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Article {
  id: string;
  title: string;
  description?: string;
  content: string;
  isPublished: boolean;
  updatedAt: string;
  wordCount: number;
}

const TopicView = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - substituir por dados reais da API
  const topic = {
    id: "1",
    title: "Desenvolvimento Web",
    description: "Conceitos, frameworks e best practices para desenvolvimento web moderno",
    color: "bg-blue-500",
    createdAt: "15 de janeiro, 2024",
    articlesCount: 12
  };

  const articles: Article[] = [
    {
      id: "1",
      title: "Implementando Dark Mode com Tailwind",
      description: "Como implementar modo escuro de forma eficiente",
      content: "Como implementar modo escuro de forma eficiente usando Tailwind CSS e React Context. Abordaremos as melhores práticas...",
      isPublished: true,
      updatedAt: "2 horas atrás",
      wordCount: 485
    },
    {
      id: "2", 
      title: "Hooks Avançados no React",
      description: "useCallback, useMemo, useRef e custom hooks",
      content: "Explorando hooks avançados do React para otimização de performance e reutilização de lógica...",
      isPublished: false,
      updatedAt: "1 dia atrás",
      wordCount: 723
    },
    {
      id: "3",
      title: "API Routes no Next.js",
      content: "Como criar e estruturar API routes no Next.js de forma escalável e segura...",
      isPublished: true,
      updatedAt: "3 dias atrás",
      wordCount: 892
    },
    {
      id: "4",
      title: "Testes com Jest e Testing Library",
      description: "Estratégias para testes unitários e de integração",
      content: "Guia completo para implementar testes em aplicações React usando Jest e React Testing Library...",
      isPublished: true,
      updatedAt: "1 semana atrás", 
      wordCount: 1247
    }
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const publishedCount = articles.filter(article => article.isPublished).length;
  const totalWords = articles.reduce((acc, article) => acc + article.wordCount, 0);

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
              Dashboard
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => window.location.href = `/topic/${topic.id}/edit`}
              variant="outline"
              size="sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurar
            </Button>
            
            <Button
              onClick={() => window.location.href = `/article/new?topic=${topic.id}`}
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Anotação
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Topic Header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className={`w-4 h-4 rounded-full ${topic.color} mt-1`} />
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{topic.title}</h1>
              {topic.description && (
                <p className="text-lg text-muted-foreground mb-4">
                  {topic.description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Criado em {topic.createdAt}
                </div>
                <Badge variant="secondary">
                  {topic.articlesCount} anotações
                </Badge>
                <Badge variant="outline">
                  {publishedCount} publicadas
                </Badge>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar anotações..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Articles List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <Card 
                  key={article.id}
                  className="hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary/20"
                  onClick={() => window.location.href = `/article/${article.id}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-1">
                            {article.title}
                          </CardTitle>
                          {article.isPublished && (
                            <Badge variant="secondary" className="text-xs">
                              <Eye className="h-3 w-3 mr-1" />
                              Publicado
                            </Badge>
                          )}
                        </div>
                        {article.description && (
                          <CardDescription className="line-clamp-1">
                            {article.description}
                          </CardDescription>
                        )}
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = `/article/${article.id}/edit`;
                            }}
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              // Toggle publish status
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            {article.isPublished ? "Despublicar" : "Publicar"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Delete article
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {article.content}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.wordCount} palavras</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {article.updatedAt}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <Edit3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    {searchQuery ? "Nenhuma anotação encontrada" : "Nenhuma anotação ainda"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchQuery 
                      ? "Tente uma busca diferente" 
                      : "Comece criando sua primeira anotação neste tópico"
                    }
                  </p>
                  <Button 
                    onClick={() => window.location.href = `/article/new?topic=${topic.id}`}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Anotação
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total de anotações</span>
                  <span className="font-medium">{articles.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Publicadas</span>
                  <span className="font-medium">{publishedCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total de palavras</span>
                  <span className="font-medium">{totalWords.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Média por anotação</span>
                  <span className="font-medium">
                    {Math.round(totalWords / articles.length)} palavras
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = `/article/new?topic=${topic.id}`}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Anotação
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = `/topic/${topic.id}/edit`}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Editar Tópico
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicView;