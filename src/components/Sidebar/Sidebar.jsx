import { useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from './Sidebar.module.scss';
import { css } from 'styled-components';


const routes = [
  { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
  { title: 'Sales', icon: 'chart-line', path: '/sales' },
  { title: 'Costs', icon: 'chart-column', path: '/costs' },
  { title: 'Payments', icon: 'wallet', path: '/payments' },
  { title: 'Finances', icon: 'chart-pie', path: '/finances' },
  { title: 'Messages', icon: 'envelope', path: '/messages' },
];

const bottomRoutes = [
  { title: 'Settings', icon: 'sliders', path: '/settings' },
  { title: 'Support', icon: 'phone-volume', path: '/support' },
];

const lightTheme = {
  sidebarBackground: 'var(--color-sidebar-background-light-default)',
  externalSidebarBackground: 'var(--color-sidebar-background-light-hover)',
  textColor: 'var(--color-text-light-default)',
  textColorActive: 'var(--color-text-light-active)',
  logoColor: 'var(--color-text-logo-light-default)',
  buttonBackground: 'var(--color-button-background-light-default)',
  textColorHover: 'var(--color-button-background-light-default)',
  buttonSVG: 'var(--color-text-light-hover)',
};

const darkTheme = {
  sidebarBackground: 'var(--color-sidebar-background-dark-default)',
  externalSidebarBackground: 'var(--color-sidebar-background-dark-hover)',
  textColor: 'var(--color-text-dark-default)',
  textColorActive: 'var(--color-text-logo-dark-default)',
  logoColor: 'var(--color-text-logo-dark-default)',
  buttonBackground: 'var(--color-button-background-dark-default)',
  textColorHover: 'var(--color-text-dark-hover)',
  buttonSVG: 'var(--color-sidebar-background-light-active)',
};

const External = styled.div`
position: absolute;
display: flex;
align-items: center;
top: 0;
right: 0;
left: 0;
bottom: 0;
z-index: -1;
background-color: ${({ theme }) =>
    theme === 'dark' ? darkTheme.externalSidebarBackground : lightTheme.externalSidebarBackground};
`;

const Box = styled.div`
  background-color: ${({ theme }) =>
    theme === 'dark' ? darkTheme.sidebarBackground : lightTheme.sidebarBackground};
`;

const Logo = styled.span`
  color: ${({ theme }) =>
    theme === 'dark' ? darkTheme.logoColor : lightTheme.logoColor};
`;

const NavItem = styled.div`
${({ theme, isActive }) => css`
  color: ${theme === 'dark' ? darkTheme.textColor : lightTheme.textColor};

  &:hover {
    color: ${theme === 'dark' ? darkTheme.textColorHover : lightTheme.buttonSVG};
    background-color: ${theme === 'dark'
      ? darkTheme.externalSidebarBackground
      : lightTheme.externalSidebarBackground};
  }

  ${isActive &&
  css`
  color: ${theme === 'dark'
  ? darkTheme.textColorActive
  : lightTheme.textColorActive};
    background-color: ${theme === 'dark'
    ? darkTheme.externalSidebarBackground
    : lightTheme.externalSidebarBackground};
  `}
`}
`;

const Arrow = styled.div`
${({ isLeft, theme }) => css`
  background-color: ${theme === 'dark' ? darkTheme.sidebarBackground : lightTheme.sidebarBackground};

  color: ${theme === 'dark' ? darkTheme.buttonSVG : lightTheme.buttonSVG};

  ${isLeft &&
    `
    background-color: ${theme === 'dark'
      ? darkTheme.externalSidebarBackground
      : lightTheme.externalSidebarBackground
    };
  `}
`}
`;

const Sidebar = (props) => {
  const { color } = props;
  const [isOpened, setIsOpened] = useState(false);
  const [isShowed, setIsShowed] = useState(false);
  const [isLeft, setIsLeft] = useState(false);
  const [activeRoute, setActiveRoute] = useState(null);

  const goToRoute = (path) => {
    setActiveRoute(path);
    console.log(`going to "${path}"`);
    // setActiveRoute((prev) => (prev === path ? null : path));
  };

  const toggleSidebar = () => {
    setIsOpened(v => !v);
    setIsShowed(s => !s);
    setIsLeft(l => !l);
  };

  const containerClassnames = classnames(styles.sidebar, {
    [styles.opened]: isOpened,
    [styles.closed]: !isOpened
  });

  const containerClassnamesLink = classnames(styles.link__text, {
    [styles.showed]: isShowed,
    [styles.hidden]: !isShowed
  });

  const containerClassnamesArrow = classnames(styles.arrow, {
    [styles.arrow__left]: isLeft,
    [styles.arrow__right]: !isLeft
  });

  return (
    <External theme={color}>
      <Box theme={color} className={containerClassnames} >
        <div className={styles.circle}>
          <span className={`${styles.circle__item} ${styles.circle__red}`}></span>
          <span className={`${styles.circle__item} ${styles.circle__yellow}`}></span>
          <span className={`${styles.circle__item} ${styles.circle__green}`}></span>
        </div>

        <div className={styles.logo}>
          <img className={styles.logo__img} src={logo} alt="TensorFlow logo" />
          <Logo theme={color} className={`${styles.logo__text} ${containerClassnamesLink}`} >TensorFlow</Logo>
          <Arrow isLeft={isLeft} theme={color} className={containerClassnamesArrow} onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isOpened ? 'angle-left' : 'angle-right'} />

            <span className={styles.description}>shrink</span>
          </Arrow>
        </div>
        <div>
          {
            routes.map(route => (
              <NavItem 
                theme={color} 
                key={route.title}
                className={classnames(styles.link)}
                isActive={activeRoute === route.path}
                onClick={() => {
                  goToRoute(route.path);
                }}
              >
                <FontAwesomeIcon icon={route.icon} />
                <span className={containerClassnamesLink}>{route.title}</span>
              </NavItem>
            ))
          }
        </div>
        <div className={styles.link__bottom}>
          {
            bottomRoutes.map(route => (
              <NavItem theme={color} className={styles.link}
                key={route.title}
                isActive={activeRoute === route.path}
                onClick={() => {
                  goToRoute(route.path);
                }}
              >
                <FontAwesomeIcon icon={route.icon} />
                <span className={containerClassnamesLink}>{route.title}</span>
              </NavItem>
            ))
          }
        </div>
      </Box >
    </External>
  );
};

Sidebar.propTypes = {
  color: PropTypes.string,
};

export default Sidebar;
