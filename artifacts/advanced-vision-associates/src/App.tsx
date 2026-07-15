import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SymptomsProvider } from '@/context/SymptomsContext';
import Home from '@/pages/Home';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SymptomsProvider>
          <Home />
          <Toaster />
        </SymptomsProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
