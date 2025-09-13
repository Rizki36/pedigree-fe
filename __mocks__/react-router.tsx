const Link = ({ children, to, ...rest }: any) => (
  <a href={to} {...rest}>
    {children}
  </a>
);

export { Link };
