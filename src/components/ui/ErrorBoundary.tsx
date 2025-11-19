// src/components/ui/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./Button";
import { XCircle } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";

interface Props {
	children: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false, error: null };

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
	}

	reload = () => window.location.reload();
	isDev = () => import.meta.env.DEV;

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-h-screen py-8 px-4 bg-background dark:bg-background-dark transition-colors duration-300">
					<div className="max-w-2xl mx-auto">
						<div className="card p-6 sm:p-8 text-center">
							<div className="bg-error/10 p-4 rounded-xl mx-auto w-fit mb-6">
								<XCircle className="h-10 w-10 sm:h-12 sm:w-12 text-error" />
							</div>

							<h1 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark mb-4">
								System Error
							</h1>

							<p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark mb-6">
								An unexpected error occurred. Please contact support to report error.
							</p>

							{this.isDev() && (
								<ErrorMessage
									message={
										this.state.error?.stack ||
										"Error occurred"
									}
									className="mb-6"
								/>
							)}

							{!this.isDev() && (
								<ErrorMessage
									message={"Report to support"}
									className="mb-6"
								/>
							)}

							<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
								<Button
									onClick={this.reload}
									className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
								>
									Reload
								</Button>
								{/* <Button
									onClick={() => navigate("/")}
									variant="ghost"
									className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
								>
									Go Home
								</Button> */}
							</div>
						</div>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
