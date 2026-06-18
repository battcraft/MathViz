// @ts-nocheck
import React, { ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-amber-50 text-gray-800 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl m-4 text-center max-w-md mx-auto">
          <span className="text-5xl mb-4">😮</span>
          <h2 className="text-2xl font-sans font-bold text-black border-b-2 border-black pb-2 mb-2">
            Arey re! Panga Ho Gaya!
          </h2>
          <p className="text-sm font-mono text-gray-700 leading-relaxed mb-4">
            Something crashed under the hood. "Bhaiya, system mein thoda load ho gaya lagta hai!"
          </p>
          <div className="p-3 bg-red-100 border-2 border-black rounded text-xs font-mono mb-4 text-left w-full overflow-auto max-h-24">
            {this.state.error?.message || "Unknown error"}
          </div>
          <button
            id="error-reload-btn"
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#FFD700] hover:bg-[#FFC000] border-2 border-black font-sans font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform active:translate-x-0.5 active:translate-y-0.5"
          >
            Refresh Page (Dobara Start)
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
