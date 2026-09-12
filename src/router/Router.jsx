import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const RouterContext = createContext({
  path: '/',
  params: {},
  navigate: () => {}
});

export function Router({ children }) {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname || '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('custom_navigate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('custom_navigate', handleLocationChange);
    };
  }, []);

  const navigate = (to, { replace = false } = {}) => {
    if (to === window.location.pathname) {
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
    <RouterContext.Provider value={{ path: currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(RouterContext);
  return { pathname: context.path };
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

  const routeParts = routePath.split('/').filter(Boolean);
  const currentParts = currentPath.split('/').filter(Boolean);

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
  const isActive = path === to || (to !== '/' && path.startsWith(to));

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
