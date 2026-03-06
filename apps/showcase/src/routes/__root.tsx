import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useMatches,
} from "@tanstack/react-router";
import { defaultLocale, getHTMLTextDir } from "intlayer";
import { IntlayerProvider } from "react-intlayer";
import { BackgroundLayout } from "#/components/BackgroundLayout";
import { Footer } from "../components/Footer";
import Header from "../components/Header";
import { IntlayerMarkdownProvider } from "../components/IntlayerMarkdownProvider";
import { ThemeProvider } from "../components/ThemeProvider";
import PostHogProvider from "../integrations/posthog/provider";
import TanStackQueryProvider from "../integrations/tanstack-query/root-provider";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const matches = useMatches();

	// Try to find locale in params of any active match
	const localeRoute = matches.find((match) => match.routeId === "/{-$locale}");
	const locale =
		(localeRoute?.params as { locale?: string })?.locale ?? defaultLocale;

	return (
		<html dir={getHTMLTextDir(locale)} lang={locale} suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="relative flex min-h-screen flex-col overflow-x-clip scroll-smooth bg-background leading-8 transition md:flex text-text">
				<IntlayerProvider locale={locale}>
					<ThemeProvider>
						<IntlayerMarkdownProvider>
							<PostHogProvider>
								<TanStackQueryProvider>
									<BackgroundLayout>
										<Header />
										{children}
										<Footer />
									</BackgroundLayout>
								</TanStackQueryProvider>
							</PostHogProvider>
						</IntlayerMarkdownProvider>
					</ThemeProvider>
				</IntlayerProvider>
				<Scripts />
			</body>
		</html>
	);
}
