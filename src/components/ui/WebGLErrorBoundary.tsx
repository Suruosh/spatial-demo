import { Component, type ReactNode } from 'react';

interface WebGLErrorBoundaryState {
  hasError: boolean;
}

// Recovers gracefully when the browser drops the WebGL context.
export class WebGLErrorBoundary extends Component<{ children: ReactNode }, WebGLErrorBoundaryState> {
  state: WebGLErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): WebGLErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('WebGL Error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="glass-panel p-6 rounded-[24px] text-center max-w-sm pointer-events-auto shadow-2xl">
            <h3 className="text-gray-900 dark:text-white font-bold mb-2">3D Context Blocked</h3>
            <p className="text-gray-800 dark:text-white/70 text-sm">
              The browser temporarily disabled WebGL rendering. Please click refresh to restore it.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 rounded-full text-gray-900 dark:text-white text-sm transition-colors border border-gray-300 dark:border-white/20"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
