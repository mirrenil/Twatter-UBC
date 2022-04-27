import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onGoBack: () => void;
}

interface State {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("uncaught error: " + { error, errorInfo });
  }

  resetState = () => {
    this.setState({ hasError: false });
  };

  render() {

    if (this.state.hasError) {
        return (
            <div>
                <h1>Something went wrong.</h1>
                <p>{this.state.message}</p>
                <button onClick={this.props.onGoBack}>Go Back</button>
            </div>
        );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
