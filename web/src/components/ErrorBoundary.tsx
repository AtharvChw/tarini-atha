import { Component, type ReactNode } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown): void {
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught:", error, info);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <section className="mx-auto w-full max-w-3xl px-6 py-24 text-center">
          <p className="kicker">Something unravelled</p>
          <h1 className="font-display mt-4 text-4xl leading-tight font-medium md:text-5xl">
            The weave slipped
          </h1>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed">
            An unexpected snag interrupted this page. Reload to pick up the thread.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="font-mono2 mt-8 rounded-full border px-6 py-2 text-[12px] tracking-[0.12em] uppercase"
          >
            Reload the page
          </button>
        </section>
      );
    }
    return this.props.children;
  }
}
