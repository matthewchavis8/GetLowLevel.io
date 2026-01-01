import { render, RenderOptions } from '@testing-library/react';
import { AuthProvider } from '@/contexts/AuthContext';

interface CustomRenderOptions extends RenderOptions {
  initialAuthState?: {
    user: any;
    loading: boolean;
  };
}

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: CustomRenderOptions
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <AuthProvider>
        {children}
      </AuthProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export { screen, fireEvent, waitFor } from '@testing-library/react';

