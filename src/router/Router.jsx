import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const RouterContext = createContext({
  path: '/',
  search: '',
  params: {},
  navigate: () => {}
});

function normalizePath(pathname) {
  if (!pathname) return '/';
  let clean = pathname.split('?')[0].split('#')[0];
  if (clean === '/index.html' || clean === '/index.htm') return '/';
  if (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);
  return clean || '/';
}

export function Router({ children }) {
  const [currentPath, setCurrentPath] = useState(() => {
    return normalizePath(window.location.pathname);
  });

  const [currentSearch, setCurrentSearch] = useState(() => {
    return window.location.search || '';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      setCurrentSearch(window.location.search || '');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('custom_navigate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('custom_navigate', handleLocationChange);
    };
  }, []);

  const navigate = (to, { replace = false } = {}) => {
    if (to === window.location.pathname + window.location.search) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    window.dispatchEvent(new Event('custom_navigate'));
  };

  return (
    <RouterContext.Provider value={{ path: currentPath, search: currentSearch, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(RouterContext);
  return { pathname: context.path, search: context.search };
}

export function useNavigate() {
  const context = useContext(RouterContext);
  return context.navigate;
}

const ParamsContext = createContext({});
export function useParams() {
  return useContext(ParamsContext);
}

function matchRoute(routePath, currentPath) {
  if (routePath === '*') return { match: true, params: {} };

  const normRoute = normalizePath(routePath);
  const normCurrent = normalizePath(currentPath);

  if (normRoute === normCurrent) return { match: true, params: {} };

  const routeParts = normRoute.split('/').filter(Boolean);
  const currentParts = normCurrent.split('/').filter(Boolean);

  if (routeParts.length !== currentParts.length) return { match: false, params: {} };

  const params = {};
  for (let i = 0; i < routeParts.length; i++) {
    const rPart = routeParts[i];
    const cPart = currentParts[i];

    if (rPart.startsWith(':')) {
      const paramName = rPart.slice(1);
      params[paramName] = decodeURIComponent(cPart);
    } else if (rPart.toLowerCase() !== cPart.toLowerCase()) {
      return { match: false, params: {} };
    }
  }

  return { match: true, params };
}

export function Routes({ children }) {
  const { path } = useContext(RouterContext);

  const matched = useMemo(() => {
    let matchedElement = null;
    let matchedParams = {};

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child) || matchedElement) return;

      const { path: routePath, element } = child.props;
      const { match, params } = matchRoute(routePath, path);

      if (match) {
        matchedElement = element;
        matchedParams = params;
      }
    });

    return { matchedElement, matchedParams };
  }, [children, path]);

  return (
    <ParamsContext.Provider value={matched.matchedParams}>
      {matched.matchedElement || <div className="p-12 text-center text-slate-500">404 - Sayfa Bulunamadı</div>}
    </ParamsContext.Provider>
  );
}

export function Route({ path, element }) {
  return null;
}

export function Link({ to, children, className = '', activeClassName = '', onClick, ...props }) {
  const { path, navigate } = useContext(RouterContext);
  const isActive = path === to || (to !== '/' && (path === to || path.startsWith(to + '/')));

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !e.metaKey &&
      !e.altKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      to &&
      !to.startsWith('http') &&
      !to.startsWith('tel:') &&
      !to.startsWith('mailto:') &&
      !to.startsWith('#')
    ) {
      e.preventDefault();
      navigate(to);
    }
  };

  const finalClass = `${className} ${isActive ? activeClassName : ''}`.trim();

  return (
    <a href={to} onClick={handleClick} className={finalClass} {...props}>
      {children}
    </a>
  );
}
