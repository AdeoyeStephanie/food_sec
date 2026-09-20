'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled component error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full h-full min-h-[220px] p-6 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center text-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-lg">
            📍
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-800">Map display momentarily unavailable</h4>
            <p className="text-xs text-slate-500 mt-1">
              You can still browse and select pantries from the list.
            </p>
          </div>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900 transition cursor-pointer"
          >
            Retry Map
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
