// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  // Redirect to auth page
  window.location.href = "/auth";
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Redirecionando...</h1>
      </div>
    </div>
  );
};

export default Index;
